import { MapPin, ChevronRight, Phone } from "lucide-react";
import personalizeBanner from "../../assets/personalizeBanner.png";

interface HeroSectionProps {
  businessName: string;
  businessPhone: string;
  businessInfo: string;
  servingAreas: string[];
  bookingUrl: string | null;
  logoUrl?: string | null;
}

export function HeroSection({
  businessName,
  businessPhone,
  businessInfo,
  servingAreas,
  bookingUrl,
  logoUrl,
}: HeroSectionProps) {
  return (
    <div 
      className="flex-1 w-full bg-cover bg-center flex items-center justify-center py-12 px-6 relative"
      style={{ backgroundImage: `url(${personalizeBanner})` }}
    >
      {/* Dark Overlay for readability and premium contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/80 to-transparent z-0"></div>

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
            <a 
              href={bookingUrl || "#"}
              target="_blank"
              rel="noreferrer"
              className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3.5 px-6 rounded-xl text-sm font-bold transition-all shadow-md flex items-center justify-center gap-2 tracking-wide whitespace-nowrap"
            >
              <span>BOOK YOUR RIDE NOW</span>
              <ChevronRight className="w-4 h-4 shrink-0" />
            </a>
            <a 
              href={`tel:${businessPhone}`}
              className="flex-1 bg-black hover:bg-white/5 border border-white/30 text-white py-3.5 px-6 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2.5 tracking-wide whitespace-nowrap text-center"
            >
              <Phone className="w-4 h-4 text-white fill-white shrink-0" />
              <span>Call Now</span>
            </a>
          </div>
        </div>

        {/* Right Column: Embedded phone mockup & Rating Card */}
        <div className="w-full max-w-md shrink-0 z-10 relative mt-16 lg:mt-0 flex justify-end pl-8 sm:pl-0">
          
          {/* Floating 5-star rating card (Horizontal, overlapping left side of rotated phone) */}
          <div className="absolute -left-8 sm:-left-24 top-1/2 -translate-y-1/2 bg-[#0f0f10]/95 backdrop-blur-md border border-[#22c55e]/40 rounded-2xl p-5 shadow-2xl z-30 w-[240px]">
            <div className="flex items-center gap-1.5 mb-5">
              {[1, 2, 3, 4, 5].map((i) => (
                <svg key={i} className="w-6 h-6 text-yellow-400 fill-yellow-400" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <div className="flex flex-col gap-3.5">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-[#22c55e] flex items-center justify-center shrink-0">
                  <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                </div>
                <span className="text-[13px] font-bold text-slate-200">Rated Service</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-[#22c55e] flex items-center justify-center shrink-0">
                  <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                </div>
                <span className="text-[13px] font-bold text-slate-200">English Speaking Drivers</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-[#22c55e] flex items-center justify-center shrink-0">
                  <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                </div>
                <span className="text-[13px] font-bold text-slate-200">Flat Rate Pricing</span>
              </div>
            </div>
          </div>

          {/* Phone Mockup Frame (Rotated to match design) */}
          <div className="relative w-full max-w-[320px] bg-white rounded-[3rem] border-[12px] border-[#1e1e1e] shadow-2xl overflow-hidden min-h-[580px] flex flex-col rotate-[8deg] transform-gpu z-20 origin-bottom-left">
            {/* iPhone Notch */}
            <div className="absolute top-0 inset-x-0 h-7 bg-[#1e1e1e] rounded-b-3xl w-40 mx-auto z-20"></div>
            
            {/* Content Container: Static Booking Form Graphic */}
            <div className="flex-1 overflow-y-auto pt-10 pb-6 px-5 [&::-webkit-scrollbar]:hidden bg-white flex flex-col pointer-events-none select-none">
              <h3 className="text-xl font-bold text-[#1e1e1e] mb-5 text-center tracking-tight">
                Book Your Ride
              </h3>
              
              <div className="flex flex-col gap-4 text-left">
                {/* Pickup Location */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Pickup Location</label>
                  <div className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 flex items-center justify-between">
                    <span>Naples, FL</span>
                    <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>

                {/* Drop-off */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Drop-off</label>
                  <div className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700">
                    RSW Airport
                  </div>
                </div>

                {/* Date & Time Row */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Date</label>
                    <div className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700">
                      May 24, 2024
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Time</label>
                    <div className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700">
                      10:00 AM
                    </div>
                  </div>
                </div>

                {/* Passenger */}
                <div className="flex flex-col gap-1.5 mb-2">
                  <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Passenger</label>
                  <div className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 flex items-center justify-between">
                    <span>1</span>
                    <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>

                {/* Continue to Book Button */}
                <div className="w-full bg-[#5fa64a] text-white py-3.5 rounded-xl text-sm font-bold tracking-wide uppercase text-center shadow-md shadow-green-500/20">
                  CONTINUE TO BOOK
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
