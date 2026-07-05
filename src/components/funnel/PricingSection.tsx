import { motion } from "motion/react";

import { Button } from "../common/Button";
import { BASE_PRICE, formatPrice } from "../checkout/checkoutUtils";
import { PageContainer } from "../layout/PageContainer";

type PricingSectionProps = {
  buttonLabel: string;
  includedItems: string[];
  oneTimePayment: string;
  whatsIncluded: string;
  onCta: () => void;
};

function LightningIcon() {
  return (
    <svg aria-hidden="true" className="size-7" fill="none" viewBox="0 0 28 28">
      <path
        d="M22.6506 11.8451C22.5767 11.7031 22.4652 11.5842 22.3284 11.5012C22.1916 11.4182 22.0346 11.3743 21.8745 11.3743H16.187V2.62431C16.1869 2.4383 16.1274 2.25718 16.0174 2.10723C15.9073 1.95728 15.7523 1.84631 15.5749 1.79043C15.3975 1.73454 15.2069 1.73665 15.0308 1.79644C14.8546 1.85623 14.7021 1.97059 14.5954 2.12293L5.40789 15.2479C5.31622 15.379 5.26225 15.5328 5.25185 15.6924C5.24145 15.8521 5.27502 16.0115 5.3489 16.1534C5.42278 16.2953 5.53415 16.4142 5.67089 16.4972C5.80764 16.5803 5.96454 16.6242 6.12451 16.6243H11.812V25.3743C11.8122 25.5603 11.8716 25.7414 11.9816 25.8914C12.0917 26.0413 12.2467 26.1523 12.4241 26.2082C12.6015 26.2641 12.7921 26.262 12.9683 26.2022C13.1444 26.1424 13.2969 26.028 13.4036 25.8757L22.5911 12.7507C22.6829 12.6196 22.737 12.4659 22.7475 12.3062C22.758 12.1465 22.7245 11.987 22.6506 11.8451Z"
        fill="#EE389C"
      />
    </svg>
  );
}

function TickIcon() {
  return (
    <svg aria-hidden="true" className="size-6 shrink-0" fill="none" viewBox="0 0 24 24">
      <path
        clipRule="evenodd"
        d="M3.85271 6.95711C3.87071 7.86791 3.37511 9.09911 2.73071 9.74231C2.13275 10.3408 1.79687 11.1523 1.79688 11.9983C1.79687 12.8443 2.13275 13.6558 2.73071 14.2543C3.36671 14.8879 3.83471 15.9871 3.85271 16.8847C3.86951 17.6791 4.18031 18.4687 4.78631 19.0735C5.3454 19.6337 6.09333 19.9654 6.88391 20.0035C7.83311 20.0515 9.07631 20.6035 9.74831 21.2755C10.3468 21.8731 11.158 22.2087 12.0037 22.2087C12.8495 22.2087 13.6606 21.8731 14.2591 21.2755C14.9311 20.6035 16.1743 20.0515 17.1235 20.0035C17.9141 19.9654 18.662 19.6337 19.2211 19.0735C19.804 18.4914 20.1382 17.7059 20.1535 16.8823C20.1715 15.9871 20.6335 14.8951 21.2683 14.2615C21.8685 13.6632 22.2065 12.8509 22.2078 12.0034C22.2092 11.1559 21.8738 10.3426 21.2755 9.74231C20.6323 9.10031 20.1355 7.86791 20.1547 6.95831C20.1637 6.52884 20.0857 6.102 19.9252 5.70354C19.7648 5.30508 19.5252 4.94326 19.2211 4.63991C18.9059 4.32387 18.5277 4.07774 18.1111 3.91751C17.6945 3.75728 17.2488 3.68654 16.8031 3.70991C15.9463 3.75311 14.8651 3.33791 14.2591 2.73071C13.6606 2.13275 12.8491 1.79688 12.0031 1.79688C11.1571 1.79687 10.3456 2.13275 9.74711 2.73071C9.14231 3.33671 8.05991 3.75311 7.20311 3.70991C6.75757 3.68671 6.31213 3.75753 5.89575 3.91776C5.47937 4.07798 5.10137 4.32403 4.78631 4.63991C4.48232 4.94312 4.24288 5.30474 4.08243 5.70299C3.92198 6.10123 3.84383 6.52785 3.85271 6.95711ZM15.6463 7.94831C15.7841 8.02479 15.9056 8.12768 16.0036 8.25109C16.1017 8.37451 16.1745 8.51604 16.2178 8.6676C16.2612 8.81915 16.2742 8.97776 16.2563 9.13437C16.2383 9.29097 16.1897 9.44251 16.1131 9.58031L12.7915 15.5587C12.7055 15.7215 12.5831 15.8624 12.4339 15.9703C12.2171 16.1272 11.9541 16.2071 11.6866 16.1973C11.4192 16.1875 11.1627 16.0886 10.9579 15.9163L7.64711 13.2679C7.52403 13.1694 7.42156 13.0476 7.34555 12.9096C7.26953 12.7715 7.22146 12.6197 7.20408 12.4631C7.18669 12.3064 7.20034 12.1478 7.24423 11.9964C7.28813 11.845 7.36141 11.7038 7.45991 11.5807C7.5584 11.4576 7.68017 11.3552 7.81826 11.2791C7.95635 11.2031 8.10807 11.1551 8.26474 11.1377C8.42141 11.1203 8.57997 11.1339 8.73136 11.1778C8.88276 11.2217 9.02403 11.295 9.14711 11.3935L11.3707 13.1731L14.0143 8.41391C14.0909 8.27617 14.1939 8.15487 14.3173 8.05693C14.4408 7.95899 14.5823 7.88633 14.7339 7.84309C14.8854 7.79986 15.044 7.78689 15.2006 7.80495C15.3571 7.823 15.5086 7.87171 15.6463 7.94831Z"
        fill="#666060"
        fillRule="evenodd"
      />
    </svg>
  );
}

