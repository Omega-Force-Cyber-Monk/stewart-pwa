import { ShoppingBag } from "lucide-react";

import { BASE_PRICE, formatPrice } from "./checkoutUtils";

type CheckoutSummaryProps = {
  description: string;
  productName: string;
};

export function CheckoutSummary({ description, productName }: CheckoutSummaryProps) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4">
      <div className="flex gap-4">
        <span className="grid size-11 shrink-0 place-items-center rounded-md bg-slate-950 text-white">
          <ShoppingBag aria-hidden="true" className="size-5" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-4">
            <h3 className="font-bold text-slate-950">{productName}</h3>
            <span className="font-bold text-slate-950">{formatPrice(BASE_PRICE)}</span>
          </div>
          <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
        </div>
      </div>
    </section>
  );
}
