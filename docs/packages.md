# Package Documentation

This document explains what every package in the Egyptian Legislation RAG monorepo does, including sub-packages and key modules.

---

## Project Overview

Egyptian Legislation RAG is a Retrieval-Augmented Generation (RAG) system for Egyptian legal texts in Arabic. It ingests PDFs of Egyptian laws, parses them into canonical chunks, embeds them using Ollama, stores them in Postgres with pgvector, and serves an Arabic legal Q&A chatbot via a Next.js web app.

---

## packages/core

Shared foundational types and validation schemas used by all other packages. This is the contract layer — no logic, only types.

### `src/types/law.ts`
Defines the canonical legal data model:
- `LawDocument` — a single law document with `id`, `law_name`, `law_number`, `year`, `jurisdiction` ("EG"), `language` ("ar"), `source_file`, and `metadata` (parser_version, normalization_version).
- `LawChunk` — a single article/chunk with `id`, `document_id`, `article_number`, `article_title`, `source_order`, `hierarchy[]` (e.g., chapter), `text`, `text_for_embedding`, `provenance` (source_file, page_start, page_end), and `metadata` (parser_version, normalization_version, ocr_confidence).
- `LawHierarchyNode` — a node in the legal document hierarchy with `type`, `label`, and optional `title`.

### `src/types/embedding.ts`
Defines the embedding data model:
- `EmbeddingRecord` — links a `chunk_id` to its `embedding` vector, along with `model` and `dimensions`.
- `EmbeddingArtifact` — a batch of embeddings with `schema_version`, `model`, `dimensions`, and `records[]`.
- `EmbeddingProvider` interface — contract for embedding providers: `model`, `dimensions`, and `embed(texts: string[]): Promise<number[][]>`.

### `src/schemas/`
Validation schemas (likely Zod) for `LawDocument`, `LawChunk`, and `CanonicalCorpus` structures.

### `src/validation/corpus.ts`
Validates that a canonical corpus conforms to the expected schema.

---

## packages/db

Prisma database layer with repositories for all persistence operations.

### `src/client.ts`
Singleton Prisma client connected to the Postgres database.

### `src/repositories/vector.repository.ts`
- `searchSimilarEmbeddings(input)` — performs vector similarity search against `law_chunk_embeddings` using pgvector's cosine distance operator (`<=>`). Returns `1 - distance` as similarity score. Supports optional `lawDocumentId` filtering.

### `src/repositories/bm25.repository.ts`
- `searchBm25(input)` — performs full-text search using Postgres BM25/tsvector ranking.

### `src/repositories/hybrid.repository.ts`
- `searchHybrid(input)` — combines vector and BM25 search. Currently wraps `searchSimilarEmbeddings`; the BM25 fusion path is present in comments but not active.

### `src/repositories/corpus.repository.ts`
- `upsertCorpus(corpus)` — inserts or updates a `LawDocument` and its `LawChunk[]` into Postgres.
- `getChunksByIds(ids)` — loads chunks by their IDs.

### `src/repositories/embedding.repository.ts`
- `upsertEmbedding(record)` / `upsertEmbeddings(records)` — inserts or updates embedding vectors.

### `src/repositories/law.repository.ts`
Law-specific DB queries (CRUD for law documents).

### `src/repositories/analytics.repository.ts`
Analytics and query logging repositories.

---

## packages/ingestion

The largest package. Handles the full ingestion pipeline: parsing raw OCR output, canonicalizing into the shared schema, generating embeddings, and providing retrieval algorithms.

### canonical/ — Law-Specific Canonicalizers

Converts parser-specific output into the shared `CanonicalCorpus` schema.

#### `types.ts`
- `CanonicalCorpus` — wrapper with `schema_version: "1.0"`, `document: LawDocument`, and `chunks: LawChunk[]`.

#### `registry.ts`
- `canonicalizers` — a map of supported law keys to their canonicalizer functions:
  - `labour_law` → `canonicalizeLabourLaw`
  - `personal_affair_law` → `canonicalizePersonalAffairsLaw`
  - `financial_law` → `canonicalizeFinancialLaw`
