import { describe, expect, it } from "vitest";

import { searchHybrid } from "./hybrid.repository";

describe("hybrid repository", () => {
  it("combines vector and lexical retrieval", async () => {
    // Temporary deterministic test vector.
    //
    // Replace this with a real query embedding generated
    // by the embedding provider when the query-embedding
    // integration is added.
    const queryEmbedding = Array.from({ length: 1024 }, (_, index) =>
      index === 0 ? 1 : 0,
    );

    const results = await searchHybrid({
      query: "فترة الاختبار",
      queryEmbedding,
      topK: 5,
      vectorTopK: 10,
      // bm25TopK: 10,
    });

    expect(results.length).toBeGreaterThan(0);
    expect(results.length).toBeLessThanOrEqual(5);

    for (const result of results) {
      expect(result.chunkId).toBeTruthy();
      expect(result.score).toBeGreaterThan(0);
    }
  });

  it("returns deterministic ordering", async () => {
    const queryEmbedding = Array.from({ length: 1024 }, (_, index) =>
      index === 0 ? 1 : 0,
    );

    const first = await searchHybrid({
      query: "عقد العمل",
      queryEmbedding,
      topK: 5,
    });

    const second = await searchHybrid({
      query: "عقد العمل",
      queryEmbedding,
      topK: 5,
    });

    expect(first.map((r) => r.chunkId)).toEqual(second.map((r) => r.chunkId));
  });

  it("rejects invalid topK", async () => {
    await expect(
      searchHybrid({
        query: "عقد العمل",
        queryEmbedding: [1],
        topK: 0,
      }),
    ).rejects.toThrow(/topK/i);
  });

  // it("rejects zero retrieval weights", async () => {
  //   await expect(
  //     searchHybrid({
  //       query: "عقد العمل",
  //       queryEmbedding: Array(1024).fill(0),
  //       vectorWeight: 0,
  //       bm25Weight: 0,
  //     }),
  //   ).rejects.toThrow(/weight/i);
  // });
});
