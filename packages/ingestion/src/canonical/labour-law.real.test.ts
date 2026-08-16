import { readFile } from "fs/promises";
import { resolve } from "path";

import { describe, expect, it } from "vitest";

import { LawChunkSchema, LawDocumentSchema } from "@egyptian-law/core";

import { canonicalizeLabourLaw, type ParserV23LawChunk } from "./labour-law";

describe("canonicalizeLabourLaw - real parser output", () => {
  it("canonicalizes a real V2.3 JSON sample", async () => {
    const filePath = resolve(
      process.cwd(),
      "packages/ingestion/test-data/labour-v2.3.sample.json",
    );

    const file = await readFile(filePath, "utf8");

    const parserChunks = JSON.parse(file) as ParserV23LawChunk[];

    expect(parserChunks.length).toBeGreaterThan(0);

    const result = canonicalizeLabourLaw(parserChunks, {
      source_file: "labour-v2.3.pdf",
      parser_version: "parser-v2.3",
      normalization_version: "parser-v2.3",
    });

    // Canonical document must be valid.
    expect(LawDocumentSchema.safeParse(result.document).success).toBe(true);

    // Every canonical chunk must be valid.
    for (const chunk of result.chunks) {
      expect(LawChunkSchema.safeParse(chunk).success).toBe(true);
    }

    // One canonical chunk per parser chunk.
    expect(result.chunks).toHaveLength(parserChunks.length);

    // Every chunk belongs to the canonical document.
    for (const chunk of result.chunks) {
      expect(chunk.document_id).toBe(result.document.id);
    }

    // IDs must be unique.
    const ids = result.chunks.map((chunk) => chunk.id);

    expect(new Set(ids).size).toBe(ids.length);

    // The canonicalizer must preserve parser content.
    for (let i = 0; i < parserChunks.length; i++) {
      const source = parserChunks[i];
      const canonical = result.chunks[i];

      expect(canonical?.law_name).toBe(source?.lawName);

      expect(canonical?.law_number).toBe(source?.lawNumber);

      expect(canonical?.year).toBe(source?.year);

      expect(canonical?.article_number).toBe(source?.articleNumber);

      expect(canonical?.chapter).toBe(source?.chapter);

      expect(canonical?.text).toBe(source?.text);

      expect(canonical?.text_for_embedding).toBe(source?.textForEmbedding);

      expect(canonical?.provenance.page).toBe(
        source?.pageStart !== null && source?.pageStart > 0
          ? source?.pageStart
          : null,
      );
    }
    console.dir(result, { depth: null });
  });
});
