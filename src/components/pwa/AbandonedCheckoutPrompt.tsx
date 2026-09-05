import { useEffect, useState } from "react";
import { Check, Clock3, X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { resolveBusinessHost } from "../../lib/businessHost";
import {
  readStorageValue,
  removeStorageValue,
  storageKeys,
} from "../../lib/storage";

const MARKETING_PATHS = new Set(["/", "/women", "/couple", "/senior", "/spanish"]);
const ABANDONED_AFTER_MS = 15 * 60 * 1000;
const MARKER_MAX_AGE_MS = 24 * 60 * 60 * 1000;

type CheckoutMarker = {
  sessionId?: string;
  plan?: "base" | "bundle";
  email?: string;
  startedAt: number;
};

function readMarker(): CheckoutMarker | null {
  const raw = readStorageValue(storageKeys.abandonedCheckout);
  if (!raw) return null;

  try {
    const marker = JSON.parse(raw) as Partial<CheckoutMarker>;
    if (typeof marker.startedAt !== "number") return null;
    return marker as CheckoutMarker;
  } catch {
    return null;
  }
}

export function AbandonedCheckoutPrompt() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
<<<<<<< HEAD
=======
    const currentOverlayState = readMarketingOverlayState();
    setMarketingOverlayState({ ...currentOverlayState, abandonedCheckoutVisible: false });
    const unsubscribePricing = subscribeMarketingOverlayState((state) => {
      if (state.pricingModalVisible && state.abandonedCheckoutVisible) {
        setIsVisible(false);
        setMarketingOverlayState({ ...state, abandonedCheckoutVisible: false });
      }
    });
>>>>>>> cd42cdac3461e9ba373471a1363c9c2e1f0cdff4
    const host = resolveBusinessHost(
      window.location.hostname,
      import.meta.env.VITE_PUBLIC_BUSINESS_DOMAIN || "quittheapp.com",
    );
    const isMarketingPage = MARKETING_PATHS.has(location.pathname);
    if (host.kind !== "main" || !isMarketingPage) {
      setIsVisible(false);
<<<<<<< HEAD
      return;
=======
      return unsubscribePricing;
>>>>>>> cd42cdac3461e9ba373471a1363c9c2e1f0cdff4
    }

    const marker = readMarker();
    if (!marker) {
      setIsVisible(false);
<<<<<<< HEAD
      return;
=======
      return unsubscribePricing;
>>>>>>> cd42cdac3461e9ba373471a1363c9c2e1f0cdff4
    }

    const age = Date.now() - marker.startedAt;
    const cancelled = new URLSearchParams(location.search).get("checkout") === "cancelled";
    const isFreshEnough = age >= ABANDONED_AFTER_MS && age <= MARKER_MAX_AGE_MS;
<<<<<<< HEAD
    setIsVisible(cancelled || isFreshEnough);
  }, [location.pathname, location.search]);

=======
    const visible = cancelled || isFreshEnough;
    setIsVisible(visible);
    const nextOverlayState = readMarketingOverlayState();
    setMarketingOverlayState({ ...nextOverlayState, abandonedCheckoutVisible: visible });
    return unsubscribePricing;
  }, [location.pathname, location.search]);

  useEffect(() => () => {
    const current = readMarketingOverlayState();
    setMarketingOverlayState({ ...current, abandonedCheckoutVisible: false });
  }, []);

>>>>>>> cd42cdac3461e9ba373471a1363c9c2e1f0cdff4
  const dismiss = () => {
    removeStorageValue(storageKeys.abandonedCheckout);
    setIsVisible(false);
    const params = new URLSearchParams(location.search);
    if (params.has("checkout")) {
      params.delete("checkout");
      const nextSearch = params.toString();
      navigate(`${location.pathname}${nextSearch ? `?${nextSearch}` : ""}`, { replace: true });
    }
  };

  const resumeCheckout = () => {
    removeStorageValue(storageKeys.abandonedCheckout);
    navigate("/?showPricing=true", { replace: true });
  };

  if (!isVisible) return null;

  return (
    <div
      aria-live="polite"
      className="fixed bottom-4 left-4 right-4 z-[80] rounded-xl border border-cyan-200 bg-white p-4 shadow-xl md:left-auto md:right-4 md:w-96"
      role="status"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <span className="grid size-9 shrink-0 place-items-center rounded-md bg-cyan-50 text-cyan-700">
            <Clock3 aria-hidden="true" className="size-4" />
          </span>
          <div>
            <p className="text-sm font-bold text-slate-950">Finish setting up your launch</p>
            <p className="mt-1 text-sm text-slate-600">
              Your checkout is still available. Pick up where you left off when you&apos;re ready.
            </p>
          </div>
        </div>
        <button
          type="button"
          aria-label="Dismiss checkout reminder"
          className="grid size-9 shrink-0 place-items-center rounded-md text-slate-500 hover:bg-slate-100 hover:text-slate-800"
          onClick={dismiss}
        >
          <X aria-hidden="true" className="size-4" />
        </button>
      </div>
      <button
        type="button"
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-[#04B5A3] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#039384]"
        onClick={resumeCheckout}
      >
        <Check aria-hidden="true" className="size-4" />
        Resume checkout
      </button>
    </div>
  );
}
