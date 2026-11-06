import { LanguageSelector, useLanguage } from "../../i18n/LanguageProvider";
import { Phone, Car } from "lucide-react";

interface WebsiteNavbarProps {
  businessName: string;
  businessPhone: string;
  logoUrl?: string | null;
}

export function WebsiteNavbar({ businessName, businessPhone, logoUrl }: WebsiteNavbarProps) {
  const { t } = useLanguage();
  return (
    <header className="border-b border-white/5 bg-black/45 backdrop-blur-md sticky top-0 z-40">
      <div className="container flex min-w-0 flex-wrap items-center justify-between gap-x-4 gap-y-3 py-4">
        
        {/* Brand/Logo Section matching Naples screenshot */}
        <div className="flex min-w-0 max-w-full flex-1 basis-full items-center gap-3 sm:basis-auto">
          {logoUrl ? (
            <img src={logoUrl} alt={businessName} className="h-10 max-w-16 shrink-0 object-contain sm:max-w-24" />
          ) : (
            <Car className="w-10 h-10 text-white shrink-0" />
          )}
          <div className="flex min-w-0 flex-col">
            <span className="break-words text-base sm:text-2xl font-extrabold tracking-wide text-white leading-tight uppercase">
              {businessName}
            </span>
            <span className="text-[10px] sm:text-xs text-green-500 font-bold tracking-wide mt-1 block uppercase">
              {t("AIRPORT TRANSPORTATION")}</span>
          </div>
        </div>

        {/* Interactive Call Button matching Naples screenshot */}
        <a 
          href={`tel:${businessPhone}`}
          className="flex max-w-full shrink-0 items-center gap-2 hover:opacity-85 transition-opacity"
        >
          <Phone className="h-5 w-5 sm:h-8 sm:w-8 text-green-500 shrink-0" />
          <div className="flex flex-col text-left">
            <span className="text-xs font-bold text-green-500 uppercase tracking-wide leading-none">
              {t("Call Now")}</span>
            <span className="whitespace-nowrap text-sm sm:text-base font-bold text-white leading-none mt-1">
              {businessPhone}
            </span>
          </div>
        </a>
        <LanguageSelector />

      </div>
    </header>
  );
}
