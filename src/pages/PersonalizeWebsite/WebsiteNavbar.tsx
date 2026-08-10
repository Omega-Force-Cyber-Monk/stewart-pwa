import { Phone, Car } from "lucide-react";

interface WebsiteNavbarProps {
  businessName: string;
  businessPhone: string;
  logoUrl?: string | null;
}

export function WebsiteNavbar({ businessName, businessPhone, logoUrl }: WebsiteNavbarProps) {
  return (
    <header className="border-b border-white/5 bg-black/45 backdrop-blur-md sticky top-0 z-40">
      <div className="container py-4 flex items-center justify-between">
        
        {/* Brand/Logo Section matching Naples screenshot */}
        <div className="flex items-center gap-3">
          {logoUrl ? (
            <img src={logoUrl} alt={businessName} className="h-10 object-contain" />
          ) : (
            <Car className="w-10 h-10 text-white shrink-0" />
          )}
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-extrabold tracking-wider text-white leading-none uppercase">
              {businessName}
            </span>
            <span className="text-xs text-green-500 font-bold tracking-widest mt-1 block uppercase">
              AIRPORT TRANSPORTATION
            </span>
          </div>
        </div>

        {/* Interactive Call Button matching Naples screenshot */}
        <a 
          href={`tel:${businessPhone}`}
          className="flex items-center gap-3 hover:opacity-85 transition-opacity"
        >
          <Phone className="w-8 h-8 text-green-500 shrink-0" />
          <div className="flex flex-col text-left">
            <span className="text-xs font-bold text-green-500 uppercase tracking-wide leading-none">
              Call Now
            </span>
            <span className="text-base font-bold text-white leading-none mt-1">
              {businessPhone}
            </span>
          </div>
        </a>

      </div>
    </header>
  );
}
