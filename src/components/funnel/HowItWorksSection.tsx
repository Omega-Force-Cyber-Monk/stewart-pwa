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
    <section className="mx-auto max-w-7xl px-4 py-12">
      <h2 className="text-center text-3xl font-bold tracking-normal md:text-4xl">{title}</h2>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {steps.map((step, index) => (
          <article className={cn("rounded-lg border p-6 text-center", theme.cardClassName)} key={step.title}>
            <span className={cn("mx-auto grid size-12 place-items-center rounded-full text-base font-bold", theme.backgroundAccentClassName, theme.accentClassName)}>
              {index + 1}
            </span>
            <h3 className="mt-4 text-lg font-bold text-slate-950">{step.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{step.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
