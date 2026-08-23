const EASTERN = "٠١٢٣٤٥٦٧٨٩",
  PERSIAN = "۰۱۲۳۴۵۶۷۸۹";
export function normalizeDigits(v: string): string {
  return [...v]
    .map((c) => {
      let i = EASTERN.indexOf(c);
      if (i >= 0) return String(i);
      i = PERSIAN.indexOf(c);
      if (i >= 0) return String(i);
      return c;
    })
    .join("");
}
export function firstInteger(v: string): number | null {
  const m = normalizeDigits(v).match(/\d+/);
  return m ? Number(m[0]) : null;
}
export function normalizeWhitespace(v: string): string {
  return v
    .replace(/\u00A0/g, " ")
    .replace(/[ \t]+/g, " ")
    .replace(/\n[ \t]+/g, "\n")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}
export function normalizeArabicForComparison(v: string): string {
  return v
    .replace(/[\u064B-\u065F\u0670]/g, "")
    .replace(/[إأآٱ]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ؤ/g, "و")
    .replace(/ئ/g, "ي")
    .replace(/ـ/g, "")
    .replace(/\s+/g, " ")
    .trim();
}
