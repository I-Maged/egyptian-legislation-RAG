import { readFile } from "fs/promises";
import { resolve } from "path";
import { fileURLToPath } from "url";

import { describe, expect, it } from "vitest";

import { validateCanonicalCorpus } from "@egyptian-law/core";

import type { ParserV23LawChunk } from "../canonical/labour-law";

interface LabourV23Output {
  articles: ParserV23LawChunk[];
}

describe("Labour Law canonical corpus integrity", () => {
  it("validates the complete migrated corpus", async () => {
    const ROOT_DIR = resolve(
      fileURLToPath(new URL("../../../../", import.meta.url)),
    );
    const rawPath = resolve(ROOT_DIR, "data/raw/labour-v2.3.json");
    const canonicalPath = resolve(
      ROOT_DIR,
      "data/canonical/labour-law-148-2019.json",
    );

    const [rawJson, canonicalJson] = await Promise.all([
      readFile(rawPath, "utf8"),
      readFile(canonicalPath, "utf8"),
    ]);

    const raw = JSON.parse(rawJson) as LabourV23Output;
    const canonical = JSON.parse(canonicalJson) as unknown;
    const corpus = validateCanonicalCorpus(canonical);

    /*
     * 1. Corpus size & document identity
     */
    expect(raw.articles.length).toBe(293);
    expect(corpus.chunks.length).toBe(raw.articles.length);

    const firstArticle = raw.articles[0]!;
    expect(corpus.document.law_name).toBe(firstArticle.lawName);
    expect(corpus.document.law_number).toBe(firstArticle.lawNumber);
    expect(corpus.document.year).toBe(firstArticle.year);
    expect(corpus.document.jurisdiction).toBe("EG");
    expect(corpus.document.language).toBe("ar");

    /*
     * 2. Schema and metadata integrity
     */
    expect(corpus.schema_version).toBe("1.0");
    expect(corpus.document.metadata.parser_version).toBe("parser-v2.3");
    expect(corpus.document.metadata.normalization_version).toBe("parser-v2.3");

    /*
     * 3. Uniqueness of Chunk IDs
     */
    const chunkIds = corpus.chunks.map((chunk) => chunk.id);
    expect(new Set(chunkIds).size).toBe(chunkIds.length);

    /*
     * 4. Verify parser -> canonical content preservation
     */
    expect(corpus.chunks).toMatchObject(
      raw.articles.map((source) => ({
        law_name: source.lawName,
        law_number: source.lawNumber,
        year: source.year,
        article_number: source.articleNumber,

        hierarchy: [
          {
            type: "chapter",
            label: source.chapter,
            title: null,
          },
        ],
        text: source.text,
        text_for_embedding: source.textForEmbedding,
        provenance: {
          page_start:
            source.pageStart && source.pageStart > 0 ? source.pageStart : null,
        },
      })),
    );

    /*
     * 5. Consolidated Chunk Invariant Validations
     */
    for (const chunk of corpus.chunks) {
      expect(chunk.document_id).toBe(corpus.document.id);
      expect(chunk.text.trim().length).toBeGreaterThan(0);
      expect(chunk.text_for_embedding.trim().length).toBeGreaterThan(0);
      expect(chunk.article_number.trim().length).toBeGreaterThan(0);
      expect(chunk.provenance.source_file.trim().length).toBeGreaterThan(0);

      if (chunk.provenance.page_start !== null) {
        expect(chunk.provenance.page_start).toBeGreaterThan(0);
      }
      if (chunk.provenance.page_end !== null) {
        expect(chunk.provenance.page_end).toBeGreaterThan(0);
      }

      if (
        chunk.provenance.page_start !== null &&
        chunk.provenance.page_end !== null
      ) {
        expect(chunk.provenance.page_end).toBeGreaterThanOrEqual(
          chunk.provenance.page_start,
        );
      }

      expect(chunk.metadata.parser_version).toBe("parser-v2.3");
      expect(chunk.metadata.normalization_version).toBe("parser-v2.3");
    }
  });
});
