import { ChevronDown } from "lucide-react";
import { useState } from "react";

import type { FunnelTheme } from "../../features/funnel/funnelTypes";
import type { FaqTranslation } from "../../features/localization/localizationTypes";
import { cn } from "../../lib/cn";
import { PageContainer } from "../layout/PageContainer";

type FAQSectionProps = {
  categoryTitle: string;
  faqs: FaqTranslation[];
  subtitle: string;
  theme: FunnelTheme;
  title: string;
};

function splitTitle(title: string) {
  const words = title.trim().split(/\s+/);
  const lastWord = words.pop() ?? "";

  return {
    leading: words.join(" "),
    highlight: lastWord,
  };
}

export function FAQSection({ categoryTitle, faqs, subtitle, theme, title }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const titleParts = splitTitle(title);

  return (
    <section className="bg-[#F2F2F2] py-12 sm:py-16" id="faq">
      <PageContainer size="landing">
        <div className="grid gap-8 rounded-[24px] bg-white px-6 py-12 sm:px-10 lg:grid-cols-[0.78fr_1.22fr] lg:px-[112px] lg:py-[72px]">
          <div>
            <h2
              className="text-[32px] font-semibold capitalize leading-[38px] tracking-normal text-[#101010] sm:text-[40px] sm:leading-[46px]"
              style={{ fontFamily: "'DM Sans', ui-sans-serif, system-ui, sans-serif" }}
            >
              {titleParts.leading}
              <br />
              <span className="text-[#EE389C]">{titleParts.highlight}</span>
            </h2>
            <p className="mt-5 max-w-xs text-sm leading-5 text-[#101010]">
              {subtitle}
            </p>
          </div>

          <div className="w-full">
            <h3 className="mb-5 text-xl font-semibold leading-7 text-[#101010]">
              {categoryTitle}
            </h3>
            <div className="grid gap-4">
              {faqs.slice(0, 4).map((faq, index) => {
                const isOpen = openIndex === index;

                return (
                  <article
                    className="overflow-hidden rounded-lg border border-[#D9D9D9] bg-white transition-shadow hover:shadow-sm"
                    key={faq.question}
                  >
                    <button
                      aria-expanded={isOpen}
                      className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EE389C]"
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      type="button"
                    >
                      <span className="text-base font-normal leading-6 text-[#101010]">
                        {faq.question}
                      </span>
                      <ChevronDown
                        aria-hidden="true"
                        className={cn(
                          "size-4 shrink-0 transition",
                          theme.accentClassName,
                          isOpen && "rotate-180",
                        )}
                      />
                    </button>
                    {isOpen && (
                      <p className="px-5 pb-5 text-sm leading-6 text-[#666060]">
                        {faq.answer}
                      </p>
                    )}
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
