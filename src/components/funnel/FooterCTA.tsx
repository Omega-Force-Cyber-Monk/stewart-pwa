import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

import footerCtaBackground from "../../assets/Frame 478.svg";
import { BASE_PRICE, formatPrice } from "../checkout/checkoutUtils";
import { useTranslation } from "../../features/localization/useTranslation";
import { PageContainer } from "../layout/PageContainer";

type FooterCTAProps = {
  onCta: () => void;
};

export function FooterCTA({ onCta }: FooterCTAProps) {
  const { t } = useTranslation();

  return (
    <section className="bg-[#F2F2F2] py-12 sm:py-16" id="contact">
      <PageContainer size="landing">
        <motion.div
          className="relative isolate min-h-[320px] overflow-hidden rounded-[20px] bg-[#FFD9E3] bg-cover bg-center bg-no-repeat px-6 py-16 text-center sm:min-h-[390px] sm:px-10 lg:px-14"
          initial={{ opacity: 0, y: 24 }}
          style={{ backgroundImage: `url("${footerCtaBackground}")` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.25 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <div className="relative z-10 mx-auto flex min-h-[190px] max-w-3xl flex-col items-center justify-center sm:min-h-[250px]">
            <h2
              className="text-[34px] font-semibold leading-[42px] tracking-normal text-[#101010] sm:text-[48px] sm:leading-[56px]"
              style={{ fontFamily: "'DM Sans', ui-sans-serif, system-ui, sans-serif" }}
            >
              {t.funnelPage.footerCta.title}
            </h2>
            <p className="mt-4 text-sm leading-5 text-[#666060]">
              {t.funnelPage.footerCta.subtitle}
            </p>
            <button
              className="mt-8 inline-flex min-h-10 cursor-pointer items-center justify-center gap-2 rounded-full bg-[#EE389C] px-6 text-xs font-semibold text-white transition hover:bg-[#d92d8b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EE389C]"
              onClick={onCta}
              type="button"
            >
              {t.funnelPage.footerCta.ctaPrefix} — {formatPrice(BASE_PRICE)}
              <ArrowRight aria-hidden="true" className="size-4" />
            </button>
          </div>
        </motion.div>
      </PageContainer>
    </section>
  );
}
