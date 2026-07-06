import { motion } from "motion/react";

import rectangle93 from "../../assets/Rectangle 93.png";
import rectangle94 from "../../assets/Rectangle 94.png";
import rectangle95 from "../../assets/Rectangle 95.png";
import rectangle96 from "../../assets/Rectangle 96.png";
import { useTranslation } from "../../features/localization/useTranslation";
import { PageContainer } from "../layout/PageContainer";

const operatorImages = [
  { className: "rounded-tl-[64px] object-cover object-center", src: rectangle93 },
  { className: "rounded-tr-[64px] object-cover object-right", src: rectangle94 },
  { className: "rounded-bl-[64px] object-cover object-left", src: rectangle95 },
  { className: "rounded-br-[64px] object-cover object-center", src: rectangle96 },
];

const winReasons = [
  {
    className: "border-l-[#101010] lg:translate-x-0",
  },
  {
    className: "border-l-pink-500 lg:translate-x-6",
  },
  {
    className: "border-l-[#101010] lg:translate-x-12",
  },
];

const tagRows = [
  [
    { className: "sm:-rotate-[22deg]" },
    { className: "sm:rotate-[6deg]" },
    { className: "sm:-rotate-[14deg]" },
  ],
  [
    { className: "sm:rotate-[1deg]" },
    { className: "sm:rotate-[0deg]" },
    { className: "sm:rotate-[0deg]" },
  ],
];

export function WomenOperatorsSection() {
  const { t } = useTranslation();

  return (
    <section className="bg-[#F2F2F2] py-12 sm:py-16">
      <PageContainer size="landing">
        <div className="grid items-stretch gap-10 lg:min-h-[620px] lg:grid-cols-[1.08fr_0.92fr] lg:gap-14">
          <motion.div
            className="mx-auto grid w-full max-w-[680px] grid-cols-2 gap-3 sm:gap-4 lg:h-full lg:max-w-none lg:grid-rows-2"
            initial={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.25 }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            {operatorImages.map((image, index) => (
              <img
                alt={t.funnelPage.womenOperators.imageAlts[index]}
                className={`aspect-[402/368] h-full min-h-[150px] w-full shadow-sm sm:min-h-[210px] md:min-h-[240px] lg:aspect-auto lg:min-h-0 ${image.className}`}
                key={image.src}
                src={image.src}
              />
            ))}
          </motion.div>

          <motion.div
            className="mx-auto flex h-full w-full max-w-[680px] flex-col justify-between gap-6 text-center lg:mx-0 lg:min-h-[620px] lg:max-w-none lg:text-left"
            initial={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.25 }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            <div>
              <h2
                className="text-[28px] font-semibold leading-[36px] tracking-normal text-[#101010] sm:text-[32px] sm:leading-[42px]"
                style={{ fontFamily: "'DM Sans', ui-sans-serif, system-ui, sans-serif" }}
              >
                {t.funnelPage.womenOperators.titlePrefix}{" "}
                <span className="text-pink-500">
                  {t.funnelPage.womenOperators.titleHighlight}
                </span>
              </h2>
              <p
                className="mx-auto mt-3 max-w-xl text-base font-normal leading-6 text-[#666060] lg:mx-0"
                style={{ fontFamily: "'DM Sans', ui-sans-serif, system-ui, sans-serif" }}
              >
                {t.funnelPage.womenOperators.subtitle}
              </p>
            </div>

            <div className="grid gap-4">
              {winReasons.map((reason, index) => {
                const copy = t.funnelPage.womenOperators.reasons[index];

                return (
                <article
                  className={`mx-auto w-full max-w-xl rounded-sm border-l-2 bg-white px-5 py-5 text-left shadow-sm sm:px-6 lg:mx-0 ${reason.className}`}
                  key={copy.title}
                >
                  <h3 className="text-xl font-semibold text-[#101010]">{copy.title}</h3>
                  <p className="mt-2 text-base leading-6 text-[#666060]">{copy.description}</p>
                </article>
                );
              })}
            </div>

            <div className="mx-auto grid max-w-xl gap-3 lg:mx-0">
              {tagRows.map((row, rowIndex) => (
                <div
                  className="flex flex-wrap items-center justify-center gap-x-3 gap-y-3 lg:flex-nowrap lg:justify-start"
                  key={rowIndex}
                >
                  {row.map((tag, tagIndex) => (
                    <span
                      className={`inline-flex whitespace-nowrap rounded-full border border-pink-300 bg-pink-50 px-3 py-1.5 text-[11px] font-semibold leading-none text-pink-500 sm:text-xs lg:px-3.5 ${tag.className}`}
                      key={t.funnelPage.womenOperators.tagRows[rowIndex][tagIndex]}
                    >
                      {t.funnelPage.womenOperators.tagRows[rowIndex][tagIndex]}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </PageContainer>
    </section>
  );
}
