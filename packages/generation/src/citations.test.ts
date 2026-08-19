import { describe, expect, it } from "vitest";

import type { LawChunk } from "@egyptian-law/core";

import { buildCitations, extractCitationIds } from "./citations";

function createChunk(id: string, article: string): LawChunk {
  return {
    id,
    document_id: "doc-1",
    law_name: "قانون العمل",
    law_number: "148",
    year: "2019",
    article_number: article,
    article_title: null,
    source_order: null,
    hierarchy: [],
    text: "نص قانوني.",
    text_for_embedding: "نص قانوني.",
    provenance: {
      source_file: "labour-law.pdf",
      page_start: 5,
      page_end: 6,
    },
    metadata: {
      parser_version: "test",
      normalization_version: "test",
      ocr_confidence: 1,
    },
  };
}

describe("citations", () => {
  it("extracts unique citation IDs", () => {
    expect(extractCitationIds("النص [C1] والتفصيل [C2] ثم [C1].")).toEqual([
      "C1",
      "C2",
    ]);
  });

  it("ignores malformed citation numbers", () => {
    expect(extractCitationIds("اختبار [C0] [C-1] [CABC] [C2].")).toEqual([
      "C2",
    ]);
  });

  it("resolves citations to supplied chunks", () => {
    const chunks = [createChunk("chunk-1", "1"), createChunk("chunk-2", "2")];

    const result = buildCitations(
      "وفقًا للمادة [C1]، كما توضح المادة [C2].",
      chunks,
    );

    expect(result).toEqual([
      {
        citationId: "C1",
        chunkId: "chunk-1",
        lawName: "قانون العمل",
        lawNumber: "148",
        year: "2019",
        articleNumber: "1",
        articleTitle: null,
        sourceFile: "labour-law.pdf",
        pageStart: 5,
        pageEnd: 6,
      },
      {
        citationId: "C2",
        chunkId: "chunk-2",
        lawName: "قانون العمل",
        lawNumber: "148",
        year: "2019",
        articleNumber: "2",
        articleTitle: null,
        sourceFile: "labour-law.pdf",
        pageStart: 5,
        pageEnd: 6,
      },
    ]);
  });

  it("does not create citations for unavailable context", () => {
    const result = buildCitations("هذه المعلومة [C1] وهذه [C99].", [
      createChunk("chunk-1", "1"),
    ]);

    expect(result).toHaveLength(1);
    expect(result[0]?.citationId).toBe("C1");
  });
});
