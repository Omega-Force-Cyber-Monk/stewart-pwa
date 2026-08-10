import { ShieldCheck, Car, Users, DollarSign } from "lucide-react";
import rightImage from "../../assets/rightImage.jpg";

const reasons = [
  {
    icon: <ShieldCheck className="w-7 h-7 text-green-400 shrink-0 stroke-[1.5]" />,
    title: "Reliability First",
    desc: "We show up. No guessing. No rideshare uncertainty.",
  },
  {
    icon: <Car className="w-7 h-7 text-green-400 shrink-0 stroke-[1.5]" />,
    title: "Clean Comfortable Vehicles",
    desc: "Private rides only. No shared passengers.",
  },
  {
    icon: <Users className="w-7 h-7 text-green-400 shrink-0 stroke-[1.5]" />,
    title: "Professional Drivers",
    desc: "Experienced airport transportation specialists.",
  },
  {
    icon: <DollarSign className="w-7 h-7 text-green-400 shrink-0 stroke-[1.5]" />,
    title: "Flat Rates",
    desc: "Know your price before booking.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="w-full bg-white py-20">
      <div className="container bg-[#121416] rounded-2xl overflow-hidden">
        <div className="flex flex-col lg:flex-row min-h-[600px]">

          {/* Left: Dark content panel */}
          <div className="relative flex-1 flex flex-col justify-center pl-6 pr-8 sm:pl-20  py-20 gap-10">

            {/* Accent left border bar */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-500"></div>

            {/* Title */}
            <div className="flex flex-col gap-2 ">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Why Choose Us
              </h2>
              <div className="w-10 h-0.5 bg-green-500 rounded-full"></div>
            </div>

            {/* Reasons list */}
            <ul className="flex flex-col gap-6">
              {reasons.map((reason, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  {/* Icon circle */}
                  <div className="w-11 h-11 shrink-0 rounded-full border border-green-500/30 bg-green-500/10 flex items-center justify-center">
                    {reason.icon}
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-base font-bold text-white">{reason.title}</span>
                    <span className="text-sm text-slate-400 leading-snug">{reason.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Full-bleed photo */}
          <div
            className="lg:w-1/2 min-h-96 lg:min-h-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${rightImage})` }}
            aria-hidden="true"
          />

        </div>
      </div>
    </section>
  );
}

