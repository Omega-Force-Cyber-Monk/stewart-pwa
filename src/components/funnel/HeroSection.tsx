import { ArrowRight } from "lucide-react";

import { Button } from "../common/Button";
import { PageContainer } from "../layout/PageContainer";
import bannerBg from "../../assets/bannerBg.png";
import bannerFive from "../../assets/bannerFive.png";
import bannerFour from "../../assets/bannerFour.png";
import bannerOne from "../../assets/bannerOne.png";
import bannerThree from "../../assets/bannerThree.png";
import bannerTwo from "../../assets/bannerTwo.png";
import type { FunnelConfig } from "../../features/funnel/funnelTypes";
import { useTranslation } from "../../features/localization/useTranslation";
import { cn } from "../../lib/cn";

type HeroSectionProps = {
  config: FunnelConfig;
  onPrimaryCta: () => void;
};

const bannerImages = [
  {
    className: "hidden lg:block h-[clamp(140px,15vw,190px)]",
    src: bannerOne,
  },
  {
    className: "hidden md:block h-[clamp(160px,20vw,230px)]",
    src: bannerTwo,
  },
  {
    className: "h-[clamp(220px,62vw,320px)] md:h-[clamp(240px,28vw,360px)]",
    src: bannerThree,
  },
  {
    className: "hidden md:block h-[clamp(160px,20vw,230px)]",
    src: bannerFour,
  },
  {
    className: "hidden lg:block h-[clamp(140px,15vw,190px)]",
    src: bannerFive,
  },
];

export function HeroSection({
  config,
  onPrimaryCta,
}: HeroSectionProps) {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden bg-[#F2F2F2]">
      <PageContainer
        className="relative flex min-h-[620px] flex-col items-center justify-between bg-cover bg-center pt-12 sm:min-h-[700px] sm:pt-16 lg:min-h-[760px] lg:pt-20"
        size="landing"
        style={{ backgroundImage: `url(${bannerBg})` }}
      >
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="text-4xl font-extrabold leading-tight tracking-normal text-slate-950 sm:text-5xl lg:text-6xl">
            {t.funnelPage.hero.headlinePrefix}{" "}
            <span className="text-pink-500">{t.funnelPage.hero.headlineHighlight}</span>{" "}
            {t.funnelPage.hero.headlineSuffix}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
            {t.funnelPage.hero.subtitle}
          </p>

          <Button
            className="mt-6 rounded-full bg-pink-500 px-5 text-xs font-bold hover:bg-pink-600 focus-visible:outline-pink-500 sm:px-6 sm:text-sm"
            onClick={onPrimaryCta}
          >
            {t.funnelPage.hero.ctaPrefix} — ${config.price}
            <ArrowRight aria-hidden="true" className="size-4" />
          </Button>
        </div>

        <div className="w-full overflow-hidden pb-6 pt-10 sm:pb-10">
          <div className="mx-auto flex w-full items-end justify-center gap-3 px-2 md:gap-4 lg:gap-5">
            {bannerImages.map((image, index) => (
              <img
                alt={t.funnelPage.hero.imageAlts[index]}
                className={cn("w-auto max-w-full shrink object-contain", image.className)}
                key={image.src}
                src={image.src}
              />
            ))}
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
