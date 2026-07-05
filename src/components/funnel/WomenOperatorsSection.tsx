import { motion } from "motion/react";

import rectangle93 from "../../assets/Rectangle 93.png";
import rectangle94 from "../../assets/Rectangle 94.png";
import rectangle95 from "../../assets/Rectangle 95.png";
import rectangle96 from "../../assets/Rectangle 96.png";
import { PageContainer } from "../layout/PageContainer";

const operatorImages = [
  { alt: "Woman driver smiling from the front seat", className: "rounded-tl-[64px] object-cover object-center", src: rectangle93 },
  { alt: "Woman airport driver wearing a seat belt", className: "rounded-tr-[64px] object-cover object-right", src: rectangle94 },
  { alt: "Woman driving at night", className: "rounded-bl-[64px] object-cover object-left", src: rectangle95 },
  { alt: "Woman driver looking back from the driver's seat", className: "rounded-br-[64px] object-cover object-center", src: rectangle96 },
];

const winReasons = [
  {
    title: "Reliability",
    description: "Customers value dependable service and professionalism.",
    className: "border-l-[#101010] lg:translate-x-0",
  },
  {
    title: "Personal Safety",
    description: "Women travelers often prefer trusted women-operated transportation.",
    className: "border-l-pink-500 lg:translate-x-6",
  },
  {
    title: "Strong Demand",
    description: "A growing market seeks personalized airport transportation.",
    className: "border-l-[#101010] lg:translate-x-12",
  },
];

const tagRows = [
  [
    { className: "sm:-rotate-[22deg]", label: "Own your customer list" },
    { className: "sm:rotate-[6deg]", label: "Start your business in about 30 days" },
    { className: "sm:-rotate-[14deg]", label: "Build repeat clients" },
  ],
  [
    { className: "sm:rotate-[1deg]", label: "Keep more revenue" },
    { className: "sm:rotate-[0deg]", label: "Operate independently" },
    { className: "sm:rotate-[0deg]", label: "Create a brand customers trust" },
  ],
];

export function WomenOperatorsSection() {
  return (
    <section className="bg-[#F2F2F2] py-12 sm:py-16">
      <PageContainer size="lg">
        <div className="grid items-stretch gap-10 lg:min-h-[620px] lg:grid-cols-[1.08fr_0.92fr] lg:gap-14">
          <motion.div
            className="mx-auto grid w-full max-w-[680px] grid-cols-2 gap-3 sm:gap-4 lg:h-full lg:max-w-none lg:grid-rows-2"
            initial={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.25 }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            {operatorImages.map((image) => (
              <img
                alt={image.alt}
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
                Why Women Operators Can <span className="text-pink-500">Win</span>
              </h2>
              <p
                className="mx-auto mt-3 max-w-xl text-base font-normal leading-6 text-[#666060] lg:mx-0"
                style={{ fontFamily: "'DM Sans', ui-sans-serif, system-ui, sans-serif" }}
              >
                Women-led transportation businesses build stronger trust, deliver
                exceptional service, and create lasting customer relationships.
              </p>
            </div>

            <div className="grid gap-4">
              {winReasons.map((reason) => (
                <article
                  className={`mx-auto w-full max-w-xl rounded-sm border-l-2 bg-white px-5 py-5 text-left shadow-sm sm:px-6 lg:mx-0 ${reason.className}`}
                  key={reason.title}
                >
                  <h3 className="text-xl font-semibold text-[#101010]">{reason.title}</h3>
                  <p className="mt-2 text-base leading-6 text-[#666060]">{reason.description}</p>
                </article>
              ))}
            </div>

            <div className="mx-auto grid max-w-xl gap-3 lg:mx-0">
              {tagRows.map((row, rowIndex) => (
                <div
                  className="flex flex-wrap items-center justify-center gap-x-3 gap-y-3 lg:flex-nowrap lg:justify-start"
                  key={rowIndex}
                >
                  {row.map((tag) => (
                    <span
                      className={`inline-flex whitespace-nowrap rounded-full border border-pink-300 bg-pink-50 px-3 py-1.5 text-[11px] font-semibold leading-none text-pink-500 sm:text-xs lg:px-3.5 ${tag.className}`}
                      key={tag.label}
                    >
                      {tag.label}
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
