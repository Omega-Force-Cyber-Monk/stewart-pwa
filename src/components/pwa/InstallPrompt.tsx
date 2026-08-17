import { Download, Info, X } from "lucide-react";
import { useState } from "react";

import { Button } from "../common/Button";
import { useInstallPrompt } from "../../hooks/useInstallPrompt";

type InstallPromptProps = {
  personalized?: boolean;
};

export function InstallPrompt({ personalized = false }: InstallPromptProps) {
  const [isDismissed, setIsDismissed] = useState(false);
  const { canInstall, isIosInstall, promptInstall } = useInstallPrompt();

  if ((!canInstall && !isIosInstall) || isDismissed) return null;

  return (
    <div
      aria-live="polite"
      className="fixed bottom-24 left-4 right-4 z-50 rounded-lg border border-cyan-200 bg-white p-4 text-left shadow-xl md:left-auto md:right-4 md:w-96"
      role="status"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <span className="grid size-9 shrink-0 place-items-center rounded-md bg-cyan-50 text-cyan-700">
            {isIosInstall ? <Info aria-hidden="true" className="size-4" /> : <Download aria-hidden="true" className="size-4" />}
          </span>
          <div>
            <p className="text-sm font-bold text-slate-950">
              {personalized ? "Save this driver’s page" : "Install QuitTheApp"}
            </p>
            <p className="mt-1 text-sm text-slate-600">
              {isIosInstall
                ? "Tap Share, then choose Add to Home Screen for quick access."
                : personalized
                  ? "Add this personal selling page to your phone for quick access."
                  : "Add the launch platform to your device for quick access."}
            </p>
          </div>
        </div>
        <Button
          aria-label="Dismiss install prompt"
          className="size-9 shrink-0 px-0"
          onClick={() => setIsDismissed(true)}
          variant="ghost"
        >
          <X aria-hidden="true" className="size-4" />
        </Button>
      </div>
      {!isIosInstall && (
        <Button className="mt-4 w-full" onClick={() => void promptInstall()}>
          {personalized ? "Save to Home Screen" : "Install QuitTheApp"}
        </Button>
      )}
    </div>
  );
}
