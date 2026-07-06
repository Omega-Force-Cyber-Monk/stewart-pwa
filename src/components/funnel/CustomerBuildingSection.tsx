import { motion } from "motion/react";

import { PageContainer } from "../layout/PageContainer";
import cardFour from "../../assets/cardFour.svg";
import cardOne from "../../assets/cardOne.svg";
import cardThree from "../../assets/cardThree.svg";
import cardTwo from "../../assets/cardTwo.svg";
import { useTranslation } from "../../features/localization/useTranslation";

type FeatureCard = {
  image: string;
  imageFrameClassName: string;
};

const featureCards: FeatureCard[] = [
  {
    image: cardOne,
    imageFrameClassName: "aspect-[644/394]",
  },
  {
    image: cardTwo,
    imageFrameClassName: "aspect-[644/394]",
  },
  {
    image: cardThree,
    imageFrameClassName: "aspect-[644/380]",
  },
  {
    image: cardFour,
    imageFrameClassName: "aspect-[644/380]",
  },
];

export function CustomerBuildingSection() {
  const { t } = useTranslation();

  return (
    <section className="bg-[#F2F2F2] py-12 sm:py-16" id="whats-included">
      <PageContainer size="landing">
        <div className="rounded-[24px] bg-[linear-gradient(180deg,#FFF_0%,rgba(255,217,227,0.68)_50%,#F2F2F2_100%)] p-5 shadow-sm ring-1 ring-pink-100 sm:p-8 lg:py-10">
          <div className="text-center">
            <h2
              className="text-center text-[32px] font-semibold leading-[42px] tracking-normal text-[#101010]"
              style={{ fontFamily: "'DM Sans', ui-sans-serif, system-ui, sans-serif" }}
            >
              {t.funnelPage.customerBuilding.titlePrefix}{" "}
              <span className="text-pink-500">
                {t.funnelPage.customerBuilding.titleHighlight}
              </span>{" "}
              {t.funnelPage.customerBuilding.titleSuffix}
            </h2>
            <p
              className="mx-auto mt-3 max-w-xl text-center text-base font-normal leading-6 text-[#666060]"
              style={{ fontFamily: "'DM Sans', ui-sans-serif, system-ui, sans-serif" }}
            >
              {t.funnelPage.customerBuilding.subtitle}
            </p>
          </div>

          <div className="mt-14 grid gap-4 md:grid-cols-2">
            {featureCards.map((card, index) => {
              const copy = t.funnelPage.customerBuilding.cards[index];

              return (
              <motion.article
                className="rounded-xl bg-white p-3 shadow-sm ring-1 ring-pink-100 transition-shadow hover:shadow-md"
                initial={{ opacity: 0, y: 18 }}
                key={copy.title}
                transition={{ delay: index * 0.06, duration: 0.28, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.25 }}
                whileHover={{ y: -4 }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <div
                  className={`grid w-full place-items-center overflow-hidden rounded-lg bg-pink-50 ${card.imageFrameClassName}`}
                >
                  <img
                    alt={copy.imageAlt}
                    className="h-full w-full object-contain object-center"
                    src={card.image}
                  />
                </div>
                <div className="px-3 pb-4 pt-4 text-center">
                  <h3 className="text-lg font-black text-slate-950">{copy.title}</h3>
                  <p className="mx-auto mt-2 max-w-xs text-xs leading-5 text-slate-500">
                    {copy.description}
                  </p>
                </div>
              </motion.article>
              );
            })}
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
