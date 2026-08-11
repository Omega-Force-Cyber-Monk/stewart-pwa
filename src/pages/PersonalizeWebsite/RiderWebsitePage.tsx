import { useState } from "react";
import { useParams } from "react-router-dom";
import { CheckCircle2, X } from "lucide-react";
import { useGetPublicBusinessBySlugQuery } from "../../store/api/Business/business.api";
import { WebsiteNavbar } from "./WebsiteNavbar";
import { BookingForm } from "./BookingForm";
import { HeroSection } from "./HeroSection";
import { TrustBadges } from "./TrustBadges";
import { AirportsServed } from "./AirportsServed";
import { OurServices } from "./OurServices";
import { WhyChooseUs } from "./WhyChooseUs";
import { ServiceAreaSection } from "./ServiceAreaSection";
import { FAQSection } from "./FAQSection";
import { ReserveRideBanner } from "./ReserveRideBanner";
import { WebsiteFooter } from "./WebsiteFooter";

export default function RiderWebsitePage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: publicResponse, isLoading, isError } = useGetPublicBusinessBySlugQuery(slug ?? "");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

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

  const handleBookingSubmit = () => {
    setShowSuccessModal(true);
  };

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
        bookingFormChild={<BookingForm onSubmit={handleBookingSubmit} />}
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
      />

      {/* 7. Booking Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-white/10 rounded-3xl w-full max-w-md shadow-2xl p-6 sm:p-8 relative zoom-in-95 animate-in duration-200 text-center flex flex-col items-center text-white">
            <button
              onClick={() => setShowSuccessModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center text-green-400 mb-5">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h3 className="text-xl font-bold mb-2">Booking Inquiry Sent!</h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              Thank you for choosing {businessName}. Your request has been forwarded. We will contact you at your email or phone details shortly to confirm your booking details.
            </p>

            <button
              onClick={() => setShowSuccessModal(false)}
              className="w-full bg-[#22c55e] hover:bg-[#1ea951] text-white py-2.5 rounded-xl text-sm font-bold transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
