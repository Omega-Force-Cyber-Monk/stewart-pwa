import { ArrowRight } from "lucide-react";

import { Button } from "../common/Button";
import { Section } from "../layout/Section";
import type { FunnelTheme } from "../../features/funnel/funnelTypes";
import { cn } from "../../lib/cn";

type FooterCTAProps = {
  buttonLabel: string;
  headline: string;
  text: string;
  theme: FunnelTheme;
  onCta: () => void;
};

export function FooterCTA({ buttonLabel, headline, onCta, text, theme }: FooterCTAProps) {
  return (
    <Section>
      <div className={cn("rounded-lg border p-8 text-center md:p-12", theme.cardClassName)}>
        <h2 className="mx-auto max-w-3xl text-3xl font-bold tracking-normal md:text-5xl">{headline}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600">{text}</p>
        <Button className={cn("mt-8", theme.buttonClassName)} onClick={onCta}>
          {buttonLabel}
          <ArrowRight aria-hidden="true" className="size-4" />
        </Button>
      </div>
    </Section>
  );
}
