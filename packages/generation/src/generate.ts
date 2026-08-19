import type { LawChunk } from "@egyptian-law/core";

import { buildCitations } from "./citations";
import type { GenerationProvider } from "./provider";
import { LEGAL_SYSTEM_PROMPT, buildGenerationPrompt } from "./prompt";
import type { GenerationRequest, GenerationResponse } from "./types";

export async function generateAnswer(
  provider: GenerationProvider,
  request: GenerationRequest,
): Promise<GenerationResponse> {
  const query = request.query.trim();

  if (!query) {
    throw new Error("Generation query cannot be empty.");
  }

  if (request.chunks.length === 0) {
    throw new Error("Generation requires at least one retrieved chunk.");
  }

  const prompt = buildGenerationPrompt(query, request.chunks);

  const startedAt = performance.now();

  const answer = await provider.generate({
    system: LEGAL_SYSTEM_PROMPT,
    prompt,

    ...(request.temperature !== undefined
      ? {
          temperature: request.temperature,
        }
      : {}),

    ...(request.maxTokens !== undefined
      ? {
          maxTokens: request.maxTokens,
        }
      : {}),
  });

  const citations = buildCitations(answer, request.chunks);

  return {
    answer,

    citations,

    metadata: {
      model: provider.model,
      contextChunkCount: request.chunks.length,
      citationCount: citations.length,
      latencyMs: performance.now() - startedAt,
    },
  };
}

/**
 * Convenience helper for callers that already have a provider
 * and want the generation stage directly.
 */
export async function generateFromChunks(
  provider: GenerationProvider,
  query: string,
  chunks: LawChunk[],
  options?: {
    temperature?: number;
    maxTokens?: number;
  },
): Promise<GenerationResponse> {
  return generateAnswer(provider, {
    query,
    chunks,
    ...(options?.temperature !== undefined
      ? {
          temperature: options.temperature,
        }
      : {}),
    ...(options?.maxTokens !== undefined
      ? {
          maxTokens: options.maxTokens,
        }
      : {}),
  });
}
