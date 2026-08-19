import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  getChunksByIds,
  searchBm25,
  searchHybrid,
  searchSimilarEmbeddings,
} from "@egyptian-law/db";

import {
  createDbBm25Retriever,
  createDbHybridRetriever,
  createDbHybridRerankedRetriever,
  createDbVectorRetriever,
  type EmbeddingProviderLike,
} from "./db-retrieval-adapters";

vi.mock("@egyptian-law/db", () => ({
  getChunksByIds: vi.fn(),
  searchBm25: vi.fn(),
  searchHybrid: vi.fn(),
  searchSimilarEmbeddings: vi.fn(),
}));

const mockedSearchBm25 = vi.mocked(searchBm25);
const mockedSearchHybrid = vi.mocked(searchHybrid);
const mockedSearchSimilarEmbeddings = vi.mocked(searchSimilarEmbeddings);
const mockedGetChunksByIds = vi.mocked(getChunksByIds);

beforeEach(() => {
  vi.clearAllMocks();
});
describe("DB retrieval adapters", () => {
  describe("createDbBm25Retriever", () => {
    it("maps BM25 results to chunk IDs", async () => {
      mockedSearchBm25.mockResolvedValue([
        {
          chunkId: "chunk-2",
          score: 0.9,
        },
        {
          chunkId: "chunk-1",
          score: 0.7,
        },
      ]);

      const retrieve = createDbBm25Retriever({
        topK: 10,
      });

      const result = await retrieve("ما هو الحد الأدنى للأجر؟");

      expect(result).toEqual(["chunk-2", "chunk-1"]);

      expect(mockedSearchBm25).toHaveBeenCalledWith({
        query: "ما هو الحد الأدنى للأجر؟",
        topK: 10,
      });
    });

    it("passes law document filtering", async () => {
      mockedSearchBm25.mockResolvedValue([]);

      const retrieve = createDbBm25Retriever({
        topK: 5,
        lawDocumentId: "labour-law-148-2019",
      });

      await retrieve("الإجازة السنوية");

      expect(mockedSearchBm25).toHaveBeenCalledWith({
        query: "الإجازة السنوية",
        topK: 5,
        lawDocumentId: "labour-law-148-2019",
      });
    });
  });

  describe("createDbVectorRetriever", () => {
    it("embeds the query and maps vector results to chunk IDs", async () => {
      const embeddingProvider: EmbeddingProviderLike = {
        embed: vi.fn().mockResolvedValue([[0.1, 0.2, 0.3]]),
      };

      mockedSearchSimilarEmbeddings.mockResolvedValue([
        {
          chunkId: "chunk-7",
          score: 0.95,
        },
        {
          chunkId: "chunk-3",
          score: 0.88,
        },
      ]);

      const retrieve = createDbVectorRetriever(embeddingProvider, {
        topK: 10,
      });

      const result = await retrieve("حقوق العامل");

      expect(result).toEqual(["chunk-7", "chunk-3"]);

      expect(embeddingProvider.embed).toHaveBeenCalledWith(["حقوق العامل"]);

      expect(mockedSearchSimilarEmbeddings).toHaveBeenCalledWith({
        queryEmbedding: [0.1, 0.2, 0.3],
        topK: 10,
      });
    });

    it("passes law document filtering", async () => {
      const embeddingProvider: EmbeddingProviderLike = {
        embed: vi.fn().mockResolvedValue([[0.4, 0.5]]),
      };

      mockedSearchSimilarEmbeddings.mockResolvedValue([]);

      const retrieve = createDbVectorRetriever(embeddingProvider, {
        topK: 5,
        lawDocumentId: "labour-law-148-2019",
      });

      await retrieve("الفصل في المنازعات");

      expect(mockedSearchSimilarEmbeddings).toHaveBeenCalledWith({
        queryEmbedding: [0.4, 0.5],
        topK: 5,
        lawDocumentId: "labour-law-148-2019",
      });
    });

    it("throws when the embedding provider returns no embedding", async () => {
      const embeddingProvider: EmbeddingProviderLike = {
        embed: vi.fn().mockResolvedValue([]),
      };

      const retrieve = createDbVectorRetriever(embeddingProvider, {
        topK: 10,
      });

      await expect(retrieve("حقوق العامل")).rejects.toThrow(
        "Embedding provider returned no query embedding.",
      );

      expect(mockedSearchSimilarEmbeddings).not.toHaveBeenCalled();
    });
  });

  describe("createDbHybridRetriever", () => {
    it("embeds the query and maps hybrid results to chunk IDs", async () => {
      const embeddingProvider: EmbeddingProviderLike = {
        embed: vi.fn().mockResolvedValue([[0.11, 0.22, 0.33]]),
      };

      mockedSearchHybrid.mockResolvedValue([
        {
          chunkId: "chunk-hybrid-1",
          score: 0.031,
          vectorScore: 0.91,
          bm25Score: 0.42,
          vectorRank: 1,
          bm25Rank: 2,
        },
        {
          chunkId: "chunk-hybrid-2",
          score: 0.029,
          vectorScore: 0.82,
          bm25Score: null,
          vectorRank: 2,
          bm25Rank: null,
        },
      ]);

      const retrieve = createDbHybridRetriever(embeddingProvider, {
        topK: 10,
        vectorTopK: 20,
        bm25TopK: 20,
      });

      const result = await retrieve("الحد الأدنى للأجر");

      expect(result).toEqual(["chunk-hybrid-1", "chunk-hybrid-2"]);

      expect(embeddingProvider.embed).toHaveBeenCalledWith([
        "الحد الأدنى للأجر",
      ]);

      expect(mockedSearchHybrid).toHaveBeenCalledWith({
        query: "الحد الأدنى للأجر",
        queryEmbedding: [0.11, 0.22, 0.33],
        topK: 10,
        vectorTopK: 20,
        bm25TopK: 20,
      });
    });

    it("passes hybrid configuration and law filtering", async () => {
      const embeddingProvider: EmbeddingProviderLike = {
        embed: vi.fn().mockResolvedValue([[0.5, 0.6]]),
      };

      mockedSearchHybrid.mockResolvedValue([]);

      const retrieve = createDbHybridRetriever(embeddingProvider, {
        topK: 8,
        vectorTopK: 20,
        bm25TopK: 25,
        lawDocumentId: "labour-law-148-2019",
        vectorWeight: 1.2,
        bm25Weight: 0.8,
        rrfK: 50,
      });

      await retrieve("الإجازة المرضية");

      expect(mockedSearchHybrid).toHaveBeenCalledWith({
        query: "الإجازة المرضية",
        queryEmbedding: [0.5, 0.6],
        topK: 8,
        vectorTopK: 20,
        bm25TopK: 25,
        lawDocumentId: "labour-law-148-2019",
        vectorWeight: 1.2,
        bm25Weight: 0.8,
        rrfK: 50,
      });
    });

    it("uses topK for vectorTopK and bm25TopK when omitted", async () => {
      const embeddingProvider: EmbeddingProviderLike = {
        embed: vi.fn().mockResolvedValue([[0.7, 0.8]]),
      };

      mockedSearchHybrid.mockResolvedValue([]);

      const retrieve = createDbHybridRetriever(embeddingProvider, {
        topK: 12,
      });

      await retrieve("إنهاء عقد العمل");

      expect(mockedSearchHybrid).toHaveBeenCalledWith({
        query: "إنهاء عقد العمل",
        queryEmbedding: [0.7, 0.8],
        topK: 12,
        vectorTopK: 12,
        bm25TopK: 12,
      });
    });

    it("throws when the embedding provider returns no embedding", async () => {
      const embeddingProvider: EmbeddingProviderLike = {
        embed: vi.fn().mockResolvedValue([]),
      };

      const retrieve = createDbHybridRetriever(embeddingProvider, {
        topK: 10,
      });

      await expect(retrieve("حقوق العامل")).rejects.toThrow(
        "Embedding provider returned no query embedding.",
      );

      expect(mockedSearchHybrid).not.toHaveBeenCalled();
    });
  });
});

