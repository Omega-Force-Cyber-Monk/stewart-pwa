import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useGetAnalyticsPricingQuery } from "../../store/api/Payment/payment.api";
import { trackEcommerce } from "../../lib/gtmEvents";

const sellingPages = new Set(["/", "/women", "/couple", "/senior", "/spanish"]);

export function ProductAnalytics() {
  const { pathname } = useLocation();
  const { data } = useGetAnalyticsPricingQuery(undefined, { skip: !sellingPages.has(pathname) });
  const lastVisit = useRef<string | null>(null);
  useEffect(() => {
    if (!sellingPages.has(pathname)) { lastVisit.current = null; return; }
    if (!data || lastVisit.current === pathname) return;
    lastVisit.current = pathname;
    trackEcommerce("view_item", data);
  }, [pathname, data]);
  return null;
}
