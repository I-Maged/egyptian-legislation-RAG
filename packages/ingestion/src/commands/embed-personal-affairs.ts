import { embedLaw } from "./embed-law";

embedLaw({
  inputPath: "data/canonical/personal-affairs-law-25-1929.json",
  outputPath: "data/embeddings/personal-affairs-law-25-1929.json",
}).catch((error: unknown) => {
  console.error("Failed to embed Personal Affairs Law.");
  console.error(error);

  process.exitCode = 1;
});
