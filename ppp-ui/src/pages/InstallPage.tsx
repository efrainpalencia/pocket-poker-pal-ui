import { useInstallPrompt } from "@/hooks/useInstallPrompt";
import { useIosA2hsHint } from "@/hooks/useIosA2hsHint";
import { useMemo, useState } from "react";
import Button from "@/components/ui/Button";

function isStandalone() {
  return (
    window.matchMedia?.("(display-mode: standalone)")?.matches ||
    (navigator as any).standalone === true
  );
}

export default function InstallPage() {
  const { canInstall, promptInstall, installed } = useInstallPrompt();
  const showIosHint = useIosA2hsHint();
  const [showHelp, setShowHelp] = useState(false);

  const standalone = useMemo(() => {
    if (typeof window === "undefined") return false;
    return isStandalone();
  }, []);

  const status =
    standalone || installed
      ? "installed"
      : canInstall
        ? "prompt"
        : showIosHint
          ? "ios"
          : "unavailable";

  return (
    <div
      className="card card-glass card-p-lg"
      style={{ maxWidth: 720, margin: "0 auto" }}
    >
      <div className="card-header">
        <div className="card-title">Install Pocket Poker Pal</div>
        <div className="card-sub">
          Get a native-like app experience (standalone, full screen).
        </div>
      </div>

      {status === "installed" && (
        <div className="card-body">
          ✅ Looks like Pocket Poker Pal is already installed on this device.
        </div>
      )}

      {status === "prompt" && (
        <div className="card-body">
          <p style={{ marginTop: 0, color: "var(--muted)" }}>
            Tap install to add Pocket Poker Pal to your home screen.
          </p>
          <Button onClick={() => void promptInstall()}>Install</Button>
        </div>
      )}

      {status === "ios" && (
        <div className="card-body">
          <p style={{ marginTop: 0, color: "var(--muted)" }}>
            iOS doesn’t show an install prompt. Use Add to Home Screen:
          </p>
          <ol style={{ color: "var(--muted)", lineHeight: 1.5 }}>
            <li>
              Open this site in <b>Safari</b>
            </li>
            <li>
              Tap the <b>Share</b> button
            </li>
            <li>
              Select <b>Add to Home Screen</b>
            </li>
          </ol>
        </div>
      )}

      {status === "unavailable" && (
        <div className="card-body">
          <p style={{ marginTop: 0, color: "var(--muted)" }}>
            Install isn’t available yet on this browser/device.
          </p>

          <Button onClick={() => setShowHelp((s) => !s)}>
            {showHelp ? "Hide tips" : "Show tips"}
          </Button>

          {showHelp && (
            <div
              style={{ marginTop: 12, color: "var(--muted)", lineHeight: 1.5 }}
            >
              <ul style={{ margin: 0, paddingLeft: 18 }}>
                <li>Make sure you’re on HTTPS (Vercel is ✅).</li>
                <li>
                  Make sure your manifest loads and icons resolve (no 404s).
                </li>
                <li>
                  Make sure your service worker is registered (if using
                  vite-plugin-pwa).
                </li>
                <li>Try Chrome on Android for the cleanest install flow.</li>
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