- `isSupportedLaw(law)` — type guard.

#### `labour-law.ts`
- `canonicalizeLabourLaw(parserChunks, options)` — converts parser v2.3 output into a `CanonicalCorpus`. Creates stable `documentId` and `chunkId` via SHA-256 hashing. Handles duplicate article numbers using an occurrence index. Maps `chapter` to a single-level hierarchy node.

#### `personal-affairs.ts`
- `canonicalizePersonalAffairsLaw(input)` — converts `PersonalAffairsParserOutput` (with `metadataResolved` and `articles[]`) into a `CanonicalCorpus`. Uses a richer chunk ID that incorporates `sourceOrder`, `pageStart`, `pageEnd`, and `text` to handle repeated article numbers.

#### `financial-law.ts`
- `canonicalizeFinancialLaw(parserChunks)` — similar to labour law but for `FinancialLawParserArticle[]`. Hardcodes `source_file: "financial_law.pdf"`.

### commands/ — CLI Commands

Executable scripts that orchestrate the ingestion pipeline.

#### `canonicalize.ts` / `canonicalize-law.ts`
- Reads parser JSON, dispatches to the appropriate law-specific canonicalizer, writes the canonical corpus JSON.

#### `canonicalize-labour-law.ts` / `canonicalize-labour-law.integrity.test.ts`
Labour-specific canonicalization CLI + integrity validation tests.

#### `embed-law.ts` / `embed-labour-law.ts` / `embed-financial-law.ts` / `embed-personal-affairs.ts`
- Reads a canonical corpus JSON, generates embeddings using `OllamaEmbeddingProvider`, and writes an `EmbeddingArtifact` JSON.

#### `import-corpus.ts`
- Reads canonical corpus and embedding JSON files from `data/canonical/` and `data/embeddings/`.
- Validates that chunk counts and embedding counts match, and that every embedding belongs to the corpus.
- Upserts the document, chunks, and embeddings into Postgres via `@egyptian-law/db`.

#### `check-canonical.ts`, `check-personal-embeddings.ts`, etc.
Inspection and validation commands for verifying corpus and embedding integrity.

#### `embedding-integrity.ts`
Validates that an embedding artifact has valid dimensions, finite values, and matching record counts.

#### `inspect-canonical-corpus.ts`
Prints metadata and statistics about a canonical corpus file.

### corpus/ — JSON I/O Utilities

#### `read-json.ts` / `write-json.ts`
Read and write `CanonicalCorpus` JSON files.

#### `inspect.ts`
Reads a canonical corpus and prints summary statistics (document count, chunk count, article range, etc.).

### embeddings/ — Embedding Generation

#### `provider.ts`
- `validateEmbeddingVector(vector, expectedDimensions)` — ensures a vector has the right length and all finite values.
- `createEmbeddingProvider(provider)` — validates provider config (non-empty model, positive integer dimensions).

#### `ollama-provider.ts`
- `OllamaEmbeddingProvider` — calls Ollama's `/api/embed` endpoint. Default model: `bge-m3`, default dimensions: 1024. Validates response shape, length, and finiteness.

#### `embed-corpus.ts`
- `embedCorpus(corpus, provider, options)` — iterates over all chunks, calls `provider.embed()`, and returns an `EmbeddingArtifact`. Supports batching.

#### `integrity.ts` / `integrity.test.ts`
Validates that an embedding artifact is internally consistent.

#### `read-json.ts` / `write-json.ts`
JSON I/O for `EmbeddingArtifact`.

### parser/ — Raw Parser (Qwen OCR → Structured Articles)

Parses raw Qwen Vision OCR output (JSON) into structured `ParsedArticle[]` with metadata, coverage info, and validation.

