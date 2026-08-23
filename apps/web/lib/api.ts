export interface ChatCitation {
  id: string;

  chunkId: string;

  lawName: string;
  lawNumber: string | null;
  year: string | null;

  articleNumber: string;
  articleTitle: string | null;

  text: string;

  sourceFile: string;

  pageStart: number | null;
  pageEnd: number | null;
}

export interface ChatResponse {
  answer: string;

  citations: ChatCitation[];

  generation: {
    model: string;
    durationMs: number;
  };
}

export async function sendChatMessage(query: string): Promise<ChatResponse> {
  const response = await fetch("/api/chat", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      query,
    }),
  });

  const data = (await response.json()) as ChatResponse | { error?: string };

  if (!response.ok) {
    throw new Error(
      "error" in data && data.error ? data.error : "Failed to get an answer.",
    );
  }

  return data as ChatResponse;
}
