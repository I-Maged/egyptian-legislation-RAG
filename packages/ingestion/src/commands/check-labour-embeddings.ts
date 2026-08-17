import { checkEmbeddingIntegrity } from "./embedding-integrity";

checkEmbeddingIntegrity({
  corpusPath: "data/canonical/labour-law-148-2019.json",

  embeddingPath: "data/embeddings/labour-law-148-2019.json",
}).catch((error: unknown) => {
  console.error("Labour Law embedding integrity check failed.");

  console.error(error);

  process.exitCode = 1;
});
