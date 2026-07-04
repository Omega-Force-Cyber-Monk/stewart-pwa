import type { Locale } from "../appFlow/appFlowTypes";

export type FunnelTranslation = {
  eyebrow: string;
  headline: string;
  subheadline: string;
  primaryCta: string;
  secondaryCta: string;
  benefits: string[];
  trustSignals: string[];
};

export type IconCardTranslation = {
  title: string;
  description: string;
};

export type StepTranslation = {
  title: string;
  description: string;
};

export type FaqTranslation = {
  question: string;
  answer: string;
};

export type TranslationDictionary = {
  common: {
    appName: string;
    languageEnglish: string;
    languageSpanish: string;
    toggleLanguage: string;
    continue: string;
    back: string;
    next: string;
    close: string;
    resetDemo: string;
  };

  funnel: {
    standard: FunnelTranslation;
    women: FunnelTranslation;
    seniors: FunnelTranslation;
    couples: FunnelTranslation;
  };

  checkout: {
    title: string;
    secureCheckout: string;
    stripeInspiredBadge: string;
    baseProductName: string;
    baseProductDescription: string;
    dfyUpgradeName: string;
    dfyUpgradeDescription: string;
    oneTimeFeeLabel: string;
    optionalUpgradeLabel: string;
    subtotalLabel: string;
    upgradeLabel: string;
    totalLabel: string;
    completePurchase: string;
    cancel: string;
    securePaymentNotice: string;
    closeCheckout: string;
    successTitle: string;
    successMessage: string;
    preparingWorkspace: string;
  };

  marketing: {
    launchCta: string;
    learnMoreCta: string;
    smallTrustText: string;
    benefitsTitle: string;
    benefits: IconCardTranslation[];
    howItWorksTitle: string;
    howItWorksSteps: StepTranslation[];
    pricingTitle: string;
    oneTimePayment: string;
    whatsIncluded: string;
    pricingIncludes: string[];
    optionalUpgradeTitle: string;
    comparisonTitle: string;
    comparisonBase: string;
    comparisonUpgrade: string;
    trustTitle: string;
    trustCards: IconCardTranslation[];
    faqTitle: string;
    faqs: FaqTranslation[];
    footerHeadline: string;
    footerText: string;
  };

  onboarding: {
    title: string;
    subtitle: string;
    businessSetupTitle: string;
    progressPurchase: string;
    progressBusinessSetup: string;
    completedLabel: string;
    currentLabel: string;
    businessInformationTitle: string;
    headshotUploadTitle: string;
    summaryTitle: string;
    summaryName: string;
    summaryTargetMarket: string;
    summaryRegionalAirports: string;
    summaryPreferredDomain: string;
    summaryHeadshot: string;
    uploadButton: string;
    replaceImage: string;
    uploadPlaceholder: string;
    fullNameLabel: string;
    fullNamePlaceholder: string;
    targetCityLabel: string;
    targetCityPlaceholder: string;
    regionalAirportsLabel: string;
    regionalAirportsPlaceholder: string;
    preferredDomainLabel: string;
    preferredDomainPlaceholder: string;
    headshotLabel: string;
    headshotHelper: string;
    initializeDashboard: string;
    validationRequired: string;
    validationPreferredDomain: string;
    validationImageType: string;
    emptySummaryValue: string;
  };

  dashboard: {
    title: string;
    subtitle: string;
    diyPathTitle: string;
    dfyPathTitle: string;
    progressLabel: string;
    motivationalMessage: string;
    resourcesLabel: string;
    statusNotStarted: string;
    statusInProgress: string;
    statusComplete: string;
  };
};

export type LocaleDictionary = Record<Locale, TranslationDictionary>;
