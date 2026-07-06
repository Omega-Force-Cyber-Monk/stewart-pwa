import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import { CheckoutModal } from "../components/checkout/CheckoutModal";
import { CustomerBuildingSection } from "../components/funnel/CustomerBuildingSection";
import { FAQSection } from "../components/funnel/FAQSection";
import { FooterCTA } from "../components/funnel/FooterCTA";
import { HeroSection } from "../components/funnel/HeroSection";
import { HowQuitWorksSection } from "../components/funnel/HowQuitWorksSection";
import { OwnBusinessSection } from "../components/funnel/OwnBusinessSection";
import { PricingSection } from "../components/funnel/PricingSection";
import { SiteFooter } from "../components/funnel/SiteFooter";
import { WomenBusinessStoriesSection } from "../components/funnel/WomenBusinessStoriesSection";
import { WomenOperatorsSection } from "../components/funnel/WomenOperatorsSection";
import {
  selectActiveFunnel,
  setActiveFunnel,
} from "../features/appFlow/appFlowSlice";
import { getFunnelConfig, getFunnelTypeFromPathname } from "../features/funnel/funnelUtils";
import { useTranslation } from "../features/localization/useTranslation";
import { cn } from "../lib/cn";

type FunnelLocationState = {
  checkoutRequestId?: number;
};

export default function FunnelPage() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const activeFunnel = useAppSelector(selectActiveFunnel);
  const { t } = useTranslation();
  const [isCheckoutManuallyOpen, setIsCheckoutManuallyOpen] = useState(false);
  const [dismissedCheckoutRequestId, setDismissedCheckoutRequestId] = useState<
    number | undefined
  >();

  const routeFunnelType = getFunnelTypeFromPathname(location.pathname);
  const checkoutRequestId = (location.state as FunnelLocationState | null)?.checkoutRequestId;
  const config = getFunnelConfig(activeFunnel);
  const isCheckoutOpen =
    isCheckoutManuallyOpen ||
    Boolean(checkoutRequestId && checkoutRequestId !== dismissedCheckoutRequestId);

  useEffect(() => {
    dispatch(setActiveFunnel(routeFunnelType));
  }, [dispatch, routeFunnelType]);

  const openCheckout = () => {
    setIsCheckoutManuallyOpen(true);
  };

  const closeCheckout = () => {
    setIsCheckoutManuallyOpen(false);
    setDismissedCheckoutRequestId(checkoutRequestId);
  };

  return (
    <main className={cn("min-h-[calc(100vh-73px)]", config.theme.pageClassName)}>
      <HeroSection
        config={config}
        onPrimaryCta={openCheckout}
      />
      <CustomerBuildingSection />
      <OwnBusinessSection />
      <WomenOperatorsSection />
      <HowQuitWorksSection />
      <FAQSection
        categoryTitle={t.funnelPage.faqCategoryTitle}
        faqs={t.marketing.faqs}
        subtitle={t.funnelPage.faqSubtitle}
        theme={config.theme}
        title={t.marketing.faqTitle}
      />
      <PricingSection
        buttonLabel={t.marketing.launchCta}
        includedItems={t.marketing.pricingIncludes}
        oneTimePayment={t.marketing.oneTimePayment}
        onCta={openCheckout}
        pricingCopy={t.funnelPage.pricing}
        whatsIncluded={t.marketing.whatsIncluded}
      />
      <WomenBusinessStoriesSection />

      <FooterCTA onCta={openCheckout} />
      <SiteFooter />
      <CheckoutModal isOpen={isCheckoutOpen} onClose={closeCheckout} />
    </main>
  );
}
