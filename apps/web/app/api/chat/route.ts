import { NextResponse } from "next/server";
import type { RagResponse } from "@egyptian-law/rag";
import { getRagService } from "@/lib/rag";

export const runtime = "nodejs";

type ChatBody = { query?: unknown; lawDocumentId?: unknown };

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ChatBody;
    const query = typeof body.query === "string" ? body.query.trim() : "";

    if (!query) {
      return NextResponse.json({ error: "السؤال لا يمكن أن يكون فارغًا." }, { status: 400 });
    }

    const service = getRagService();
    const response: RagResponse = await service.answer({
      query,
      ...(typeof body.lawDocumentId === "string" && body.lawDocumentId.trim()
        ? { retrieval: { lawDocumentId: body.lawDocumentId.trim() } }
        : {}),
    });

    return NextResponse.json({
      answer: response.answer,
      citations: response.citations,
      generation: response.generation,
    });
  } catch (error) {
    console.error("/api/chat failed", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "حدث خطأ أثناء معالجة السؤال." },
      { status: 500 },
    );
  }
}
