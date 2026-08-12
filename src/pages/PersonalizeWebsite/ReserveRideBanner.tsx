import { ChevronRight, Phone, Mail, Clock, CalendarCheck } from "lucide-react";

interface ReserveRideBannerProps {
  businessPhone: string;
  businessEmail: string;
  bookingUrl?: string | null;
}

export function ReserveRideBanner({ businessPhone, businessEmail, bookingUrl }: ReserveRideBannerProps) {
  return (
    <section className="w-full bg-[#f8fafc] py-3 px-4 sm:px-6">
      <div className="container">
        <div className="bg-[#121416] rounded-2xl px-6 sm:px-12 py-8 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl">

          {/* Left Column: Headline and subheadline */}
          <div className="flex flex-col gap-1 text-center lg:text-left w-full lg:w-auto">
            <h3 className="text-xl sm:text-3xl font-bold text-white leading-tight">
              Ready For Stress Free <br className="hidden sm:block" />
              Airport Transportation?
            </h3>
            <p className="text-sm text-slate-400 mt-1">Book now in less than 2 minutes.</p>
          </div>

          <div className="w-full lg:w-auto flex flex-col items-center gap-3">
            <a
              href={bookingUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-[#4bae4f] hover:bg-[#439e47] text-white text-2xl font-bold uppercase px-8 py-4 rounded-xl transition-all flex items-center justify-center gap-3 whitespace-nowrap shadow-lg cursor-pointer"
            >
              <CalendarCheck className="w-6 h-6" />
              <span className="text-2xl font-semibold">BOOK NOW</span>
              <ChevronRight className="w-5 h-5 stroke-[3] shrink-0" />
            </a>
          </div>

          {/* Right Column: Contact details */}
          <div className="flex flex-col gap-3.5 w-full lg:w-auto">
            <a
              href={`tel:${businessPhone}`}
              className="flex items-center gap-3 text-base font-semibold text-white hover:text-green-400 transition-colors justify-center lg:justify-start"
            >
              <Phone className="w-5 h-5 text-green-500 fill-green-500 shrink-0" />
              <span>{businessPhone}</span>
            </a>
            <a
              href={`mailto:${businessEmail}`}
              className="flex items-center gap-3 text-base font-semibold text-white hover:text-green-400 transition-colors justify-center lg:justify-start"
            >
              <Mail className="w-5 h-5 text-green-500 shrink-0" />
              <span>{businessEmail}</span>
            </a>
            <div className="flex items-center gap-3 text-base font-semibold text-white justify-center lg:justify-start">
              <Clock className="w-5 h-5 text-green-500 shrink-0" />
              <span>Mon - Sun &nbsp;|&nbsp; 4:00 AM - 11:00 PM</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

