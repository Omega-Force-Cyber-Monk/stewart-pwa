import React from "react";
import standardBanner from "../../assets/standardBanner.png";
import seniorLogo from "../../assets/seniorLogo.png";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: React.ReactNode;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen w-full relative flex items-center justify-center lg:justify-start py-12 px-6 sm:px-12 lg:px-20 xl:px-32 overflow-x-hidden selection:bg-brand-btn/30">
      {/* Full-screen Background Banner */}
      <div className="absolute inset-0 w-full h-full z-0 select-none pointer-events-none">
        <img
          src={standardBanner}
          alt="QuitTheApp Background"
          className="w-full h-full object-cover object-center lg:object-right opacity-95"
        />
        {/* Subtle dark overlay on mobile screens for text contrast */}
        <div className="absolute inset-0 bg-[#0b0d2c]/60 lg:hidden" />
      </div>

      {/* Floating Auth Card - Centered on mobile, left-aligned on desktop over the solid background */}
      <div className="relative z-10 w-full max-w-md bg-brand-card/80 lg:bg-[#12143A] backdrop-blur-xl border border-brand-border/40 rounded-xl p-8 sm:p-10 shadow-2xl transition duration-300 hover:border-brand-border/60">
        {/* Brand Logo inside the card */}
        <div className="flex justify-start mb-6">
          <img src={seniorLogo} alt="QuitTheApp Logo" className="h-10 object-contain" />
        </div>

        {/* Title and Subtitle */}
        <div className="text-left mb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-white leading-tight">
            {title}
          </h1>
          <div className="mt-2 text-sm text-slate-300 leading-relaxed font-medium">
            {subtitle}
          </div>
        </div>

        {/* Dynamic Form Children */}
        <div>{children}</div>
      </div>
    </div>
  );
}
