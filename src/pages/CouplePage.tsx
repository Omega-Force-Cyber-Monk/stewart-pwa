import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  X,
  Smartphone,
  BarChart3,
  Headset,
  DollarSign,
} from "lucide-react";
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
    <div className="relative w-full bg-[#f8fafc] overflow-hidden border-b border-gray-100 h-[100svh] flex flex-col justify-between pt-[80px]">
      {/* Background Image on the right side */}
            {/* Background Image */}
      <img
        src={coupleBanner}
        alt="Couple in a car"
        className="absolute inset-0 w-full h-full object-cover object-[center_top] lg:object-[right_top]"
      />
      {/* White gradient overlay for dark text */}
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent w-full lg:w-[85%] xl:w-[75%] z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent lg:hidden w-full h-full z-0"></div>

      <div className="relative z-10 w-full flex-grow flex items-center py-0">
        <PageContainer size="full">
          <div className="flex flex-col lg:flex-row w-full justify-between items-start lg:items-center gap-10">
            {/* Left Side Content */}
            <div className="w-full lg:w-[50%] text-left z-10 relative">
              <h1 className="text-[clamp(2.25rem,4vw,3.5rem)] font-extrabold text-[#0b0f19] leading-[1.1] mb-6 tracking-tight uppercase">
                Build An Airport
                <br />
                Transportation Business
                <br />
                <span className="text-[#2563eb] relative inline-block mt-1">
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

              <p className="text-[clamp(1.125rem,1.5vw,1.25rem)] text-slate-700 font-semibold mb-8 max-w-[500px] leading-snug">
                Build your own business, your schedule, and the life you
                want—while helping travelers every day.
              </p>

              <ul className="space-y-3 mb-10 max-w-[500px]">
                {[
                  "Attract & keep repeat customers",
                  "Set your own schedule together",
                  "Keep 100% of every fare",
                  "Create long-term income & freedom",
                  "Build a real business asset as a couple",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center text-[#0b0f19] font-bold text-[clamp(0.9rem,1.1vw,1.1rem)]"
                  >
                    <CheckCircle2 className="text-white mr-3 w-5 h-5 sm:w-6 sm:h-6 fill-[#2563eb] shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <button className="cursor-pointer bg-[#eab308] hover:bg-[#ca8a04] text-[#0b0f19] font-bold py-4 px-6 rounded-[0.5rem] transition-colors shadow-lg shadow-[#eab308]/30 flex items-center justify-between group w-full sm:w-auto text-[clamp(1rem,1.2vw,1.125rem)] mb-12 sm:mb-16 lg:mb-20">
                <span className="text-left leading-snug pr-4">
                  Build Our Airport Transportation Business Today™
                </span>
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Bottom Trust Badges */}
              {/* <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8 bg-white/90 backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-sm inline-flex border border-slate-200">
                <div className="flex items-center gap-3">
                  <CreditCard
                    className="w-7 h-7 sm:w-8 sm:h-8 text-[#0b0f19] shrink-0"
                    strokeWidth={1.5}
                  />
                  <div className="text-[10px] sm:text-xs font-bold text-[#0b0f19] leading-tight">
                    One-time payment
                    <br />
                    <span className="font-medium text-slate-500">
                      No monthly fees
                    </span>
                  </div>
                </div>
                <div className="hidden sm:block w-px h-10 bg-slate-200"></div>
                <div className="flex items-center gap-3">
                  <Clock
                    className="w-7 h-7 sm:w-8 sm:h-8 text-[#0b0f19] shrink-0"
                    strokeWidth={1.5}
                  />
                  <div className="text-[10px] sm:text-xs font-bold text-[#0b0f19] leading-tight">
                    Quick Launch Booking Flow
                    <br />
                    <span className="font-medium text-slate-500">
                      in 48-72 Hours
                    </span>
                  </div>
                </div>
                <div className="hidden sm:block w-px h-10 bg-slate-200"></div>
                <div className="flex items-center gap-3">
                  <ShieldCheck
                    className="w-7 h-7 sm:w-8 sm:h-8 text-[#0b0f19] shrink-0"
                    strokeWidth={1.5}
                  />
                  <div className="text-[10px] sm:text-xs font-bold text-[#0b0f19] leading-tight">
                    Built for couples
                    <br />
                    <span className="font-medium text-slate-500">
                      Your business. Your future.
                    </span>
                  </div>
                </div>
              </div> */}
            </div>

            {/* Right Side Card */}
            <div className="w-full lg:w-[40%] flex justify-center lg:justify-end z-10 mt-10 lg:mt-0">
              <div className="bg-[#0b0f19] rounded-[2rem] p-8 shadow-2xl w-full max-w-[420px] border-t-[6px] border-[#eab308]">
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
                      className="flex items-center text-white text-sm sm:text-[15px] font-semibold"
                    >
                      <CheckCircle2 className="w-5 h-5 mr-3 fill-[#2563eb] text-white shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="w-full h-px bg-slate-800 mb-8"></div>

                <div>
                  <h4 className="text-white font-extrabold text-xl sm:text-2xl leading-tight mb-4">
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
      <div className="relative z-20 w-full lg:w-[70%] xl:w-[60%] bg-white lg:rounded-tr-[5rem] mt-auto pb-6 pt-6 lg:pb-8 lg:pt-8 pl-4 lg:pl-8 xl:pl-16 pr-4 lg:pr-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-4 xl:gap-6">
          <div className="flex items-center gap-3 xl:gap-4">
            <CreditCard
              className="w-8 h-8 xl:w-10 xl:h-10 text-[#040a23] shrink-0"
              strokeWidth={1.5}
            />
            <div className="text-[12px] xl:text-[13px] font-bold text-[#040a23] leading-tight">
              One-time payment
              <br />
              <span className="font-medium text-[#040a23]">
                No monthly fees
              </span>
            </div>
          </div>
          <div className="hidden md:block w-px h-8 bg-slate-700/80 shrink-0"></div>
          <div className="flex items-center gap-3 xl:gap-4">
            <Clock
              className="w-8 h-8 xl:w-10 xl:h-10 text-[#040a23] shrink-0"
              strokeWidth={1.5}
            />
            <div className="text-[12px] xl:text-[13px] font-bold text-[#040a23] leading-tight">
              Quick Launch Booking Flow
              <br />
              <span className="font-medium text-[#040a23]">in 48–72 hours</span>
            </div>
          </div>
          <div className="hidden md:block w-px h-8 bg-slate-700/80 shrink-0"></div>
          <div className="flex items-center gap-3 xl:gap-4">
            <ShieldCheck
              className="w-8 h-8 xl:w-10 xl:h-10 text-[#040a23] shrink-0"
              strokeWidth={1.5}
            />
            <div className="text-[12px] xl:text-[13px] font-bold text-[#040a23] leading-tight">
              Built for drivers 50+
              <br />
              <span className="font-medium text-[#040a23]">
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
        <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm p-6">
          <h2 className="text-center text-[#1a1f71] font-extrabold text-xl sm:text-2xl tracking-wide uppercase mb-10">
            YOUR CORE SYSTEMS™ FOR BUILDING YOUR BUSINESS
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-10 relative mb-12">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center text-center px-6 relative"
              >
                <div className="mb-4">
                  <feature.icon
                    className="w-12 h-12 text-[#2563eb]"
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="font-bold text-[#0b0f19] mb-3 text-sm sm:text-base leading-snug">
                  {feature.title}
                </h3>
                <p className="text-[#0b0f19] text-sm leading-relaxed max-w-[220px]">
                  {feature.description}
                </p>

                {/* Vertical Divider for Desktop */}
                {idx < features.length - 1 && (
                  <div className="hidden lg:block absolute right-0 top-[10%] bottom-[10%] w-px bg-slate-200"></div>
                )}
                {/* Horizontal Divider for Mobile/Tablet */}
                {idx < features.length - 1 && (
                  <div className="lg:hidden absolute bottom-[-1.25rem] left-[20%] right-[20%] h-px bg-slate-200"></div>
                )}
              </div>
            ))}
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-4xl mx-auto mt-4">
            <Gift
              className="w-8 h-8 text-[#eab308] shrink-0"
              strokeWidth={1.5}
            />
            <p className="text-[#0b0f19] text-sm text-center sm:text-left leading-relaxed font-medium">
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
    <section className="bg-white py-3" id="comparison">
      <PageContainer size="full">
        {/* DESKTOP LAYOUT (Strict Grid matching screenshot) */}
        <div className="hidden lg:grid grid-cols-[1.1fr_1fr_auto_1.15fr_1.1fr] bg-white border border-slate-200 rounded-[1.5rem] overflow-hidden shadow-sm items-stretch">
          {/* 1. Left Image */}
          <div className="relative">
            <img
              src={coupleComparisonLeft}
              alt="Unhappy couple in car"
              className="absolute inset-0 w-full h-full object-cover object-[center_top] lg:object-[right_top]"
              style={{
                WebkitMaskImage:
                  "linear-gradient(to right, black 60%, transparent 100%)",
                maskImage:
                  "linear-gradient(to right, black 60%, transparent 100%)",
              }}
            />
          </div>

          {/* 2. Left Text */}
          <div className="flex flex-col justify-center py-6 px-2 2xl:px-4 z-10 bg-white">
            <h3 className="text-[1.05rem] 2xl:text-[1.1rem] font-bold text-[#b91c1c] mb-4 uppercase tracking-wide leading-snug">
              RIDESHARING APPS
              <br />
              CONTROL EVERYTHING
            </h3>
            <ul className="space-y-2 2xl:space-y-3">
              {badList.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start text-[#1a1f71] text-[13px] 2xl:text-sm font-bold"
                >
                  <XCircle className="w-5 h-5 mr-3 mt-[1px] fill-[#b91c1c] text-white shrink-0" />
                  <span className="leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Center VS */}
          <div className="flex items-center justify-center px-4 2xl:px-6 bg-white z-20">
            <div className="w-[84px] h-[84px] bg-[#081363] rounded-full flex items-center justify-center text-white font-extrabold text-[28px]">
              VS.
            </div>
          </div>

          {/* 4. Right Text */}
          <div className="flex flex-col justify-center py-6 pl-2 pr-2 2xl:pr-4 z-10 bg-white">
            <h3 className="text-[1.05rem] 2xl:text-[1.1rem] font-bold text-[#1a1f71] mb-4 uppercase tracking-wide leading-snug">
              YOUR AIRPORT TRANSPORTATION
              <br />
              BUSINESS™
            </h3>
            <ul className="space-y-2 2xl:space-y-3">
              {goodList.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start text-[#1a1f71] text-[13px] 2xl:text-sm font-bold"
                >
                  <CheckCircle2 className="w-5 h-5 mr-3 mt-[1px] fill-[#2563eb] text-white shrink-0" />
                  <span className="leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 5. Right Image */}
          <div className="relative">
            <img
              src={coupleComparisonRight}
              alt="Happy couple in car"
              className="absolute inset-0 w-full h-full object-cover object-[center_top] lg:object-[right_top]"
              style={{
                WebkitMaskImage:
                  "linear-gradient(to left, black 60%, transparent 100%)",
                maskImage:
                  "linear-gradient(to left, black 60%, transparent 100%)",
              }}
            />
          </div>
        </div>

        {/* MOBILE / TABLET LAYOUT */}
        <div className="lg:hidden w-full flex flex-col bg-white border border-slate-200 rounded-[1.5rem] overflow-hidden shadow-sm">
          {/* Left Side (Bad) */}
          <div className="relative flex flex-col sm:flex-row items-stretch border-b border-slate-100">
            <div className="w-full sm:w-[40%] relative min-h-[200px]">
              <img
                src={coupleComparisonLeft}
                alt="Unhappy couple"
                className="absolute inset-0 w-full h-full object-cover object-[center_top] lg:object-[right_top]"
                style={{
                  WebkitMaskImage:
                    "linear-gradient(to right, black 50%, transparent 100%)",
                  maskImage:
                    "linear-gradient(to right, black 50%, transparent 100%)",
                }}
              />
            </div>
            <div className="w-full sm:w-[60%] py-8 px-6 relative z-10 flex flex-col justify-center bg-white sm:bg-transparent">
              <h3 className="text-base sm:text-[1.1rem] font-bold text-[#b91c1c] mb-5 uppercase tracking-wide leading-snug">
                RIDESHARING APPS
                <br />
                CONTROL EVERYTHING
              </h3>
              <ul className="space-y-3">
                {badList.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start text-[#1a1f71] text-sm font-bold"
                  >
                    <XCircle className="w-5 h-5 mr-3 mt-[1px] fill-[#b91c1c] text-white shrink-0" />
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Mobile VS */}
          <div className="w-full bg-slate-50 py-4 flex items-center justify-center relative z-20 border-y border-slate-200">
            <div className="w-[72px] h-[72px] bg-[#081363] rounded-full flex items-center justify-center text-white font-extrabold text-2xl shadow-sm">
              VS.
            </div>
          </div>

          {/* Right Side (Good) */}
          <div className="relative flex flex-col-reverse sm:flex-row items-stretch">
            <div className="w-full sm:w-[60%] py-8 px-6 relative z-10 flex flex-col justify-center bg-white sm:bg-transparent">
              <h3 className="text-base sm:text-[1.1rem] font-bold text-[#1a1f71] mb-5 uppercase tracking-wide leading-snug">
                YOUR AIRPORT TRANSPORTATION BUSINESS™
              </h3>
              <ul className="space-y-3">
                {goodList.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start text-[#1a1f71] text-sm font-bold"
                  >
                    <CheckCircle2 className="w-5 h-5 mr-3 mt-[1px] fill-[#2563eb] text-white shrink-0" />
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full sm:w-[40%] relative min-h-[200px]">
              <img
                src={coupleComparisonRight}
                alt="Happy couple"
                className="absolute inset-0 w-full h-full object-cover object-[center_top] lg:object-[right_top]"
                style={{
                  WebkitMaskImage:
                    "linear-gradient(to left, black 50%, transparent 100%)",
                  maskImage:
                    "linear-gradient(to left, black 50%, transparent 100%)",
                }}
              />
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
      icon: DollarSign,
      title: "Lower pay.\nHigher fees.",
      description: "You earn less every year.",
    },
    {
      icon: Smartphone,
      title: "Unfair deactivations\nwith no warning.",
      description: "One issue can take away your only income.",
    },
    {
      icon: Clock,
      title: "Long hours.\nNo freedom.",
      description: "You're always on their schedule, not your own.",
    },
    {
      icon: BarChart3,
      title: "Apps grow.\nYou stay stuck.",
      description: "They take billions. You get a fraction.",
    },
    {
      icon: Headset,
      title: "No customer\nownership.",
      description: "You're just a driver number.",
    },
  ];

  return (
    <section className="bg-white py-3" id="why-win">
      <PageContainer size="full">
        <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm p-6">
          <h2 className="text-center text-[#1a1f71] font-extrabold text-[1.1rem] sm:text-xl uppercase tracking-wide mb-10">
            WHY COUPLES ARE BUILDING THEIR OWN BUSINESSES
          </h2>

          <div className="flex flex-col lg:flex-row items-start justify-between gap-6 lg:gap-4 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
            {reasons.map((reason, idx) => (
              <div
                key={idx}
                className="flex flex-row items-center lg:items-start lg:flex-col gap-4 flex-1 pt-6 lg:pt-0 lg:px-4 first:pt-0 first:pl-0 last:pr-0"
              >
                <div className="w-14 h-14 rounded-full bg-[#f1f5f9] flex items-center justify-center shrink-0">
                  <reason.icon
                    className="w-7 h-7 text-[#1a1f71]"
                    strokeWidth={2}
                  />
                </div>
                <div className="flex flex-col">
                  <h4 className="font-bold text-[#1a1f71] text-[13px] sm:text-sm leading-snug whitespace-pre-line mb-1">
                    {reason.title}
                  </h4>
                  <p className="text-[#1a1f71] text-xs sm:text-[13px] leading-snug font-medium">
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
        <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm p-6">
          <h2 className="text-center text-[#1a1f71] font-extrabold text-[1.1rem] sm:text-xl uppercase tracking-wide mb-10">
            HOW IT WORKS: LAUNCH YOUR BUSINESS IN 3 SIMPLE STEPS
          </h2>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-4 w-full">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="flex items-center w-full lg:w-auto flex-1 justify-center"
              >
                <div className="flex flex-row items-center gap-4 w-full justify-center">
                  {/* Number Circle */}
                  <div className="w-8 h-8 rounded-full bg-[#2563eb] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-sm">
                    {step.number}
                  </div>

                  {/* Dark Blue Icon */}
                  <div className="shrink-0">
                    <step.icon
                      className="w-9 h-9 text-[#1a1f71]"
                      strokeWidth={1.5}
                    />
                  </div>

                  {/* Text Content */}
                  <div className="flex flex-col justify-center max-w-[200px]">
                    <h4 className="font-bold text-[#1a1f71] text-sm sm:text-base leading-snug">
                      {step.title}
                    </h4>
                    <p className="text-[#1a1f71] text-xs sm:text-[13px] leading-snug font-medium mt-1">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Arrow separator */}
                {idx < steps.length - 1 && (
                  <div className="hidden lg:flex shrink-0 mx-2 text-[#1a1f71]">
                    <ArrowRight className="w-6 h-6 stroke-[3px]" />
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
    <section className="bg-white py-3" id="reviews">
      <PageContainer size="full">
        <div className="w-full rounded-[2rem] border border-slate-200 shadow-sm p-6 bg-white">
          <h2 className="text-[1.1rem] sm:text-xl lg:text-[1.35rem] font-bold text-[#1a1f71] text-center mb-8 uppercase tracking-wide">
            COUPLES ACROSS THE COUNTRY ARE BUILDING REAL BUSINESSES TOGETHER
          </h2>

          <div className="flex flex-col lg:flex-row items-stretch justify-between gap-8 lg:gap-0 lg:divide-x divide-slate-100 w-full">
            {reviews.map((review, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row items-stretch gap-4 sm:gap-6 w-full flex-1 lg:px-6 first:pl-0 last:pr-0"
              >
                {/* Image */}
                <div className="shrink-0 w-full sm:w-[130px] lg:w-[140px] flex">
                  <img
                    src={reviewImage}
                    alt={review.name}
                    className="w-full h-40 sm:h-full rounded-2xl object-cover shadow-sm"
                  />
                </div>

                {/* Review Content */}
                <div className="flex flex-col justify-start py-1 text-left flex-1">
                  {/* Quote */}
                  <p className="text-[#1a1f71] font-medium text-sm sm:text-base leading-snug mb-4">
                    "{review.quote}"
                  </p>

                  <div className="mt-auto">
                    {/* Stars */}
                    <div className="flex items-center justify-start gap-[2px] mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-[18px] h-[18px] fill-[#eab308] text-[#eab308]"
                        />
                      ))}
                    </div>

                    {/* Author */}
                    <div>
                      <h5 className="font-bold text-[#1a1f71] text-[15px] leading-tight">
                        {review.name}
                      </h5>
                      <span className="text-[#1a1f71] font-medium text-sm">
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
    <section className="bg-white py-3" id="faq">
      <PageContainer size="full">
        <div className="w-full rounded-[2rem] border border-slate-200 shadow-sm p-6 bg-white">
          <h2 className="text-[1.1rem] sm:text-xl lg:text-[1.35rem] font-bold text-[#1a1f71] text-center mb-10 uppercase tracking-wide">
            FREQUENTLY ASKED QUESTIONS
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10 w-full relative">
            {/* Optional dividers can be simulated with background lines, but grid gap looks cleaner */}
            {/* Desktop Vertical Dividers */}
            <div className="hidden lg:block absolute left-[33.33%] top-0 bottom-0 w-px bg-slate-100 -translate-x-1/2"></div>
            <div className="hidden lg:block absolute left-[66.66%] top-0 bottom-0 w-px bg-slate-100 -translate-x-1/2"></div>

            {faqs.map((faq, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className="shrink-0 w-7 h-7 rounded-full bg-[#2563eb] text-white flex items-center justify-center font-bold text-sm shadow-sm mt-0.5">
                  Q
                </div>
                <div className="flex flex-col">
                  <h4 className="font-bold text-[#1a1f71] text-[15px] leading-snug mb-1">
                    {faq.question}
                  </h4>
                  <p className="text-[#1a1f71] text-[13px] font-medium leading-relaxed">
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
    <section className="bg-white py-3" id="footer-cta">
      <PageContainer size="full">
        {/* Dark Blue Banner Card - use lg instead of xl for horizontal layout to cover 1240px */}
        <div className="w-full bg-[#0b0f19] rounded-2xl shadow-xl flex flex-col lg:flex-row items-center justify-between p-6 gap-8 lg:gap-2 xl:gap-4">
          {/* Left: Icon and Title */}
          <div className="flex items-center gap-4 lg:gap-3 xl:gap-6 lg:w-auto shrink-0">
            {/* Custom Icon Group */}
            <div className="relative flex items-center justify-center shrink-0 w-16 h-16 sm:w-20 sm:h-20 lg:w-16 lg:h-16 xl:w-20 xl:h-20">
              <RefreshCcw
                className="w-full h-full text-[#eab308] absolute inset-0"
                strokeWidth={1.5}
              />
              <Users
                className="w-8 h-8 sm:w-10 sm:h-10 lg:w-8 lg:h-8 xl:w-10 xl:h-10 text-[#eab308] relative z-10"
                strokeWidth={1.5}
              />
            </div>

            <div className="flex flex-col">
              <h3 className="text-white font-bold text-base sm:text-xl lg:text-[15px] xl:text-[20px] 2xl:text-[22px] tracking-wide leading-snug whitespace-nowrap">
                ONE GREAT AIRPORT CUSTOMER
                <br />
                CAN TURN INTO <span className="text-[#eab308]">YEARS OF</span>
                <br />
                <span className="text-[#eab308]">REPEAT RIDES.™</span>
              </h3>
            </div>
          </div>

          {/* Pricing */}
          <div className="flex flex-col items-center justify-center shrink-0 lg:px-2 xl:px-4">
            <span className="text-[#eab308] text-5xl sm:text-6xl lg:text-4xl xl:text-6xl font-extrabold leading-none tracking-tight mb-1">
              $495
            </span>
            <span className="text-white text-xs sm:text-sm lg:text-[10px] xl:text-sm font-bold tracking-widest uppercase whitespace-nowrap">
              ONE-TIME PAYMENT
            </span>
          </div>

          {/* Vertical Divider */}
          <div className="hidden lg:block w-px h-24 lg:h-20 xl:h-24 bg-slate-700/80 shrink-0 mx-1 xl:mx-2"></div>

          {/* Checkmarks */}
          <div className="flex flex-col gap-2 lg:gap-1 xl:gap-2 shrink-0">
            {checkmarks.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 lg:gap-2 xl:gap-3"
              >
                <CheckCircle2 className="w-5 h-5 lg:w-4 lg:h-4 xl:w-5 xl:h-5 fill-[#2563eb] text-white shrink-0" />
                <span className="text-white text-[13px] sm:text-sm lg:text-[11px] xl:text-sm font-semibold tracking-wide whitespace-nowrap">
                  {item}
                </span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="shrink-0 w-full lg:w-auto mt-4 lg:mt-0">
            <button className="cursor-pointer w-full lg:w-auto bg-gradient-to-b from-[#fde047] to-[#eab308] hover:from-[#fef08a] hover:to-[#ca8a04] text-black font-extrabold py-4 px-6 lg:py-3 lg:px-4 xl:py-4 xl:px-8 rounded-xl transition-all shadow-lg shadow-[#eab308]/20 flex items-center justify-center gap-3 lg:gap-2 xl:gap-3 group text-sm sm:text-base lg:text-[13px] xl:text-[17px]">
              <span className="text-center whitespace-nowrap">
                Build Our Airport Transportation
                <br className="hidden sm:block" />
                Business Today™
              </span>
              <ArrowRight className="w-6 h-6 lg:w-5 lg:h-5 xl:w-6 xl:h-6 stroke-[3] shrink-0 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-6 flex flex-wrap lg:flex-nowrap items-start justify-center lg:justify-between gap-4 w-full px-2">
          {trustBadges.map((badge, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 w-[45%] sm:w-[30%] lg:w-auto"
            >
              <badge.icon className="w-8 h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10 text-[#1a1f71] shrink-0 stroke-[1.5]" />
              <div className="flex flex-col">
                <span className="text-[#1a1f71] font-bold text-[11px] sm:text-xs leading-tight whitespace-nowrap">
                  {badge.title}
                </span>
                <span className="text-[#1a1f71] font-medium text-[10px] sm:text-[11px] leading-tight whitespace-nowrap">
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
        "left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "fixed top-0 bg-white shadow-md py-1" : "absolute top-0 bg-transparent py-4",
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
              className={cn("cursor-pointer text-white font-bold py-2.5 px-6 rounded-md transition-colors text-sm shadow-lg",
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
              className={cn("cursor-pointer text-white font-bold py-3 px-6 rounded-md transition-colors w-full mt-4",
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
