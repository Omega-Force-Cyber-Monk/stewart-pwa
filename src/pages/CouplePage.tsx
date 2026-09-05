import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Menu, X, Headset } from "lucide-react";
import { cn } from "../lib/cn";
import coupleLogo from "../assets/logo_couple.png";
import {
  ArrowRight,
  CalendarDays,
  ClipboardList,
  Gift,
  Monitor,
  RefreshCcw,
  Users,
  CreditCard,
  Clock,
  Car,
  Target,
  Heart,
  Check,
  CheckCircle2,
  PenLine,
  LineChart,
  Trophy,
  Lock,
  Rocket
} from "lucide-react";
import { PageContainer } from "../components/layout/PageContainer";
import { PaymentBadges } from "../components/common/PaymentBadges";
import { ProfileDropdown } from "../components/ProfileDropdown";
import { PricingModal } from "../components/PricingModal";
import { useAppDispatch, useAppSelector } from "../hooks/storeHooks";
import { logOut } from "../store/features/auth/authSlice";
import { useLogoutUserMutation } from "../store/api/Auth/auth.api";
import coupleBanner from "../assets/coupleBanner.png";
import card1 from "../assets/1st card.jpg";
import card2 from "../assets/2nd card.jpg";
import card4 from "../assets/4th card.jpg";
import coupleHero from "../assets/coupleHero.png";
import upsellKit from "../assets/Couples_upsell_kit.png";

export default function CouplePage() {
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
      <Navbar openPricingModal={openPricingModal} />
      <HeroBanner openPricingModal={openPricingModal} />
      <AllYouNeedSection />
      <TwoPeopleStrengthsSection />
      <ProvenModelSection />
      <LaunchKitAndFaqSection openPricingModal={openPricingModal} />
      <FooterCTASection openPricingModal={openPricingModal} />
    </>
  );
}

