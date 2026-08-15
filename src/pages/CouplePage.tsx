import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Menu, X, Headset } from "lucide-react";
import { cn } from "../lib/cn";
import coupleLogo from "../assets/coupleLogo.png";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Gift,
  Lock,
  Monitor,
  RefreshCcw,
  Rocket,
  ShieldCheck,
  Star,
  Users,
  XCircle,
  CreditCard,
  Clock,
} from "lucide-react";
import { PageContainer } from "../components/layout/PageContainer";
import { PaymentBadges } from "../components/common/PaymentBadges";
import { ProfileDropdown } from "../components/ProfileDropdown";
import { PricingModal } from "../components/PricingModal";
import { useAppDispatch, useAppSelector } from "../hooks/storeHooks";
import { logOut } from "../store/features/auth/authSlice";
import { useLogoutUserMutation } from "../store/api/Auth/auth.api";
import coupleBanner from "../assets/coupleBanner.png";
import coupleComparisonLeft from "../assets/coupleComparisonSectionLeft.png";
import coupleComparisonRight from "../assets/coupleComparisonSectionRight.png";
import markLisaImage from "../assets/Couples_Mark_Lisa.jpg";
import tomKarenImage from "../assets/Couples_tom_Karen.jpg";
import ryanMichelleImage from "../assets/Couple_Ryan_Michelle.jpg";

