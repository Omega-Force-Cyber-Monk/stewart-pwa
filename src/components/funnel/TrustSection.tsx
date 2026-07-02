import { CheckCircle2 } from "lucide-react";

import type { FunnelTheme } from "../../features/funnel/funnelTypes";
import type { IconCardTranslation } from "../../features/localization/localizationTypes";
import { cn } from "../../lib/cn";

type TrustSectionProps = {
  cards: IconCardTranslation[];
  theme: FunnelTheme;
  title: string;
};

export function TrustSection({ cards, theme, title }: TrustSectionProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <h2 className="text-center text-3xl font-bold tracking-normal md:text-4xl">{title}</h2>
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <article className={cn("rounded-lg border p-5", theme.cardClassName)} key={card.title}>
            <CheckCircle2 aria-hidden="true" className={cn("size-6", theme.accentClassName)} />
            <h3 className="mt-4 text-base font-bold text-slate-950">{card.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{card.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
