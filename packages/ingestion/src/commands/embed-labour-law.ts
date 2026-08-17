import { embedLaw } from "./embed-law";

embedLaw({
  inputPath: "data/canonical/labour-law-148-2019.json",
  outputPath: "data/embeddings/labour-law-148-2019.json",
}).catch((error: unknown) => {
  console.error("Failed to embed Labour Law.");
  console.error(error);

  process.exitCode = 1;
});
