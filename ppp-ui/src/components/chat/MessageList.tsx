import { useEffect, useRef, useState } from "react";
import MessageBubble from "./MessageBubble";

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  kind: "text" | "system" | "error" | "thinking";
  content: string;
  ts: number;
};

const NEAR_BOTTOM_PX = 140;

export default function MessageList({ messages }: { messages: ChatMessage[] }) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const endRef = useRef<HTMLDivElement | null>(null);

  const [isNearBottom, setIsNearBottom] = useState(true);
  const [unread, setUnread] = useState(0);

  // Track scroll position + near-bottom state (also on resize for mobile keyboard)
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const compute = () => {
      const distance = el.scrollHeight - el.scrollTop - el.clientHeight;
      const near = distance < NEAR_BOTTOM_PX;
      setIsNearBottom(near);
      if (near) setUnread(0);
    };

    const onScroll = () => compute();

    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", compute);
    compute();

    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", compute);
    };
  }, []);

  // Auto-scroll only when appropriate; do it instantly to avoid "overlap/jank"
  const prevLenRef = useRef(messages.length);
  useEffect(() => {
    const prevLen = prevLenRef.current;
    prevLenRef.current = messages.length;

    if (messages.length <= prevLen) return; // only on new message

    if (isNearBottom) {
      endRef.current?.scrollIntoView({ behavior: "auto", block: "end" });
    } else {
      setUnread((n) => n + 1);
    }
  }, [messages.length, isNearBottom]);

  function jumpToLatest() {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" }); // user-initiated
    setUnread(0);
  }

  return (
    <div className="chat-body-wrap">
      <div
        ref={scrollerRef}
        className="chat-body"
        role="log"
        aria-label="Chat messages"
        aria-live="polite"
      >
        {messages.map((m) => (
          <MessageBubble key={m.id} msg={m} />
        ))}
        <div ref={endRef} className="chat-end" />
      </div>

      {!isNearBottom && (
        <button
          type="button"
          className="jump-latest"
          onClick={jumpToLatest}
          aria-label="Jump to latest messages"
        >
          {unread > 0 ? `Jump to latest (${unread}) ↓` : "Jump to latest ↓"}
        </button>
      )}
    </div>
  );
}
