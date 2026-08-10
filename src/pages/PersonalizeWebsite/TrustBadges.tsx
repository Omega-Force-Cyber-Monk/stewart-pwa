import { ShieldCheck, Users, Plane, DollarSign, Calendar } from "lucide-react";

export function TrustBadges() {
  const items = [
    {
      icon: <ShieldCheck className="w-8 h-8 text-green-500 shrink-0 stroke-[1.5]" />,
      t1: "Private",
      t2: "Transportation",
    },
    {
      icon: <Users className="w-8 h-8 text-green-500 shrink-0 stroke-[1.5]" />,
      t1: "Professional",
      t2: "Drivers",
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-green-500 shrink-0 stroke-[1.5]" />,
      t1: "Background",
      t2: "Checked",
    },
    {
      icon: <Plane className="w-8 h-8 text-green-500 shrink-0 stroke-[1.5] -rotate-45" />,
      t1: "Airport",
      t2: "Specialists",
    },
    {
      icon: <DollarSign className="w-8 h-8 text-green-500 shrink-0 stroke-[1.5]" />,
      t1: "Flat Rate",
      t2: "Pricing",
    },
    {
      icon: <Calendar className="w-8 h-8 text-green-500 shrink-0 stroke-[1.5]" />,
      t1: "Easy",
      t2: "Booking",
    },
  ];

  return (
    <section className="bg-gradient-to-b from-[#141517] to-[#0b0c0d] border-y border-white/5 py-5 px-6">
      <div className="container flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-white/10">
        {items.map((item, idx) => (
          <div
            key={idx}
            className={`flex items-center gap-3.5 ${idx > 0 ? "pt-4 md:pt-0 md:pl-4 lg:pl-6" : ""} flex-1 justify-center md:justify-start`}
          >
            {item.icon}
            <div className="flex flex-col text-left leading-tight">
              <span className="text-sm font-semibold text-white tracking-wide">{item.t1}</span>
              <span className="text-sm font-semibold text-white tracking-wide">{item.t2}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
