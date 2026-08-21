I made an app called "Egyptian Law RAG". where the user can submit a question from UI and recieves an answer from ground knowledge (database) only.
Both the project tree & database schema are included below for you to understand the project more.
I want you to draw:

- RAG query pipeline diagram
- ER diagram
- use-case diagram
- class diagram
- system diagram
- activity diagram
- flowchart (flow diagram)

And make them aesthetically pleasing

web (nextjs UI)
|
packages
|
├───core
│ │ package-lock.json
│ │ package.json
│ │  
│ └───src
│ │ index.ts
│ │  
│ ├───schemas
│ │ corpus.ts
│ │ law.ts
│ │  
│ ├───types
│ │ embedding.ts
│ │ law.ts
│ │  
│ └───validation
│ corpus.test.ts
│ corpus.ts
│  
├───db
│ │ .env
│ │ .gitignore
│ │ docker-compose.yml
│ │ package.json
│ │ prisma.config.ts
│ │ skills-lock.json
│ │  
│ ├───generated
│ │ └───prisma
│ │ │ browser.ts
│ │ │ client.ts
│ │ │ commonInputTypes.ts
│ │ │ enums.ts
│ │ │ models.ts
│ │ │  
│ │ ├───internal
│ │ │ class.ts
│ │ │ prismaNamespace.ts
│ │ │ prismaNamespaceBrowser.ts
│ │ │  
│ │ └───models
│ │ LawChunk.ts
│ │ LawChunkEmbedding.ts
│ │ LawDocument.ts
│ │  
│ ├───prisma
│ │ │ schema.prisma
│ │ │  
│ │ └───migrations
│ │ │ migration_lock.toml
│ │ │  
│ │ ├───20260819055319_init
│ │ │ migration.sql
│ │ │  
│ │ └───20260819140421_init
│ │ migration.sql
│ │  
│ └───src
│ │ check-vector.ts
│ │ client.ts
│ │ connection.test.ts
│ │ index.ts
│ │  
│ └───repositories
│ analytics.repository.ts
│ bm25.repository.test.ts
│ bm25.repository.ts
│ corpus.repository.ts
│ embedding.repository.ts
│ hybrid.repository.test.ts
│ hybrid.repository.ts
│ law.repository.ts
│ vector.repository.test.ts
│ vector.repository.ts
│  
├───evaluation
│ │ package.json
│ │  
│ └───src
│ │ index.ts
│ │ list.md
│ │  
│ ├───benchmarks
│ │ context-benchmark.ts
│ │ db-retrieval-adapters.test.ts
│ │ db-retrieval-adapters.ts
│ │ db-retrieval.ts
│ │ labour-law-benchmark.test.ts
│ │ retrieval-benchmark.test.ts
│ │ retrieval-benchmark.ts
│ │  
│ ├───context
│ │ evaluator.test.ts
│ │ evaluator.ts
│ │ metrics.ts
│ │ types.ts
│ │  
│ ├───datasets
│ │ labour-law-gold.test.ts
│ │ labour-law-gold.ts
│ │ retrieval-dataset.test.ts
│ │ retrieval-dataset.ts
│ │  
│ ├───generation
│ │ evaluator.test.ts
│ │ evaluator.ts
│ │ index.ts
│ │ llm-judge.ts
│ │ types.ts
│ │  
│ └───retrieval
│ evaluator.test.ts
│ evaluator.ts
│ metrics.test.ts
│ metrics.ts
│ retrieval-evaluator.test.ts
│ retrieval-evaluator.ts
│ types.ts
│  
├───generation
│ │ package.json
│ │  
│ └───src
│ citations.test.ts
│ citations.ts
│ context.test.ts
│ context.ts
│ generate.test.ts
│ generate.ts
│ index.ts
│ ollama-provider.test.ts
│ ollama-provider.ts
│ prompt.test.ts
│ prompt.ts
│ provider.ts
│ types.ts
│  
├───ingestion
│ │ package.json
│ │  
│ ├───src
│ │ │ index.ts
│ │ │  
│ │ ├───canonical
│ │ │ financial-law.real.test.ts
│ │ │ financial-law.test.ts
│ │ │ financial-law.ts
│ │ │ labour-law.real.test.ts
│ │ │ labour-law.test.ts
│ │ │ labour-law.ts
│ │ │ personal-affairs-reconstruction.ts
│ │ │ personal-affairs.real.test.ts
│ │ │ personal-affairs.reconstruction-integrity.test.ts
│ │ │ personal-affairs.reconstruction.test.ts
│ │ │ personal-affairs.source-order.test.ts
│ │ │ personal-affairs.structure.test.ts
│ │ │ personal-affairs.test.ts
│ │ │ personal-affairs.ts
│ │ │ registry.test.ts
│ │ │ registry.ts
│ │ │ types.ts
│ │ │  
│ │ │
│ │ │  
│ │ ├───commands
│ │ │ canonicalize-labour-law.integrity.test.ts
│ │ │ canonicalize-labour-law.ts
│ │ │ canonicalize-law.integrity.test.ts
│ │ │ canonicalize-law.test.ts
│ │ │ canonicalize-law.ts
│ │ │ canonicalize.ts
│ │ │ check-canonical.ts
│ │ │ check-financial-embeddings.ts
│ │ │ check-labour-embeddings.ts
│ │ │ check-personal-embeddings.ts
│ │ │ embed-financial-law.ts
│ │ │ embed-labour-law.ts
│ │ │ embed-law.test.ts
│ │ │ embed-law.ts
│ │ │ embed-personal-affairs.ts
│ │ │ embedding-integrity.ts
│ │ │ import-corpus.ts
│ │ │ inspect-canonical-corpus.test.ts
│ │ │ inspect-canonical-corpus.ts
│ │ │  
│ │ ├───corpus
│ │ │ inspect.ts
│ │ │ json.test.ts
│ │ │ read-json.ts
│ │ │ write-json.ts
│ │ │  
│ │ ├───embeddings
│ │ │ embed-corpus.ts
│ │ │ embedding.test.ts
│ │ │ integrity.test.ts
│ │ │ integrity.ts
│ │ │ ollama-provider.test.ts
│ │ │ ollama-provider.ts
│ │ │ provider.ts
│ │ │ read-json.ts
│ │ │ types.ts
│ │ │ write-json.ts
│ │ │  
│ │ ├───parser
│ │ │ │ package-lock.json
│ │ │ │ package.json
│ │ │ │ README.md
│ │ │ │ tsconfig.json
│ │ │ │  
│ │ │ └───src
│ │ │ │ index.ts
│ │ │ │ types.ts
│ │ │ │  
│ │ │ ├───coverage
│ │ │ │ pdf.ts
│ │ │ │  
│ │ │ ├───io
│ │ │ │ json.ts
│ │ │ │  
│ │ │ ├───parser
│ │ │ │ articles.ts
│ │ │ │ gaps.ts
│ │ │ │ merge.ts
│ │ │ │ metadata.ts
│ │ │ │ text.ts
│ │ │ │ validator.ts
│ │ │ │  
│ │ │ └───utils
│ │ │ arabic.ts
│ │ │ article.ts
│ │ │  
│ │ └───retrieval
│ │ bm25-retriever.test.ts
│ │ bm25-retriever.ts
│ │ bm25.test.ts
│ │ bm25.ts
│ │ comp.md
│ │ cosine.test.ts
│ │ cosine.ts
│ │ db-vector-retriever.ts
│ │ hybrid-retriever.test.ts
│ │ hybrid-retriever.ts
│ │ reranker.test.ts
│ │ reranker.ts
│ │ vector-retriever.test.ts
│ │ vector-retriever.ts
│ │  
│ └───test-data
│ labour-v2.3.sample.json
│  
└───rag
│ package.json
│  
 └───src
