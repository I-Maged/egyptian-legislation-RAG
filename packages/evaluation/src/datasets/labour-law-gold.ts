import type { CanonicalCorpus } from "@egyptian-law/core";

import type {
  RetrievalGoldDataset,
  RetrievalGoldItem,
} from "./retrieval-dataset";

export interface LabourLawGoldDraft {
  id: string;
  query: string;
  relevantArticleNumbers: string[];
  relevance?: Record<string, number>;
}

/**
 * Initial manually curated Labour Law retrieval questions.
 *
 * Article numbers are resolved against the canonical corpus at runtime.
 * This keeps the benchmark independent of generated chunk IDs.
 */
export const labourLawGoldDraft: LabourLawGoldDraft[] = [
  {
    id: "labour-001",
    query: "ما هي مدة فترة الاختبار في عقد العمل؟",
    relevantArticleNumbers: ["90"],
  },

  {
    id: "labour-002",
    query: "كم مرة يجوز تعيين العامل تحت الاختبار لدى صاحب عمل واحد؟",
    relevantArticleNumbers: ["90"],
  },

  {
    id: "labour-003",
    query: "ما الحد الأقصى لساعات العمل الفعلية للعامل في اليوم والأسبوع؟",
    relevantArticleNumbers: ["117"],
  },

  {
    id: "labour-004",
    query: "هل تدخل فترات تناول الطعام والراحة ضمن ساعات العمل الفعلية؟",
    relevantArticleNumbers: ["117"],
  },

  {
    id: "labour-005",
    query: "ما الحد الأدنى لمجموع فترات تناول الطعام والراحة أثناء العمل؟",
    relevantArticleNumbers: ["118"],
  },

  {
    id: "labour-006",
    query: "ما أقصى مدة يمكن أن يعملها العامل متصلة دون فترة راحة؟",
    relevantArticleNumbers: ["118"],
  },

  {
    id: "labour-007",
    query: "ما الحد الأقصى للفترة بين بداية ساعات العمل ونهايتها في اليوم؟",
    relevantArticleNumbers: ["119"],
  },

  {
    id: "labour-008",
    query:
      "ما مدة تواجد العامل في المنشأة بالنسبة للأعمال المتقطعة أو ذات الطبيعة الخاصة؟",
    relevantArticleNumbers: ["119"],
  },

  {
    id: "labour-009",
    query: "ما البيانات التي يجب أن يتضمنها عقد العمل؟",
    relevantArticleNumbers: ["89"],
  },

  {
    id: "labour-010",
    query: "كم نسخة يجب تحريرها من عقد العمل؟",
    relevantArticleNumbers: ["89"],
  },

  {
    id: "labour-011",
    query:
      "ما المدة التي يلتزم فيها صاحب العمل بإعادة العامل إلى الجهة التي تم التعاقد معه فيها بعد انتهاء عقد العمل؟",
    relevantArticleNumbers: ["93"],
  },

  {
    id: "labour-012",
    query: "ما مدة الاحتفاظ بملف العامل بعد انتهاء علاقة العمل؟",
    relevantArticleNumbers: ["92"],
  },

  {
    id: "labour-013",
    query: "ما حقوق العاملة المتعلقة بإجازة الوضع؟",
    relevantArticleNumbers: ["54"],
  },

  {
    id: "labour-014",
    query: "ما حقوق العاملة بعد انتهاء إجازة الوضع؟",
    relevantArticleNumbers: ["55"],
  },

  {
    id: "labour-015",
    query: "ما العقوبات المقررة لمخالفة أحكام قانون العمل؟",
    relevantArticleNumbers: ["288", "289"],
  },
];

export function buildLabourLawGoldDataset(
  corpus: CanonicalCorpus,
): RetrievalGoldDataset {
  const articleMap = new Map<string, string[]>();

  for (const chunk of corpus.chunks) {
    const chunkIds = articleMap.get(chunk.article_number) ?? [];

    chunkIds.push(chunk.id);

    articleMap.set(chunk.article_number, chunkIds);
  }

  const items: RetrievalGoldItem[] = labourLawGoldDraft.map((draft) => {
    const relevantChunkIds: string[] = [];

    for (const articleNumber of draft.relevantArticleNumbers) {
      const chunkIds = articleMap.get(articleNumber);

      if (!chunkIds || chunkIds.length === 0) {
        throw new Error(
          `Labour Law article ${articleNumber} was not found in the canonical corpus.`,
        );
      }

      relevantChunkIds.push(...chunkIds);
    }

    const uniqueChunkIds = [...new Set(relevantChunkIds)];

    return {
      id: draft.id,
      query: draft.query,
      relevantChunkIds: uniqueChunkIds,
      ...(draft.relevance !== undefined ? { relevance: draft.relevance } : {}),
    };
  });

  return {
    schema_version: "1.0",
    name: "labour-law-retrieval-v1",
    description:
      "Initial manually curated retrieval benchmark for Egyptian Labour Law No. 148 of 2019.",
    language: "ar",
    jurisdiction: "EG",
    items,
  };
}
