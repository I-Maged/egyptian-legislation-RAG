import { redirect } from "next/navigation";
import { createLawDocument, createLawChunk } from "@egyptian-law/db";

async function createLaw(formData: FormData) {
  "use server";

  const id = crypto.randomUUID();

  const lawName = String(formData.get("lawName") ?? "").trim();

  const lawNumber = String(formData.get("lawNumber") ?? "").trim();

  const year = String(formData.get("year") ?? "").trim();

  const sourceFile = String(formData.get("sourceFile") ?? "").trim();

  const articlesRaw = String(formData.get("articles") ?? "");

  if (!lawName || !sourceFile) {
    throw new Error("Law name and source file are required.");
  }

  await createLawDocument({
    id,
    lawName,
    lawNumber: lawNumber || null,
    year: year || null,
    sourceFile,
    jurisdiction: "EG",
    language: "ar",
  });

  const articles = parseArticles(articlesRaw);

  for (let index = 0; index < articles.length; index++) {
    const article = articles[index];

    await createLawChunk(id, {
      id: crypto.randomUUID(),
      articleNumber: article.articleNumber,
      articleTitle: null,
      text: article.text,
      textForEmbedding: article.text,
      sourceOrder: index,
    });
  }

  redirect(`/admin/laws/${id}`);
}

function parseArticles(raw: string): Array<{
  articleNumber: string;
  text: string;
}> {
  if (!raw.trim()) {
    return [];
  }

  return raw
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block, index) => {
      const match = block.match(
        /^(?:المادة|مادة)\s+([0-9٠-٩]+)\s*[:\-]?\s*([\s\S]*)$/i,
      );

      if (match) {
        return {
          articleNumber: match[1],
          text: match[2].trim(),
        };
      }

      return {
        articleNumber: String(index + 1),
        text: block,
      };
    });
}

export default function NewLawPage() {
  return (
    <main style={{ padding: 32 }}>
      <h1>Add Law</h1>

      <form
        action={createLaw}
        style={{
          display: "grid",
          gap: 16,
          maxWidth: 800,
          marginTop: 24,
        }}
      >
        <label>
          Law name
          <input name="lawName" required style={inputStyle} />
        </label>

        <label>
          Law number
          <input name="lawNumber" style={inputStyle} />
        </label>

        <label>
          Year
          <input name="year" style={inputStyle} />
        </label>

        <label>
          Source file
          <input
            name="sourceFile"
            required
            placeholder="labour-law-148-2019.pdf"
            style={inputStyle}
          />
        </label>

        <label>
          Articles
          <textarea
            name="articles"
            required
            rows={20}
            placeholder={`المادة 1: نص المادة...

المادة 2: نص المادة...

المادة 3: نص المادة...`}
            style={textareaStyle}
          />
        </label>

        <button type="submit">Create law</button>
      </form>
    </main>
  );
}

const inputStyle = {
  display: "block",
  width: "100%",
  padding: 8,
  marginTop: 4,
};

const textareaStyle = {
  display: "block",
  width: "100%",
  padding: 8,
  marginTop: 4,
  direction: "rtl" as const,
};
