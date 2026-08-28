import type { CanonicalCorpus } from "@egyptian-law/core";

import type {
  RetrievalGoldDataset,
  RetrievalGoldItem,
} from "./retrieval-dataset";

export interface PersonalAffairsLawGoldDraft {
  id: string;
  query: string;
  relevantArticleNumbers: string[];
  relevance?: Record<string, number>;
}

export const personalAffairsLawGoldDraft: PersonalAffairsLawGoldDraft[] = [
  {
    id: "personal-001",
    query: "منذ متى تعتبر نفقة المطلقة دينًا؟",
    relevantArticleNumbers: ["2"],
  },
  {
    id: "personal-002",
    query: "كم مرة يقع الطلاق المقترن بعدد لفظ أو إشارة؟",
    relevantArticleNumbers: ["2"],
  },
  {
    id: "personal-003",
    query: "من هو المسؤول عن تنفيذ هذا القانون ومتى يبدأ العمل به؟",
    relevantArticleNumbers: ["2"],
  },
  {
    id: "personal-004",
    query: "متى يستحق الإرث؟",
    relevantArticleNumbers: ["2"],
  },
  {
    id: "personal-005",
    query: "ما هي طرق انعقاد الوصية؟",
    relevantArticleNumbers: ["2"],
  },
  {
    id: "personal-006",
    query: "كيف تنعقد الوصية إذا كان الموصي عاجزًا عن العبارة والكتابة؟",
    relevantArticleNumbers: ["2"],
  },
  {
    id: "personal-007",
    query: "تحت أي شروط تُسمع دعوى الوصية أو الرجوع عنها عند الإنكار؟",
    relevantArticleNumbers: ["2"],
  },
  {
    id: "personal-008",
    query: "ما الجرائم الواردة في البند الأول التي تؤدي إلى سلب الولاية؟",
    relevantArticleNumbers: ["2"],
  },
  {
    id: "personal-009",
    query: "ماذا يترتب على سلب الولاية بالنسبة إلى الصغير؟",
    relevantArticleNumbers: ["2"],
  },
  {
    id: "personal-010",
    query: "ماذا يلغي نص المادة 2 بشأن الكتاب الأول من قانون المحاكم الحسبية؟",
    relevantArticleNumbers: ["2"],
  },
  {
    id: "personal-011",
    query: "متى يجوز للولي مباشرة حق من حقوق الولاية؟",
    relevantArticleNumbers: ["2"],
  },
  {
    id: "personal-012",
    query: "ما السن المطلوب لاكتساب أهلية التقاضي في مسائل الأحوال الشخصية؟",
    relevantArticleNumbers: ["2"],
  },
  {
    id: "personal-013",
    query: "من ينوب عن من عديم الأهلية أو ناقصها في إجراءات التقاضي؟",
    relevantArticleNumbers: ["2"],
  },
  {
    id: "personal-014",
    query: "كم مهلة الموثق لإعلان المطلقة بشخصها عن وقوع الطلاق؟",
    relevantArticleNumbers: ["2"],
  },
  {
    id: "personal-015",
    query: 'ما الحالة التي وُصفت بها المادة 3 في النص "ملغاة"؟',
    relevantArticleNumbers: ["3"],
  },
  {
    id: "personal-016",
    query:
      "عندما يموت اثنان ولا يعلم أيهما مات أولاً فكيف يُفصل في استحقاق أحدهما لتركة الآخر؟",
    relevantArticleNumbers: ["3"],
  },
  {
    id: "personal-017",
    query: "ما الشرطان المذكوران في صحة الوصية؟",
    relevantArticleNumbers: ["3"],
  },
  {
    id: "personal-018",
    query: "اذكر حالة واحدة من الحالات التي يجوز فيها ثلب أو وقف حقوق الولاية",
    relevantArticleNumbers: ["3"],
  },
  {
    id: "personal-019",
    query: "متى لا يدخل مال القاصر في الولاية؟",
    relevantArticleNumbers: ["3"],
  },
  {
    id: "personal-020",
    query:
      "ماذا يحدث إذا رفعت دعوى مسائل الأحوال الشخصية أمام المحكمة الجزئية بغير توقيع محامٍ؟",
    relevantArticleNumbers: ["3"],
  },
  {
    id: "personal-021",
    query: "اذكر اثنين من البيانات التي يجب أن يتضمنها إعلان وقوع الطلاق.",
    relevantArticleNumbers: ["3"],
  },
  {
    id: "personal-022",
    query:
      "من تخطره النيابة العامة بموعد جرد أموال المعني بالحماية ومتى يجوز دعوة الصغير الذي أتم خمسة عشر سنة للحضور؟",
    relevantArticleNumbers: ["3"],
  },
  {
    id: "personal-023",
    query:
      "ما الإجراءات التي يتخذها القاضي إذا امتنع الزوج عن الإنفاق وكان له مال ظاهر؟",
    relevantArticleNumbers: ["4"],
  },
  {
    id: "personal-024",
    query: "ما ترتيب الوفاء من التركة؟",
    relevantArticleNumbers: ["4"],
  },
  {
    id: "personal-025",
    query: "متى تصح الوصية المضافة أو المعلقة بالشروط؟",
    relevantArticleNumbers: ["4", "3"],
  },
  {
    id: "personal-026",
    query: "ما حكم الشرط الصحيح الذي تقترن به الوصية؟",
    relevantArticleNumbers: ["4"],
  },
  {
    id: "personal-027",
    query: "ما الاختصاصات الأساسية للولي في رعاية أموال القاصر؟",
    relevantArticleNumbers: ["4"],
  },
  {
    id: "personal-028",
    query:
      "كم المدة القصوى لتقديم تقرير الاختصاصي الاجتماعي التي تحددها المحكمة أثناء تهيئة الدعوى؟",
    relevantArticleNumbers: ["4"],
  },
  {
    id: "personal-029",
    query:
      "أي قانون تطبق قواعده وإجراءاته على الإعلان بوقوع الطلاق فيما عدا ما تقدم؟",
    relevantArticleNumbers: ["4"],
  },
  {
    id: "personal-030",
    query:
      "اذكر مكانين من الأماكن التي يجوز للمحكمة اختيارها لرؤية الصغير إذا لم يتفق الحاضنان.",
    relevantArticleNumbers: ["4"],
  },
  {
    id: "personal-031",
    query: "من الذي يتولى إجراءات الجرد؟",
    relevantArticleNumbers: ["4"],
  },
  {
    id: "personal-032",
    query:
      "في حالة غياب الزوج هل يختلف تطبيق أحكام التنفيذ إذا كان له مال ظاهر؟",
    relevantArticleNumbers: ["5"],
  },
  {
    id: "personal-033",
    query: "خلال كم يوم يجب توثيق إشهاد الطلاق لدى الموثق؟",
    relevantArticleNumbers: ["5"],
  },
  {
    id: "personal-034",
    query:
      "متى تترتب آثار الطلاق من حيث الميراث والحقوق المالية إذا أخفى الزوج وقوع الطلاق عن زوجته؟",
    relevantArticleNumbers: ["5"],
  },
  {
    id: "personal-035",
    query: "هل يمنع قتل المورث عمدًا استحقاق الإرث عن القاتل؟",
    relevantArticleNumbers: ["5"],
  },
  {
    id: "personal-036",
    query: "متى يجوز وصية المحجور عليه للسفه أو الغفلة بإذن المجلس الحسبي؟",
    relevantArticleNumbers: ["5"],
  },
  {
    id: "personal-037",
    query: "متى يجوز للولي التبرع بمال القاصر؟",
    relevantArticleNumbers: ["5"],
  },
  {
    id: "personal-038",
    query:
      "في أي حالات يجوز للمحكمة نظر مسائل الأحوال الشخصية في غرفة المشورة؟",
    relevantArticleNumbers: ["5"],
  },
  {
    id: "personal-039",
    query:
      "ماذا يفعل الموثق إذا لم تحضر المطلقة لاستلام نسخة إشهاد الطلاق خلال المدة المقررة؟",
    relevantArticleNumbers: ["5"],
  },
  {
    id: "personal-040",
    query: "ما الحد الأدنى لمدة الرؤية الأسبوعية ومواعيدها؟",
    relevantArticleNumbers: ["5"],
  },
  {
    id: "personal-041",
    query: "كم نسخة يحرر بها محضر جرد الأموال؟",
    relevantArticleNumbers: ["5"],
  },
  {
    id: "personal-042",
    query: "تحت أي شرط يمكن للزوج أن يرجع زوجته بعد تطليقها لعدم الإنفاق؟",
    relevantArticleNumbers: ["6"],
  },
  {
    id: "personal-043",
    query:
      "ما نوع الطلاق الذي يوقعه القاضي إذا ثبت الضرر الذي ألحقه الزوج بزوجته؟",
    relevantArticleNumbers: ["6"],
  },
  {
    id: "personal-044",
    query: "هل يورث المسلم وغير المسلم بعضهما بعضًا؟",
    relevantArticleNumbers: ["6"],
  },
  {
    id: "personal-045",
    query: "اذكر شرطين يجب توافرهما في الموصي له.",
    relevantArticleNumbers: ["6"],
  },
  {
    id: "personal-046",
    query: "من الذي تُقدر المحكمة نفقة الصغير عليه؟",
    relevantArticleNumbers: ["6"],
  },
  {
    id: "personal-047",
    query: "هل يجوز للولي رهن عقار القاصر لادين على نفسه؟",
    relevantArticleNumbers: ["6"],
  },
  {
    id: "personal-048",
    query:
      "متى يجوز للنيابة العامة رفع الدعوى ابتداءً في مسائل الأحوال الشخصية؟",
    relevantArticleNumbers: ["6"],
  },
  {
    id: "personal-049",
    query: "من الذي يقيد نسخة إشهاد الطلاق في السجل ويعتمد القيد؟",
    relevantArticleNumbers: ["6"],
  },
  {
    id: "personal-050",
    query: "أين ينفذ حكم الصادر برؤية الصغير؟",
    relevantArticleNumbers: ["6"],
  },
  {
    id: "personal-051",
    query: "ماذا يترتب على عودة المفقود أو عدم تبين حياته بالنسبة لزواجه؟",
    relevantArticleNumbers: ["8"],
  },
  {
    id: "personal-052",
    query: "ما مدة مأمورية الحكمين وحدها وحد الإضافة التي يجوز للمحكمة منحها؟",
    relevantArticleNumbers: ["8"],
  },
  {
    id: "personal-053",
    query: "من هم أصحاب الفروض الذين يبدأ بهم التوريث؟",
    relevantArticleNumbers: ["8"],
  },
  {
    id: "personal-054",
    query: "متى تبطل وصية وجهة معينة مستقبلية؟",
    relevantArticleNumbers: ["8"],
  },
  {
    id: "personal-055",
    query: "متى لا تقبل دعوى الوقف أو الاستحقاق فيه؟",
    relevantArticleNumbers: ["8"],
  },
  {
    id: "personal-056",
    query:
      "ما البيان الذي يجب أن يثبته الموثق في وثيقة الزواج عن حالة الزوج الاجتماعية؟",
    relevantArticleNumbers: ["8"],
  },
  {
    id: "personal-057",
    query:
      "ما الحكم الذي يُقضى به إذا طلبت الزوجة التفريق لعيب لا يُحتمل دوام العشرة؟",
    relevantArticleNumbers: ["9"],
  },
  {
    id: "personal-058",
    query:
      "هل يؤثر امتناع أحد الزوجين عن حضور مجلس التحكيم على سير عمل الحكمين إذا تم إخطارهما؟",
    relevantArticleNumbers: ["9"],
  },
  {
    id: "personal-059",
    query: "في أي حالة يثبت للآب فرض السدس؟",
    relevantArticleNumbers: ["9", "21"],
  },
  {
    id: "personal-060",
    query: "اذكر ثلاثة أنواع من الدعاوى التي تختص بها المحكمة الجزئية.",
    relevantArticleNumbers: ["9"],
  },
  {
    id: "personal-061",
    query: "خلال كم يوم يجب على الموثق إخطار الزوجات بزواج الزوج الجديد؟",
    relevantArticleNumbers: ["9"],
  },
  {
    id: "personal-062",
    query: "ما نوع الطلاق في الفرقة بالعيب؟",
    relevantArticleNumbers: ["10"],
  },
  {
    id: "personal-063",
    query: "ماذا يقترح الحكمان إذا كانت الإساءة كلها من جانب الزوج؟",
    relevantArticleNumbers: ["10"],
  },
  {
    id: "personal-064",
    query: "ما حصة أولاد الأم الواحدة والاثنتين فأكثر؟",
    relevantArticleNumbers: ["10"],
  },
  {
    id: "personal-065",
    query: "متى يستعان بأهل الخبرة في دعاوى الفسخ المتعلقة بعيوب الزواج؟",
    relevantArticleNumbers: ["11"],
  },
  {
    id: "personal-066",
    query:
      "ما الواجبات الإدارية التي تترتب على النائب أو الوصي عند انتهاء الوصاية؟",
    relevantArticleNumbers: ["50"],
  },
  {
    id: "personal-067",
    query:
      "ما الحد الأقصى للمدة التي يُحكم بعدها بموت المفقود في الحالات العامة؟",
    relevantArticleNumbers: ["21"],
  },
  {
    id: "personal-068",
    query:
      "ماذا يحدث إذا صدر حكم بموت المفقود أو نشر قرار رئاسي باعتباره ميتًا؟",
    relevantArticleNumbers: ["22"],
  },
  {
    id: "personal-069",
    query:
      "متى تُعتبر الوصية لقيوم محصورة نافذة إذا بُلغ بعضهم بوفاة الموصي وكان بعضهم غير أهل للوصية وقت الوفاة؟",
    relevantArticleNumbers: ["31"],
  },
  {
    id: "personal-070",
    query:
      "متى يُحكم بسلب الولاية أو وقفها أو الحد منها ثم لا تعود إلا بعد أسباب جديدة؟",
    relevantArticleNumbers: ["23"],
  },
];

