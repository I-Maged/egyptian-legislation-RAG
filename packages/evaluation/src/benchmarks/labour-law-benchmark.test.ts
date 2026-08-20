// $env:RUN_LABOUR_LAW_BENCHMARK="1"; npx vitest run packages/evaluation/src/benchmarks/labour-law-benchmark.test.ts

import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

import type { CanonicalCorpus, EmbeddingArtifact } from "@egyptian-law/core";

import { OllamaEmbeddingProvider } from "@egyptian-law/ingestion";

import { getChunksByIds } from "@egyptian-law/db";

import {
  createDbVectorRerankedRetriever,
  createDbVectorRetriever,
} from "./db-retrieval-adapters";

import { buildLabourLawGoldDataset } from "../datasets/labour-law-gold";

import { runRetrievalBenchmark } from "./retrieval-benchmark";
import { runContextBenchmark } from "./context-benchmark";

const RUN_REAL_BENCHMARK = process.env.RUN_LABOUR_LAW_BENCHMARK === "1";

const CORPUS_PATH = resolve(
  process.cwd(),
  "data/canonical/labour-law-148-2019.json",
);

const EMBEDDING_ARTIFACT_PATH = resolve(
  process.cwd(),
  "data/embeddings/labour-law-148-2019.json",
);

async function readJsonFile<T>(path: string): Promise<T> {
  const json = await readFile(path, "utf8");

  return JSON.parse(json) as T;
}

async function loadLabourLawCorpus(): Promise<CanonicalCorpus> {
  return readJsonFile<CanonicalCorpus>(CORPUS_PATH);
}

async function loadLabourLawEmbeddingArtifact(): Promise<EmbeddingArtifact> {
  return readJsonFile<EmbeddingArtifact>(EMBEDDING_ARTIFACT_PATH);
}

interface DiagnosticResult {
  rank: number;
  chunkId: string;
  articleNumber: string;
  relevant: boolean;
}

interface QueryDiagnostics {
  queryId: string;
  query: string;
  goldArticles: string[];
  goldChunkIds: string[];

  vector: DiagnosticResult[];
  vectorReranked: DiagnosticResult[];

  vectorFirstRelevantRank: number | null;
  vectorRerankedFirstRelevantRank: number | null;
}

function firstRelevantRank(results: DiagnosticResult[]): number | null {
  const result = results.find((result) => result.relevant);

  return result?.rank ?? null;
}

function formatRank(rank: number | null): string {
  return rank === null ? "MISS" : String(rank);
}

