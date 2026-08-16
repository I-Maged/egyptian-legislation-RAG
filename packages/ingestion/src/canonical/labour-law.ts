import { createHash } from "crypto";

import type {
  LawChunk as CanonicalLawChunk,
  LawDocument,
} from "@egyptian-law/core";

import { LawChunkSchema, LawDocumentSchema } from "@egyptian-law/core";

/**
 * Exact output shape produced by the current parser v2.3.
 *
 * We intentionally define this locally rather than importing the parser's
 * LawChunk type. This keeps the canonical layer independent from the parser
 * implementation.
 */
export interface ParserV23LawChunk {
  law_name: string;
  law_number: string;
  year: string;
  article_number: string;
  chapter: string | null;
  text: string;
  text_for_embedding: string;
  page_number: number;
  source?: "vision_ocr";
}

export interface CanonicalizeOptions {
  source_file: string;

  /**
   * Version of the parser that produced the input.
   *
   * Example:
   *   "parser-v2.3"
   */
  parser_version: string;

  /**
   * Version/name of the normalization process that produced
   * text_for_embedding.
   *
   * Example:
   *   "arabic-normalization-v1"
   */
  normalization_version: string;
}

export interface CanonicalLawCorpus {
  document: LawDocument;
  chunks: CanonicalLawChunk[];
}

/**
 * Create a stable document ID from the legal identity + source file.
 *
 * The same document metadata and source file will produce the same ID.
 */
function createDocumentId(
  lawName: string,
  lawNumber: string | null,
  year: string | null,
  sourceFile: string,
): string {
  const identity = [lawName, lawNumber ?? "", year ?? "", sourceFile].join("|");

  const hash = createHash("sha256")
    .update(identity, "utf8")
    .digest("hex")
    .slice(0, 16);

  return `lawdoc_${hash}`;
}

/**
 * Create a stable chunk ID.
 *
 * The occurrence index is important because article numbers are not
 * guaranteed to be unique in a damaged/parser output.
 */
function createChunkId(
  documentId: string,
  articleNumber: string,
  occurrenceIndex: number,
): string {
  const identity = [documentId, articleNumber, occurrenceIndex].join("|");

  const hash = createHash("sha256")
    .update(identity, "utf8")
    .digest("hex")
    .slice(0, 16);

  return `lawchunk_${hash}`;
}

/**
 * Convert parser-v2.3 output into our canonical legal corpus format.
 */
export function canonicalizeLabourLaw(
  parserChunks: ParserV23LawChunk[],
  options: CanonicalizeOptions,
): CanonicalLawCorpus {
  if (parserChunks.length === 0) {
    throw new Error("Cannot canonicalize an empty parser output.");
  }

  const first = parserChunks[0]!;

  const documentId = createDocumentId(
    first.law_name,
    first.law_number,
    first.year,
    options.source_file,
  );

  const document: LawDocument = {
    id: documentId,

    law_name: first.law_name,
    law_number: first.law_number,
    year: first.year,

    jurisdiction: "EG",
    language: "ar",

    source_file: options.source_file,

    metadata: {
      parser_version: options.parser_version,
      normalization_version: options.normalization_version,
    },
  };

  // Track repeated article numbers so chunk IDs remain unique.
  const articleOccurrences = new Map<string, number>();

  const chunks: CanonicalLawChunk[] = parserChunks.map((parserChunk) => {
    const occurrenceIndex =
      articleOccurrences.get(parserChunk.article_number) ?? 0;

    articleOccurrences.set(parserChunk.article_number, occurrenceIndex + 1);

    const id = createChunkId(
      documentId,
      parserChunk.article_number,
      occurrenceIndex,
    );

    const chunk: CanonicalLawChunk = {
      id,

      document_id: documentId,

      law_name: parserChunk.law_name,
      law_number: parserChunk.law_number,
      year: parserChunk.year,

      article_number: parserChunk.article_number,
      article_title: null,

      chapter: parserChunk.chapter,
      section: null,
      paragraph: null,

      text: parserChunk.text,
      text_for_embedding: parserChunk.text_for_embedding,

      provenance: {
        source_file: options.source_file,
        page: normalizePageNumber(parserChunk.page_number),
      },

      metadata: {
        parser_version: options.parser_version,
        normalization_version: options.normalization_version,

        // Parser v2.3 only tells us whether vision OCR was used;
        // it does not provide a numeric confidence score.
        ocr_confidence: null,
      },
    };

    return LawChunkSchema.parse(chunk);
  });

  LawDocumentSchema.parse(document);

  return {
    document,
    chunks,
  };
}

/**
 * Parser v2.3 uses a numeric page_number.
 *
 * Canonical schema requires a positive integer when a page exists.
 * Invalid/missing values become null rather than being invented.
 */
function normalizePageNumber(page: number | null | undefined): number | null {
  if (page == null) {
    return null;
  }

  if (!Number.isInteger(page) || page <= 0) {
    return null;
  }

  return page;
}
