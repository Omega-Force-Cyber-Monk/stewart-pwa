import { MapPin, ChevronRight, Phone } from "lucide-react";
import personalizeBanner from "../../assets/personalizeBanner.png";

interface HeroSectionProps {
  businessName: string;
  businessPhone: string;
  businessInfo: string;
  servingAreas: string[];
  bookingFormChild: React.ReactNode;
}

export function HeroSection({
  businessName,
  businessPhone,
  businessInfo,
  servingAreas,
  bookingFormChild,
}: HeroSectionProps) {
  return (
    <div 
      className="flex-1 w-full bg-cover bg-center flex items-center justify-center py-12 px-6 relative"
      style={{ backgroundImage: `url(${personalizeBanner})` }}
    >
      {/* Dark Overlay for readability and premium contrast */}
      <div className="absolute inset-0 bg-black/75 lg:bg-black/50 z-0"></div>

      <div className="relative z-10 container w-full flex flex-col lg:flex-row items-center justify-between gap-12">
        
        {/* Left Column: Recreated Brand Details with HTML & Interactive Controls */}
        <div className="flex-1 lg:max-w-xl text-left flex flex-col gap-6 z-10">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight text-white">
              Premium Private <br />
              <span className="text-green-500 font-black uppercase">{businessName}</span> <br />
              <span className="italic font-medium text-slate-200 text-2xl sm:text-3xl tracking-wide block mt-1">
                On Time. Every Time.
              </span>
            </h1>
          </div>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-lg">
            {businessInfo}
          </p>

          <div className="flex flex-col gap-3">
            <div className="text-sm font-bold text-green-500 uppercase tracking-wider">
              Serving:
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
              {servingAreas.map((area, idx) => (
                <div key={idx} className="flex items-center gap-2.5">
                  <MapPin className="w-5 h-5 text-green-500 shrink-0" />
                  <span className="text-sm sm:text-base font-semibold text-slate-200 truncate">
                    {area}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full max-w-md">
            <button 
              type="button"
              onClick={() => {
                const formElement = document.getElementById("booking-card");
                if (formElement) {
                  formElement.scrollIntoView({ behavior: "smooth" });
                  const firstInput = formElement.querySelector("input");
                  if (firstInput) firstInput.focus();
                }
              }}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3.5 px-6 rounded-xl text-sm font-bold transition-all shadow-md flex items-center justify-center gap-2 tracking-wide whitespace-nowrap"
            >
              <span>BOOK YOUR RIDE NOW</span>
              <ChevronRight className="w-4 h-4 shrink-0" />
            </button>
            <a 
              href={`tel:${businessPhone}`}
              className="flex-1 bg-black hover:bg-white/5 border border-white/30 text-white py-3.5 px-6 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2.5 tracking-wide whitespace-nowrap text-center"
            >
              <Phone className="w-4 h-4 text-white fill-white shrink-0" />
              <span>Call Now</span>
            </a>
          </div>
        </div>

        {/* Right Column: Embedded booking form */}
        <div className="w-full max-w-md shrink-0 z-10">
          {bookingFormChild}
        </div>

      </div>
    </div>
  );
}
