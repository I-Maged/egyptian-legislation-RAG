import { QwenOCRRecord, SourceType } from "../types.js";
export interface MergedRecord extends QwenOCRRecord {
  sourceType: SourceType;
  internalId: string;
  originalIndex: number;
}
export function mergeOCR(
  a: QwenOCRRecord[],
  b: QwenOCRRecord[],
): MergedRecord[] {
  const all = [
    ...a.map((r, i) => ({
      ...r,
      sourceType: "vision_ocr" as SourceType,
      internalId:
        r.record_id ?? `qwen:${i}:${r.page_number}:${r.article_number}`,
      originalIndex: i,
    })),
    ...b.map((r, i) => ({
      ...r,
      sourceType: "vision_ocr_recovery" as SourceType,
      internalId:
        r.record_id ?? `recovery:${i}:${r.page_number}:${r.article_number}`,
      originalIndex: i,
    })),
  ];
  return all
    .filter(
      (r) =>
        Number.isInteger(r.page_number) &&
        r.page_number > 0 &&
        r.text?.trim() &&
        r.article_number,
    )
    .sort(
      (x, y) =>
        x.page_number - y.page_number || x.originalIndex - y.originalIndex,
    );
}
