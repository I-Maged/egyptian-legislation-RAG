import {
  getChunksByIds,
  searchBm25,
  searchHybrid,
  searchSimilarEmbeddings,
} from "@egyptian-law/db";

import type { RetrievalFunction } from "../retrieval/evaluator";

import {
  BaselineReranker,
  type RerankCandidate,
  type RerankOptions,
} from "@egyptian-law/ingestion";

export interface DbRetrievalAdapterOptions {
  /**
   * Final number of chunk IDs returned by the retrieval function.
   */
  topK: number;

  /**
   * Restrict retrieval to one law document.
   */
  lawDocumentId?: string;

  /**
   * Candidate pool sizes used by hybrid retrieval.
   */
  vectorTopK?: number;
  bm25TopK?: number;

  /**
   * Optional number of hybrid candidates to retrieve before reranking.
   *
   * Example:
   *
   * topK = 10
   * rerankTopK = 20
   *
   * means:
   *
   * DB hybrid retrieval -> 20 candidates
   * reranker            -> 10 final results
   */
  rerankTopK?: number;

  /**
   * Used only by hybrid retrieval.
   */
  vectorWeight?: number;
  bm25Weight?: number;
  rrfK?: number;

  /**
   * Reranker configuration.
   *
   * `topK` inside this object is intentionally ignored by the adapter
   * because the adapter's top-level `topK` controls the final number
   * of returned chunk IDs.
   */
  rerank?: RerankOptions;
}

export interface EmbeddingProviderLike {
  embed(texts: string[]): Promise<number[][]>;
}

/**
 * Creates a RetrievalFunction backed by PostgreSQL BM25.
 */
export function createDbBm25Retriever(
  options: DbRetrievalAdapterOptions,
): RetrievalFunction {
  return async (query: string): Promise<string[]> => {
    const results = await searchBm25({
      query,
      topK: options.topK,
      ...(options.lawDocumentId !== undefined
        ? { lawDocumentId: options.lawDocumentId }
        : {}),
    });

    return results.map((result) => result.chunkId);
  };
}

/**
 * Creates a RetrievalFunction backed by PostgreSQL pgvector.
 */
export function createDbVectorRetriever(
  embeddingProvider: EmbeddingProviderLike,
  options: DbRetrievalAdapterOptions,
): RetrievalFunction {
  return async (query: string): Promise<string[]> => {
    const [queryEmbedding] = await embeddingProvider.embed([query]);

    if (!queryEmbedding) {
      throw new Error("Embedding provider returned no query embedding.");
    }

    const results = await searchSimilarEmbeddings({
      queryEmbedding,
      topK: options.topK,
      ...(options.lawDocumentId !== undefined
        ? { lawDocumentId: options.lawDocumentId }
        : {}),
    });

    return results.map((result) => result.chunkId);
  };
}

/**
 * Creates a RetrievalFunction backed by PostgreSQL hybrid retrieval.
 */
export function createDbHybridRetriever(
  embeddingProvider: EmbeddingProviderLike,
  options: DbRetrievalAdapterOptions,
): RetrievalFunction {
  return async (query: string): Promise<string[]> => {
    const [queryEmbedding] = await embeddingProvider.embed([query]);

    if (!queryEmbedding) {
      throw new Error("Embedding provider returned no query embedding.");
    }

    const results = await searchHybrid({
      query,
      queryEmbedding,

      topK: options.topK,
      vectorTopK: options.vectorTopK ?? options.topK,
      bm25TopK: options.bm25TopK ?? options.topK,

      ...(options.lawDocumentId !== undefined
        ? { lawDocumentId: options.lawDocumentId }
        : {}),

      ...(options.vectorWeight !== undefined
        ? { vectorWeight: options.vectorWeight }
        : {}),

      ...(options.bm25Weight !== undefined
        ? { bm25Weight: options.bm25Weight }
        : {}),

      ...(options.rrfK !== undefined ? { rrfK: options.rrfK } : {}),
    });

    return results.map((result) => result.chunkId);
  };
}

