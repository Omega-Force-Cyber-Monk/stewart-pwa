import { useEffect, useState } from "react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

let deferredInstallPrompt: BeforeInstallPromptEvent | null = null;
let installed = false;
const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((listener) => listener());
}

function isStandaloneDisplay() {
  if (typeof window === "undefined") return false;

  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    ("standalone" in window.navigator && Boolean(window.navigator.standalone))
  );
}

function isIosDevice() {
  if (typeof navigator === "undefined") return false;
  return /iphone|ipad|ipod/i.test(navigator.userAgent);
}

if (typeof window !== "undefined") {
  installed = isStandaloneDisplay();
  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredInstallPrompt = event as BeforeInstallPromptEvent;
    notify();
  });
  window.addEventListener("appinstalled", () => {
    deferredInstallPrompt = null;
    installed = true;
    notify();
  });
}

export function useInstallPrompt() {
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    const listener = () => forceUpdate((value) => value + 1);
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  const promptInstall = async () => {
    if (!deferredInstallPrompt) return false;

    await deferredInstallPrompt.prompt();
    const choice = await deferredInstallPrompt.userChoice;
    deferredInstallPrompt = null;
    if (choice.outcome === "accepted") installed = true;
    notify();
    return choice.outcome === "accepted";
  };

  return {
    canInstall: Boolean(deferredInstallPrompt) && !installed,
    isInstalled: installed,
    isIosInstall: !installed && !deferredInstallPrompt && isIosDevice(),
    promptInstall,
  };
}
