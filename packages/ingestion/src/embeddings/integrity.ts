import type { CanonicalCorpus } from "@egyptian-law/core";

export interface EmbeddingRecord {
  chunk_id: string;
  embedding: number[];
}

export interface EmbeddingArtifact {
  schema_version: "1.0";
  model: string;
  dimensions: number;
  records: EmbeddingRecord[];
}

export interface EmbeddingIntegrityReport {
  corpusChunkCount: number;
  embeddingRecordCount: number;
  duplicateEmbeddingIds: string[];
  missingEmbeddingIds: string[];
  orphanEmbeddingIds: string[];
  invalidDimensions: Array<{
    chunk_id: string;
    expected: number;
    actual: number;
  }>;
  nonFiniteValues: string[];
}

export function validateEmbeddingIntegrity(
  corpus: CanonicalCorpus,
  artifact: EmbeddingArtifact,
): EmbeddingIntegrityReport {
  if (artifact.schema_version !== "1.0") {
    throw new Error(
      `Unsupported embedding schema version: ${artifact.schema_version}`,
    );
  }

  if (artifact.model !== "bge-m3") {
    throw new Error(`Unexpected embedding model: ${artifact.model}`);
  }

  if (artifact.dimensions !== 1024) {
    throw new Error(`Unexpected embedding dimensions: ${artifact.dimensions}`);
  }

  const canonicalIds = new Set(corpus.chunks.map((chunk) => chunk.id));

  const embeddingIds = new Set<string>();
  const duplicateEmbeddingIds: string[] = [];

  const invalidDimensions: EmbeddingIntegrityReport["invalidDimensions"] = [];

  const nonFiniteValues: string[] = [];

  for (const record of artifact.records) {
    if (embeddingIds.has(record.chunk_id)) {
      duplicateEmbeddingIds.push(record.chunk_id);
    }

    embeddingIds.add(record.chunk_id);

    if (record.embedding.length !== artifact.dimensions) {
      invalidDimensions.push({
        chunk_id: record.chunk_id,
        expected: artifact.dimensions,
        actual: record.embedding.length,
      });
    }

    if (!record.embedding.every(Number.isFinite)) {
      nonFiniteValues.push(record.chunk_id);
    }
  }

  const missingEmbeddingIds = corpus.chunks
    .map((chunk) => chunk.id)
    .filter((id) => !embeddingIds.has(id));

  const orphanEmbeddingIds = artifact.records
    .map((record) => record.chunk_id)
    .filter((id) => !canonicalIds.has(id));

  return {
    corpusChunkCount: corpus.chunks.length,
    embeddingRecordCount: artifact.records.length,
    duplicateEmbeddingIds,
    missingEmbeddingIds,
    orphanEmbeddingIds,
    invalidDimensions,
    nonFiniteValues,
  };
}

export function assertEmbeddingIntegrity(
  corpus: CanonicalCorpus,
  artifact: EmbeddingArtifact,
): EmbeddingIntegrityReport {
  const report = validateEmbeddingIntegrity(corpus, artifact);

  if (report.duplicateEmbeddingIds.length > 0) {
    throw new Error(
      `Duplicate embedding chunk IDs: ${report.duplicateEmbeddingIds.join(", ")}`,
    );
  }

  if (report.missingEmbeddingIds.length > 0) {
    throw new Error(
      `Missing embeddings for chunk IDs: ${report.missingEmbeddingIds.join(", ")}`,
    );
  }

  if (report.orphanEmbeddingIds.length > 0) {
    throw new Error(
      `Orphan embeddings found: ${report.orphanEmbeddingIds.join(", ")}`,
    );
  }

  if (report.corpusChunkCount !== report.embeddingRecordCount) {
    throw new Error(
      `Embedding count mismatch: corpus has ${report.corpusChunkCount} chunks, ` +
        `artifact has ${report.embeddingRecordCount} records.`,
    );
  }

  if (report.invalidDimensions.length > 0) {
    throw new Error(
      `Invalid embedding dimensions for ${report.invalidDimensions.length} records.`,
    );
  }

  if (report.nonFiniteValues.length > 0) {
    throw new Error(
      `Non-finite embedding values found for ${report.nonFiniteValues.length} records.`,
    );
  }

  return report;
}