export default function CouplePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { accessToken } = useAppSelector((state) => state.auth);

  // Auto-open the pricing modal when redirected here with ?showPricing=true.
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
    <div className="relative w-full bg-[#f8fafc] border-b border-gray-100 min-h-[100svh] h-auto flex flex-col justify-between pt-[clamp(1rem,1.5vw,1.75rem)] pb-[clamp(2.5rem,3vw,3.5rem)] lg:pb-0 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={coupleBanner}
          alt="Couple in a car"
          className="w-full h-full object-cover object-center"
        />
      </div>
      {/* White gradient overlay for dark text */}
      {/* <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent w-full lg:w-[85%] xl:w-[75%] z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent lg:hidden w-full h-full z-0"></div> */}

      <div className="relative z-10 w-full flex-grow flex items-center py-6 lg:py-0">
        <PageContainer size="full">
          <div className="flex flex-col lg:flex-row w-full justify-between items-start lg:items-center gap-10 xl:gap-16">
            {/* Left Side Content */}
            <div className="w-full lg:w-1/2 text-left z-10 relative">
              <h1 className="text-[clamp(1.75rem,2.6vw,2.75rem)] font-extrabold text-[#060D64] leading-[1.1] mb-[clamp(0.875rem,1.1vw,1.25rem)] tracking-tight uppercase">
                Build An Airport
                <br />
                Transportation Business
                <br />
                <span className="text-[#2563eb] text-[clamp(2.25rem,4vw,3.75rem)] relative inline-block mt-2 font-extrabold">
                  Together.
                  <svg
                    className="absolute -bottom-2 sm:-bottom-3 left-0 w-full h-2 sm:h-3 text-[#eab308]"
                    viewBox="0 0 100 10"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0 5 Q 50 10 100 0"
                      fill="transparent"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h1>

              <p className="text-[clamp(1.0625rem,1.25vw,1.25rem)] text-[#060D64] font-semibold mb-[clamp(1.25rem,1.5vw,1.75rem)] max-w-xl leading-relaxed">
                Build your own business, your schedule, and the life you
                want—while helping travelers every day.
              </p>

              <ul className="space-y-3 mb-8 sm:mb-10 max-w-xl">
                {[
                  "Attract & keep repeat customers",
                  "Set your own schedule together",
                  "Keep 100% of every fare",
                  "Create long-term income & freedom",
                  "Build a real business asset as a couple",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center text-[#060D64] font-bold text-[clamp(0.9375rem,1vw,1.0625rem)]"
                  >
                    <CheckCircle2 className="text-white mr-3 w-5 h-5 sm:w-6 sm:h-6 fill-[#2563eb] shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {accessToken ? (
                <button
                  onClick={openPricingModal}
                  className="cursor-pointer bg-[#eab308] hover:bg-[#ca8a04] text-[#0b0f19] font-extrabold py-[clamp(0.75rem,0.9vw,1rem)] px-[clamp(1rem,1.2vw,1.5rem)] rounded-xl transition-all shadow-xl shadow-[#eab308]/30 flex items-center justify-between group w-full sm:w-auto mb-[clamp(1.5rem,2vw,3rem)]"
                >
                  <span className="text-left leading-snug pr-3 text-[clamp(0.9rem,1vw,1.125rem)] font-extrabold">
                    Start Our Private Airport Business™ — $495
                  </span>
                  <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 group-hover:translate-x-1.5 transition-transform stroke-[2.5]" />
                </button>
              ) : (
                <button
                  onClick={openPricingModal}
                  className="cursor-pointer bg-[#eab308] hover:bg-[#ca8a04] text-[#0b0f19] font-extrabold py-[clamp(0.75rem,0.9vw,1rem)] px-[clamp(1rem,1.2vw,1.5rem)] rounded-xl transition-all shadow-xl shadow-[#eab308]/30 flex items-center justify-between group w-full sm:w-auto mb-[clamp(1.5rem,2vw,3rem)]"
                >
                  <span className="text-left leading-snug pr-3 text-[clamp(0.9rem,1vw,1.125rem)] font-extrabold">
                    Start Our Private Airport Business™ — $495
                  </span>
                  <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 group-hover:translate-x-1.5 transition-transform stroke-[2.5]" />
                </button>
              )}
            </div>

            {/* Right Side Card */}
            <div className="w-full lg:w-auto xl:w-[40%] flex justify-center xl:justify-end z-10 mt-6 lg:mt-0">
              <div className="bg-[#0b0f19] rounded-[2rem] p-[clamp(1.25rem,2vw,2.5rem)] shadow-2xl w-fit xl:w-full xl:max-w-[340px] border-t-[6px] border-[#eab308]">
                <h3 className="text-[#eab308] font-bold text-[clamp(0.875rem,1vw,1rem)] mb-[clamp(0.75rem,1vw,1rem)] uppercase tracking-wider">
                  YOUR BUSINESS GROWS WHEN:
                </h3>

                <ul className="space-y-3 mb-6">
                  {[
                    "Customers book again",
                    "Families refer friends",
                    "Hotels & airports recommend you",
                    "Airport travelers save your card",
                    "Your reputation compounds",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center text-white text-[clamp(0.875rem,1vw,1rem)] font-semibold"
                    >
                      <CheckCircle2 className="w-5 h-5 mr-3 fill-[#2563eb] text-white shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="w-full h-px bg-slate-800 mb-6"></div>

                <div>
                  <h4 className="text-white font-extrabold text-[clamp(1.25rem,2vw,1.875rem)] leading-tight mb-[clamp(0.75rem,1vw,1rem)]">
                    Real Business.
                    <br />
                    Real Customers.
                    <br />
                    Real Freedom.™
                  </h4>
                  <svg
                    className="w-24 sm:w-32 h-3 sm:h-4 text-[#eab308]"
                    viewBox="0 0 100 10"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0 5 Q 50 10 100 0"
                      fill="transparent"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </PageContainer>
      </div>

      {/* Bottom Curve & Trust Badges */}
      <div className="relative z-20 w-full lg:w-[70%] xl:w-[60%] bg-white lg:rounded-tr-[5rem] mt-auto py-[clamp(1.5rem,2vw,2rem)] px-[clamp(1rem,4vw,4rem)] shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-4 xl:gap-6">
          <div className="flex items-center gap-3 xl:gap-4">
            <CreditCard
              className="w-8 h-8 xl:w-10 xl:h-10 text-[#040a23] shrink-0"
              strokeWidth={1.5}
            />
            <div className="text-[clamp(0.75rem,1vw,0.95rem)] font-bold text-[#040a23] leading-tight">
              One-time payment
              <br />
              <span className="font-medium text-slate-600">
                No monthly fees
              </span>
            </div>
          </div>
          <div className="hidden md:block w-px h-10 bg-slate-200 shrink-0"></div>
          <div className="flex items-center gap-3 xl:gap-4">
            <Clock
              className="w-8 h-8 xl:w-10 xl:h-10 text-[#040a23] shrink-0"
              strokeWidth={1.5}
            />
            <div className="text-[clamp(0.75rem,1vw,0.95rem)] font-bold text-[#040a23] leading-tight">
              Step-by-Step
              <br />
              <span className="font-medium text-slate-600">Quick Launch System</span>
            </div>
          </div>
          <div className="hidden md:block w-px h-10 bg-slate-200 shrink-0"></div>
          <div className="flex items-center gap-3 xl:gap-4">
            <ShieldCheck
              className="w-8 h-8 xl:w-10 xl:h-10 text-[#040a23] shrink-0"
              strokeWidth={1.5}
            />
            <div className="text-[clamp(0.75rem,1vw,0.95rem)] font-bold text-[#040a23] leading-tight">
              Built for couples
              <br />
              <span className="font-medium text-slate-600">
                Your business. Your future.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
const features = [
  {
    icon: CalendarDays,
    title: "Quick Launch Booking System™",
    description:
      "Get your professional booking flow live fast so you can start getting customers and bookings.",
  },
  {
    icon: Users,
    title: "Customer Acquisition Center™",
    description:
      "Get QR cards, referral tools, templates, and more to attract and convert new customers.",
  },
  {
    icon: Monitor,
    title: "Personalized Selling Page™",
    description:
      "Your trust-building page that turns visitors into bookings and helps you stand out online.",
  },
  {
    icon: RefreshCcw,
    title: "Repeat Rider Engine™",
    description:
      "Build repeat customers and referrals so your business grows month after month.",
  },
];

function FeaturesSection() {
  return (
    <section className="bg-white py-3" id="how-it-works">
      <PageContainer size="full">
        <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm p-[clamp(1.5rem,4vw,3.5rem)]">
          <h2 className="text-center text-[#1a1f71] font-extrabold text-[clamp(1.25rem,2.5vw,1.875rem)] tracking-wide uppercase mb-[clamp(2.5rem,4vw,4rem)]">
            YOUR CORE SYSTEMS™ FOR BUILDING YOUR BUSINESS
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-[clamp(2.5rem,4vw,3.5rem)] gap-x-[clamp(1.5rem,2vw,2rem)] relative mb-[clamp(3rem,4.5vw,4.5rem)]">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center text-center px-4 sm:px-6 relative"
              >
                <div className="mb-[clamp(1rem,1.5vw,1.5rem)]">
                  <feature.icon
                    className="w-[clamp(3rem,4vw,4rem)] h-[clamp(3rem,4vw,4rem)] text-[#2563eb]"
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="font-extrabold text-[#0b0f19] mb-[clamp(0.5rem,1vw,1rem)] text-[clamp(1rem,1.25vw,1.125rem)] leading-snug">
                  {feature.title}
                </h3>
                <p className="text-slate-700 font-medium text-[clamp(0.875rem,1vw,1rem)] leading-relaxed max-w-[260px]">
                  {feature.description}
                </p>

                {/* Vertical Divider for 4-col Desktop */}
                {idx < features.length - 1 && (
                  <div className="hidden lg:block absolute right-0 top-[10%] bottom-[10%] w-px bg-slate-200"></div>
                )}
                {/* Horizontal Divider for Mobile 1-col */}
                {idx < features.length - 1 && (
                  <div className="sm:hidden absolute -bottom-6 left-[15%] right-[15%] h-px bg-slate-200"></div>
                )}
              </div>
            ))}
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-[clamp(1.25rem,2vw,2rem)] flex flex-col sm:flex-row items-center justify-center gap-4 max-w-4xl mx-auto mt-[clamp(1rem,2vw,2rem)] shadow-xs">
            <Gift
              className="w-[clamp(2rem,3vw,3rem)] h-[clamp(2rem,3vw,3rem)] text-[#eab308] shrink-0"
              strokeWidth={1.5}
            />
            <p className="text-[#0b0f19] text-[clamp(0.875rem,1.1vw,1rem)] text-center sm:text-left leading-relaxed font-medium">
              <strong className="text-[#1a1f71] font-bold">
                Also includes:
              </strong>{" "}
              Launch Dashboard™ access, Operator Dashboard™ tools, training
              resources, lifetime updates, and real human support.
            </p>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}

function ComparisonSection() {
  const badList = [
    "App platforms determine pricing",
    "They retain platform fees",
    "No customer ownership",
    "No repeat rider system",
    "No long-term security",
  ];

  const goodList = [
    "You set your rates",
    "Fares are paid directly to your business",
    "You own your customers",
    "You build repeat riders",
    "You grow referrals",
    "Customers save YOUR number",
    "You create long-term income",
  ];

  return (
    <section className="bg-white py-3" id="comparison">
      <PageContainer size="full">
        {/* WIDESCREEN DESKTOP LAYOUT (Strict Grid matching screenshot at xl and above) */}
        <div className="hidden xl:grid grid-cols-[1.1fr_1fr_auto_1.15fr_1.1fr] bg-white border border-slate-200 rounded-[2rem] overflow-hidden shadow-sm items-stretch">
          {/* 1. Left Image */}
          <div className="relative min-h-[360px]">
            <img
              src={coupleComparisonLeft}
              alt="Unhappy couple in car"
              className="absolute inset-0 w-full h-full object-cover object-[right_top]"
              style={{
                WebkitMaskImage:
                  "linear-gradient(to right, black 60%, transparent 100%)",
                maskImage:
                  "linear-gradient(to right, black 60%, transparent 100%)",
              }}
            />
          </div>

          {/* 2. Left Text */}
          <div className="flex flex-col justify-center py-8 px-4 2xl:px-6 z-10 bg-white">
            <h3 className="text-[clamp(1.125rem,1.5vw,1.5rem)] font-extrabold text-[#b91c1c] mb-[clamp(1rem,1.5vw,1.25rem)] uppercase tracking-wide leading-snug">
              RIDESHARING APPS
              <br />
              CONTROL EVERYTHING
            </h3>
            <ul className="space-y-3 2xl:space-y-4">
              {badList.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start text-[#1a1f71] text-[clamp(0.875rem,1.1vw,1.125rem)] font-bold"
                >
                  <XCircle className="w-5 h-5 mr-3 mt-[2px] fill-[#b91c1c] text-white shrink-0" />
                  <span className="leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Center VS */}
          <div className="flex items-center justify-center px-6 2xl:px-8 bg-white z-20">
            <div className="w-[clamp(4rem,6vw,6rem)] h-[clamp(4rem,6vw,6rem)] bg-[#081363] rounded-full flex items-center justify-center text-white font-extrabold text-[clamp(1.5rem,2vw,2rem)] shadow-md">
              VS.
            </div>
          </div>

          {/* 4. Right Text */}
          <div className="flex flex-col justify-center py-8 pl-4 pr-4 2xl:pr-6 z-10 bg-white">
            <h3 className="text-[clamp(1.125rem,1.5vw,1.5rem)] font-extrabold text-[#1a1f71] mb-[clamp(1rem,1.5vw,1.25rem)] uppercase tracking-wide leading-snug">
              YOUR AIRPORT TRANSPORTATION
              <br />
              BUSINESS™
            </h3>
            <ul className="space-y-3 2xl:space-y-4">
              {goodList.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start text-[#1a1f71] text-[clamp(0.875rem,1.1vw,1.125rem)] font-bold"
                >
                  <CheckCircle2 className="w-5 h-5 mr-3 mt-[2px] fill-[#2563eb] text-white shrink-0" />
                  <span className="leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 5. Right Image */}
          <div className="relative min-h-[360px]">
            <img
              src={coupleComparisonRight}
              alt="Happy couple in car"
              className="absolute inset-0 w-full h-full object-cover object-[right_top]"
              style={{
                WebkitMaskImage:
                  "linear-gradient(to left, black 60%, transparent 100%)",
                maskImage:
                  "linear-gradient(to left, black 60%, transparent 100%)",
              }}
            />
          </div>
        </div>

        {/* MOBILE / TABLET / SMALL LAPTOP LAYOUT */}
        <div className="xl:hidden w-full flex flex-col bg-white border border-slate-200 rounded-[2rem] overflow-hidden shadow-sm">
          {/* Left Side (Bad) */}
          <div className="relative flex flex-col sm:flex-row items-stretch border-b border-slate-100">
            <div className="w-full sm:w-[45%] lg:w-[50%] relative min-h-[240px] sm:min-h-full">
              <img
                src={coupleComparisonLeft}
                alt="Unhappy couple"
                className="absolute inset-0 w-full h-full object-cover object-[center_top]"
                style={{
                  WebkitMaskImage:
                    "linear-gradient(to right, black 60%, transparent 100%)",
                  maskImage:
                    "linear-gradient(to right, black 60%, transparent 100%)",
                }}
              />
            </div>
            <div className="w-full sm:w-[55%] lg:w-[50%] py-8 px-6 md:p-10 relative z-10 flex flex-col justify-center bg-white sm:bg-transparent">
              <h3 className="text-[clamp(1.125rem,2vw,1.5rem)] font-extrabold text-[#b91c1c] mb-5 uppercase tracking-wide leading-snug">
                RIDESHARING APPS
                <br />
                CONTROL EVERYTHING
              </h3>
              <ul className="space-y-3 sm:space-y-4">
                {badList.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start text-[#1a1f71] text-[clamp(0.875rem,1.5vw,1.125rem)] font-bold"
                  >
                    <XCircle className="w-5 h-5 md:w-6 md:h-6 mr-3 mt-[1px] fill-[#b91c1c] text-white shrink-0" />
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Mobile VS */}
          <div className="w-full bg-slate-50 py-5 flex items-center justify-center relative z-20 border-y border-slate-200">
            <div className="w-[clamp(4rem,5vw,5rem)] h-[clamp(4rem,5vw,5rem)] bg-[#081363] rounded-full flex items-center justify-center text-white font-extrabold text-[clamp(1.25rem,2vw,1.5rem)] shadow-md">
              VS.
            </div>
          </div>

          {/* Right Side (Good) */}
          <div className="relative flex flex-col-reverse sm:flex-row items-stretch">
            <div className="w-full sm:w-[55%] lg:w-[50%] py-8 px-6 md:p-10 relative z-10 flex flex-col justify-center bg-white sm:bg-transparent">
              <h3 className="text-[clamp(1.125rem,2vw,1.5rem)] font-extrabold text-[#1a1f71] mb-5 uppercase tracking-wide leading-snug">
                YOUR AIRPORT TRANSPORTATION BUSINESS™
              </h3>
              <ul className="space-y-3 sm:space-y-4">
                {goodList.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start text-[#1a1f71] text-[clamp(0.875rem,1.5vw,1.125rem)] font-bold"
                  >
                    <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 mr-3 mt-[1px] fill-[#2563eb] text-white shrink-0" />
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full sm:w-[45%] lg:w-[50%] relative min-h-[240px] sm:min-h-full">
              <img
                src={coupleComparisonRight}
                alt="Happy couple"
                className="absolute inset-0 w-full h-full object-cover object-[center_top]"
                style={{
                  WebkitMaskImage:
                    "linear-gradient(to left, black 60%, transparent 100%)",
                  maskImage:
                    "linear-gradient(to left, black 60%, transparent 100%)",
                }}
              />
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}

const IconLowerPay = () => (
  <svg
    className="w-7 h-7 xl:w-8 xl:h-8 text-[#0a1154]"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2v6" />
    <path d="M9.5 3.5h3a1.5 1.5 0 0 1 0 3h-3a1.5 1.5 0 0 0 0 3h3.5" />
    <path d="M3 20l5-5 4 4 7-8" />
    <path d="M16 11h3v3" />
  </svg>
);

const IconDeactivations = () => (
  <svg
    className="w-7 h-7 xl:w-8 xl:h-8 text-[#0a1154]"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="5" y="2" width="14" height="20" rx="3" />
    <path d="M9.5 9l5 5" />
    <path d="M14.5 9l-5 5" />
    <line x1="12" y1="18" x2="12.01" y2="18" />
  </svg>
);

const IconLongHours = () => (
  <svg
    className="w-7 h-7 xl:w-8 xl:h-8 text-[#0a1154]"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="9" />
    <polyline points="12 7 12 12 15 15" />
  </svg>
);

const IconAppsGrow = () => (
  <svg
    className="w-7 h-7 xl:w-8 xl:h-8 text-[#0a1154]"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 14l6-6 4 4 6-7" />
    <path d="M16 5h4v4" />
    <rect x="4" y="16" width="3" height="5" rx="0.5" />
    <rect x="9" y="14" width="3" height="7" rx="0.5" />
    <rect x="14" y="11" width="3" height="10" rx="0.5" />
    <rect x="19" y="8" width="3" height="13" rx="0.5" />
  </svg>
);

const IconNoOwnership = () => (
  <svg
    className="w-7 h-7 xl:w-8 xl:h-8 text-[#0a1154]"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3" />
    <path d="M19 19c-1 2.5-3.5 3-7 2.5" />
    <circle cx="11" cy="21.5" r="1" />
  </svg>
);

function WhyWinSection() {
  const reasons = [
    {
      icon: IconLowerPay,
      title: "Lower pay.\nHigher fees.",
      description: "You earn less\nevery year.",
    },
    {
      icon: IconDeactivations,
      title: "Unfair deactivations\nwith no warning.",
      description: "One issue can take away\nyour only income.",
    },
    {
      icon: IconLongHours,
      title: "Long hours.\nNo freedom.",
      description: "You're always on their\nschedule, not your own.",
    },
    {
      icon: IconAppsGrow,
      title: "Apps grow.\nYou stay stuck.",
      description: "They take billions.\nYou get a fraction.",
    },
    {
      icon: IconNoOwnership,
      title: "No customer\nownership.",
      description: "You're just a driver\nnumber.",
    },
  ];

  return (
    <section className="bg-white py-3" id="why-win">
      <PageContainer size="full">
        <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm p-[clamp(1.5rem,4vw,3.5rem)]">
          <h2 className="text-center text-[#0a1154] font-extrabold text-[clamp(1.25rem,2.5vw,1.875rem)] uppercase tracking-wide mb-[clamp(2rem,4vw,3rem)]">
            WHY COUPLES ARE BUILDING THEIR OWN BUSINESSES
          </h2>

          <div className="flex flex-col xl:flex-row items-stretch justify-between divide-y xl:divide-y-0 xl:divide-x divide-slate-200">
            {reasons.map((reason, idx) => (
              <div
                key={idx}
                className="flex flex-row items-center gap-4 sm:gap-6 xl:gap-4 flex-1 py-6 xl:py-0 xl:px-4 2xl:px-6 first:pt-0 xl:first:pt-0 xl:first:pl-0 last:pb-0 xl:last:pb-0 xl:last:pr-0"
              >
                <div className="w-[clamp(3.5rem,4vw,4rem)] h-[clamp(3.5rem,4vw,4rem)] rounded-full bg-[#ebf0fc] flex items-center justify-center shrink-0 shadow-xs">
                  <reason.icon />
                </div>
                <div className="flex flex-col text-left">
                  <h4 className="font-extrabold text-[#0a1154] text-[clamp(1rem,1.1vw,1.125rem)] leading-snug whitespace-pre-line mb-1">
                    {reason.title}
                  </h4>
                  <p className="text-[#0a1154]/80 text-[clamp(0.875rem,1vw,1rem)] leading-relaxed font-medium whitespace-pre-line">
                    {reason.description}
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

function HowItWorksSection() {
  const steps = [
    {
      number: 1,
      icon: Lock,
      title: "Get Access",
      description: "Secure your system and get started instantly.",
    },
    {
      number: 2,
      icon: ClipboardList,
      title: "Submit Your Details",
      description:
        "We gather your business information and get everything ready.",
    },
    {
      number: 3,
      icon: Rocket,
      title: "We Build & You Start",
      description:
        "We build your booking flow and selling page. You start getting customers.",
    },
  ];

  return (
    <section className="bg-white py-3" id="how-it-works-steps">
      <PageContainer size="full">
        <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm p-[clamp(1.5rem,4vw,3.5rem)]">
          <h2 className="text-center text-[#1a1f71] font-extrabold text-[clamp(1.25rem,2.5vw,1.875rem)] uppercase tracking-wide mb-[clamp(2.5rem,4vw,4rem)]">
            HOW IT WORKS: LAUNCH YOUR BUSINESS IN 3 SIMPLE STEPS
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-6 items-center w-full relative">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="flex flex-row items-center gap-4 sm:gap-6 lg:gap-4 justify-start sm:justify-center relative"
              >
                {/* Number Circle */}
                <div className="w-[clamp(2.5rem,3vw,3rem)] h-[clamp(2.5rem,3vw,3rem)] rounded-full bg-[#2563eb] text-white flex items-center justify-center font-extrabold text-[clamp(1rem,1.2vw,1.125rem)] shrink-0 shadow-sm">
                  {step.number}
                </div>

                <div className="shrink-0">
                  <step.icon
                    className="w-[clamp(2.5rem,3vw,3rem)] h-[clamp(2.5rem,3vw,3rem)] text-[#1a1f71]"
                    strokeWidth={1.5}
                  />
                </div>

                <div className="flex flex-col justify-center max-w-xs">
                  <h4 className="font-extrabold text-[#1a1f71] text-[clamp(1rem,1.25vw,1.125rem)] leading-snug">
                    {step.title}
                  </h4>
                  <p className="text-slate-700 text-[clamp(0.875rem,1.1vw,1rem)] leading-snug font-medium mt-1">
                    {step.description}
                  </p>
                </div>

                {idx < steps.length - 1 && (
                  <div className="hidden lg:flex absolute -right-4 top-1/2 -translate-y-1/2 text-[#1a1f71] z-10">
                    <ArrowRight className="w-[clamp(1.5rem,2vw,2rem)] h-[clamp(1.5rem,2vw,2rem)] stroke-[2.5]" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </PageContainer>
    </section>
  );
}

function ReviewsSection() {
  const reviews = [
    {
      quote:
        "We followed the step-by-step launch system and booked our first airport ride shortly after. It's amazing building a business and more freedom together.",
      name: "Mark & Lisa",
      location: "Phoenix, AZ",
      image: markLisaImage,
    },
    {
      quote:
        "The system is everything we needed. We finally have control of our schedule and our income.",
      name: "Tom & Karen",
      location: "Dallas, TX",
      image: tomKarenImage,
    },
    {
      quote:
        "We love helping travelers and building a business that's 100% ours. This business has changed our future.",
      name: "Ryan & Michelle",
      location: "Charlotte, NC",
      image: ryanMichelleImage,
    },
  ];

  return (
    <section className="bg-white py-3" id="reviews">
      <PageContainer size="full">
        <div className="w-full rounded-[2rem] border border-slate-200 shadow-sm p-[clamp(1.5rem,4vw,3.5rem)] bg-white">
          <h2 className="text-[clamp(1.25rem,2.5vw,1.875rem)] font-extrabold text-[#1a1f71] text-center mb-[clamp(2.5rem,4vw,4rem)] uppercase tracking-wide">
            COUPLES ACROSS THE COUNTRY ARE BUILDING REAL BUSINESSES TOGETHER
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-6 lg:divide-x divide-slate-100 w-full">
            {reviews.map((review, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-stretch gap-4 sm:gap-6 w-full flex-1 lg:px-6 first:pl-0 last:pr-0"
              >
                {/* Image */}
                <div className="shrink-0 w-full sm:w-[150px] lg:w-full xl:w-[140px] flex">
                  <img
                    src={review.image}
                    alt={review.name}
                    loading="lazy"
                    className="w-full h-48 sm:h-auto lg:h-48 xl:h-auto rounded-2xl object-cover object-top shadow-sm"
                  />
                </div>

                {/* Review Content */}
                <div className="flex flex-col justify-start py-1 text-left flex-1">
                  {/* Quote */}
                  <p className="text-slate-800 font-medium text-[clamp(0.875rem,1.1vw,1rem)] leading-relaxed mb-[clamp(1.5rem,2vw,2rem)]">
                    "{review.quote}"
                  </p>

                  <div className="mt-auto">
                    {/* Stars */}
                    <div className="flex items-center justify-start gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 fill-[#eab308] text-[#eab308]"
                        />
                      ))}
                    </div>

                    {/* Author */}
                    <div>
                      <h5 className="font-extrabold text-[#1a1f71] text-[clamp(1rem,1.2vw,1.125rem)] leading-tight">
                        {review.name}
                      </h5>
                      <span className="text-slate-600 font-medium text-[clamp(0.875rem,1vw,0.875rem)]">
                        {review.location}
                      </span>
                    </div>
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
    // Row 1
    {
      question: "Will this work in our city?",
      answer:
        "Yes. This system can work in any market with an airport and travelers who need reliable transportation. You choose your service area, your rates, and your availability.",
    },
    {
      question: "How is this different from Uber or Lyft?",
      answer:
        "With rideshare apps, they control the customer. App platforms determine pricing and retain platform fees. With QuitTheApp, you own your customer list, set your rates, and fares are paid directly to your business, subject to payment processing and normal operating expenses.",
    },
    {
      question: "Is the $495 really a one-time payment?",
      answer:
        "Yes. The $495 core system is a one-time payment. No monthly platform fees. No commissions. No subscription.",
    },
    // Row 2
    {
      question: "Do we both need to drive?",
      answer:
        "No. Many couples can divide the work. One person may drive while the other handles scheduling, follow-up, customer communication, outreach, or referrals.",
    },
    {
      question: "How do we get our first customers?",
      answer:
        "Your system includes the Customer Acquisition Center™ with QR referral cards, outreach templates, and customer-building tools designed for airport transportation operators.",
    },
    {
      question: "What if we are not tech-savvy?",
      answer:
        "No problem. You can use the step-by-step resources, choose Guided Setup, or have the system built for you with Done For You setup.",
    },
  ];

  return (
    <section className="bg-white py-3" id="faq">
      <PageContainer size="full">
        <div className="w-full rounded-[2rem] border border-slate-200 shadow-sm p-[clamp(1.5rem,4vw,3.5rem)] bg-white">
          <h2 className="text-[clamp(1.25rem,2.5vw,1.875rem)] font-extrabold text-[#1a1f71] text-center mb-[clamp(2.5rem,4vw,4rem)] uppercase tracking-wide">
            FREQUENTLY ASKED QUESTIONS
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-[clamp(2rem,3vw,3rem)] gap-y-[clamp(2rem,3vw,2.5rem)] w-full relative">
            {/* Desktop Vertical Dividers for 3-col Widescreen */}
            <div className="hidden xl:block absolute left-[33.33%] top-0 bottom-0 w-px bg-slate-100 -translate-x-1/2"></div>
            <div className="hidden xl:block absolute left-[66.66%] top-0 bottom-0 w-px bg-slate-100 -translate-x-1/2"></div>

            {faqs.map((faq, idx) => (
              <div key={idx} className="flex items-start gap-4 sm:gap-5">
                <div className="shrink-0 w-8 h-8 rounded-full bg-[#2563eb] text-white flex items-center justify-center font-extrabold text-sm shadow-sm mt-0.5">
                  Q
                </div>
                <div className="flex flex-col">
                  <h4 className="font-extrabold text-[#1a1f71] text-[clamp(1rem,1.25vw,1.125rem)] leading-snug mb-2">
                    {faq.question}
                  </h4>
                  <p className="text-slate-700 text-[clamp(0.875rem,1.1vw,1rem)] font-medium leading-relaxed">
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

  const checkmarks = [
    "No monthly platform fees",
    "Built specifically for couples",
    "Real human support",
    "Secure checkout",
  ];

  const trustBadges = [
    {
      icon: Lock,
      title: "Secure Checkout",
      subtitle: "100% safe & encrypted",
    },
    {
      icon: ShieldCheck,
      title: "One-Time Payment",
      subtitle: "Protected Payment",
    },
    {
      icon: Clock,
      title: "Step-by-Step",
      subtitle: "Quick Launch System",
    },
    {
      icon: Headset,
      title: "7-Day Support",
      subtitle: "We're here for you",
    },
    {
      icon: ShieldCheck,
      title: "Real Human Support",
      subtitle: "From real partners",
    },
  ];

  return (
    <section className="bg-[#0b0f19] py-3 border-t-4 border-[#eab308]" id="footer-cta">
      <PageContainer size="full">
        {/* Main 3-Column Layout */}
        <div className="flex flex-col lg:flex-row justify-between gap-10 lg:gap-8 pb-10 border-b border-slate-800">
          {/* Column 1: Intro */}
          <div className="lg:w-1/3 flex flex-col pr-0 lg:pr-8 lg:border-r border-slate-800">
            <h3 className="text-2xl sm:text-3xl font-bold text-white leading-tight mb-6 uppercase">
              Start Our <br />
              <span className="text-[#eab308]">Private Airport Business™</span>
            </h3>
            <div className="flex items-start gap-4">
              <Users className="w-10 h-10 text-[#eab308] shrink-0 stroke-[1.5]" />
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
                <span className="text-[clamp(2.5rem,4vw,3rem)] font-bold text-[#eab308]">$495</span>
                <span className="text-white font-bold text-lg">
                  One-time payment
                </span>
              </div>
              <span className="text-slate-300 text-sm mt-2 leading-snug max-w-[280px]">
                Includes the complete QuitTheApp DIY launch system.<br/>
                <span className="mt-2 block font-medium">Optional $199 We Do It for You upgrade available.</span>
              </span>
            </div>
            <ul className="space-y-2 mt-2">
              {checkmarks.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-center text-slate-300 text-sm"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#eab308] mr-3 shrink-0 stroke-[3]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Button & Payments */}
          <div className="lg:w-1/3 flex flex-col justify-center items-center lg:items-end">
            {user?.status === "active" ? (
              <button
                onClick={openPricingModal}
                className="cursor-pointer w-full bg-gradient-to-b from-[#fde047] to-[#eab308] hover:from-[#fef08a] hover:to-[#ca8a04] text-[#0b0f19] font-extrabold py-4 px-6 rounded-lg transition-all shadow-lg shadow-[#eab308]/20 flex items-center justify-between group text-base sm:text-lg mb-4 min-h-[56px]"
              >
                <span className="text-center w-full">
                  Start Your Business
                </span>
                <div className="bg-[#0b0f19] rounded-full p-1 ml-4 shrink-0 transition-transform group-hover:translate-x-1">
                  <ArrowRight className="w-5 h-5 text-[#eab308] stroke-[3]" />
                </div>
              </button>
            ) : accessToken ? (
              <button
                onClick={openPricingModal}
                className="cursor-pointer w-full bg-gradient-to-b from-[#fde047] to-[#eab308] hover:from-[#fef08a] hover:to-[#ca8a04] text-[#0b0f19] font-extrabold py-4 px-6 rounded-lg transition-all shadow-lg shadow-[#eab308]/20 flex items-center justify-between group text-base sm:text-lg mb-4 min-h-[56px]"
              >
                <span className="text-center w-full">
                  Start Our Private Airport Business™ — $495
                </span>
                <div className="bg-[#0b0f19] rounded-full p-1 ml-4 shrink-0 transition-transform group-hover:translate-x-1">
                  <ArrowRight className="w-5 h-5 text-[#eab308] stroke-[3]" />
                </div>
              </button>
            ) : (
              <button
                onClick={openPricingModal}
                className="cursor-pointer w-full bg-gradient-to-b from-[#fde047] to-[#eab308] hover:from-[#fef08a] hover:to-[#ca8a04] text-[#0b0f19] font-extrabold py-4 px-6 rounded-lg transition-all shadow-lg shadow-[#eab308]/20 flex items-center justify-between group text-base sm:text-lg mb-4 min-h-[56px]"
              >
                <span className="text-center w-full">
                  Start Our Private Airport Business™ — $495
                </span>
                <div className="bg-[#0b0f19] rounded-full p-1 ml-4 shrink-0 transition-transform group-hover:translate-x-1">
                  <ArrowRight className="w-5 h-5 text-[#eab308] stroke-[3]" />
                </div>
              </button>
            )}
            
            {/* Payment Badges */}
            <PaymentBadges justify="center" />
          </div>
        </div>

        {/* Bottom Trust Indicators & Copyright */}
        <div className="pt-6 flex flex-col items-center">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-4 mb-6">
            {trustBadges.map((badge, idx) => (
              <div key={idx} className="flex items-center gap-2 text-slate-400">
                <badge.icon className="w-4 h-4 shrink-0" strokeWidth={1.5} />
                <span className="text-xs">{badge.title}</span>
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

  const logo = coupleLogo;
  const hoverTextClass = "hover:text-[#eab308]";
  const btnClass = "bg-[#eab308] hover:bg-[#ca8a04] shadow-[#eab308]/20";

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300 bg-white w-full",
        isScrolled ? "shadow-md py-1" : "py-4",
      )}
    >
      <PageContainer size="full">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-2 z-50">
            <img src={logo} alt="QuitTheApp Logo" className="h-8 w-auto" />
          </Link>

          {/* Right Section: Nav + CTA */}
          <div className="hidden lg:flex items-center gap-8">
            <nav className="flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={cn(
                    "text-[#0b0f19] text-sm font-semibold tracking-wide transition-colors",
                    hoverTextClass,
                  )}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {accessToken ? (
              <ProfileDropdown openPricingModal={openPricingModal} />
            ) : (
              <>
                <Link
                  to="/login"
                  className={cn(
                    "text-[#0b0f19] text-sm font-semibold tracking-wide transition-colors",
                    hoverTextClass,
                  )}
                >
                  Login
                </Link>
                <button
                  onClick={openPricingModal}
                  className={cn(
                    "cursor-pointer text-white font-bold py-2.5 px-6 rounded-md transition-colors text-sm shadow-lg",
                    btnClass,
                  )}
                >
                  Start Our Private Airport Business™ — $495
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="cursor-pointer lg:hidden text-[#0b0f19] z-50 p-2 -mr-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </PageContainer>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-t border-slate-200 shadow-xl">
          <nav className="flex flex-col p-6 gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "text-[#0b0f19] text-lg font-semibold transition-colors py-1",
                  hoverTextClass,
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
                    className="text-[#0b0f19] hover:text-[#eab308] text-lg font-semibold py-4 border-b border-slate-100 transition-colors"
                  >
                    Admin Dashboard
                  </Link>
                ) : user?.status === "active" ? (
                  <Link
                    to="/dashboard"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-[#0b0f19] hover:text-[#eab308] text-lg font-semibold py-4 border-b border-slate-100 transition-colors"
                  >
                    Dashboard
                  </Link>
                ) : (
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      openPricingModal();
                    }}
                    className="text-left text-[#0b0f19] hover:text-[#eab308] text-lg font-semibold py-4 border-b border-slate-100 transition-colors w-full"
                  >
                    Complete Checkout
                  </button>
                )}
                <Link
                  to={user?.role === "admin" ? "/admin/settings" : "/profile"}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-[#0b0f19] hover:text-[#eab308] text-lg font-semibold py-4 border-b border-slate-100 transition-colors"
                >
                  {user?.role === "admin" ? "Admin Settings" : "Profile & Settings"}
                </Link>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleLogout();
                  }}
                  className="text-left text-red-400 hover:text-red-300 text-lg font-semibold py-4 transition-colors w-full"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "text-[#0b0f19] text-lg font-semibold transition-colors py-1",
                    hoverTextClass,
                  )}
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
                  Start Our Private Airport Business™ — $495
                </button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