context.test.ts
context.ts
e2e.real-labour.smoke.test.ts
e2e.smoke.test.ts
e2e.test.ts
factory.ts
index.ts
prompt.ts
retriever.ts
service.test.ts
service.ts
types.ts

model LawDocument {
id String @id
lawName String @map("law_name")
lawNumber String? @map("law_number")
year String?

jurisdiction String
language String

sourceFile String @map("source_file")

parserVersion String? @map("parser_version")
normalizationVersion String? @map("normalization_version")

chunks LawChunk[]

createdAt DateTime @default(now()) @map("created_at")
updatedAt DateTime @updatedAt @map("updated_at")

@@index([lawName])
@@index([lawNumber])
@@index([year])
@@map("law_documents")
}

model LawChunk {
id String @id
documentId String @map("document_id")

articleNumber String @map("article_number")
articleTitle String? @map("article_title")

text String
textForEmbedding String @map("text_for_embedding")

sourcePageStart Int? @map("source_page_start")
sourcePageEnd Int? @map("source_page_end")

sourceOrder Int? @map("source_order")

hierarchy Json?

parserVersion String? @map("parser_version")
normalizationVersion String? @map("normalization_version")
ocrConfidence Float? @map("ocr_confidence")

document LawDocument @relation(fields: [documentId], references: [id], onDelete: Cascade)
embedding LawChunkEmbedding?

createdAt DateTime @default(now()) @map("created_at")
updatedAt DateTime @updatedAt @map("updated_at")

@@unique([documentId, articleNumber])
@@index([documentId])
@@index([articleNumber])
@@map("law_chunks")
}

model LawChunkEmbedding {
chunkId String @id @map("chunk_id")

model String
dimensions Int
embedding Unsupported("vector(1024)")

chunk LawChunk @relation(fields: [chunkId], references: [id], onDelete: Cascade)

createdAt DateTime @default(now()) @map("created_at")

@@map("law_chunk_embeddings")
}