#### `src/index.ts`
CLI entry point. Orchestrates the full parsing pipeline:
1. `readPdfPages(pdf)` — extract text from the source PDF.
2. `inferMetadata(records)` — infer law name, number, year from OCR text using regex.
3. `makeInstrumentId(meta)` — create a stable instrument ID.
4. `mergeOCR(original, recovery)` — merge original Qwen records with recovery records.
5. `buildArticles(merged, meta, id)` — group records by article, deduplicate text, build `ParsedArticle` objects.
6. `findSequenceGaps(articles)` — detect missing article numbers.
7. `buildCoverage(pages, merged, gaps)` — build a page coverage map and recovery queue.
8. `validateArticles(articles, recoveryTasks)` — validate articles and collect issues.
9. Outputs a `ParserOutput` JSON.

#### `src/types.ts`
Defines `QwenOCRRecord`, `MergedRecord`, `ParsedArticle`, `ParserOutput`, `LawMetadata`, `ValidationIssue`, `PDFPageInfo`, `SourceType`, `RecoveryTask`, etc.

#### `src/parser/metadata.ts`
- `inferMetadata(records)` — scans the first ~40 pages of OCR text with regex to extract law name, number, and year. Falls back to record metadata.
- `makeInstrumentId(meta)` — creates a human-readable instrument ID from metadata.

#### `src/parser/merge.ts`
- `mergeOCR(original, recovery)` — combines original and recovery OCR arrays, assigns `sourceType` (`vision_ocr` or `vision_ocr_recovery`), filters invalid records, sorts by page and original index.

#### `src/parser/articles.ts`
- `buildArticles(records, meta, id)` — groups OCR records by article number, sorts by page, deduplicates consecutive identical lines, joins chunks into article text, computes `textForEmbedding`, tracks pages, recovery info, and review flags.

#### `src/parser/text.ts`
- `cleanLegalText(text)` — removes duplicate consecutive lines, strips official gazette headers (`الجريدة الرسمية` + issue number).
- `normalizeForEmbedding(text)` — Arabic normalization: unifies Alef forms (إ, أ, آ, ٱ → ا), Ya forms (ى → ي), Waw with damma (ؤ → و), Ya with hamza (ئ → ي), removes tatweel (ـ), and strips Arabic diacritics (tashkeel).

#### `src/parser/validator.ts`
- `validateArticles(articles, recoveryTasks)` — produces `ValidationIssue[]` for invalid article numbers, empty text, long articles (>5000 chars), multi-page articles, recovered articles, duplicate article numbers, and non-empty recovery queue.

#### `src/parser/gaps.ts`
- `findSequenceGaps(articles)` — detects gaps in the article number sequence (e.g., missing article 5 between 4 and 6).

#### `src/coverage/pdf.ts`
- `readPdfPages(file)` — uses `pdfjs-dist` to extract text from each PDF page. Tracks `articleNumbers` per page, flags blank pages, front matter (first 10 pages without article markers), and end matter.

#### `src/coverage/map.ts`
- `buildCoverage(pages, merged, gaps)` — builds a coverage map linking pages to expected articles and creates a recovery queue for pages that need targeted OCR.

#### `src/utils/arabic.ts`
Arabic-specific utilities: digit normalization (Arabic-Indic ↔ ASCII), whitespace normalization, first integer extraction from Arabic text.

#### `src/utils/article.ts`
- `parseArticleIdentifier(raw)` — parses Arabic article identifiers like "المادة (5)" or "5" into `{number, suffix}`.
- `canonicalArticleNumber(raw)` — normalizes article numbers to a canonical string form.
- `tokenizeArabic(text)` — Arabic-aware tokenization for BM25/reranking.

### retrieval/ — Retrieval Algorithms

Provides both in-memory and database-backed retrieval strategies.

#### `vector-retriever.ts`
- `InMemoryVectorRetriever` — loads an `EmbeddingArtifact` and a `CanonicalCorpus` into memory, then performs cosine similarity search against query embeddings.

#### `db-vector-retriever.ts`
- `PostgresVectorRetriever` — performs vector search via `@egyptian-law/db`'s `searchSimilarEmbeddings`, then loads full `LawChunk` objects via a `ChunkLoader` (`getChunksByIds`). This is the production retriever used by the RAG service.

#### `bm25.ts`
Core BM25 scoring implementation with Arabic tokenization support.

