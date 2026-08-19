export { prisma } from "./client";

export {
  upsertEmbedding,
  upsertEmbeddings,
} from "./repositories/embedding.repository";

export type { UpsertEmbeddingInput } from "./repositories/embedding.repository";

export { upsertCorpus } from "./repositories/corpus.repository";
