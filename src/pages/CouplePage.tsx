import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "../lib/cn";
import coupleLogo from "../assets/coupleLogo.png";
import { ArrowRight, CalendarDays, Check, CheckCircle2, ChevronRight, ClipboardList, Contact, Gift, Heart, Lock, Monitor, Plane, RefreshCcw, Rocket, ShieldCheck, Star, User, Users, XCircle, CreditCard, Clock } from "lucide-react";
import { PageContainer } from "../components/layout/PageContainer";
import coupleBanner from "../assets/coupleBanner.png";
import womenMiddleSection from "../assets/womenMiddleSection.png";
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
    <div className="relative w-full bg-[#f8fafc] overflow-hidden">
      {/* Background Image on the right side */}
      <div className="absolute top-0 right-0 w-full lg:w-[60%] xl:w-[65%] h-[500px] lg:h-full z-0">
        <img
          src={coupleBanner}
          alt="Couple in a car"
          className="w-full h-full object-cover object-[center_top] lg:object-center block"
          style={{
            WebkitMaskImage: "linear-gradient(to right, transparent, black 15%)",
            maskImage: "linear-gradient(to right, transparent, black 15%)",
          }}
        />
        {/* Subtle gradient for text readability if needed on mobile */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#f8fafc] via-[#f8fafc]/80 to-transparent lg:hidden"></div>
      </div>

      <div className="relative z-10 w-full py-16 sm:py-20 lg:py-28 pt-28 sm:pt-32 lg:pt-36">
        <PageContainer size="full">
          <div className="flex flex-col lg:flex-row w-full justify-between items-start lg:items-center gap-10">
            {/* Left Side Content */}
            <div className="w-full lg:w-1/2 xl:w-[55%] text-left z-10 relative">
              <h1 className="text-[clamp(2.25rem,4vw,3.5rem)] font-extrabold text-[#0b0f19] leading-[1.1] mb-6 tracking-tight uppercase">
                Build An Airport<br />
                Transportation Business<br />
                <span className="text-[#2563eb] relative inline-block mt-1">
                  Together.
                  <svg className="absolute -bottom-2 sm:-bottom-3 left-0 w-full h-2 sm:h-3 text-[#eab308]" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 0" fill="transparent" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                  </svg>
                </span>
              </h1>

              <p className="text-[clamp(1.125rem,1.5vw,1.25rem)] text-slate-700 font-semibold mb-8 max-w-[500px] leading-snug">
                Build your own business, your schedule, and the life you want—while helping travelers every day.
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

              <button className="bg-[#eab308] hover:bg-[#ca8a04] text-[#0b0f19] font-bold py-4 px-6 rounded-[0.5rem] transition-colors shadow-lg shadow-[#eab308]/30 flex items-center justify-between group w-full sm:w-auto text-[clamp(1rem,1.2vw,1.125rem)] mb-12 sm:mb-16 lg:mb-20">
                <span className="text-left leading-snug pr-4">
                  Build Our Airport Transportation Business Today™
                </span>
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Bottom Trust Badges */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8 bg-white/90 backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-sm inline-flex border border-slate-200">
                <div className="flex items-center gap-3">
                  <CreditCard className="w-7 h-7 sm:w-8 sm:h-8 text-[#0b0f19] shrink-0" strokeWidth={1.5} />
                  <div className="text-[10px] sm:text-xs font-bold text-[#0b0f19] leading-tight">
                    One-time payment<br />
                    <span className="font-medium text-slate-500">No monthly fees</span>
                  </div>
                </div>
                <div className="hidden sm:block w-px h-10 bg-slate-200"></div>
                <div className="flex items-center gap-3">
                  <Clock className="w-7 h-7 sm:w-8 sm:h-8 text-[#0b0f19] shrink-0" strokeWidth={1.5} />
                  <div className="text-[10px] sm:text-xs font-bold text-[#0b0f19] leading-tight">
                    Quick Launch Booking Flow<br />
                    <span className="font-medium text-slate-500">in 48-72 Hours</span>
                  </div>
                </div>
                <div className="hidden sm:block w-px h-10 bg-slate-200"></div>
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-7 h-7 sm:w-8 sm:h-8 text-[#0b0f19] shrink-0" strokeWidth={1.5} />
                  <div className="text-[10px] sm:text-xs font-bold text-[#0b0f19] leading-tight">
                    Built for couples<br />
                    <span className="font-medium text-slate-500">Your business. Your future.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side Card */}
            <div className="w-full lg:w-[45%] xl:w-[40%] flex justify-center lg:justify-end z-10 mt-10 lg:mt-0">
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
                    <li key={i} className="flex items-center text-white text-sm sm:text-[15px] font-semibold">
                      <CheckCircle2 className="w-5 h-5 mr-3 fill-[#2563eb] text-white shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="w-full h-px bg-slate-800 mb-8"></div>

                <div>
                  <h4 className="text-white font-extrabold text-xl sm:text-2xl leading-tight mb-4">
                    Real Business.<br />
                    Real Customers.<br />
                    Real Freedom.™
                  </h4>
                  <svg className="w-24 sm:w-32 h-3 sm:h-4 text-[#eab308]" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 0" fill="transparent" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                  </svg>
                </div>
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
    description: "Take direct airport ride requests with your own professional booking flow."
  },
  {
    icon: Contact,
    title: "Customer Acquisition Center™",
    description: "Get QR cards, referral tools, and outreach templates to attract and book more customers."
  },
  {
    icon: Monitor,
    title: "Personalized Selling Page™",
    description: "Show travelers who you are and why they should trust and book with you."
  },
  {
    icon: RefreshCcw,
    title: "Repeat Rider Engine™",
    description: "Follow up, get reviews, encourage referrals, and bring riders back for more repeat rides."
  }
];

