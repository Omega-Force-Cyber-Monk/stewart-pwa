import { Sparkles } from "lucide-react";

import { DFY_PRICE, formatPrice } from "./checkoutUtils";
import { cn } from "../../lib/cn";

type CheckoutUpgradeCardProps = {
  checked: boolean;
  description: string;
  optionalUpgradeLabel: string;
  title: string;
  onChange: (checked: boolean) => void;
};

export function CheckoutUpgradeCard({
  checked,
  description,
  onChange,
  optionalUpgradeLabel,
  title,
}: CheckoutUpgradeCardProps) {
  return (
    <label
      className={cn(
        "flex cursor-pointer items-start gap-4 rounded-lg border p-4 transition",
        checked ? "border-cyan-300 bg-cyan-50" : "border-slate-200 bg-white hover:bg-slate-50",
      )}
    >
      <input
        checked={checked}
        className="mt-1 size-4 cursor-pointer accent-cyan-700"
        onChange={(event) => onChange(event.target.checked)}
        type="checkbox"
      />
      <span className="grid size-10 shrink-0 place-items-center rounded-md bg-white text-cyan-700 shadow-sm">
        <Sparkles aria-hidden="true" className="size-5" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-start justify-between gap-4">
          <span>
            <span className="block text-sm font-bold text-slate-950">{title}</span>
            <span className="mt-1 block text-xs font-semibold uppercase tracking-wide text-cyan-700">
              {optionalUpgradeLabel}
            </span>
          </span>
          <span className="text-sm font-bold text-slate-950">+{formatPrice(DFY_PRICE)}</span>
        </span>
        <span className="mt-2 block text-sm leading-6 text-slate-600">{description}</span>
      </span>
    </label>
  );
}
