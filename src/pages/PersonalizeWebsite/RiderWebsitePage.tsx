import { useState } from "react";
import { CheckCircle2, X } from "lucide-react";
import { useGetSetupStateQuery } from "../../store/api/Business/business.api";
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
  const { data: setupResponse, isLoading } = useGetSetupStateQuery();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const business = setupResponse?.data?.business;
  const serviceArea = setupResponse?.data?.serviceArea;

  const businessName = business?.businessName || "Naples Airport Transportation";
  const businessPhone = business?.phone || "(239) 555-1234";
  const businessEmail = business?.email || "info@naplesairporttransport.com";
  const cityArea = serviceArea?.cityArea || "Naples";
  const airports = serviceArea?.airports || [];

  const servingAreas = serviceArea?.cityArea
    ? [cityArea].concat(airports)
    : ["Naples", "Marco Island", "Bonita Springs", "Estero"];

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
        businessInfo="Reliable private rides for travelers who want reliability, professional drivers, and easy booking."
        servingAreas={servingAreas}
        bookingFormChild={<BookingForm onSubmit={handleBookingSubmit} />}
      />

      {/* 3. Horizontal Trust Badges Ribbon (Directly after Banner) */}
      <TrustBadges />

      {/* 4. Airports List Section */}
      <AirportsServed />

      {/* 5. Our Services Section */}
      <OurServices />

      {/* 6. Why Choose Us Section */}
      <WhyChooseUs />

      {/* 7. Service Area & Traveling Soon Section */}
      <ServiceAreaSection servingAreas={servingAreas} />

      {/* 8. Reserve My Ride CTA Banner */}
      <ReserveRideBanner businessPhone={businessPhone} businessEmail={businessEmail} />

      {/* 9. FAQ Section */}
      <FAQSection />

      {/* 10. Bottom Copyright & Contact Info Footer */}
      <WebsiteFooter
        businessName={businessName}
        businessPhone={businessPhone}
        businessEmail={businessEmail}
        logoUrl={business?.logoUrl}
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
