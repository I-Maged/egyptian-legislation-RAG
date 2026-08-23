import { ArticleGap, ParsedArticle } from "../types.js";
export function findSequenceGaps(a: ParsedArticle[]): ArticleGap[] {
  const x = a
    .filter((z) => z.articleNumberNormalized !== null)
    .slice()
    .sort((p, q) => p.articleNumberNormalized! - q.articleNumberNormalized!);
  const seen = new Map<number, ParsedArticle>();
  for (const z of x)
    if (!seen.has(z.articleNumberNormalized!))
      seen.set(z.articleNumberNormalized!, z);
  const n = [...seen.keys()].sort((p, q) => p - q),
    out: ArticleGap[] = [];
  for (let i = 0; i < n.length - 1; i++) {
    const f = n[i]!,
      t = n[i + 1]!;
    if (t <= f + 1) continue;
    const p = seen.get(f)!,
      q = seen.get(t)!;
    out.push({
      fromArticle: f,
      toArticle: t,
      missingArticles: Array.from({ length: t - f - 1 }, (_, k) => f + k + 1),
      previousPage: p.pageEnd || null,
      nextPage: q.pageStart || null,
      recoveryPages: [],
    });
  }
  return out;
}
