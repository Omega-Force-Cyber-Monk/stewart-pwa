import { CheckCircle2 } from "lucide-react";

import { Button } from "../common/Button";
import type { FunnelConfig } from "../../features/funnel/funnelTypes";
import { cn } from "../../lib/cn";

type PricingSectionProps = {
  buttonLabel: string;
  comparisonBase: string;
  comparisonTitle: string;
  comparisonUpgrade: string;
  config: FunnelConfig;
  includedItems: string[];
  oneTimePayment: string;
  optionalUpgradeTitle: string;
  productName: string;
  title: string;
  upgradeName: string;
  whatsIncluded: string;
  onCta: () => void;
};

function PricingCard({
  buttonLabel,
  config,
  includedItems,
  oneTimePayment,
  onCta,
  productName,
  whatsIncluded,
}: Pick<
  PricingSectionProps,
  | "buttonLabel"
  | "config"
  | "includedItems"
  | "oneTimePayment"
  | "onCta"
  | "productName"
  | "whatsIncluded"
>) {
  return (
    <article className={cn("mx-auto w-full max-w-2xl rounded-lg border p-6", config.theme.cardClassName)}>
      <p className="text-sm font-semibold text-slate-500">{productName}</p>
      <p className="mt-3 text-5xl font-bold text-slate-950">${config.price}</p>
      <p className="mt-2 text-sm font-medium text-slate-600">{oneTimePayment}</p>

      <h3 className="mt-8 text-base font-bold text-slate-950">{whatsIncluded}</h3>
      <ul className="mt-4 grid gap-3">
        {includedItems.map((item) => (
          <li className="flex gap-3 text-sm font-medium text-slate-700" key={item}>
            <CheckCircle2 aria-hidden="true" className={cn("mt-0.5 size-4 shrink-0", config.theme.accentClassName)} />
            {item}
          </li>
        ))}
      </ul>

      <Button className={cn("mt-8 w-full", config.theme.buttonClassName)} onClick={onCta}>
        {buttonLabel}
      </Button>
    </article>
  );
}

export function PricingSection({
  buttonLabel,
  comparisonBase,
  comparisonTitle,
  comparisonUpgrade,
  config,
  includedItems,
  oneTimePayment,
  onCta,
  optionalUpgradeTitle,
  productName,
  title,
  upgradeName,
  whatsIncluded,
}: PricingSectionProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12" id="pricing">
      <h2 className="text-center text-3xl font-bold tracking-normal md:text-4xl">{title}</h2>
      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.8fr] lg:items-start">
        <PricingCard
          buttonLabel={buttonLabel}
          config={config}
          includedItems={includedItems}
          oneTimePayment={oneTimePayment}
          onCta={onCta}
          productName={productName}
          whatsIncluded={whatsIncluded}
        />
        <aside className={cn("rounded-lg border p-6", config.theme.cardClassName)}>
          <p className="text-sm font-bold uppercase tracking-wide text-slate-500">{optionalUpgradeTitle}</p>
          <h3 className="mt-2 text-2xl font-bold text-slate-950">{upgradeName}</h3>
          <p className={cn("mt-3 text-4xl font-bold", config.theme.accentClassName)}>
            +${config.dfyUpgradePrice}
          </p>
          <div className={cn("mt-6 rounded-md p-4", config.theme.backgroundAccentClassName)}>
            <p className="font-bold text-slate-950">{comparisonTitle}</p>
            <p className="mt-3 text-sm leading-6 text-slate-700">{comparisonBase}</p>
            <p className="mt-3 text-sm leading-6 text-slate-700">{comparisonUpgrade}</p>
          </div>
        </aside>
      </div>
    </section>
  );
}
