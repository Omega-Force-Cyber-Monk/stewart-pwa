import { cn } from "../../lib/cn";

interface PaymentBadgesProps {
  className?: string;
  justify?: "center" | "start" | "end";
}

export function PaymentBadges({ className, justify = "center" }: PaymentBadgesProps) {
  const justifyClass = 
    justify === "start" ? "justify-start" : 
    justify === "end" ? "justify-end lg:justify-end" : 
    "justify-center lg:justify-end"; // default mimics CouplePage behavior

  const alignClass = 
    justify === "start" ? "items-start" : 
    justify === "end" ? "items-end" : 
    "items-center lg:items-end";

  return (
    <div className={cn(`flex flex-col w-full gap-2 mt-4`, alignClass, className)}>
      <div className={cn("flex gap-2 flex-wrap", justify === "center" ? "justify-center lg:justify-end" : justifyClass)}>
        <div className="bg-white px-2 py-1 rounded text-[#1a1f71] font-bold text-xs italic tracking-tighter border border-slate-300">
          VISA
        </div>
        <div className="bg-white px-2 py-1 rounded flex items-center justify-center border border-slate-300">
          <div className="w-3 h-3 rounded-full bg-[#eb001b] -mr-1 opacity-90 mix-blend-multiply"></div>
          <div className="w-3 h-3 rounded-full bg-[#f79e1b] opacity-90 mix-blend-multiply"></div>
        </div>
        <div className="bg-[#2e77bc] px-2 py-1 rounded text-white font-bold text-xs border border-slate-300">
          AMEX
        </div>
        <div className="bg-white px-2 py-1 rounded text-[#f68121] font-bold text-xs border border-slate-300">
          DISCOVER
        </div>
      </div>
      <div className="text-slate-400 text-[11px] flex items-center gap-1.5 font-medium mt-1">
        Secure payment processed by{" "}
        <span className="bg-[#635bff] px-1.5 py-0.5 rounded text-white font-bold text-[10px]">
          stripe
        </span>
      </div>
    </div>
  );
}
