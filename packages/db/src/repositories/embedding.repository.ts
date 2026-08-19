import type { EmbeddingArtifact } from "@egyptian-law/core";
import { Prisma } from "../../generated/prisma/client";
import { prisma } from "../client";

export interface UpsertEmbeddingInput {
  chunkId: string;
  model: string;
  dimensions: number;
  embedding: number[];
}

export async function upsertEmbedding(
  input: UpsertEmbeddingInput,
): Promise<void> {
  if (input.embedding.length !== input.dimensions) {
    throw new Error(
      `Embedding dimension mismatch for ${input.chunkId}: ` +
        `expected ${input.dimensions}, got ${input.embedding.length}.`,
    );
  }

  const vector = `[${input.embedding.join(",")}]`;

  await prisma.$executeRaw(
    Prisma.sql`
      INSERT INTO "law_chunk_embeddings"
        ("chunk_id", "model", "dimensions", "embedding")
      VALUES
        (${input.chunkId}, ${input.model}, ${input.dimensions}, ${vector}::vector)
      ON CONFLICT ("chunk_id")
      DO UPDATE SET
        "model" = EXCLUDED."model",
        "dimensions" = EXCLUDED."dimensions",
        "embedding" = EXCLUDED."embedding"
    `,
  );
}

export async function upsertEmbeddings(
  artifact: EmbeddingArtifact,
): Promise<number> {
  if (artifact.records.length === 0) {
    return 0;
  }

  for (const record of artifact.records) {
    if (record.dimensions !== artifact.dimensions) {
      throw new Error(
        `Embedding dimension mismatch for ${record.chunk_id}: ` +
          `artifact expects ${artifact.dimensions}, ` +
          `record has ${record.dimensions}.`,
      );
    }

    if (record.embedding.length !== artifact.dimensions) {
      throw new Error(
        `Invalid embedding length for ${record.chunk_id}: ` +
          `expected ${artifact.dimensions}, got ${record.embedding.length}.`,
      );
    }

    await upsertEmbedding({
      chunkId: record.chunk_id,
      model: record.model,
      dimensions: record.dimensions,
      embedding: record.embedding,
    });
  }

  return artifact.records.length;
}
