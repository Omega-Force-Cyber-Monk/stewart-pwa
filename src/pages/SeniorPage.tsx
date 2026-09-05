import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Check, TrendingUp, Menu, X } from "lucide-react";
import { cn } from "../lib/cn";
import seniorLogo from "../assets/logo_standard.png";
import {
  ArrowRight,
  CalendarDays,
  ClipboardList,
  Gift,
  Lock,
  Monitor,
  RefreshCcw,
  Rocket,
  ShieldCheck,
  Users,
  CreditCard,
  Clock,
  UserCheck,
  Car,
  HeartHandshake,
} from "lucide-react";
import { PageContainer } from "../components/layout/PageContainer";
import { ProfileDropdown } from "../components/ProfileDropdown";
import { PricingModal } from "../components/PricingModal";
import { useAppDispatch, useAppSelector } from "../hooks/storeHooks";
import { logOut } from "../store/features/auth/authSlice";
import { useLogoutUserMutation } from "../store/api/Auth/auth.api";
import seniorBanner from "../assets/seniorBanner.png";
import chrisImage from "../assets/50_Chris_S.jpg";
import dougImage from "../assets/50_Doug_L.jpg";
import naylinImage from "../assets/50_Naylin_H.jpg";
import { PaymentBadges } from "../components/common/PaymentBadges";
import seniorHero from "../assets/seniorHero.png";
import upsellKit from "../assets/50_ Done-for-You_upsell_kit.png";

export default function SeniorPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  // Auto-open the pricing modal when redirected here with ?showPricing=true.
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
      <SeniorNavbar openPricingModal={openPricingModal} />
      <HeroBanner />
      <FeaturesSection />
      <YouMayAlreadyHaveSection />
      <HowItWorksSection />
      <ProvenModelAndFaqSection />
      <FooterCTASection openPricingModal={openPricingModal} />
    </>
  );
}

