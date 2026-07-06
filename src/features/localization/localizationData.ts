import type { LocaleDictionary } from "./localizationTypes";

export const localizationData: LocaleDictionary = {
  en: {
    common: {
      appName: "QuitTheApp",
      languageEnglish: "English",
      languageSpanish: "Spanish",
      toggleLanguage: "Toggle language",
      primaryNavigation: "Primary navigation",
      mobileNavigation: "Mobile navigation",
      homeLabel: "QuitTheApp home",
      continue: "Continue",
      back: "Back",
      next: "Next",
      close: "Close",
      resetDemo: "Reset demo",
    },
    navigation: {
      home: "Home",
      whatsIncluded: "What's Included",
      pricing: "Pricing",
      successStories: "Success Stories",
      faq: "FAQ",
      contact: "Contact",
      admin: "Admin",
      dashboard: "Dashboard",
      startedBusiness: "Started The Business",
      openMenu: "Open menu",
      closeMenu: "Close menu",
    },
    checkout: {
      title: "Mock checkout",
      secureCheckout: "Secure Checkout",
      stripeInspiredBadge: "Stripe-inspired demo",
      baseProductName: "QuitTheApp Launch System",
      baseProductDescription:
        "Frontend-only checkout simulation for the $495 base product.",
      dfyUpgradeName: "Done-For-You upgrade",
      dfyUpgradeDescription:
        "Add the $245 DFY delivery path to switch your dashboard pipeline.",
      oneTimeFeeLabel: "$495 one-time fee",
      optionalUpgradeLabel: "$245 optional upgrade",
      subtotalLabel: "Subtotal",
      upgradeLabel: "Upgrade",
      totalLabel: "Total",
      completePurchase: "Complete mock purchase",
      cancel: "Cancel",
      securePaymentNotice:
        "No real payment will be processed. This is a secure-looking frontend demo.",
      closeCheckout: "Close checkout",
      successTitle: "Purchase complete",
      successMessage: "Your QuitTheApp launch system is ready.",
      preparingWorkspace: "Preparing your workspace...",
    },
    marketing: {
      launchCta: "Launch My Business",
      oneTimePayment: "One-time payment",
      whatsIncluded: "What's Included",
      pricingIncludes: [
        "Business Launch Blueprint",
        "Airport Transportation Templates",
        "Marketing Scripts",
        "Customer Acquisition Resources",
        "Progress Dashboard",
        "Booking System Guidance",
        "Human support",
      ],
      faqTitle: "Frequently asked questions",
      faqs: [
        {
          question: "What is QuitTheApp?",
          answer:
            "QuitTheApp is a frontend-only PWA concept for helping drivers launch an independent transportation business.",
        },
        {
          question: "Who is this for?",
          answer:
            "It is for drivers who want direct clients, clearer positioning, and a business beyond app-based rides.",
        },
        {
          question: "Is this a subscription?",
          answer:
            "The planned base product is presented as a one-time payment in this funnel UI.",
        },
        {
          question: "Do I need technical experience?",
          answer:
            "No. The system is designed to guide business setup, offers, outreach, and booking decisions step by step.",
        },
        {
          question: "How long does setup take?",
          answer:
            "Timing depends on your market and readiness, but the flow is designed to help you organize the essentials quickly.",
        },
        {
          question: "What is the Done-For-You option?",
          answer:
            "The optional upgrade represents extra setup support. Checkout and delivery logic are not implemented yet.",
        },
      ],
    },
    funnelPage: {
      hero: {
        headlinePrefix: "Launch a",
        headlineHighlight: "Women-Focused",
        headlineSuffix: "Private Airport Business Built on Trust.",
        subtitle:
          "QuitTheApp helps women operators start a direct booking airport transportation business with the backing of a trusted platform.",
        imageAlts: [
          "Driver seated in a car",
          "Airport transportation driver smiling",
          "Women transportation operators at the airport",
          "Private driver ready for airport service",
          "Driver greeting riders from a car",
        ],
        ctaPrefix: "Launch My Business",
      },
      customerBuilding: {
        titlePrefix: "Everything You Need to Start",
        titleHighlight: "Building Your Own",
        titleSuffix: "Customers",
        subtitle:
          "Access the tools, systems, and support you need to attract clients, grow your brand, and build a successful airport transportation business.",
        cards: [
          {
            title: "Quick Launch",
            description:
              "Launch your airport transportation business with proven systems.",
            imageAlt: "Quick launch date selector illustration",
          },
          {
            title: "Customer Acquisition Center™",
            description:
              "Get tools, scripts, and marketing resources to attract and retain clients.",
            imageAlt: "Customer acquisition center illustration",
          },
          {
            title: "Personalized Starting Page™",
            description:
              "Show travelers why your business stands out and build trust immediately.",
            imageAlt: "Personalized starting page tools illustration",
          },
          {
            title: "Repeat Rider Engine",
            description:
              "Encourage returning customers and increase long-term bookings.",
            imageAlt: "Repeat rider engine flow illustration",
          },
        ],
      },
      ownBusiness: {
        titlePrefix: "Why Build Your",
        titleHighlight: "Own",
        titleSuffix: "Business?",
        subtitle:
          "Build a trusted brand, keep more revenue, and create lasting relationships with your own customers.",
        relyingPrefix: "Relying on",
        relyingHighlight: "Apps",
        womenHighlight: "Women",
        womenSuffix: "-Focused Business",
        imageAlt: "Women-focused private transportation driver",
        appLimitations: [
          "Commission fees",
          "Limited customer ownership",
          "No control over branding",
          "Inconsistent demand",
        ],
        businessBenefits: [
          "Build your own customers",
          "Repeat riders and referrals",
          "Set your own rates",
          "Professional brand presence",
          "Flexible business growth",
        ],
      },
      womenOperators: {
        titlePrefix: "Why Women Operators Can",
        titleHighlight: "Win",
        subtitle:
          "Women-led transportation businesses build stronger trust, deliver exceptional service, and create lasting customer relationships.",
        imageAlts: [
          "Woman driver smiling from the front seat",
          "Woman airport driver wearing a seat belt",
          "Woman driving at night",
          "Woman driver looking back from the driver's seat",
        ],
        reasons: [
          {
            title: "Reliability",
            description:
              "Customers value dependable service and professionalism.",
          },
          {
            title: "Personal Safety",
            description:
              "Women travelers often prefer trusted women-operated transportation.",
          },
          {
            title: "Strong Demand",
            description:
              "A growing market seeks personalized airport transportation.",
          },
        ],
        tagRows: [
          [
            "Own your customer list",
            "Start your business in about 30 days",
            "Build repeat clients",
          ],
          [
            "Keep more revenue",
            "Operate independently",
            "Create a brand customers trust",
          ],
        ],
      },
      howWorks: {
        titlePrefix: "How",
        titleHighlight: "QuitTheApp",
        titleSuffix: "Works",
        subtitle: "Find your ideal launch path in three simple steps",
        steps: [
          {
            title: "Get Access",
            description: "Receive your guide and startup resources.",
          },
          {
            title: "Build Your Business",
            description: "Launch your booking system and brand.",
          },
          {
            title: "Get Customers",
            description:
              "Begin attracting travelers and generating repeat bookings.",
          },
        ],
      },
      faqSubtitle: "Find clear answers to common billing topics.",
      faqCategoryTitle: "General FAQs",
      pricing: {
        titlePrefix: "Choose the",
        titleHighlight: "Plan for",
        titleSecondHighlight: "Your",
        titleSuffix: "Exclusive Journey",
        subtitle:
          "Flexible pricing designed to fit your goals, schedule, and budget.",
        description:
          "This subscription plan includes access to the Launch Dashboard, Operator Dashboard, comprehensive training resources, hosting, human support, and lifetime updates-providing everything you need to get started, manage your operations, and stay up to date.",
      },
      stories: {
        titleHighlight: "Women Operators",
        titleFirstLineSuffix: "Are",
        titleSecondLine: "Building Real Businesses",
        subtitle:
          "Discover how women entrepreneurs are creating trusted brands, attracting loyal customers, and growing successful transportation businesses.",
        ratingLabel: "5 star rating",
        items: [
          {
            location: "Knoxville, TN",
            name: "Annette Black",
            quote:
              "The system is simple, professional, and it works. I set my schedule and now I'm meeting great people everyday.",
          },
          {
            location: "Austin, TX",
            name: "Maya Collins",
            quote:
              "I finally have a business that feels like mine. The launch tools helped me look organized from day one.",
          },
          {
            location: "Tampa, FL",
            name: "Sofia Ramirez",
            quote:
              "The templates made it easier to explain my airport service and start building repeat customers.",
          },
          {
            location: "Charlotte, NC",
            name: "Erica Stone",
            quote:
              "I stopped guessing what to do next. The steps gave me a clear path to promote my own transportation brand.",
          },
          {
            location: "Phoenix, AZ",
            name: "Nina Patel",
            quote:
              "This helped me show up professionally and attract riders who value dependable private transportation.",
          },
        ],
      },
      footerCta: {
        title: "Ready to Launch?",
        subtitle:
          "Start building your women-focused airport transportation business today.",
        ctaPrefix: "Launch My Business",
      },
      footer: {
        ariaLabel: "Footer navigation",
        links: [
          "Privacy Policy",
          "Terms of Service",
          "Contact Support",
          "Contact",
        ],
        copyright:
          "© 2026 QuitTheApp. All Rights Reserved. Own Your Work. Keep What You Earn.",
      },
    },
    onboarding: {
      title: "Tell us about your transportation launch.",
      subtitle: "This intake seeds your client-side dashboard experience.",
      businessSetupTitle: "Business Setup",
      progressPurchase: "Purchase",
      progressBusinessSetup: "Business Setup",
      completedLabel: "Completed",
      currentLabel: "Current",
      businessInformationTitle: "Business Information",
      headshotUploadTitle: "Headshot Upload",
      summaryTitle: "Launch Summary",
      summaryName: "Name",
      summaryTargetMarket: "Target Market",
      summaryRegionalAirports: "Regional Airports",
      summaryPreferredDomain: "Preferred Domain",
      summaryHeadshot: "Headshot Preview",
      uploadButton: "Choose image",
      replaceImage: "Replace image",
      uploadPlaceholder:
        "JPEG, PNG, or WEBP. Preview stays on this device only.",
      fullNameLabel: "Full name",
      fullNamePlaceholder: "Test Driver",
      targetCityLabel: "Target city",
      targetCityPlaceholder: "Austin",
      regionalAirportsLabel: "Regional airports",
      regionalAirportsPlaceholder: "AUS, SAT",
      preferredDomainLabel: "Preferred domain",
      preferredDomainPlaceholder: "testdrivertransport.com",
      headshotLabel: "Headshot preview URL",
      headshotHelper:
        "Optional for now. A blob URL or image preview path can be used later.",
      initializeDashboard: "Initialize dashboard",
      validationRequired: "This field is required.",
      validationPreferredDomain: "Use letters, numbers, hyphens, or dots only.",
      validationImageType: "Please choose a JPEG, PNG, or WEBP image.",
      emptySummaryValue: "Not provided yet",
    },
    dashboard: {
      title: "Launch dashboard",
      subtitle: "Track your client-side launch path and next steps.",
      diyPathTitle: "DIY launch modules",
      dfyPathTitle: "Done-For-You delivery pipeline",
      personalizedSiteTitle: "Personalized customer website",
      personalizedSiteDescription: "Your public booking page is available at",
      viewCustomerPage: "View My page",
      progressLabel: "Launch progress",
      motivationalMessage:
        "Great progress! Complete all modules to launch your business.",
      resourcesLabel: "Resources",
      statusNotStarted: "Not started",
      statusInProgress: "In progress",
      statusComplete: "Complete",
    },
    personalizedPage: {
      previewBadge: "Customer website preview",
      fallbackDriverName: "Your Private Airport Driver",
      fallbackMarket: "your city",
      fallbackAirports: "regional airports",
      heroEyebrow: "Private airport transportation in",
      heroTitlePrefix: "Book a trusted ride with",
      heroTitleSuffix: ".",
      heroDescriptionPrefix:
        "Professional hotel-to-airport and airport-to-hotel transportation serving",
      heroDescriptionSuffix:
        "Choose your route, time, and passenger count below.",
      trustedService: "Trusted local service",
      airportReadyRides: "Airport-ready rides",
      easyScheduling: "Easy scheduling",
      driverImageAlt: "Private airport transportation driver",
      driverProfile: "Driver profile",
      airportTransportation: "airport transportation",
      serviceDetails: "Service details",
      coverage: "Coverage",
      coverageDescriptionJoiner: "hotels, homes, and",
      tripTypes: "Trip types",
      tripTypesDescription:
        "Hotel to airport, airport to hotel, and private transfer requests.",
      bookingStatus: "Booking status",
      bookingStatusDescription:
        "This demo collects appointment details locally. No real booking is sent.",
      schedulingPreview: "Acuity Scheduling Preview",
      scheduleTitle: "Schedule your airport ride",
      frontendOnly: "Frontend-only",
      fullName: "Full name",
      email: "Email",
      phone: "Phone",
      tripType: "Trip type",
      hotelToAirport: "Hotel to airport",
      airportToHotel: "Airport to hotel",
      pickupLocation: "Pickup location",
      dropoffLocation: "Dropoff location",
      date: "Date",
      time: "Time",
      passengers: "Passengers",
      successMessage:
        "Appointment request preview created. In production, this would be submitted through Acuity Scheduling.",
      requestAppointment: "Request appointment",
      backToDashboard: "Back to dashboard",
    },
    comingSoon: {
      badge: "Coming soon",
      standardTitle: "Standard funnel",
      coupleTitle: "Couples funnel",
      seniorsTitle: "Seniors funnel",
      titleSuffix: "is coming soon",
      description:
        "This audience page is still being prepared. The women-focused funnel is the complete live experience right now.",
      buttonLabel: "Go to the women page",
    },
    adminPage: {
      badge: "Super admin",
      title: "Business owner operations",
      subtitle:
        "Maintain the full QuitTheApp owner network: customer websites, launch status, DIY/DFY plan mix, Acuity setup status, DFY fulfillment, and support load.",
      viewDemoOwnerSite: "View demo owner site",
      platformSettings: "Platform settings",
      totalPurchased: "Total purchased",
      totalPurchasedHelper: "Owners who completed checkout",
      diyOwners: "DIY owners",
      diyOwnersHelper: "Self-guided launch customers",
      dfyOwners: "DFY owners",
      dfyOwnersHelper: "Done-for-you delivery customers",
      needsAttention: "Needs attention",
      needsAttentionHelper: "support tickets open",
      ownerDirectory: "Owner directory",
      ownerDirectoryDescription:
        "Search, audit, and monitor each transportation business owner.",
      searchOwners: "Search owners",
      filterByPlan: "Filter by plan",
      allPlans: "All plans",
      business: "Business",
      market: "Market",
      plan: "Plan",
      status: "Status",
      website: "Website",
      acuity: "Acuity",
      launch: "Launch",
      domain: "Domain",
      launched: "launched",
      dfyQueue: "DFY fulfillment queue",
      dfyQueueDescription: "Internal delivery work for launch packages.",
      due: "Due",
      websiteAcuitySetup: "Website and Acuity setup",
      websiteAcuityDescription:
        "Operational readiness for owner customer pages. Bookings remain inside Acuity.",
      liveWebsites: "Live websites",
      liveWebsitesDescription:
        "Customer-facing owner sites currently marked live.",
      acuityConnected: "Acuity connected",
      acuityConnectedDescription:
        "Owners with scheduling connected or ready for handoff.",
      siteLabel: "Site",
      acuityLabel: "Acuity",
      simulatorTitle: "Frontend-only admin simulator",
      simulatorDescription:
        "This dashboard is prepared for future backend operations. Today it uses typed mock data plus the current demo owner profile from Redux. No API calls, authentication, billing operations, booking counts, or real scheduling actions are performed. Customer appointments are assumed to live in Acuity.",
      readyForBackend: "Ready for backend integration",
      statusLabels: {
        active: "active",
        onboarding: "onboarding",
        attention: "attention",
        paused: "paused",
        not_started: "not started",
        in_progress: "in progress",
        blocked: "blocked",
        delivered: "delivered",
        draft: "draft",
        live: "live",
        needs_review: "needs review",
        not_connected: "not connected",
        connected: "connected",
      },
    },
    notFound: {
      label: "404",
      title: "Page not found",
      description: "This route is not part of the QuitTheApp launch flow.",
      action: "Back to women funnel",
    },
  },
  es: {
    common: {
      appName: "QuitTheApp",
      languageEnglish: "Ingles",
      languageSpanish: "Espanol",
      toggleLanguage: "Cambiar idioma",
      primaryNavigation: "Navegacion principal",
      mobileNavigation: "Navegacion movil",
      homeLabel: "Inicio de QuitTheApp",
      continue: "Continuar",
      back: "Volver",
      next: "Siguiente",
      close: "Cerrar",
      resetDemo: "Reiniciar demo",
    },
    navigation: {
      home: "Inicio",
      whatsIncluded: "Lo que incluye",
      pricing: "Precios",
      successStories: "Historias de exito",
      faq: "FAQ",
      contact: "Contacto",
      admin: "Admin",
      dashboard: "Panel",
      startedBusiness: "Iniciar el negocio",
      openMenu: "Abrir menu",
      closeMenu: "Cerrar menu",
    },
    checkout: {
      title: "Pago simulado",
      secureCheckout: "Pago seguro",
      stripeInspiredBadge: "Demo inspirado en Stripe",
      baseProductName: "Sistema de lanzamiento QuitTheApp",
      baseProductDescription: "Simulacion frontend del producto base de $495.",
      dfyUpgradeName: "Mejora Done-For-You",
      dfyUpgradeDescription:
        "Agrega la ruta DFY de $245 para cambiar el panel a una entrega guiada.",
      oneTimeFeeLabel: "Pago unico de $495",
      optionalUpgradeLabel: "Mejora opcional de $245",
      subtotalLabel: "Subtotal",
      upgradeLabel: "Mejora",
      totalLabel: "Total",
      completePurchase: "Completar pago simulado",
      cancel: "Cancelar",
      securePaymentNotice:
        "No se procesara ningun pago real. Esta es una demo frontend con apariencia segura.",
      closeCheckout: "Cerrar pago",
      successTitle: "Compra completada",
      successMessage: "Tu sistema de lanzamiento QuitTheApp esta listo.",
      preparingWorkspace: "Preparando tu espacio de trabajo...",
    },
    marketing: {
      launchCta: "Lanzar mi negocio",
      oneTimePayment: "Pago unico",
      whatsIncluded: "Lo que incluye",
      pricingIncludes: [
        "Blueprint de lanzamiento del negocio",
        "Plantillas de transporte al aeropuerto",
        "Guiones de marketing",
        "Recursos para conseguir clientes",
        "Panel de progreso",
        "Guia para sistema de reservas",
        "Soporte humano",
      ],
      faqTitle: "Preguntas frecuentes",
      faqs: [
        {
          question: "Que es QuitTheApp?",
          answer:
            "QuitTheApp es un concepto de PWA frontend para ayudar a conductores a lanzar un negocio independiente de transporte.",
        },
        {
          question: "Para quien es?",
          answer:
            "Es para conductores que quieren clientes directos, posicionamiento claro y un negocio mas alla de las apps de viajes.",
        },
        {
          question: "Es una suscripcion?",
          answer:
            "El producto base planeado se presenta como un pago unico en esta interfaz de funnel.",
        },
        {
          question: "Necesito experiencia tecnica?",
          answer:
            "No. El sistema guia la configuracion del negocio, ofertas, contacto y decisiones de reservas paso a paso.",
        },
        {
          question: "Cuanto tarda la configuracion?",
          answer:
            "Depende de tu mercado y preparacion, pero el flujo esta pensado para organizar lo esencial rapidamente.",
        },
        {
          question: "Que es la opcion Done-For-You?",
          answer:
            "La mejora opcional representa soporte adicional de configuracion. El pago y la entrega aun no estan implementados.",
        },
      ],
    },
    funnelPage: {
      hero: {
        headlinePrefix: "Lanza un",
        headlineHighlight: "Negocio enfocado en mujeres",
        headlineSuffix:
          "de transporte privado al aeropuerto basado en confianza.",
        subtitle:
          "QuitTheApp ayuda a mujeres operadoras a iniciar un negocio de transporte al aeropuerto con reservas directas y el respaldo de una plataforma confiable.",
        imageAlts: [
          "Conductora sentada en un auto",
          "Conductora de transporte al aeropuerto sonriendo",
          "Operadoras de transporte en el aeropuerto",
          "Conductora privada lista para servicio al aeropuerto",
          "Conductora saludando a pasajeros desde un auto",
        ],
        ctaPrefix: "Lanzar mi negocio",
      },
      customerBuilding: {
        titlePrefix: "Todo lo que necesitas para empezar a",
        titleHighlight: "construir tus propios",
        titleSuffix: "clientes",
        subtitle:
          "Accede a las herramientas, sistemas y soporte que necesitas para atraer clientes, crecer tu marca y construir un negocio exitoso de transporte al aeropuerto.",
        cards: [
          {
            title: "Lanzamiento rapido",
            description:
              "Lanza tu negocio de transporte al aeropuerto con sistemas probados.",
            imageAlt:
              "Ilustracion de selector de fecha para lanzamiento rapido",
          },
          {
            title: "Centro de adquisicion de clientes™",
            description:
              "Obtén herramientas, guiones y recursos de marketing para atraer y retener clientes.",
            imageAlt: "Ilustracion del centro de adquisicion de clientes",
          },
          {
            title: "Pagina inicial personalizada™",
            description:
              "Muestra a los viajeros por que tu negocio destaca y genera confianza de inmediato.",
            imageAlt:
              "Ilustracion de herramientas para pagina inicial personalizada",
          },
          {
            title: "Motor de pasajeros recurrentes",
            description:
              "Motiva a clientes recurrentes y aumenta reservas a largo plazo.",
            imageAlt: "Ilustracion del flujo de pasajeros recurrentes",
          },
        ],
      },
      ownBusiness: {
        titlePrefix: "Por que construir tu",
        titleHighlight: "propio",
        titleSuffix: "negocio?",
        subtitle:
          "Construye una marca confiable, conserva mas ingresos y crea relaciones duraderas con tus propios clientes.",
        relyingPrefix: "Dependiendo de",
        relyingHighlight: "apps",
        womenHighlight: "Mujeres",
        womenSuffix: "-Negocio enfocado",
        imageAlt: "Conductora de transporte privado enfocado en mujeres",
        appLimitations: [
          "Comisiones",
          "Propiedad limitada del cliente",
          "Sin control de marca",
          "Demanda inconsistente",
        ],
        businessBenefits: [
          "Construye tus propios clientes",
          "Pasajeros recurrentes y referidos",
          "Define tus propias tarifas",
          "Presencia de marca profesional",
          "Crecimiento flexible del negocio",
        ],
      },
      womenOperators: {
        titlePrefix: "Por que las mujeres operadoras pueden",
        titleHighlight: "ganar",
        subtitle:
          "Los negocios de transporte liderados por mujeres generan mas confianza, entregan un servicio excepcional y crean relaciones duraderas con clientes.",
        imageAlts: [
          "Conductora sonriendo desde el asiento delantero",
          "Conductora de aeropuerto usando cinturon de seguridad",
          "Mujer conduciendo de noche",
          "Conductora mirando atras desde el asiento del conductor",
        ],
        reasons: [
          {
            title: "Confiabilidad",
            description:
              "Los clientes valoran un servicio confiable y profesional.",
          },
          {
            title: "Seguridad personal",
            description:
              "Las viajeras suelen preferir transporte confiable operado por mujeres.",
          },
          {
            title: "Alta demanda",
            description:
              "Un mercado en crecimiento busca transporte personalizado al aeropuerto.",
          },
        ],
        tagRows: [
          [
            "Controla tu lista de clientes",
            "Inicia tu negocio en unos 30 dias",
            "Crea clientes recurrentes",
          ],
          [
            "Conserva mas ingresos",
            "Opera de forma independiente",
            "Crea una marca confiable",
          ],
        ],
      },
      howWorks: {
        titlePrefix: "Como",
        titleHighlight: "QuitTheApp",
        titleSuffix: "funciona",
        subtitle: "Encuentra tu ruta de lanzamiento en tres pasos simples",
        steps: [
          {
            title: "Obtén acceso",
            description: "Recibe tu guia y recursos iniciales.",
          },
          {
            title: "Construye tu negocio",
            description: "Lanza tu sistema de reservas y tu marca.",
          },
          {
            title: "Consigue clientes",
            description:
              "Empieza a atraer viajeros y generar reservas recurrentes.",
          },
        ],
      },
      faqSubtitle: "Encuentra respuestas claras a preguntas comunes de pago.",
      faqCategoryTitle: "Preguntas generales",
      pricing: {
        titlePrefix: "Elige el",
        titleHighlight: "plan para",
        titleSecondHighlight: "tu",
        titleSuffix: "viaje exclusivo",
        subtitle:
          "Precios flexibles disenados para tus metas, agenda y presupuesto.",
        description:
          "Este plan incluye acceso al panel de lanzamiento, panel de operador, recursos completos de capacitacion, hosting, soporte humano y actualizaciones de por vida; todo lo que necesitas para empezar, administrar tus operaciones y mantenerte al dia.",
      },
      stories: {
        titleHighlight: "Mujeres operadoras",
        titleFirstLineSuffix: "estan",
        titleSecondLine: "construyendo negocios reales",
        subtitle:
          "Descubre como mujeres emprendedoras crean marcas confiables, atraen clientes leales y hacen crecer negocios exitosos de transporte.",
        ratingLabel: "calificacion de 5 estrellas",
        items: [
          {
            location: "Knoxville, TN",
            name: "Annette Black",
            quote:
              "El sistema es simple, profesional y funciona. Defino mi horario y ahora conozco excelentes personas todos los dias.",
          },
          {
            location: "Austin, TX",
            name: "Maya Collins",
            quote:
              "Por fin tengo un negocio que se siente mio. Las herramientas de lanzamiento me ayudaron a verme organizada desde el primer dia.",
          },
          {
            location: "Tampa, FL",
            name: "Sofia Ramirez",
            quote:
              "Las plantillas hicieron mas facil explicar mi servicio al aeropuerto y empezar a construir clientes recurrentes.",
          },
          {
            location: "Charlotte, NC",
            name: "Erica Stone",
            quote:
              "Deje de adivinar que hacer despues. Los pasos me dieron una ruta clara para promover mi propia marca de transporte.",
          },
          {
            location: "Phoenix, AZ",
            name: "Nina Patel",
            quote:
              "Esto me ayudo a presentarme profesionalmente y atraer pasajeros que valoran transporte privado confiable.",
          },
        ],
      },
      footerCta: {
        title: "Lista para lanzar?",
        subtitle:
          "Empieza hoy a construir tu negocio de transporte al aeropuerto enfocado en mujeres.",
        ctaPrefix: "Lanzar mi negocio",
      },
      footer: {
        ariaLabel: "Navegacion del pie de pagina",
        links: [
          "Politica de privacidad",
          "Terminos de servicio",
          "Soporte",
          "Contacto",
        ],
        copyright:
          "© 2026 QuitTheApp. Todos los derechos reservados. Trabaja para ti. Conserva lo que ganas.",
      },
    },
    onboarding: {
      title: "Cuentanos sobre tu lanzamiento de transporte.",
      subtitle:
        "Este formulario prepara tu experiencia de panel del lado del cliente.",
      businessSetupTitle: "Configuracion del negocio",
      progressPurchase: "Compra",
      progressBusinessSetup: "Configuracion del negocio",
      completedLabel: "Completado",
      currentLabel: "Actual",
      businessInformationTitle: "Informacion del negocio",
      headshotUploadTitle: "Carga de foto",
      summaryTitle: "Resumen de lanzamiento",
      summaryName: "Nombre",
      summaryTargetMarket: "Mercado objetivo",
      summaryRegionalAirports: "Aeropuertos regionales",
      summaryPreferredDomain: "Dominio preferido",
      summaryHeadshot: "Vista previa de foto",
      uploadButton: "Elegir imagen",
      replaceImage: "Reemplazar imagen",
      uploadPlaceholder:
        "JPEG, PNG o WEBP. La vista previa queda solo en este dispositivo.",
      fullNameLabel: "Nombre completo",
      fullNamePlaceholder: "Conductor de prueba",
      targetCityLabel: "Ciudad objetivo",
      targetCityPlaceholder: "Austin",
      regionalAirportsLabel: "Aeropuertos regionales",
      regionalAirportsPlaceholder: "AUS, SAT",
      preferredDomainLabel: "Dominio preferido",
      preferredDomainPlaceholder: "transportedeprueba.com",
      headshotLabel: "URL de vista previa de foto",
      headshotHelper:
        "Opcional por ahora. Mas adelante puedes usar una URL blob o una ruta de imagen.",
      initializeDashboard: "Inicializar panel",
      validationRequired: "Este campo es obligatorio.",
      validationPreferredDomain: "Usa solo letras, numeros, guiones o puntos.",
      validationImageType: "Elige una imagen JPEG, PNG o WEBP.",
      emptySummaryValue: "Aun no proporcionado",
    },
    dashboard: {
      title: "Panel de lanzamiento",
      subtitle:
        "Sigue tu ruta de lanzamiento del lado del cliente y tus proximos pasos.",
      diyPathTitle: "Modulos de lanzamiento DIY",
      dfyPathTitle: "Pipeline de entrega Done-For-You",
      personalizedSiteTitle: "Sitio personalizado para clientes",
      personalizedSiteDescription:
        "Tu pagina publica de reservas esta disponible en",
      viewCustomerPage: "visita mi página",
      progressLabel: "Progreso del lanzamiento",
      motivationalMessage:
        "Buen progreso. Completa todos los modulos para lanzar tu negocio.",
      resourcesLabel: "Recursos",
      statusNotStarted: "No iniciado",
      statusInProgress: "En progreso",
      statusComplete: "Completo",
    },
    personalizedPage: {
      previewBadge: "Vista previa del sitio del cliente",
      fallbackDriverName: "Tu conductor privado al aeropuerto",
      fallbackMarket: "tu ciudad",
      fallbackAirports: "aeropuertos regionales",
      heroEyebrow: "Transporte privado al aeropuerto en",
      heroTitlePrefix: "Reserva un viaje confiable con",
      heroTitleSuffix: ".",
      heroDescriptionPrefix:
        "Transporte profesional de hotel al aeropuerto y del aeropuerto al hotel para",
      heroDescriptionSuffix:
        "Elige tu ruta, hora y cantidad de pasajeros abajo.",
      trustedService: "Servicio local confiable",
      airportReadyRides: "Viajes listos para aeropuerto",
      easyScheduling: "Reserva sencilla",
      driverImageAlt: "Conductora de transporte privado al aeropuerto",
      driverProfile: "Perfil del conductor",
      airportTransportation: "transporte al aeropuerto",
      serviceDetails: "Detalles del servicio",
      coverage: "Cobertura",
      coverageDescriptionJoiner: "hoteles, hogares y",
      tripTypes: "Tipos de viaje",
      tripTypesDescription:
        "Hotel al aeropuerto, aeropuerto al hotel y solicitudes de traslado privado.",
      bookingStatus: "Estado de reserva",
      bookingStatusDescription:
        "Esta demo recopila los detalles de la cita localmente. No se envia una reserva real.",
      schedulingPreview: "Vista previa de Acuity Scheduling",
      scheduleTitle: "Programa tu viaje al aeropuerto",
      frontendOnly: "Solo frontend",
      fullName: "Nombre completo",
      email: "Correo electronico",
      phone: "Telefono",
      tripType: "Tipo de viaje",
      hotelToAirport: "Hotel al aeropuerto",
      airportToHotel: "Aeropuerto al hotel",
      pickupLocation: "Lugar de recogida",
      dropoffLocation: "Lugar de destino",
      date: "Fecha",
      time: "Hora",
      passengers: "Pasajeros",
      successMessage:
        "Vista previa de solicitud creada. En produccion, se enviaria mediante Acuity Scheduling.",
      requestAppointment: "Solicitar cita",
      backToDashboard: "Volver al panel",
    },
    comingSoon: {
      badge: "Proximamente",
      standardTitle: "Funnel estandar",
      coupleTitle: "Funnel para parejas",
      seniorsTitle: "Funnel para seniors",
      titleSuffix: "estara disponible pronto",
      description:
        "Esta pagina de audiencia todavia se esta preparando. El funnel enfocado en mujeres es la experiencia completa disponible ahora.",
      buttonLabel: "Ir a la pagina de mujeres",
    },
    adminPage: {
      badge: "Super admin",
      title: "Operaciones de propietarios",
      subtitle:
        "Mantiene toda la red de propietarios de QuitTheApp: sitios de clientes, estado de lanzamiento, mezcla de planes DIY/DFY, estado de Acuity, entrega DFY y carga de soporte.",
      viewDemoOwnerSite: "Ver sitio demo del propietario",
      platformSettings: "Configuracion de plataforma",
      totalPurchased: "Compras totales",
      totalPurchasedHelper: "Propietarios que completaron el pago",
      diyOwners: "Propietarios DIY",
      diyOwnersHelper: "Clientes de lanzamiento autoguiado",
      dfyOwners: "Propietarios DFY",
      dfyOwnersHelper: "Clientes con entrega Done-for-You",
      needsAttention: "Requiere atencion",
      needsAttentionHelper: "tickets de soporte abiertos",
      ownerDirectory: "Directorio de propietarios",
      ownerDirectoryDescription:
        "Busca, audita y monitorea cada propietario de negocio de transporte.",
      searchOwners: "Buscar propietarios",
      filterByPlan: "Filtrar por plan",
      allPlans: "Todos los planes",
      business: "Negocio",
      market: "Mercado",
      plan: "Plan",
      status: "Estado",
      website: "Sitio web",
      acuity: "Acuity",
      launch: "Lanzamiento",
      domain: "Dominio",
      launched: "lanzado",
      dfyQueue: "Cola de entrega DFY",
      dfyQueueDescription:
        "Trabajo interno de entrega para paquetes de lanzamiento.",
      due: "Vence",
      websiteAcuitySetup: "Configuracion de sitio web y Acuity",
      websiteAcuityDescription:
        "Preparacion operativa para paginas de clientes. Las reservas permanecen en Acuity.",
      liveWebsites: "Sitios activos",
      liveWebsitesDescription:
        "Sitios visibles para clientes marcados como activos.",
      acuityConnected: "Acuity conectado",
      acuityConnectedDescription:
        "Propietarios con reservas conectadas o listas para entrega.",
      siteLabel: "Sitio",
      acuityLabel: "Acuity",
      simulatorTitle: "Simulador admin solo frontend",
      simulatorDescription:
        "Este panel esta preparado para futuras operaciones backend. Hoy usa datos mock tipados mas el perfil demo actual desde Redux. No se realizan llamadas API, autenticacion, operaciones de cobro, conteos de reservas ni acciones reales de agenda. Se asume que las citas de clientes viven en Acuity.",
      readyForBackend: "Listo para integracion backend",
      statusLabels: {
        active: "activo",
        onboarding: "onboarding",
        attention: "atencion",
        paused: "pausado",
        not_started: "no iniciado",
        in_progress: "en progreso",
        blocked: "bloqueado",
        delivered: "entregado",
        draft: "borrador",
        live: "activo",
        needs_review: "requiere revision",
        not_connected: "no conectado",
        connected: "conectado",
      },
    },
    notFound: {
      label: "404",
      title: "Pagina no encontrada",
      description:
        "Esta ruta no forma parte del flujo de lanzamiento de QuitTheApp.",
      action: "Volver al funnel estandar",
    },
  },
};
