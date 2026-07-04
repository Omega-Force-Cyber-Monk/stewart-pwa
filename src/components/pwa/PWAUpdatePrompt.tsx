import { RefreshCw, Wifi, X } from "lucide-react";
import { useState } from "react";
import { useRegisterSW } from "virtual:pwa-register/react";

import { Button } from "../common/Button";

type NoticeType = "offline" | "refresh";

export function PWAUpdatePrompt() {
  const [dismissedNotice, setDismissedNotice] = useState<NoticeType | null>(null);
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW();

  const currentNotice: NoticeType | null = needRefresh
    ? "refresh"
    : offlineReady
      ? "offline"
      : null;

  const close = () => {
    setDismissedNotice(currentNotice);
    setOfflineReady(false);
    setNeedRefresh(false);
  };

  if (!currentNotice || dismissedNotice === currentNotice) return null;

  return (
    <div
      aria-live="polite"
      className="fixed bottom-4 left-4 right-4 z-50 rounded-lg border border-slate-200 bg-white p-4 shadow-xl md:left-auto md:w-96"
      role="status"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex gap-3">
          <span className="grid size-9 shrink-0 place-items-center rounded-md bg-cyan-50 text-cyan-700">
            {needRefresh ? (
              <RefreshCw aria-hidden="true" className="size-4" />
            ) : (
              <Wifi aria-hidden="true" className="size-4" />
            )}
          </span>
          <div>
            <p className="text-sm font-semibold text-slate-950">
              {needRefresh ? "A new version is available." : "App is ready for offline use."}
            </p>
            <p className="mt-1 text-sm text-slate-600">
              {needRefresh
                ? "Update now to load the latest QuitTheApp experience."
                : "QuitTheApp is cached on this device."}
            </p>
          </div>
        </div>

        <Button
          aria-label="Dismiss PWA notification"
          className="size-9 shrink-0 px-0"
          onClick={close}
          variant="ghost"
        >
          <X aria-hidden="true" className="size-4" />
        </Button>
      </div>

      {needRefresh && (
        <div className="mt-4 flex justify-end gap-2">
          <Button onClick={close} variant="secondary">
            Later
          </Button>
          <Button onClick={() => updateServiceWorker(true)}>Update</Button>
        </div>
      )}
    </div>
  );
}
