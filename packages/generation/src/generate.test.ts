import { describe, expect, it, vi } from "vitest";

import type { LawChunk } from "@egyptian-law/core";

import type { GenerationProvider } from "./provider";
import { generateAnswer } from "./generate";

function createChunk(): LawChunk {
  return {
    id: "chunk-1",
    document_id: "doc-1",
    law_name: "قانون العمل",
    law_number: "148",
    year: "2019",
    article_number: "1",
    article_title: null,
    source_order: 1,
    hierarchy: [],
    text: "يحدد القانون نطاق تطبيقه.",
    text_for_embedding: "يحدد القانون نطاق تطبيقه.",
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
  };
}

describe("generateAnswer", () => {
  it("generates an answer and resolves citations", async () => {
    const provider: GenerationProvider = {
      model: "test-model",

      generate: vi
        .fn()
        .mockResolvedValue("ينص القانون على ذلك في المادة الأولى. [C1]"),
    };

    const result = await generateAnswer(provider, {
      query: "ما هو نطاق تطبيق القانون؟",
      chunks: [createChunk()],
    });

    expect(result.answer).toBe("ينص القانون على ذلك في المادة الأولى. [C1]");

    expect(result.citations).toHaveLength(1);

    expect(result.citations[0]).toMatchObject({
      citationId: "C1",
      chunkId: "chunk-1",
      articleNumber: "1",
    });

    expect(result.metadata.model).toBe("test-model");
    expect(result.metadata.contextChunkCount).toBe(1);
    expect(result.metadata.citationCount).toBe(1);
    expect(result.metadata.latencyMs).toBeGreaterThanOrEqual(0);
  });

  it("passes generation configuration to the provider", async () => {
    const provider: GenerationProvider = {
      model: "test-model",
      generate: vi.fn().mockResolvedValue("الإجابة [C1]"),
    };

    await generateAnswer(provider, {
      query: "السؤال",
      chunks: [createChunk()],
      temperature: 0.1,
      maxTokens: 500,
    });

    expect(provider.generate).toHaveBeenCalledWith(
      expect.objectContaining({
        temperature: 0.1,
        maxTokens: 500,
      }),
    );
  });

  it("rejects an empty query", async () => {
    const provider: GenerationProvider = {
      model: "test-model",
      generate: vi.fn(),
    };

    await expect(
      generateAnswer(provider, {
        query: "   ",
        chunks: [createChunk()],
      }),
    ).rejects.toThrow("Generation query cannot be empty.");

    expect(provider.generate).not.toHaveBeenCalled();
  });

  it("rejects an empty context", async () => {
    const provider: GenerationProvider = {
      model: "test-model",
      generate: vi.fn(),
    };

    await expect(
      generateAnswer(provider, {
        query: "السؤال",
        chunks: [],
      }),
    ).rejects.toThrow("Generation requires at least one retrieved chunk.");

    expect(provider.generate).not.toHaveBeenCalled();
  });
});
