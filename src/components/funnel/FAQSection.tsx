import { ChevronDown } from "lucide-react";
import { useState } from "react";

import type { FunnelTheme } from "../../features/funnel/funnelTypes";
import type { FaqTranslation } from "../../features/localization/localizationTypes";
import { cn } from "../../lib/cn";

type FAQSectionProps = {
  faqs: FaqTranslation[];
  theme: FunnelTheme;
  title: string;
};

export function FAQSection({ faqs, theme, title }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="mx-auto max-w-4xl px-4 py-12">
      <h2 className="text-center text-3xl font-bold tracking-normal md:text-4xl">{title}</h2>
      <div className="mt-8 divide-y divide-slate-200 rounded-lg border border-slate-200 bg-white">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <article key={faq.question}>
              <button
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
                type="button"
              >
                <span className="font-bold text-slate-950">{faq.question}</span>
                <ChevronDown
                  aria-hidden="true"
                  className={cn("size-5 shrink-0 transition", theme.accentClassName, isOpen && "rotate-180")}
                />
              </button>
              {isOpen && <p className="px-5 pb-5 text-sm leading-6 text-slate-600">{faq.answer}</p>}
            </article>
          );
        })}
      </div>
    </section>
  );
}
