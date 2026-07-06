import { motion } from "motion/react";

import { useTranslation } from "../../features/localization/useTranslation";
import { PageContainer } from "../layout/PageContainer";

const steps = [
  { number: "1" },
  { number: "2" },
  { number: "3" },
];

function WaveLine() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute left-1/2 top-[58%] hidden w-[72%] -translate-x-1/2 -translate-y-1/2 lg:block"
      fill="none"
      viewBox="0 0 620 137"
    >
      <path
        d="M28 76.2824C34.5608 54.8115 55.5554 21.0589 87.0475 57.8157C94.4685 77.9057 118.54 107.164 155.452 63.4779C168.467 46.0284 199.98 22.5031 221.921 67.9971C230.956 83.9401 255.22 105.808 280 65.7375"
        stroke="#EE389C"
        strokeDasharray="6 6"
        strokeWidth="0.5"
      />
      <path
        d="M340.242 82.2824C346.204 60.8115 365.283 27.0589 393.9 63.8157C400.644 83.9057 422.518 113.164 456.062 69.4779C467.888 52.0284 496.525 28.5031 516.464 73.9971C524.674 89.9401 546.723 111.808 569.242 71.7375"
        stroke="#EE389C"
        strokeDasharray="6 6"
        strokeWidth="0.5"
      />
      <g filter="url(#waveGlowLeft)">
        <circle cx="28" cy="68.4766" fill="#EE389C" r="6" />
      </g>
      <g filter="url(#waveGlowRight)">
        <circle cx="570.242" cy="68.4766" fill="#EE389C" r="6" />
      </g>
      <defs>
        <filter
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
          height="136.96"
          id="waveGlowLeft"
          width="136.96"
          x="-40.48"
          y="-0.00343704"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feGaussianBlur stdDeviation="0.72" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.933333 0 0 0 0 0.219608 0 0 0 0 0.611765 0 0 0 1 0"
          />
          <feBlend in2="BackgroundImageFix" mode="normal" result="effect1" />
          <feGaussianBlur in="SourceAlpha" stdDeviation="1.44" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.933333 0 0 0 0 0.219608 0 0 0 0 0.611765 0 0 0 1 0"
          />
          <feBlend in2="effect1" mode="normal" result="effect2" />
          <feGaussianBlur in="SourceAlpha" stdDeviation="5.04" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.933333 0 0 0 0 0.219608 0 0 0 0 0.611765 0 0 0 1 0"
          />
          <feBlend in2="effect2" mode="normal" result="effect3" />
          <feGaussianBlur in="SourceAlpha" stdDeviation="10.08" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.933333 0 0 0 0 0.219608 0 0 0 0 0.611765 0 0 0 1 0"
          />
          <feBlend in2="effect3" mode="normal" result="effect4" />
          <feGaussianBlur in="SourceAlpha" stdDeviation="17.28" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.933333 0 0 0 0 0.219608 0 0 0 0 0.611765 0 0 0 1 0"
          />
          <feBlend in2="effect4" mode="normal" result="effect5" />
          <feGaussianBlur in="SourceAlpha" stdDeviation="30.24" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.94902 0 0 0 0 0.388235 0 0 0 0 0.117647 0 0 0 1 0"
          />
          <feBlend in="SourceGraphic" in2="effect5" mode="normal" />
        </filter>
        <filter
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
          height="136.96"
          id="waveGlowRight"
          width="136.96"
          x="501.762"
          y="-0.00343704"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feGaussianBlur stdDeviation="0.72" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.933333 0 0 0 0 0.219608 0 0 0 0 0.611765 0 0 0 1 0"
          />
          <feBlend in2="BackgroundImageFix" mode="normal" result="effect1Right" />
          <feGaussianBlur in="SourceAlpha" stdDeviation="1.44" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.933333 0 0 0 0 0.219608 0 0 0 0 0.611765 0 0 0 1 0"
          />
          <feBlend in2="effect1Right" mode="normal" result="effect2Right" />
          <feGaussianBlur in="SourceAlpha" stdDeviation="5.04" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.933333 0 0 0 0 0.219608 0 0 0 0 0.611765 0 0 0 1 0"
          />
          <feBlend in2="effect2Right" mode="normal" result="effect3Right" />
          <feGaussianBlur in="SourceAlpha" stdDeviation="10.08" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.933333 0 0 0 0 0.219608 0 0 0 0 0.611765 0 0 0 1 0"
          />
          <feBlend in2="effect3Right" mode="normal" result="effect4Right" />
          <feGaussianBlur in="SourceAlpha" stdDeviation="17.28" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.933333 0 0 0 0 0.219608 0 0 0 0 0.611765 0 0 0 1 0"
          />
          <feBlend in2="effect4Right" mode="normal" result="effect5Right" />
          <feGaussianBlur in="SourceAlpha" stdDeviation="30.24" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.94902 0 0 0 0 0.388235 0 0 0 0 0.117647 0 0 0 1 0"
          />
          <feBlend in="SourceGraphic" in2="effect5Right" mode="normal" />
        </filter>
      </defs>
    </svg>
  );
}

