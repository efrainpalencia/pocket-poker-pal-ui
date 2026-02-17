import type { InterruptPrompt, ChooseRulesetPrompt } from "@/types/chat";

function isChooseRulesetPrompt(p: InterruptPrompt): p is ChooseRulesetPrompt {
  return p.type === "choose_ruleset" && Array.isArray((p as any).options);
}

function prettyLabel(value: string) {
  if (value === "cash-game") return "Cash game";
  if (value === "tournament") return "Tournament";
  return value;
}

export default function ClarificationPrompt({
  prompt,
  onPick,
}: {
  prompt: InterruptPrompt;
  onPick: (reply: string) => void;
}) {
  if (isChooseRulesetPrompt(prompt)) {
    return (
      <div className="clarify-card" role="group" aria-label="Choose ruleset">
        <div className="clarify-title">Which ruleset applies?</div>
        <div className="clarify-actions">
          {prompt.options.map((opt) => (
            <button
              key={opt}
              type="button"
              className="clarify-btn"
              onClick={() => onPick(opt)}
            >
              {prettyLabel(opt)}
            </button>
          ))}
        </div>
        <div className="clarify-hint">Tap one to continue.</div>
      </div>
    );
  }

  return (
    <div className="clarify-card" aria-live="polite">
      <div className="clarify-title">Clarification needed</div>
      <div className="clarify-text">
        {"message" in prompt && typeof prompt.message === "string"
          ? prompt.message
          : "Please provide a clarification."}
      </div>
    </div>
  );
}