function HeroBanner({ openPricingModal }: { openPricingModal: () => void }) {
  const { accessToken } = useAppSelector((state) => state.auth);

  return (
    <div className="relative w-full data-exit-intent-hero flex flex-col justify-between bg-white border-b border-gray-100">
      {/* Background Image and Main Content container */}
      <div className="relative w-full min-h-[70svh] pt-[clamp(56px,7vw,72px)] flex flex-col justify-between overflow-hidden bg-[#f8fafc] pb-0 lg:pb-0">

        {/* Background Image on the right side */}
        <div className="absolute inset-0 w-full h-full flex justify-end">
          <div className="relative w-full lg:w-[70%] h-full">
            {/* Left edge fade for ultra-wide screens */}
            <div className="hidden lg:block absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-[#f8fafc] via-[#f8fafc]/80 to-transparent z-10"></div>
            <img
              src={coupleBanner}
              alt="Couple in a car"
              className="hidden lg:block w-full h-full object-cover object-[75%_top] sm:object-[80%_top] lg:object-[85%_center] pointer-events-none opacity-95"
            />
            {/* Mobile Background Image */}
            <img
              src={coupleHero}
              alt="Phone concept mobile"
              className="block lg:hidden absolute inset-0 w-full h-full object-cover object-[center_top] pointer-events-none"
            />
          </div>
        </div>


        <div className="relative z-10 w-full flex-grow flex items-center py-4 lg:py-0">
          <PageContainer size="full">
            <div className="flex flex-col lg:flex-row w-full justify-between items-start lg:items-center gap-8 xl:gap-12">
              {/* Left Side Content */}
              <div className="w-full lg:w-1/2 text-left z-10 relative p-4 sm:p-6 lg:p-0">
                <h1 className="text-[clamp(1.75rem,3vw,2.75rem)] font-extrabold text-[#060D64] leading-[1.05] mb-[clamp(0.75rem,1vw,1rem)] tracking-tight uppercase">
                  BUILD SOMETHING
                  <br />
                  OF YOUR OWN.
                  <br />
                  <span className="text-[#eab308] relative inline-block mt-1 font-extrabold">
                    TOGETHER.
                  </span>
                </h1>

                <p className="text-[clamp(0.95rem,1.1vw,1.125rem)] text-[#060D64] font-semibold mb-[clamp(1.25rem,1.5vw,1.75rem)] max-w-[550px] leading-relaxed">
                  Turn the experience, relationships, skills and resources you've built together into the starting point for a private transportation business you can build as a team.
                </p>

                <ul className="space-y-3 mb-2 sm:mb-10 max-w-[500px]">
                  {[
                    "Build around your life and your goals",
                    "Combine your strengths and resources",
                    "Grow through relationships and referrals",
                    "Create an additional source of income",
                    "Build a business asset you both own",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center text-[#060D64] font-bold text-[clamp(0.875rem,0.95vw,1rem)]"
                    >
                      <div className="rounded-full bg-[#eab308] flex items-center justify-center shrink-0 mr-3 w-5 h-5 sm:w-6 sm:h-6">
                        <Check className="text-white w-[60%] h-[60%]" strokeWidth={4} />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {accessToken ? (
                  <button
                    onClick={openPricingModal}
                    className="cursor-pointer bg-[#eab308] hover:bg-[#ca8a04] text-[#0b0f19] font-extrabold py-[clamp(0.75rem,0.9vw,1rem)] px-[clamp(1rem,1.2vw,1.5rem)] rounded-xl transition-all shadow-xl shadow-[#eab308]/30 flex items-center justify-between group w-full sm:w-auto mb-[clamp(1.5rem,2vw,3rem)] border border-[#eab308]"
                  >
                    <span className="text-left leading-snug pr-3 text-[clamp(0.9rem,1vw,1.125rem)] font-extrabold">
                      Start My Private Transportation Business™ — $495
                    </span>
                    <div className="bg-[#0b0f19]/10 rounded-full p-1 border border-[#0b0f19]/20 group-hover:bg-[#0b0f19]/20 transition-colors">
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 stroke-[2.5]" />
                    </div>
                  </button>
                ) : (
                  <button
                    onClick={openPricingModal}
                    className="cursor-pointer bg-[#eab308] hover:bg-[#ca8a04] text-[#0b0f19] font-extrabold py-[clamp(0.75rem,0.9vw,1rem)] px-[clamp(1rem,1.2vw,1.5rem)] rounded-xl transition-all shadow-xl shadow-[#eab308]/30 flex items-center justify-between group w-full sm:w-auto mb-[clamp(1.5rem,2vw,3rem)] border border-[#eab308]"
                  >
                    <span className="text-left leading-snug pr-3 text-[clamp(0.9rem,1vw,1.125rem)] font-extrabold">
                      Start My Private Transportation Business™ — $495
                    </span>
                    <div className="bg-[#0b0f19]/10 rounded-full p-1 border border-[#0b0f19]/20 group-hover:bg-[#0b0f19]/20 transition-colors">
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 stroke-[2.5]" />
                    </div>
                  </button>
                )}
              </div>

              {/* Right Side Card */}
              <div className="w-full lg:w-auto xl:w-[40%] flex justify-center xl:justify-end z-10 mt-6 lg:mt-0">
                <div className="bg-[#0b0f19] rounded-[1.5rem] p-[clamp(1.25rem,1.5vw,2rem)] shadow-2xl w-fit xl:w-full xl:max-w-[320px] border border-white/10 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-[4px] bg-[#eab308]"></div>

                  <h3 className="text-[#eab308] font-bold text-[clamp(0.85rem,1vw,0.95rem)] mb-[clamp(1rem,1.25vw,1.25rem)] uppercase tracking-wide">
                    YOUR BUSINESS GROWS WHEN:
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
                        className="flex items-start text-white text-[clamp(0.85rem,1vw,0.95rem)] font-medium leading-snug"
                      >
                        <div className="rounded-full bg-[#eab308] flex items-center justify-center shrink-0 mr-3 w-5 h-5 mt-0.5">
                          <Check className="text-[#0b0f19] w-[65%] h-[65%]" strokeWidth={4} />
                        </div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="w-full h-px bg-white/10 mb-6"></div>

                  <div>
                    <h4 className="text-white font-extrabold text-[clamp(1.1rem,1.5vw,1.4rem)] leading-tight mb-[clamp(0.5rem,0.75vw,0.75rem)]">
                      Real Business.
                      <br />
                      Real Clients.
                      <br />
                      Real Freedom.™
                    </h4>
                    <svg
                      className="w-24 sm:w-28 h-2 sm:h-2.5 text-[#eab308]"
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
      </div>

      {/* Bottom Trust Badges (Horizontal centered block) */}
      <div className="relative z-20 w-full bg-white py-2 border-b border-gray-100">
        <PageContainer size="full">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 w-full items-center justify-center">

            <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left justify-center">
              <CreditCard className="w-8 h-8 text-[#060D64] shrink-0" strokeWidth={1.5} />
              <div className="text-[13px] sm:text-sm font-bold text-[#060D64] leading-tight">
                One-time payment
                <br />
                <span className="font-medium text-slate-600">No monthly fees</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left justify-center border-l-0 md:border-l border-slate-200">
              <Users className="w-8 h-8 text-[#060D64] shrink-0" strokeWidth={1.5} />
              <div className="text-[13px] sm:text-sm font-bold text-[#060D64] leading-tight">
                Built for couples
                <br />
                <span className="font-medium text-slate-600">Work together your way</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left justify-center border-l-0 md:border-l border-slate-200">
              <Clock className="w-8 h-8 text-[#060D64] shrink-0" strokeWidth={1.5} />
              <div className="text-[13px] sm:text-sm font-bold text-[#060D64] leading-tight">
                Launch in 48-72 hours
                <br />
                <span className="font-medium text-slate-600">We build, you start</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left justify-center border-l-0 md:border-l border-slate-200">
              <Headset className="w-8 h-8 text-[#060D64] shrink-0" strokeWidth={1.5} />
              <div className="text-[13px] sm:text-sm font-bold text-[#060D64] leading-tight">
                Real human support
                <br />
                <span className="font-medium text-slate-600">We're here for you</span>
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
      "Create a professional booking flow that lets travelers request rides directly from you.",
  },
  {
    icon: Users,
    title: "Client Acquisition Center™",
    description:
      "Use QR cards, referral tools, outreach templates, and strategies to attract new clients and generate direct bookings.",
  },
  {
    icon: Monitor,
    title: "Personalized Selling Page™",
    description:
      "Show travelers who you are, what you do and why they can trust you — all in one place.",
  },
  {
    icon: RefreshCcw,
    title: "Repeat Rider Engine™",
    description:
      "Follow up, request reviews, encourage referrals, and turn successful rides into repeat bookings.",
  },
];

function AllYouNeedSection() {
  return (
    <section className="bg-white py-1" id="how-it-works">
      <PageContainer size="full">
        <div className="bg-white p-2">
          <h2 className="text-center text-[#060D64] font-extrabold text-[clamp(1.25rem,2vw,1.75rem)] tracking-wide uppercase mb-2">
            EVERYTHING YOU NEED TO TURN THE OPPORTUNITY INTO A BUSINESS
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-4 lg:gap-y-[clamp(2.5rem,4vw,3.5rem)] gap-x-[clamp(1.5rem,2vw,2rem)] relative mb-4">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center text-center px-4 sm:px-6 relative"
              >
                <div className="mb-[clamp(1rem,1.5vw,1.5rem)]">
                  <feature.icon
                    className="w-[clamp(2.5rem,3vw,3rem)] h-[clamp(2.5rem,3vw,3rem)] text-[#eab308]"
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="font-extrabold text-[#0b0f19] mb-[clamp(0.5rem,1vw,1rem)] text-[clamp(1rem,1.15vw,1.125rem)] leading-snug">
                  {feature.title}
                </h3>
                <p className="text-slate-700 font-medium text-[clamp(0.85rem,0.95vw,0.95rem)] leading-relaxed max-w-[260px]">
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

          <div className="bg-slate-50 border border-[#eab308]/30 rounded-xl p-[clamp(1rem,1.5vw,1.5rem)] flex flex-col sm:flex-row items-center justify-center gap-4 max-w-4xl mx-auto shadow-sm">
            <Gift
              className="w-[clamp(2rem,2.5vw,2.5rem)] h-[clamp(2rem,2.5vw,2.5rem)] text-[#eab308] shrink-0"
              strokeWidth={1.5}
            />
            <p className="text-[#0b0f19] text-[clamp(0.85rem,1vw,0.95rem)] text-center sm:text-left leading-relaxed font-medium">
              <strong className="text-[#060D64] font-bold">
                Also includes:
              </strong>{" "}
              Launch Dashboard™ access, Operator Dashboard™ tools, training
              resources, lifetime updates and real human support.
            </p>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}

function TwoPeopleStrengthsSection() {
  return (
    <section className="bg-white py-1 border-t border-slate-100" id="two-people-strengths">
      <PageContainer size="full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch pt-2">

          {/* Column 1: Two People. Two Sets of Strengths. One Business. */}
          <div className="bg-[#f8fafc] rounded-[1.5rem] p-3 border border-slate-200 flex flex-col h-full shadow-sm">
            <h3 className="text-[#060D64] font-extrabold text-[clamp(1rem,1.25vw,1.25rem)] leading-tight mb-2 uppercase tracking-wide">
              TWO PEOPLE. TWO SETS OF STRENGTHS.<br />
              ONE BUSINESS.
            </h3>

            <div className="space-y-5 mb-2 flex-grow">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#060D64] flex items-center justify-center shrink-0">
                  <Car className="text-white w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-[#060D64] text-sm leading-tight mb-1">One Loves Driving</h4>
                  <p className="text-slate-600 text-xs leading-relaxed font-medium">Serve clients and create<br />amazing experiences</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#060D64] flex items-center justify-center shrink-0">
                  <ClipboardList className="text-white w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-[#060D64] text-sm leading-tight mb-1">One is Organized</h4>
                  <p className="text-slate-600 text-xs leading-relaxed font-medium">Manage bookings, schedules<br />and customer communication</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#060D64] flex items-center justify-center shrink-0">
                  <Users className="text-white w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-[#060D64] text-sm leading-tight mb-1">One Knows Everybody</h4>
                  <p className="text-slate-600 text-xs leading-relaxed font-medium">Build referrals and open doors</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#060D64] flex items-center justify-center shrink-0">
                  <Monitor className="text-white w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-[#060D64] text-sm leading-tight mb-1">One Likes Social Media</h4>
                  <p className="text-slate-600 text-xs leading-relaxed font-medium">Promote the business and<br />stay connected</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#060D64] flex items-center justify-center shrink-0">
                  <Users className="text-white w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-[#060D64] text-sm leading-tight mb-1">Both Have Networks</h4>
                  <p className="text-slate-600 text-xs leading-relaxed font-medium">More potential connections<br />to introduce your business</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#060D64] flex items-center justify-center shrink-0">
                  <Target className="text-white w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-[#060D64] text-sm leading-tight mb-1">Both Own the Outcome</h4>
                  <p className="text-slate-600 text-xs leading-relaxed font-medium">Build something together<br />with a shared vision</p>
                </div>
              </div>
            </div>

            <div className="bg-[#060D64] rounded-xl p-4 flex items-center gap-3 mt-auto">
              <Check className="text-[#eab308] w-6 h-6 shrink-0" />
              <p className="text-white text-sm font-medium leading-snug">
                You decide how your business works best as a team.
              </p>
            </div>
          </div>

          {/* Column 2: Two People. More Ways To Build. */}
          <div className="bg-white rounded-[1.5rem] p-3 border border-slate-200 flex flex-col h-full shadow-sm">
            <h3 className="text-[#060D64] font-extrabold text-[clamp(1rem,1.25vw,1.25rem)] leading-tight mb-1 uppercase tracking-wide">
              TWO PEOPLE. MORE WAYS TO BUILD.
            </h3>
            <p className="text-slate-600 font-medium text-sm leading-relaxed mb-2">
              You decide how to work together and how to build your business.
            </p>

            <div className="space-y-4 mb-2 flex-grow">
              <div className="bg-[#f8fafc] rounded-xl p-4 border border-slate-200 flex items-start gap-4">
                <Car className="text-[#2563eb] w-7 h-7 shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-[#060D64] text-sm leading-tight mb-1">Both Drive</h4>
                  <p className="text-slate-600 text-xs leading-relaxed font-medium">More availability and more opportunities to serve customers.</p>
                </div>
              </div>

              <div className="bg-[#f8fafc] rounded-xl p-4 border border-slate-200 flex items-start gap-4">
                <Users className="text-[#2563eb] w-7 h-7 shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-[#060D64] text-sm leading-tight mb-1">Divide the Work</h4>
                  <p className="text-slate-600 text-xs leading-relaxed font-medium">One drives while the other handles bookings, communication, marketing or referrals.</p>
                </div>
              </div>

              <div className="bg-[#f8fafc] rounded-xl p-4 border border-slate-200 flex items-start gap-4">
                <Clock className="text-[#2563eb] w-7 h-7 shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-[#060D64] text-sm leading-tight mb-1">Work Different Schedules</h4>
                  <p className="text-slate-600 text-xs leading-relaxed font-medium">Build coverage around your individual availability.</p>
                </div>
              </div>

              <div className="bg-[#f8fafc] rounded-xl p-4 border border-slate-200 flex items-start gap-4">
                <Users className="text-[#2563eb] w-7 h-7 shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-[#060D64] text-sm leading-tight mb-1">Build Together</h4>
                  <p className="text-slate-600 text-xs leading-relaxed font-medium">Two sets of skills, relationships and networks working toward one business.</p>
                </div>
              </div>
            </div>

            <div className="bg-[#060D64] rounded-xl p-4 text-center mt-auto">
              <p className="text-white text-sm font-medium leading-snug">
                More ways to serve customers.<br />More capacity. More opportunity.
              </p>
            </div>
          </div>

          {/* Column 3: Your Network + Their Network */}
          <div className="bg-white rounded-[1.5rem] p-3 border border-slate-200 flex flex-col h-full shadow-sm">
            <h3 className="text-[#060D64] font-extrabold text-[clamp(1rem,1.25vw,1.25rem)] leading-tight mb-1 uppercase tracking-wide">
              YOUR NETWORK +<br />THEIR NETWORK =<br />YOUR BUSINESS NETWORK
            </h3>
            <p className="text-slate-600 font-medium text-sm leading-relaxed mb-2">
              Between the two of you, you've built relationships for years. Those relationships can be the starting point for your business.
            </p>

            <div className="flex items-center justify-between mb-2 px-2">
              <div className="flex flex-col items-center">
                <Users className="w-10 h-10 text-[#060D64]" />
                <span className="text-[10px] font-bold text-[#060D64] mt-1 text-center">Your<br />Network</span>
              </div>
              <span className="text-2xl font-extrabold text-[#060D64]">+</span>
              <div className="flex flex-col items-center">
                <Users className="w-10 h-10 text-[#060D64]" />
                <span className="text-[10px] font-bold text-[#060D64] mt-1 text-center">Their<br />Network</span>
              </div>
              <span className="text-2xl font-extrabold text-[#060D64]">=</span>
              <div className="flex flex-col items-center">
                <Users className="w-12 h-12 text-[#2563eb]" />
                <span className="text-[10px] font-bold text-[#2563eb] mt-1 text-center">Your Business<br />Network</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-y-3 gap-x-2 mb-2 flex-grow">
              {[
                "Church friends",
                "Local businesses",
                "Family & relatives",
                "Professional contacts",
                "Neighbors & community",
                "Social groups",
                "Coworkers (past & present)",
                "Parents you know",
                "Clubs, sports & hobbies",
                "And many more",
              ].map((item, i) => (
                <div key={i} className="flex items-start">
                  <div className="rounded-full bg-[#eab308] flex items-center justify-center shrink-0 w-4 h-4 mr-2 mt-0.5">
                    <Check className="text-[#0b0f19] w-3 h-3" strokeWidth={4} />
                  </div>
                  <span className="text-[11px] font-semibold text-slate-700 leading-tight">{item}</span>
                </div>
              ))}
            </div>

            <div className="bg-[#f8fafc] rounded-xl p-4 border border-[#eab308]/40 flex items-start gap-3 mt-auto shadow-sm">
              <Heart className="text-[#eab308] w-6 h-6 shrink-0 mt-0.5" />
              <p className="text-slate-700 text-[13px] font-medium leading-relaxed">
                One great ride can create a repeat customer. One happy customer can create a referral. Two networks can give your business more places to start.
              </p>
            </div>
          </div>

        </div>
      </PageContainer>
    </section>
  );
}



function ProvenModelSection() {
  return (
    <section className="bg-white py-1" id="proven-model">
      <PageContainer size="full">
        <h2 className="text-[clamp(1.1rem,1.5vw,1.35rem)] font-extrabold text-[#060D64] mb-2 uppercase tracking-wide">
          START WITH A PROVEN<br />AIRPORT TRANSPORTATION MODEL
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* Card 1 */}
          <div className="flex flex-col">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-[#060D64] text-white flex items-center justify-center shrink-0">
                <PenLine className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-extrabold text-[#060D64] text-lg uppercase leading-tight mb-1">3 BOOKINGS</h4>
                <p className="text-[#060D64] font-medium text-[13px] leading-snug pr-4">What started as just 3 airport rides turned into real clients and a real business.</p>
              </div>
            </div>
            <img src={card1} className="w-full h-40 object-cover rounded-xl mt-auto shadow-sm" alt="3 Bookings" />
          </div>

          {/* Card 2 */}
          <div className="flex flex-col">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-[#060D64] text-white flex items-center justify-center shrink-0">
                <LineChart className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-extrabold text-[#060D64] text-lg uppercase leading-tight mb-1">NEARLY 6,000 RIDES</h4>
                <p className="text-[#060D64] font-medium text-[13px] leading-snug pr-4">In a single year through repeat business, referrals, and a direct booking model.</p>
              </div>
            </div>
            <img src={card2} className="w-full h-40 object-cover rounded-xl mt-auto shadow-sm" alt="6000 Rides" />
          </div>

          {/* Card 3 */}
          <div className="flex flex-col">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-[#eab308] text-white flex items-center justify-center shrink-0">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-extrabold text-[#060D64] text-lg uppercase leading-tight mb-1">BUILT FROM EXPERIENCE</h4>
                <p className="text-[#060D64] font-medium text-[13px] leading-snug pr-4">QuitTheApp was built from what actually works in real markets serving real travelers.</p>
              </div>
            </div>
            <img src={card4} className="w-full h-40 object-cover rounded-xl mt-auto shadow-sm object-top" alt="Built from experience" />
          </div>
        </div>
      </PageContainer>
    </section>
  );
}

function LaunchKitAndFaqSection({ openPricingModal }: { openPricingModal: () => void }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const faqs = [
    { question: "Do we both need to drive?", answer: "No. Many couples divide the work—one handles driving while the other manages bookings, communication, and marketing." },
    { question: "Will this work in our city?", answer: "Yes. As long as you have a local airport and people who travel, this model can work. The demand for reliable airport transportation is universal." },
    { question: "How is this different from rideshare apps?", answer: "You own the business. You set your own prices, keep 100% of the profits, and build a network of repeat, loyal clients instead of relying on an algorithm." },
    { question: "How do we get our first clients?", answer: "The launch kit includes a Relationship & Referral Strategy to help you leverage your existing network and community to get your very first bookings." },
    { question: "Is the $495 really a one-time payment?", answer: "Yes! There are no monthly platform fees or ongoing subscriptions. You pay once for lifetime access to the system." },
    { question: "What if we're not tech-savvy?", answer: "No problem. The system is designed to be plug-and-play, and if you want us to handle the technical setup, we offer a 'We Do It For You' upgrade for $199." },
  ];

  return (
    <section className="bg-white py-1" id="faq">
      <PageContainer size="full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 border border-slate-200 rounded-3xl bg-white shadow-sm p-3">
          {/* Column 1 */}
          <div className="flex flex-col lg:pr-6 lg:border-r border-slate-200">
            <h3 className="text-[#060D64] font-extrabold text-[1.1rem] uppercase tracking-wide mb-2">HOW IT WORKS: 3 SIMPLE STEPS</h3>

            <div className="flex items-start gap-4 mb-2">
              <div className="w-8 h-8 rounded-full bg-[#060D64] text-white flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">1</div>
              <div className="flex-1">
                <h4 className="font-extrabold text-[#060D64] text-[15px] mb-1">Get Access</h4>
                <p className="text-[#060D64] text-[12px] font-medium leading-relaxed pr-2">Purchase the $495 DIY system and receive immediate access to the launch resources.</p>
              </div>
              <Lock className="w-8 h-8 text-[#060D64] shrink-0 opacity-80" strokeWidth={1.5} />
            </div>

            <div className="flex items-start gap-4 mb-2">
              <div className="w-8 h-8 rounded-full bg-[#060D64] text-white flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">2</div>
              <div className="flex-1">
                <h4 className="font-extrabold text-[#060D64] text-[15px] mb-1">Submit Your Details</h4>
                <p className="text-[#060D64] text-[12px] font-medium leading-relaxed pr-2">Provide your business information and branding details. We handle the setup.</p>
              </div>
              <ClipboardList className="w-8 h-8 text-[#060D64] shrink-0 opacity-80" strokeWidth={1.5} />
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-[#060D64] text-white flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">3</div>
              <div className="flex-1">
                <h4 className="font-extrabold text-[#060D64] text-[15px] mb-1">Both Build & You Start</h4>
                <p className="text-[#060D64] text-[12px] font-medium leading-relaxed pr-2">We build your booking flow and selling page. You start getting customers.</p>
              </div>
              <Rocket className="w-8 h-8 text-[#060D64] shrink-0 opacity-80" strokeWidth={1.5} />
            </div>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col lg:px-6 lg:border-r border-slate-200 mt-8 lg:mt-0">
            <h3 className="text-[#060D64] font-extrabold text-[1.1rem] uppercase tracking-wide leading-tight mb-1">COUPLES BUSINESS LAUNCH KIT™</h3>
            <p className="text-[#060D64] font-bold text-[13px] mb-6">Everything you need to launch with confidence.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-y-5 gap-x-2 mb-2">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-[18px] h-[18px] text-[#eab308] shrink-0" strokeWidth={2.5} />
                <span className="text-[#060D64] text-[12.5px] font-bold leading-tight">Custom Brand Identity Kit</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-[18px] h-[18px] text-[#eab308] shrink-0" strokeWidth={2.5} />
                <span className="text-[#060D64] text-[12.5px] font-bold leading-tight">Personalized Selling Page Setup</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-[18px] h-[18px] text-[#eab308] shrink-0" strokeWidth={2.5} />
                <span className="text-[#060D64] text-[12.5px] font-bold leading-tight">Social Media Starter Pack</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-[18px] h-[18px] text-[#eab308] shrink-0" strokeWidth={2.5} />
                <span className="text-[#060D64] text-[12.5px] font-bold leading-tight">Local Client & Positioning Guide</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-[18px] h-[18px] text-[#eab308] shrink-0" strokeWidth={2.5} />
                <span className="text-[#060D64] text-[12.5px] font-bold leading-tight flex items-center flex-wrap gap-1">3 Done For You Launch Videos <span className="bg-[#eab308] text-[#060D64] text-[9px] px-[5px] py-[2px] font-extrabold rounded uppercase mt-0.5">NEW!</span></span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-[18px] h-[18px] text-[#eab308] shrink-0" strokeWidth={2.5} />
                <span className="text-[#060D64] text-[12.5px] font-bold leading-tight">Relationship & Referral Launch Strategy</span>
              </div>
              <div className="flex items-start gap-2 col-span-1 sm:col-span-2">
                <CheckCircle2 className="w-[18px] h-[18px] text-[#eab308] shrink-0" strokeWidth={2.5} />
                <span className="text-[#060D64] text-[12.5px] font-bold leading-tight">Text / Customer Response Pack</span>
              </div>
            </div>

            <button onClick={openPricingModal} className="mt-4 w-full text-left bg-[#eab308] rounded-xl p-4 flex items-center justify-between shadow-sm cursor-pointer hover:bg-[#ca8a04] transition-colors group">
              <span className="text-[#060D64] font-extrabold text-[14px]">Optional Upgrade: We Do It For You — $199</span>
              <Users className="w-6 h-6 text-[#060D64] opacity-80 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col lg:pl-6 mt-8 lg:mt-0">
            <h3 className="text-[#060D64] font-extrabold text-[1.1rem] uppercase tracking-wide mb-6">FREQUENTLY ASKED QUESTIONS</h3>

            <div className="flex flex-col space-y-[6px] mb-4">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div key={idx} className="flex flex-col border border-slate-200 rounded-lg overflow-hidden bg-white shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition-colors hover:bg-slate-50">
                    <div
                      onClick={() => toggleFaq(idx)}
                      className="flex justify-between items-center p-3 cursor-pointer"
                    >
                      <span className="text-[#060D64] font-bold text-[13px]">{faq.question}</span>
                      <span className={cn("text-[#060D64] font-black text-lg opacity-60 leading-none transition-transform duration-300", isOpen ? "rotate-45" : "")}>+</span>
                    </div>
                    <div
                      className={cn(
                        "grid transition-all duration-300 ease-in-out",
                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      )}
                    >
                      <div className="overflow-hidden">
                        <p className="text-slate-600 text-[12.5px] p-3 pt-0 leading-relaxed font-medium">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}

function FooterCTASection({ openPricingModal }: { openPricingModal: () => void }) {
  return (
    <section className="bg-white py-1" id="footer-cta">
      <PageContainer size="full">
        <div className="bg-[#0b0f19] rounded-[24px] p-4 flex flex-col lg:flex-row items-center lg:items-stretch gap-4 justify-between shadow-xl">

          {/* Left Block */}
          <div className="flex items-center gap-5 lg:border-r border-slate-700 lg:pr-10 w-full lg:w-auto justify-center lg:justify-start">
            <Users className="w-16 h-16 text-white shrink-0 opacity-90" strokeWidth={1} />
            <div className="flex flex-col justify-center">
              <h3 className="text-white font-extrabold text-[1.2rem] lg:text-[1.35rem] uppercase leading-tight mb-2 tracking-wide">
                YOUR NEXT CHAPTER.<br />
                <span className="text-[#eab308]">YOUR BUSINESS.<br />TOGETHER.</span>
              </h3>
              <p className="text-white/90 text-[13px] font-medium leading-snug">Create freedom, build income,<br />and own your future — as a team.</p>
            </div>
          </div>

          {/* Middle Block */}
          <div className="flex-1 flex flex-col justify-center w-full lg:w-auto items-center lg:items-start text-center lg:text-left">
            <h4 className="text-white font-extrabold text-[13px] uppercase mb-4 tracking-wider">THIS $495 SYSTEM INCLUDES:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
              {[
                "Complete DIY launch system",
                "Step-by-step training",
                "No monthly platform fees",
                "Lifetime updates",
                "Built for couples",
                "Real human support"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle2 className="w-[18px] h-[18px] text-[#eab308] shrink-0" strokeWidth={2.5} />
                  <span className="text-white text-[13px] font-medium leading-none">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Block */}
          <div className="flex flex-col items-center justify-center shrink-0 w-full lg:w-auto lg:min-w-[320px]">
            <button onClick={openPricingModal} className="w-full bg-[#eab308] hover:bg-[#ca8a04] text-[#0b0f19] font-extrabold py-4 px-5 rounded-xl flex items-center justify-between mb-1 cursor-pointer shadow-lg transition-colors group">
              <span className="text-left w-full text-[14px] lg:text-[15px] leading-tight">Start My Private Transportation<br />Business™ — $495</span>
              <div className="w-8 h-8 rounded-full border-2 border-[#0b0f19] flex items-center justify-center shrink-0 group-hover:bg-[#0b0f19] group-hover:text-[#eab308] transition-colors ml-3">
                <ArrowRight className="w-4 h-4" strokeWidth={3} />
              </div>
            </button>
            <PaymentBadges justify="center" paymentLabel="Secure checkout powered by" />
          </div>

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
                  to={user?.role === "admin" ? "/admin/settings" : "/profile-settings"}
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
