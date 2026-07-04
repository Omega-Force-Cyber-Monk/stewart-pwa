import { ResponsiveGrid } from "../layout/ResponsiveGrid";
import { Section } from "../layout/Section";
import type { FunnelTheme } from "../../features/funnel/funnelTypes";
import type { StepTranslation } from "../../features/localization/localizationTypes";
import { cn } from "../../lib/cn";

type HowItWorksSectionProps = {
  steps: StepTranslation[];
  theme: FunnelTheme;
  title: string;
};

export function HowItWorksSection({ steps, theme, title }: HowItWorksSectionProps) {
  return (
    <Section title={title} titleAlign="center">
      <ResponsiveGrid className="mt-8" columns={3} gap="sm">
        {steps.map((step, index) => (
          <article className={cn("rounded-lg border p-6 text-center", theme.cardClassName)} key={step.title}>
            <span className={cn("mx-auto grid size-12 place-items-center rounded-full text-base font-bold", theme.backgroundAccentClassName, theme.accentClassName)}>
              {index + 1}
            </span>
            <h3 className="mt-4 text-lg font-bold text-slate-950">{step.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{step.description}</p>
          </article>
        ))}
      </ResponsiveGrid>
    </Section>
  );
}
