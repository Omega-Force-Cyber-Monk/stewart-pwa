import { Plane } from "lucide-react";

export function AirportsServed() {
  const airportsList = [
    { code: "RSW", name: "Southwest Florida", desc: "International" },
    { code: "PGD", name: "Punta Gorda", desc: "Airport" },
    { code: "FLL", name: "Fort Lauderdale", desc: "International" },
    { code: "MIA", name: "Miami", desc: "International" }
  ];

  return (
    <section className="bg-white text-slate-900 py-16 px-6 border-t border-slate-100">
      <div className="container w-full">
        {/* Header Title with decorative green lines */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="w-8 h-0.5 bg-green-500 rounded-full"></div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-wide text-slate-800 uppercase">
            Airports We Serve
          </h2>
          <div className="w-8 h-0.5 bg-green-500 rounded-full"></div>
        </div>

        {/* Grid of Airport Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {airportsList.map((ap) => (
            <div 
              key={ap.code}
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
      </div>
    </section>
  );
}
