import type { LucideIcon } from "lucide-react";

import { ResponsiveGrid } from "../layout/ResponsiveGrid";
import { Section } from "../layout/Section";
import type { FunnelTheme } from "../../features/funnel/funnelTypes";
import type { IconCardTranslation } from "../../features/localization/localizationTypes";
import { cn } from "../../lib/cn";

type BenefitsSectionProps = {
  benefits: IconCardTranslation[];
  icons: LucideIcon[];
  theme: FunnelTheme;
  title: string;
};

export function BenefitsSection({ benefits, icons, theme, title }: BenefitsSectionProps) {
  return (
    <Section id="benefits" title={title}>
      <ResponsiveGrid className="mt-8" columns={3} gap="sm">
        {benefits.map((benefit, index) => {
          const Icon = icons[index % icons.length];

          return (
            <article
              className={cn(
                "rounded-lg border p-5 transition duration-200 hover:-translate-y-1 hover:shadow-md",
                theme.cardClassName,
              )}
              key={benefit.title}
            >
              <span className={cn("grid size-11 place-items-center rounded-md", theme.backgroundAccentClassName)}>
                <Icon aria-hidden="true" className={cn("size-5", theme.accentClassName)} />
              </span>
              <h3 className="mt-4 text-lg font-bold text-slate-950">{benefit.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{benefit.description}</p>
            </article>
          );
        })}
      </ResponsiveGrid>
    </Section>
  );
}
