import { useMemo } from "react";

function isIos() {
  return /iphone|ipad|ipod/i.test(window.navigator.userAgent);
}

function isSafari() {
  const ua = window.navigator.userAgent.toLowerCase();
  return ua.includes("safari") && !ua.includes("crios") && !ua.includes("fxios");
}

function isStandalone() {
  return (
    window.matchMedia?.("(display-mode: standalone)")?.matches ||
    (navigator as any).standalone === true
  );
}

export function useIosA2hsHint() {
  return useMemo(() => {
    if (typeof window === "undefined") return false;
    return isIos() && isSafari() && !isStandalone();
  }, []);
}
