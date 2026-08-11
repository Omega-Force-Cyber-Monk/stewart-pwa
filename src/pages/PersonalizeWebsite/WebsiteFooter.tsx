import { Car, Phone, Mail } from "lucide-react";
import { FaFacebookF, FaGoogle, FaInstagram } from "react-icons/fa";

interface WebsiteFooterProps {
  businessName: string;
  businessPhone: string;
  businessEmail: string;
  logoUrl?: string | null;
  serviceAreas?: string[];
  airports?: string[];
}

export function WebsiteFooter({ businessName, businessPhone, businessEmail, logoUrl, serviceAreas = [], airports = [] }: WebsiteFooterProps) {
  // Real data only — never render fabricated brand/location text.
  const nameParts = businessName.split(" ");
  const firstWord = nameParts[0] ?? "";
  const restOfName = nameParts.slice(1).join(" ");

  const handleScrollToBooking = () => {
    const formElement = document.getElementById("booking-card");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
      const firstInput = formElement.querySelector("input");
      if (firstInput) firstInput.focus();
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-[#0b0c0d] border-t border-white/10 text-slate-400 pt-16">
      <div className="container px-6">

        {/* Main Footer Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12">

          {/* Column 1: Brand / Logo info (span 4) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="flex items-center gap-3">
              {logoUrl ? (
                <img
                  src={logoUrl}
                  alt={businessName}
                  className="h-10 w-auto object-contain brightness-0 invert"
                />
              ) : (
                <div className="flex items-center gap-2">
                  <Car className="w-10 h-10 text-white shrink-0" />
                  <div className="leading-tight text-left">
                    {firstWord ? (
                      <>
                        <span className="text-xl font-bold tracking-wider text-white block uppercase">{firstWord}</span>
                        <span className="text-xs text-slate-400 tracking-wide block uppercase">{restOfName}</span>
                      </>
                    ) : (
                      <span className="text-xl font-bold tracking-wider text-white block uppercase">My Business</span>
                    )}
                  </div>
                </div>
              )}
            </div>

            <p className="text-white text-base font-normal tracking-wide">
              On Time. Every Time.
            </p>

            {/* Circular Social Icons */}
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black hover:bg-slate-200 transition-colors"
                aria-label="Facebook"
              >
                <FaFacebookF />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black hover:bg-slate-200 transition-colors"
                aria-label="Google Reviews"
              >
                <FaGoogle />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black hover:bg-slate-200 transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
            </div>
          </div>

          {/* Column 2: Service Areas (span 2) */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Service Areas
            </span>
            <ul className="flex flex-col gap-2.5 text-sm">
              {serviceAreas.length === 0 ? (
                <li className="text-slate-600">—</li>
              ) : (
                serviceAreas.map((area) => (
                  <li key={area} className="hover:text-white transition-colors">{area}</li>
                ))
              )}
            </ul>
          </div>

          {/* Column 3: Airports (span 2) */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Airports
            </span>
            <ul className="flex flex-col gap-2.5 text-sm">
              {airports.length === 0 ? (
                <li className="text-slate-600">—</li>
              ) : (
                airports.map((airport) => (
                  <li key={airport} className="hover:text-white transition-colors">{airport}</li>
                ))
              )}
            </ul>
          </div>

          {/* Column 4: Company (span 2) */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Company
            </span>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Reviews</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Column 5: Call to Action (span 2) */}
          <div className="lg:col-span-2 flex flex-col gap-5 items-start">
            <button
              onClick={handleScrollToBooking}
              className="bg-[#4bae4f] hover:bg-[#439e47] text-white text-xs font-bold tracking-wider uppercase px-4 py-3 rounded-lg transition-all whitespace-nowrap shadow-md"
            >
              BOOK YOUR RIDE NOW
            </button>

            <div className="flex flex-col gap-3">
              <a
                href={`tel:${businessPhone}`}
                className="flex items-center gap-2.5 text-sm text-white hover:text-green-400 transition-colors"
              >
                <Phone className="w-4 h-4 text-green-500 shrink-0" />
                <span>{businessPhone}</span>
              </a>
              <a
                href={`mailto:${businessEmail}`}
                className="flex items-center gap-2.5 text-sm text-white hover:text-green-400 transition-colors break-all"
              >
                <Mail className="w-4 h-4 text-green-500 shrink-0" />
                <span>{businessEmail}</span>
              </a>
            </div>
          </div>

        </div>

        {/* Separator line & Copyright bottom bar */}
        <div className="border-t border-white/10 py-8 text-center text-sm text-slate-500">
          <p>&copy; 2026 {businessName}. All Rights Reserved.</p>
        </div>

      </div>
    </footer>
  );
}