function SeniorNavbar({ openPricingModal }: { openPricingModal: () => void }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { accessToken, user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [logoutUser] = useLogoutUserMutation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
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

  return (
    <>
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

            {/* Desktop Navigation */}
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
              {accessToken ? (
                <ProfileDropdown openPricingModal={openPricingModal} />
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-white font-medium hover:text-[#39b54a] transition-colors text-sm"
                  >
                    Login
                  </Link>
                  <button
                    onClick={openPricingModal}
                    className="cursor-pointer bg-[#15803d] hover:bg-[#166534] text-white font-bold py-2.5 px-6 rounded-md transition-colors text-sm shadow-lg"
                  >
                    Start My Private Airport Business™ — $495
                  </button>
                </>
              )}
            </nav>

            {/* Mobile Menu Toggle */}
            <button
              className="cursor-pointer lg:hidden text-white z-50 p-2 -mr-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </PageContainer>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#040a23] pt-24 px-6 flex flex-col lg:hidden overflow-y-auto">
          <a
            href="#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="text-white hover:text-[#39b54a] text-lg font-semibold py-4 border-b border-white/10 transition-colors"
          >
            How It Works
          </a>
          <a
            href="#how-it-works-steps"
            onClick={() => setMobileMenuOpen(false)}
            className="text-white hover:text-[#39b54a] text-lg font-semibold py-4 border-b border-white/10 transition-colors"
          >
            What's Included
          </a>
          <a
            href="#reviews"
            onClick={() => setMobileMenuOpen(false)}
            className="text-white hover:text-[#39b54a] text-lg font-semibold py-4 border-b border-white/10 transition-colors"
          >
            Success Stories
          </a>
          <a
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="text-white hover:text-[#39b54a] text-lg font-semibold py-4 border-b border-white/10 transition-colors"
          >
            FAQ
          </a>

          {accessToken ? (
            <>
              {user?.role === "admin" ? (
                <Link
                  to="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-white hover:text-[#39b54a] text-lg font-semibold py-4 border-b border-white/10 transition-colors"
                >
                  Admin Dashboard
                </Link>
              ) : user?.status === "active" ? (
                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-white hover:text-[#39b54a] text-lg font-semibold py-4 border-b border-white/10 transition-colors"
                >
                  Dashboard
                </Link>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openPricingModal();
                  }}
                  className="text-left text-white hover:text-[#39b54a] text-lg font-semibold py-4 border-b border-white/10 transition-colors w-full"
                >
                  Complete Checkout
                </button>
              )}
              <Link
                to={user?.role === "admin" ? "/admin/settings" : "/profile"}
                onClick={() => setMobileMenuOpen(false)}
                className="text-white hover:text-[#39b54a] text-lg font-semibold py-4 border-b border-white/10 transition-colors"
              >
                {user?.role === "admin" ? "Admin Settings" : "Profile & Settings"}
              </Link>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
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
                onClick={() => setMobileMenuOpen(false)}
                className="text-white hover:text-[#39b54a] text-lg font-semibold py-4 border-b border-white/10 transition-colors"
              >
                Login
              </Link>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openPricingModal();
                }}
                className="cursor-pointer bg-[#15803d] hover:bg-[#166534] text-white font-bold py-3 px-6 rounded-md transition-colors w-full mt-4 min-h-[52px]"
              >
                Start My Private Airport Business™ — $495
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}

function HeroBanner() {
  return (
    <div className="relative w-full data-exit-intent-hero min-h-[100svh] lg:min-h-[90svh] pt-[clamp(64px,8vw,80px)] flex flex-col justify-between overflow-hidden bg-[#040a23]">
      {/* Background Image on the right side */}
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full flex justify-end bg-[#040a23]">
        <div className="relative w-full max-w-[1240px] h-full">
          {/* Left edge fade for ultra-wide screens */}
          <div className="hidden lg:block absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-[#040a23] via-[#040a23]/80 to-transparent z-10"></div>
          <img
            src={seniorBanner}
            alt="Senior couple"
            className="hidden lg:block w-full h-full object-cover object-[75%_top] sm:object-[80%_top] lg:object-[85%_center] pointer-events-none opacity-90"
          />
      {/* Mobile Background Image */}
      <img
        src={seniorHero}
        alt="Phone concept mobile"
        className="block lg:hidden absolute inset-0 w-full h-full object-cover object-[center_top] pointer-events-none"
      />
        </div>
      </div>
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-[#040a23]/95 via-[#040a23]/50 to-[#040a23]/20 lg:bg-gradient-to-r lg:from-[#040a23] lg:via-[#040a23]/80 lg:to-transparent z-0"></div>

      <div className="relative z-10 w-full flex-grow flex items-center py-6">
        <PageContainer size="full">
          <div className="flex flex-col lg:flex-row w-full justify-between items-center gap-8">
            {/* Left Content */}
            <div className="w-full lg:w-[50%] text-center lg:text-left">
              <h1 className="text-[clamp(1.75rem,3vw,2.5rem)] font-extrabold text-white leading-[1.1] mb-5 tracking-tight uppercase">
                START A PRIVATE AIRPORT
                <br />
                BUSINESS THAT WORKS
                <br />
                ON YOUR SCHEDULE.
                <br />
                <span className="text-[#39b54a] block mt-1">NOT SOMEONE ELSE'S.</span>
              </h1>
              <p className="text-[clamp(0.95rem,1.1vw,1.1rem)] text-white font-medium mb-6 max-w-[650px] leading-relaxed tracking-wide mx-auto lg:mx-0">
                QuitTheApp helps experienced drivers launch their own private airport transportation business, accept direct bookings, build trusted client relationships, and create repeat riders and referrals.
              </p>
              <ul className="space-y-3 max-w-[500px] mx-auto lg:mx-0">
                {[
                  "Choose your own schedule",
                  "Serve airport travelers and local clients",
                  "Keep the fares paid directly to your business",
                  "Build repeat riders and referrals",
                  "Create a business asset you control",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center text-white font-bold text-[clamp(0.95rem,1.1vw,1.1rem)] justify-center lg:justify-start"
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
              <div className="bg-[#040a23]/70 backdrop-blur-md rounded-xl p-4 xl:p-5 shadow-2xl w-full max-w-[220px] xl:max-w-[240px] border border-slate-700/50 border-t-[3px] border-t-[#39b54a]">
                <h3 className="text-[#39b54a] font-bold text-xs xl:text-[12px] mb-3 uppercase tracking-wider text-center lg:text-left">
                  YOUR CLIENT BASE GROWS WHEN:
                </h3>
                <ul className="space-y-2 mb-4">
                  {[
                    "Clients book again",
                    "Friends and family refer you",
                    "Travelers save your contact information",
                    "Your reputation grows with every great ride",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start text-white text-[11px] xl:text-[11.5px] font-medium tracking-wide justify-center lg:justify-start"
                    >
                      <div className="bg-[#39b54a] rounded-full p-[2px] mr-3 mt-1 shrink-0">
                        <Check className="w-2.5 h-2.5 text-white stroke-[4]" />
                      </div>
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="w-full h-px bg-slate-700/80 mb-5"></div>
                <div className="text-center lg:text-left">
                  <h4 className="text-white font-extrabold text-base xl:text-lg leading-tight mb-2 tracking-wide">
                    Real Business.
                    <br />
                    Real Clients.
                    <br />
                    Built by You.
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
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4 xl:gap-6">
          <div className="flex items-center gap-3 xl:gap-4">
            <CreditCard
              className="w-8 h-8 xl:w-10 xl:h-10 text-white shrink-0"
              strokeWidth={1.5}
            />
            <div className="text-[12px] xl:text-[13px] font-bold text-white leading-tight text-center md:text-left">
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
            <div className="text-[12px] xl:text-[13px] font-bold text-white leading-tight text-center md:text-left">
              Step-by-Step Quick Launch System
            </div>
          </div>
          <div className="hidden md:block w-px h-8 bg-slate-700/80 shrink-0"></div>
          <div className="flex items-center gap-3 xl:gap-4">
            <ShieldCheck
              className="w-8 h-8 xl:w-10 xl:h-10 text-white shrink-0"
              strokeWidth={1.5}
            />
            <div className="text-[12px] xl:text-[13px] font-bold text-white leading-tight text-center md:text-left">
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
      "Create a professional booking flow that allows clients to request private airport transportation directly from your business.",
  },
  {
    icon: Users,
    title: "Client Acquisition Center™",
    description:
      "Use QR cards, referral tools, outreach templates, and practical strategies to attract new clients and generate direct bookings.",
  },
  {
    icon: Monitor,
    title: "Personalized Selling Page™",
    description:
      "Show travelers who you are, explain your services, and give prospective clients a professional place to learn more and request a ride.",
  },
  {
    icon: RefreshCcw,
    title: "Repeat Rider Engine™",
    description:
      "Follow up, request reviews, encourage referrals, and turn successful airport rides into repeat bookings.",
  },
];

function FeaturesSection() {
  return (
    <section className="bg-white py-1" id="how-it-works">
      <PageContainer size="full">
        <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm p-6">
          <h2 className="text-center text-[#1a1f71] font-extrabold text-xl sm:text-2xl tracking-wide uppercase mb-10">
            EVERYTHING YOU NEED TO CREATE YOUR OWN SUCCESSFUL CLIENT BASE
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
                <p className="text-[#1a1f71] text-xs sm:text-[13px] leading-relaxed max-w-[220px] min-w-0">
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
            <p className="text-[#1a1f71] text-xs sm:text-[13.5px] text-left leading-relaxed font-medium">
              <strong className="text-[#1a1f71] font-bold">
                Also includes:
              </strong>{" "}
              Launch Dashboard™ access, Operator Dashboard™ tools, training resources, lifetime system updates, and real human support.
            </p>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}

function YouMayAlreadyHaveSection() {
  const leftItems = [
    { icon: UserCheck, leftText: "Life Experience", rightText: "Professional Service" },
    { icon: Users, leftText: "Relationships", rightText: "First Customers" },
    { icon: HeartHandshake, leftText: "Community Network", rightText: "Referrals" },
    { icon: ShieldCheck, leftText: "Reliability & Trust", rightText: "Repeat Clients" },
    { icon: Car, leftText: "Vehicle You Own", rightText: "A Strong Starting Point" },
    { icon: Clock, leftText: "Available Time", rightText: "Flexible Business on Your Terms" },
  ];

  const rightItems = [
    { icon: UserCheck, title: "Start Small", description: "Begin with a few rides and grow over time." },
    { icon: CalendarDays, title: "Work Your Way", description: "Choose the days, times and service areas that fit your life." },
    { icon: Users, title: "Build Relationships", description: "Great service creates repeat customers and referrals." },
    { icon: TrendingUp, title: "Create Something That Lasts", description: "Build a business asset that belongs to you." },
  ];

  return (
    <section className="bg-white py-1" id="you-may-already-have">
      <PageContainer size="full">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center lg:items-start">
          {/* Left Card */}
          <div className="w-full lg:w-[45%] bg-[#f4fbf6] rounded-[1.5rem] border border-slate-200 p-6 lg:p-8">
            <h2 className="text-[#1a1f71] font-extrabold text-[1.1rem] sm:text-lg uppercase tracking-wide mb-8">
              YOU MAY ALREADY HAVE MORE OF WHAT YOU NEED THAN YOU REALIZE.
            </h2>
            <div className="space-y-4">
              {leftItems.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className="w-6 h-6 flex items-center justify-center shrink-0">
                    <item.icon className="w-6 h-6 text-[#15803d]" strokeWidth={2} />
                  </div>
                  <div className="flex-1 font-bold text-[#1a1f71] text-sm flex flex-col sm:flex-row sm:items-center">
                    <span className="sm:w-1/2">{item.leftText}</span>
                    <ArrowRight className="hidden sm:block w-4 h-4 text-[#1a1f71] mx-2 shrink-0 stroke-[3px]" />
                    <span className="sm:w-1/2">{item.rightText}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Section (No Card) */}
          <div className="w-full lg:w-[55%] flex flex-col justify-center pt-2 lg:pt-4">
            <h2 className="text-[#1a1f71] font-extrabold text-[1.1rem] sm:text-xl uppercase tracking-wide mb-1">
              YOU DON'T NEED ANOTHER JOB.
            </h2>
            <h3 className="text-[#15803d] font-extrabold text-[1.1rem] sm:text-xl uppercase tracking-wide mb-4">
              MAYBE YOU NEED SOMETHING OF YOUR OWN.
            </h3>
            <p className="text-[#1a1f71] text-[13px] sm:text-sm font-medium mb-10 leading-relaxed w-full">
              Your next chapter can still include income, purpose, relationships and growth — without going back to working for someone else.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 lg:gap-4 items-start">
              {rightItems.map((item, idx) => (
                <div key={idx} className="flex flex-col items-center text-center">
                  <item.icon className="w-8 h-8 sm:w-10 sm:h-10 text-[#15803d] mb-4" strokeWidth={1.5} />
                  <h4 className="font-bold text-[#1a1f71] text-[13px] leading-snug mb-2">{item.title}</h4>
                  <p className="text-[#1a1f71] text-[11px] sm:text-[12px] font-medium leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
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
      description: "Purchase the $495 DIY system\nand receive immediate access\nto the launch resources.",
    },
    {
      number: 2,
      icon: ClipboardList,
      title: "Enter Your Details",
      description:
        "Add your business information,\nservice area, routes,\npricing, and branding details.",
    },
    {
      number: 3,
      icon: Rocket,
      title: "Build and Launch",
      description:
        "Follow the step-by-step guidance\nto create your booking flow and\npersonalized selling page. Want\nhelp getting launch ready? Add\nthe optional $199 Done For You\nLaunch Upgrade.",
    },
  ];

  return (
    <section className="bg-white py-1" id="how-it-works-steps">
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

function ProvenModelAndFaqSection() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  const models = [
    {
      image: chrisImage,
      subtitle: "STARTED WITH JUST 3 BOOKINGS.",
      text: "What began as a handful of airport rides became the foundation of a real business.",
    },
    {
      image: dougImage,
      subtitle: "NEARLY 6,000 SCHEDULED RIDES IN A SINGLE YEAR.",
      text: "Direct clients became repeat riders. Repeat riders created referrals. Systems were built and refined along the way.",
    },
    {
      image: naylinImage,
      subtitle: "QUITTHEAPP WAS BUILT FROM WHAT HAPPENED IN BETWEEN.",
      text: "You don't need thousands of customers to begin. You need a place to start, a system to follow, and a simple process to launch.",
    },
  ];

  const faqs = [
    {
      question: "Do I need rideshare or transportation experience?",
      answer: "No. The $495 QuitTheApp system includes step-by-step guidance so you can complete the setup yourself. Prefer to have everything handled for you? Add the optional $199 We Do It for You upgrade, and our team will complete the setup."
    },
    {
      question: "Do I need experience with websites or technology?",
      answer: "No. The $495 QuitTheApp system includes step-by-step guidance so you can complete the setup yourself. Prefer to have everything handled for you? Add the optional $199 We Do It for You upgrade, and our team will complete the setup."
    },
    {
      question: "How quickly can I get my system?",
      answer: "Launch timing depends on how quickly you complete the setup steps and provide the required business information. Customers who purchase the optional $199 We Do It for You upgrade will receive a separate setup timeline after all required details are submitted."
    },
    {
      question: "Is the $495 really a one-time payment?",
      answer: "Yes. The $495 QuitTheApp DIY system is a one-time payment with no monthly QuitTheApp platform fee. An optional $199 We Do It for You upgrade is available. Normal business expenses such as scheduling software, payment processing, commercial insurance, licensing, fuel, vehicle maintenance, and other operating costs may still apply."
    },
    {
      question: "What if I'm not in a major city?",
      answer: "This works in any city with an airport and travelers. Smaller markets often have less competition."
    },
    {
      question: "How do I get my first clients?",
      answer: "Use the Client Acquisition Center™ with QR cards, referral tools, outreach templates, and practical strategies designed to help you attract prospective clients and generate direct booking opportunities."
    },
    {
      question: "What if it doesn't work for me?",
      answer: "QuitTheApp was created from real experience building and operating a private airport transportation business since 2016. Results depend on your market, pricing, effort, expenses, and ability to attract clients. Our team provides support to help you understand and use the system."
    }
  ];

  return (
    <section className="bg-white py-1 pb-4" id="proven-model-and-faq">
      <PageContainer size="full">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 w-full items-stretch">

          {/* Left Side: Proven Model */}
          <div className="w-full lg:w-[65%] border border-slate-200 rounded-[1.5rem] p-6 lg:p-8 shadow-sm flex flex-col">
            <h2 className="text-[1.1rem] sm:text-lg font-extrabold text-[#1a1f71] mb-6 uppercase tracking-wide leading-snug">
              START WITH A PROVEN <br className="hidden sm:block" /> AIRPORT TRANSPORTATION MODEL
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-6">
              {models.map((model, idx) => (
                <div key={idx} className="flex flex-col">
                  <img src={model.image} alt="Driver" className="w-full h-32 sm:h-40 object-cover rounded-xl mb-4 shadow-sm" />
                  <h4 className="text-[#15803d] font-bold text-[13px] mb-2 uppercase leading-snug tracking-wide">{model.subtitle}</h4>
                  <p className="text-[#1a1f71] text-[12px] font-medium leading-relaxed">{model.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: FAQ */}
          <div className="w-full lg:w-[35%] flex flex-col pt-2 lg:pt-6 lg:pl-2">
            <h2 className="text-[1.1rem] sm:text-lg font-extrabold text-[#1a1f71] mb-6 uppercase tracking-wide">
              FREQUENTLY ASKED QUESTIONS
            </h2>
            <div className="flex flex-col gap-4 mb-6">
              {faqs.map((faq, idx) => (
                <div key={idx} className="flex flex-col cursor-pointer pb-2 border-b border-slate-50 last:border-0" onClick={() => toggleFaq(idx)}>
                  <div className="flex items-center gap-3">
                    <div className="shrink-0 w-6 h-6 rounded-full bg-[#15803d] text-white flex items-center justify-center font-bold text-xs shadow-sm">
                      Q
                    </div>
                    <div className="flex-1 font-medium text-[#1a1f71] text-[13px] leading-snug select-none">
                      {faq.question}
                    </div>
                    <div className={`text-[#15803d] opacity-50 shrink-0 text-xs font-bold transition-transform duration-300 ${openFaqIndex === idx ? 'rotate-90' : ''}`}>&gt;</div>
                  </div>
                  <div className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${openFaqIndex === idx ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                    <div className="overflow-hidden">
                      <p className="pl-9 pr-4 pt-3 text-slate-600 text-[13px] leading-relaxed">
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
    "Built for 50+ drivers",
    "Real human support",
  ];

  return (
    <section className="bg-[#040a23] py-8 mt-1" id="footer-cta">
      <PageContainer size="full">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr_0.7fr] gap-10 lg:gap-8 items-center border-b border-slate-800 pb-10">
          {/* Left Column */}
          <div className="flex flex-col pr-0 lg:pr-8">
            <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight uppercase mb-4 tracking-wide">
              START MY <br />
              <span className="text-[#39b54a]">PRIVATE TRANSPORTATION<br />BUSINESS™</span>
            </h3>
            <div className="flex items-start gap-4">
              <div className="shrink-0 p-1">
                <UserCheck className="w-8 h-8 text-[#39b54a]" strokeWidth={1.5} />
              </div>
              <p className="text-slate-300 text-[13px] sm:text-sm leading-relaxed font-medium">
                Build a professional business around your experience, relationships and the life you want to live.
              </p>
            </div>
          </div>

          {/* Middle Column */}
          <div className="flex flex-col justify-center lg:border-l border-slate-800 lg:pl-10">
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-[2.5rem] font-bold text-[#39b54a] tracking-tight">$495</span>
              <span className="text-white font-bold text-base">One-time payment</span>
            </div>
            <p className="text-slate-300 text-sm mb-1 font-medium">
              Includes the complete QuitTheApp DIY launch system.
            </p>
            <p className="text-slate-300 text-sm mb-5 font-medium">
              Want help getting launch ready? Add the <span className="text-[#39b54a] font-bold">$199 Done For You Launch Upgrade.</span>
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4">
              {benefits.map((benefit, i) => (
                <div key={i} className="flex items-center text-slate-300 text-[13px] font-medium">
                  <div className="bg-[#39b54a] rounded-full p-[2px] mr-2.5 shrink-0">
                    <Check className="w-3 h-3 text-[#040a23] stroke-[4]" />
                  </div>
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col items-center lg:items-end w-full lg:pl-6">
            <button
              onClick={openPricingModal}
              className="cursor-pointer w-full bg-[#39b54a] hover:bg-[#2e9c3c] text-white font-extrabold py-3 px-5 rounded-md transition-colors flex items-center justify-between group text-sm mb-6"
            >
              <span className="text-center w-full">Start Your Business</span>
              <div className="bg-white rounded-full p-1 ml-3 shrink-0 transition-transform group-hover:translate-x-1">
                <ArrowRight className="w-4 h-4 text-[#39b54a] stroke-[3]" />
              </div>
            </button>
            <div className="w-full flex justify-center lg:justify-end mb-2">
              <PaymentBadges justify="center" />
            </div>
            <div className="w-full text-center lg:text-right mt-1">
              <span className="text-slate-500 text-[11px] font-medium">Secure payment processed by <strong className="text-slate-400 font-bold">stripe</strong></span>
            </div>
          </div>
        </div>

        {/* Bottom Trust Indicators & Copyright */}
        <div className="pt-6 flex flex-col items-center">
          <p className="text-slate-500 text-[11px]">
            No spam. Just practical information to help you decide.
          </p>
        </div>
      </PageContainer>
    </section>
  );
}
