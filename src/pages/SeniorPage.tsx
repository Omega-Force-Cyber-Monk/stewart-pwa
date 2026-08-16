import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Headset, Check, TrendingUp, Menu, X } from "lucide-react";
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
import { ProfileDropdown } from "../components/ProfileDropdown";
import { PricingModal } from "../components/PricingModal";
import { useAppDispatch, useAppSelector } from "../hooks/storeHooks";
import { logOut } from "../store/features/auth/authSlice";
import { useLogoutUserMutation } from "../store/api/Auth/auth.api";
import seniorBanner from "../assets/seniorBanner.png";
import coupleComparisonLeft from "../assets/coupleComparisonSectionLeft.png";
import coupleComparisonRight from "../assets/coupleComparisonSectionRight.png";
import chrisImage from "../assets/50_Chris_S.jpg";
import dougImage from "../assets/50_Doug_L.jpg";
import naylinImage from "../assets/50_Naylin_H.jpg";
import { PaymentBadges } from "../components/common/PaymentBadges";

export default function SeniorPage() {
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
      <SeniorNavbar openPricingModal={openPricingModal} />
      <HeroBanner />
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
    <div className="relative w-full min-h-[90svh] flex flex-col justify-between overflow-hidden bg-[#040a23] pt-[80px]">
      {/* Background Image on the right side */}
      {/* Background Image */}
      <img
        src={seniorBanner}
        alt="Senior couple"
        className="absolute inset-0 w-full h-full object-cover object-[center_top] lg:object-[right_top] transform scale-[0.85] lg:scale-[0.85] translate-x-[5%] origin-right pointer-events-none opacity-90"
      />
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#040a23] via-[#040a23]/90 to-[#040a23]/30 w-full lg:w-[70%] xl:w-[65%] z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#040a23] via-[#040a23]/80 to-transparent lg:hidden w-full h-full z-0"></div>

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
              <div className="bg-[#040a23]/70 backdrop-blur-md rounded-xl p-5 xl:p-6 shadow-2xl w-full max-w-[300px] xl:max-w-[320px] border border-slate-700/50 border-t-[3px] border-t-[#39b54a]">
                <h3 className="text-[#39b54a] font-bold text-sm xl:text-[14px] mb-4 uppercase tracking-wider text-center lg:text-left">
                  YOUR CLIENT BASE GROWS WHEN:
                </h3>
                <ul className="space-y-3 mb-6">
                  {[
                    "Clients book again",
                    "Friends and family refer you",
                    "Travelers save your contact information",
                    "Your reputation grows with every great ride",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start text-white text-[13px] xl:text-[13.5px] font-medium tracking-wide justify-center lg:justify-start"
                    >
                      <div className="bg-[#39b54a] rounded-full p-[2px] mr-3 mt-1 shrink-0">
                        <Check className="w-3 h-3 text-white stroke-[4]" />
                      </div>
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="w-full h-px bg-slate-700/80 mb-5"></div>
                <div className="text-center lg:text-left">
                  <h4 className="text-white font-extrabold text-lg xl:text-xl leading-tight mb-2 tracking-wide">
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
    <section className="bg-white py-3" id="how-it-works">
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
            <p className="text-[#1a1f71] text-xs sm:text-[13.5px] text-center leading-relaxed font-medium">
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

function ComparisonSection() {
  const badList = [
    "The platform controls the client relationship",
    "Pricing is determined through the app",
    "You do not own the client list",
    "There is no built-in system for direct repeat bookings",
    "Your access to app-generated rides can change",
  ];

  const goodList = [
    "You build your own client list",
    "You set your own rates",
    "You create repeat riders and referrals",
    "Travelers save your contact information",
    "You build a business asset you control",
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
              DRIVING THROUGH RIDESHARE APPS
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
              <h3 className="text-base sm:text-[1.1rem] font-bold text-[#dc2626] mb-5 uppercase tracking-wide leading-snug text-center lg:text-left">
                DRIVING THROUGH RIDESHARE APPS
              </h3>
              <ul className="space-y-3">
                {badList.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start text-[#1a1f71] text-sm font-bold justify-center lg:justify-start"
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
              <h3 className="text-base sm:text-[1.1rem] font-bold text-[#15803d] mb-5 uppercase tracking-wide leading-snug text-center lg:text-left">
                YOUR PRIVATE AIRPORT BUSINESS™
              </h3>
              <ul className="space-y-3">
                {goodList.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start text-[#1a1f71] text-sm font-bold justify-center lg:justify-start"
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
      title: "Experience Builds Trust",
      description: "Your professional and life experience can help travelers feel confident booking directly with you.",
    },
    {
      icon: Users,
      title: "Stronger Client Relationships",
      description: "Airport travelers, professionals, families, and seniors often value reliability, communication, and personal service.",
    },
    {
      icon: Clock,
      title: "Flexible Scheduling",
      description: "Choose the days, times, routes, and service areas that fit your availability and goals.",
    },
    {
      icon: TrendingUp,
      title: "Build Something You Control",
      description: "Create repeat clients, referrals, and a transportation business asset that belongs to you.",
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
                className="flex flex-row items-center lg:items-start lg:flex-col gap-4 flex-1 pt-6 lg:pt-0 lg:px-4 first:pt-0 first:pl-0 last:pr-0 justify-center lg:justify-start"
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
        "Follow the step-by-step guidance\nto create your booking flow\nand personalized selling page.\nPrefer assistance? Add the\noptional $199 We Do It for You upgrade.",
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
        "I launched in 3 weeks and booked my first airport ride in 7 days. I finally have freedom and extra income on my own terms.",
      name: "Chris S.",
      location: "Knoxville, TN",
      image: chrisImage,
    },
    {
      quote:
        "The system is simple, professional, and it works. I set my schedule and now I'm meeting great people every day.",
      name: "Doug L.",
      location: "Tampa, FL",
      image: dougImage,
    },
    {
      quote:
        "I started part time and now I'm fully booked most weeks. This business has given me the life I wanted.",
      name: "Naylin H.",
      location: "Houston, TX",
      image: naylinImage,
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
                    src={review.image}
                    alt={review.name}
                    loading="lazy"
                    className="w-full h-40 sm:h-full rounded-xl object-cover object-top shadow-sm"
                  />
                </div>

                {/* Review Content */}
                <div className="flex flex-col justify-start py-1 text-left text-center sm:text-left flex-1">
                  {/* Quote */}
                  <p className="text-[#1a1f71] font-bold text-xs sm:text-[13px] leading-relaxed mb-4 italic">
                    "{review.quote}"
                  </p>

                  <div className="mt-auto">
                    {/* Stars */}
                    <div className="flex items-center justify-center sm:justify-start gap-[2px] mb-2">
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
      question: "Do I need experience with websites or technology?",
      answer:
        "No. The $495 QuitTheApp system includes step-by-step guidance so you can complete the setup yourself. Prefer to have everything handled for you? Add the optional $199 We Do It for You upgrade, and our team will complete the setup.",
    },
    {
      question: "How quickly can I get my system?",
      answer:
        "Launch timing depends on how quickly you complete the setup steps and provide the required business information. Customers who purchase the optional $199 We Do It for You upgrade will receive a separate setup timeline after all required details are submitted.",
    },
    {
      question: "Is the $495 really a one-time payment?",
      answer:
        "Yes. The $495 QuitTheApp DIY system is a one-time payment with no monthly QuitTheApp platform fee. An optional $199 We Do It for You upgrade is available. Normal business expenses such as scheduling software, payment processing, commercial insurance, licensing, fuel, vehicle maintenance, and other operating costs may still apply.",
    },
    {
      question: "Is webpage hosting included?",
      answer:
        "Yes. Hosting for your QuitTheApp personalized selling page is included. Separate costs may apply for optional third-party services such as scheduling software, payment processing, domain registration, commercial insurance, and other normal business expenses.",
    },
    // Row 2
    {
      question: "What if I'm not in a major city?",
      answer:
        "This works in any city with an airport and travelers. Smaller markets often have less competition.",
    },
    {
      question: "How do I get my first clients?",
      answer:
        "Use the Client Acquisition Center™ with QR cards, referral tools, outreach templates, and practical strategies designed to help you attract prospective clients and generate direct booking opportunities.",
    },
    {
      question: "What if it doesn't work for me?",
      answer:
        "QuitTheApp was created from real experience building and operating a private airport transportation business since 2016. Results depend on your market, pricing, effort, expenses, and ability to attract clients. Our team provides support to help you understand and use the system.",
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
              <div key={idx} className="flex items-start gap-4 justify-center lg:justify-start">
                <div className="shrink-0 w-7 h-7 rounded-full bg-[#15803d] text-white flex items-center justify-center font-bold text-sm shadow-sm mt-0.5">
                  Q
                </div>
                <div className="flex flex-col text-center lg:text-left">
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

function FooterCTASection({ openPricingModal }: { openPricingModal: () => void }) {
  const { accessToken, user } = useAppSelector((state) => state.auth);


  const trustBadges = [
    {
      icon: Users,
      title: "Built for Drivers",
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
      title: "Real Human Support",
      subtitle: "Help From People Who Understand the Business",
    },
    {
      icon: ShieldCheck,
      title: "Built From Real Transportation Experience",
      subtitle: "Real Business Experience Since 2016",
    },
  ];
  const benefits = [
    "One-time payment",
    "No monthly QuitTheApp platform fees",
    "Built for airport transportation",
    "Real human support",
  ];

  return (
    <section className="bg-[#0b0f19] py-3 border-t-4 border-[#39b54a]" id="footer-cta">
      <PageContainer size="full">
        {/* Main 3-Column Layout */}
        <div className="flex flex-col lg:flex-row justify-between gap-10 lg:gap-8 pb-10 border-b border-slate-800">
          {/* Column 1: Intro */}
          <div className="lg:w-1/3 flex flex-col pr-0 lg:pr-8 lg:border-r border-slate-800">
            <h3 className="text-2xl sm:text-3xl font-bold text-white leading-tight mb-6 uppercase">
              Start My <br />
              <span className="text-[#39b54a]">Private Airport Business™</span>
            </h3>
            <div className="flex items-start gap-4">
              <Users className="w-10 h-10 text-[#39b54a] shrink-0 stroke-[1.5]" />
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
                <span className="text-[clamp(2.5rem,4vw,3rem)] font-bold text-[#39b54a]">$495</span>
                <span className="text-white font-bold text-lg">
                  One-time payment
                </span>
              </div>
              <span className="text-slate-300 text-sm mt-2 leading-snug max-w-[280px]">
                Includes the complete QuitTheApp DIY launch system.<br />
                <span className="mt-2 block font-medium">Optional $199 We Do It for You upgrade available.</span>
              </span>
            </div>
            <ul className="space-y-2 mt-2">
              {benefits.map((benefit, i) => (
                <li
                  key={i}
                  className="flex items-center text-slate-300 text-sm"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#39b54a] mr-3 shrink-0 stroke-[3]" />
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
                className="cursor-pointer w-full bg-gradient-to-b from-[#4ade80] to-[#16a34a] hover:from-[#22c55e] hover:to-[#15803d] text-white font-extrabold py-4 px-6 rounded-lg transition-all shadow-lg shadow-[#16a34a]/20 flex items-center justify-between group text-base sm:text-lg mb-4 min-h-[56px]"
              >
                <span className="text-center w-full">
                  Start Your Business
                </span>
                <div className="bg-white rounded-full p-1 ml-4 shrink-0 transition-transform group-hover:translate-x-1">
                  <ArrowRight className="w-5 h-5 text-[#16a34a] stroke-[3]" />
                </div>
              </button>
            ) : accessToken ? (
              <button
                onClick={openPricingModal}
                className="cursor-pointer w-full bg-gradient-to-b from-[#4ade80] to-[#16a34a] hover:from-[#22c55e] hover:to-[#15803d] text-white font-extrabold py-4 px-6 rounded-lg transition-all shadow-lg shadow-[#16a34a]/20 flex items-center justify-between group text-base sm:text-lg mb-4 min-h-[56px]"
              >
                <span className="text-center w-full">
                  Start My Private Airport Business™ — $495
                </span>
                <div className="bg-white rounded-full p-1 ml-4 shrink-0 transition-transform group-hover:translate-x-1">
                  <ArrowRight className="w-5 h-5 text-[#16a34a] stroke-[3]" />
                </div>
              </button>
            ) : (
              <button
                onClick={openPricingModal}
                className="cursor-pointer w-full bg-gradient-to-b from-[#4ade80] to-[#16a34a] hover:from-[#22c55e] hover:to-[#15803d] text-white font-extrabold py-4 px-6 rounded-lg transition-all shadow-lg shadow-[#16a34a]/20 flex items-center justify-between group text-base sm:text-lg mb-4 min-h-[56px]"
              >
                <span className="text-center w-full">
                  Start My Private Airport Business™ — $495
                </span>
                <div className="bg-white rounded-full p-1 ml-4 shrink-0 transition-transform group-hover:translate-x-1">
                  <ArrowRight className="w-5 h-5 text-[#16a34a] stroke-[3]" />
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
