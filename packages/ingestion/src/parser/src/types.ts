export type SourceType = "vision_ocr" | "vision_ocr_recovery";
export interface QwenOCRRecord {
  law_name?: string | null;
  law_number?: string | null;
  year?: string | null;
  article_number: string;
  chapter?: string | null;
  text: string;
  text_for_embedding?: string | null;
  page_number: number;
  source?: string | null;
  record_id?: string | null;
}
export interface LawMetadata {
  lawName: string | null;
  lawNumber: string | null;
  year: string | null;
}
export interface PDFPageInfo {
  pageNumber: number;
  text: string;
  textLength: number;
  isLikelyBlank: boolean;
  hasArticleMarker: boolean;
  articleNumbers: number[];
  isLikelyFrontMatter: boolean;
  isLikelyEndMatter: boolean;
}
export type CoverageStatus =
  | "ocr_present"
  | "no_article_but_source_text"
  | "likely_front_matter"
  | "likely_end_matter"
  | "recovery_candidate"
  | "pdf_blank_or_unreadable";
export interface PageCoverage {
  pdfPage: number;
  status: CoverageStatus;
  qwenRecordCount: number;
  qwenArticleNumbers: string[];
  qwenTextLength: number;
  sourceTextLength: number;
  sourceArticleNumbers: number[];
  likelyArticleBearing: boolean;
  recoveryReason: string | null;
}
export interface RecoveryTask {
  pageNumber: number;
  priority: "high" | "medium" | "low";
  reason: string;
  expectedArticles: number[];
  neighborArticles: { previous: number | null; next: number | null };
  evidence:
    | "article_gap_between_pages"
    | "pdf_article_marker"
    | "qwen_missing_page";
}
export interface ArticleGap {
  fromArticle: number;
  toArticle: number;
  missingArticles: number[];
  previousPage: number | null;
  nextPage: number | null;
  recoveryPages: number[];
}
export interface ParsedArticle {
  instrumentId: string;
  lawName: string;
  lawNumber: string | null;
  year: string | null;
  articleNumber: string;
  articleNumberNormalized: number | null;
  articleSuffix: string | null;
  chapter: string | null;
  text: string;
  textForEmbedding: string;
  pageStart: number;
  pageEnd: number;
  pages: number[];
  sourceOrder: number;
  source: SourceType;
  sourceRecordIds: string[];
  qwenRecordCount: number;
  recoveryRecordCount: number;
  needsReview: boolean;
  reviewReasons: string[];
}
export interface ValidationIssue {
  severity: "error" | "warning" | "info";
  code: string;
  message: string;
  articleNumber?: string;
  pageNumber?: number;
}
export interface CoverageReport {
  pdfFile: string | null;
  pdfPageCount: number | null;
  pages: PageCoverage[];
  recoveryQueue: RecoveryTask[];
  articleSequenceGaps: ArticleGap[];
}
export interface ParseReport {
  inputFile: string;
  recordCount: number;
  articleCount: number;
  issues: ValidationIssue[];
  summary: {
    errors: number;
    warnings: number;
    infos: number;
    duplicateArticleNumbers: number;
    sequenceGapCount: number;
    recoveryTaskCount: number;
    recoveredRecordCount: number;
    longArticleCount: number;
    multiPageArticleCount: number;
    articlesFromRecovery: number;
  };
}
export interface ParserOutput {
  metadata: {
    parserVersion: string;
    inputFile: string;
    generatedAt: string;
    recordCountOriginal: number;
    recordCountRecovery: number;
    recordCountMerged: number;
    instrumentId: string;
  };
  metadataResolved: LawMetadata;
  articles: ParsedArticle[];
  coverage: CoverageReport;
  validation: ParseReport;
}
