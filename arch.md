//packages/generation/src/citations.ts
import type { LawChunk } from "@egyptian-law/core";

import type { GenerationCitation } from "./types";

const CITATION_PATTERN = /\[C(\d+)\]/g;

export function extractCitationIds(answer: string): string[] {
const citationIds = new Set<string>();

for (const match of answer.matchAll(CITATION_PATTERN)) {
const citationNumber = Number(match[1]);

    if (Number.isInteger(citationNumber) && citationNumber >= 1) {
      citationIds.add(`C${citationNumber}`);
    }

}

return [...citationIds];
}

export function buildCitations(
answer: string,
chunks: LawChunk[],
): GenerationCitation[] {
const referencedIndexes = new Set<number>();

for (const match of answer.matchAll(CITATION_PATTERN)) {
const citationNumber = Number(match[1]);

    if (
      Number.isInteger(citationNumber) &&
      citationNumber >= 1 &&
      citationNumber <= chunks.length
    ) {
      referencedIndexes.add(citationNumber);
    }

}

return [...referencedIndexes]
.sort((a, b) => a - b)
.map((citationNumber) => {
const chunk = chunks[citationNumber - 1];

      if (!chunk) {
        throw new Error(
          `Citation C${citationNumber} references an unavailable chunk.`,
        );
      }

      return {
        citationId: `C${citationNumber}`,
        chunkId: chunk.id,
        lawName: chunk.law_name,
        lawNumber: chunk.law_number,
        year: chunk.year,
        articleNumber: chunk.article_number,
        articleTitle: chunk.article_title,
        sourceFile: chunk.provenance.source_file,
        pageStart: chunk.provenance.page_start,
        pageEnd: chunk.provenance.page_end,
      };
    });

}
//packages/generation/src/context.ts
import type { LawChunk } from "@egyptian-law/core";

export interface GenerationContextChunk {
citationId: string;
chunk: LawChunk;
}

export function buildGenerationContext(
chunks: LawChunk[],
): GenerationContextChunk[] {
return chunks.map((chunk, index) => ({
citationId: `C${index + 1}`,
chunk,
}));
}

export function formatGenerationContext(chunks: LawChunk[]): string {
const context = buildGenerationContext(chunks);

return context
.map(({ citationId, chunk }) => {
const hierarchy =
chunk.hierarchy.length > 0
? chunk.hierarchy
.map((node) =>
node.title ? `${node.label}: ${node.title}` : node.label,
)
.join(" > ")
: null;

      const pages =
        chunk.provenance.page_start === null
          ? null
          : chunk.provenance.page_end === null ||
              chunk.provenance.page_end === chunk.provenance.page_start
            ? `صفحة ${chunk.provenance.page_start}`
            : `الصفحات ${chunk.provenance.page_start}-${chunk.provenance.page_end}`;

      return [
        `[${citationId}]`,
        `القانون: ${chunk.law_name}`,
        chunk.law_number !== null ? `رقم القانون: ${chunk.law_number}` : null,
        chunk.year !== null ? `السنة: ${chunk.year}` : null,
        `المادة: ${chunk.article_number}`,
        chunk.article_title !== null
          ? `عنوان المادة: ${chunk.article_title}`
          : null,
        hierarchy !== null ? `التصنيف: ${hierarchy}` : null,
        pages !== null
          ? `المصدر: ${chunk.provenance.source_file}، ${pages}`
          : `المصدر: ${chunk.provenance.source_file}`,
        `النص:\n${chunk.text}`,
      ]
        .filter((value): value is string => value !== null)
        .join("\n");
    })
    .join("\n\n------------------------------\n\n");

}
//package.json
{
"name": "Egyptian Legislation RAG",
"version": "1.0.0",
"private": true,
"type": "module",
"workspaces": [
"packages/*"
],
"scripts": {
"build": "tsc -p tsconfig.json",
"typecheck": "tsc -p tsconfig.json --noEmit",
"recover": "npm run build && node dist/index.js",
"test": "vitest"
},
"dependencies": {
"@napi-rs/canvas": "^0.1.74",
"ollama": "^0.5.18",
"pdfjs-dist": "^5.4.149"
},
"devDependencies": {
"@types/node": "^22.10.2",
"prisma": "^7.9.1",
"typescript": "^5.7.2",
"vitest": "^4.1.10"
}
}
//tsconfig.json
{
"compilerOptions": {
"target": "ES2023",
"module": "ESNext",
"moduleResolution": "bundler",
"types": [
"node"
],
"strict": true,
"noUncheckedIndexedAccess": true,
"exactOptionalPropertyTypes": true,
"esModuleInterop": true,
"skipLibCheck": true,
"outDir": "dist",
"rootDir": ".",
"paths": {
"@egyptian-law/core": [
"./packages/core/src"
],
"@egyptian-law/core/_": [
"./packages/core/src/_"
],
"@egyptian-law/evaluation": [
"./packages/evaluation/src"
],
"@egyptian-law/evaluation/_": [
"./packages/evaluation/src/_"
],
"@egyptian-law/ingestion": [
"./packages/ingestion/src"
],
"@egyptian-law/ingestion/_": [
"./packages/ingestion/src/_"
]
}
},
"include": [
"**/*.ts"
]
}
