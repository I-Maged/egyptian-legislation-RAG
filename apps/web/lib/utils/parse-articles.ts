export type ParsedArticle = {
  articleNumber: string;
  text: string;
};

export function parseArticles(raw: string): ParsedArticle[] {
  if (!raw.trim()) {
    return [];
  }

  return raw
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block, index) => {
      const match = block.match(
        /^(?:المادة|مادة)\s+([0-9٠-٩]+)\s*[:\-]?\s*([\s\S]*)$/i,
      );

      if (match) {
        return {
          articleNumber: match[1],
          text: match[2].trim(),
        };
      }

      return {
        articleNumber: String(index + 1),
        text: block,
      };
    });
}