#### `bm25-retriever.ts`
- `InMemoryBm25Retriever` — in-memory BM25 search over a corpus.

#### `hybrid-retriever.ts`
- `HybridRetriever` — combines `InMemoryVectorRetriever` and `InMemoryBm25Retriever` using Reciprocal Rank Fusion (RRF). Configurable `vectorWeight`, `bm25Weight`, and `rrfK` (default 60).

#### `reranker.ts`
- `BaselineReranker` — reranks vector search candidates using three signals:
  - Exact phrase match (normalized Arabic)
  - Query-term coverage (fraction of unique query terms found in the chunk)
  - Original vector retrieval score (normalized)
  Default weights: phrase=0.45, coverage=0.35, retrieval=0.2.

#### `cosine.ts` / `cosine.test.ts`
Raw cosine similarity utility for vectors.

---

## packages/generation

LLM provider abstraction and prompt/citation building for answer generation.

### `provider.ts`
Defines the `GenerationProvider` interface and related types:
- `GenerationProviderRequest` — `prompt`, optional `system`, `temperature`, `maxTokens`.
- `GenerationProviderResponse` — `answer` string and `metadata` (model, durationMs).
- `GenerationProvider` — `generate(request): Promise<GenerationProviderResponse>`.

### `ollama-provider.ts`
- `OllamaGenerationProvider` — calls Ollama's generation API. Default model: `gemma4:cloud`. Handles streaming/non-streaming responses.

### `generate.ts`
- `generateAnswer(provider, request)` — orchestrates generation:
  1. Builds a prompt from the query and retrieved chunks.
  2. Calls `provider.generate()` with the legal system prompt.
  3. Extracts citations from the answer text.
  4. Returns `GenerationResponse` with answer, citations, and metadata.
- `generateFromChunks(provider, query, chunks, options)` — convenience wrapper.

### `prompt.ts`
- `LEGAL_SYSTEM_PROMPT` — Arabic system prompt instructing the model to answer only from the provided legal context, cite article numbers, and avoid inventing information.
- `buildGenerationPrompt(query, chunks)` — formats the query and chunks into a structured prompt for the LLM.

### `citations.ts`
- `buildCitations(answer, chunks)` — extracts `[1]`, `[2]`, etc. citation markers from the LLM answer and maps them back to the corresponding chunks.

### `context.ts`
- `buildGenerationContext(chunks)` — formats retrieved chunks into a context string for the LLM prompt.

### `types.ts`
Generation-related TypeScript types.

---

## packages/rag

Orchestration layer combining retrieval and generation into a single RAG pipeline.

### `types.ts`
Defines the RAG contract:
- `RagRequest` — `query`, optional `retrieval` options, optional `systemInstruction`.
- `RagResponse` — `answer`, `citations[]`, `retrieved[]`, `context` (documents + text), `generation` metadata.
- `RagRetrievalResult` — a retrieved chunk with `vectorScore`, `rerankScore`, `matchedTerms`, `termCoverage`, `exactPhraseMatch`.
- `RagRetriever` interface — `retrieve(query, options): Promise<RagRetrievalResult[]>`.

### `factory.ts`
- `getRagService(options)` — creates a configured `RagService` singleton. Wires together:
  - `OllamaEmbeddingProvider` (model: `bge-m3`, dimensions: 1024)
  - `PostgresVectorRetriever`
  - `BaselineReranker`
  - `OllamaGenerationProvider` (model: `gemma4:cloud`)
  - `RagService`

### `service.ts`
- `RagService` — the main entry point for Arabic legal Q&A.
  - `answer(request)`:
    1. Validates the query.
    2. Retrieves candidates via `RagRetriever.retrieve()` (vector search + reranking).
    3. Builds Arabic context from retrieved chunks.
    4. Calls the generation provider with the legal system prompt and user prompt.
    5. Extracts citations from the answer.
    6. Returns a structured `RagResponse`.
  - Supports `topK`, `candidateTopK`, `systemPrompt`, `temperature`, `maxTokens`.

