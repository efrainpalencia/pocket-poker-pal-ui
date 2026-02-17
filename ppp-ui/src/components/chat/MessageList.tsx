import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  kind: "text" | "system" | "error" | "thinking";
  content: string;
  ts: number;
};

export default function MessageList({ messages }: { messages: ChatMessage[] }) {
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  return (
    <div
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
  );
}
