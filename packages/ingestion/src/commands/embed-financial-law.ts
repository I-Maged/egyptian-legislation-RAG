import { embedLaw } from "./embed-law";

embedLaw({
  inputPath: "data/canonical/financial-law-18-2019.json",
  outputPath: "data/embeddings/financial-law-18-2019.json",
}).catch((error: unknown) => {
  console.error("Failed to embed Financial Law.");
  console.error(error);

  process.exitCode = 1;
});
