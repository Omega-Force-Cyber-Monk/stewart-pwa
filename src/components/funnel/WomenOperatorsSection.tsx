import { motion } from "motion/react";

import rectangle93 from "../../assets/Rectangle 93.png";
import rectangle94 from "../../assets/Rectangle 94.png";
import rectangle95 from "../../assets/Rectangle 95.png";
import rectangle96 from "../../assets/Rectangle 96.png";
import { PageContainer } from "../layout/PageContainer";

const operatorImages = [
  { alt: "Woman driver smiling from the front seat", className: "rounded-tl-[64px] object-cover", src: rectangle93 },
  { alt: "Woman airport driver wearing a seat belt", className: "rounded-tr-[64px] object-right", src: rectangle94 },
  { alt: "Woman driving at night", className: "rounded-bl-[64px] object-left", src: rectangle95 },
  { alt: "Woman driver looking back from the driver's seat", className: "rounded-br-[64px] object-cover", src: rectangle96 },
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

const tags = [
  "Own your customer list",
  "Start your business in about 30 days",
  "Build repeat clients",
  "Keep more revenue",
  "Operate independently",
  "Create a brand customers trust",
];

export function WomenOperatorsSection() {
  return (
    <section className="bg-[#F2F2F2] py-14 sm:py-16">
      <PageContainer className="px-0 sm:px-0 lg:px-0" size="lg">
        <div className="grid items-stretch gap-10 lg:min-h-[620px] lg:grid-cols-[1.08fr_0.92fr] lg:gap-14">
          <motion.div
            className="grid grid-cols-2 gap-4 lg:h-full lg:grid-rows-2"
            initial={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.25 }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            {operatorImages.map((image) => (
              <img
                alt={image.alt}
                className={`aspect-[402/368] h-full min-h-[180px] w-full object-center shadow-sm lg:aspect-auto lg:min-h-0 ${image.className}`}
                key={image.src}
                src={image.src}
              />
            ))}
          </motion.div>

          <motion.div
            className="flex h-full flex-col justify-between gap-6 lg:min-h-[620px]"
            initial={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.25 }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            <div>
              <h2
                className="text-[32px] font-semibold leading-[42px] tracking-normal text-[#101010]"
                style={{ fontFamily: "'DM Sans', ui-sans-serif, system-ui, sans-serif" }}
              >
                Why Women Operators Can <span className="text-pink-500">Win</span>
              </h2>
              <p
                className="mt-3 max-w-xl text-base font-normal leading-6 text-[#666060]"
                style={{ fontFamily: "'DM Sans', ui-sans-serif, system-ui, sans-serif" }}
              >
                Women-led transportation businesses build stronger trust, deliver
                exceptional service, and create lasting customer relationships.
              </p>
            </div>

            <div className="grid gap-4">
              {winReasons.map((reason) => (
                <article
                  className={`w-full max-w-xl rounded-sm border-l-2 bg-white px-6 py-5 shadow-sm ${reason.className}`}
                  key={reason.title}
                >
                  <h3 className="text-xl font-semibold text-[#101010]">{reason.title}</h3>
                  <p className="mt-2 text-base leading-6 text-[#666060]">{reason.description}</p>
                </article>
              ))}
            </div>

            <div className="flex max-w-xl flex-wrap gap-3">
              {tags.map((tag, index) => (
                <span
                  className="inline-flex rotate-[-8deg] rounded-full border border-pink-300 bg-pink-50 px-3 py-1 text-xs font-semibold text-pink-500"
                  key={tag}
                  style={{ transform: `rotate(${index % 2 === 0 ? -8 : 6}deg)` }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </PageContainer>
    </section>
  );
}
