import { X } from "lucide-react";
import { useEffect, useRef } from "react";

import { Button } from "../common/Button";
import type { ResourceItem } from "../../features/dashboard/resourcesTypes";

type DownloadConfirmationModalProps = {
  resource: ResourceItem | null;
  onClose: () => void;
};

export function DownloadConfirmationModal({
  onClose,
  resource,
}: DownloadConfirmationModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!resource) return;

    const previousActiveElement =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;

    closeButtonRef.current?.focus();

    return () => {
      previousActiveElement?.focus();
    };
  }, [resource]);

  useEffect(() => {
    if (!resource) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, resource]);

  if (!resource) return null;

  return (
    <div
      className="fixed inset-0 z-[70] grid place-items-center bg-slate-950/50 px-4 backdrop-blur-sm"
      onClick={onClose}
      role="presentation"
    >
      <section
        aria-modal="true"
        className="w-full max-w-lg rounded-lg bg-white p-5 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-cyan-700">
              Resource Ready
            </p>
            <h2 className="mt-2 text-xl font-bold text-slate-950">{resource.title}</h2>
          </div>
          <button
            aria-label="Close resource modal"
            className="grid size-9 shrink-0 place-items-center rounded-md text-slate-600 transition hover:bg-slate-100 hover:text-slate-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
            onClick={onClose}
            ref={closeButtonRef}
            type="button"
          >
            <X aria-hidden="true" className="size-4" />
          </button>
        </div>

        <p className="mt-4 text-sm leading-6 text-slate-600">
          This is a placeholder for the downloadable resource. In the production version
          this would open or download the selected asset.
        </p>

        <div className="mt-5 flex justify-end">
          <Button onClick={onClose} variant="secondary">
            Close
          </Button>
        </div>
      </section>
    </div>
  );
}
