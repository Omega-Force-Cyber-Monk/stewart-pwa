import { Plane, Luggage, Repeat, Route, Check } from "lucide-react";
import firstCard from "../../assets/1st card.jpg";
import secondCard from "../../assets/2nd card.jpg";
import thirdCard from "../../assets/3rd card.jpg";
import fourthCard from "../../assets/4th card.jpg";

export function OurServices() {
  const services = [
    {
      image: firstCard,
      icon: <Plane className="w-5 h-5 -rotate-45 text-white" />,
      title: "Airport Pickup",
      points: [
        "Flight tracking",
        "Meet and greet",
        "Reliable arrival service"
      ]
    },
    {
      image: secondCard,
      icon: <Luggage className="w-5 h-5 text-white" />,
      title: "Airport Drop Off",
      points: [
        "Arrive on time",
        "No surge pricing",
        "Door to terminal service"
      ]
    },
    {
      image: thirdCard,
      icon: <Repeat className="w-5 h-5 text-white" />,
      title: "Round Trips",
      points: [
        "Vacation transportation",
        "Business travelers",
        "Snowbirds"
      ]
    },
    {
      image: fourthCard,
      icon: <Route className="w-5 h-5 text-white" />,
      title: "Long Distance Rides",
      points: [
        "Naples to Miami",
        "Naples to Fort Lauderdale",
        "Marco Island transfers"
      ]
    }
  ];

  return (
    <section className="bg-slate-50 text-slate-900 py-3 px-6 border-t border-slate-200">
      <div className="container w-full">

        {/* Header Title with decorative green lines */}
        <div className="flex items-center justify-center gap-4 mb-14">
          <div className="w-8 h-0.5 bg-green-500 rounded-full"></div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-wide text-slate-800 uppercase">
            Our Services
          </h2>
          <div className="w-8 h-0.5 bg-green-500 rounded-full"></div>
        </div>

        {/* Grid of Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((svc, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200/60 rounded-2xl pb-6 flex flex-col shadow-sm hover:shadow-md transition-all duration-300"
            >
              {/* Card Image and overlapping Badge */}
              <div className="relative mb-8 shrink-0">
                <img
                  src={svc.image}
                  alt={svc.title}
                  className="w-full h-40 object-cover rounded-t-2xl"
                />
                <div className="w-12 h-12 rounded-full bg-green-700 border-4 border-white flex items-center justify-center shadow-md absolute -bottom-6 left-1/2 -translate-x-1/2">
                  {svc.icon}
                </div>
              </div>

              {/* Title & Bullet Points */}
              <div className="flex-1 px-5 flex flex-col items-center text-center">
                <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-4 uppercase tracking-wide">
                  {svc.title}
                </h3>
                <ul className="flex flex-col gap-2.5 w-full items-start pl-3">
                  {svc.points.map((pt, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2.5 text-left">
                      <div className="w-4 h-4 rounded-full border border-green-500/35 flex items-center justify-center text-green-600 bg-green-50 shrink-0 mt-1">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span className="text-sm sm:text-base font-semibold text-slate-600 leading-tight">
                        {pt}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
