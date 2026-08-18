// import type { CanonicalCorpus } from "@egyptian-law/core";

// import type { RetrievalGoldDataset } from "./retrieval-dataset";

// interface LabourLawGoldDraft {
//   id: string;
//   query: string;
//   relevantArticleNumbers: string[];
//   relevance?: Record<string, number>;
// }

// /**
//  * Initial Labour Law retrieval benchmark.
//  *
//  * These questions intentionally cover different retrieval
//  * behaviors rather than only direct article-number lookups.
//  */
// export const labourLawGoldDraft: LabourLawGoldDraft[] = [
//   {
//     id: "labour-001",
//     query: "ما هي مدة فترة الاختبار في عقد العمل؟",
//     relevantArticleNumbers: ["33"],
//   },
//   {
//     id: "labour-002",
//     query: "ما هي شروط تشغيل العامل خلال فترة الاختبار؟",
//     relevantArticleNumbers: ["33"],
//   },
//   {
//     id: "labour-003",
//     query: "متى يجوز إنهاء عقد العمل غير محدد المدة؟",
//     relevantArticleNumbers: ["117", "118", "119"],
//   },
//   {
//     id: "labour-004",
//     query: "ما هي الحالات التي يجوز فيها إنهاء علاقة العمل؟",
//     relevantArticleNumbers: ["117", "118", "119"],
//   },
//   {
//     id: "labour-005",
//     query: "ما هي مدة الإخطار بإنهاء عقد العمل غير محدد المدة؟",
//     relevantArticleNumbers: ["118"],
//   },
//   {
//     id: "labour-006",
//     query: "ما هي حقوق العامل عند إنهاء عقد العمل؟",
//     relevantArticleNumbers: ["123", "124"],
//   },
//   {
//     id: "labour-007",
//     query: "ما هي حالات فصل العامل؟",
//     relevantArticleNumbers: ["129"],
//   },
//   {
//     id: "labour-008",
//     query: "ما هي ضوابط الفصل التأديبي للعامل؟",
//     relevantArticleNumbers: ["129", "130"],
//   },
//   {
//     id: "labour-009",
//     query: "ما هي مدة الإجازة السنوية للعامل؟",
//     relevantArticleNumbers: ["131", "132"],
//   },
//   {
//     id: "labour-010",
//     query: "هل يجوز لصاحب العمل حرمان العامل من الإجازة السنوية؟",
//     relevantArticleNumbers: ["131", "132"],
//   },
//   {
//     id: "labour-011",
//     query: "ما هي أحكام تشغيل الأطفال؟",
//     relevantArticleNumbers: ["54", "55", "56", "57", "58", "59"],
//   },
//   {
//     id: "labour-012",
//     query: "ما هو الحد الأقصى لساعات العمل اليومية؟",
//     relevantArticleNumbers: ["89", "90", "91"],
//   },
//   {
//     id: "labour-013",
//     query: "ما هي فترات الراحة أثناء ساعات العمل؟",
//     relevantArticleNumbers: ["90", "91"],
//   },
//   {
//     id: "labour-014",
//     query: "ما هي أحكام العمل الإضافي؟",
//     relevantArticleNumbers: ["92", "93", "94"],
//   },
//   {
//     id: "labour-015",
//     query: "ما هي العقوبات المقررة لمخالفة أحكام قانون العمل؟",
//     relevantArticleNumbers: ["288", "289"],
//   },
// ];

// export function buildLabourLawGoldDataset(
//   corpus: CanonicalCorpus,
// ): RetrievalGoldDataset {
//   const articleMap = new Map<string, string[]>();

//   for (const chunk of corpus.chunks) {
//     const existing = articleMap.get(chunk.article_number) ?? [];

//     existing.push(chunk.id);

//     articleMap.set(chunk.article_number, existing);
//   }

//   const items = labourLawGoldDraft.map((draft) => {
//     const relevantChunkIds: string[] = [];

//     for (const articleNumber of draft.relevantArticleNumbers) {
//       const chunkIds = articleMap.get(articleNumber);

//       if (!chunkIds || chunkIds.length === 0) {
//         throw new Error(
//           `Labour Law article ${articleNumber} was not found in the canonical corpus.`,
//         );
//       }

//       relevantChunkIds.push(...chunkIds);
//     }

//     const uniqueChunkIds = [...new Set(relevantChunkIds)];

//     return {
//       id: draft.id,
//       query: draft.query,
//       relevantChunkIds: uniqueChunkIds,
//       ...(draft.relevance !== undefined ? { relevance: draft.relevance } : {}),
//     };
//   });

//   const dataset: RetrievalGoldDataset = {
//     schema_version: "1.0",
//     name: "labour-law-retrieval-v1",
//     description:
//       "Initial manually curated retrieval benchmark for Egyptian Labour Law No. 148 of 2019.",
//     language: "ar",
//     jurisdiction: "EG",
//     items,
//   };

//   return dataset;
// }

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
    relevantArticleNumbers: ["33"],
  },
  {
    id: "labour-002",
    query: "ما الحد الأقصى لفترة اختبار العامل؟",
    relevantArticleNumbers: ["33"],
  },
  {
    id: "labour-003",
    query: "متى يجوز إنهاء عقد العمل غير محدد المدة؟",
    relevantArticleNumbers: ["118", "119"],
  },
  {
    id: "labour-004",
    query: "ما هي مدة الإخطار بإنهاء عقد العمل غير محدد المدة؟",
    relevantArticleNumbers: ["118"],
  },
  {
    id: "labour-005",
    query: "ما هي حالات إنهاء عقد العمل؟",
    relevantArticleNumbers: ["117", "118", "119"],
  },
  {
    id: "labour-006",
    query: "ما هي حالات فصل العامل؟",
    relevantArticleNumbers: ["129"],
  },
  {
    id: "labour-007",
    query: "ما هي الضوابط المتعلقة بفصل العامل تأديبيا؟",
    relevantArticleNumbers: ["129", "130"],
  },
  {
    id: "labour-008",
    query: "ما هي أحكام الإجازة السنوية للعامل؟",
    relevantArticleNumbers: ["131", "132"],
  },
  {
    id: "labour-009",
    query: "ما هي مدة الإجازة السنوية؟",
    relevantArticleNumbers: ["131"],
  },
  {
    id: "labour-010",
    query: "ما هي أحكام تشغيل الأطفال في قانون العمل؟",
    relevantArticleNumbers: ["54", "55", "56", "57", "58", "59"],
  },
  {
    id: "labour-011",
    query: "ما هو الحد الأقصى لساعات العمل؟",
    relevantArticleNumbers: ["89", "90"],
  },
  {
    id: "labour-012",
    query: "ما هي فترات الراحة أثناء العمل؟",
    relevantArticleNumbers: ["90", "91"],
  },
  {
    id: "labour-013",
    query: "ما هي أحكام العمل الإضافي؟",
    relevantArticleNumbers: ["92", "93", "94"],
  },
  {
    id: "labour-014",
    query: "ما هي العقوبات المقررة لمخالفة قانون العمل؟",
    relevantArticleNumbers: ["288", "289"],
  },
  {
    id: "labour-015",
    query: "ما هي العقوبات على مخالفة أحكام تشغيل الأطفال؟",
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
