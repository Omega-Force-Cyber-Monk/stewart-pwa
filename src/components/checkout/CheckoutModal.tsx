import { AnimatePresence, motion } from "motion/react";
import { type KeyboardEvent as ReactKeyboardEvent, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "../../app/hooks";
import { completePurchase } from "../../features/appFlow/appFlowSlice";
import { useTranslation } from "../../features/localization/useTranslation";
import { CheckoutFooter } from "./CheckoutFooter";
import { CheckoutHeader } from "./CheckoutHeader";
import { CheckoutSummary } from "./CheckoutSummary";
import { CheckoutUpgradeCard } from "./CheckoutUpgradeCard";
import { PriceBreakdown } from "./PriceBreakdown";
import { PurchaseSuccessAnimation } from "./PurchaseSuccessAnimation";
import { SUCCESS_REDIRECT_DELAY_MS } from "./checkoutUtils";

type CheckoutModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const focusableSelector =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

export function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const modalRef = useRef<HTMLDivElement>(null);
  const [hasDfyUpgrade, setHasDfyUpgrade] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const previousActiveElement = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;

    requestAnimationFrame(() => {
      const firstFocusable = modalRef.current?.querySelector<HTMLElement>(focusableSelector);
      firstFocusable?.focus();
    });

    return () => {
      previousActiveElement?.focus();
    };
  }, [isOpen]);

  const resetCheckoutState = () => {
    setHasDfyUpgrade(false);
    setIsProcessing(false);
    setIsSuccess(false);
  };

  const closeModal = () => {
    if (isProcessing || isSuccess) return;
    resetCheckoutState();
    onClose();
  };

  const handleBackdropClick = () => {
    closeModal();
  };

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      closeModal();
      return;
    }

    if (event.key !== "Tab") return;

    const focusableElements = Array.from(
      modalRef.current?.querySelectorAll<HTMLElement>(focusableSelector) || [],
    ).filter((element) => !element.hasAttribute("disabled"));

    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
      return;
    }

    if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  };

  const handleCompletePurchase = () => {
    setIsProcessing(true);
    setIsSuccess(true);

    window.setTimeout(() => {
      dispatch(completePurchase({ hasDfyUpgrade }));
      resetCheckoutState();
      onClose();
      navigate("/onboarding");
    }, SUCCESS_REDIRECT_DELAY_MS);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[60] flex items-end justify-center bg-slate-950/50 p-0 backdrop-blur-sm sm:items-center sm:p-4"
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          onClick={handleBackdropClick}
          onKeyDown={handleKeyDown}
          role="presentation"
        >
          <motion.div
            animate={{ opacity: 1, scale: 1, y: 0 }}
            aria-modal="true"
            className="max-h-[92vh] w-full overflow-y-auto rounded-t-2xl bg-white shadow-2xl sm:max-w-[600px] sm:rounded-2xl"
            exit={{ opacity: 0, scale: 0.96, y: 24 }}
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            onClick={(event) => event.stopPropagation()}
            ref={modalRef}
            role="dialog"
            transition={{ duration: 0.2 }}
          >
            {isSuccess ? (
              <PurchaseSuccessAnimation
                preparingWorkspaceLabel={t.checkout.preparingWorkspace}
                successMessage={t.checkout.successMessage}
                successTitle={t.checkout.successTitle}
              />
            ) : (
              <>
                <CheckoutHeader
                  closeLabel={t.checkout.closeCheckout}
                  onClose={closeModal}
                  secureCheckoutLabel={t.checkout.secureCheckout}
                  stripeInspiredBadge={t.checkout.stripeInspiredBadge}
                  title={t.checkout.title}
                />
                <div className="grid gap-4 p-5">
                  <CheckoutSummary
                    description={t.checkout.baseProductDescription}
                    productName={t.checkout.baseProductName}
                  />
                  <CheckoutUpgradeCard
                    checked={hasDfyUpgrade}
                    description={t.checkout.dfyUpgradeDescription}
                    onChange={setHasDfyUpgrade}
                    optionalUpgradeLabel={t.checkout.optionalUpgradeLabel}
                    title={t.checkout.dfyUpgradeName}
                  />
                  <PriceBreakdown
                    hasDfyUpgrade={hasDfyUpgrade}
                    subtotalLabel={t.checkout.subtotalLabel}
                    totalLabel={t.checkout.totalLabel}
                    upgradeLabel={t.checkout.upgradeLabel}
                  />
                </div>
                <CheckoutFooter
                  cancelLabel={t.checkout.cancel}
                  completePurchaseLabel={t.checkout.completePurchase}
                  isProcessing={isProcessing}
                  onCancel={closeModal}
                  onCompletePurchase={handleCompletePurchase}
                  securePaymentNotice={t.checkout.securePaymentNotice}
                />
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
