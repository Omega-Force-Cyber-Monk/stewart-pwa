import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Headset, Check, TrendingUp } from "lucide-react";
import { cn } from "../lib/cn";
import seniorLogo from "../assets/seniorLogo.png";
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
import seniorBanner from "../assets/seniorBanner.png";
import coupleComparisonLeft from "../assets/coupleComparisonSectionLeft.png";
import coupleComparisonRight from "../assets/coupleComparisonSectionRight.png";
import reviewImage from "../assets/review.jpg";

export default function SeniorPage() {
  return (
    <>
      <SeniorNavbar />
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

function SeniorNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "fixed top-0 bg-[#040a23] shadow-md py-3" : "absolute top-0 bg-transparent py-4",
      )}
    >
      <PageContainer size="full">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <Link to="/" className="flex items-center gap-2 z-50">
              <img
                src={seniorLogo}
                alt="QuitTheApp Logo"
                className="h-8 lg:h-10 object-contain"
              />
            </Link>
          </div>
          <nav className="hidden lg:flex items-center gap-8">
            <a
              href="#how-it-works"
              className="text-white font-medium hover:text-[#39b54a] transition-colors text-sm"
            >
              How It Works
            </a>
            <a
              href="#how-it-works-steps"
              className="text-white font-medium hover:text-[#39b54a] transition-colors text-sm"
            >
              What's Included
            </a>
            <a
              href="#reviews"
              className="text-white font-medium hover:text-[#39b54a] transition-colors text-sm"
            >
              Success Stories
            </a>
            <a
              href="#faq"
              className="text-white font-medium hover:text-[#39b54a] transition-colors text-sm"
            >
              FAQ
            </a>
            <button className="cursor-pointer bg-[#15803d] hover:bg-[#166534] text-white font-bold py-2.5 px-6 rounded-md transition-colors text-sm shadow-lg">
              Start My Business — $495
            </button>
          </nav>
        </div>
      </PageContainer>
    </header>
  );
}

