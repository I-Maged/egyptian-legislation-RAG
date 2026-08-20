"use client";

import { FormEvent, useRef, useState } from "react";
import { sendChatMessage } from "@/lib/api";

type Citation = {
  id: string;
  chunkId: string;
  lawName: string;
  lawNumber: string | null;
  year: string | null;
  articleNumber: string;
  articleTitle: string | null;
  sourceFile: string;
  pageStart: number | null;
  pageEnd: number | null;
};

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  citations?: Citation[];
};

function formatCitation(citation: Citation) {
  const law =
    citation.lawNumber && citation.year
      ? `${citation.lawName} رقم ${citation.lawNumber} لسنة ${citation.year}`
      : citation.lawName;
  const article = `المادة ${citation.articleNumber}`;
  const pages =
    citation.pageStart === null
      ? ""
      : citation.pageEnd === null || citation.pageEnd === citation.pageStart
        ? ` · صفحة ${citation.pageStart}`
        : ` · الصفحات ${citation.pageStart}-${citation.pageEnd}`;

  return `${law} · ${article}${pages}`;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  async function submit(event?: FormEvent) {
    event?.preventDefault();
    const query = input.trim();
    if (!query || loading) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: query,
    };

    setMessages((current) => [...current, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const payload = await sendChatMessage(query);

      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: payload.answer,
          citations: payload.citations,
        },
      ]);

      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: payload.answer,
          citations: payload.citations,
        },
      ]);
    } catch (error) {
      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content:
            error instanceof Error ? error.message : "حدث خطأ غير متوقع.",
        },
      ]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void submit();
    }
  }

  return (
    <main className="shell">
      <header className="topbar">
        <div className="brand">
          <div className="brand-mark">ق</div>
          <div>
            <div className="brand-title">المساعد القانوني المصري</div>
            <div className="brand-subtitle">تشريعات مصرية · RAG تجريبي</div>
          </div>
        </div>
        <button
          className="new-chat"
          onClick={() => setMessages([])}
          disabled={loading}
        >
          محادثة جديدة
        </button>
      </header>

      <section className="chat-area">
        {messages.length === 0 ? (
          <div className="welcome">
            <div className="welcome-icon">§</div>
            <h1>كيف يمكنني مساعدتك؟</h1>
            <p>
              اسأل عن مادة أو حكم أو قاعدة واردة في التشريعات المصرية الموجودة
              في قاعدة المعرفة.
            </p>
            <div className="suggestions">
              <button
                onClick={() =>
                  setInput("ما هي شروط إنهاء عقد العمل وفقًا لقانون العمل؟")
                }
              >
                شروط إنهاء عقد العمل
              </button>
              <button
                onClick={() =>
                  setInput("ما الذي ينظمه قانون العمل بشأن الإجازات؟")
                }
              >
                الإجازات في قانون العمل
              </button>
              <button
                onClick={() =>
                  setInput("ما هي مدة الإخطار المطلوبة قبل إنهاء عقد العمل؟")
                }
              >
                مدة الإخطار
              </button>
            </div>
          </div>
        ) : (
          <div className="messages">
            {messages.map((message) => (
              <article key={message.id} className={`message ${message.role}`}>
                <div className="avatar">
                  {message.role === "user" ? "أنت" : "ق"}
                </div>
                <div className="message-body">
                  <div className="message-role">
                    {message.role === "user" ? "أنت" : "المساعد القانوني"}
                  </div>
                  <div className="message-content">{message.content}</div>
                  {message.citations && message.citations.length > 0 && (
                    <div className="sources">
                      <div className="sources-title">المصادر</div>
                      {message.citations.map((citation) => (
                        <div className="source" key={citation.id}>
                          <span className="source-id">{citation.id}</span>
                          <span>{formatCitation(citation)}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            ))}
            {loading && (
              <article className="message assistant">
                <div className="avatar">ق</div>
                <div className="message-body">
                  <div className="message-role">المساعد القانوني</div>
                  <div className="typing">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              </article>
            )}
          </div>
        )}
      </section>

      <form className="composer-wrap" onSubmit={submit}>
        <div className="composer">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="اكتب سؤالك القانوني..."
            rows={1}
            disabled={loading}
            aria-label="السؤال القانوني"
          />
          <button
            type="submit"
            className="send"
            disabled={loading || !input.trim()}
            aria-label="إرسال"
          >
            ↑
          </button>
        </div>
        <div className="disclaimer">
          الإجابة تجريبية وليست استشارة قانونية ملزمة.
        </div>
      </form>
    </main>
  );
}
