import { useEffect, useMemo, useRef, useState } from "react";
import { chatService } from "@/services/chatService";
import type { QAOut, InterruptPrompt } from "@/types/chat";
import MessageList, { type ChatMessage } from "./MessageList";
import MessageComposer from "./MessageComposer";
import ClarificationPrompt from "./ClarificationPrompt";

const THINKING_ID = "thinking";

function initialMessages(): ChatMessage[] {
  return [
    {
      id: crypto.randomUUID(),
      role: "assistant",
      kind: "system",
      content:
        "Ask a poker rules question. If I need more context, I'll ask a quick follow-up.",
      ts: Date.now(),
    },
  ];
}

export default function ChatShell() {
  const [threadId, setThreadId] = useState<string | null>(null);
  const [threadToken, setThreadToken] = useState<string | null>(null);
  const [pendingPrompt, setPendingPrompt] = useState<InterruptPrompt | null>(
    null,
  );
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() =>
    initialMessages(),
  );

  const canSend = useMemo(() => !loading, [loading]);

  const cardRef = useRef<HTMLDivElement | null>(null);
  const composerWrapRef = useRef<HTMLDivElement | null>(null);

  function push(
    role: ChatMessage["role"],
    content: string,
    kind: ChatMessage["kind"] = "text",
  ) {
    setMessages((m) => [
      ...m,
      { id: crypto.randomUUID(), role, content, kind, ts: Date.now() },
    ]);
  }

  function addThinking() {
    setMessages((m) => {
      if (m.some((x) => x.id === THINKING_ID)) return m;
      return [
        ...m,
        {
          id: THINKING_ID,
          role: "assistant",
          kind: "thinking",
          content: "",
          ts: Date.now(),
        },
      ];
    });
  }

  function removeThinking() {
    setMessages((m) => m.filter((x) => x.id !== THINKING_ID));
  }

  function applyQAOut(out: QAOut) {
    setThreadId(out.thread_id);
    setThreadToken(out.thread_token);

    if (out.status === "needs_clarification") {
      const prompt =
        out.prompt ??
        ({ type: "free_text", message: "Can you clarify?" } as InterruptPrompt);

      setPendingPrompt(prompt);

      if ((prompt as any).message)
        push("assistant", String((prompt as any).message));

      return;
    }

    setPendingPrompt(null);

    if (out.generation) push("assistant", out.generation);
    else push("assistant", "Done.", "system");
  }

  async function handleSendUserText(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;

    if (pendingPrompt && threadId && threadToken) {
      push("user", trimmed);

      try {
        setLoading(true);
        addThinking();

        const out = await chatService.resume({
          thread_id: threadId,
          thread_token: threadToken,
          reply: trimmed,
        });

        removeThinking();
        applyQAOut(out);
      } catch (e: any) {
        removeThinking();
        push("assistant", e?.message ?? "Something went wrong.", "error");
      } finally {
        setLoading(false);
      }

      return;
    }

    push("user", trimmed);

    try {
      setLoading(true);
      addThinking();

      const out = await chatService.ask({
        question: trimmed,
        thread_id: threadId,
      });

      removeThinking();
      applyQAOut(out);
    } catch (e: any) {
      removeThinking();
      push("assistant", e?.message ?? "Something went wrong.", "error");
    } finally {
      setLoading(false);
    }
  }

  function handleClearChat() {
    setLoading(false);
    setPendingPrompt(null);
    setThreadId(null);
    setThreadToken(null);
    setMessages(initialMessages());
  }

  // ✅ keyboard-safe viewport height
  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;

    const setVVH = () => {
      document.documentElement.style.setProperty("--vvh", `${vv.height}px`);
    };

    setVVH();
    vv.addEventListener("resize", setVVH);
    vv.addEventListener("scroll", setVVH);
    return () => {
      vv.removeEventListener("resize", setVVH);
      vv.removeEventListener("scroll", setVVH);
    };
  }, []);

  // ✅ measure composer height and store as CSS var
  useEffect(() => {
    const card = cardRef.current;
    const composer = composerWrapRef.current;
    if (!card || !composer) return;

    const apply = () => {
      const h = Math.ceil(composer.getBoundingClientRect().height);
      card.style.setProperty("--composer-height", `${h}px`);
    };

    apply();

    const ro = new ResizeObserver(apply);
    ro.observe(composer);

    return () => ro.disconnect();
  }, []);

  return (
    <div className="chat-page">
      <div ref={cardRef} className="chat-card">
        <div className="chat-header">
          <div className="chat-title">Pocket Poker Pal</div>
          <div className="chat-sub">
            Rulebook-grounded rulings & clarifications
          </div>

          <button
            type="button"
            className="chat-clear"
            onClick={handleClearChat}
            disabled={loading}
          >
            Clear chat
          </button>
        </div>

        {/* ✅ MessageList owns the scroll container */}
        <MessageList messages={messages} />

        {pendingPrompt && (
          <ClarificationPrompt
            prompt={pendingPrompt}
            onPick={(reply) => handleSendUserText(reply)}
          />
        )}

        {/* ✅ Wrap composer so we can measure it */}
        <div ref={composerWrapRef}>
          <MessageComposer
            disabled={!canSend}
            placeholder="Ask a poker rules question…"
            onSend={handleSendUserText}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}
