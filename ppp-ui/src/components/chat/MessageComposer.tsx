import React, { useState } from "react";

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
  const [text, setText] = useState("");

  function submit() {
    const trimmed = text.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setText("");
  }

  return (
    <div className="chat-composer">
      <input
        className="chat-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        onKeyDown={(e) => {
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
