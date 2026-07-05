import { motion } from "motion/react";

import { PageContainer } from "../layout/PageContainer";
import cardFour from "../../assets/cardFour.svg";
import cardOne from "../../assets/cardOne.svg";
import cardThree from "../../assets/cardThree.svg";
import cardTwo from "../../assets/cardTwo.svg";

type FeatureCard = {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  imageFrameClassName: string;
};

const featureCards: FeatureCard[] = [
  {
    title: "Quick Launch",
    description: "Launch your airport transportation business with proven systems.",
    image: cardOne,
    imageAlt: "Quick launch date selector illustration",
    imageFrameClassName: "aspect-[644/394]",
  },
  {
    title: "Customer Acquisition Center™",
    description: "Get tools, scripts, and marketing resources to attract and retain clients.",
    image: cardTwo,
    imageAlt: "Customer acquisition center illustration",
    imageFrameClassName: "aspect-[644/394]",
  },
  {
    title: "Personalized Starting Page™",
    description: "Show travelers why your business stands out and build trust immediately.",
    image: cardThree,
    imageAlt: "Personalized starting page tools illustration",
    imageFrameClassName: "aspect-[644/380]",
  },
  {
    title: "Repeat Rider Engine",
    description: "Encourage returning customers and increase long-term bookings.",
    image: cardFour,
    imageAlt: "Repeat rider engine flow illustration",
    imageFrameClassName: "aspect-[644/380]",
  },
];

export function CustomerBuildingSection() {
  return (
    <section className="bg-[#F2F2F2] py-12 sm:py-16" id="whats-included">
      <PageContainer size="lg">
        <div className="rounded-[24px] bg-[linear-gradient(180deg,#FFF_0%,rgba(255,217,227,0.68)_50%,#F2F2F2_100%)] p-5 shadow-sm ring-1 ring-pink-100 sm:p-8 lg:py-10">
          <div className="text-center">
            <h2
              className="text-center text-[32px] font-semibold leading-[42px] tracking-normal text-[#101010]"
              style={{ fontFamily: "'DM Sans', ui-sans-serif, system-ui, sans-serif" }}
            >
              Everything You Need to Start{" "}
              <span className="text-pink-500">Building Your Own</span>{" "}
              Customers
            </h2>
            <p
              className="mx-auto mt-3 max-w-xl text-center text-base font-normal leading-6 text-[#666060]"
              style={{ fontFamily: "'DM Sans', ui-sans-serif, system-ui, sans-serif" }}
            >
              Access the tools, systems, and support you need to attract clients, grow
              your brand, and build a successful airport transportation business.
            </p>
          </div>

          <div className="mt-14 grid gap-4 md:grid-cols-2">
            {featureCards.map((card, index) => (
              <motion.article
                className="rounded-xl bg-white p-3 shadow-sm ring-1 ring-pink-100 transition-shadow hover:shadow-md"
                initial={{ opacity: 0, y: 18 }}
                key={card.title}
                transition={{ delay: index * 0.06, duration: 0.28, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.25 }}
                whileHover={{ y: -4 }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <div
                  className={`grid w-full place-items-center overflow-hidden rounded-lg bg-pink-50 ${card.imageFrameClassName}`}
                >
                  <img
                    alt={card.imageAlt}
                    className="h-full w-full object-contain object-center"
                    src={card.image}
                  />
                </div>
                <div className="px-3 pb-4 pt-4 text-center">
                  <h3 className="text-lg font-black text-slate-950">{card.title}</h3>
                  <p className="mx-auto mt-2 max-w-xs text-xs leading-5 text-slate-500">
                    {card.description}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
