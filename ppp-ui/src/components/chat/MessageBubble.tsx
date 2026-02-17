import type { ChatMessage } from "./MessageList";

function ThinkingDots() {
  return (
    <span className="thinking-dots" aria-label="Assistant is thinking">
      <span className="thinking-dot" />
      <span className="thinking-dot" />
      <span className="thinking-dot" />
    </span>
  );
}

export default function MessageBubble({ msg }: { msg: ChatMessage }) {
  const cls =
    msg.kind === "system"
      ? "bubble bubble-system"
      : msg.kind === "error"
        ? "bubble bubble-error"
        : msg.role === "user"
          ? "bubble bubble-user"
          : "bubble bubble-assistant";

  return (
    <div className={cls}>
      <div className="bubble-text">
        {/* thinking state */}
        {msg.kind === "thinking" ? (
          <div className="bubble-thinking">
            <span className="thinking-label">Thinking</span>
            <ThinkingDots />
          </div>
        ) : (
          msg.content
        )}
      </div>
    </div>
  );
}
