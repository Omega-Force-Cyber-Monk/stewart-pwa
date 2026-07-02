import { ArrowRight, CheckCircle2 } from "lucide-react";

import { Badge } from "../common/Badge";
import { Button } from "../common/Button";
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

export function HeroSection({
  appName,
  config,
  copy,
  onPrimaryCta,
  priceLabel,
  productName,
  smallTrustText,
}: HeroSectionProps) {
  return (
    <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
      <div>
        <p className={cn("text-sm font-bold uppercase tracking-wide", config.theme.accentClassName)}>
          {appName}
        </p>
        <Badge className={cn("mt-4 w-fit", config.theme.badgeClassName)}>
          {config.audienceLabel}
        </Badge>

        <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-tight tracking-normal md:text-6xl">
          {copy.headline}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">{copy.subheadline}</p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button className={config.theme.buttonClassName} onClick={onPrimaryCta}>
            {copy.primaryCta}
            <ArrowRight aria-hidden="true" className="size-4" />
          </Button>
          <a
            className="inline-flex h-11 items-center justify-center rounded-md border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-950 transition hover:bg-slate-50"
            href="#benefits"
          >
            {copy.secondaryCta}
          </a>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {copy.trustSignals.map((signal) => (
            <span className="inline-flex items-center gap-1 text-sm font-medium text-slate-600" key={signal}>
              <CheckCircle2 aria-hidden="true" className={cn("size-4", config.theme.accentClassName)} />
              {signal}
            </span>
          ))}
        </div>
      </div>

      <aside className={cn("rounded-lg border p-6", config.theme.cardClassName)}>
        <p className="text-sm font-semibold text-slate-500">{productName}</p>
        <p className="mt-3 text-5xl font-bold text-slate-950">${config.price}</p>
        <p className="mt-2 text-sm font-medium text-slate-600">{priceLabel}</p>
        <div className={cn("mt-6 rounded-md p-4", config.theme.backgroundAccentClassName)}>
          <p className="text-sm font-semibold text-slate-950">{smallTrustText}</p>
        </div>
      </aside>
    </section>
  );
}
