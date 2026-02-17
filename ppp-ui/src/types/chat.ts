export type AskIn = {
  question: string;
  thread_id?: string | null;
};

export type ResumeIn = {
  thread_id: string;
  thread_token: string;
  reply: string;
};

export type ChooseRulesetPrompt = {
  type: "choose_ruleset";
  message: string;
  options: string[];
};

export type FreeTextPrompt = {
  type: "free_text";
  message: string;
};

export type UnknownPrompt = {
  type: string;
  [key: string]: unknown;
};

export type InterruptPrompt =
  | ChooseRulesetPrompt
  | FreeTextPrompt
  | UnknownPrompt;

export type QAOut = {
  status: "needs_clarification" | "complete";
  thread_id: string;
  thread_token: string;
  prompt?: InterruptPrompt | null;
  generation?: string | null;

  // Your backend currently returns these too:
  confidence?: number | null;
  grounded?: boolean | null;
};