export function PricingSection({
  buttonLabel,
  includedItems,
  oneTimePayment,
  onCta,
  whatsIncluded,
}: PricingSectionProps) {
  const displayItems = includedItems.includes("Human support")
    ? includedItems
    : [...includedItems, "Human support"];
  const paymentLabel = oneTimePayment.replace("-", " ");

  return (
    <section className="bg-[#F2F2F2] py-12 sm:py-16" id="pricing">
      <PageContainer size="lg">
        <motion.div
          className="rounded-[24px] bg-white px-6 py-11 sm:px-10 lg:px-[48px] lg:py-[54px]"
          initial={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.25 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <div className="mx-auto max-w-[560px] text-center">
            <h2
              className="text-[32px] font-semibold leading-[36px] tracking-normal text-[#101010] sm:text-[40px] sm:leading-[44px]"
              style={{ fontFamily: "'DM Sans', ui-sans-serif, system-ui, sans-serif" }}
            >
              Choose the <span className="text-[#EE389C]">Plan for</span>
              <br />
              <span className="text-[#EE389C]">Your</span> Exclusive Journey
            </h2>
            <p className="mt-4 text-sm leading-5 text-[#666060]">
              Flexible pricing designed to fit your goals, schedule, and budget.
            </p>
          </div>

          <div className="mt-12 grid rounded-[14px] bg-[#F7F7F7] p-5 lg:min-h-[326px] lg:grid-cols-[1fr_1fr]">
            <div className="flex min-h-[292px] flex-col justify-center rounded-[8px] bg-[#FDECF6] px-6 py-7 sm:px-8 lg:px-9">
              <div className="grid size-10 place-items-center rounded-md bg-white">
                <LightningIcon />
              </div>

              <div className="mt-7 flex flex-wrap items-end gap-x-2 gap-y-2">
                <span className="text-[44px] font-semibold leading-none tracking-normal text-[#101010] sm:text-[48px]">
                  {formatPrice(BASE_PRICE)}
                </span>
                <span className="pb-1.5 text-xs font-medium text-[#EE389C]">
                  /{paymentLabel}
                </span>
              </div>

              <p className="mt-4 max-w-[450px] text-xs leading-[17px] text-[#101010] sm:text-sm sm:leading-5">
                This subscription plan includes access to the Launch Dashboard,
                Operator Dashboard, comprehensive training resources, hosting,
                human support, and lifetime updates-providing everything you need
                to get started, manage your operations, and stay up to date.
              </p>

              <Button
                className="mt-7 min-h-10 w-full rounded-full bg-[#EE389C] text-xs font-semibold text-white hover:bg-[#d92d8b] focus-visible:outline-[#EE389C]"
                onClick={onCta}
              >
                {buttonLabel}
              </Button>
            </div>

            <div className="flex min-h-[292px] flex-col justify-center px-1 py-2 sm:px-8 lg:px-[72px]">
              <h3 className="text-xl font-semibold leading-7 text-[#101010]">
                {whatsIncluded}:
              </h3>
              <ul className="mt-5 grid gap-4">
                {displayItems.map((item) => (
                  <li className="flex items-center gap-3 text-base leading-6 text-[#101010]" key={item}>
                    <TickIcon />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </PageContainer>
    </section>
  );
}
