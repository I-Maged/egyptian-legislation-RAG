import {
  PageCoverage,
  PDFPageInfo,
  QwenOCRRecord,
  RecoveryTask,
  ArticleGap,
} from "../types.js";
import { parseArticleIdentifier } from "../utils/article.js";
export function buildCoverage(
  pdf: PDFPageInfo[] | null,
  rs: QwenOCRRecord[],
  gaps: ArticleGap[] = [],
) {
  if (!pdf)
    return { pages: [] as PageCoverage[], recoveryQueue: [] as RecoveryTask[] };
  const byPage = new Map<number, QwenOCRRecord[]>();
  for (const r of rs) {
    const a = byPage.get(r.page_number) ?? [];
    a.push(r);
    byPage.set(r.page_number, a);
  }
  const qwenPages = new Set(rs.map((r) => r.page_number)),
    gapByPage = new Map<number, RecoveryTask>();
  for (const gap of gaps) {
    if (
      gap.previousPage === null ||
      gap.nextPage === null ||
      gap.nextPage <= gap.previousPage + 1
    )
      continue;
    for (
      let pageNumber = gap.previousPage + 1;
      pageNumber < gap.nextPage;
      pageNumber++
    ) {
      if (qwenPages.has(pageNumber)) continue;
      const existing = gapByPage.get(pageNumber);
      const task: RecoveryTask = {
        pageNumber,
        priority: "high",
        reason: `Article sequence gap ${gap.fromArticle} -> ${gap.toArticle}: missing ${gap.missingArticles.join(", ")}. Known neighboring articles are on pages ${gap.previousPage} and ${gap.nextPage}.`,
        expectedArticles: gap.missingArticles,
        neighborArticles: { previous: gap.fromArticle, next: gap.toArticle },
        evidence: "article_gap_between_pages",
      };
      if (!existing) gapByPage.set(pageNumber, task);
      else {
        existing.expectedArticles = [
          ...new Set([...existing.expectedArticles, ...task.expectedArticles]),
        ].sort((a, b) => a - b);
        existing.reason += ` Also associated with gap ${gap.fromArticle} -> ${gap.toArticle}.`;
      }
    }
  }
  const pages: PageCoverage[] = [],
    recoveryQueue: RecoveryTask[] = [];
  for (const p of pdf) {
    const q = byPage.get(p.pageNumber) ?? [],
      qnums = q.map((r) => r.article_number);
    let status: PageCoverage["status"],
      reason: string | null = null;
    if (q.length) status = "ocr_present";
    else if (gapByPage.has(p.pageNumber)) {
      status = "recovery_candidate";
      reason = gapByPage.get(p.pageNumber)!.reason;
      recoveryQueue.push(gapByPage.get(p.pageNumber)!);
    } else if (p.isLikelyBlank) status = "pdf_blank_or_unreadable";
    else if (p.isLikelyFrontMatter) status = "likely_front_matter";
    else if (p.isLikelyEndMatter) status = "likely_end_matter";
    else if (p.articleNumbers.length) {
      status = "no_article_but_source_text";
      reason = `PDF text layer contains article marker(s): ${p.articleNumbers.join(", ")} but Qwen produced no record.`;
    } else status = "no_article_but_source_text";
    pages.push({
      pdfPage: p.pageNumber,
      status,
      qwenRecordCount: q.length,
      qwenArticleNumbers: qnums,
      qwenTextLength: q.reduce((n, r) => n + r.text.length, 0),
      sourceTextLength: p.textLength,
      sourceArticleNumbers: p.articleNumbers,
      likelyArticleBearing:
        p.articleNumbers.length > 0 || gapByPage.has(p.pageNumber),
      recoveryReason: reason,
    });
  }
  recoveryQueue.sort((a, b) => a.pageNumber - b.pageNumber);
  return { pages, recoveryQueue };
}
