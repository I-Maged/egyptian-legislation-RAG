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
export interface LegacyParserV23LawChunk {
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

export interface CurrentParserV23LawChunk {
  instrumentId: string;

  lawName: string;
  lawNumber: string;
  year: string;

  articleNumber: string;
  articleNumberNormalized: number | null;
  articleSuffix: string | null;

  chapter: string | null;

  text: string;
  textForEmbedding: string;

  pageStart: number | null;
  pageEnd: number | null;
  pages: number[];

  sourceOrder: number;

  source?: "vision_ocr";

  sourceRecordIds: string[];
  qwenRecordCount: number;
  recoveryRecordCount: number;

  needsReview: boolean;
  reviewReasons: string[];
}

export type ParserV23LawChunk = LegacyParserV23LawChunk | CurrentParserV23LawChunk;

function getChunkString(
  chunk: ParserV23LawChunk,
  camelCaseKey: string,
  snakeCaseKey: string,
): string {
  const record = chunk as Record<string, unknown>;

  const value = record[camelCaseKey] ?? record[snakeCaseKey];

  if (typeof value !== "string") {
    return "";
  }

  return value;
}

function getChunkNumber(
  chunk: ParserV23LawChunk,
  camelCaseKey: string,
  snakeCaseKey: string,
): number | null {
  const record = chunk as Record<string, unknown>;

  const value = record[camelCaseKey] ?? record[snakeCaseKey];

  if (typeof value !== "number") {
    return null;
  }

  return value;
}

function getChunkNullableString(
  chunk: ParserV23LawChunk,
  camelCaseKey: string,
  snakeCaseKey: string,
): string | null {
  const value = getChunkString(chunk, camelCaseKey, snakeCaseKey);

  return value === "" ? null : value;
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

  const firstLawName = getChunkString(first, "lawName", "law_name");
  const firstLawNumber = getChunkNullableString(first, "lawNumber", "law_number");
  const firstYear = getChunkNullableString(first, "year", "year");

  const documentId = createDocumentId(
    firstLawName,
    firstLawNumber,
    firstYear,
    options.source_file,
  );

  const document: LawDocument = {
    id: documentId,

    law_name: firstLawName,
    law_number: firstLawNumber,
    year: firstYear,

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
    const articleNumber = getChunkString(
      parserChunk,
      "articleNumber",
      "article_number",
    );
    const lawName = getChunkString(parserChunk, "lawName", "law_name");
    const lawNumber = getChunkNullableString(parserChunk, "lawNumber", "law_number");
    const year = getChunkNullableString(parserChunk, "year", "year");
    const chapter = getChunkNullableString(parserChunk, "chapter", "chapter");
    const text = getChunkString(parserChunk, "text", "text");
    const textForEmbedding = getChunkString(
      parserChunk,
      "textForEmbedding",
      "text_for_embedding",
    );
    const page = getChunkNumber(parserChunk, "pageStart", "page_number");

    const occurrenceIndex = articleOccurrences.get(articleNumber) ?? 0;

    articleOccurrences.set(articleNumber, occurrenceIndex + 1);

    const id = createChunkId(documentId, articleNumber, occurrenceIndex);

    const chunk: CanonicalLawChunk = {
      id,

      document_id: documentId,

      law_name: lawName,
      law_number: lawNumber,
      year,

      article_number: articleNumber,
      article_title: null,

      chapter,
      section: null,
      paragraph: null,

      text,
      text_for_embedding: textForEmbedding,

      provenance: {
        source_file: options.source_file,
        page: normalizePageNumber(page),
      },

      metadata: {
        parser_version: options.parser_version,
        normalization_version: options.normalization_version,
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
