import { RefreshCw, Wifi } from "lucide-react";
import { useRegisterSW } from "virtual:pwa-register/react";

import { Button } from "../common/Button";

export function PWAUpdatePrompt() {
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(registration) {
      console.info("Service worker registered", registration);
    },
    onRegisterError(error) {
      console.error("Service worker registration failed", error);
    },
  });

  const close = () => {
    setOfflineReady(false);
    setNeedRefresh(false);
  };

  if (!offlineReady && !needRefresh) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 rounded-lg border border-slate-200 bg-white p-4 shadow-xl md:left-auto md:w-96">
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
            {needRefresh ? "New version available" : "Ready for offline use"}
          </p>
          <p className="mt-1 text-sm text-slate-600">
            {needRefresh
              ? "Update now to load the latest QuitTheApp experience."
              : "QuitTheApp is cached on this device."}
          </p>
        </div>
      </div>

      <div className="mt-4 flex justify-end gap-2">
        <Button onClick={close} variant="secondary">
          Close
        </Button>
        {needRefresh && <Button onClick={() => updateServiceWorker(true)}>Update</Button>}
      </div>
    </div>
  );
}
