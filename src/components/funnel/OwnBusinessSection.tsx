import { BadgeCheck, CircleDollarSign, Globe2, Repeat2, TrendingUp, X } from "lucide-react";
import { motion } from "motion/react";

import womenImage from "../../assets/women.svg";
import { PageContainer } from "../layout/PageContainer";

const appLimitations = [
  { label: "Commission fees", x: 238, y: 136 },
  { label: "Limited customer ownership", x: 256, y: 196 },
  { label: "No control over branding", x: 256, y: 256 },
  { label: "Inconsistent demand", x: 238, y: 316 },
];

const businessBenefits = [
  { icon: BadgeCheck, label: "Build your own customers", x: 82, y: 124 },
  { icon: Repeat2, label: "Repeat riders and referrals", x: 64, y: 174 },
  { icon: CircleDollarSign, label: "Set your own rates", x: 56, y: 224 },
  { icon: Globe2, label: "Professional brand presence", x: 64, y: 274 },
  { icon: TrendingUp, label: "Flexible business growth", x: 82, y: 324 },
];

export function OwnBusinessSection() {
  return (
    <section className="bg-[#F2F2F2] py-14 sm:py-16">
      <PageContainer size="lg">
        <div className=" text-center">
          <h2
            className="text-[32px] font-semibold leading-[38px] tracking-normal text-[#101010]"
            style={{ fontFamily: "'DM Sans', ui-sans-serif, system-ui, sans-serif" }}
          >
            Why Build Your <span className="text-pink-500">Own</span>
            <br className="hidden sm:block" /> Business?
          </h2>
          <p
            className="mx-auto mt-3 max-w-md text-sm font-normal leading-5 text-[#666060]"
            style={{ fontFamily: "'DM Sans', ui-sans-serif, system-ui, sans-serif" }}
          >
            Build a trusted brand, keep more revenue, and create lasting relationships
            with your own customers.
          </p>
        </div>

        <div className="mt-12 grid items-center gap-6 lg:grid-cols-[320px_390px_320px] lg:justify-center lg:gap-0 xl:gap-2">
          <motion.div
            className="order-2 grid justify-items-center lg:order-1 lg:justify-items-end"
            initial={{ opacity: 0, x: -18 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            <div className="relative h-[430px] w-full max-w-[320px]">
              <p className="absolute left-[72px] top-8 w-[150px] text-center text-sm font-semibold text-[#101010]">
                Relying on <span className="text-pink-500">Apps</span>
              </p>

              <svg
                aria-hidden="true"
                className="absolute inset-0 h-full w-full overflow-visible"
                fill="none"
                viewBox="0 0 320 430"
              >
                <path
                  d="M148 58C194 84 226 112 238 136C250 166 256 180 256 196C260 218 260 236 256 256C252 286 245 304 238 316C224 350 194 376 148 398"
                  stroke="#9CA3AF"
                  strokeDasharray="4 5"
                  strokeLinecap="round"
                />
              </svg>

              {appLimitations.map((item) => (
                <div
                  className="absolute flex h-9 items-center justify-end gap-3"
                  key={item.label}
                  style={{
                    left: 0,
                    top: item.y - 18,
                    width: item.x + 18,
                  }}
                >
                  <span className="min-w-0 text-right text-sm font-medium text-[#101010]">
                    {item.label}
                  </span>
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-red-500 text-white shadow-sm">
                    <X aria-hidden="true" className="size-4" />
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="order-1 grid justify-items-center lg:order-2"
            initial={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.4 }}
            whileInView={{ opacity: 1, scale: 1 }}
          >
            <div className="grid w-full max-w-[340px] place-items-center sm:max-w-[400px] lg:max-w-[390px]">
              <img
                alt="Women-focused private transportation driver"
                className="h-auto w-full object-contain object-center"
                src={womenImage}
              />
            </div>
          </motion.div>

          <motion.div
            className="order-3 grid justify-items-center lg:justify-items-start"
            initial={{ opacity: 0, x: 18 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            <div className="relative h-[430px] w-full max-w-[320px]">
              <p className="absolute right-10 top-8 w-[220px] text-center text-sm font-semibold text-[#101010]">
                <span className="text-pink-500">Women</span>-Focused Business
              </p>

              <svg
                aria-hidden="true"
                className="absolute inset-0 h-full w-full overflow-visible"
                fill="none"
                viewBox="0 0 320 430"
              >
                <path
                  d="M172 58C125 78 96 103 82 124C70 141 66 160 64 174C58 192 56 210 56 224C56 239 60 258 64 274C68 294 74 310 82 324C96 350 126 376 172 398"
                  stroke="#9CA3AF"
                  strokeDasharray="4 5"
                  strokeLinecap="round"
                />
              </svg>

              {businessBenefits.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    className="absolute flex h-9 items-center gap-3"
                    key={item.label}
                    style={{
                      left: item.x - 18,
                      top: item.y - 18,
                    }}
                  >
                    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-pink-500 text-white">
                      <Icon aria-hidden="true" className="size-4" />
                    </span>
                    <span className="w-[210px] text-sm font-medium text-[#101010]">
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </PageContainer>
    </section>
  );
}
