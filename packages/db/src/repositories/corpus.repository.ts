import type { CanonicalCorpus } from "@egyptian-law/core";
import { Prisma } from "../../generated/prisma/client";

import { prisma } from "../client";
export async function upsertCorpus(corpus: CanonicalCorpus): Promise<{
  documentId: string;
  chunksInserted: number;
}> {
  const document = corpus.document;

  return prisma.$transaction(
    async (tx) => {
      await tx.lawDocument.upsert({
        where: {
          id: document.id,
        },
        create: {
          id: document.id,
          lawName: document.law_name,
          lawNumber: document.law_number,
          year: document.year,
          jurisdiction: document.jurisdiction,
          language: document.language,
          sourceFile: document.source_file,
          parserVersion: document.metadata.parser_version,
          normalizationVersion: document.metadata.normalization_version,
        },
        update: {
          lawName: document.law_name,
          lawNumber: document.law_number,
          year: document.year,
          jurisdiction: document.jurisdiction,
          language: document.language,
          sourceFile: document.source_file,
          parserVersion: document.metadata.parser_version,
          normalizationVersion: document.metadata.normalization_version,
        },
      });

      for (const chunk of corpus.chunks) {
        await tx.lawChunk.upsert({
          where: {
            id: chunk.id,
          },
          create: {
            id: chunk.id,
            documentId: document.id,

            articleNumber: chunk.article_number,
            articleTitle: chunk.article_title,

            text: chunk.text,
            textForEmbedding: chunk.text_for_embedding,

            sourcePageStart: chunk.provenance.page_start,
            sourcePageEnd: chunk.provenance.page_end,

            sourceOrder: chunk.source_order,

            hierarchy: chunk.hierarchy,

            parserVersion: chunk.metadata.parser_version,
            normalizationVersion: chunk.metadata.normalization_version,
            ocrConfidence: chunk.metadata.ocr_confidence,
          },
          update: {
            documentId: document.id,

            articleNumber: chunk.article_number,
            articleTitle: chunk.article_title,

            text: chunk.text,
            textForEmbedding: chunk.text_for_embedding,

            sourcePageStart: chunk.provenance.page_start,
            sourcePageEnd: chunk.provenance.page_end,

            sourceOrder: chunk.source_order,

            hierarchy: chunk.hierarchy,

            parserVersion: chunk.metadata.parser_version,
            normalizationVersion: chunk.metadata.normalization_version,
            ocrConfidence: chunk.metadata.ocr_confidence,
          },
        });
      }

      return {
        documentId: document.id,
        chunksInserted: corpus.chunks.length,
      };
    },
    {
      maxWait: 10_000,
      timeout: 60_000,
    },
  );
}
