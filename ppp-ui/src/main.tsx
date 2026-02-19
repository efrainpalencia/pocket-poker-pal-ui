import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { registerSW } from "virtual:pwa-register";
import { initInstallPromptListener } from "./hooks/installPrompt.ts";
import "./index.css";
import App from "./App.tsx";

registerSW({ immediate: true });
initInstallPromptListener();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