### `retriever.ts`
- `DbRagRetriever` — implements `RagRetriever` using the production DB-backed pipeline:
  1. **Vector search**: embeds the query, calls `PostgresVectorRetriever.search()` with `candidateTopK`.
  2. **Reranking**: applies `BaselineReranker` to the vector candidates.
  3. **Formatting**: converts reranked results into `RagRetrievalResult[]` with scores and metadata.

### `context.ts`
- `buildRagContext(results)` — formats `RagRetrievalResult[]` into an Arabic context string with citation IDs, law names, article numbers, hierarchy, page ranges, and full text.

### `prompt.ts`
RAG-specific prompt templates (query formatting, context injection).

### `e2e.test.ts` / `e2e.smoke.test.ts` / `e2e.real-labour.smoke.test.ts`
End-to-end integration tests for the full RAG pipeline.

---

## packages/evaluation

Metrics, evaluators, and benchmarks for measuring retrieval and context quality.

### `src/retrieval/`
- `types.ts` — evaluation types.
- `metrics.ts` — retrieval metrics: precision, recall, Mean Reciprocal Rank (MRR), Normalized Discounted Cumulative Gain (NDCG).
- `evaluator.ts` — `RetrievalEvaluator` class that computes metrics against ground truth.
- `evaluator.test.ts` — tests.

### `src/context/`
- `types.ts` — context evaluation types.
- `metrics.ts` — context quality metrics (e.g., faithfulness, answer relevance).
- `evaluator.ts` — `ContextEvaluator` class.
- `evaluator.test.ts` — tests.

### `src/benchmarks/`
- `retrieval-benchmark.ts` — runs retrieval benchmarks over a dataset.
- `context-benchmark.ts` — runs context quality benchmarks.
- `db-retrieval.ts` — DB-backed retrieval benchmark runner.
- `db-retrieval-adapters.ts` — adapters to plug DB retrievers into the benchmark framework.
- `labour-law-benchmark.test.ts` — labour law-specific benchmark tests.

### `src/datasets/`
- `retrieval-dataset.ts` — dataset definitions for retrieval evaluation (queries + ground truth relevant chunks).

---

## apps/web

Next.js web application serving the Arabic legal chatbot.

### `app/api/chat/route.ts`
POST endpoint that:
1. Accepts `{ query: string, lawDocumentId?: string }`.
2. Calls `RagService.answer()` from `@egyptian-law/rag`.
3. Returns `{ answer, citations, generation }` as JSON.

### `app/page.tsx`
Main chat UI page.

### `app/admin/`
Admin pages for managing laws (list, create, view).

### `lib/rag.ts`
Singleton `RagService` factory for the web app, using the default configuration from `@egyptian-law/rag`.

---

## Data Flow

```
PDF Source
    │
    ▼
[Parser] (packages/ingestion/parser)
    │  Qwen OCR → ParsedArticles + coverage + validation
    ▼
[Canonicalizer] (packages/ingestion/canonical)
    │  Parser output → CanonicalCorpus (LawDocument + LawChunks)
    ▼
[Embeddings] (packages/ingestion/embeddings)
    │  Chunks → Ollama EmbeddingProvider → EmbeddingArtifact
    ▼
[Import] (packages/ingestion/commands/import-corpus.ts)
    │  CanonicalCorpus + EmbeddingArtifact → Postgres + pgvector
    ▼
[DB] (packages/db)
    │  Prisma repositories for vector, BM25, hybrid, corpus, embeddings
    ▼
[RAG Service] (packages/rag)
    │  Query → Embed → Vector Search → Rerank → Generate → Citations
    ▼
[Web App] (apps/web)
    │  Next.js API + UI
    ▼
User Query (Arabic)
```

---

## Technology Stack

- **Language**: TypeScript (ESM)
- **Monorepo**: npm workspaces
- **Database**: Postgres + Prisma + pgvector
- **Embeddings**: Ollama (bge-m3, 1024 dimensions)
- **Generation**: Ollama (gemma4:cloud)
- **PDF Parsing**: pdfjs-dist
- **Web**: Next.js (App Router)
- **Testing**: Vitest
