import {
  normalizeArabicForComparison,
  normalizeWhitespace,
} from "../utils/arabic.js";
export function cleanLegalText(text: string): string {
  const lines = text.split(/\r?\n/),
    out: string[] = [];
  for (const line of lines) {
    if (
      out.length &&
      normalizeArabicForComparison(out.at(-1)!) ===
        normalizeArabicForComparison(line)
    )
      continue;
    out.push(line);
  }
  return normalizeWhitespace(
    out
      .filter((l) => {
        const x = normalizeArabicForComparison(l);
        return !(x.includes("الجريدة الرسمية") && /العدد\s+\d+/.test(x));
      })
      .join("\n"),
  );
}
export function normalizeForEmbedding(text: string): string {
  return cleanLegalText(text)
    .replace(/[إأآٱ]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ؤ/g, "و")
    .replace(/ئ/g, "ي")
    .replace(/ـ/g, "")
    .replace(/[\u064B-\u065F\u0670]/g, "");
}
