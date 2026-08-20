packages/
│
├── core/
│
├── ingestion/
│
├── retrieval/
│
├── generation/
│ ├── context.ts
│ ├── prompt.ts
│ ├── citations.ts
│ ├── generate.ts
│ └── providers/
│ └── ollama-provider.ts
│
├── rag/
│ ├── retriever.ts
│ ├── service.ts
│ └── types.ts
│
└── evaluation/

And the responsibility should be:

generation

Owns:

generation context formatting
citation ID format
generation prompt
LLM provider
parsing/resolving [C1]
generation metadata
rag

Owns:

query
retrieval
candidate selection
reranking
passing retrieved chunks to generation
final RAG response
