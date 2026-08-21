import { notFound, redirect } from "next/navigation";
import {
  getLawDocument,
  updateLawDocument,
  updateLawChunk,
} from "@egyptian-law/db";

export const dynamic = "force-dynamic";

export default async function LawPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const law = await getLawDocument(id);

  if (!law) {
    notFound();
  }

  async function updateLaw(formData: FormData) {
    "use server";

    const lawName = String(formData.get("lawName") ?? "").trim();

    const lawNumber = String(formData.get("lawNumber") ?? "").trim();

    const year = String(formData.get("year") ?? "").trim();

    const sourceFile = String(formData.get("sourceFile") ?? "").trim();

    await updateLawDocument(id, {
      lawName,
      lawNumber: lawNumber || null,
      year: year || null,
      sourceFile,
      jurisdiction: "EG",
      language: "ar",
    });

    redirect(`/admin/laws/${id}`);
  }

  return (
    <main style={{ padding: 32 }}>
      <h1>{law.lawName}</h1>

      <form
        action={updateLaw}
        style={{
          display: "grid",
          gap: 12,
          maxWidth: 800,
        }}
      >
        <label>
          Law name
          <input name="lawName" defaultValue={law.lawName} required />
        </label>

        <label>
          Law number
          <input name="lawNumber" defaultValue={law.lawNumber ?? ""} />
        </label>

        <label>
          Year
          <input name="year" defaultValue={law.year ?? ""} />
        </label>

        <label>
          Source
          <input name="sourceFile" defaultValue={law.sourceFile} required />
        </label>

        <button type="submit">Save law</button>
      </form>

      <hr style={{ margin: "32px 0" }} />

      <h2>Articles ({law.chunks.length})</h2>

      <div
        style={{
          display: "grid",
          gap: 20,
          marginTop: 20,
        }}
      >
        {law.chunks.map((chunk) => (
          <ArticleEditor key={chunk.id} chunk={chunk} />
        ))}
      </div>
    </main>
  );
}

async function ArticleEditor({
  chunk,
}: {
  chunk: NonNullable<
    Awaited<ReturnType<typeof getLawDocument>>
  >["chunks"][number];
}) {
  async function saveChunk(formData: FormData) {
    "use server";

    const articleNumber = String(formData.get("articleNumber") ?? "").trim();

    const articleTitle = String(formData.get("articleTitle") ?? "").trim();

    const text = String(formData.get("text") ?? "").trim();

    await updateLawChunk(chunk.id, {
      articleNumber,
      articleTitle: articleTitle || null,
      text,
      textForEmbedding: text,
    });

    redirect(`/admin/laws/${chunk.documentId}`);
  }

  return (
    <form
      action={saveChunk}
      style={{
        border: "1px solid #ddd",
        padding: 16,
        borderRadius: 8,
      }}
    >
      <label>
        Article
        <input name="articleNumber" defaultValue={chunk.articleNumber} />
      </label>

      <label>
        Title
        <input name="articleTitle" defaultValue={chunk.articleTitle ?? ""} />
      </label>

      <label>
        Text
        <textarea
          name="text"
          defaultValue={chunk.text}
          rows={10}
          style={{
            width: "100%",
            direction: "rtl",
            marginTop: 8,
          }}
        />
      </label>

      <button type="submit">Save article</button>

      <div style={{ marginTop: 8 }}>
        {chunk.embedding ? (
          <small>Embedded: {chunk.embedding.model}</small>
        ) : (
          <small>⚠️ No embedding</small>
        )}
      </div>
    </form>
  );
}
