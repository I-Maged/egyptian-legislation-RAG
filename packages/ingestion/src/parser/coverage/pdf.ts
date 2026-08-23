import fs from "node:fs/promises";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import { PDFPageInfo } from "../types.js";
import { firstInteger, normalizeWhitespace } from "../utils/arabic.js";
function articleNumbers(t: string): number[] {
  const out: number[] = [];
  for (const m of t.matchAll(/(?:مادة|المادة)\s*\(?\s*([٠-٩0-9]+)\s*\)?/g)) {
    const n = firstInteger(m[1] ?? "");
    if (n !== null) out.push(n);
  }
  return [...new Set(out)].sort((a, b) => a - b);
}
export async function readPdfPages(file: string): Promise<PDFPageInfo[]> {
  const data = new Uint8Array(await fs.readFile(file));
  const pdf = await pdfjsLib.getDocument({ data }).promise;
  const out: PDFPageInfo[] = [];
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i),
      c = await page.getTextContent();
    const text = normalizeWhitespace(
      c.items
        .map((x: any) => (typeof x.str === "string" ? x.str : ""))
        .join("\n"),
    );
    const nums = articleNumbers(text),
      has = nums.length > 0;
    out.push({
      pageNumber: i,
      text,
      textLength: text.length,
      isLikelyBlank: text.length < 20,
      hasArticleMarker: has,
      articleNumbers: nums,
      isLikelyFrontMatter: i <= 10 && !has && text.length > 20,
      isLikelyEndMatter: i >= pdf.numPages - 2 && !has,
    });
  }
  return out;
}
