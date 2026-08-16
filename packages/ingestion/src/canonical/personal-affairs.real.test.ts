import { readFile } from "fs/promises";
import { resolve } from "path";

import { describe, expect, it } from "vitest";

import {
  validateCanonicalCorpus,
  type CanonicalCorpus,
} from "@egyptian-law/core";

import {
  canonicalizePersonalAffairsLaw,
  type PersonalAffairsParserOutput,
} from "./personal-affairs";

describe("canonicalizePersonalAffairsLaw - real V2.3 output", () => {
  it("canonicalizes the complete Personal Affairs V2.3 JSON corpus", async () => {
    // const inputPath = resolve(
    //   process.cwd(),
    //   "../../../data/raw/personal_affair_law_v2_3.json",
    // );
    const inputPath = resolve(
      process.cwd(),
      "data/raw/personal_affair_law_v2_3.json",
    );

    const raw = await readFile(inputPath, "utf8");
    const parserOutput = JSON.parse(raw) as PersonalAffairsParserOutput;

    const result = canonicalizePersonalAffairsLaw(parserOutput);

    // ------------------------------------------------------------
    // Document-level invariants
    // ------------------------------------------------------------

    expect(result.schema_version).toBe("1.0");

    expect(result.document.law_name).toBe("personal_affair_law");

    expect(result.document.law_number).toBe("25");
    expect(result.document.year).toBe("1929");

    expect(result.document.jurisdiction).toBe("EG");
    expect(result.document.language).toBe("ar");

    expect(result.document.source_file).toBe("personal_affair_law.pdf");

    // ------------------------------------------------------------
    // Corpus size
    // ------------------------------------------------------------

    /*
     * The V2.3 file contains 390 parser article records.
     *
     * Our current canonicalization contract is:
     *
     *   1 parser article record -> 1 canonical chunk
     *
     * We deliberately do NOT split repeated "مادة X" markers
     * inside an individual parser record.
     */
    expect(parserOutput.articles).toHaveLength(92);
    expect(result.chunks).toHaveLength(92);

    // ------------------------------------------------------------
    // Canonical corpus validation
    // ------------------------------------------------------------

    let validated: CanonicalCorpus;

    expect(() => {
      validated = validateCanonicalCorpus(result);
    }).not.toThrow();

    // Make TypeScript aware that validation succeeded.
    expect(validated!).toEqual(result);

    // ------------------------------------------------------------
    // Chunk IDs
    // ------------------------------------------------------------

    const chunkIds = result.chunks.map((chunk) => chunk.id);

    expect(new Set(chunkIds).size).toBe(chunkIds.length);

    expect(chunkIds.every((id) => id.startsWith("lawchunk_"))).toBe(true);

    // ------------------------------------------------------------
    // Document relationships
    // ------------------------------------------------------------

    expect(
      result.chunks.every((chunk) => chunk.document_id === result.document.id),
    ).toBe(true);

    // ------------------------------------------------------------
    // Required content
    // ------------------------------------------------------------

    expect(
      result.chunks.every(
        (chunk) =>
          typeof chunk.article_number === "string" &&
          chunk.article_number.length > 0,
      ),
    ).toBe(true);

    expect(
      result.chunks.every(
        (chunk) => typeof chunk.text === "string" && chunk.text.length > 0,
      ),
    ).toBe(true);

    expect(
      result.chunks.every(
        (chunk) =>
          typeof chunk.text_for_embedding === "string" &&
          chunk.text_for_embedding.length > 0,
      ),
    ).toBe(true);

    // ------------------------------------------------------------
    // Canonical metadata consistency
    // ------------------------------------------------------------

    expect(
      result.chunks.every(
        (chunk) =>
          chunk.law_name === result.document.law_name &&
          chunk.law_number === result.document.law_number &&
          chunk.year === result.document.year,
      ),
    ).toBe(true);

    // ------------------------------------------------------------
    // Provenance
    // ------------------------------------------------------------

    expect(
      result.chunks.every(
        (chunk) => chunk.provenance.source_file === "personal_affair_law.pdf",
      ),
    ).toBe(true);

    expect(
      result.chunks.every((chunk) => {
        const { page_start, page_end } = chunk.provenance;

        if (page_start === null || page_end === null) {
          return true;
        }

        return page_start > 0 && page_end > 0 && page_end >= page_start;
      }),
    ).toBe(true);

    // ------------------------------------------------------------
    // Hierarchy
    // ------------------------------------------------------------

    expect(result.chunks.every((chunk) => Array.isArray(chunk.hierarchy))).toBe(
      true,
    );

    // ------------------------------------------------------------
    // Parser / normalization metadata
    // ------------------------------------------------------------

    expect(
      result.chunks.every(
        (chunk) =>
          chunk.metadata.parser_version === "parser-v2.3" &&
          chunk.metadata.normalization_version === "parser-v2.3",
      ),
    ).toBe(true);

    // ------------------------------------------------------------
    // Known V2.3 edge cases
    // ------------------------------------------------------------

    /*
     * The real corpus contains article numbers that could not
     * be normalized numerically:
     *
     *   الثالثة
     *   الرابعة
     *   الخامسة
     *   السادسة
     *
     * The canonicalizer must preserve the parser's original
     * article_number rather than dropping or converting it.
     */
    const nonNumericArticleNumbers = [
      "الثالثة",
      "الرابعة",
      "الخامسة",
      "السادسة",
    ];

    for (const articleNumber of nonNumericArticleNumbers) {
      expect(
        result.chunks.some((chunk) => chunk.article_number === articleNumber),
      ).toBe(true);
    }

    // ------------------------------------------------------------
    // Multi-page articles
    // ------------------------------------------------------------

    const multiPageChunks = result.chunks.filter((chunk) => {
      const { page_start, page_end } = chunk.provenance;

      return page_start !== null && page_end !== null && page_end > page_start;
    });

    /*
     * The V2.3 corpus contains many multi-page records.
     * We don't assert the exact count here because that is a
     * parser-data statistic rather than a canonicalizer contract.
     */
    expect(multiPageChunks.length).toBeGreaterThan(0);

    // ------------------------------------------------------------
    // Source text preservation
    // ------------------------------------------------------------

    /*
     * text and text_for_embedding are intentionally separate
     * canonical fields.
     *
     * At minimum, real records must preserve both.
     */
    expect(
      result.chunks.every(
        (chunk) =>
          chunk.text.trim().length > 0 &&
          chunk.text_for_embedding.trim().length > 0,
      ),
    ).toBe(true);
  });
});
