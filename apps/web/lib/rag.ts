import { createRagService, type RagService } from "@egyptian-law/rag";
import { DbRagRetriever } from "@egyptian-law/rag";

let service: RagService | undefined;

/**
 * Server-only composition root for the web app.
 *
 * The exact infrastructure constructors are intentionally isolated here so
 * the UI/API layer never knows about embeddings, vector search, or reranking.
 * Wire this function to the already-tested DB + Ollama providers in the repo.
 */
export function getRagService(): RagService {
  if (service) return service;

  throw new Error(
    "RAG runtime is not wired yet. Connect getRagService() to the existing " +
      "embedding provider, PostgresVectorRetriever, and generation provider.",
  );
}
