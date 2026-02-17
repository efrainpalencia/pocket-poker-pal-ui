import type { AskIn, ResumeIn, QAOut } from "@/types";

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? "";

function joinUrl(base: string, path: string) {
  const b = base.replace(/\/$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${b}${p}`;
}

async function postJson<T>(url: string, payload: unknown): Promise<T> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  // Helpful error details (FastAPI returns {detail: "..."} often)
  if (!res.ok) {
    let detail = "Request failed";
    try {
      const data = await res.json();
      detail = typeof data?.detail === "string" ? data.detail : JSON.stringify(data);
    } catch {
      // ignore
    }
    throw new Error(detail);
  }

  return res.json();
}

export const chatService = {
  ask(payload: AskIn): Promise<QAOut> {
    return postJson<QAOut>(joinUrl(API_BASE_URL, "/qa"), payload);
  },

  resume(payload: ResumeIn): Promise<QAOut> {
    return postJson<QAOut>(joinUrl(API_BASE_URL, "/qa/resume"), payload);
  },
};
