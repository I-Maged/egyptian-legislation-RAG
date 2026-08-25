"use client";

import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { sendChatMessage } from "@/lib/api";
import { formatCitation, formatLawName } from "@/lib/utils/format-citation";

import { useNavbarAction } from "./navbar";

function MessageContent({
  content,
  citations,
  onCitationClick,
}: {
  content: string;
  citations?: Citation[];
  onCitationClick: (citation: Citation) => void;
}) {
  const citationMap = new Map(
    (citations ?? []).map((citation) => [citation.id, citation]),
  );

  return (
    <div className="message-content">
      {content.split(/(\[\d+\])/g).map((part, index) => {
        const citation = /^\[\d+\]$/.test(part)
          ? citationMap.get(part)
          : undefined;

        if (!citation) return part;

        return (
          <button
            type="button"
            key={index}
            className="citation-badge"
            title={formatCitation(citation)}
            onClick={() => onCitationClick(citation)}
          >
            {part}
          </button>
        );
      })}
    </div>
  );
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeCitation, setActiveCitation] = useState<Citation | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleNewChat = useCallback(() => {
    setMessages([]);
    setConversationId(null);
  }, []);

  useNavbarAction({ onClick: handleNewChat, disabled: loading });

  useEffect(() => {
    if (!activeCitation) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActiveCitation(null);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeCitation]);

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
      const payload = await sendChatMessage(
        query,
        conversationId ?? undefined,
      );

      if (payload.conversationId) {
        setConversationId(payload.conversationId);
      }

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
                  <MessageContent
                    content={message.content}
                    citations={message.citations}
                    onCitationClick={setActiveCitation}
                  />
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

      {activeCitation && (
        <div
          className="citation-overlay"
          onClick={() => setActiveCitation(null)}
        >
          <div
            className="citation-modal"
            role="dialog"
            aria-modal="true"
            aria-label={`المصدر ${activeCitation.id}`}
            onClick={(event) => event.stopPropagation()}
          >
            <header className="citation-modal-header">
              <div className="citation-modal-title">
                <span className="source-id">{activeCitation.id}</span>
                <span>{formatCitation(activeCitation)}</span>
              </div>
              <button
                type="button"
                className="citation-modal-close"
                onClick={() => setActiveCitation(null)}
                aria-label="إغلاق"
              >
                ×
              </button>
            </header>
            <dl className="citation-meta">
              <div>
                <dt>القانون</dt>
                <dd>{formatLawName(activeCitation)}</dd>
              </div>
              {activeCitation.articleTitle && (
                <div>
                  <dt>عنوان المادة</dt>
                  <dd>{activeCitation.articleTitle}</dd>
                </div>
              )}
              {(activeCitation.pageStart !== null ||
                activeCitation.pageEnd !== null) && (
                <div>
                  <dt>الصفحات</dt>
                  <dd>
                    {activeCitation.pageEnd === null ||
                    activeCitation.pageEnd === activeCitation.pageStart
                      ? `${activeCitation.pageStart}`
                      : `${activeCitation.pageStart}-${activeCitation.pageEnd}`}
                  </dd>
                </div>
              )}
              <div>
                <dt>الملف المصدر</dt>
                <dd>{activeCitation.sourceFile}</dd>
              </div>
            </dl>
            <div className="citation-text-title">النص القانوني</div>
            <blockquote className="citation-text">
              {activeCitation.text}
            </blockquote>
          </div>
        </div>
      )}
    </main>
  );
}
