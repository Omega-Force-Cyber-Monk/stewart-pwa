import { ShieldCheck } from "lucide-react";

import { Button } from "../common/Button";

type CheckoutFooterProps = {
  cancelLabel: string;
  completePurchaseLabel: string;
  isProcessing: boolean;
  securePaymentNotice: string;
  onCancel: () => void;
  onCompletePurchase: () => void;
};

export function CheckoutFooter({
  cancelLabel,
  completePurchaseLabel,
  isProcessing,
  onCancel,
  onCompletePurchase,
  securePaymentNotice,
}: CheckoutFooterProps) {
  return (
    <footer className="border-t border-slate-200 p-5">
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Button disabled={isProcessing} onClick={onCancel} variant="secondary">
          {cancelLabel}
        </Button>
        <Button isLoading={isProcessing} onClick={onCompletePurchase}>
          {completePurchaseLabel}
        </Button>
      </div>
      <p className="mt-4 flex items-start gap-2 text-xs leading-5 text-slate-500">
        <ShieldCheck aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-cyan-700" />
        {securePaymentNotice}
      </p>
    </footer>
  );
}
