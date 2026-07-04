import { CheckCircle2 } from "lucide-react";

import { ResponsiveGrid } from "../layout/ResponsiveGrid";
import { Section } from "../layout/Section";
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
    <Section title={title} titleAlign="center">
      <ResponsiveGrid className="mt-8" columns={4} gap="sm">
        {cards.map((card) => (
          <article className={cn("rounded-lg border p-5", theme.cardClassName)} key={card.title}>
            <CheckCircle2 aria-hidden="true" className={cn("size-6", theme.accentClassName)} />
            <h3 className="mt-4 text-base font-bold text-slate-950">{card.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{card.description}</p>
          </article>
        ))}
      </ResponsiveGrid>
    </Section>
  );
}
