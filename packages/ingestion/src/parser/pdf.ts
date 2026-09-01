import fs from "node:fs/promises";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import {
  canonicalArticleNumber,
  normalizeArabicText,
  normalizeDigits,
  normalizeForEmbedding,
} from "./arabic.js";
import type {
  ArticleAnchor,
  LawIdentity,
  LawProfile,
  ParsedArticle,
  PdfPage,
} from "./types.js";

const ORDINALS: Record<string, number> = {
  الأولى: 1,
  الثانية: 2,
  الثالثة: 3,
  الرابعة: 4,
  الخامسة: 5,
  السادسة: 6,
  السابعة: 7,
  الثامنة: 8,
  التاسعة: 9,
  العاشرة: 10,
  "الحادية عشرة": 11,
  الحادية_عشرة: 11,
  "الثانية عشرة": 12,
  الثانية_عشرة: 12,
  "الثالثة عشرة": 13,
  الثالثة_عشرة: 13,
};

interface PdfTextItemLike {
  str?: string;
  hasEOL?: boolean;
  transform?: number[];
}

function parseMarker(
  line: string,
): { number: string; suffix: string | null } | null {
  const x = normalizeArabicText(line).replace(/\s+/g, " ").trim();
  const compact = x.replace(/[ \t]+/g, "");

  let m = compact.match(/^(?:مادة|المادة)[:.)\-(]*([0-9٠-٩۰-۹]+)/i);
  if (m) {
    const rest = compact
      .slice(m[0].length)
      .replace(/[():،,.;\-]+/g, " ")
      .trim();
    return { number: normalizeDigits(m[1]!), suffix: rest || null };
  }

  const ordinalPattern = Object.keys(ORDINALS)
    .sort((a, b) => b.length - a.length)
    .map((x) => x.replace("_", " "))
    .join("|");
  m = x.match(
    new RegExp(`^(?:مادة|المادة)\\s*[:.)\\-\\s]*(${ordinalPattern})`, "i"),
  );
  if (m) return { number: String(ORDINALS[m[1]!]), suffix: null };

  return null;
}

export function buildPdfLines(items: PdfTextItemLike[]): string[] {
  const lines: string[] = [];
  let current: string[] = [];
  let previousY: number | null = null;

  const flush = () => {
    const line = current.join(" ").replace(/\s+/g, " ").trim();
    if (line) lines.push(line);
    current = [];
  };

  for (const item of items) {
    const text = typeof item.str === "string" ? item.str.trim() : "";
    if (!text) continue;
    const y =
      Array.isArray(item.transform) && typeof item.transform[5] === "number"
        ? item.transform[5]!
        : null;
    if (
      current.length &&
      y !== null &&
      previousY !== null &&
      Math.abs(y - previousY) > 2.5
    )
      flush();
    current.push(text);
    previousY = y ?? previousY;
    if (item.hasEOL) flush();
  }
  flush();
  return lines;
}

export async function readPdfPages(file: string): Promise<PdfPage[]> {
  const data = new Uint8Array(await fs.readFile(file));
  const pdf = await pdfjsLib.getDocument({ data }).promise;
  const pages: PdfPage[] = [];
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const items = content.items as unknown as PdfTextItemLike[];
    const lines = buildPdfLines(items);
    const text = normalizeArabicText(lines.join("\n"));
    pages.push({
      pageNumber: i,
      text,
      lines: text
        .split(/\n/)
        .map((x) => x.trim())
        .filter(Boolean),
    });
  }
  return pages;
}

export function findArticleAnchors(pages: PdfPage[]): ArticleAnchor[] {
  const anchors: ArticleAnchor[] = [];
  for (const page of pages) {
    let ordinal = 0;
    for (let lineIndex = 0; lineIndex < page.lines.length; lineIndex++) {
      const parsed = parseMarker(page.lines[lineIndex]!);
      if (!parsed) continue;
      anchors.push({
        pageNumber: page.pageNumber,
        lineIndex,
        ordinalOnPage: ordinal++,
        rawLabel: page.lines[lineIndex]!,
        articleNumber: parsed.number,
        suffix: parsed.suffix,
      });
    }
  }
  return anchors;
}

