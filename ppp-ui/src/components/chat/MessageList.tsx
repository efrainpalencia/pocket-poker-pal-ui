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

  // Track scroll position + near-bottom state
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const onScroll = () => {
      const distance = el.scrollHeight - el.scrollTop - el.clientHeight;
      const near = distance < NEAR_BOTTOM_PX;
      setIsNearBottom(near);

      // If user returns near bottom, clear unread
      if (near) setUnread(0);
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  // On new messages:
  // - if near bottom → auto scroll
  // - if not near bottom → increment unread
  useEffect(() => {
    if (isNearBottom) {
      endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    } else {
      setUnread((n) => n + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages.length]);

  function jumpToLatest() {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
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
        <div ref={endRef} />
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