describe.skipIf(!RUN_REAL_BENCHMARK)("Labour Law retrieval benchmark", () => {
  it("evaluates DB vector retrieval and vector+rereanking on the real corpus", async () => {
    /*
     * ------------------------------------------------------------
     * Load local benchmark artifacts
     * ------------------------------------------------------------
     */

    const corpus = await loadLabourLawCorpus();

    const embeddingArtifact = await loadLabourLawEmbeddingArtifact();

    expect(corpus.chunks.length).toBeGreaterThan(0);

    expect(embeddingArtifact.records.length).toBe(corpus.chunks.length);

    expect(embeddingArtifact.dimensions).toBeGreaterThan(0);

    const gold = buildLabourLawGoldDataset(corpus);

    expect(gold.items).toHaveLength(15);

    /*
     * The query embedding model MUST match the model used to
     * generate the stored corpus embeddings.
     */
    const embeddingProvider = new OllamaEmbeddingProvider({
      model: embeddingArtifact.model,
      dimensions: embeddingArtifact.dimensions,
    });

    /*
     * Restrict retrieval to the Labour Law document.
     */
    const lawDocumentId = corpus.document.id;

    /*
     * ------------------------------------------------------------
     * DB retrieval adapters
     * ------------------------------------------------------------
     *
     * We intentionally compare only:
     *
     *   1. PostgreSQL pgvector
     *   2. PostgreSQL pgvector + BaselineReranker
     *
     * BM25 and hybrid retrieval have been removed from the MVP.
     */

    const dbVectorRetrieve = createDbVectorRetriever(embeddingProvider, {
      topK: 10,
      lawDocumentId,
    });

    const dbVectorRerankedRetrieve = createDbVectorRerankedRetriever(
      embeddingProvider,
      {
        /*
         * Retrieve a larger candidate pool and allow the
         * reranker to select the final 10.
         */
        topK: 10,
        rerankTopK: 20,
        lawDocumentId,

        rerank: {
          topK: 10,
          phraseWeight: 0.45,
          coverageWeight: 0.35,
          retrievalWeight: 0.2,
        },
      },
    );

    /*
     * ------------------------------------------------------------
     * Aggregate benchmark
     * ------------------------------------------------------------
     */

    const benchmark = await runRetrievalBenchmark(gold, {
      systems: [
        {
          name: "db-vector",
          retrieve: dbVectorRetrieve,
        },
        {
          name: "db-vector-reranked",
          retrieve: dbVectorRerankedRetrieve,
        },
      ],

      recallAt: [1, 3, 5, 10],
      precisionAt: [5, 10],
      hitRateAt: [1, 3, 5, 10],
      ndcgAt: [5, 10],
      includeMrr: true,
    });

    /*
     * ------------------------------------------------------------
     * Context evaluation
     * ------------------------------------------------------------
     *
     * Reuse the exact retrieval predictions produced above.
     * No second retrieval pass is performed.
     */

    const contextBenchmark = await runContextBenchmark(gold, {
      systems: benchmark.systems.map((system) => ({
        name: system.name,
        retrievalResult: system.result,
      })),
    });

    expect(contextBenchmark.datasetName).toBe("labour-law-retrieval-v1");

    expect(contextBenchmark.queryCount).toBe(15);

    expect(contextBenchmark.systems).toHaveLength(2);

    for (const system of contextBenchmark.systems) {
      const result = system.result;

      expect(result.queryCount).toBe(15);

      expect(Number.isFinite(result.contextRecall)).toBe(true);
      expect(Number.isFinite(result.contextPrecision)).toBe(true);
      expect(Number.isFinite(result.contextHitRate)).toBe(true);

      expect(result.contextRecall).toBeGreaterThanOrEqual(0);
      expect(result.contextRecall).toBeLessThanOrEqual(1);

      expect(result.contextPrecision).toBeGreaterThanOrEqual(0);
      expect(result.contextPrecision).toBeLessThanOrEqual(1);

      expect(result.contextHitRate).toBeGreaterThanOrEqual(0);
      expect(result.contextHitRate).toBeLessThanOrEqual(1);

      expect(result.predictions).toHaveLength(15);
      expect(result.perQuery).toHaveLength(15);
    }

    expect(benchmark.datasetName).toBe("labour-law-retrieval-v1");

    expect(benchmark.queryCount).toBe(15);

    expect(benchmark.systems).toHaveLength(2);

    for (const system of benchmark.systems) {
      const result = system.result;

      expect(result.queryCount).toBe(15);

      expect(Object.keys(result.recall)).toEqual(["1", "3", "5", "10"]);

      expect(Object.keys(result.precision)).toEqual(["5", "10"]);

      expect(Object.keys(result.ndcg)).toEqual(["5", "10"]);

      expect(Number.isFinite(result.mrr)).toBe(true);

      expect(Object.keys(result.hitRate)).toEqual(["1", "3", "5", "10"]);

      for (const value of Object.values(result.hitRate)) {
        expect(Number.isFinite(value)).toBe(true);
        expect(value).toBeGreaterThanOrEqual(0);
        expect(value).toBeLessThanOrEqual(1);
      }

      expect(result.mrr).toBeGreaterThanOrEqual(0);
      expect(result.mrr).toBeLessThanOrEqual(1);

      for (const value of Object.values(result.recall)) {
        expect(Number.isFinite(value)).toBe(true);
        expect(value).toBeGreaterThanOrEqual(0);
        expect(value).toBeLessThanOrEqual(1);
      }

      for (const value of Object.values(result.precision)) {
        expect(Number.isFinite(value)).toBe(true);
        expect(value).toBeGreaterThanOrEqual(0);
        expect(value).toBeLessThanOrEqual(1);
      }

      for (const value of Object.values(result.ndcg)) {
        expect(Number.isFinite(value)).toBe(true);
        expect(value).toBeGreaterThanOrEqual(0);
        expect(value).toBeLessThanOrEqual(1);
      }

      expect(result.predictions).toHaveLength(15);

      expect(Object.keys(result.hitRate)).toEqual(["1", "3", "5", "10"]);

      for (const value of Object.values(result.hitRate)) {
        expect(Number.isFinite(value)).toBe(true);
        expect(value).toBeGreaterThanOrEqual(0);
        expect(value).toBeLessThanOrEqual(1);
      }
    }

    /*
     * ------------------------------------------------------------
     * Aggregate benchmark table
     * ------------------------------------------------------------
     */

    console.log(
      "\n\n============================================================",
    );

    console.log("LABOUR LAW VECTOR RETRIEVAL BENCHMARK");

    console.log(
      "============================================================\n",
    );

    console.table(
      benchmark.systems.map((system) => ({
        system: system.name,

        "R@1": system.result.recall["1"]?.toFixed(4),
        "R@3": system.result.recall["3"]?.toFixed(4),
        "R@5": system.result.recall["5"]?.toFixed(4),
        "R@10": system.result.recall["10"]?.toFixed(4),

        "P@5": system.result.precision["5"]?.toFixed(4),
        "P@10": system.result.precision["10"]?.toFixed(4),

        "Hit@1": system.result.hitRate["1"]?.toFixed(4),
        "Hit@3": system.result.hitRate["3"]?.toFixed(4),
        "Hit@5": system.result.hitRate["5"]?.toFixed(4),
        "Hit@10": system.result.hitRate["10"]?.toFixed(4),

        MRR: system.result.mrr.toFixed(4),

        "nDCG@5": system.result.ndcg["5"]?.toFixed(4),
        "nDCG@10": system.result.ndcg["10"]?.toFixed(4),
      })),
    );

    /*
     * ------------------------------------------------------------
     * Context benchmark table
     * ------------------------------------------------------------
     */

    console.log(
      "\n\n============================================================",
    );

    console.log("LABOUR LAW CONTEXT EVALUATION");

    console.log(
      "============================================================\n",
    );

    console.table(
      contextBenchmark.systems.map((system) => ({
        system: system.name,

        "C-Recall": system.result.contextRecall.toFixed(4),

        "C-Precision": system.result.contextPrecision.toFixed(4),

        "C-HitRate": system.result.contextHitRate.toFixed(4),
      })),
    );

    /*
     * ------------------------------------------------------------
     * Build article lookup
     * ------------------------------------------------------------
     */

    const allRetrievedChunkIds = [
      ...new Set(
        benchmark.systems.flatMap((system) =>
          system.result.predictions.flatMap(
            (prediction) => prediction.retrievedChunkIds,
          ),
        ),
      ),
    ];

    const retrievedChunks =
      allRetrievedChunkIds.length > 0
        ? await getChunksByIds(allRetrievedChunkIds)
        : [];

    const corpusChunkById = new Map(
      retrievedChunks.map((chunk) => [chunk.id, chunk]),
    );

    /*
     * Include corpus chunks as a fallback for gold article
     * resolution.
     */
    for (const chunk of corpus.chunks) {
      if (!corpusChunkById.has(chunk.id)) {
        corpusChunkById.set(chunk.id, chunk);
      }
    }

    /*
     * ------------------------------------------------------------
     * Detailed per-query diagnostics
     * ------------------------------------------------------------
     */

    const diagnostics: QueryDiagnostics[] = [];

    const systemResults = new Map(
      benchmark.systems.map((system) => [system.name, system.result]),
    );

    for (const item of gold.items) {
      const goldChunkIds = new Set(item.relevantChunkIds);

      const buildDiagnostics = (
        retrievedChunkIds: string[],
      ): DiagnosticResult[] => {
        return retrievedChunkIds.map((chunkId, index): DiagnosticResult => {
          const chunk = corpusChunkById.get(chunkId);

          if (!chunk) {
            throw new Error(`Benchmark retrieved unknown chunk ID: ${chunkId}`);
          }

          return {
            rank: index + 1,
            chunkId,
            articleNumber: chunk.article_number,
            relevant: goldChunkIds.has(chunkId),
          };
        });
      };

      const getPrediction = (systemName: string): string[] => {
        const result = systemResults.get(systemName);

        if (!result) {
          throw new Error(`Missing benchmark system: ${systemName}`);
        }

        const prediction = result.predictions.find(
          (prediction) => prediction.queryId === item.id,
        );

        if (!prediction) {
          throw new Error(
            `Missing prediction for query ${item.id} in system ${systemName}`,
          );
        }

        return prediction.retrievedChunkIds;
      };

      const vector = buildDiagnostics(getPrediction("db-vector"));

      const vectorReranked = buildDiagnostics(
        getPrediction("db-vector-reranked"),
      );

      const goldArticles = [
        ...new Set(
          item.relevantChunkIds
            .map((chunkId) => corpusChunkById.get(chunkId)?.article_number)
            .filter(
              (articleNumber): articleNumber is string =>
                articleNumber !== undefined,
            ),
        ),
      ];

      diagnostics.push({
        queryId: item.id,
        query: item.query,

        goldArticles,
        goldChunkIds: item.relevantChunkIds,

        vector,
        vectorReranked,

        vectorFirstRelevantRank: firstRelevantRank(vector),

        vectorRerankedFirstRelevantRank: firstRelevantRank(vectorReranked),
      });
    }

    /*
     * ------------------------------------------------------------
     * Compact per-query diagnostic summary
     * ------------------------------------------------------------
     */

    console.log(
      "\n\n============================================================",
    );

    console.log("LABOUR LAW VECTOR RETRIEVAL DIAGNOSTICS");

    console.log(
      "============================================================\n",
    );

    console.table(
      diagnostics.map((diagnostic) => ({
        id: diagnostic.queryId,
        query: diagnostic.query,

        gold: diagnostic.goldArticles.join(", "),

        Vector: formatRank(diagnostic.vectorFirstRelevantRank),

        "Vector+Rerank": formatRank(diagnostic.vectorRerankedFirstRelevantRank),
      })),
    );

    /*
     * ------------------------------------------------------------
     * Detailed rankings
     * ------------------------------------------------------------
     */

    for (const diagnostic of diagnostics) {
      console.log(
        "\n------------------------------------------------------------",
      );

      console.log(`${diagnostic.queryId}: ${diagnostic.query}`);

      console.log(`Gold articles: ${diagnostic.goldArticles.join(", ")}`);

      console.log(`Gold chunks: ${diagnostic.goldChunkIds.join(", ")}`);

      console.log("\nVector:");

      console.table(
        diagnostic.vector.map((result) => ({
          rank: result.rank,
          article: result.articleNumber,
          relevant: result.relevant ? "✓" : "✗",
          chunk: result.chunkId,
        })),
      );

      console.log("Vector + Reranker:");

      console.table(
        diagnostic.vectorReranked.map((result) => ({
          rank: result.rank,
          article: result.articleNumber,
          relevant: result.relevant ? "✓" : "✗",
          chunk: result.chunkId,
        })),
      );
    }

    /*
     * ------------------------------------------------------------
     * Aggregate diagnostic statistics
     * ------------------------------------------------------------
     */

    const countHits = (
      key: "vectorFirstRelevantRank" | "vectorRerankedFirstRelevantRank",
    ): number => {
      return diagnostics.filter((diagnostic) => diagnostic[key] !== null)
        .length;
    };

    const vectorHits = countHits("vectorFirstRelevantRank");

    const rerankedHits = countHits("vectorRerankedFirstRelevantRank");

    console.log(
      "\n\n============================================================",
    );

    console.log("DIAGNOSTIC SUMMARY");

    console.log("============================================================");

    console.table([
      {
        system: "db-vector",
        queriesWithRelevantTop10: vectorHits,
        queriesMissed: gold.items.length - vectorHits,
      },
      {
        system: "db-vector-reranked",
        queriesWithRelevantTop10: rerankedHits,
        queriesMissed: gold.items.length - rerankedHits,
      },
    ]);
  }, 120_000);
});
