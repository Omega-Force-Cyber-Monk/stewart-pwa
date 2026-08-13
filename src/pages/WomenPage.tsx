import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "../lib/cn";
import {
  ArrowRight,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  Contact,
  Gift,
  Heart,
  Lock,
  Monitor,
  Plane,
  RefreshCcw,
  Rocket,
  ShieldCheck,
  Star,
  User,
  Users,
  XCircle,
} from "lucide-react";
import { PageContainer } from "../components/layout/PageContainer";
import { ProfileDropdown } from "../components/ProfileDropdown";
import { PricingModal } from "../components/PricingModal";
import { useAppDispatch, useAppSelector } from "../hooks/storeHooks";
import { logOut } from "../store/features/auth/authSlice";
import { useLogoutUserMutation } from "../store/api/Auth/auth.api";
import womenBannerImage from "../assets/womenBannerImage.png";
import womenMiddleSection from "../assets/womenMiddleSection.png";
import womenLogo from "../assets/womenLogo.png";
import jessicaImage from "../assets/Women_Page_Jessica.jpg";
import mariaImage from "../assets/Womans_Page_Maria.jpg";
import lisaImage from "../assets/Womans_Page_Lisa.jpg";

export default function WomenPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { accessToken } = useAppSelector((state) => state.auth);

  // Auto-open the pricing modal when redirected here with ?showPricing=true.
  // LoginPage only sends non-active riders here, and the modal closes on
  // explicit user action — so no status re-check is needed at render time.
  const [showPricingModal, setShowPricingModal] = useState(
    () => searchParams.get("showPricing") === "true" && !!accessToken
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
        <PricingModal onClose={() => setShowPricingModal(false)} />
      )}
      <Navbar openPricingModal={openPricingModal} />
      <HeroBanner openPricingModal={openPricingModal} />
      <FeaturesSection />
      <ComparisonSection />
      <WhyWinSection />
      <HowItWorksSection />
      <ReviewsSection />
      <FaqSection />
      <FooterCTASection openPricingModal={openPricingModal} />
    </>
  );
}

