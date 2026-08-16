import { createHash } from "crypto";

import type { LawChunk, LawDocument } from "@egyptian-law/core";

export interface PersonalAffairsParserArticle {
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

  pages?: number[];
  sourceOrder?: number;
  source?: string;

  sourceRecordIds?: string[];

  qwenRecordCount?: number;
  recoveryRecordCount?: number;

  needsReview?: boolean;
  reviewReasons?: string[];
}

export interface PersonalAffairsParserOutput {
  metadataResolved: {
    lawName: string;
    lawNumber: string;
    year: string;
  };

  articles: PersonalAffairsParserArticle[];
}

const SOURCE_FILE = "personal_affair_law.pdf";
const PARSER_VERSION = "parser-v2.3";
const NORMALIZATION_VERSION = "parser-v2.3";

function stableId(prefix: string, value: string): string {
  const digest = createHash("sha256")
    .update(value, "utf8")
    .digest("hex")
    .slice(0, 16);

  return `${prefix}_${digest}`;
}

function normalizePageNumber(page: number | null | undefined): number | null {
  if (page == null) {
    return null;
  }

  if (!Number.isInteger(page) || page <= 0) {
    return null;
  }

  return page;
}

function buildDocumentId(input: PersonalAffairsParserOutput): string {
  const { lawName, lawNumber, year } = input.metadataResolved;

  return stableId("lawdoc", `${lawName}|${lawNumber}|${year}`);
}

function buildChunkId(
  documentId: string,
  article: PersonalAffairsParserArticle,
): string {
  /*
   * sourceOrder is part of the identity because the Personal Affairs
   * V2.3 corpus contains repeated article numbers inside different
   * parser records.
   *
   * We therefore must NOT identify a chunk using articleNumber alone.
   */
  const identity = [
    documentId,
    article.articleNumber,
    article.sourceOrder ?? "",
    article.pageStart ?? "",
    article.pageEnd ?? "",
    article.text,
  ].join("|");

  return stableId("lawchunk", identity);
}

function buildHierarchy(chapter: string | null): LawChunk["hierarchy"] {
  if (!chapter || !chapter.trim()) {
    return [];
  }

  return [
    {
      type: "chapter",
      label: chapter.trim(),
      title: null,
    },
  ];
}

export function canonicalizePersonalAffairsLaw(
  input: PersonalAffairsParserOutput,
): {
  schema_version: "1.0";
  document: LawDocument;
  chunks: LawChunk[];
} {
  const { lawName, lawNumber, year } = input.metadataResolved;

  const documentId = buildDocumentId(input);

  const document: LawDocument = {
    id: documentId,

    law_name: lawName,
    law_number: lawNumber ?? null,
    year: year ?? null,

    jurisdiction: "EG",
    language: "ar",

    source_file: SOURCE_FILE,

    metadata: {
      parser_version: PARSER_VERSION,
      normalization_version: NORMALIZATION_VERSION,
    },
  };

  const chunks: LawChunk[] = input.articles.map((article) => {
    const chunk: LawChunk = {
      id: buildChunkId(documentId, article),

      document_id: documentId,

      law_name: article.lawName,
      law_number: article.lawNumber ?? null,
      year: article.year ?? null,

      /*
       * Preserve the parser's original article number.
       *
       * We deliberately do not replace this with
       * articleNumberNormalized because the real corpus contains
       * values such as "الثالثة", "الرابعة", "الخامسة", and "السادسة"
       * for which normalization is null.
       */
      article_number: article.articleNumber,
      article_title: null,

      hierarchy: buildHierarchy(article.chapter),

      text: article.text,
      text_for_embedding: article.textForEmbedding,

      provenance: {
        source_file: SOURCE_FILE,
        page_start: normalizePageNumber(article.pageStart),
        page_end: normalizePageNumber(article.pageEnd),
      },

      metadata: {
        parser_version: PARSER_VERSION,
        normalization_version: NORMALIZATION_VERSION,
        ocr_confidence: null,
      },
    };

    return chunk;
  });

  return {
    schema_version: "1.0",
    document,
    chunks,
  };
}
