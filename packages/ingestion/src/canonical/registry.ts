import type { CanonicalCorpus } from "./types";

import { canonicalizeLabourLaw } from "./labour-law";

import { canonicalizePersonalAffairsLaw } from "./personal-affairs";

export type SupportedLaw = "labour_law" | "personal_affair_law";

export const canonicalizers = {
  labour_law: canonicalizeLabourLaw,
  personal_affair_law: canonicalizePersonalAffairsLaw,
} as const;

export function isSupportedLaw(law: string): law is SupportedLaw {
  return law in canonicalizers;
}
