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

export default function FunnelPage() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const activeFunnel = useAppSelector(selectActiveFunnel);
  const { t } = useTranslation();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const routeFunnelType = getFunnelTypeFromPathname(location.pathname);
  const config = getFunnelConfig(activeFunnel);

  useEffect(() => {
    dispatch(setActiveFunnel(routeFunnelType));
  }, [dispatch, routeFunnelType]);

  return (
    <main className={cn("min-h-[calc(100vh-73px)]", config.theme.pageClassName)}>
      <HeroSection
        config={config}
        onPrimaryCta={() => setIsCheckoutOpen(true)}
      />
      <CustomerBuildingSection />
      <OwnBusinessSection />
      <WomenOperatorsSection />
      <HowQuitWorksSection />
      <FAQSection faqs={t.marketing.faqs} theme={config.theme} title={t.marketing.faqTitle} />
      <PricingSection
        buttonLabel={t.marketing.launchCta}
        includedItems={t.marketing.pricingIncludes}
        oneTimePayment={t.marketing.oneTimePayment}
        onCta={() => setIsCheckoutOpen(true)}
        whatsIncluded={t.marketing.whatsIncluded}
      />
      <WomenBusinessStoriesSection />

      <FooterCTA onCta={() => setIsCheckoutOpen(true)} />
      <SiteFooter />
      <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />
    </main>
  );
}
