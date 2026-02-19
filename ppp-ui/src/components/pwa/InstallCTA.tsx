import Button from "@/components/ui/Button";
import { useInstallPrompt } from "@/hooks/useInstallPrompt";
import { useIosA2hsHint } from "@/hooks/useIosA2hsHint";
import { useState } from "react";

export default function InstallCTA() {
  const { canInstall, promptInstall } = useInstallPrompt();
  const showIosHint = useIosA2hsHint();
  const [showHint, setShowHint] = useState(false);

  if (canInstall) {
    return <Button onClick={() => void promptInstall()}>Install</Button>;
  }

  if (showIosHint) {
    return (
      <div style={{ position: "relative" }}>
        <Button onClick={() => setShowHint((s) => !s)}>Install</Button>

        {showHint && (
          <div
            className="pwa-popover"
            role="dialog"
            aria-label="Install Pocket Poker Pal"
          >
            <div className="pwa-popover-title">Install on iPhone</div>
            <div className="pwa-popover-body">
              Tap <b>Share</b> then <b>Add to Home Screen</b>.
            </div>
            <div className="pwa-popover-actions">
              <button
                type="button"
                className="pwa-popover-btn"
                onClick={() => setShowHint(false)}
              >
                Got it
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return null;
}