function HeroBanner({ openPricingModal }: { openPricingModal: () => void }) {
  const { accessToken } = useAppSelector((state) => state.auth);

  return (
    <div className="relative w-full bg-[#0b0f19] min-h-[100svh] flex flex-col justify-between pt-[clamp(64px,8vw,80px)]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={womenBannerImage}
          alt="Launch a Women-Focused Private Airport Business"
          className="w-full h-full object-cover object-center"
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
              <h1 className="text-[clamp(1.9rem,4.5vw,3.75rem)] font-bold text-white leading-[1.15] mb-[clamp(1rem,1.5vw,1.25rem)] tracking-tight text-balance">
                Build Your Own <br />
                Private Airport Business. <br />
                <span className="text-[#f42661]">Designed for Women.</span>
              </h1>

              <p className="text-[clamp(1rem,1.35vw,1.125rem)] text-slate-200 mb-[clamp(1.5rem,2vw,2rem)] max-w-[clamp(280px,38vw,576px)] leading-relaxed text-pretty">
                QuitTheApp gives women operators the tools to attract direct clients, accept private airport ride requests, build trust, and create repeat business.
              </p>

              <ul className="space-y-[clamp(0.5rem,0.8vw,0.625rem)] mb-[clamp(1.5rem,2vw,2rem)]">
                {[
                  "Own your client list",
                  "Offer safe, professional airport rides",
                  "Build repeat riders and referrals",
                  "Keep the fares paid directly to your business",
                  "Create a business asset you control",
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
                    Start My Private Airport Business™ — $495
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
                    Start My Private Airport Business™ — $495
                  </span>
                  <div className="bg-white rounded-full p-[clamp(0.2rem,0.3vw,0.3rem)] ml-[clamp(0.75rem,1vw,1rem)] group-hover:translate-x-1 transition-transform shrink-0">
                    <ChevronRight className="text-[#f42661] w-[clamp(1.1rem,1.2vw,1.3rem)] h-[clamp(1.1rem,1.2vw,1.3rem)]" />
                  </div>
                </button>
              )}
            </div>

            {/* Right Side Trust Badge — stacks below the content on mobile, side-by-side on lg */}
            <div className="w-full lg:w-[45%] flex justify-center lg:justify-end self-end z-10">
              <div className="flex bg-white rounded-[clamp(1rem,1.5vw,1.5rem)] p-[clamp(1.25rem,2vw,2rem)] shadow-2xl w-full max-w-[clamp(300px,35vw,500px)] flex-col items-center text-center">
                <div className="flex items-center gap-[clamp(0.75rem,1.5vw,1.5rem)] mb-[clamp(1rem,2vw,2rem)] w-full justify-center lg:justify-start">
                  <ShieldCheck
                    className="text-[#f42661] w-[clamp(3.5rem,6vw,7rem)] h-[clamp(3.5rem,6vw,7rem)] shrink-0"
                    strokeWidth={1.5}
                  />
                  <div className="text-left">
                    <h3 className="text-[#0b0f19] font-bold text-[clamp(1.25rem,1.8vw,1.75rem)] leading-tight">
                      Trusted.
                      <br />
                      Professional.
                      <br />
                      Women-Focused.
                    </h3>
                  </div>
                </div>

                <p className="text-[#f42661] font-bold text-[clamp(1.25rem,1.8vw,1.75rem)] mt-[clamp(0.25rem,0.5vw,0.5rem)]">
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

const features = [
  {
    icon: CalendarDays,
    title: "Quick Launch Booking System™",
    description:
      "Take direct airport ride requests with your own professional booking flow.",
  },
  {
    icon: Contact,
    title: "Client Acquisition Center™",
    description:
      "Get QR cards, referral tools, and outreach templates to attract prospective clients and generate direct bookings.",
  },
  {
    icon: Monitor,
    title: "Personalized Selling Page™",
    description:
      "Show travelers who you are and why they should trust and book with you.",
  },
  {
    icon: RefreshCcw,
    title: "Repeat Rider Engine™",
    description:
      "Follow up, get reviews, encourage referrals, and bring riders back for more repeat rides.",
  },
];

function FeaturesSection() {
  return (
    <section className="bg-white py-3" id="how-it-works">
      <PageContainer size="full">
        <div className="text-center mb-8">
          <h2 className="text-[clamp(1.5rem,3.2vw,2.25rem)] font-bold text-[#0b0f19] tracking-tight text-balance">
            Everything You Need to{" "}
            <span className="text-[#f42661]">
              Create Your Own Successful Client Base
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[clamp(0.75rem,1.5vw,1rem)] mb-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl border border-slate-200 p-[clamp(1rem,1.5vw,1.25rem)] flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow min-w-0"
            >
              <div className="mb-4 bg-white p-2">
                <feature.icon
                  className="w-10 h-10 text-[#f42661]"
                  strokeWidth={1.5}
                />
              </div>
              <h3 className="text-lg font-bold text-[#0b0f19] mb-2 leading-snug">
                {feature.title}
              </h3>
              <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-[#f42661]/5 border border-[#f42661]/10 rounded-xl p-[clamp(1rem,1.5vw,1.25rem)] flex flex-col sm:flex-row items-center gap-3 sm:gap-4 max-w-4xl mx-auto">
          <Gift className="w-8 h-8 text-[#f42661] shrink-0" strokeWidth={1.5} />
          <p className="text-slate-700 text-xs sm:text-sm text-center sm:text-left leading-relaxed">
            <strong className="text-[#f42661]">Also includes:</strong> Launch
            Dashboard™ access, Operator Dashboard™ tools, personalized selling
            page hosting, training resources, lifetime system updates, and real
            human support.
          </p>
        </div>
      </PageContainer>
    </section>
  );
}

function ComparisonSection() {
  return (
    <section id="comparison" className="bg-white py-3 sm:py-4">
      <PageContainer size="full">
        <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
          {/* Mobile: stack image above content */}
          <div className="lg:hidden">
            <div className="relative aspect-[16/9] sm:aspect-[16/7] overflow-hidden">
              <img
                src={womenMiddleSection}
                alt="Woman at airport"
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent" />
            </div>
            <div className="px-5 py-4">
              <h3 className="mb-3 text-xl font-bold text-[#f42661] text-center">
                Relying on Apps
              </h3>
              <ul className="space-y-2 mb-5">
                {[
                  "The platform controls the client relationship",
                  "No repeat system",
                  "Limited control",
                  "Dependent on app traffic",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <XCircle className="h-5 w-5 shrink-0 fill-[#f42661] text-white" />
                    <span className="text-[14px] font-semibold text-slate-800">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
              <h3 className="mb-3 text-xl font-bold text-[#16a34a] text-center">
                Your Women-Focused Business
              </h3>
              <ul className="space-y-2">
                {[
                  "You own your client relationships",
                  "Build repeat riders and referrals",
                  "Set your own rates and keep the fares paid directly to your business",
                  "Create a professional, trust-based experience",
                  "Build business assets you control",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5 fill-[#16a34a] text-white" />
                    <span className="text-[14px] font-semibold text-slate-800 leading-snug">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Desktop: Left | Image | Right — image is natural size, panels center vertically */}
          <div className="hidden lg:flex flex-row items-center">
            {/* Left */}
            <div className="w-[32%] shrink-0 bg-white px-8 py-0 flex flex-col justify-center">
              <h3 className="mb-4 text-[22px] font-bold text-[#f42661]">
                Relying on Apps
              </h3>
              <ul className="space-y-3">
                {[
                  "The platform controls the client relationship",
                  "No repeat system",
                  "Limited control",
                  "Dependent on app traffic",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <XCircle className="h-5 w-5 shrink-0 fill-[#f42661] text-white" />
                    <span className="text-[14px] font-semibold text-slate-800 leading-snug">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Center Image — natural width/height, left edge blended */}
            <div className="flex-1 relative overflow-hidden min-w-0">
              <img
                src={womenMiddleSection}
                alt="Woman at airport"
                className="w-full h-auto block"
                loading="lazy"
              />
            </div>

            {/* Right */}
            <div className="w-[32%] shrink-0 bg-white px-8 py-0 flex flex-col justify-center">
              <h3 className="mb-4 text-[22px] font-bold text-[#16a34a] leading-tight">
                Your Women-Focused Business
              </h3>
              <ul className="space-y-3">
                {[
                  "You own your client relationships",
                  "Build repeat riders and referrals",
                  "Set your own rates and keep the fares paid directly to your business",
                  "Create a professional, trust-based experience",
                  "Build business assets you control",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5 fill-[#16a34a] text-white" />
                    <span className="text-[14px] font-semibold text-slate-800 leading-snug">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}

function WhyWinSection() {
  const reasons = [
    {
      icon: ShieldCheck,
      title: "Greater Comfort and Trust",
      description: "Many women travelers may feel more comfortable booking with another woman, particularly for early morning, late night, or unfamiliar airport trips.",
    },
    {
      icon: Star,
      title: "A More Personal Experience",
      description: "Women operators can build lasting client relationships through dependable service, communication, and personal attention.",
    },
    {
      icon: Users,
      title: "Family and Senior Referrals",
      description: "Satisfied travelers may refer daughters, mothers, friends, seniors, and family members who value a trusted woman driver.",
    },
    {
      icon: Plane,
      title: "Repeat Airport Clients",
      description: "A safe, professional experience can turn one airport ride into repeat bookings and referrals.",
    },
  ];

  return (
    <section className="bg-white py-3 border-b border-slate-100">
      <PageContainer size="full">
        <h2 className="text-[clamp(1.375rem,3vw,2rem)] font-bold text-[#0b0f19] text-center mb-10 text-balance">
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
              <h4 className="font-bold text-[#0b0f19] text-base leading-snug mb-2">
                {reason.title}
              </h4>
              <p className="text-slate-600 text-sm leading-relaxed max-w-[240px]">
                {reason.description}
              </p>
              
              {/* Vertical Divider for Desktop */}
              {idx < reasons.length - 1 && (
                <div className="hidden lg:block absolute right-[-12px] top-[10%] bottom-[10%] w-px bg-slate-200"></div>
              )}
            </div>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    {
      number: 1,
      icon: Lock,
      title: "Get Access",
      description: "Purchase the $495 DIY system and receive immediate access to your launch resources.",
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
      title: "Build and Launch",
      description: "Follow the guided setup process while QuitTheApp prepares and hosts your personalized selling page. Prefer additional assistance? Add the optional $199 We Do It for You upgrade.",
    },
  ];

  return (
    <section className="bg-white py-3" id="how-it-works-steps">
      <PageContainer size="full">
        <h2 className="text-[clamp(1.375rem,3vw,2rem)] font-bold text-[#0b0f19] text-center mb-8">
          How It Works
        </h2>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4 w-full">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="flex items-center w-full md:w-auto flex-1 justify-center min-w-0"
            >
              <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3 sm:gap-4 w-full justify-center">
                {/* Icon Container with Overlapping Number */}
                <div className="relative shrink-0">
                  <div className="absolute -left-2 sm:-left-3 top-1/2 -translate-y-1/2 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#f42661] text-white flex items-center justify-center font-bold text-xs sm:text-sm z-10 shadow-sm border border-white">
                    {step.number}
                  </div>
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#f42661]/5 border border-[#f42661]/10 flex items-center justify-center relative z-0">
                    <step.icon
                      className="w-7 h-7 sm:w-8 sm:h-8 text-[#f42661]"
                      strokeWidth={1.5}
                    />
                  </div>
                </div>

                {/* Text Content */}
                <div className="flex flex-col justify-center h-full max-w-[200px]">
                  <h4 className="font-bold text-[#0b0f19] text-sm sm:text-base mb-1">
                    {step.title}
                  </h4>
                  <p className="text-slate-600 text-xs sm:text-sm leading-snug">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Arrow separator (hidden on mobile, hidden after last item) */}
              {idx < steps.length - 1 && (
                <div className="hidden lg:flex shrink-0 mx-2 text-[#f42661]">
                  <ArrowRight className="w-5 h-5 opacity-60" strokeWidth={2} />
                </div>
              )}
            </div>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}

function ReviewsSection() {
  const reviews = [
    {
      quote:
        "I launched in 2 weeks and my repeat bookings and referrals keep growing.",
      name: "Jessica M.",
      location: "Austin, TX",
      image: jessicaImage,
    },
    {
      quote:
        "My clients love the touch of trust and care I bring to every ride.",
      name: "Maria R.",
      location: "Scottsdale, AZ",
      image: mariaImage,
    },
    {
      quote:
        "This system gave me the freedom to build a business I'm proud of.",
      name: "Lisa T.",
      location: "Charlotte, NC",
      image: lisaImage,
    },
  ];

  return (
    <section className="bg-white py-3" id="reviews">
      <PageContainer size="full">
        <div className="w-full rounded-[2rem] border border-slate-200 shadow-sm p-[clamp(1rem,2vw,1.5rem)] bg-white">
          <h2 className="text-[clamp(1.375rem,3vw,2rem)] font-bold text-[#0b0f19] text-center mb-8 text-balance">
            Women Operators Are Building Real Businesses
          </h2>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-6 w-full">
            {reviews.map((review, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row items-stretch gap-4 sm:gap-5 w-full flex-1 min-w-0"
              >
                {/* Image */}
                <div className="shrink-0 w-full sm:w-[150px] lg:w-[140px] xl:w-[160px] flex">
                  <img
                    src={review.image}
                    alt={review.name}
                    loading="lazy"
                    className="w-full h-40 sm:h-full rounded-2xl object-cover object-top shadow-sm"
                  />
                </div>

                {/* Review Content */}
                <div className="flex flex-col justify-between py-1 text-center sm:text-left min-w-0">
                  {/* Stars */}
                  <div className="flex items-center justify-center sm:justify-start gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-[#0b0f19] font-medium text-sm sm:text-base leading-snug mb-3 text-pretty">
                    "{review.quote}"
                  </p>

                  {/* Author */}
                  <div>
                    <h5 className="font-bold text-[#f42661] text-sm sm:text-base">
                      {review.name}
                    </h5>
                    <span className="text-slate-600 text-xs sm:text-sm">
                      {review.location}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </PageContainer>
    </section>
  );
}

function FaqSection() {
  const faqs = [
    {
      question: "Will this work in my city?",
      answer:
        "The system can be used in markets with an airport and travelers who need reliable transportation. You choose your service area, rates, schedule, and availability. Results depend on local demand, competition, pricing, expenses, and your marketing efforts.",
    },
    {
      question: "How is this different from Uber or Lyft?",
      answer:
        "With rideshare apps, the platform controls the client relationship, pricing structure, and access to future ride opportunities. With QuitTheApp, you build your own client list, set your own rates, and keep the fares paid directly to your business, subject to normal operating expenses and payment processing costs.",
    },
    {
      question: "Is my personalized selling page and hosting included?",
      answer:
        "Yes. QuitTheApp builds and hosts your personalized selling page. The $495 DIY system guides you through submitting your business information, services, pricing, branding, and booking preferences. The optional $199 We Do It for You upgrade provides additional setup assistance from our team.",
    },
    {
      question: "Is the $495 really a one-time payment?",
      answer:
        "Yes. The $495 QuitTheApp DIY system is a one-time payment with no monthly QuitTheApp platform fee. An optional $199 We Do It for You upgrade is available. Normal business expenses such as scheduling software, domain registration, payment processing, commercial insurance, licensing, fuel, vehicle maintenance, and other operating costs may still apply.",
    },
    {
      question: "I'm not tech savvy. Can I still do this?",
      answer:
        "Absolutely. The $495 QuitTheApp DIY system includes step-by-step guidance for submitting your business information, selecting your booking preferences, and preparing the content needed for your personalized selling page. Prefer additional assistance? Add the optional $199 We Do It for You upgrade.",
    },
    {
      question: "How do I get my first clients?",
      answer:
        "Use the Client Acquisition Center™ with QR cards, outreach templates, and client-building tools. Start with your network, local hotels, and referrals—one client becomes many.",
    },
    {
      question: "What if it doesn't work for me?",
      answer:
        "QuitTheApp was created from real experience building and operating a private airport transportation business since 2016. Results depend on your market, pricing, effort, expenses, and ability to attract clients. If you need help deciding whether the system fits your goals, contact support@quittheapp.com.",
    },
  ];

  return (
    <section className="bg-white py-3 " id="faq">
      <PageContainer size="full">
        <div className="w-full rounded-[2rem] border border-slate-200 shadow-sm p-[clamp(1rem,2vw,1.5rem)] bg-white">
          <h2 className="text-[clamp(1.375rem,3vw,2rem)] font-bold text-[#0b0f19] text-center mb-8 sm:mb-10">
            Frequently <span className="text-[#f42661]">Asked Questions</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
            {faqs.map((faq, idx) => (
              <div key={idx} className="flex items-start gap-4 min-w-0">
                <div className="shrink-0 w-8 h-8 rounded-full bg-[#f42661] text-white flex items-center justify-center font-bold text-sm shadow-sm mt-0.5">
                  Q
                </div>
                <div className="flex flex-col">
                  <h4 className="font-bold text-[#0b0f19] text-sm sm:text-base leading-snug mb-2">
                    {faq.question}
                  </h4>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </PageContainer>
    </section>
  );
}

function FooterCTASection({ openPricingModal }: { openPricingModal: () => void }) {
  const { accessToken, user } = useAppSelector((state) => state.auth);

  const benefits = [
    "One-time payment",
    "No monthly QuitTheApp platform fees",
    "Built for airport transportation",
    "Real human support",
  ];

  const trustBadges = [
    { icon: ShieldCheck, text: "Secure Checkout" },
    { icon: CheckCircle2, text: "Protected Payment" },
    { icon: Lock, text: "One-time payment" },
    { icon: XCircle, text: "No monthly platform fees" },
    { icon: Plane, text: "Built for Airport Transportation Businesses™" },
    { icon: User, text: "Real Humans. Real Support." },
  ];

  return (
    <section className="bg-[#0b0f19] pt-12 pb-6 border-t-4 border-[#f42661]">
      <PageContainer size="full">
        {/* Main 3-Column Layout */}
        <div className="flex flex-col lg:flex-row justify-between gap-10 lg:gap-8 pb-10 border-b border-slate-800">
          {/* Column 1: Intro */}
          <div className="lg:w-1/3 flex flex-col pr-0 lg:pr-8 lg:border-r border-slate-800">
            <h3 className="text-2xl sm:text-3xl font-bold text-white leading-tight mb-6">
              Start My <br />
              <span className="text-[#f42661]">Private Airport Business™</span>
            </h3>
            <div className="flex items-start gap-4">
              <Heart className="w-10 h-10 text-[#f42661] shrink-0 stroke-[1.5]" />
              <p className="text-slate-300 text-sm leading-relaxed">
                Build a trusted, professional business that puts you in
                control—and your clients keep coming back.
              </p>
            </div>
          </div>

          {/* Column 2: Pricing & Checklist */}
          <div className="lg:w-1/3 flex flex-col justify-center">
            <div className="flex flex-col mb-4">
              <div className="flex items-baseline gap-3 flex-wrap">
                <span className="text-[clamp(2.5rem,4vw,3rem)] font-bold text-[#f42661]">$495</span>
                <span className="text-white font-bold text-lg">
                  One-time payment
                </span>
              </div>
              <span className="text-slate-300 text-sm mt-2 leading-snug max-w-[280px]">
                Includes the complete QuitTheApp DIY launch system and personalized driver selling page.<br/>
                <span className="mt-2 block font-medium">Optional $199 We Do It for You upgrade available.</span>
              </span>
            </div>
            <ul className="space-y-2 mt-2">
              {benefits.map((benefit, i) => (
                <li
                  key={i}
                  className="flex items-center text-slate-300 text-sm"
                >
                  <Check className="w-5 h-5 text-[#f42661] mr-3 shrink-0 stroke-[3]" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Button & Payments */}
          <div className="lg:w-1/3 flex flex-col justify-center items-center lg:items-end">
            {user?.status === "active" ? (
              <button
                onClick={openPricingModal}
                className="cursor-pointer bg-[#f42661] hover:bg-[#d91950] text-white font-bold py-4 px-6 rounded-lg transition-colors shadow-lg shadow-[#f42661]/20 flex items-center justify-between group w-full text-base sm:text-lg mb-4 min-h-[56px]"
              >
                <span className="text-center w-full">
                  Start Your Business
                </span>
                <div className="bg-white rounded-full p-1 ml-4 shrink-0 transition-transform group-hover:translate-x-1">
                  <ChevronRight className="w-5 h-5 text-[#f42661] stroke-[3]" />
                </div>
              </button>
            ) : accessToken ? (
              <button
                onClick={openPricingModal}
                className="cursor-pointer bg-[#f42661] hover:bg-[#d91950] text-white font-bold py-4 px-6 rounded-lg transition-colors shadow-lg shadow-[#f42661]/20 flex items-center justify-between group w-full text-base sm:text-lg mb-4 min-h-[56px]"
              >
                <span className="text-center w-full">
                  Start My Private Airport Business™ — $495
                </span>
                <div className="bg-white rounded-full p-1 ml-4 shrink-0 transition-transform group-hover:translate-x-1">
                  <ChevronRight className="w-5 h-5 text-[#f42661] stroke-[3]" />
                </div>
              </button>
            ) : (
              <button
                onClick={openPricingModal}
                className="cursor-pointer bg-[#f42661] hover:bg-[#d91950] text-white font-bold py-4 px-6 rounded-lg transition-colors shadow-lg shadow-[#f42661]/20 flex items-center justify-between group w-full text-base sm:text-lg mb-4 min-h-[56px]"
              >
                <span className="text-center w-full">
                  Start My Private Airport Business™ — $495
                </span>
                <div className="bg-white rounded-full p-1 ml-4 shrink-0 transition-transform group-hover:translate-x-1">
                  <ChevronRight className="w-5 h-5 text-[#f42661] stroke-[3]" />
                </div>
              </button>
            )}

            {/* Payment Badges (CSS simulated) */}
            <div className="flex flex-col items-center lg:items-end gap-2">
              <div className="flex gap-2 flex-wrap justify-center lg:justify-end">
                <div className="bg-white px-2 py-1 rounded text-[#1a1f71] font-bold text-xs italic tracking-tighter border border-slate-300">
                  VISA
                </div>
                <div className="bg-white px-2 py-1 rounded flex items-center justify-center border border-slate-300">
                  <div className="w-3 h-3 rounded-full bg-[#eb001b] -mr-1 opacity-90 mix-blend-multiply"></div>
                  <div className="w-3 h-3 rounded-full bg-[#f79e1b] opacity-90 mix-blend-multiply"></div>
                </div>
                <div className="bg-[#2e77bc] px-2 py-1 rounded text-white font-bold text-xs border border-slate-300">
                  AMEX
                </div>
                <div className="bg-white px-2 py-1 rounded text-[#f68121] font-bold text-xs border border-slate-300">
                  DISCOVER
                </div>
              </div>
              <div className="text-slate-400 text-[11px] flex items-center gap-1.5 font-medium mt-1">
                Secure payment processed by{" "}
                <span className="bg-[#635bff] px-1.5 py-0.5 rounded text-white font-bold text-[10px]">
                  stripe
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Trust Indicators & Copyright */}
        <div className="pt-6 flex flex-col items-center">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-4 mb-6">
            {trustBadges.map((badge, idx) => (
              <div key={idx} className="flex items-center gap-2 text-slate-400">
                <badge.icon className="w-4 h-4 shrink-0" strokeWidth={1.5} />
                <span className="text-xs">{badge.text}</span>
              </div>
            ))}
          </div>
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
                to={user?.role === "admin" ? "/admin/settings" : "/profile"}
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
