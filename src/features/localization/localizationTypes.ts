import type { Locale } from "../appFlow/appFlowTypes";

export type FaqTranslation = {
  question: string;
  answer: string;
};

export type FunnelFeatureCardTranslation = {
  title: string;
  description: string;
  imageAlt: string;
};

export type FunnelReasonTranslation = {
  title: string;
  description: string;
};

export type FunnelStoryTranslation = {
  location: string;
  name: string;
  quote: string;
};

export type TranslationDictionary = {
  common: {
    appName: string;
    languageEnglish: string;
    languageSpanish: string;
    toggleLanguage: string;
    primaryNavigation: string;
    mobileNavigation: string;
    homeLabel: string;
    continue: string;
    back: string;
    next: string;
    close: string;
    resetDemo: string;
  };

  navigation: {
    home: string;
    whatsIncluded: string;
    successStories: string;
    faq: string;
    contact: string;
    admin: string;
    dashboard: string;
    startedBusiness: string;
    openMenu: string;
    closeMenu: string;
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
    oneTimePayment: string;
    whatsIncluded: string;
    pricingIncludes: string[];
    faqTitle: string;
    faqs: FaqTranslation[];
  };

  funnelPage: {
    hero: {
      headlinePrefix: string;
      headlineHighlight: string;
      headlineSuffix: string;
      subtitle: string;
      imageAlts: string[];
      ctaPrefix: string;
    };
    customerBuilding: {
      titlePrefix: string;
      titleHighlight: string;
      titleSuffix: string;
      subtitle: string;
      cards: FunnelFeatureCardTranslation[];
    };
    ownBusiness: {
      titlePrefix: string;
      titleHighlight: string;
      titleSuffix: string;
      subtitle: string;
      relyingPrefix: string;
      relyingHighlight: string;
      womenHighlight: string;
      womenSuffix: string;
      imageAlt: string;
      appLimitations: string[];
      businessBenefits: string[];
    };
    womenOperators: {
      titlePrefix: string;
      titleHighlight: string;
      subtitle: string;
      imageAlts: string[];
      reasons: FunnelReasonTranslation[];
      tagRows: string[][];
    };
    howWorks: {
      titlePrefix: string;
      titleHighlight: string;
      titleSuffix: string;
      subtitle: string;
      steps: FunnelReasonTranslation[];
    };
    faqSubtitle: string;
    faqCategoryTitle: string;
    pricing: {
      titlePrefix: string;
      titleHighlight: string;
      titleSecondHighlight: string;
      titleSuffix: string;
      subtitle: string;
      description: string;
    };
    stories: {
      titleHighlight: string;
      titleFirstLineSuffix: string;
      titleSecondLine: string;
      subtitle: string;
      ratingLabel: string;
      items: FunnelStoryTranslation[];
    };
    footerCta: {
      title: string;
      subtitle: string;
      ctaPrefix: string;
    };
    footer: {
      ariaLabel: string;
      links: string[];
      copyright: string;
    };
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
    personalizedSiteTitle: string;
    personalizedSiteDescription: string;
    viewCustomerPage: string;
    progressLabel: string;
    motivationalMessage: string;
    resourcesLabel: string;
    statusNotStarted: string;
    statusInProgress: string;
    statusComplete: string;
  };

  personalizedPage: {
    previewBadge: string;
    fallbackDriverName: string;
    fallbackMarket: string;
    fallbackAirports: string;
    heroEyebrow: string;
    heroTitlePrefix: string;
    heroTitleSuffix: string;
    heroDescriptionPrefix: string;
    heroDescriptionSuffix: string;
    trustedService: string;
    airportReadyRides: string;
    easyScheduling: string;
    driverImageAlt: string;
    driverProfile: string;
    airportTransportation: string;
    serviceDetails: string;
    coverage: string;
    coverageDescriptionJoiner: string;
    tripTypes: string;
    tripTypesDescription: string;
    bookingStatus: string;
    bookingStatusDescription: string;
    schedulingPreview: string;
    scheduleTitle: string;
    frontendOnly: string;
    fullName: string;
    email: string;
    phone: string;
    tripType: string;
    hotelToAirport: string;
    airportToHotel: string;
    pickupLocation: string;
    dropoffLocation: string;
    date: string;
    time: string;
    passengers: string;
    successMessage: string;
    requestAppointment: string;
    backToDashboard: string;
  };

  adminPage: {
    badge: string;
    title: string;
    subtitle: string;
    viewDemoOwnerSite: string;
    platformSettings: string;
    totalPurchased: string;
    totalPurchasedHelper: string;
    diyOwners: string;
    diyOwnersHelper: string;
    dfyOwners: string;
    dfyOwnersHelper: string;
    needsAttention: string;
    needsAttentionHelper: string;
    ownerDirectory: string;
    ownerDirectoryDescription: string;
    searchOwners: string;
    filterByPlan: string;
    allPlans: string;
    business: string;
    market: string;
    plan: string;
    status: string;
    website: string;
    acuity: string;
    launch: string;
    domain: string;
    launched: string;
    dfyQueue: string;
    dfyQueueDescription: string;
    due: string;
    websiteAcuitySetup: string;
    websiteAcuityDescription: string;
    liveWebsites: string;
    liveWebsitesDescription: string;
    acuityConnected: string;
    acuityConnectedDescription: string;
    siteLabel: string;
    acuityLabel: string;
    simulatorTitle: string;
    simulatorDescription: string;
    readyForBackend: string;
    statusLabels: Record<string, string>;
  };

  notFound: {
    label: string;
    title: string;
    description: string;
    action: string;
  };
};

export type LocaleDictionary = Record<Locale, TranslationDictionary>;
