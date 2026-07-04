import { Download } from "lucide-react";

import { Button } from "../common/Button";
import { useInstallPrompt } from "../../hooks/useInstallPrompt";

export function InstallPrompt() {
  const { canInstall, promptInstall } = useInstallPrompt();

  if (!canInstall) return null;

  return (
    <div
      aria-live="polite"
      className="fixed bottom-24 left-4 right-4 z-50 rounded-lg border border-cyan-200 bg-white p-4 shadow-xl md:left-auto md:right-4 md:w-96"
    >
      <div className="flex items-start gap-3">
        <span className="grid size-9 shrink-0 place-items-center rounded-md bg-cyan-50 text-cyan-700">
          <Download aria-hidden="true" className="size-4" />
        </span>
        <div>
          <p className="text-sm font-bold text-slate-950">Install QuitTheApp</p>
          <p className="mt-1 text-sm text-slate-600">
            Add the launch platform to your device for quick access.
          </p>
        </div>
      </div>
      <Button className="mt-4 w-full" onClick={promptInstall}>
        Install QuitTheApp
      </Button>
    </div>
  );
}
