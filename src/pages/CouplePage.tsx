import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
import coupleBanner from "../assets/coupleBanner.png";
import coupleComparisonLeft from "../assets/coupleComparisonSectionLeft.png";
import coupleComparisonRight from "../assets/coupleComparisonSectionRight.png";
import reviewImage from "../assets/review.jpg";

export default function CouplePage() {
  return (
    <>
      <Navbar />
      <HeroBanner />
      <FeaturesSection />
      <ComparisonSection />
      <WhyWinSection />
      <HowItWorksSection />
      <ReviewsSection />
      <FaqSection />
      <FooterCTASection />
    </>
  );
}

function HeroBanner() {
  return (
    <div className="relative w-full bg-[#f8fafc] border-b border-gray-100 min-h-[100svh] lg:max-h-[100svh] lg:h-[100svh] lg:overflow-hidden flex flex-col justify-between pt-4 pb-12 lg:pb-0">
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
              <h1 className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-extrabold text-[#060D64] leading-[1.1] sm:leading-[1.15] mb-4 sm:mb-6 tracking-tight uppercase">
                Build An Airport
                <br />
                Transportation Business
                <br />
                <span className="text-[#2563eb] text-4xl sm:text-5xl md:text-6xl xl:text-[70px] relative inline-block mt-2 font-extrabold">
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

              <p className="text-lg sm:text-xl lg:text-[22px] text-[#060D64] font-semibold mb-6 sm:mb-8 max-w-xl leading-relaxed">
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
                    className="flex items-center text-[#060D64] font-bold text-base sm:text-lg"
                  >
                    <CheckCircle2 className="text-white mr-3 w-5 h-5 sm:w-6 sm:h-6 fill-[#2563eb] shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <button className="cursor-pointer bg-[#eab308] hover:bg-[#ca8a04] text-[#0b0f19] font-extrabold py-4 px-6 sm:py-5 sm:px-8 rounded-xl transition-all shadow-xl shadow-[#eab308]/30 flex items-center justify-between group w-full sm:w-auto mb-8 sm:mb-12 lg:mb-16">
                <span className="text-left leading-snug pr-4 text-lg sm:text-xl md:text-2xl font-extrabold">
                  Build Our Airport Transportation Business Today™
                </span>
                <ArrowRight className="w-6 h-6 sm:w-7 sm:h-7 shrink-0 group-hover:translate-x-1.5 transition-transform stroke-[2.5]" />
              </button>
            </div>

            {/* Right Side Card */}
            <div className="w-full lg:w-auto xl:w-[45%] flex justify-center xl:justify-end z-10 mt-6 lg:mt-0">
              <div className="bg-[#0b0f19] rounded-[2rem] p-6 sm:p-8 xl:p-12 xl:px-14 shadow-2xl w-fit xl:w-full xl:max-w-[480px] border-t-[6px] border-[#eab308]">
                <h3 className="text-[#eab308] font-bold text-base sm:text-lg mb-6 uppercase tracking-wider">
                  YOUR BUSINESS GROWS WHEN:
                </h3>

                <ul className="space-y-4 mb-8">
                  {[
                    "Customers book again",
                    "Families refer friends",
                    "Hotels & airports recommend you",
                    "Airport travelers save your card",
                    "Your reputation compounds",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center text-white text-sm sm:text-base font-semibold"
                    >
                      <CheckCircle2 className="w-5 h-5 mr-3 fill-[#2563eb] text-white shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="w-full h-px bg-slate-800 mb-8"></div>

                <div>
                  <h4 className="text-white font-extrabold text-xl sm:text-2xl xl:text-3xl leading-tight mb-4">
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
      <div className="relative z-20 w-full lg:w-[70%] xl:w-[60%] bg-white lg:rounded-tr-[5rem] mt-auto py-6 sm:py-8 pl-4 sm:pl-8 xl:pl-16 pr-4 sm:pr-12 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-4 xl:gap-6">
          <div className="flex items-center gap-3 xl:gap-4">
            <CreditCard
              className="w-8 h-8 xl:w-10 xl:h-10 text-[#040a23] shrink-0"
              strokeWidth={1.5}
            />
            <div className="text-xs sm:text-sm xl:text-[15px] font-bold text-[#040a23] leading-tight">
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
            <div className="text-xs sm:text-sm xl:text-[15px] font-bold text-[#040a23] leading-tight">
              Quick Launch Booking Flow
              <br />
              <span className="font-medium text-slate-600">in 48–72 hours</span>
            </div>
          </div>
          <div className="hidden md:block w-px h-10 bg-slate-200 shrink-0"></div>
          <div className="flex items-center gap-3 xl:gap-4">
            <ShieldCheck
              className="w-8 h-8 xl:w-10 xl:h-10 text-[#040a23] shrink-0"
              strokeWidth={1.5}
            />
            <div className="text-xs sm:text-sm xl:text-[15px] font-bold text-[#040a23] leading-tight">
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
    <section className="bg-white py-4 sm:py-6" id="how-it-works">
      <PageContainer size="full">
        <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm p-6 sm:p-8 md:p-10 lg:p-12">
          <h2 className="text-center text-[#1a1f71] font-extrabold text-xl sm:text-2xl lg:text-3xl tracking-wide uppercase mb-10 sm:mb-14">
            YOUR CORE SYSTEMS™ FOR BUILDING YOUR BUSINESS
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-6 relative mb-12 sm:mb-16">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center text-center px-4 sm:px-6 relative"
              >
                <div className="mb-4 sm:mb-6">
                  <feature.icon
                    className="w-12 h-12 sm:w-14 sm:h-14 text-[#2563eb]"
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="font-extrabold text-[#0b0f19] mb-2 sm:mb-3 text-base sm:text-lg leading-snug">
                  {feature.title}
                </h3>
                <p className="text-slate-700 font-medium text-sm sm:text-[15px] leading-relaxed max-w-[260px]">
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

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 sm:p-6 md:p-8 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-4xl mx-auto mt-4 sm:mt-6 shadow-xs">
            <Gift
              className="w-8 h-8 sm:w-10 sm:h-10 text-[#eab308] shrink-0"
              strokeWidth={1.5}
            />
            <p className="text-[#0b0f19] text-sm sm:text-base text-center sm:text-left leading-relaxed font-medium">
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
    "They set the prices",
    "They take 50–60% of every fare",
    "No customer ownership",
    "No repeat rider system",
    "No long-term security",
  ];

  const goodList = [
    "You set your rates",
    "You keep 100% of every fare",
    "You own your customers",
    "You build repeat riders",
    "You grow referrals",
    "Customers save YOUR number",
    "You create long-term income",
  ];

  return (
    <section className="bg-white py-4 sm:py-6" id="comparison">
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
            <h3 className="text-lg 2xl:text-xl font-extrabold text-[#b91c1c] mb-5 uppercase tracking-wide leading-snug">
              RIDESHARING APPS
              <br />
              CONTROL EVERYTHING
            </h3>
            <ul className="space-y-3 2xl:space-y-4">
              {badList.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start text-[#1a1f71] text-sm 2xl:text-base font-bold"
                >
                  <XCircle className="w-5 h-5 mr-3 mt-[2px] fill-[#b91c1c] text-white shrink-0" />
                  <span className="leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Center VS */}
          <div className="flex items-center justify-center px-6 2xl:px-8 bg-white z-20">
            <div className="w-20 h-20 2xl:w-24 2xl:h-24 bg-[#081363] rounded-full flex items-center justify-center text-white font-extrabold text-2xl 2xl:text-3xl shadow-md">
              VS.
            </div>
          </div>

          {/* 4. Right Text */}
          <div className="flex flex-col justify-center py-8 pl-4 pr-4 2xl:pr-6 z-10 bg-white">
            <h3 className="text-lg 2xl:text-xl font-extrabold text-[#1a1f71] mb-5 uppercase tracking-wide leading-snug">
              YOUR AIRPORT TRANSPORTATION
              <br />
              BUSINESS™
            </h3>
            <ul className="space-y-3 2xl:space-y-4">
              {goodList.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start text-[#1a1f71] text-sm 2xl:text-base font-bold"
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
              <h3 className="text-lg sm:text-xl md:text-2xl font-extrabold text-[#b91c1c] mb-5 uppercase tracking-wide leading-snug">
                RIDESHARING APPS
                <br />
                CONTROL EVERYTHING
              </h3>
              <ul className="space-y-3 sm:space-y-4">
                {badList.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start text-[#1a1f71] text-sm sm:text-base md:text-lg font-bold"
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
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#081363] rounded-full flex items-center justify-center text-white font-extrabold text-2xl shadow-md">
              VS.
            </div>
          </div>

          {/* Right Side (Good) */}
          <div className="relative flex flex-col-reverse sm:flex-row items-stretch">
            <div className="w-full sm:w-[55%] lg:w-[50%] py-8 px-6 md:p-10 relative z-10 flex flex-col justify-center bg-white sm:bg-transparent">
              <h3 className="text-lg sm:text-xl md:text-2xl font-extrabold text-[#1a1f71] mb-5 uppercase tracking-wide leading-snug">
                YOUR AIRPORT TRANSPORTATION BUSINESS™
              </h3>
              <ul className="space-y-3 sm:space-y-4">
                {goodList.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start text-[#1a1f71] text-sm sm:text-base md:text-lg font-bold"
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
    <section className="bg-white py-4 sm:py-6" id="why-win">
      <PageContainer size="full">
        <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm p-6 sm:p-8 md:p-10 lg:p-12">
          <h2 className="text-center text-[#0a1154] font-extrabold text-xl sm:text-2xl lg:text-3xl uppercase tracking-wide mb-8 sm:mb-12">
            WHY COUPLES ARE BUILDING THEIR OWN BUSINESSES
          </h2>

          <div className="flex flex-col xl:flex-row items-stretch justify-between divide-y xl:divide-y-0 xl:divide-x divide-slate-200">
            {reasons.map((reason, idx) => (
              <div
                key={idx}
                className="flex flex-row items-center gap-4 sm:gap-6 xl:gap-4 flex-1 py-6 xl:py-0 xl:px-4 2xl:px-6 first:pt-0 xl:first:pt-0 xl:first:pl-0 last:pb-0 xl:last:pb-0 xl:last:pr-0"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#ebf0fc] flex items-center justify-center shrink-0 shadow-xs">
                  <reason.icon />
                </div>
                <div className="flex flex-col text-left">
                  <h4 className="font-extrabold text-[#0a1154] text-base xl:text-[15px] 2xl:text-base leading-snug whitespace-pre-line mb-1">
                    {reason.title}
                  </h4>
                  <p className="text-[#0a1154]/80 text-sm xl:text-[13px] 2xl:text-sm leading-relaxed font-medium whitespace-pre-line">
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
    <section className="bg-white py-4 sm:py-6" id="how-it-works-steps">
      <PageContainer size="full">
        <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm p-6 sm:p-8 md:p-10 lg:p-12">
          <h2 className="text-center text-[#1a1f71] font-extrabold text-xl sm:text-2xl lg:text-3xl uppercase tracking-wide mb-10 sm:mb-14">
            HOW IT WORKS: LAUNCH YOUR BUSINESS IN 3 SIMPLE STEPS
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-6 items-center w-full relative">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="flex flex-row items-center gap-4 sm:gap-6 lg:gap-4 justify-start sm:justify-center relative"
              >
                {/* Number Circle */}
                <div className="w-10 h-10 rounded-full bg-[#2563eb] text-white flex items-center justify-center font-extrabold text-base shrink-0 shadow-sm">
                  {step.number}
                </div>

                {/* Dark Blue Icon */}
                <div className="shrink-0">
                  <step.icon
                    className="w-10 h-10 text-[#1a1f71]"
                    strokeWidth={1.5}
                  />
                </div>

                {/* Text Content */}
                <div className="flex flex-col justify-center max-w-xs">
                  <h4 className="font-extrabold text-[#1a1f71] text-base sm:text-lg leading-snug">
                    {step.title}
                  </h4>
                  <p className="text-slate-700 text-sm sm:text-base leading-snug font-medium mt-1">
                    {step.description}
                  </p>
                </div>

                {/* Arrow separator for desktop */}
                {idx < steps.length - 1 && (
                  <div className="hidden lg:flex absolute -right-4 top-1/2 -translate-y-1/2 text-[#1a1f71] z-10">
                    <ArrowRight className="w-6 h-6 stroke-[2.5]" />
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
        "We launched in 4 days and booked our first airport ride in 72 hours. It's amazing building a business and more freedom together.",
      name: "Mark & Lisa",
      location: "Phoenix, AZ",
    },
    {
      quote:
        "The system is everything we needed. We finally have control of our schedule and our income.",
      name: "Tom & Karen",
      location: "Dallas, TX",
    },
    {
      quote:
        "We love helping travelers and building a business that's 100% ours. This business has changed our future.",
      name: "Ryan & Michelle",
      location: "Charlotte, NC",
    },
  ];

  return (
    <section className="bg-white py-4 sm:py-6" id="reviews">
      <PageContainer size="full">
        <div className="w-full rounded-[2rem] border border-slate-200 shadow-sm p-6 sm:p-8 md:p-10 lg:p-12 bg-white">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#1a1f71] text-center mb-10 sm:mb-14 uppercase tracking-wide">
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
                    src={reviewImage}
                    alt={review.name}
                    className="w-full h-48 sm:h-auto lg:h-48 xl:h-auto rounded-2xl object-cover shadow-sm"
                  />
                </div>

                {/* Review Content */}
                <div className="flex flex-col justify-start py-1 text-left flex-1">
                  {/* Quote */}
                  <p className="text-slate-800 font-medium text-sm sm:text-base leading-relaxed mb-6">
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
                      <h5 className="font-extrabold text-[#1a1f71] text-base leading-tight">
                        {review.name}
                      </h5>
                      <span className="text-slate-600 font-medium text-sm">
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
        "With rideshare apps, they control the customer, set the pricing, and take 50–60% of every fare. With QuitTheApp, you own your customer list, set your rates, keep 100% of your fare, and build a business asset together.",
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
    <section className="bg-white py-4 sm:py-6" id="faq">
      <PageContainer size="full">
        <div className="w-full rounded-[2rem] border border-slate-200 shadow-sm p-6 sm:p-8 md:p-10 lg:p-12 bg-white">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#1a1f71] text-center mb-10 sm:mb-14 uppercase tracking-wide">
            FREQUENTLY ASKED QUESTIONS
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-12 gap-y-10 w-full relative">
            {/* Desktop Vertical Dividers for 3-col Widescreen */}
            <div className="hidden xl:block absolute left-[33.33%] top-0 bottom-0 w-px bg-slate-100 -translate-x-1/2"></div>
            <div className="hidden xl:block absolute left-[66.66%] top-0 bottom-0 w-px bg-slate-100 -translate-x-1/2"></div>

            {faqs.map((faq, idx) => (
              <div key={idx} className="flex items-start gap-4 sm:gap-5">
                <div className="shrink-0 w-8 h-8 rounded-full bg-[#2563eb] text-white flex items-center justify-center font-extrabold text-sm shadow-sm mt-0.5">
                  Q
                </div>
                <div className="flex flex-col">
                  <h4 className="font-extrabold text-[#1a1f71] text-base sm:text-lg leading-snug mb-2">
                    {faq.question}
                  </h4>
                  <p className="text-slate-700 text-sm sm:text-base font-medium leading-relaxed">
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

function FooterCTASection() {
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
      subtitle: "100% Safe",
    },
    {
      icon: Clock,
      title: "Quick Launch Booking Flow",
      subtitle: "in 48–72 Hours",
    },
    {
      icon: Headset,
      title: "7-Day Support",
      subtitle: "We're here for you",
    },
    {
      icon: ShieldCheck,
      title: "Satisfaction Guaranteed",
      subtitle: "Real results. Real partners.",
    },
  ];

  return (
    <section className="bg-white py-4 sm:py-6 pb-12 sm:pb-16" id="footer-cta">
      <PageContainer size="full">
        {/* Dark Blue Banner Card - horizontal layout triggered at xl (1240px) to ensure no squeezed typography on tablets or small laptops */}
        <div className="w-full bg-[#0b0f19] rounded-[2rem] shadow-2xl flex flex-col xl:flex-row items-center justify-between p-8 sm:p-10 xl:p-10 2xl:p-12 gap-10 xl:gap-6 border-b-[6px] border-[#eab308]">
          {/* Left: Icon and Title */}
          <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 shrink-0 text-center sm:text-left">
            {/* Custom Icon Group */}
            <div className="relative flex items-center justify-center shrink-0 w-20 h-20 sm:w-24 sm:h-24 xl:w-20 xl:h-20">
              <RefreshCcw
                className="w-full h-full text-[#eab308] absolute inset-0"
                strokeWidth={1.5}
              />
              <Users
                className="w-10 h-10 sm:w-12 sm:h-12 xl:w-10 xl:h-10 text-[#eab308] relative z-10"
                strokeWidth={1.5}
              />
            </div>

            <div className="flex flex-col">
              <h3 className="text-white font-extrabold text-xl sm:text-2xl xl:text-[22px] 2xl:text-2xl tracking-wide leading-snug">
                ONE GREAT AIRPORT CUSTOMER
                <br />
                CAN TURN INTO <span className="text-[#eab308]">YEARS OF</span>
                <br />
                <span className="text-[#eab308]">REPEAT RIDES.™</span>
              </h3>
            </div>
          </div>

          {/* Pricing */}
          <div className="flex flex-col items-center justify-center shrink-0 xl:px-4">
            <span className="text-[#eab308] text-5xl sm:text-6xl font-extrabold leading-none tracking-tight mb-2">
              $495
            </span>
            <span className="text-white text-xs sm:text-sm font-bold tracking-widest uppercase">
              ONE-TIME PAYMENT
            </span>
          </div>

          {/* Vertical Divider */}
          <div className="hidden xl:block w-px h-24 bg-slate-800 shrink-0 mx-2"></div>

          {/* Checkmarks */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:flex xl:flex-col gap-3 sm:gap-4 xl:gap-3 shrink-0 w-full sm:w-auto">
            {checkmarks.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 fill-[#2563eb] text-white shrink-0" />
                <span className="text-white text-sm sm:text-base xl:text-sm 2xl:text-base font-semibold tracking-wide">
                  {item}
                </span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="shrink-0 w-full xl:w-auto">
            <button className="cursor-pointer w-full xl:w-auto bg-gradient-to-b from-[#fde047] to-[#eab308] hover:from-[#fef08a] hover:to-[#ca8a04] text-[#0b0f19] font-extrabold py-5 px-8 xl:py-4 xl:px-8 2xl:py-5 2xl:px-10 rounded-xl transition-all shadow-xl shadow-[#eab308]/20 flex items-center justify-center gap-4 group text-base sm:text-lg xl:text-base 2xl:text-lg">
              <span className="text-center">
                Build Our Airport Transportation
                <br className="hidden sm:block" />
                Business Today™
              </span>
              <ArrowRight className="w-6 h-6 sm:w-7 sm:h-7 stroke-[3] shrink-0 transition-transform group-hover:translate-x-1.5" />
            </button>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-8 sm:mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 w-full px-2 sm:px-4">
          {trustBadges.map((badge, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 sm:gap-4"
            >
              <badge.icon className="w-9 h-9 sm:w-10 sm:h-10 text-[#1a1f71] shrink-0 stroke-[1.5]" />
              <div className="flex flex-col">
                <span className="text-[#1a1f71] font-extrabold text-xs sm:text-sm leading-tight">
                  {badge.title}
                </span>
                <span className="text-slate-600 font-medium text-[11px] sm:text-xs leading-tight">
                  {badge.subtitle}
                </span>
              </div>
            </div>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

            <button
              className={cn(
                "cursor-pointer text-white font-bold py-2.5 px-6 rounded-md transition-colors text-sm shadow-lg",
                btnClass,
              )}
            >
              Start My Business — $495
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="cursor-pointer lg:hidden text-[#0b0f19] z-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </PageContainer>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-t border-slate-200 shadow-xl">
          <nav className="flex flex-col p-6 gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "text-[#0b0f19] text-lg font-semibold transition-colors",
                  hoverTextClass,
                )}
              >
                {link.label}
              </a>
            ))}
            <button
              className={cn(
                "cursor-pointer text-white font-bold py-3 px-6 rounded-md transition-colors w-full mt-4",
                btnClass,
              )}
            >
              Start My Business — $495
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
