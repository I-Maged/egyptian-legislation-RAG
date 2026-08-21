import { LawMetadata, ParsedArticle } from "../types.js";
import {
  canonicalArticleNumber,
  parseArticleIdentifier,
} from "../utils/article.js";
import { cleanLegalText, normalizeForEmbedding } from "./text.js";
import { MergedRecord } from "./merge.js";
export function buildArticles(
  rs: MergedRecord[],
  meta: LawMetadata,
  id: string,
): ParsedArticle[] {
  const map = new Map<string, MergedRecord[]>();
  for (const r of rs) {
    const n = parseArticleIdentifier(r.article_number),
      k = Number.isInteger(n.number)
        ? String(n.number)
        : `raw:${r.article_number}`,
      a = map.get(k) ?? [];
    a.push(r);
    map.set(k, a);
  }
  const out: ParsedArticle[] = [];
  for (const [, recs] of map) {
    const ordered = recs
        .slice()
        .sort(
          (a, b) =>
            a.page_number - b.page_number || a.originalIndex - b.originalIndex,
        ),
      chunks: string[] = [];
    for (const r of ordered) {
      const t = cleanLegalText(r.text);
      if (t && chunks.at(-1) !== t) chunks.push(t);
    }
    const text = chunks.join("\n\n"),
      pages = [...new Set(ordered.map((r) => r.page_number))].sort(
        (a, b) => a - b,
      ),
      parsed = parseArticleIdentifier(ordered[0]!.article_number),
      recovery = ordered.filter(
        (r) => r.sourceType === "vision_ocr_recovery",
      ).length,
      reasons: string[] = [];
    if (text.length > 5000)
      reasons.push(`Long article (${text.length} characters).`);
    if (recovery) reasons.push(`Contains ${recovery} recovered OCR record(s).`);
    out.push({
      instrumentId: id,
      lawName: meta.lawName ?? ordered[0]!.law_name ?? "unknown",
      lawNumber: meta.lawNumber,
      year: meta.year,
      articleNumber: canonicalArticleNumber(ordered[0]!.article_number),
      articleNumberNormalized: Number.isInteger(parsed.number)
        ? parsed.number
        : null,
      articleSuffix: parsed.suffix,
      chapter: ordered.map((r) => r.chapter ?? "").find(Boolean) ?? null,
      text,
      textForEmbedding: normalizeForEmbedding(text),
      pageStart: pages[0] ?? 0,
      pageEnd: pages.at(-1) ?? 0,
      pages,
      sourceOrder: pages[0] ?? Number.MAX_SAFE_INTEGER,
      source: recovery ? "vision_ocr_recovery" : "vision_ocr",
      sourceRecordIds: ordered.map((r) => r.internalId),
      qwenRecordCount: ordered.filter((r) => r.sourceType === "vision_ocr")
        .length,
      recoveryRecordCount: recovery,
      needsReview: reasons.length > 0,
      reviewReasons: reasons,
    });
  }
  return out.sort(
    (a, b) =>
      a.sourceOrder - b.sourceOrder ||
      (a.articleNumberNormalized ?? 1e12) - (b.articleNumberNormalized ?? 1e12),
  );
}
