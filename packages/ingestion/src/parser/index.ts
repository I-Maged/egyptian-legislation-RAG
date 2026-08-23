import fs from "node:fs";
import path from "node:path";
import { readPdfPages } from "./coverage/pdf.js";
import { buildCoverage } from "./coverage/map.js";
import { readJsonArray, writeJson } from "./io/json.js";
import { inferMetadata, makeInstrumentId } from "./parser/metadata.js";
import { mergeOCR } from "./parser/merge.js";
import { buildArticles } from "./parser/articles.js";
import { findSequenceGaps } from "./parser/gaps.js";
import { validateArticles } from "./parser/validator.js";
import { ParserOutput, QwenOCRRecord } from "./types.js";

import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

async function main() {
  const input =
      process.argv[2] !== undefined
        ? path.resolve(process.cwd(), process.argv[2])
        : path.join(projectRoot, "input", "procedure_law_qwen_output.json"),
    output =
      process.argv[3] !== undefined
        ? path.resolve(process.cwd(), process.argv[3])
        : path.join(projectRoot, "output", "procedure_law_v2_3.json"),
    pdf = process.argv[4]
      ? path.resolve(process.cwd(), process.argv[4])
      : path.join(projectRoot, "input", "procedure_law.pdf"),
    recovery = process.argv[5];
  const original = readJsonArray<QwenOCRRecord>(input),
    recovered = recovery ? readJsonArray<QwenOCRRecord>(recovery) : [];
  let pages = null,
    pdfFile: string | null = null;
  if (pdf) {
    if (!fs.existsSync(pdf)) throw new Error(`PDF not found: ${pdf}`);
    pages = await readPdfPages(pdf);
    pdfFile = path.basename(pdf);
  }
  const meta = inferMetadata([...original, ...recovered]),
    id = makeInstrumentId(meta),
    merged = mergeOCR(original, recovered),
    articles = buildArticles(merged, meta, id),
    gaps = findSequenceGaps(articles),
    cov = buildCoverage(pages, merged, gaps);
  for (const g of gaps)
    g.recoveryPages = cov.recoveryQueue
      .filter((t) =>
        t.expectedArticles.some((n) => g.missingArticles.includes(n)),
      )
      .map((t) => t.pageNumber);
  const issues = validateArticles(articles, cov.recoveryQueue.length);
  const result: ParserOutput = {
    metadata: {
      parserVersion: "2.3.0",
      inputFile: path.basename(input),
      generatedAt: new Date().toISOString(),
      recordCountOriginal: original.length,
      recordCountRecovery: recovered.length,
      recordCountMerged: merged.length,
      instrumentId: id,
    },
    metadataResolved: meta,
    articles,
    coverage: {
      pdfFile,
      pdfPageCount: pages?.length ?? null,
      pages: cov.pages,
      recoveryQueue: cov.recoveryQueue,
      articleSequenceGaps: gaps,
    },
    validation: {
      inputFile: path.basename(input),
      recordCount: merged.length,
      articleCount: articles.length,
      issues,
      summary: {
        errors: issues.filter((x) => x.severity === "error").length,
        warnings: issues.filter((x) => x.severity === "warning").length,
        infos: issues.filter((x) => x.severity === "info").length,
        duplicateArticleNumbers: issues.filter(
          (x) => x.code === "DUPLICATE_ARTICLE_NUMBER",
        ).length,
        sequenceGapCount: gaps.length,
        recoveryTaskCount: cov.recoveryQueue.length,
        recoveredRecordCount: recovered.length,
        longArticleCount: articles.filter((a) => a.text.length > 5000).length,
        multiPageArticleCount: articles.filter((a) => a.pages.length > 1)
          .length,
        articlesFromRecovery: articles.filter((a) => a.recoveryRecordCount > 0)
          .length,
      },
    },
  };
  writeJson(output, result);
  console.log(
    `Parser V2.3\nOriginal records: ${original.length}\nRecovery records: ${recovered.length}\nMerged records: ${merged.length}\nArticles: ${articles.length}\nSequence gaps: ${gaps.length}\nRecovery queue: ${cov.recoveryQueue.length}`,
  );
  for (const t of cov.recoveryQueue)
    console.log(
      `  recovery page ${t.pageNumber} [${t.priority}] expected=[${t.expectedArticles.join(", ")}] evidence=${t.evidence}`,
    );
  console.log(`Output: ${output}`);
}
main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
