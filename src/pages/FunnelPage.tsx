import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Briefcase, Calendar, DollarSign, Plane, ShieldCheck, Users } from "lucide-react";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import { CheckoutModal } from "../components/checkout/CheckoutModal";
import { BenefitsSection } from "../components/funnel/BenefitsSection";
import { CustomerBuildingSection } from "../components/funnel/CustomerBuildingSection";
import { FAQSection } from "../components/funnel/FAQSection";
import { FooterCTA } from "../components/funnel/FooterCTA";
import { HeroSection } from "../components/funnel/HeroSection";
import { HowItWorksSection } from "../components/funnel/HowItWorksSection";
import { HowQuitWorksSection } from "../components/funnel/HowQuitWorksSection";
import { OwnBusinessSection } from "../components/funnel/OwnBusinessSection";
import { PricingSection } from "../components/funnel/PricingSection";
import { SiteFooter } from "../components/funnel/SiteFooter";
import { TrustSection } from "../components/funnel/TrustSection";
import { WomenOperatorsSection } from "../components/funnel/WomenOperatorsSection";
import {
  selectActiveFunnel,
  setActiveFunnel,
} from "../features/appFlow/appFlowSlice";
import { getFunnelConfig, getFunnelTypeFromPathname } from "../features/funnel/funnelUtils";
import { useTranslation } from "../features/localization/useTranslation";
import { cn } from "../lib/cn";

const benefitIcons = [Briefcase, Plane, DollarSign, Users, Calendar, ShieldCheck];

export default function FunnelPage() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const activeFunnel = useAppSelector(selectActiveFunnel);
  const { t } = useTranslation();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const routeFunnelType = getFunnelTypeFromPathname(location.pathname);
  const config = getFunnelConfig(activeFunnel);
  const funnelCopy = t.funnel[activeFunnel];

  useEffect(() => {
    dispatch(setActiveFunnel(routeFunnelType));
  }, [dispatch, routeFunnelType]);

  return (
    <main className={cn("min-h-[calc(100vh-73px)]", config.theme.pageClassName)}>
      <HeroSection
        appName={t.common.appName}
        config={config}
        copy={funnelCopy}
        onPrimaryCta={() => setIsCheckoutOpen(true)}
        priceLabel={t.marketing.oneTimePayment}
        productName={t.checkout.baseProductName}
        smallTrustText={t.marketing.smallTrustText}
      />
      <CustomerBuildingSection />
      <OwnBusinessSection />
      <WomenOperatorsSection />
      <HowQuitWorksSection />
      <BenefitsSection
        benefits={t.marketing.benefits}
        icons={benefitIcons}
        theme={config.theme}
        title={t.marketing.benefitsTitle}
      />
      <HowItWorksSection
        steps={t.marketing.howItWorksSteps}
        theme={config.theme}
        title={t.marketing.howItWorksTitle}
      />
      <PricingSection
        buttonLabel={t.marketing.launchCta}
        comparisonBase={t.marketing.comparisonBase}
        comparisonTitle={t.marketing.comparisonTitle}
        comparisonUpgrade={t.marketing.comparisonUpgrade}
        config={config}
        includedItems={t.marketing.pricingIncludes}
        oneTimePayment={t.marketing.oneTimePayment}
        onCta={() => setIsCheckoutOpen(true)}
        optionalUpgradeTitle={t.marketing.optionalUpgradeTitle}
        productName={t.checkout.baseProductName}
        title={t.marketing.pricingTitle}
        upgradeName={t.checkout.dfyUpgradeName}
        whatsIncluded={t.marketing.whatsIncluded}
      />
      <TrustSection
        cards={t.marketing.trustCards}
        theme={config.theme}
        title={t.marketing.trustTitle}
      />
      <FAQSection faqs={t.marketing.faqs} theme={config.theme} title={t.marketing.faqTitle} />
      <FooterCTA
        buttonLabel={t.marketing.launchCta}
        headline={t.marketing.footerHeadline}
        onCta={() => setIsCheckoutOpen(true)}
        text={t.marketing.footerText}
        theme={config.theme}
      />
      <SiteFooter />
      <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />
    </main>
  );
}
