import { render, screen, fireEvent } from "@testing-library/react";

import userEvent from "@testing-library/user-event";

import { beforeEach, describe, expect, it, vi } from "vitest";

import { sendChatMessage } from "@/lib/api";

import Chat from "./chat";

vi.mock("@/lib/api", () => ({
  sendChatMessage: vi.fn(),
}));

const mockedSendChatMessage = vi.mocked(sendChatMessage);

const citation = {
  id: "[1]",

  chunkId: "chunk-1",

  lawName: "قانون العمل",

  lawNumber: "148",

  year: "2019",

  articleNumber: "35",

  articleTitle: "إنهاء عقد العمل",

  text: "النص الكامل للمادة 35.",

  sourceFile: "labour-law-148-2019.pdf",

  pageStart: 10,

  pageEnd: 11,
};

function mockResponse(overrides: Partial<{
  answer: string;
  citations: typeof citation[];
}> = {}) {
  mockedSendChatMessage.mockResolvedValue({
    answer: overrides.answer ?? "وفقًا للمادة [1]، يحدد القانون ذلك.",
    citations: overrides.citations ?? [citation],
    generation: { model: "test-model", durationMs: 10 },
  });
}

async function askQuestion(question: string) {
  const user = userEvent.setup();

  await user.type(
    screen.getByLabelText("السؤال القانوني"),
    `${question}{Enter}`,
  );

  return user;
}

describe("Chat citation modal", () => {
  beforeEach(() => {
    mockedSendChatMessage.mockReset();
  });

  it("does not render the modal initially", () => {
    render(<Chat />);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders an inline citation marker as a clickable badge", async () => {
    mockResponse();

    render(<Chat />);

    await askQuestion("ما هي شروط إنهاء عقد العمل؟");

    const badge = await screen.findByRole("button", { name: "[1]" });

    expect(badge).toHaveClass("citation-badge");

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("opens a modal with metadata and full source text when the badge is clicked", async () => {
    mockResponse();

    const user = await (async () => {
      render(<Chat />);

      return askQuestion("ما هي شروط إنهاء عقد العمل؟");
    })();

    const badge = await screen.findByRole("button", { name: "[1]" });

    await user.click(badge);

    const dialog = screen.getByRole("dialog", {
      name: "المصدر [1]",
    });

    expect(dialog).toHaveTextContent(
      "قانون العمل رقم 148 لسنة 2019 · المادة 35 · الصفحات 10-11",
    );

    expect(screen.getByText("إنهاء عقد العمل")).toBeInTheDocument();

    expect(screen.getByText("labour-law-148-2019.pdf")).toBeInTheDocument();

    expect(screen.getByText("النص الكامل للمادة 35.")).toBeInTheDocument();
  });

  it("leaves unmatched citation markers as plain text", async () => {
    mockResponse({
      answer: "وفقًا للمادة [7]، لا يوجد نص مطابق.",
      citations: [],
    });

    render(<Chat />);

    await askQuestion("سؤال بلا مصادر");

    await screen.findByText(/لا يوجد نص مطابق/);

    expect(screen.queryByRole("button", { name: "[7]" })).not
      .toBeInTheDocument();

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("closes the modal via the close button", async () => {
    mockResponse();

    const user = await (async () => {
      render(<Chat />);

      return askQuestion("سؤال");
    })();

    await user.click(await screen.findByRole("button", { name: "[1]" }));

    await user.click(screen.getByRole("button", { name: "إغلاق" }));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("closes the modal via the Escape key", async () => {
    mockResponse();

    const user = await (async () => {
      render(<Chat />);

      return askQuestion("سؤال");
    })();

    await user.click(await screen.findByRole("button", { name: "[1]" }));

    expect(screen.getByRole("dialog")).toBeInTheDocument();

    await user.keyboard("{Escape}");

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("closes the modal via a backdrop click", async () => {
    mockResponse();

    const user = await (async () => {
      render(<Chat />);

      return askQuestion("سؤال");
    })();

    await user.click(await screen.findByRole("button", { name: "[1]" }));

    const overlay = document.querySelector(".citation-overlay");

    expect(overlay).not.toBeNull();

    fireEvent.click(overlay as Element);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