export function buildPersonalAffairsLawGoldDataset(
  corpus: CanonicalCorpus,
): RetrievalGoldDataset {
  const articleMap = new Map<string, string[]>();

  for (const chunk of corpus.chunks) {
    const chunkIds = articleMap.get(chunk.article_number) ?? [];

    chunkIds.push(chunk.id);

    articleMap.set(chunk.article_number, chunkIds);
  }

  const items: RetrievalGoldItem[] = personalAffairsLawGoldDraft.map(
    (draft) => {
      const relevantChunkIds: string[] = [];

      for (const articleNumber of draft.relevantArticleNumbers) {
        const chunkIds = articleMap.get(articleNumber);

        if (!chunkIds || chunkIds.length === 0) {
          throw new Error(
            `Personal Affairs Law article ${articleNumber} was not found in the canonical corpus.`,
          );
        }

        relevantChunkIds.push(...chunkIds);
      }

      const uniqueChunkIds = [...new Set(relevantChunkIds)];

      return {
        id: draft.id,
        query: draft.query,
        relevantChunkIds: uniqueChunkIds,
        ...(draft.relevance !== undefined
          ? { relevance: draft.relevance }
          : {}),
      };
    },
  );

  return {
    schema_version: "1.0",
    name: "personal-affairs-law-retrieval-v1",
    description:
      "Initial manually curated retrieval benchmark for Egyptian Personal Affairs Law No. 25 of 1929.",
    language: "ar",
    jurisdiction: "EG",
    items,
  };
}
