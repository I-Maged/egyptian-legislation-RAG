import { searchBm25, type Bm25SearchResult } from "./bm25.repository";

import {
  searchSimilarEmbeddings,
  type VectorSearchResult,
} from "./vector.repository";

export interface HybridSearchInput {
  query: string;
  queryEmbedding: number[];

  topK?: number;
  vectorTopK?: number;
  bm25TopK?: number;

  lawDocumentId?: string;

  vectorWeight?: number;
  bm25Weight?: number;

  rrfK?: number;
}

export interface HybridSearchResult {
  chunkId: string;

  score: number;

  vectorScore: number | null;
  bm25Score: number | null;

  vectorRank: number | null;
  bm25Rank: number | null;
}

const DEFAULT_TOP_K = 10;
const DEFAULT_RRF_K = 60;
const DEFAULT_VECTOR_WEIGHT = 1;
const DEFAULT_BM25_WEIGHT = 1;

export async function searchHybrid(
  input: HybridSearchInput,
): Promise<HybridSearchResult[]> {
  const query = input.query.trim();

  if (!query) {
    return [];
  }

  const topK = input.topK ?? DEFAULT_TOP_K;
  const vectorTopK = input.vectorTopK ?? topK;
  const bm25TopK = input.bm25TopK ?? topK;

  const vectorWeight = input.vectorWeight ?? DEFAULT_VECTOR_WEIGHT;

  const bm25Weight = input.bm25Weight ?? DEFAULT_BM25_WEIGHT;

  const rrfK = input.rrfK ?? DEFAULT_RRF_K;

  validateOptions({
    topK,
    vectorTopK,
    bm25TopK,
    vectorWeight,
    bm25Weight,
    rrfK,
  });

  const vectorSearchInput = {
    queryEmbedding: input.queryEmbedding,
    topK: vectorTopK,
    ...(input.lawDocumentId !== undefined
      ? { lawDocumentId: input.lawDocumentId }
      : {}),
  };

  const bm25SearchInput = {
    query,
    topK: bm25TopK,
    ...(input.lawDocumentId !== undefined
      ? { lawDocumentId: input.lawDocumentId }
      : {}),
  };

  const [vectorResults, bm25Results] = await Promise.all([
    searchSimilarEmbeddings(vectorSearchInput),
    searchBm25(bm25SearchInput),
  ]);

  return fuseResults(
    vectorResults,
    bm25Results,
    {
      vectorWeight,
      bm25Weight,
      rrfK,
    },
    topK,
  );
}

function fuseResults(
  vectorResults: VectorSearchResult[],
  bm25Results: Bm25SearchResult[],
  options: {
    vectorWeight: number;
    bm25Weight: number;
    rrfK: number;
  },
  topK: number,
): HybridSearchResult[] {
  const entries = new Map<string, HybridSearchResult>();

  vectorResults.forEach((result, index) => {
    const rank = index + 1;

    const contribution = options.vectorWeight / (options.rrfK + rank);

    const existing = entries.get(result.chunkId);

    if (existing) {
      existing.score += contribution;
      existing.vectorScore = result.score;
      existing.vectorRank = rank;
      return;
    }

    entries.set(result.chunkId, {
      chunkId: result.chunkId,
      score: contribution,

      vectorScore: result.score,
      bm25Score: null,

      vectorRank: rank,
      bm25Rank: null,
    });
  });

  bm25Results.forEach((result, index) => {
    const rank = index + 1;

    const contribution = options.bm25Weight / (options.rrfK + rank);

    const existing = entries.get(result.chunkId);

    if (existing) {
      existing.score += contribution;
      existing.bm25Score = result.score;
      existing.bm25Rank = rank;
      return;
    }

    entries.set(result.chunkId, {
      chunkId: result.chunkId,
      score: contribution,

      vectorScore: null,
      bm25Score: result.score,

      vectorRank: null,
      bm25Rank: rank,
    });
  });

  return [...entries.values()]
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }

      return a.chunkId.localeCompare(b.chunkId);
    })
    .slice(0, topK);
}

function validateOptions(options: {
  topK: number;
  vectorTopK: number;
  bm25TopK: number;
  vectorWeight: number;
  bm25Weight: number;
  rrfK: number;
}): void {
  const { topK, vectorTopK, bm25TopK, vectorWeight, bm25Weight, rrfK } =
    options;

  if (!Number.isInteger(topK) || topK <= 0) {
    throw new Error(`Invalid topK: ${topK}`);
  }

  if (!Number.isInteger(vectorTopK) || vectorTopK <= 0) {
    throw new Error(`Invalid vectorTopK: ${vectorTopK}`);
  }

  if (!Number.isInteger(bm25TopK) || bm25TopK <= 0) {
    throw new Error(`Invalid bm25TopK: ${bm25TopK}`);
  }

  if (!Number.isFinite(vectorWeight) || vectorWeight < 0) {
    throw new Error(`Invalid vectorWeight: ${vectorWeight}`);
  }

  if (!Number.isFinite(bm25Weight) || bm25Weight < 0) {
    throw new Error(`Invalid bm25Weight: ${bm25Weight}`);
  }

  if (vectorWeight === 0 && bm25Weight === 0) {
    throw new Error(
      "At least one hybrid retrieval weight must be greater than zero.",
    );
  }

  if (!Number.isFinite(rrfK) || rrfK <= 0) {
    throw new Error(`Invalid rrfK: ${rrfK}`);
  }
}
