let deferred: BeforeInstallPromptEvent | null = null;

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

export function initInstallPromptListener() {
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferred = e as BeforeInstallPromptEvent;
    window.dispatchEvent(new Event("ppp:install-available"));
  });

  window.addEventListener("appinstalled", () => {
    deferred = null;
    window.dispatchEvent(new Event("ppp:install-installed"));
  });
}

export function getDeferredPrompt() {
  return deferred;
}

export async function promptInstall() {
  if (!deferred) return { ok: false as const };
  await deferred.prompt();
  const choice = await deferred.userChoice;
  if (choice.outcome === "accepted") deferred = null;
  return { ok: true as const, choice };
}
