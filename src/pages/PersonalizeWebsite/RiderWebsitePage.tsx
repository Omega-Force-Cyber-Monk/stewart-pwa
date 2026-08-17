import { skipToken } from "@reduxjs/toolkit/query";
import { useGetPublicBusinessBySlugQuery } from "../../store/api/Business/business.api";
import { WebsiteNavbar } from "./WebsiteNavbar";

import { HeroSection } from "./HeroSection";
import { TrustBadges } from "./TrustBadges";
import { AirportsServed } from "./AirportsServed";
import { OurServices } from "./OurServices";
import { WhyChooseUs } from "./WhyChooseUs";
import { ServiceAreaSection } from "./ServiceAreaSection";
import { FAQSection } from "./FAQSection";
import { ReserveRideBanner } from "./ReserveRideBanner";
import { WebsiteFooter } from "./WebsiteFooter";
import { InstallPrompt } from "../../components/pwa/InstallPrompt";

interface RiderWebsitePageProps {
  slug?: string;
}

export default function RiderWebsitePage({ slug }: RiderWebsitePageProps) {
  const { data: publicResponse, isLoading, isError } =
    useGetPublicBusinessBySlugQuery(slug ?? skipToken);

  const data = publicResponse?.data;
  const business = data?.business;
  const serviceArea = data?.serviceArea;

  // Real data only — no fabricated placeholders.
  const businessName = business?.name ?? "";
  const businessPhone = business?.phone ?? "";
  const businessEmail = business?.email ?? "";
  const cityArea = serviceArea?.cityArea ?? null;
  const airports = serviceArea?.airports ?? [];

  const servingAreas = cityArea ? [cityArea].concat(airports) : [];

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-950 text-white">
        <div className="animate-pulse text-lg font-bold">Loading website...</div>
      </div>
    );
  }

  if (isError || !publicResponse) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-950 text-white">
        <div className="text-center">
          <div className="text-4xl mb-4">😕</div>
          <p className="text-lg font-bold mb-2">Website not found</p>
          <p className="text-sm text-slate-400">
            This business page is unavailable or the business is not yet live.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070809] text-white flex flex-col font-sans relative">
      <InstallPrompt personalized />

      {/* 1. Header Navigation */}
      <WebsiteNavbar
        businessName={businessName}
        businessPhone={businessPhone}
        logoUrl={business?.logoUrl}
      />

      {/* 2. Hero Booking Container */}
      <HeroSection
        businessName={businessName}
        businessPhone={businessPhone}
        businessInfo={business?.businessInfo || ""}
        servingAreas={servingAreas}
        bookingUrl={data?.booking?.bookingUrl ?? null}
        logoUrl={business?.logoUrl}
      />

      {/* 3. Horizontal Trust Badges Ribbon (Directly after Banner) */}
      <TrustBadges />

      {/* 4. Airports List Section */}
      <AirportsServed airports={airports} />

      {/* 5. Our Services Section */}
      <OurServices />

      {/* 6. Why Choose Us Section */}
      <WhyChooseUs />

      {/* 7. Service Area & Traveling Soon Section */}
      <ServiceAreaSection servingAreas={servingAreas} />

      {/* 8. Reserve My Ride CTA Banner */}
      <ReserveRideBanner businessPhone={businessPhone} businessEmail={businessEmail} bookingUrl={data?.booking?.bookingUrl ?? null} />

      {/* 9. FAQ Section */}
      <FAQSection />

      {/* 10. Bottom Copyright & Contact Info Footer */}
      <WebsiteFooter
        businessName={businessName}
        businessPhone={businessPhone}
        businessEmail={businessEmail}
        logoUrl={business?.logoUrl}
        serviceAreas={servingAreas}
        airports={airports}
        bookingUrl={data?.booking?.bookingUrl ?? null}
      />

    </div>
  );
}
