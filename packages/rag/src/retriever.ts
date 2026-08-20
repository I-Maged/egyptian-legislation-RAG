// packages/rag/src/retriever.ts

// import type { EmbeddingProviderLike } from "@egyptian-law/ingestion";
import type { PostgresVectorRetriever } from "@egyptian-law/ingestion";
import { EmbeddingProviderLike } from "@egyptian-law/evaluation";

import type {
  RagRetriever,
  RagRetrievalOptions,
  RagRetrievalResult,
} from "./types";

export class DbRagRetriever implements RagRetriever {
  constructor(
    private readonly embeddingProvider: EmbeddingProviderLike,
    private readonly vectorRetriever: PostgresVectorRetriever,
  ) {}

  async retrieve(
    query: string,
    options: RagRetrievalOptions = {},
  ): Promise<RagRetrievalResult[]> {
    const normalizedQuery = query.trim();

    if (!normalizedQuery) {
      throw new Error("Retrieval query cannot be empty.");
    }

    const [queryEmbedding] = await this.embeddingProvider.embed([
      normalizedQuery,
    ]);

    if (!queryEmbedding) {
      throw new Error("Embedding provider returned no query embedding.");
    }

    /*
     * We intentionally use vector retrieval only.
     *
     * No BM25.
     * No hybrid retrieval.
     */
    const results = await this.vectorRetriever.search(queryEmbedding, {
      topK: options.candidateTopK ?? options.topK ?? 5,

      ...(options.lawDocumentId !== undefined
        ? {
            lawDocumentId: options.lawDocumentId,
          }
        : {}),
    });

    /*
     * Current PostgresVectorRetriever provides
     * vector scores only.
     *
     * Until the reranking adapter is connected,
     * the vector score is also the retrieval/rerank
     * score.
     */
    return results.slice(0, options.topK ?? 5).map((result) => ({
      chunk: result.chunk,

      vectorScore: result.score,

      retrievalScore: result.score,

      rerankScore: result.score,

      matchedTerms: 0,

      termCoverage: 0,

      exactPhraseMatch: false,
    }));
  }
}
