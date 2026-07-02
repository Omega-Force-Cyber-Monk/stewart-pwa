import { Lock, X } from "lucide-react";

import { Button } from "../common/Button";

type CheckoutHeaderProps = {
  closeLabel: string;
  secureCheckoutLabel: string;
  stripeInspiredBadge: string;
  title: string;
  onClose: () => void;
};

export function CheckoutHeader({
  closeLabel,
  onClose,
  secureCheckoutLabel,
  stripeInspiredBadge,
  title,
}: CheckoutHeaderProps) {
  return (
    <header className="flex items-start justify-between gap-4 border-b border-slate-200 p-5">
      <div>
        <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-cyan-700">
          <Lock aria-hidden="true" className="size-3.5" />
          {secureCheckoutLabel}
        </p>
        <h2 className="mt-2 text-xl font-bold text-slate-950">{title}</h2>
        <span className="mt-2 inline-flex rounded-md bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-700">
          {stripeInspiredBadge}
        </span>
      </div>
      <Button aria-label={closeLabel} className="size-9 shrink-0 px-0" onClick={onClose} variant="ghost">
        <X aria-hidden="true" className="size-4" />
      </Button>
    </header>
  );
}
