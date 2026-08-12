import { MapPin, XCircle, CheckCircle2, Plane } from "lucide-react";

interface ServiceAreaSectionProps {
  servingAreas?: string[];
}

const worries = [
  "Will the driver show up?",
  "Will price change?",
  "Will vehicle be clean?",
  "Will I make my flight?",
];

const fixes = [
  "Confirmed bookings",
  "Flat pricing",
  "Professional service",
  "Airport specialists",
];

export function ServiceAreaSection({ servingAreas }: ServiceAreaSectionProps) {
  // Real service-area data only; never render fabricated default locations.
  const areas = servingAreas ?? [];

  return (
    <section className="w-full bg-white border-t border-slate-100 py-3">
      <div className="container">
        <div className="flex flex-col lg:flex-row gap-0 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">

          {/* ── Left: Our Service Area ── */}
          <div className="flex-1 pr-0 lg:pr-10 pb-10 lg:pb-0">

            {/* Section title */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-0.5 bg-green-500 rounded-full"></div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">
                Our Service Area
              </h2>
              <div className="w-8 h-0.5 bg-green-500 rounded-full"></div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 items-start">

              {/* Cities list — real data only */}
              <ul className="flex flex-col gap-3.5 shrink-0 min-w-40">
                {areas.length === 0 ? (
                  <li className="text-sm text-slate-400">Service area not published yet.</li>
                ) : (
                  areas.map((area, idx) => (
                    <li key={idx} className="flex items-center gap-2.5">
                      <MapPin className="w-5 h-5 text-green-500 shrink-0" />
                      <span className="text-base font-semibold text-slate-700">{area}</span>
                    </li>
                  ))
                )}
              </ul>

              {/* Embedded map — rendered only when the business has a real service area */}
              {areas.length > 0 && (
                <div className="flex-1 w-full rounded-xl overflow-hidden border border-slate-200 shadow-sm min-h-52">
                  <iframe
                    title="Service Area Map"
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(areas[0])}&z=9&output=embed`}
                    width="100%"
                    height="100%"
                    className="min-h-52 w-full border-0"
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              )}

            </div>
          </div>

          {/* ── Right: Traveling Soon? ── */}
          <div className="flex-1 pl-0 lg:pl-10 pt-10 lg:pt-0">

            {/* Section title row with plane icon */}
            <div className="flex items-start justify-between mb-6 gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight mb-1">
                  Traveling Soon?
                </h2>
                <p className="text-base text-slate-500">Most travelers worry:</p>
              </div>
              <Plane className="w-14 h-14 text-slate-200 shrink-0 -rotate-12 mt-1" />
            </div>

            {/* Two-column: worries vs fixes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">

              {/* Worries column */}
              <ul className="flex flex-col gap-3.5">
                {worries.map((worry, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <span className="text-base text-slate-700">{worry}</span>
                  </li>
                ))}
              </ul>

              {/* Fixes column */}
              <div className="flex flex-col gap-3.5">
                <span className="text-base font-bold text-green-600 uppercase tracking-wide">
                  We Fix That:
                </span>
                <ul className="flex flex-col gap-3.5">
                  {fixes.map((fix, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                      <span className="text-base text-slate-700">{fix}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