/**
 * Creates a RetrievalFunction backed by:
 *
 * PostgreSQL BM25 + pgvector
 *          ↓
 *       RRF fusion
 *          ↓
 *     candidate pool
 *          ↓
 *      getChunksByIds
 *          ↓
 *   BaselineReranker
 *          ↓
 *     final chunk IDs
 *
 * `topK` controls the final number of results.
 *
 * `rerankTopK` controls how many hybrid candidates are retrieved
 * and passed into the reranker.
 *
 * The optional third argument is supported for convenience and
 * backwards compatibility with the benchmark tests:
 *
 * createDbHybridRerankedRetriever(
 *   embeddingProvider,
 *   options,
 *   {
 *     phraseWeight: 0.45,
 *     coverageWeight: 0.35,
 *     retrievalWeight: 0.2,
 *   },
 * )
 */
export function createDbHybridRerankedRetriever(
  embeddingProvider: EmbeddingProviderLike,
  options: DbRetrievalAdapterOptions,
  rerankOptions?: RerankOptions,
): RetrievalFunction {
  const reranker = new BaselineReranker();

  return async (query: string): Promise<string[]> => {
    const [queryEmbedding] = await embeddingProvider.embed([query]);

    if (!queryEmbedding) {
      throw new Error("Embedding provider returned no query embedding.");
    }

    /*
     * The reranker needs a larger candidate pool than the final K
     * whenever rerankTopK is configured.
     */
    const candidateTopK = options.rerankTopK ?? options.topK;

    const hybridResults = await searchHybrid({
      query,
      queryEmbedding,

      /*
       * Retrieve the larger candidate pool here.
       */
      topK: candidateTopK,

      vectorTopK: options.vectorTopK ?? candidateTopK,
      bm25TopK: options.bm25TopK ?? candidateTopK,

      ...(options.lawDocumentId !== undefined
        ? { lawDocumentId: options.lawDocumentId }
        : {}),

      ...(options.vectorWeight !== undefined
        ? { vectorWeight: options.vectorWeight }
        : {}),

      ...(options.bm25Weight !== undefined
        ? { bm25Weight: options.bm25Weight }
        : {}),

      ...(options.rrfK !== undefined ? { rrfK: options.rrfK } : {}),
    });

    if (hybridResults.length === 0) {
      return [];
    }

    const chunkIds = hybridResults.map((result) => result.chunkId);

    const chunks = await getChunksByIds(chunkIds);

    const chunksById = new Map(chunks.map((chunk) => [chunk.id, chunk]));

    /*
     * Every DB retrieval result should correspond to a canonical
     * LawChunk. Silently dropping missing chunks would hide a
     * retrieval/data-integrity problem during evaluation.
     */
    for (const chunkId of chunkIds) {
      if (!chunksById.has(chunkId)) {
        throw new Error(
          `Hybrid retrieval returned unknown chunk ID: ${chunkId}`,
        );
      }
    }

    const candidates: RerankCandidate[] = hybridResults.map((result) => {
      const chunk = chunksById.get(result.chunkId);

      /*
       * This is unreachable because of the validation above, but
       * keeping the guard makes the type contract explicit.
       */
      if (!chunk) {
        throw new Error(
          `Hybrid retrieval returned unknown chunk ID: ${result.chunkId}`,
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

    /*
     * The third argument wins over options.rerank when supplied.
     *
     * The top-level options.rerank is also supported so callers can
     * configure the reranker without using a third argument.
     */
    const effectiveRerankOptions: RerankOptions = {
      ...(options.rerank ?? {}),
      ...(rerankOptions ?? {}),
      /*
       * The adapter owns the final result size.
       */
      topK: options.topK,
    };

    const reranked = reranker.rerank(query, candidates, effectiveRerankOptions);

    return reranked.map((result) => result.chunk.id);
  };
}
