import type { LawChunk } from "@egyptian-law/core";
import type { BaselineReranker } from "@egyptian-law/ingestion";

import {
  getChunksByIds,
  searchBm25,
  searchHybrid,
  searchSimilarEmbeddings,
  type HybridSearchResult,
} from "@egyptian-law/db";

import type { RetrievalFunction } from "../retrieval/evaluator";

export interface DbRetrievalOptions {
  lawDocumentId?: string;
  topK?: number;
}

export interface DbVectorRetrievalOptions extends DbRetrievalOptions {
  embed: (query: string) => Promise<number[]>;
}

export interface DbHybridRetrievalOptions extends DbRetrievalOptions {
  embed: (query: string) => Promise<number[]>;

  vectorTopK?: number;
  bm25TopK?: number;

  vectorWeight?: number;
  bm25Weight?: number;

  rrfK?: number;
}

/**
 * PostgreSQL BM25/FTS retrieval adapter.
 */
export function createDbBm25RetrievalFunction(
  options: DbRetrievalOptions = {},
): RetrievalFunction {
  const topK = options.topK ?? 10;

  return async (query: string): Promise<string[]> => {
    const input = {
      query,
      topK,
      ...(options.lawDocumentId !== undefined
        ? { lawDocumentId: options.lawDocumentId }
        : {}),
    };

    const results = await searchBm25(input);

    return results.map((result) => result.chunkId);
  };
}

/**
 * PostgreSQL pgvector retrieval adapter.
 */
export function createDbVectorRetrievalFunction(
  options: DbVectorRetrievalOptions,
): RetrievalFunction {
  const topK = options.topK ?? 10;

  return async (query: string): Promise<string[]> => {
    const queryEmbedding = await options.embed(query);

    if (queryEmbedding.length === 0) {
      throw new Error("Embedding provider returned an empty embedding.");
    }

    const input = {
      queryEmbedding,
      topK,
      ...(options.lawDocumentId !== undefined
        ? { lawDocumentId: options.lawDocumentId }
        : {}),
    };

    const results = await searchSimilarEmbeddings(input);

    return results.map((result) => result.chunkId);
  };
}

/**
 * PostgreSQL hybrid retrieval adapter.
 */
export function createDbHybridRetrievalFunction(
  options: DbHybridRetrievalOptions,
): RetrievalFunction {
  const topK = options.topK ?? 10;

  return async (query: string): Promise<string[]> => {
    const queryEmbedding = await options.embed(query);

    if (queryEmbedding.length === 0) {
      throw new Error("Embedding provider returned an empty embedding.");
    }

    const input = {
      query,
      queryEmbedding,
      topK,
      vectorTopK: options.vectorTopK ?? topK,
      bm25TopK: options.bm25TopK ?? topK,
      ...(options.vectorWeight !== undefined
        ? { vectorWeight: options.vectorWeight }
        : {}),
      ...(options.bm25Weight !== undefined
        ? { bm25Weight: options.bm25Weight }
        : {}),
      ...(options.rrfK !== undefined ? { rrfK: options.rrfK } : {}),
      ...(options.lawDocumentId !== undefined
        ? { lawDocumentId: options.lawDocumentId }
        : {}),
    };

    const results = await searchHybrid(input);

    return results.map((result) => result.chunkId);
  };
}

/**
 * Hydrates DB hybrid retrieval results into the candidate shape expected
 * by the existing BaselineReranker.
 */
export async function hydrateHybridResults(
  results: HybridSearchResult[],
): Promise<
  Array<{
    chunk: LawChunk;
    score: number;
    vectorScore: number | null;
    bm25Score: number | null;
    vectorRank: number | null;
    bm25Rank: number | null;
  }>
> {
  if (results.length === 0) {
    return [];
  }

  const chunkIds = results.map((result) => result.chunkId);

  const chunks = await getChunksByIds(chunkIds);

  const chunksById = new Map(chunks.map((chunk) => [chunk.id, chunk]));

  return results.map((result) => {
    const chunk = chunksById.get(result.chunkId);

    if (!chunk) {
      throw new Error(
        `Unable to hydrate hybrid retrieval chunk: ${result.chunkId}`,
      );
    }

    return {
      chunk,
      score: result.score,
      vectorScore: result.vectorScore,
      bm25Score: result.bm25Score,
      vectorRank: result.vectorRank,
      bm25Rank: result.bm25Rank,
    };
  });
}

export interface DbRerankedRetrievalOptions extends DbHybridRetrievalOptions {
  reranker: BaselineReranker;

  rerankTopK?: number;
  phraseWeight?: number;
  coverageWeight?: number;
  retrievalWeight?: number;
}

/**
 * PostgreSQL hybrid retrieval followed by the existing baseline reranker.
 */
export function createDbHybridRerankedRetrievalFunction(
  options: DbRerankedRetrievalOptions,
): RetrievalFunction {
  const retrievalTopK = options.topK ?? 10;

  return async (query: string): Promise<string[]> => {
    const queryEmbedding = await options.embed(query);

    if (queryEmbedding.length === 0) {
      throw new Error("Embedding provider returned an empty embedding.");
    }

    /*
     * Retrieve a larger candidate pool than the final result size.
     *
     * Example:
     *
     *   final K = 10
     *   vector K = 20
     *   BM25 K = 20
     *
     * The reranker then chooses the best 10.
     */
    const results = await searchHybrid({
      query,
      queryEmbedding,
      topK: Math.max(
        retrievalTopK,
        options.vectorTopK ?? retrievalTopK,
        options.bm25TopK ?? retrievalTopK,
      ),
      vectorTopK: options.vectorTopK ?? Math.max(retrievalTopK, 20),
      bm25TopK: options.bm25TopK ?? Math.max(retrievalTopK, 20),
      ...(options.vectorWeight !== undefined
        ? { vectorWeight: options.vectorWeight }
        : {}),
      ...(options.bm25Weight !== undefined
        ? { bm25Weight: options.bm25Weight }
        : {}),
      ...(options.rrfK !== undefined ? { rrfK: options.rrfK } : {}),
      ...(options.lawDocumentId !== undefined
        ? { lawDocumentId: options.lawDocumentId }
        : {}),
    });

    const candidates = await hydrateHybridResults(results);

    const reranked = options.reranker.rerank(query, candidates, {
      topK: options.rerankTopK ?? retrievalTopK,
      ...(options.phraseWeight !== undefined
        ? { phraseWeight: options.phraseWeight }
        : {}),
      ...(options.coverageWeight !== undefined
        ? { coverageWeight: options.coverageWeight }
        : {}),
      ...(options.retrievalWeight !== undefined
        ? { retrievalWeight: options.retrievalWeight }
        : {}),
    });

    return reranked.map((result) => result.chunk.id);
  };
}
