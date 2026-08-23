import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { resolveBusinessHost } from "../lib/businessHost";
import {
  getOrCreateMarketingSessionId,
  isMarketingConsumed,
  isMarketingSuppressed,
  markMarketingConsumed,
} from "../lib/storage";
import { overwriteLastTouchAttribution, isMobileExitIntentVisible } from "../components/marketing/exitIntentLogic";
import { getExitIntentConfig, isExitIntentRoute, type ExitIntentRouteConfig } from "../components/marketing/exitIntentConfig";
import { readMarketingOverlayState, subscribeMarketingOverlayState } from "../lib/marketingOverlay";
import { useGetPublicLeadConfigQuery } from "../store/api/Business/business.api";

const publicBusinessDomain = import.meta.env.VITE_PUBLIC_BUSINESS_DOMAIN || "quittheapp.com";

type PopupState = {
  open: boolean;
  config: ExitIntentRouteConfig | null;
};

function captureLastTouch(config: ExitIntentRouteConfig): void {
  const params = new URLSearchParams(window.location.search);
  overwriteLastTouchAttribution({
    sourcePage: config.sourcePage,
    utmSource: params.get("utm_source"),
    utmMedium: params.get("utm_medium"),
    utmCampaign: params.get("utm_campaign"),
    utmTerm: params.get("utm_term"),
    utmContent: params.get("utm_content"),
    referrer: document.referrer || null,
  });
  getOrCreateMarketingSessionId();
}

export function useExitIntentPopup(): PopupState & { close: () => void } {
  const location = useLocation();
  const config = useMemo(() => getExitIntentConfig(location.pathname), [location.pathname]);
  const eligible = isExitIntentRoute(location.pathname)
    && resolveBusinessHost(window.location.hostname, publicBusinessDomain).kind === "main";
  const { data: leadConfig } = useGetPublicLeadConfigQuery(undefined, {
    skip: !eligible || config?.sourcePage !== "spanish",
  });
  const [popup, setPopup] = useState<PopupState>({ open: false, config: null });
  const [overlayVisible, setOverlayVisible] = useState(() => readMarketingOverlayState().pricingModalVisible || readMarketingOverlayState().abandonedCheckoutVisible);

  const canShow = useCallback(() => {
    if (!eligible || !config || isMarketingConsumed() || isMarketingSuppressed() || overlayVisible) return false;
    if (config.sourcePage === "spanish" && !(leadConfig?.success && leadConfig.spanishPopupEnabled)) return false;
    return true;
  }, [config, eligible, leadConfig, overlayVisible]);

  const show = useCallback(() => {
    if (!canShow()) return;
    markMarketingConsumed();
    setPopup({ open: true, config: config ?? null });
  }, [canShow, config]);

  useEffect(() => {
    setPopup({ open: false, config: null });
    if (eligible && config) captureLastTouch(config);
  }, [config, eligible]);

  useEffect(() => {
    const unsubscribe = subscribeMarketingOverlayState((state) => {
      setOverlayVisible(state.pricingModalVisible || state.abandonedCheckoutVisible);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!canShow()) return;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    let cleanup: (() => void) | undefined;

    if (!coarse) {
      const handleMouseLeave = (event: MouseEvent) => {
        if (event.clientY <= 0) show();
      };
      document.addEventListener("mouseleave", handleMouseLeave);
      cleanup = () => document.removeEventListener("mouseleave", handleMouseLeave);
    } else {
      const hero = document.querySelector<HTMLElement>("[data-exit-intent-hero]");
      if (!hero || !("IntersectionObserver" in window)) return undefined;
      let intersectionRatio = 0;
      const observer = new IntersectionObserver((entries) => {
        intersectionRatio = entries[0]?.intersectionRatio || 0;
      });
      observer.observe(hero);
      const timer = window.setTimeout(() => {
        if (isMobileExitIntentVisible(intersectionRatio)) show();
      }, 30000);
      cleanup = () => {
        window.clearTimeout(timer);
        observer.disconnect();
      };
    }

    return cleanup;
  }, [canShow, show]);

  const close = useCallback(() => setPopup({ open: false, config: null }), []);
  return { ...popup, close };
}
