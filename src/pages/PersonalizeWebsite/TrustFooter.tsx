import { ShieldCheck, Users, Compass, DollarSign, CalendarDays } from "lucide-react";

interface TrustFooterProps {
  businessName: string;
  businessEmail: string;
}

export function TrustFooter({ businessName, businessEmail }: TrustFooterProps) {
  return (
    <footer className="bg-black/90 border-t border-white/5 py-8">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-6 gap-6 sm:gap-8 items-center text-center">

        <div className="flex flex-col items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-green-400" />
          <span className="text-sm font-bold text-slate-300">Private Transportation</span>
        </div>

        <div className="flex flex-col items-center gap-2">
          <Users className="w-6 h-6 text-green-400" />
          <span className="text-sm font-bold text-slate-300">Professional Drivers</span>
        </div>

        <div className="flex flex-col items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-green-400" />
          <span className="text-sm font-bold text-slate-300">Background Checked</span>
        </div>

        <div className="flex flex-col items-center gap-2">
          <Compass className="w-6 h-6 text-green-400" />
          <span className="text-sm font-bold text-slate-300">Airport Specialists</span>
        </div>

        <div className="flex flex-col items-center gap-2">
          <DollarSign className="w-6 h-6 text-green-400" />
          <span className="text-sm font-bold text-slate-300">Flat Rate Pricing</span>
        </div>

        <div className="flex flex-col items-center gap-2">
          <CalendarDays className="w-6 h-6 text-green-400" />
          <span className="text-sm font-bold text-slate-300">Easy Booking</span>
        </div>

      </div>

      <div className="max-w-6xl mx-auto px-6 border-t border-white/5 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between text-sm text-slate-500 gap-4">
        <span>&copy; 2026 {businessName}. All rights reserved.</span>
        <div className="flex gap-4">
          <a href="#" className="hover:text-slate-500">Terms</a>
          <a href="#" className="hover:text-slate-500">Privacy</a>
          <span>Contact: {businessEmail}</span>
        </div>
      </div>
    </footer>
  );
}