export function HowQuitWorksSection() {
  const { t } = useTranslation();

  return (
    <section className="bg-[#F2F2F2] py-12 sm:py-16">
      <PageContainer size="landing">
        <motion.div
          className="relative overflow-hidden rounded-[24px] border border-pink-300/80 bg-[#f8eef2] p-6 sm:p-10 lg:min-h-[450px] lg:p-14"
          initial={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.25 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <div className="mx-auto max-w-md text-center">
            <h2
              className="text-[32px] font-semibold leading-[38px] tracking-normal text-[#2f2f35] sm:text-[40px] sm:leading-[48px]"
              style={{ fontFamily: "'DM Sans', ui-sans-serif, system-ui, sans-serif" }}
            >
              {t.funnelPage.howWorks.titlePrefix}{" "}
              <span className="text-[#EE389C]">{t.funnelPage.howWorks.titleHighlight}</span>
              <br />
              {t.funnelPage.howWorks.titleSuffix}
            </h2>
            <p
              className="mt-4 text-sm font-normal leading-5 text-[#666060]"
              style={{ fontFamily: "'DM Sans', ui-sans-serif, system-ui, sans-serif" }}
            >
              {t.funnelPage.howWorks.subtitle}
            </p>
          </div>

          <div className="relative mt-14 lg:mt-20">
            <WaveLine />
            <div className="relative z-10 grid gap-8 md:grid-cols-3 md:gap-6 lg:items-start">
              {steps.map((step, index) => {
                const copy = t.funnelPage.howWorks.steps[index];

                return (
                <motion.article
                  className="relative mx-auto flex w-full max-w-[260px] flex-col text-center md:text-left"
                  initial={{ opacity: 0, y: 18 }}
                  key={step.number}
                  transition={{ delay: index * 0.08, duration: 0.35, ease: "easeOut" }}
                  viewport={{ once: true, amount: 0.4 }}
                  whileInView={{ opacity: 1, y: 0 }}
                >
                  <span
                    aria-hidden="true"
                    className="relative z-0 text-[64px] font-bold leading-none sm:text-[78px]"
                    style={{
                      color: "#FFC9E7",
                      fontFamily: "'DM Sans', ui-sans-serif, system-ui, sans-serif",
                    }}
                  >
                    {step.number}
                  </span>
                  <h3 className="relative z-10 -mt-6 text-xl font-semibold leading-7 text-[#2f2f35] sm:-mt-8">
                    {copy.title}
                  </h3>
                  <p className="relative z-10 mt-2 text-base leading-6 text-[#3f3f46]">
                    {copy.description}
                  </p>
                </motion.article>
                );
              })}
            </div>
          </div>
        </motion.div>
      </PageContainer>
    </section>
  );
}
