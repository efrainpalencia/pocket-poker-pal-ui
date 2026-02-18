import { useEffect, useRef, useState } from "react";

const DRAFT_KEY = "ppp_chat_draft_v1";

export default function MessageComposer({
  disabled,
  placeholder,
  onSend,
  loading,
}: {
  disabled?: boolean;
  placeholder?: string;
  onSend: (text: string) => void;
  loading?: boolean;
}) {
  const [text, setText] = useState(() => {
    try {
      return localStorage.getItem(DRAFT_KEY) ?? "";
    } catch {
      return "";
    }
  });

  const taRef = useRef<HTMLTextAreaElement | null>(null);

  // Persist draft as user types
  useEffect(() => {
    try {
      if (text.trim().length === 0) {
        localStorage.removeItem(DRAFT_KEY);
      } else {
        localStorage.setItem(DRAFT_KEY, text);
      }
    } catch {
      // ignore
    }
  }, [text]);

  // Autosize textarea
  useEffect(() => {
    const el = taRef.current;
    if (!el) return;
    el.style.height = "0px";
    el.style.height = Math.min(el.scrollHeight, 140) + "px";
  }, [text]);

  function submit() {
    const trimmed = text.trim();
    if (!trimmed) return;

    onSend(trimmed);

    // Clear input + persisted draft
    setText("");
    try {
      localStorage.removeItem(DRAFT_KEY);
    } catch {
      // ignore
    }
  }

  return (
    <div className="chat-composer">
      <textarea
        ref={taRef}
        className="chat-input chat-textarea"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        rows={1}
        onKeyDown={(e) => {
          // Enter sends, Shift+Enter newline
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            submit();
          }
        }}
        aria-label="Message"
      />

      <button
        type="button"
        className="chat-send"
        onClick={submit}
        disabled={disabled || !text.trim()}
      >
        {loading ? "…" : "Send"}
      </button>
    </div>
  );
}
