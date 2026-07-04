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
import type { FunnelTranslation } from "../../features/localization/localizationTypes";
import { cn } from "../../lib/cn";

type HeroSectionProps = {
  appName: string;
  config: FunnelConfig;
  copy: FunnelTranslation;
  priceLabel: string;
  productName: string;
  smallTrustText: string;
  onPrimaryCta: () => void;
};

const bannerImages = [
  { alt: "Driver seated in a car", className: "w-[120px] sm:w-[150px] lg:w-[164px]", src: bannerOne },
  { alt: "Airport transportation driver smiling", className: "w-[140px] sm:w-[180px] lg:w-[212px]", src: bannerTwo },
  { alt: "Women transportation operators at the airport", className: "w-[190px] sm:w-[250px] lg:w-[300px]", src: bannerThree },
  { alt: "Private driver ready for airport service", className: "w-[140px] sm:w-[180px] lg:w-[212px]", src: bannerFour },
  { alt: "Driver greeting riders from a car", className: "w-[120px] sm:w-[150px] lg:w-[164px]", src: bannerFive },
];

export function HeroSection({
  config,
  onPrimaryCta,
}: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-white">
      <PageContainer
        className="relative flex min-h-[620px] flex-col items-center justify-between bg-cover bg-center pt-12 sm:min-h-[700px] sm:pt-16 lg:min-h-[760px] lg:pt-20"
        style={{ backgroundImage: `url(${bannerBg})` }}
      >
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="text-4xl font-extrabold leading-tight tracking-normal text-slate-950 sm:text-5xl lg:text-6xl">
            Launch a{" "}
            <span className="text-pink-500">Women-Focused</span>{" "}
            Private Airport Business Built on Trust.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
            QuitTheApp helps women operators start a direct booking airport transportation
            business with the backing of a trusted platform.
          </p>

          <Button
            className="mt-6 rounded-full bg-pink-500 px-5 text-xs font-bold hover:bg-pink-600 focus-visible:outline-pink-500 sm:px-6 sm:text-sm"
            onClick={onPrimaryCta}
          >
            Launch My Business — ${config.price}
            <ArrowRight aria-hidden="true" className="size-4" />
          </Button>
        </div>

        <div className="w-full overflow-x-auto pb-6 pt-10 sm:overflow-visible sm:pb-10">
          <div className="mx-auto flex min-w-max items-end justify-center gap-2 px-2 sm:min-w-0 sm:gap-3 md:gap-4 lg:gap-5">
            {bannerImages.map((image) => (
              <img
                alt={image.alt}
                className={cn("shrink-0 object-contain", image.className)}
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
