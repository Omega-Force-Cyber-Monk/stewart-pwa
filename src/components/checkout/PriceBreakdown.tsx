import { cn } from "../../lib/cn";
import { BASE_PRICE, DFY_PRICE, calculateCheckoutTotal, formatPrice } from "./checkoutUtils";

type PriceBreakdownProps = {
  hasDfyUpgrade: boolean;
  subtotalLabel: string;
  upgradeLabel: string;
  totalLabel: string;
};

export function PriceBreakdown({
  hasDfyUpgrade,
  subtotalLabel,
  totalLabel,
  upgradeLabel,
}: PriceBreakdownProps) {
  const upgradePrice = hasDfyUpgrade ? DFY_PRICE : 0;
  const total = calculateCheckoutTotal(hasDfyUpgrade);

  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
      <div className="space-y-3 text-sm">
        <div className="flex items-center justify-between gap-4">
          <span className="text-slate-600">{subtotalLabel}</span>
          <span className="font-semibold text-slate-950">{formatPrice(BASE_PRICE)}</span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="text-slate-600">{upgradeLabel}</span>
          <span
            className={cn(
              "font-semibold",
              hasDfyUpgrade ? "text-slate-950" : "text-slate-400",
            )}
          >
            {hasDfyUpgrade ? `+${formatPrice(upgradePrice)}` : formatPrice(0)}
          </span>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-4">
        <span className="font-bold text-slate-950">{totalLabel}</span>
        <span className="text-2xl font-bold text-slate-950">{formatPrice(total)}</span>
      </div>
    </div>
  );
}
