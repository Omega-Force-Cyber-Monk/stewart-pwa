import { Plane, Clock, DollarSign, RefreshCw } from "lucide-react";

const faqs = [
  {
    icon: <Plane className="w-10 h-10 text-green-500 stroke-[1.5]" />,
    question: "Do you track flights?",
    answer: "Yes. Late arrivals automatically adjust.",
  },
  {
    icon: <Clock className="w-10 h-10 text-green-500 stroke-[1.5]" />,
    question: "Can I reserve early morning rides?",
    answer: "Absolutely. Airport pickups available for early departures.",
  },
  {
    icon: <DollarSign className="w-10 h-10 text-green-500 stroke-[1.5]" />,
    question: "Do prices surge?",
    answer: "No. Flat rate pricing. No surprises.",
  },
  {
    icon: <RefreshCw className="w-7 h-7 text-green-500 stroke-[1.5]" />,
    question: "Can I book round trip?",
    answer: "Yes. Round trips available.",
  },
];

export function FAQSection() {
  return (
    <section className="w-full bg-white border-t border-slate-100 py-3">
      <div className="container">

        {/* Section title with decorative green lines */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <div className="w-8 h-0.5 bg-green-500 rounded-full"></div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">
            Frequently Asked Questions
          </h2>
          <div className="w-8 h-0.5 bg-green-500 rounded-full"></div>
        </div>

        {/* FAQ cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-slate-50 border border-slate-200 rounded-xl p-6 flex gap-3 hover:shadow-md transition-shadow"
            >
              {/* Icon */}
              <div className="size-16 rounded-full border border-green-200 bg-green-50 flex items-center justify-center shrink-0">
                {faq.icon}
              </div>
              <div className="flex flex-col">
                {/* Question */}
                <span className="text-xl font-semibold text-slate-800 leading-snug">
                  {faq.question}
                </span>

                {/* Answer */}
                <span className="text-base text-slate-500 leading-relaxed">
                  {faq.answer}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
