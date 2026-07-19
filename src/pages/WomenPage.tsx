import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
import womenBannerImage from "../assets/womenBannerImage.png";
import womenMiddleSection from "../assets/womenMiddleSection.png";
import womenLogo from "../assets/womenLogo.png";
import reviewImage from "../assets/review.jpg";

export default function WomenPage() {
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
    <div className="relative w-full bg-[#0b0f19] h-[100svh] flex flex-col justify-between overflow-hidden pt-[80px]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={womenBannerImage}
          alt="Launch a Women-Focused Private Airport Business"
          className="w-full h-full object-cover object-[center_top] lg:object-[right_top]"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b0f19] via-[#0b0f19]/80 to-[#0b0f19]/40 lg:to-transparent"></div>
      </div>

      {/* Main Content dictating height */}
      <div className="relative z-10 w-full flex-grow flex pb-8">
        <PageContainer size="full" className="flex flex-col h-full">
          <div className="flex flex-col lg:flex-row w-full justify-between items-center lg:items-stretch flex-grow gap-10">
            {/* Left Side Content */}
            <div className="w-full max-w-[clamp(280px,40vw,672px)] text-left z-10 self-center">
              <h1 className="text-[clamp(2rem,3.5vw,3.75rem)] font-bold text-white leading-tight mb-[clamp(1rem,1vw,1rem)] tracking-tight">
                Launch a <br />
                <span className="text-[#f42661]">Women-Focused</span> <br />
                Private Airport <br />
                Business Built on Trust.
              </h1>

              <p className="text-[clamp(1rem,1.2vw,1.125rem)] text-slate-200 mb-[clamp(1.5rem,2vw,2rem)] max-w-[clamp(280px,35vw,576px)] leading-relaxed">
                QuitTheApp helps women operators start a direct-booking airport
                transportation business with the tools to get booked, build
                trust, and create repeat riders.
              </p>

              <ul className="space-y-[clamp(0.5rem,0.8vw,0.5rem)] mb-[clamp(1.5rem,2vw,2rem)]">
                {[
                  "Own your customer list",
                  "Offer safe, professional airport rides",
                  "Build repeat riders and referrals",
                  "Keep 100% of every fare",
                  "Create a business asset you control",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center text-slate-100 text-[clamp(0.875rem,1.1vw,1.125rem)]"
                  >
                    <CheckCircle2 className="text-[#f42661] mr-[clamp(0.5rem,0.8vw,0.75rem)] w-[clamp(1.25rem,1.8vw,1.5rem)] h-[clamp(1.25rem,1.8vw,1.5rem)] fill-[#f42661] text-white shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <button className="cursor-pointer bg-[#f42661] hover:bg-[#d91950] text-white font-bold py-[clamp(0.75rem,1vw,1rem)] px-[clamp(1rem,2vw,2rem)] rounded-[clamp(0.25rem,0.5vw,0.375rem)] transition-colors shadow-lg shadow-[#f42661]/30 flex items-center justify-between group w-full sm:w-auto text-[clamp(0.875rem,1.1vw,1.125rem)]">
                <span className="text-left leading-snug">
                  Start My Women-Focused <br className="hidden sm:block" />
                  Private Airport Business™ — $495
                </span>
                <div className="bg-white rounded-full p-[clamp(0.15rem,0.3vw,0.25rem)] ml-[clamp(0.5rem,1vw,1rem)] group-hover:translate-x-1 transition-transform shrink-0">
                  <ChevronRight className="text-[#f42661] w-[clamp(1rem,1.2vw,1.25rem)] h-[clamp(1rem,1.2vw,1.25rem)]" />
                </div>
              </button>
            </div>

            {/* Right Side Trust Badge - SCALED UP */}
            <div className="w-full lg:w-[45%] flex justify-center lg:justify-end self-end z-10">
              <div className="flex bg-white rounded-[clamp(1rem,1.5vw,1.5rem)] p-[clamp(1.5rem,2.5vw,2rem)] shadow-2xl w-full max-w-[clamp(320px,35vw,500px)] flex-col items-center text-center">
                <div className="flex items-center gap-[clamp(0.75rem,1.5vw,1.5rem)] mb-[clamp(1rem,2vw,2rem)] w-full justify-center lg:justify-start">
                  <ShieldCheck
                    className="text-[#f42661] w-[clamp(4rem,7vw,7rem)] h-[clamp(4rem,7vw,7rem)] shrink-0"
                    strokeWidth={1.5}
                  />
                  <div className="text-left">
                    <h3 className="text-[#0b0f19] font-bold text-[clamp(1.25rem,1.8vw,1.75rem)] leading-tight">
                      Trusted.
                      <br />
                      Professional.
                      <br />
                      Women Focused.
                    </h3>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-[clamp(0.25rem,0.5vw,0.75rem)] mb-[clamp(0.5rem,1vw,1rem)] w-full mt-[clamp(0.25rem,0.5vw,0.5rem)]">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="text-yellow-400 w-[clamp(1.75rem,3vw,2.5rem)] h-[clamp(1.75rem,3vw,2.5rem)] fill-yellow-400"
                    />
                  ))}
                </div>

                <p className="text-[#f42661] font-bold text-[clamp(1.25rem,1.8vw,1.75rem)] mt-[clamp(0.25rem,0.5vw,0.5rem)]">
                  Built for Success.
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
    title: "Customer Acquisition Center™",
    description:
      "Get QR cards, referral tools, and outreach templates to attract and book more customers.",
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
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0b0f19] tracking-tight">
            Everything You Need to{" "}
            <span className="text-[#f42661]">
              Start Building Your Own Customers
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow"
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

        <div className="bg-[#f42661]/5 border border-[#f42661]/10 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4 max-w-4xl mx-auto">
          <Gift className="w-8 h-8 text-[#f42661] shrink-0" strokeWidth={1.5} />
          <p className="text-slate-700 text-xs sm:text-sm text-center sm:text-left leading-relaxed">
            <strong className="text-[#f42661]">Also includes:</strong> Launch
            Dashboard™ access, hosting setup, training resources, lifetime
            updates, and real human support.
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
            <div className="relative h-48 sm:h-60 overflow-hidden">
              <img
                src={womenMiddleSection}
                alt="Woman at airport"
                className="h-full w-full object-cover object-center"
              />
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent" />
            </div>
            <div className="px-5 py-4">
              <h3 className="mb-3 text-xl font-bold text-[#f42661] text-center">
                Relying on Apps
              </h3>
              <ul className="space-y-2 mb-5">
                {[
                  "Customers belong to the platform",
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
                  "You own your customers",
                  "Repeat riders and referrals",
                  "Set your rates and keep 100%",
                  "Professional trust-based experience",
                  "Real assets that grow",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 shrink-0 fill-[#16a34a] text-white" />
                    <span className="text-[14px] font-semibold text-slate-800">
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
                  "Customers belong to the platform",
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
            <div className="flex-1 relative overflow-hidden">
              <img
                src={womenMiddleSection}
                alt="Woman at airport"
                className="w-full h-auto block"
              />
            </div>

            {/* Right */}
            <div className="w-[32%] shrink-0 bg-white px-8 py-0 flex flex-col justify-center">
              <h3 className="mb-4 text-[22px] font-bold text-[#16a34a] leading-tight">
                Your Women-Focused Business
              </h3>
              <ul className="space-y-3">
                {[
                  "You own your customers",
                  "Repeat riders and referrals",
                  "Set your rates and keep 100%",
                  "Professional trust-based experience",
                  "Real assets that grow",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 shrink-0 fill-[#16a34a] text-white" />
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
      title: "Trust and safety",
    },
    {
      icon: Star,
      title: "Professional reliability",
    },
    {
      icon: Users,
      title: "Family and senior referrals",
    },
    {
      icon: Plane,
      title: "Airport travel made personal",
    },
  ];

  return (
    <section className="bg-white py-3 border-b border-slate-100">
      <PageContainer size="full">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#0b0f19] text-center mb-6">
          Why Women Operators Can Win
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-4 md:divide-x divide-slate-200 w-full">
          {reasons.map((reason, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center px-4"
            >
              <reason.icon
                className="w-8 h-8 text-[#f42661] mb-3"
                strokeWidth={1.5}
              />
              <h4 className="font-bold text-[#0b0f19] text-sm sm:text-base leading-snug max-w-[140px]">
                {reason.title}
              </h4>
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
      description: "Secure your spot and get instant access.",
    },
    {
      number: 2,
      icon: ClipboardList,
      title: "Submit Your Details",
      description: "Send us your business info, routes, and pricing.",
    },
    {
      number: 3,
      icon: Rocket,
      title: "We Build Your System",
      description: "Your booking flow and selling page go live fast.",
    },
  ];

  return (
    <section className="bg-white py-3" id="how-it-works-steps">
      <PageContainer size="full">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#0b0f19] text-center mb-8">
          How It Works
        </h2>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4 w-full">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="flex items-center w-full md:w-auto flex-1 justify-center"
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
    },
    {
      quote:
        "My clients love the touch of trust and care I bring to every ride.",
      name: "Maria R.",
      location: "Scottsdale, AZ",
    },
    {
      quote:
        "This system gave me the freedom to build a business I'm proud of.",
      name: "Lisa T.",
      location: "Charlotte, NC",
    },
  ];

  return (
    <section className="bg-white py-3" id="reviews">
      <PageContainer size="full">
        <div className="w-full rounded-[2rem] border border-slate-200 shadow-sm p-6 bg-white">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#0b0f19] text-center mb-8">
            Women Operators Are Building Real Businesses
          </h2>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-6 w-full">
            {reviews.map((review, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row items-stretch gap-4 sm:gap-5 w-full flex-1"
              >
                {/* Image */}
                <div className="shrink-0 w-full sm:w-[150px] lg:w-[140px] xl:w-[160px] flex">
                  <img
                    src={reviewImage}
                    alt={review.name}
                    className="w-full h-32 sm:h-full rounded-2xl object-cover shadow-sm"
                  />
                </div>

                {/* Review Content */}
                <div className="flex flex-col justify-between py-1 text-center sm:text-left">
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
                  <p className="text-[#0b0f19] font-medium text-sm sm:text-base leading-snug mb-3">
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
      question: "Yes, this will work in your city.",
      answer:
        "The system serves any market with an airport and travelers who need reliable transportation. Smaller markets often have less competition for private airport rides—making them easier to dominate. Your city has travelers, and this system can help you connect with them.",
    },
    {
      question: "How is this different from Uber or Lyft?",
      answer:
        "Uber and Lyft control the customer, set the prices, and take 50-60% of your earnings. With QuitTheApp, you own your customer list, set your rates, keep 100% of your fares, and build a valuable business asset.",
    },
    {
      question: "Is the $495 really a one-time payment?",
      answer:
        "Yes! $495 is a one-time payment—no monthly fees, commissions, or subscriptions. Most operators recover their investment with just two or three airport rides. After that, all earnings are yours.",
    },
    {
      question: "I'm not tech-savvy. Can I still do this?",
      answer:
        "Absolutely! Choose DIY with step-by-step guidance, Guided Setup for $129, or Done For You for $249. No tech skills needed—we take care of it all.",
    },
    {
      question: "How do I get my first customers?",
      answer:
        "Use the Customer Acquisition Center with QR cards, outreach templates, and customer-building tools. Start with your network, local hotels, and referrals—one customer becomes many.",
    },
    {
      question: "What if it doesn't work for me?",
      answer: (
        <>
          We've been running a real business since 2026 and stand behind this
          system. If it's not the right fit during setup, contact us at{" "}
          <a
            href="mailto:support@quittheapp.com"
            className="text-blue-600 hover:underline"
          >
            support@quittheapp.com
          </a>{" "}
          and our team will help.
        </>
      ),
    },
  ];

  return (
    <section className="bg-white py-3 " id="faq">
      <PageContainer size="full">
        <div className="w-full rounded-[2rem] border border-slate-200 shadow-sm p-6 bg-white">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#0b0f19] text-center mb-8 sm:mb-10">
            Frequently <span className="text-[#f42661]">Asked Questions</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
            {faqs.map((faq, idx) => (
              <div key={idx} className="flex items-start gap-4">
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

function FooterCTASection() {
  const benefits = [
    "One-time payment",
    "No monthly platform fees",
    "Built for airport transportation",
    "Real human support",
  ];

  const trustBadges = [
    { icon: ShieldCheck, text: "Secure Checkout" },
    { icon: CheckCircle2, text: "100% Safe" },
    { icon: Lock, text: "One-time payment" },
    { icon: XCircle, text: "No monthly fees" },
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
              Start My <span className="text-[#f42661]">Women-Focused</span>
              <br />
              Private Airport Business™
            </h3>
            <div className="flex items-start gap-4">
              <Heart className="w-10 h-10 text-[#f42661] shrink-0 stroke-[1.5]" />
              <p className="text-slate-300 text-sm leading-relaxed">
                Build a trusted, professional business that puts you in
                control—and your customers keep coming back.
              </p>
            </div>
          </div>

          {/* Column 2: Pricing & Checklist */}
          <div className="lg:w-1/3 flex flex-col justify-center">
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-4xl font-bold text-[#f42661]">$495</span>
              <span className="text-white font-bold text-lg">
                One-time payment
              </span>
            </div>
            <ul className="space-y-2">
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
            <button className="cursor-pointer bg-[#f42661] hover:bg-[#d91950] text-white font-bold py-4 px-6 rounded-lg transition-colors shadow-lg shadow-[#f42661]/20 flex items-center justify-between group w-full text-base sm:text-lg mb-4">
              <span className="text-center w-full">
                Start My Women-Focused <br className="hidden xl:block" />
                Private Airport Business™ — $495
              </span>
              <div className="bg-white rounded-full p-1 ml-4 shrink-0 transition-transform group-hover:translate-x-1">
                <ChevronRight className="w-5 h-5 text-[#f42661] stroke-[3]" />
              </div>
            </button>

            {/* Payment Badges (CSS simulated) */}
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
              <div className="bg-[#635bff] px-2 py-1 rounded text-white font-bold text-xs border border-slate-300">
                stripe
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

  const hoverTextClass = "hover:text-[#f42661]";
  const btnClass = "bg-[#f42661] hover:bg-[#d91950] shadow-[#f42661]/20";

  return (
    <header
      className={cn(
        "left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "fixed top-0 bg-[#040a23] shadow-md py-1"
          : "absolute top-0 bg-transparent py-4",
      )}
    >
      <PageContainer size="full">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-2 z-50">
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
            className="cursor-pointer lg:hidden text-white z-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </PageContainer>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-[#040a23] border-t border-slate-800 shadow-xl">
          <nav className="flex flex-col p-6 gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "text-slate-300 text-lg font-semibold transition-colors",
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
