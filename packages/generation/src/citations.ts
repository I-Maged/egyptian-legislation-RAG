import type { LawChunk } from "@egyptian-law/core";

import type { GenerationCitation } from "./types";
import { buildGenerationContext } from "./context";

const CITATION_PATTERN = /\[C(\d+)\]/g;

export function extractCitationIds(answer: string): string[] {
  const ids = new Set<string>();

  for (const match of answer.matchAll(CITATION_PATTERN)) {
    const index = Number(match[1]);

    if (Number.isInteger(index) && index > 0) {
      ids.add(`C${index}`);
    }
  }

  return [...ids];
}

export function buildCitations(
  answer: string,
  chunks: LawChunk[],
): GenerationCitation[] {
  const citationIds = extractCitationIds(answer);

  const context = buildGenerationContext(chunks);

  const contextByCitationId = new Map(
    context.map((item) => [item.citationId, item.chunk]),
  );

  return citationIds.flatMap((citationId) => {
    const chunk = contextByCitationId.get(citationId);

    /**
     * Never expose a citation for a source that was not
     * supplied to the generation model.
     */
    if (!chunk) {
      return [];
    }

    return [
      {
        citationId,

        chunkId: chunk.id,

        lawName: chunk.law_name,
        lawNumber: chunk.law_number,
        year: chunk.year,

        articleNumber: chunk.article_number,
        articleTitle: chunk.article_title,

        sourceFile: chunk.provenance.source_file,
        pageStart: chunk.provenance.page_start,
        pageEnd: chunk.provenance.page_end,
      },
    ];
  });
}
