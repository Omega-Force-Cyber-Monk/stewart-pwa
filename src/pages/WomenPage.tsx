import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "../lib/cn";
import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronRight,
  ClipboardList,
  Heart,
  Lock,
  RefreshCcw,
  Rocket,
  ShieldCheck,
  Star,
  TrendingUp,
  User,
  Users,
} from "lucide-react";
import { PageContainer } from "../components/layout/PageContainer";
import { ProfileDropdown } from "../components/ProfileDropdown";
import { PricingModal } from "../components/PricingModal";
import { useAppDispatch, useAppSelector } from "../hooks/storeHooks";
import { logOut } from "../store/features/auth/authSlice";
import { useLogoutUserMutation } from "../store/api/Auth/auth.api";
import womenBannerImage from "../assets/womenBannerImage.png";
import womenMiddleSection from "../assets/womenMiddleSection.png";
import womenLogo from "../assets/logo_women.png";
import jessicaImage from "../assets/Women_Page_Jessica.jpg";
import { PaymentBadges } from "../components/common/PaymentBadges";
import womenHero from "../assets/womenHero.png";
import upsellKit from "../assets/Women_Only_Brand_Upsell_Kit.png";

export default function WomenPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  // Auto-open the pricing modal when redirected here with ?showPricing=true.
  // LoginPage only sends non-active riders here, and the modal closes on
  // explicit user action — so no status re-check is needed at render time.
  const [showPricingModal, setShowPricingModal] = useState(
    () => searchParams.get("showPricing") === "true"
  );

  // Clear the ?showPricing=true query param once considered
  useEffect(() => {
    if (searchParams.get("showPricing") === "true") {
      setSearchParams({}, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const openPricingModal = () => setShowPricingModal(true);

  return (
    <>
      {showPricingModal && (
        <PricingModal onClose={() => setShowPricingModal(false)} upsellKitImageSrc={upsellKit} />
      )}
      <Navbar openPricingModal={openPricingModal} />
      <HeroBanner openPricingModal={openPricingModal} />
      <BusinessBuiltAroundYourLifeSection />
      <WhyWinSection />
      <OneClientFlowSection />
      <ProvenModelSection />
      <HowItWorksAndFaqSection />
      <FooterCTASection openPricingModal={openPricingModal} />
    </>
  );
}

function HeroBanner({ openPricingModal }: { openPricingModal: () => void }) {
  const { accessToken } = useAppSelector((state) => state.auth);

  return (
    <div className="relative w-full data-exit-intent-hero min-h-[100svh] lg:min-h-[90svh] pt-[clamp(64px,8vw,80px)] flex flex-col justify-between overflow-hidden bg-[#0b0f19]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={womenBannerImage}
          alt="Launch a Women-Focused Private Airport Business"
          className="hidden lg:block w-full h-full object-cover object-[75%_top] sm:object-[80%_top] lg:object-[85%_center] pointer-events-none opacity-90"
        />
        {/* Mobile Background Image */}
        <img
          src={womenHero}
          alt="Phone concept mobile"
          className="block lg:hidden absolute inset-0 w-full h-full object-cover object-[center_top] pointer-events-none"
        />
        {/* Mobile/tablet legibility overlay — the hero text sits on top of the photo */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19]/85 via-[#0b0f19]/45 to-[#0b0f19]/30 lg:bg-gradient-to-r lg:from-[#0b0f19] lg:via-[#0b0f19]/80 lg:to-[#0b0f19]/30"></div>
      </div>

      {/* Main Content dictating height */}
      <div className="relative z-10 w-full flex-grow flex pb-8">
        <PageContainer size="full" className="flex flex-col h-full">
          <div className="flex flex-col lg:flex-row w-full justify-between items-center lg:items-stretch flex-grow gap-[clamp(1.5rem,4vw,3rem)]">
            {/* Left Side Content */}
            <div className="w-full max-w-[clamp(280px,40vw,672px)] text-left z-10 self-center">
              <h1 className="text-[clamp(2rem,4vw,3.25rem)] font-bold text-white leading-[1.1] mb-[clamp(1rem,1.5vw,1.25rem)] tracking-tight text-balance">
                Build Something <br />
                of Your Own. <br />
                <span className="text-[#f42661]">On Your Schedule.</span>
              </h1>

              <p className="text-[clamp(1rem,1.35vw,1.125rem)] text-slate-200 mb-[clamp(1.5rem,2vw,2rem)] max-w-[clamp(280px,38vw,576px)] leading-relaxed text-pretty">
                Turn the vehicle you already own into the starting point for a flexible, profitable private transportation business built around your life, your relationships, and your future.
              </p>

              <ul className="space-y-[clamp(0.5rem,0.8vw,0.625rem)] mb-[clamp(1.5rem,2vw,2rem)]">
                {[
                  "Work around your life, not the other way around",
                  "Build relationships with great clients",
                  "Get repeat bookings and referrals",
                  "Create a business you own and control",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center text-slate-100 text-[clamp(0.875rem,1.1vw,1.125rem)]"
                  >
                    <div className="rounded-full bg-[#f42661] flex items-center justify-center shrink-0 mr-[clamp(0.5rem,0.8vw,0.75rem)] w-[clamp(1.25rem,1.8vw,1.5rem)] h-[clamp(1.25rem,1.8vw,1.5rem)]">
                      <Check className="text-white w-[60%] h-[60%]" strokeWidth={3} />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {accessToken ? (
                <button
                  onClick={openPricingModal}
                  className="cursor-pointer bg-[#f42661] hover:bg-[#d91950] text-white font-bold py-[clamp(0.875rem,1.2vw,1rem)] px-[clamp(1.25rem,2vw,2rem)] rounded-[clamp(0.375rem,0.5vw,0.5rem)] transition-colors shadow-lg shadow-[#f42661]/30 flex items-center justify-between group w-full sm:w-auto text-[clamp(0.875rem,1.1vw,1.125rem)] min-h-[52px]"
                >
                  <span className="text-left leading-snug">
                    Start My Transportation Business™ — $495
                  </span>
                  <div className="bg-white rounded-full p-[clamp(0.2rem,0.3vw,0.3rem)] ml-[clamp(0.75rem,1vw,1rem)] group-hover:translate-x-1 transition-transform shrink-0">
                    <ChevronRight className="text-[#f42661] w-[clamp(1.1rem,1.2vw,1.3rem)] h-[clamp(1.1rem,1.2vw,1.3rem)]" />
                  </div>
                </button>
              ) : (
                <button
                  onClick={openPricingModal}
                  className="cursor-pointer bg-[#f42661] hover:bg-[#d91950] text-white font-bold py-[clamp(0.875rem,1.2vw,1rem)] px-[clamp(1.25rem,2vw,2rem)] rounded-[clamp(0.375rem,0.5vw,0.5rem)] transition-colors shadow-lg shadow-[#f42661]/30 flex items-center justify-between group w-full sm:w-auto text-[clamp(0.875rem,1.1vw,1.125rem)] min-h-[52px]"
                >
                  <span className="text-left leading-snug">
                    Start My Transportation Business™ — $495
                  </span>
                  <div className="bg-white rounded-full p-[clamp(0.2rem,0.3vw,0.3rem)] ml-[clamp(0.75rem,1vw,1rem)] group-hover:translate-x-1 transition-transform shrink-0">
                    <ChevronRight className="text-[#f42661] w-[clamp(1.1rem,1.2vw,1.3rem)] h-[clamp(1.1rem,1.2vw,1.3rem)]" />
                  </div>
                </button>
              )}
            </div>

            {/* Right Side Trust Badge — stacks below the content on mobile, side-by-side on lg */}
            <div className="w-full lg:w-[45%] flex justify-center lg:justify-end self-end z-10">
              <div className="flex bg-white rounded-[clamp(1rem,1.5vw,1.5rem)] p-[clamp(0.9rem,1.5vw,1.5rem)] shadow-2xl w-full max-w-[clamp(225px,26vw,375px)] flex-col items-center text-center">
                <div className="flex items-center gap-[clamp(0.75rem,1.5vw,1.5rem)] mb-[clamp(1rem,2vw,2rem)] w-full justify-center lg:justify-start">
                  <ShieldCheck
                    className="text-[#f42661] w-[clamp(2.5rem,4.5vw,5.25rem)] h-[clamp(2.5rem,4.5vw,5.25rem)] shrink-0"
                    strokeWidth={1.5}
                  />
                  <div className="text-left">
                    <h3 className="text-[#0b0f19] font-bold text-[clamp(0.95rem,1.35vw,1.3rem)] leading-tight">
                      Trusted.
                      <br />
                      Professional.
                      <br />
                      Women-Focused.
                    </h3>
                  </div>
                </div>

                <p className="text-[#f42661] font-bold text-[clamp(0.95rem,1.35vw,1.3rem)] mt-[clamp(0.25rem,0.5vw,0.5rem)]">
                  Built for Women Operators.
                </p>
              </div>
            </div>
          </div>
        </PageContainer>
      </div>
    </div>
  );
}

function BusinessBuiltAroundYourLifeSection() {
  const features = [
    {
      icon: CalendarDays,
      title: "Set Your Schedule",
      description: "Work the days and hours that fit your family, responsibilities, and lifestyle.",
    },
    {
      icon: User,
      title: "Choose Your Clients",
      description: "Accept the types of rides you want and build relationships you enjoy.",
    },
    {
      icon: TrendingUp,
      title: "Start Small, Grow Over Time",
      description: "Begin with your existing network and let repeat bookings and referrals grow your business.",
    },
    {
      icon: Heart,
      title: "Own Your Business",
      description: "You keep your clients, your reputation, and 100% of the fares.",
    },
  ];

  return (
    <section className="bg-white py-1 border-b border-slate-100" id="business-built-around-your-life">
      <PageContainer size="full">
        <div className="text-center mb-10">
          <h2 className="text-[clamp(1.375rem,3vw,1.75rem)] font-bold text-[#0b0f19] tracking-tight">
            A Business Built Around Your Life
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch mb-8 lg:mb-10">
          {/* Left: Image with Overlay */}
          <div className="w-full lg:w-[45%] xl:w-1/2 relative min-h-[300px] lg:min-h-0 flex flex-col justify-end mb-6 lg:mb-0">
            <div className="absolute inset-0 rounded-[1.5rem] overflow-hidden">
              <img
                src={womenMiddleSection}
                alt="Woman at airport"
                className="w-full h-full object-cover object-center"
              />
            </div>
            {/* Overlay Box */}
            <div className="relative z-10 bg-[#0b0f19] p-6 sm:p-8 ml-4 sm:ml-6 translate-y-12 sm:translate-y-8 rounded-2xl max-w-sm sm:max-w-md w-[90%] shadow-xl">
              <h3 className="text-white text-lg sm:text-xl font-bold leading-snug mb-3">
                <span className="text-[#f42661] text-3xl font-serif leading-none mr-2">“</span>
                What if earning more didn't have to mean seeing your kids less?
              </h3>
              <p className="text-slate-300 text-sm font-medium leading-relaxed">
                Build a business that works around your life—not the other way around.
              </p>
            </div>
          </div>

          {/* Right: Features Grid */}
          <div className="w-full lg:w-[55%] xl:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-x-8 lg:gap-y-10 py-4">
            {features.map((feature, idx) => (
              <div key={idx} className="flex flex-col items-start min-w-0">
                <div className="mb-4">
                  <feature.icon
                    className="w-8 h-8 text-[#f42661]"
                    strokeWidth={1.5}
                  />
                </div>
                <h4 className="text-[15px] font-bold text-[#0b0f19] mb-2 leading-snug">
                  {feature.title}
                </h4>
                <p className="text-slate-600 leading-relaxed text-[13px]">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Callout */}
        <div
          className="border shadow-sm rounded-xl p-5 sm:p-6 flex items-center justify-center gap-4 sm:gap-6 mx-auto max-w-4xl"
          style={{
            backgroundColor: '#fef4f7',
            borderColor: 'rgba(244, 38, 97, 0.1)'
          }}
        >
          <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-[#f42661] shrink-0" strokeWidth={1.5} />
          <p className="text-[#0b0f19] text-sm sm:text-[15px] font-medium leading-relaxed">
            Many women prefer <strong className="text-[#f42661] font-bold">a woman driver</strong> when they have the choice.<br className="hidden sm:block" /> That preference can become your advantage.
          </p>
        </div>
      </PageContainer>
    </section>
  );
}

function WhyWinSection() {
  const reasons = [
    {
      icon: ShieldCheck,
      title: "Greater Comfort & Trust",
      description: "Many women feel more comfortable booking with another woman, especially for early mornings, late nights, or unfamiliar trips.",
    },
    {
      icon: Star,
      title: "A More Personal Experience",
      description: "You build real relationships through dependable service, great communication, and personal attention.",
    },
    {
      icon: Users,
      title: "Family & Senior Referrals",
      description: "Happy clients refer daughters, mothers, friends, seniors, and family members who value a trusted woman driver.",
    },
    {
      icon: RefreshCcw,
      title: "Repeat Transportation Clients",
      description: "A safe, professional experience turns one ride into repeat bookings across many and referrals.",
    },
  ];

  return (
    <section className="bg-white py-1">
      <PageContainer size="full">
        <h2 className="text-[clamp(1.25rem,2.5vw,1.75rem)] font-bold text-[#0b0f19] text-center mb-10 lg:mb-14 text-balance">
          Why Women Travelers Choose Women Drivers
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6 w-full">
          {reasons.map((reason, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center px-4 relative min-w-0"
            >
              <reason.icon
                className="w-10 h-10 text-[#f42661] mb-4 shrink-0"
                strokeWidth={1.5}
              />
              <h4 className="font-bold text-[#0b0f19] text-[15px] leading-snug mb-3">
                {reason.title}
              </h4>
              <p className="text-slate-600 text-[13px] leading-relaxed">
                {reason.description}
              </p>

              {/* Vertical Divider for Desktop */}
              {idx < reasons.length - 1 && (
                <div className="hidden lg:block absolute right-[-12px] top-[10%] bottom-[10%] w-px bg-slate-100"></div>
              )}
            </div>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}

function OneClientFlowSection() {
  const steps = [
    { icon: User, label: "First\nClient" },
    { icon: Heart, label: "Great\nExperience" },
    { icon: CalendarDays, label: "Repeat\nBooking" },
    { icon: Users, label: "Referral" },
    { icon: User, label: "New\nClient", plus: true },
    { icon: TrendingUp, label: "Growing\nBusiness" },
  ];

  return (
    <section
      className="py-1 border"
      style={{
        backgroundColor: '#fef4f7',
        borderColor: 'rgba(244, 38, 97, 0.1)'
      }}
    >
      <PageContainer size="full">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 py-8">
          {/* Left: Text Content */}
          <div className="w-full lg:w-1/3 flex flex-col items-center lg:items-start text-center lg:text-left">
            <h3 className="text-xl sm:text-2xl font-bold text-[#f42661] mb-4 leading-tight w-full">
              One Client Can Grow Your Business
            </h3>
            <p className="text-slate-700 text-sm leading-relaxed w-full">
              Trust leads to repeat bookings. Repeat bookings lead to referrals. Referrals build the business that gives you freedom, income, and independence.
            </p>
          </div>

          {/* Right: Flow Diagram */}
          <div className="w-full lg:w-2/3 flex flex-col items-center w-full">
            <div className="flex flex-row flex-wrap justify-center sm:flex-nowrap items-center w-full gap-y-8 gap-x-2 sm:gap-x-4">
              {steps.map((step, idx) => (
                <div key={idx} className="flex items-center">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-[#f42661]/30 flex items-center justify-center bg-white shadow-sm mb-3 relative">
                      <step.icon className="w-5 h-5 sm:w-7 sm:h-7 text-[#f42661]" strokeWidth={1.5} />
                      {step.plus && (
                        <span className="absolute -top-1 -right-2 text-[#f42661] font-bold text-sm">+</span>
                      )}
                    </div>
                    <span className="text-[#0b0f19] font-bold text-[11px] sm:text-[13px] leading-tight whitespace-pre-line">
                      {step.label}
                    </span>
                  </div>
                  {idx < steps.length - 1 && (
                    <div className="mx-2 sm:mx-4 flex items-center shrink-0 -mt-8">
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#f42661]/40" strokeWidth={2} />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-10 lg:mt-12 text-center w-full">
              <span className="text-[#f42661] text-2xl sm:text-3xl font-serif italic tracking-wide opacity-90">
                Relationships create opportunity.
              </span>
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}

function ProvenModelSection() {
  return (
    <section className="bg-white py-1">
      <PageContainer size="full">
        <h2 className="text-[clamp(1.1rem,2vw,1.25rem)] font-bold text-[#f42661] text-center mb-8 uppercase tracking-wide">
          START WITH A PROVEN AIRPORT TRANSPORTATION MODEL
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="bg-[#f42661]/5 rounded-[1.5rem] p-6 lg:p-8 flex flex-col items-start border border-[#f42661]/10">
            <div className="mb-4 text-[#f42661]">
              <Rocket className="w-8 h-8" strokeWidth={1.5} />
            </div>
            <h3 className="text-[#f42661] font-bold text-xl lg:text-2xl leading-tight mb-4 text-balance">
              Get Access with just 3 bookings.
            </h3>
            <p className="text-[#0b0f19] font-medium text-[13px] leading-relaxed">
              What began as a handful of private airport rides became the foundation of a real transportation business.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-[#0b0f19] rounded-[1.5rem] p-6 lg:p-8 flex flex-col items-start shadow-xl">
            <div className="mb-4 text-[#f42661]">
              <TrendingUp className="w-8 h-8" strokeWidth={1.5} />
            </div>
            <h3 className="text-white font-bold text-xl lg:text-2xl leading-tight mb-4 text-balance">
              Nearly 6,000 scheduled rides in a single year.
            </h3>
            <p className="text-slate-300 text-[13px] leading-relaxed">
              Direct clients became repeat riders. Repeat riders created referrals. Trust, relationships, and systems built the business over time.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-[#f42661]/5 rounded-[1.5rem] p-6 lg:p-8 flex flex-col items-start border border-[#f42661]/10">
            <div className="mb-4 text-[#f42661]">
              <Heart className="w-8 h-8" strokeWidth={1.5} />
            </div>
            <h3 className="text-[#f42661] font-bold text-xl lg:text-2xl leading-tight mb-4 text-balance">
              QuitTheApp was built from what happened in between.
            </h3>
            <p className="text-[#0b0f19] font-medium text-[13px] leading-relaxed">
              You don't need thousands of customers to begin. You need a system, a plan, and the confidence to build something on your terms.
            </p>
          </div>

          {/* Card 4 - Image */}
          <div className="rounded-[1.5rem] overflow-hidden min-h-[250px] relative">
            <img
              src={jessicaImage}
              alt="Woman with luggage"
              className="absolute inset-0 w-full h-full object-cover object-[70%_center]"
            />
          </div>
        </div>
      </PageContainer>
    </section>
  );
}

function HowItWorksAndFaqSection() {
  const steps = [
    {
      number: 1,
      icon: Lock,
      title: "Get Access",
      description: "Purchase the $495 DIY system and get instant access to your launch resources.",
    },
    {
      number: 2,
      icon: ClipboardList,
      title: "Submit Your Details",
      description: "Provide your business information, service area, routes, pricing, booking preferences, and branding details.",
    },
    {
      number: 3,
      icon: Rocket,
      title: "Build & Launch",
      description: "Follow the guided process to create and launch your personalized selling page. Need help? Add the optional $199 We Do It for You upgrade.",
    },
  ];

  const faqs = [
    {
      question: "Do I need transportation experience?",
      answer: "No prior experience is necessary. The QuitTheApp system provides the framework, tools, and guidance you need to start.",
    },
    {
      question: "Will this work in my city?",
      answer: "The system works in markets with an airport and travelers seeking reliable transportation.",
    },
    {
      question: "How is this different from rideshare apps?",
      answer: "With QuitTheApp, you build your own client list, set your own rates, and keep the fares paid directly to your business.",
    },
    {
      question: "How do I get my first clients?",
      answer: "Use the included Client Acquisition Center™ with QR cards, outreach templates, and local strategies to attract initial clients.",
    },
    {
      question: "Is the $495 really a one-time payment?",
      answer: "Yes. The $495 DIY system is a one-time payment with no monthly platform fees.",
    },
    {
      question: "I'm not tech savvy. Can I still do this?",
      answer: "Absolutely. The system includes step-by-step guidance. If you prefer, you can add the $199 'We Do It for You' upgrade for additional setup assistance.",
    },
    {
      question: "What if it doesn't work for me?",
      answer: "Results depend on your market, effort, and execution. The system provides the proven tools and framework for success.",
    },
    {
      question: "Is my personalized selling page and hosting included?",
      answer: "Yes, your personalized selling page and its ongoing hosting are included in the one-time cost.",
    }
  ];

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  return (
    <section className="bg-white py-1 border-t border-slate-100" id="how-it-works-faq">
      <PageContainer size="full">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">

          {/* Left Side: How It Works */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-[clamp(1.25rem,2.5vw,1.75rem)] font-bold text-[#0b0f19] mb-8 lg:mb-10 text-balance">
              How It Works
            </h2>
            <div className="flex flex-col sm:flex-row items-stretch justify-between gap-6 sm:gap-4 w-full relative">
              {/* Horizontal line for desktop steps connection */}
              <div className="hidden sm:block absolute top-[28px] left-[10%] right-[10%] h-[2px] bg-[#f42661]/10 z-0"></div>

              {steps.map((step, idx) => (
                <div
                  key={idx}
                  className="flex flex-row sm:flex-col items-center sm:items-start sm:text-center w-full flex-1 z-10"
                >
                  <div className="shrink-0 flex sm:w-full justify-center mr-4 sm:mr-0 mb-0 sm:mb-4 relative">
                    <div className="w-14 h-14 rounded-full bg-white border-2 border-[#f42661]/20 flex items-center justify-center relative shadow-sm">
                      <div className="absolute -left-2 sm:-left-3 top-1/2 -translate-y-1/2 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#f42661] text-white flex items-center justify-center font-bold text-xs sm:text-sm shadow-sm border border-white">
                        {step.number}
                      </div>
                      <step.icon className="w-6 h-6 text-[#f42661]" strokeWidth={1.5} />
                    </div>
                  </div>

                  <div className="flex flex-col justify-center">
                    <h4 className="font-bold text-[#0b0f19] text-[15px] mb-1 sm:mx-auto">
                      {step.title}
                    </h4>
                    <p className="text-slate-600 text-[12px] sm:text-[13px] leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: FAQ */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-[clamp(1.25rem,2.5vw,1.75rem)] font-bold text-[#0b0f19] mb-8 lg:mb-10 text-balance">
              Frequently <span className="text-[#f42661]">Asked Questions</span>
            </h2>

            <div className="flex flex-col gap-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="flex flex-col cursor-pointer pb-3 border-b border-slate-100 last:border-0" onClick={() => toggleFaq(idx)}>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 font-bold text-[#0b0f19] text-[14px] leading-snug select-none">
                      {faq.question}
                    </div>
                    <div className={`text-[#f42661] shrink-0 w-5 h-5 flex items-center justify-center rounded-full border border-[#f42661]/30 transition-transform duration-300 ${openFaqIndex === idx ? 'bg-[#f42661] text-white rotate-45' : 'bg-transparent'}`}>
                      <span className="text-[15px] leading-none mb-0.5">+</span>
                    </div>
                  </div>
                  <div className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${openFaqIndex === idx ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                    <div className="overflow-hidden">
                      <p className="pr-8 pt-3 text-slate-600 text-[13px] leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </PageContainer>
    </section>
  );
}

function FooterCTASection({ openPricingModal }: { openPricingModal: () => void }) {
  const benefits = [
    "One-time payment",
    "No monthly platform fees",
    "Built for private transportation",
    "Real humans. Real support.",
  ];

  return (
    <section className="bg-[#0b0f19] py-1">
      <PageContainer size="full">
        {/* Main 3-Column Layout */}
        <div className="flex flex-col lg:flex-row justify-between gap-10 lg:gap-8 pb-10 border-b border-slate-800">
          {/* Column 1: Intro */}
          <div className="lg:w-1/3 flex flex-col pr-0 lg:pr-8">
            <h3 className="text-2xl sm:text-3xl font-bold text-white leading-tight mb-6 text-balance">
              Start My <br />
              <span className="text-[#f42661]">Transportation Business™</span>
            </h3>
            <div className="flex items-start gap-4">
              <Heart className="w-8 h-8 text-[#f42661] shrink-0 stroke-[1.5]" />
              <p className="text-slate-300 text-sm leading-relaxed">
                Build a trusted, professional business that fits your life—and your clients keep coming back.
              </p>
            </div>
          </div>

          {/* Column 2: Pricing & Checklist */}
          <div className="lg:w-1/3 flex flex-col justify-center">
            <div className="flex flex-col mb-4">
              <div className="flex items-baseline gap-3 flex-wrap">
                <span className="text-[clamp(2.5rem,4vw,3rem)] font-bold text-[#f42661]">$495</span>
                <span className="text-white font-bold text-sm uppercase tracking-wide mt-2">
                  One-time payment
                </span>
              </div>
              <span className="text-slate-300 text-xs mt-2 leading-snug max-w-[280px]">
                Includes the complete QuitTheApp DIY launch system and personalized driver selling page.<br />
                <span className="mt-2 block opacity-80">Optional $199 We Do It for You upgrade available.</span>
              </span>
            </div>
          </div>

          {/* Column 3: Button & Payments */}
          <div className="lg:w-1/3 flex flex-col justify-center items-start lg:items-end">
            <div className="w-full sm:w-auto">
              <button
                onClick={openPricingModal}
                className="cursor-pointer bg-[#f42661] hover:bg-[#d91950] text-white font-bold py-4 px-8 rounded-[0.5rem] transition-colors shadow-lg shadow-[#f42661]/20 flex items-center justify-center gap-4 w-full text-base sm:text-lg mb-4 min-h-[56px]"
              >
                <span>Start Your Business</span>
                <div className="bg-white rounded-full p-1 shrink-0">
                  <ChevronRight className="w-5 h-5 text-[#f42661] stroke-[3]" />
                </div>
              </button>
              {/* Payment Badges */}
              <div className="flex justify-center w-full mb-6">
                <PaymentBadges justify="center" />
              </div>
            </div>

            <ul className="space-y-2 mt-2 w-full max-w-[280px] self-center lg:self-end">
              {benefits.map((benefit, i) => (
                <li
                  key={i}
                  className="flex items-center text-slate-300 text-[13px]"
                >
                  <Check className="w-4 h-4 text-[#f42661] mr-3 shrink-0 stroke-[3]" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Trust Indicators & Copyright */}
        <div className="pt-8 flex flex-col items-center">
          <p className="text-slate-500 text-xs">
            © {new Date().getFullYear()} QuitTheApp. All Rights Reserved.
          </p>
        </div>
      </PageContainer>
    </section>
  );
}

function Navbar({ openPricingModal }: { openPricingModal: () => void }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { accessToken, user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [logoutUser] = useLogoutUserMutation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
    } catch (e) {
      console.error("Logout failed:", e);
    }
    dispatch(logOut());
  };

  const navLinks = [
    { label: "How It Works", href: "#how-it-works" },
    { label: "What's Included", href: "#how-it-works-steps" },
    { label: "Success Stories", href: "#reviews" },
    { label: "FAQ", href: "#faq" },
  ];

  const hoverTextClass = "hover:text-[#f42661]";
  const btnClass = "bg-[#f42661] hover:bg-[#d91950] shadow-[#f42661]/20";

  return (
    <>
      <header
        className={cn(
          "left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "fixed top-0 bg-[#040a23] shadow-md py-1"
            : "absolute top-0 bg-transparent py-[clamp(0.75rem,1.5vw,1rem)]",
        )}
      >
        <PageContainer size="full">
          <div className="flex items-center justify-between">
            {/* Logo Section */}
            <Link to="/" className="flex items-center gap-2 z-50" aria-label="QuitTheApp Home">
              <img
                src={womenLogo}
                alt="QuitTheApp Logo"
                className="h-7 lg:h-8 w-auto"
              />
            </Link>

            {/* Right Section: Nav + CTA */}
            <div className="hidden lg:flex items-center gap-8">
              <nav className="flex items-center gap-8">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className={cn(
                      "text-white text-sm font-semibold tracking-wide transition-colors",
                      hoverTextClass,
                      isScrolled && "text-slate-300",
                    )}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>

              <div className="flex items-center gap-3">
                {accessToken ? (
                  <ProfileDropdown />
                ) : (
                  <>
                    <Link
                      to="/login"
                      className={cn(
                        "text-white text-sm font-semibold tracking-wide transition-colors px-3 py-2.5 rounded-md min-h-[44px] flex items-center",
                        hoverTextClass,
                        isScrolled && "text-slate-300",
                      )}
                    >
                      Login
                    </Link>

                    <button
                      onClick={openPricingModal}
                      className={cn(
                        "cursor-pointer text-white font-bold py-2.5 px-6 rounded-md transition-colors text-sm shadow-lg min-h-[44px]",
                        btnClass,
                      )}
                    >
                      Start My Business — $495
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="cursor-pointer lg:hidden text-white z-50 p-2 -mr-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </PageContainer>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#040a23] pt-24 px-6 flex flex-col lg:hidden overflow-y-auto">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                "text-white hover:text-[#f42661] text-lg font-semibold py-4 border-b border-white/10 transition-colors",
              )}
            >
              {link.label}
            </a>
          ))}

          {accessToken ? (
            <>
              {user?.role === "admin" ? (
                <Link
                  to="/admin"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-white hover:text-[#f42661] text-lg font-semibold py-4 border-b border-white/10 transition-colors"
                >
                  Admin Dashboard
                </Link>
              ) : user?.status === "active" ? (
                <Link
                  to="/dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-white hover:text-[#f42661] text-lg font-semibold py-4 border-b border-white/10 transition-colors"
                >
                  Dashboard
                </Link>
              ) : (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    openPricingModal();
                  }}
                  className="text-left text-white hover:text-[#f42661] text-lg font-semibold py-4 border-b border-white/10 transition-colors w-full"
                >
                  Complete Checkout
                </button>
              )}
              <Link
                to={user?.role === "admin" ? "/admin/settings" : "/profile-settings"}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-white hover:text-[#f42661] text-lg font-semibold py-4 border-b border-white/10 transition-colors"
              >
                {user?.role === "admin" ? "Admin Settings" : "Profile & Settings"}
              </Link>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleLogout();
                }}
                className="text-left text-red-400 hover:text-red-300 text-lg font-semibold py-4 border-b border-white/10 transition-colors w-full"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-white hover:text-[#f42661] text-lg font-semibold py-4 border-b border-white/10 transition-colors"
              >
                Login
              </Link>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openPricingModal();
                }}
                className={cn(
                  "cursor-pointer text-white font-bold py-3 px-6 rounded-md transition-colors w-full mt-4 min-h-[52px]",
                  btnClass,
                )}
              >
                Start My Business — $495
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}
