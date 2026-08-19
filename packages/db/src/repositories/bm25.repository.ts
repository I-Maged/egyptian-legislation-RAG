import { Prisma } from "../../generated/prisma/client";
import { prisma } from "../client";

export interface Bm25SearchInput {
  query: string;
  topK: number;
  lawDocumentId?: string;
}

export interface Bm25SearchResult {
  chunkId: string;
  score: number;
}

export async function searchBm25(
  input: Bm25SearchInput,
): Promise<Bm25SearchResult[]> {
  const query = input.query.trim();

  if (!query) {
    return [];
  }

  if (!Number.isInteger(input.topK) || input.topK <= 0) {
    throw new Error(`Invalid topK: ${input.topK}`);
  }

  if (input.lawDocumentId !== undefined) {
    return prisma.$queryRaw<Bm25SearchResult[]>(
      Prisma.sql`
        SELECT
          c."id" AS "chunkId",
          ts_rank_cd(
            to_tsvector('simple', c."text_for_embedding"),
            plainto_tsquery('simple', ${query})
          )::double precision AS "score"
        FROM "law_chunks" c
        WHERE
          c."document_id" = ${input.lawDocumentId}
          AND to_tsvector(
            'simple',
            c."text_for_embedding"
          ) @@ plainto_tsquery('simple', ${query})
        ORDER BY "score" DESC, c."id" ASC
        LIMIT ${input.topK}
      `,
    );
  }

  return prisma.$queryRaw<Bm25SearchResult[]>(
    Prisma.sql`
      SELECT
        c."id" AS "chunkId",
        ts_rank_cd(
          to_tsvector('simple', c."text_for_embedding"),
          plainto_tsquery('simple', ${query})
        )::double precision AS "score"
      FROM "law_chunks" c
      WHERE
        to_tsvector(
          'simple',
          c."text_for_embedding"
        ) @@ plainto_tsquery('simple', ${query})
      ORDER BY "score" DESC, c."id" ASC
      LIMIT ${input.topK}
    `,
  );
}
