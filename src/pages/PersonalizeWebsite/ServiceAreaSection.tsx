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

const defaultAreas = [
  "Naples",
  "Marco Island",
  "Bonita Springs",
  "Estero",
  "North Naples",
  "South Naples",
];

export function ServiceAreaSection({ servingAreas }: ServiceAreaSectionProps) {
  const areas = servingAreas && servingAreas.length > 0 ? servingAreas : defaultAreas;

  return (
    <section className="w-full bg-white border-t border-slate-100 py-20">
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

              {/* Cities list */}
              <ul className="flex flex-col gap-3.5 shrink-0 min-w-40">
                {areas.map((area, idx) => (
                  <li key={idx} className="flex items-center gap-2.5">
                    <MapPin className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-base font-semibold text-slate-700">{area}</span>
                  </li>
                ))}
              </ul>

              {/* Embedded map */}
              <div className="flex-1 w-full rounded-xl overflow-hidden border border-slate-200 shadow-sm min-h-52">
                <iframe
                  title="Service Area Map"
                  src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d112065.41869374624!2d-81.7953!3d26.142!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1691234567890!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  className="min-h-52 w-full border-0"
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

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