describe("createDbHybridRerankedRetriever", () => {
  it("hydrates hybrid candidates and reranks them", async () => {
    const embeddingProvider: EmbeddingProviderLike = {
      embed: vi.fn().mockResolvedValue([[0.1, 0.2, 0.3]]),
    };

    mockedSearchHybrid.mockResolvedValue([
      {
        chunkId: "chunk-1",
        score: 0.03,
        vectorScore: 0.9,
        bm25Score: 0.4,
        vectorRank: 1,
        bm25Rank: 2,
      },
      {
        chunkId: "chunk-2",
        score: 0.029,
        vectorScore: 0.85,
        bm25Score: 0.6,
        vectorRank: 2,
        bm25Rank: 1,
      },
    ]);

    mockedGetChunksByIds.mockResolvedValue([
      {
        id: "chunk-1",
        document_id: "doc-1",
        law_name: "قانون العمل",
        law_number: "148",
        year: "2019",
        article_number: "1",
        article_title: null,
        hierarchy: [],
        text: "النص الخاص بحقوق العامل والتعويضات.",
        text_for_embedding: "النص الخاص بحقوق العامل والتعويضات.",
        source_order: 1,
        provenance: {
          source_file: "labour-law.pdf",
          page_start: 1,
          page_end: 1,
        },
        metadata: {
          parser_version: "test",
          normalization_version: "test",
          ocr_confidence: 1,
        },
      },
      {
        id: "chunk-2",
        document_id: "doc-1",
        law_name: "قانون العمل",
        law_number: "148",
        year: "2019",
        article_number: "2",
        article_title: null,
        hierarchy: [],
        text: "الأجر والإجازات المقررة للعامل.",
        text_for_embedding: "الأجر والإجازات المقررة للعامل.",
        source_order: 2,
        provenance: {
          source_file: "labour-law.pdf",
          page_start: 2,
          page_end: 2,
        },
        metadata: {
          parser_version: "test",
          normalization_version: "test",
          ocr_confidence: 1,
        },
      },
    ]);

    const retrieve = createDbHybridRerankedRetriever(
      embeddingProvider,
      {
        topK: 1,
        rerankTopK: 2,
        vectorTopK: 10,
        bm25TopK: 10,
      },
      {
        phraseWeight: 0.45,
        coverageWeight: 0.35,
        retrievalWeight: 0.2,
      },
    );

    const result = await retrieve("حقوق العامل");

    expect(result).toHaveLength(1);

    /*
     * rerankTopK controls the hybrid candidate pool.
     */
    expect(mockedSearchHybrid).toHaveBeenCalledWith({
      query: "حقوق العامل",
      queryEmbedding: [0.1, 0.2, 0.3],
      topK: 2,
      vectorTopK: 10,
      bm25TopK: 10,
    });

    expect(mockedGetChunksByIds).toHaveBeenCalledWith(["chunk-1", "chunk-2"]);

    /*
     * chunk-1 contains the exact phrase and should therefore
     * win the baseline reranker.
     */
    expect(result[0]).toBe("chunk-1");
  });

  it("returns an empty result when hybrid retrieval returns no candidates", async () => {
    const embeddingProvider: EmbeddingProviderLike = {
      embed: vi.fn().mockResolvedValue([[0.1, 0.2]]),
    };

    mockedSearchHybrid.mockResolvedValue([]);

    const retrieve = createDbHybridRerankedRetriever(embeddingProvider, {
      topK: 5,
      rerankTopK: 20,
    });

    const result = await retrieve("حقوق العامل");

    expect(result).toEqual([]);

    expect(mockedGetChunksByIds).not.toHaveBeenCalled();
  });

  it("throws when a hybrid result cannot be hydrated", async () => {
    const embeddingProvider: EmbeddingProviderLike = {
      embed: vi.fn().mockResolvedValue([[0.1, 0.2]]),
    };

    mockedSearchHybrid.mockResolvedValue([
      {
        chunkId: "missing-chunk",
        score: 0.03,
        vectorScore: 0.9,
        bm25Score: 0.5,
        vectorRank: 1,
        bm25Rank: 1,
      },
    ]);

    mockedGetChunksByIds.mockResolvedValue([]);

    const retrieve = createDbHybridRerankedRetriever(embeddingProvider, {
      topK: 5,
    });

    await expect(retrieve("حقوق العامل")).rejects.toThrow(
      "Hybrid retrieval returned unknown chunk ID: missing-chunk",
    );
  });
});