function HeroBanner() {
  return (
    <div className="relative w-full h-[100svh] flex flex-col justify-between overflow-hidden bg-[#040a23] pt-[80px]">
      {/* Background Image on the right side */}
            {/* Background Image */}
      <img
        src={seniorBanner}
        alt="Senior couple"
        className="absolute inset-0 w-full h-full object-cover object-[center_top] lg:object-[right_top]"
      />
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#040a23] via-[#040a23]/90 to-transparent w-full lg:w-[70%] xl:w-[65%] z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#040a23] via-[#040a23]/80 to-transparent lg:hidden w-full h-full z-0"></div>

      <div className="relative z-10 w-full flex-grow flex items-center py-8">
        <PageContainer size="full">
          <div className="flex flex-col lg:flex-row w-full justify-between items-center gap-10">
            {/* Left Content */}
            <div className="w-full lg:w-[50%] text-left">
              <h1 className="text-[clamp(2.25rem,4vw,3.5rem)] font-extrabold text-white leading-[1.15] mb-6 tracking-tight uppercase">
                START A PRIVATE
                <br />
                AIRPORT BUSINESS
                <br />
                THAT WORKS ON YOUR
                <br />
                SCHEDULE.{" "}
                <span className="text-[#39b54a]">NOT SOMEONE ELSE'S.</span>
              </h1>
              <p className="text-[clamp(1rem,1.1vw,1.15rem)] text-white font-medium mb-8 max-w-[650px] leading-relaxed tracking-wide">
                QuitTheApp helps experienced drivers launch a direct-booking
                airport transportation business with the tools to get booked,
                build trusted customers, and create repeat riders.
              </p>
              <ul className="space-y-3 max-w-[500px]">
                {[
                  "Set your own schedule",
                  "Serve airport travelers and local clients",
                  "Keep 100% of every fare",
                  "Build repeat riders and referrals",
                  "Create a business asset you control",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center text-white font-bold text-[clamp(0.95rem,1.1vw,1.1rem)]"
                  >
                    <div className="bg-[#39b54a] rounded-full p-[3px] mr-3 shrink-0">
                      <Check className="w-4 h-4 text-white stroke-[4]" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Card */}
            <div className="w-full lg:w-[35%] flex justify-center lg:justify-end">
              <div className="bg-[#040a23]/70 backdrop-blur-md rounded-xl p-6 xl:p-8 shadow-2xl w-full max-w-[380px] border border-slate-700/50 border-t-[3px] border-t-[#39b54a]">
                <h3 className="text-[#39b54a] font-bold text-sm xl:text-[15px] mb-5 uppercase tracking-wider">
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
                      className="flex items-center text-white text-sm xl:text-[14.5px] font-medium tracking-wide"
                    >
                      <div className="bg-[#39b54a] rounded-full p-[2px] mr-3 shrink-0">
                        <Check className="w-3.5 h-3.5 text-white stroke-[4]" />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="w-full h-px bg-slate-700/80 mb-6"></div>
                <div>
                  <h4 className="text-white font-extrabold text-xl leading-tight mb-2 tracking-wide">
                    Real Business.
                    <br />
                    Real Customers.
                    <br />
                    Real Freedom.™
                  </h4>
                  <svg
                    className="w-24 h-3 text-[#39b54a]"
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
      <div className="relative z-20 w-full lg:w-[70%] xl:w-[60%] bg-[#040a23] lg:rounded-tr-[5rem] mt-auto pb-6 pt-6 lg:pb-8 lg:pt-8 pl-4 lg:pl-8 xl:pl-16 pr-4 lg:pr-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-4 xl:gap-6">
          <div className="flex items-center gap-3 xl:gap-4">
            <CreditCard
              className="w-8 h-8 xl:w-10 xl:h-10 text-white shrink-0"
              strokeWidth={1.5}
            />
            <div className="text-[12px] xl:text-[13px] font-bold text-white leading-tight">
              One-time payment
              <br />
              <span className="font-medium text-slate-300">
                No monthly fees
              </span>
            </div>
          </div>
          <div className="hidden md:block w-px h-8 bg-slate-700/80 shrink-0"></div>
          <div className="flex items-center gap-3 xl:gap-4">
            <Clock
              className="w-8 h-8 xl:w-10 xl:h-10 text-white shrink-0"
              strokeWidth={1.5}
            />
            <div className="text-[12px] xl:text-[13px] font-bold text-white leading-tight">
              Quick Launch Booking Flow
              <br />
              <span className="font-medium text-slate-300">in 48–72 hours</span>
            </div>
          </div>
          <div className="hidden md:block w-px h-8 bg-slate-700/80 shrink-0"></div>
          <div className="flex items-center gap-3 xl:gap-4">
            <ShieldCheck
              className="w-8 h-8 xl:w-10 xl:h-10 text-white shrink-0"
              strokeWidth={1.5}
            />
            <div className="text-[12px] xl:text-[13px] font-bold text-white leading-tight">
              Built for drivers 50+
              <br />
              <span className="font-medium text-slate-300">
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
      "Get your professional booking flow live fast so customers can book directly, 24/7 — in as little as 48 hours.",
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
      "Your trust-building page that shows who you are, what you offer, and why travelers should book with you.",
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
            THE 4 CORE SYSTEMS™ THAT BUILD YOUR BUSINESS
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-10 relative mb-12">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center text-center px-6 relative"
              >
                <div className="mb-4">
                  <feature.icon
                    className="w-10 h-10 sm:w-12 sm:h-12 text-[#15803d]"
                    strokeWidth={2}
                  />
                </div>
                <h3 className="font-bold text-[#1a1f71] mb-3 text-sm sm:text-base leading-snug">
                  {feature.title}
                </h3>
                <p className="text-[#1a1f71] text-xs sm:text-[13px] leading-relaxed max-w-[220px]">
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

          <div className="bg-[#f0fdf4] border border-[#bbf7d0] rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-4xl mx-auto mt-4">
            <Gift
              className="w-7 h-7 sm:w-8 sm:h-8 text-[#15803d] shrink-0"
              strokeWidth={1.5}
            />
            <p className="text-[#1a1f71] text-xs sm:text-[13.5px] text-center sm:text-left leading-relaxed font-medium">
              <strong className="text-[#1a1f71] font-bold">
                Also includes:
              </strong>{" "}
              Launch Dashboard™, Operator Dashboard™ tools, hosting setup,
              training resources, lifetime updates, and real human support.
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
    "Income becomes unpredictable",
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
            <h3 className="text-[1.05rem] 2xl:text-[1.1rem] font-bold text-[#dc2626] mb-4 uppercase tracking-wide leading-snug">
              RIDESHARE APPS CONTROL EVERYTHING
            </h3>
            <ul className="space-y-2 2xl:space-y-3">
              {badList.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start text-[#1a1f71] text-[13px] 2xl:text-sm font-bold"
                >
                  <XCircle className="w-5 h-5 mr-3 mt-[1px] fill-[#dc2626] text-white shrink-0" />
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
            <h3 className="text-[1.05rem] 2xl:text-[1.1rem] font-bold text-[#15803d] mb-4 uppercase tracking-wide leading-snug">
              YOUR PRIVATE AIRPORT BUSINESS™
            </h3>
            <ul className="space-y-2 2xl:space-y-3">
              {goodList.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start text-[#1a1f71] text-[13px] 2xl:text-sm font-bold"
                >
                  <CheckCircle2 className="w-5 h-5 mr-3 mt-[1px] fill-[#15803d] text-white shrink-0" />
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
              <h3 className="text-base sm:text-[1.1rem] font-bold text-[#dc2626] mb-5 uppercase tracking-wide leading-snug">
                RIDESHARE APPS CONTROL EVERYTHING
              </h3>
              <ul className="space-y-3">
                {badList.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start text-[#1a1f71] text-sm font-bold"
                  >
                    <XCircle className="w-5 h-5 mr-3 mt-[1px] fill-[#dc2626] text-white shrink-0" />
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
              <h3 className="text-base sm:text-[1.1rem] font-bold text-[#15803d] mb-5 uppercase tracking-wide leading-snug">
                YOUR PRIVATE AIRPORT BUSINESS™
              </h3>
              <ul className="space-y-3">
                {goodList.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start text-[#1a1f71] text-sm font-bold"
                  >
                    <CheckCircle2 className="w-5 h-5 mr-3 mt-[1px] fill-[#15803d] text-white shrink-0" />
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
      icon: CalendarDays,
      title: "More Freedom",
      description: "You choose your work.\nTake time off when\nyou need.",
    },
    {
      icon: Users,
      title: "Better Clients",
      description:
        "Airport travelers, business\nprofessionals, families,\nand more.",
    },
    {
      icon: Clock,
      title: "Flexible Schedule",
      description:
        "Work when you want.\nFull days or part time —\nyour choice.",
    },
    {
      icon: TrendingUp,
      title: "Real Income Potential",
      description:
        "Keep 100% of what\nyou earn and build a\nbusiness that grows.",
    },
  ];

  return (
    <section className="bg-white py-3" id="why-win">
      <PageContainer size="full">
        <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm p-6">
          <h2 className="text-center text-[#1a1f71] font-extrabold text-[1.1rem] sm:text-xl uppercase tracking-wide mb-10">
            WHY 50+ DRIVERS CAN WIN
          </h2>

          <div className="flex flex-col lg:flex-row items-start justify-between gap-6 lg:gap-4 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
            {reasons.map((reason, idx) => (
              <div
                key={idx}
                className="flex flex-row items-center lg:items-start lg:flex-col gap-4 flex-1 pt-6 lg:pt-0 lg:px-4 first:pt-0 first:pl-0 last:pr-0"
              >
                <div className="w-14 h-14 rounded-full bg-[#f0fdf4] flex items-center justify-center shrink-0">
                  <reason.icon
                    className="w-7 h-7 text-[#15803d]"
                    strokeWidth={2}
                  />
                </div>
                <div className="flex flex-col">
                  <h4 className="font-bold text-[#1a1f71] text-[13px] sm:text-sm leading-snug whitespace-pre-line mb-1">
                    {reason.title}
                  </h4>
                  <p className="text-[#1a1f71] text-xs sm:text-[13px] leading-relaxed font-medium whitespace-pre-line">
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
      description: "Secure your system\nand get started\ninstantly.",
    },
    {
      number: 2,
      icon: ClipboardList,
      title: "Submit Your Details",
      description:
        "We gather your business\ninformation and get\neverything ready.",
    },
    {
      number: 3,
      icon: Rocket,
      title: "We Build Your System",
      description:
        "We launch your booking\nflow and tools. You start\ngetting customers.",
    },
  ];

  return (
    <section className="bg-white py-3" id="how-it-works-steps">
      <PageContainer size="full">
        <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm p-6">
          <h2 className="text-center text-[#1a1f71] font-extrabold text-[1.1rem] sm:text-xl uppercase tracking-wide mb-10">
            HOW IT WORKS: 3 SIMPLE STEPS
          </h2>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-4 w-full">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="flex items-center w-full lg:w-auto flex-1 justify-center"
              >
                <div className="flex flex-row items-center gap-4 w-full justify-center">
                  {/* Number Circle */}
                  <div className="w-8 h-8 rounded-full bg-[#15803d] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-sm">
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
                    <p className="text-[#1a1f71] text-xs sm:text-[13px] leading-relaxed font-medium mt-1 whitespace-pre-line">
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
        "We launched in 3 weeks and booked our first airport ride in 7 days. I finally have freedom and extra income on my own terms.",
      name: "Tim G.",
      location: "Knoxville, TN",
    },
    {
      quote:
        "The system is simple, professional, and it works. I set my schedule and now I'm meeting great people every day.",
      name: "Tom R.",
      location: "Tampa, FL",
    },
    {
      quote:
        "We started part time and now we're fully booked most weeks. This business has given us the life we wanted.",
      name: "William B.",
      location: "Houston, TX",
    },
  ];

  return (
    <section className="bg-white py-3" id="reviews">
      <PageContainer size="full">
        <div className="w-full rounded-[2rem] border border-slate-200 shadow-sm p-6 bg-white">
          <h2 className="text-[1.1rem] sm:text-xl lg:text-[1.35rem] font-extrabold text-[#1a1f71] text-center mb-8 uppercase tracking-wide">
            DRIVERS 50+ ACROSS THE COUNTRY ARE BUILDING REAL BUSINESSES
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
                  <p className="text-[#1a1f71] font-bold text-xs sm:text-[13px] leading-relaxed mb-4 italic">
                    "{review.quote}"
                  </p>

                  <div className="mt-auto">
                    {/* Stars */}
                    <div className="flex items-center justify-start gap-[2px] mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-[#eab308] text-[#eab308]"
                        />
                      ))}
                    </div>

                    {/* Author */}
                    <div>
                      <div className="font-bold text-[#1a1f71] text-[13px] sm:text-sm">
                        {review.name}
                      </div>
                      <div className="text-[#1a1f71] text-xs font-medium">
                        {review.location}
                      </div>
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
      question: "Do I need experience with websites or tech?",
      answer:
        "No. Everything is done for you. We build your system and walk you through how to use it.",
    },
    {
      question: "How quickly can I get my system?",
      answer:
        "Most drivers are live and ready to accept bookings within 48 to 72 hours.",
    },
    {
      question: "Is the $495 really a one-time payment?",
      answer:
        "Yes! $495 is a one-time payment—no monthly fees, commissions, or subscriptions. You own everything.",
    },
    // Row 2
    {
      question: "What if I'm not in a major city?",
      answer:
        "This works in any city with an airport and travelers. Smaller markets often have less competition.",
    },
    {
      question: "How do I get my first customers?",
      answer:
        "Use the tools we provide—QR cards, outreach templates, and your network—to get your first bookings fast.",
    },
    {
      question: "What if it doesn't work for me?",
      answer:
        "We're real people who care about your success. Contact us and we'll help you every step of the way.",
    },
  ];

  return (
    <section className="bg-white py-3" id="faq">
      <PageContainer size="full">
        <div className="w-full rounded-[2rem] border border-slate-200 shadow-sm p-6 bg-white">
          <h2 className="text-[1.1rem] sm:text-xl lg:text-[1.35rem] font-extrabold text-[#1a1f71] text-center mb-10 uppercase tracking-wide">
            FREQUENTLY ASKED QUESTIONS
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10 w-full relative">
            {/* Desktop Vertical Dividers */}
            <div className="hidden lg:block absolute left-[33.33%] top-0 bottom-0 w-px bg-slate-100 -translate-x-1/2"></div>
            <div className="hidden lg:block absolute left-[66.66%] top-0 bottom-0 w-px bg-slate-100 -translate-x-1/2"></div>

            {faqs.map((faq, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className="shrink-0 w-7 h-7 rounded-full bg-[#15803d] text-white flex items-center justify-center font-bold text-sm shadow-sm mt-0.5">
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
    "Built specifically for 50+ drivers",
    "Real human support",
    "Secure checkout",
  ];

  const trustBadges = [
    {
      icon: Users,
      title: "Trusted by Drivers",
      subtitle: "50+ Across the U.S.",
    },
    {
      icon: Lock,
      title: "Secure Checkout",
      subtitle: "SSL Encrypted",
    },
    {
      icon: CreditCard,
      title: "One-Time Payment",
      subtitle: "No Monthly Fees",
    },
    {
      icon: Headset,
      title: "7-Day Support",
      subtitle: "Real People Here for You",
    },
    {
      icon: ShieldCheck,
      title: "Satisfaction Guaranteed",
      subtitle: "Real Human Support",
    },
  ];

  return (
    <section className="bg-white py-3 pb-8" id="footer-cta">
      <PageContainer size="full">
        {/* Dark Blue Banner Card */}
        <div className="w-full bg-[#040a23] rounded-2xl shadow-xl flex flex-col lg:flex-row items-center justify-between p-6 gap-8 lg:gap-2 xl:gap-4 border border-slate-800">
          {/* Left: Icon and Title */}
          <div className="flex items-center gap-4 lg:gap-3 xl:gap-6 lg:w-auto shrink-0">
            {/* Custom Icon Group */}
            <div className="relative flex items-center justify-center shrink-0 w-16 h-16 sm:w-20 sm:h-20 lg:w-16 lg:h-16 xl:w-20 xl:h-20">
              <RefreshCcw
                className="w-full h-full text-[#39b54a] absolute inset-0"
                strokeWidth={1.5}
              />
              <Users
                className="w-8 h-8 sm:w-10 sm:h-10 lg:w-8 lg:h-8 xl:w-10 xl:h-10 text-white relative z-10"
                strokeWidth={1.5}
              />
            </div>

            <div className="flex flex-col">
              <h3 className="text-white font-bold text-base sm:text-xl lg:text-[15px] xl:text-[20px] 2xl:text-[22px] tracking-wide leading-snug whitespace-nowrap">
                ONE GREAT AIRPORT CUSTOMER
                <br />
                CAN TURN INTO <span className="text-[#39b54a]">YEARS OF</span>
                <br />
                <span className="text-[#39b54a]">REPEAT RIDES.™</span>
              </h3>
            </div>
          </div>

          {/* Pricing */}
          <div className="flex flex-col items-center justify-center shrink-0 lg:px-2 xl:px-4">
            <span className="text-[#39b54a] text-5xl sm:text-6xl lg:text-4xl xl:text-6xl font-extrabold leading-none tracking-tight mb-1">
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
                <CheckCircle2 className="w-5 h-5 lg:w-4 lg:h-4 xl:w-5 xl:h-5 fill-[#39b54a] text-white shrink-0" />
                <span className="text-white text-[13px] sm:text-sm lg:text-[11px] xl:text-[13px] font-semibold tracking-wide whitespace-nowrap">
                  {item}
                </span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="shrink-0 w-full lg:w-auto mt-4 lg:mt-0">
            <button className="cursor-pointer w-full lg:w-auto bg-gradient-to-b from-[#4ade80] to-[#16a34a] hover:from-[#22c55e] hover:to-[#15803d] text-white font-extrabold py-4 px-6 lg:py-3 lg:px-4 xl:py-4 xl:px-6 rounded-xl transition-all shadow-lg shadow-[#16a34a]/20 flex items-center justify-center gap-4 lg:gap-3 xl:gap-4 group text-sm sm:text-base lg:text-[14px] xl:text-[18px]">
              <span className="text-center whitespace-nowrap drop-shadow-sm">
                Start My Private Airport
                <br />
                Business™ — $495
              </span>
              <div className="w-7 h-7 xl:w-8 xl:h-8 bg-white rounded-full flex items-center justify-center shrink-0">
                <ArrowRight className="w-4 h-4 xl:w-5 xl:h-5 stroke-[3] text-[#16a34a] transition-transform group-hover:translate-x-0.5" />
              </div>
            </button>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-6 flex flex-wrap lg:flex-nowrap items-center justify-center lg:justify-between gap-4 w-full px-2">
          {trustBadges.map((badge, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 lg:gap-3 w-[45%] sm:w-[30%] lg:w-auto"
            >
              <badge.icon className="w-6 h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8 text-[#4f46e5] shrink-0 stroke-[1.5]" />
              <div className="flex flex-col">
                <span className="text-[#1a1f71] font-bold text-[10px] lg:text-[11px] xl:text-xs leading-tight whitespace-nowrap">
                  {badge.title}
                </span>
                <span className="text-[#1a1f71] font-medium text-[9px] lg:text-[10px] xl:text-[11px] leading-tight whitespace-nowrap">
                  {badge.subtitle}
                </span>
              </div>
            </div>
          ))}

          {/* Copyright */}
          <div className="w-[45%] sm:w-[30%] lg:w-auto flex flex-col items-start lg:items-end justify-center">
            <span className="text-slate-500 font-medium text-[10px] lg:text-[11px] xl:text-xs leading-tight whitespace-nowrap">
              © 2026 QuitTheApp.
            </span>
            <span className="text-slate-500 font-medium text-[10px] lg:text-[11px] xl:text-xs leading-tight whitespace-nowrap">
              All Rights Reserved.
            </span>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
