import { Plane } from "lucide-react";

interface AirportsServedProps {
  airports?: string[];
}

export function AirportsServed({ airports = [] }: AirportsServedProps) {
  // Real airports from the business service area only — no fabricated defaults.
  const airportList = airports
    .filter(Boolean)
    .map((name, index) => ({
      code: name.match(/^([A-Z]{3})\s*-\s*/)?.[1] ?? String(index + 1).padStart(3, "0"),
      name,
      desc: "",
    }));

  return (
    <section className="bg-white text-slate-900 py-3 px-6 border-t border-slate-100">
      <div className="container w-full">
        {/* Header Title with decorative green lines */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="w-8 h-0.5 bg-green-500 rounded-full"></div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-wide text-slate-800 uppercase">
            Airports We Serve
          </h2>
          <div className="w-8 h-0.5 bg-green-500 rounded-full"></div>
        </div>

        {airportList.length === 0 ? (
          <p className="text-center text-sm text-slate-400">
            Airport list coming soon.
          </p>
        ) : (
        /* Grid of Airport Cards */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {airportList.map((ap) => (
            <div 
              key={`${ap.code}-${ap.name}`}
              className="bg-white border border-slate-200/60 rounded-2xl p-6 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center gap-3.5 mb-4">
                <div className="w-12 h-12 rounded-full border border-green-500/25 flex items-center justify-center text-green-600 bg-green-50/30 shrink-0">
                  <Plane className="w-6 h-6 -rotate-45" />
                </div>
                <span className="text-3xl font-semibold text-slate-800 tracking-wider leading-none">{ap.code}</span>
              </div>
              <p className="text-sm sm:text-base font-semibold text-slate-500 leading-tight">
                {ap.name} <br /> {ap.desc}
              </p>
            </div>
          ))}
        </div>
        )}
      </div>
    </section>
  );
}