function FeaturesSection() {
  return (
    <section className="bg-white py-12" id="how-it-works">
      <PageContainer size="full">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0b0f19] tracking-tight">
            Everything You Need to <span className="text-[#eab308]">Start Building Your Own Customers</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-4 bg-white p-2">
                <feature.icon className="w-10 h-10 text-[#eab308]" strokeWidth={1.5} />
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

        <div className="bg-[#eab308]/5 border border-[#eab308]/10 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4 max-w-4xl mx-auto">
          <Gift className="w-8 h-8 text-[#eab308] shrink-0" strokeWidth={1.5} />
          <p className="text-slate-700 text-xs sm:text-sm text-center sm:text-left leading-relaxed">
            <strong className="text-[#eab308]">Also includes:</strong> Launch Dashboard™ access, hosting setup, training resources, lifetime updates, and real human support.
          </p>
        </div>
      </PageContainer>
    </section>
  );
}

function ComparisonSection() {
  return (
    <section className="bg-white py-12" id="comparison">
      <PageContainer size="full">
        <div className="w-full rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden relative flex flex-col lg:flex-row bg-white">
          {/* Background Image - fades on left, hard cut by right panel */}
          <div
            className="absolute inset-y-0 left-[20%] right-0 z-0 hidden lg:block"
            style={{
              WebkitMaskImage:
                "linear-gradient(to right, transparent, black 25%)",
              maskImage: "linear-gradient(to right, transparent, black 25%)",
            }}
          >
            <img
              src={womenMiddleSection}
              alt="Woman at airport"
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Mobile Image (visible only on small screens) */}
          <div
            className="w-full h-48 sm:h-64 lg:hidden relative"
            style={{
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent, black 25%)",
            }}
          >
            <img
              src={womenMiddleSection}
              alt="Woman at airport"
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Left Panel: Relying on Apps */}
          <div className="w-full lg:w-[35%] p-8 sm:p-10 relative z-10">
            <h3 className="text-2xl sm:text-3xl font-bold text-[#eab308] mb-8 text-center lg:text-left">
              Relying on Apps
            </h3>
            <ul className="space-y-5 lg:pr-12">
              {[
                "Customers belong to the platform",
                "No repeat system",
                "Limited control",
                "Dependent on app traffic",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-center text-slate-800 text-sm sm:text-base font-semibold"
                >
                  <XCircle className="w-6 h-6 sm:w-7 sm:h-7 mr-4 fill-[#eab308] text-white shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Spacer for desktop to let the image show through */}
          <div className="hidden lg:block lg:w-[30%] relative z-10"></div>

          {/* Right Panel: Your Couple-Focused Business - Solid white for hard edge */}
          <div className="w-full lg:w-[35%] p-8 sm:p-10 relative z-10 bg-white">
            <h3 className="text-2xl sm:text-3xl font-bold text-[#22c55e] mb-8 text-center lg:text-left">
              Your Couple-Focused Business
            </h3>
            <ul className="space-y-5 lg:pl-12">
              {[
                "You own your customers",
                "Repeat riders and referrals",
                "Set your rates and keep 100%",
                "Professional trust-based experience",
                "Real assets that grow",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-center text-slate-800 text-sm sm:text-base font-semibold"
                >
                  <CheckCircle2 className="w-6 h-6 sm:w-7 sm:h-7 mr-4 fill-[#22c55e] text-white shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
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
    <section className="bg-white py-8 border-b border-slate-100">
      <PageContainer size="full">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#0b0f19] text-center mb-6">
          Why Couple Operators Can Win
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-4 md:divide-x divide-slate-200 w-full">
          {reasons.map((reason, idx) => (
            <div key={idx} className="flex flex-col items-center text-center px-4">
              <reason.icon className="w-8 h-8 text-[#eab308] mb-3" strokeWidth={1.5} />
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
      description: "Secure your spot and get instant access."
    },
    {
      number: 2,
      icon: ClipboardList,
      title: "Submit Your Details",
      description: "Send us your business info, routes, and pricing."
    },
    {
      number: 3,
      icon: Rocket,
      title: "We Build Your System",
      description: "Your booking flow and selling page go live fast."
    }
  ];

  return (
    <section className="bg-white py-10" id="how-it-works-steps">
      <PageContainer size="full">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#0b0f19] text-center mb-8">
          How It Works
        </h2>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4 w-full">
          {steps.map((step, idx) => (
            <div key={idx} className="flex items-center w-full md:w-auto flex-1 justify-center">
              <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3 sm:gap-4 w-full justify-center">
                
                {/* Icon Container with Overlapping Number */}
                <div className="relative shrink-0">
                  <div className="absolute -left-2 sm:-left-3 top-1/2 -translate-y-1/2 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#eab308] text-white flex items-center justify-center font-bold text-xs sm:text-sm z-10 shadow-sm border border-white">
                    {step.number}
                  </div>
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#eab308]/5 border border-[#eab308]/10 flex items-center justify-center relative z-0">
                    <step.icon className="w-7 h-7 sm:w-8 sm:h-8 text-[#eab308]" strokeWidth={1.5} />
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
                <div className="hidden lg:flex shrink-0 mx-2 text-[#eab308]">
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
      quote: "I launched in 2 weeks and my repeat bookings and referrals keep growing.",
      name: "Jessica M.",
      location: "Austin, TX"
    },
    {
      quote: "My clients love the touch of trust and care I bring to every ride.",
      name: "Maria R.",
      location: "Scottsdale, AZ"
    },
    {
      quote: "This system gave me the freedom to build a business I'm proud of.",
      name: "Lisa T.",
      location: "Charlotte, NC"
    }
  ];

  return (
    <section className="bg-white py-10" id="reviews">
      <PageContainer size="full">
        <div className="w-full rounded-[2rem] border border-slate-200 shadow-sm p-6 sm:p-8 md:p-10 bg-white">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#0b0f19] text-center mb-8">
            Couple Operators Are Building Real Businesses
          </h2>
          
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-6 w-full">
            {reviews.map((review, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row items-stretch gap-4 sm:gap-5 w-full flex-1">
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
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  
                  {/* Quote */}
                  <p className="text-[#0b0f19] font-medium text-sm sm:text-base leading-snug mb-3">
                    "{review.quote}"
                  </p>
                  
                  {/* Author */}
                  <div>
                    <h5 className="font-bold text-[#eab308] text-sm sm:text-base">
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
      answer: "The system serves any market with an airport and travelers who need reliable transportation. Smaller markets often have less competition for private airport rides—making them easier to dominate. Your city has travelers, and this system can help you connect with them.",
    },
    {
      question: "How is this different from Uber or Lyft?",
      answer: "Uber and Lyft control the customer, set the prices, and take 50-60% of your earnings. With QuitTheApp, you own your customer list, set your rates, keep 100% of your fares, and build a valuable business asset.",
    },
    {
      question: "Is the $495 really a one-time payment?",
      answer: "Yes! $495 is a one-time payment—no monthly fees, commissions, or subscriptions. Most operators recover their investment with just two or three airport rides. After that, all earnings are yours.",
    },
    {
      question: "I'm not tech-savvy. Can I still do this?",
      answer: "Absolutely! Choose DIY with step-by-step guidance, Guided Setup for $129, or Done For You for $249. No tech skills needed—we take care of it all.",
    },
    {
      question: "How do I get my first customers?",
      answer: "Use the Customer Acquisition Center with QR cards, outreach templates, and customer-building tools. Start with your network, local hotels, and referrals—one customer becomes many.",
    },
    {
      question: "What if it doesn't work for me?",
      answer: (
        <>
          We've been running a real business since 2026 and stand behind this system. If it's not the right fit during setup, contact us at{" "}
          <a href="mailto:support@quittheapp.com" className="text-blue-600 hover:underline">
            support@quittheapp.com
          </a>{" "}
          and our team will help.
        </>
      ),
    },
  ];

  return (
    <section className="bg-white py-10 pb-20" id="faq">
      <PageContainer size="full">
        <div className="w-full rounded-[2rem] border border-slate-200 shadow-sm p-6 sm:p-8 md:p-10 bg-white">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#0b0f19] text-center mb-8 sm:mb-10">
            Frequently <span className="text-[#eab308]">Asked Questions</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
            {faqs.map((faq, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className="shrink-0 w-8 h-8 rounded-full bg-[#eab308] text-white flex items-center justify-center font-bold text-sm shadow-sm mt-0.5">
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
    <section className="bg-[#0b0f19] pt-12 pb-6 border-t-4 border-[#eab308]">
      <PageContainer size="full">
        {/* Main 3-Column Layout */}
        <div className="flex flex-col lg:flex-row justify-between gap-10 lg:gap-8 pb-10 border-b border-slate-800">
          
          {/* Column 1: Intro */}
          <div className="lg:w-1/3 flex flex-col pr-0 lg:pr-8 lg:border-r border-slate-800">
            <h3 className="text-2xl sm:text-3xl font-bold text-white leading-tight mb-6">
              Start My <span className="text-[#eab308]">Couple-Focused</span><br />
              Private Airport Business™
            </h3>
            <div className="flex items-start gap-4">
              <Heart className="w-10 h-10 text-[#eab308] shrink-0 stroke-[1.5]" />
              <p className="text-slate-300 text-sm leading-relaxed">
                Build a trusted, professional business that puts you in control—and your customers keep coming back.
              </p>
            </div>
          </div>

          {/* Column 2: Pricing & Checklist */}
          <div className="lg:w-1/3 flex flex-col justify-center">
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-4xl font-bold text-[#eab308]">$495</span>
              <span className="text-white font-bold text-lg">One-time payment</span>
            </div>
            <ul className="space-y-2">
              {benefits.map((benefit, i) => (
                <li key={i} className="flex items-center text-slate-300 text-sm">
                  <Check className="w-5 h-5 text-[#eab308] mr-3 shrink-0 stroke-[3]" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Button & Payments */}
          <div className="lg:w-1/3 flex flex-col justify-center items-center lg:items-end">
            <button className="bg-[#eab308] hover:bg-[#ca8a04] text-white font-bold py-4 px-6 rounded-lg transition-colors shadow-lg shadow-[#eab308]/20 flex items-center justify-between group w-full text-base sm:text-lg mb-4">
              <span className="text-center w-full">
                Start My Couple-Focused <br className="hidden xl:block" />
                Private Airport Business™ — $495
              </span>
              <div className="bg-white rounded-full p-1 ml-4 shrink-0 transition-transform group-hover:translate-x-1">
                <ChevronRight className="w-5 h-5 text-[#eab308] stroke-[3]" />
              </div>
            </button>
            
            {/* Payment Badges (CSS simulated) */}
            <div className="flex gap-2 flex-wrap justify-center lg:justify-end">
              <div className="bg-white px-2 py-1 rounded text-[#1a1f71] font-bold text-xs italic tracking-tighter border border-slate-300">VISA</div>
              <div className="bg-white px-2 py-1 rounded flex items-center justify-center border border-slate-300">
                <div className="w-3 h-3 rounded-full bg-[#eb001b] -mr-1 opacity-90 mix-blend-multiply"></div>
                <div className="w-3 h-3 rounded-full bg-[#f79e1b] opacity-90 mix-blend-multiply"></div>
              </div>
              <div className="bg-[#2e77bc] px-2 py-1 rounded text-white font-bold text-xs border border-slate-300">AMEX</div>
              <div className="bg-white px-2 py-1 rounded text-[#f68121] font-bold text-xs border border-slate-300">DISCOVER</div>
              <div className="bg-[#635bff] px-2 py-1 rounded text-white font-bold text-xs border border-slate-300">stripe</div>
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
    { label: "What's Included", href: "#whats-included" },
    { label: "Who It's For", href: "#who-its-for" },
    { label: "Pricing", href: "#pricing" },
  ];

  const logo = coupleLogo;
  const hoverTextClass = "hover:text-[#eab308]";
  const btnClass = "bg-[#eab308] hover:bg-[#ca8a04] shadow-[#eab308]/20";

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-transparent",
        isScrolled ? "py-3 shadow-sm backdrop-blur-sm" : "py-5",
      )}
    >
      <PageContainer size="full">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-2 z-50">
            <img src={logo} alt="QuitTheApp Logo" className="h-10 w-auto" />
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

            <button className={cn("text-white font-bold py-2.5 px-6 rounded-md transition-colors text-sm shadow-lg", btnClass)}>
              Start My Business — $495
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-white z-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </PageContainer>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-[#0b0f19] border-t border-slate-800 shadow-xl">
          <nav className="flex flex-col p-6 gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn("text-slate-300 text-lg font-semibold transition-colors", hoverTextClass)}
              >
                {link.label}
              </a>
            ))}
            <button className={cn("text-white font-bold py-3 px-6 rounded-md transition-colors w-full mt-4", btnClass)}>
              Start My Business — $495
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