function assignAnchorIdentities(
  anchors: ArticleAnchor[],
  profile: LawProfile,
): Map<number, LawIdentity> {
  const result = new Map<number, LawIdentity>();
  let currentIndex = 0;
  let previous: {
    page: number;
    articleNumber: string;
    occurrence: number;
  } | null = null;
  for (let i = 0; i < anchors.length; i++) {
    const anchor = anchors[i]!;
    const occurrence = anchors
      .slice(0, i + 1)
      .filter(
        (x) =>
          x.pageNumber === anchor.pageNumber &&
          x.articleNumber === anchor.articleNumber,
      ).length;
    while (currentIndex + 1 < profile.identities.length) {
      const next = profile.identities[currentIndex + 1]!;
      const t = next.startAfter;
      if (!t) {
        if (anchor.pageNumber >= next.startPage) currentIndex++;
        else break;
        continue;
      }
      if (anchor.pageNumber > t.page) {
        currentIndex++;
        continue;
      }
      if (anchor.pageNumber < t.page) break;
      if (
        previous &&
        previous.page === t.page &&
        previous.articleNumber === t.articleNumber &&
        previous.occurrence >= (t.occurrenceOnPage ?? 1)
      ) {
        currentIndex++;
        continue;
      }
      break;
    }
    result.set(i, profile.identities[currentIndex]!);
    previous = {
      page: anchor.pageNumber,
      articleNumber: anchor.articleNumber,
      occurrence,
    };
  }
  return result;
}

export function buildArticlesFromPdf(
  pages: PdfPage[],
  profile: LawProfile,
  anchors: ArticleAnchor[],
): ParsedArticle[] {
  const identities = assignAnchorIdentities(anchors, profile);
  const out: ParsedArticle[] = [];
  for (let i = 0; i < anchors.length; i++) {
    const anchor = anchors[i]!;
    const next = anchors[i + 1];
    const identity = identities.get(i) ?? profile.defaultIdentity;
    const endPage = next?.pageNumber ?? pages.length;
    const selected: string[] = [];
    for (const page of pages) {
      if (page.pageNumber < anchor.pageNumber || page.pageNumber > endPage)
        continue;
      const from =
        page.pageNumber === anchor.pageNumber ? anchor.lineIndex + 1 : 0;
      const to =
        next && page.pageNumber === endPage
          ? next.lineIndex
          : page.lines.length;
      selected.push(...page.lines.slice(from, to));
    }
    const text = selected.join("\n").trim();
    if (!text) continue;
    const id = `pdf:${anchor.pageNumber}:${anchor.ordinalOnPage}:${i}`;
    out.push({
      instrumentId: identity.id,
      lawName: identity.lawName,
      lawNumber: identity.lawNumber || null,
      year: identity.year || null,
      articleNumber: canonicalArticleNumber(anchor.articleNumber),
      articleNumberNormalized: /^\d+$/.test(anchor.articleNumber)
        ? Number(anchor.articleNumber)
        : null,
      articleSuffix: anchor.suffix,
      chapter: null,
      text,
      textForEmbedding: normalizeForEmbedding(text),
      pageStart: anchor.pageNumber,
      pageEnd: endPage,
      pages: Array.from(
        { length: endPage - anchor.pageNumber + 1 },
        (_, k) => anchor.pageNumber + k,
      ),
      sourceOrder: i,
      source: "pdf_text_recovery",
      sourceRecordIds: [id],
      qwenRecordCount: 0,
      recoveryRecordCount: 1,
      needsReview: true,
      reviewReasons: [
        "PDF-only extraction; verify OCR fidelity before indexing.",
      ],
    });
  }
  return out;
}
