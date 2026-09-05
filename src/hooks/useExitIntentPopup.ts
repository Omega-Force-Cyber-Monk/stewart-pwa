import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { getExitIntentConfig, isExitIntentRoute, type ExitIntentRouteConfig } from "../components/marketing/exit-intent/exitIntentConfig";
import { isMobileExitIntentVisible, canShowExitIntent, consumeExitIntent } from "../components/marketing/exit-intent/exitIntentLogic";

type PopupState = {
  open: boolean;
  config: ExitIntentRouteConfig | null;
};

export function useExitIntentPopup(): PopupState & { close: () => void } {
  const location = useLocation();
  const config = useMemo(() => getExitIntentConfig(location.pathname), [location.pathname]);
  const eligible = isExitIntentRoute(location.pathname);
  
  const [popup, setPopup] = useState<PopupState>({ open: false, config: null });

  const canShow = useCallback(() => {
    if (!eligible || !config) return false;
    if (!canShowExitIntent()) return false;
    return true;
  }, [config, eligible]);

  const show = useCallback(() => {
    if (!canShow()) return;
    consumeExitIntent();
    setPopup({ open: true, config: config ?? null });
  }, [canShow, config]);

  useEffect(() => {
    setPopup({ open: false, config: null });
  }, [config, eligible]);

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
