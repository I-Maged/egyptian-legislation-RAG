import { firstInteger, normalizeDigits } from "./arabic.js";
export function parseArticleIdentifier(raw: string) {
  const n = normalizeDigits(raw ?? "").trim(),
    m = n.match(/(\d+)\s*(.*)$/);
  if (!m) return { raw, number: NaN, suffix: null as string | null };
  const s = (m[2] ?? "")
    .replace(/[():،,.;]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return { raw, number: Number(m[1]), suffix: s || null };
}
export function canonicalArticleNumber(raw: string): string {
  const n = firstInteger(raw);
  return n === null ? raw.trim() : String(n);
}
