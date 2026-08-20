// packages/rag/src/e2e.smoke.test.ts
import { describe, expect, it, vi } from "vitest";

import type { GenerationProvider } from "@egyptian-law/generation";
import { OllamaEmbeddingProvider } from "@egyptian-law/ingestion";

import { getChunksByIds } from "@egyptian-law/db";

import { PostgresVectorRetriever } from "@egyptian-law/ingestion";

import { DbRagRetriever } from "./retriever";
import { createRagService } from "./service";

describe("RAG real end-to-end smoke test", () => {
it("runs query -> Ollama embedding -> pgvector -> chunk loading -> reranking -> context -> generation -> citations", async () => {

    const embeddingProvider = new OllamaEmbeddingProvider({
      model: "bge-m3",
      dimensions: 1024,
    });

    const chunkLoader = {
      getChunksByIds,
    };

    const vectorRetriever = new PostgresVectorRetriever(chunkLoader);

    const retriever = new DbRagRetriever(embeddingProvider, vectorRetriever);

    const generator: GenerationProvider = {
      model: "smoke-test-generator",

      generate: vi.fn().mockResolvedValue({
        answer:
          "يحدد قانون العمل الإطار المنظم لعلاقات العمل والحقوق والالتزامات المرتبطة بها. [1]",
        metadata: {
          model: "smoke-test-generator",
          durationMs: 1,
        },
      }),
    };

    const service = createRagService(retriever, generator, {
      topK: 5,
      candidateTopK: 20,
    });

    const response = await service.answer({
      query: "ما الهدف من قانون العمل؟",
      retrieval: {
        lawDocumentId: "labour-law-148-2019",
        topK: 5,
        candidateTopK: 20,
      },
    });

    expect(response.answer).toBeTruthy();
    expect(response.answer.length).toBeGreaterThan(0);

    expect(response.retrieved.length).toBeGreaterThan(0);
    expect(response.retrieved.length).toBeLessThanOrEqual(5);

    // Every retrieved result must contain a real canonical chunk.
    for (const result of response.retrieved) {
      expect(result.chunk.id).toBeTruthy();

      expect(result.chunk.document_id).toBe("labour-law-148-2019");

      expect(result.chunk.law_name).toBe("قانون العمل");

      expect(result.chunk.law_number).toBe("148");

      expect(result.chunk.year).toBe("2019");

      expect(result.chunk.article_number).toBeTruthy();

      expect(result.chunk.text).toBeTruthy();

      expect(result.chunk.text_for_embedding).toBeTruthy();

      expect(result.vectorScore).toEqual(expect.any(Number));

      expect(result.retrievalScore).toEqual(expect.any(Number));

      expect(result.rerankScore).toEqual(expect.any(Number));

      expect(result.matchedTerms).toEqual(expect.any(Number));

      expect(result.termCoverage).toEqual(expect.any(Number));

      expect(result.exactPhraseMatch).toEqual(expect.any(Boolean));
    }

    expect(response.context.documents).toHaveLength(response.retrieved.length);

    expect(response.context.text).toBeTruthy();

    for (const [index, result] of response.retrieved.entries()) {
      const citationId = `[${index + 1}]`;

      expect(response.context.text).toContain(citationId);

      expect(response.context.text).toContain(result.chunk.text);

      expect(response.context.text).toContain(
        `المادة: ${result.chunk.article_number}`,
      );
    }

    expect(generator.generate).toHaveBeenCalledTimes(1);

    const generationRequest = vi.mocked(generator.generate).mock.calls[0]![0];

    expect(generationRequest.system).toContain(
      "مساعد قانوني متخصص في التشريعات المصرية",
    );

    expect(generationRequest.prompt).toContain("ما الهدف من قانون العمل؟");

    expect(generationRequest.prompt).toContain(response.context.text);

    expect(response.citations).toHaveLength(response.retrieved.length);

    for (const [index, citation] of response.citations.entries()) {
      const retrieved = response.retrieved[index]!;

      expect(citation).toMatchObject({
        id: `[${index + 1}]`,
        chunkId: retrieved.chunk.id,
        lawName: retrieved.chunk.law_name,
        lawNumber: retrieved.chunk.law_number,
        year: retrieved.chunk.year,
        articleNumber: retrieved.chunk.article_number,
        articleTitle: retrieved.chunk.article_title,
        sourceFile: retrieved.chunk.provenance.source_file,
        pageStart: retrieved.chunk.provenance.page_start,
        pageEnd: retrieved.chunk.provenance.page_end,
      });
    }

    expect(response.generation).toEqual({
      model: "smoke-test-generator",
      durationMs: 1,
    });

}, 30_000);
});
//schema.prisma
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

// Get a free hosted Postgres database in seconds: `npx create-db`

generator client {
provider = "prisma-client"
output = "../generated/prisma"
}

datasource db {
provider = "postgresql"
}

model LawDocument {
id String @id
lawName String @map("law_name")
lawNumber String? @map("law_number")
year String?

jurisdiction String
language String

sourceFile String @map("source_file")

parserVersion String? @map("parser_version")
normalizationVersion String? @map("normalization_version")

chunks LawChunk[]

createdAt DateTime @default(now()) @map("created_at")
updatedAt DateTime @updatedAt @map("updated_at")

@@index([lawName])
@@index([lawNumber])
@@index([year])
@@map("law_documents")
}

model LawChunk {
id String @id
documentId String @map("document_id")

articleNumber String @map("article_number")
articleTitle String? @map("article_title")

text String
textForEmbedding String @map("text_for_embedding")

sourcePageStart Int? @map("source_page_start")
sourcePageEnd Int? @map("source_page_end")

sourceOrder Int? @map("source_order")

hierarchy Json?

parserVersion String? @map("parser_version")
normalizationVersion String? @map("normalization_version")
ocrConfidence Float? @map("ocr_confidence")

document LawDocument @relation(fields: [documentId], references: [id], onDelete: Cascade)
embedding LawChunkEmbedding?

createdAt DateTime @default(now()) @map("created_at")
updatedAt DateTime @updatedAt @map("updated_at")

@@unique([documentId, articleNumber])
@@index([documentId])
@@index([articleNumber])
@@map("law_chunks")
}

model LawChunkEmbedding {
chunkId String @id @map("chunk_id")

model String
dimensions Int
embedding Unsupported("vector(1024)")

chunk LawChunk @relation(fields: [chunkId], references: [id], onDelete: Cascade)

createdAt DateTime @default(now()) @map("created_at")

@@map("law_chunk_embeddings")
}
//embedding.repository.ts
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
