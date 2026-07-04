import { type ReactNode } from "react";

import { cn } from "../../lib/cn";
import { PageContainer } from "./PageContainer";

type SectionSpacing = "sm" | "md" | "lg" | "xl";
type SectionSize = "md" | "lg" | "xl" | "full";

type SectionProps = {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  description?: string;
  id?: string;
  size?: SectionSize;
  spacing?: SectionSpacing;
  title?: string;
  titleAlign?: "left" | "center";
};

const spacingClasses: Record<SectionSpacing, string> = {
  sm: "py-6 md:py-8",
  md: "py-10 md:py-12",
  lg: "py-12 md:py-16",
  xl: "py-14 md:py-20",
};

export function Section({
  children,
  className,
  containerClassName,
  description,
  id,
  size = "xl",
  spacing = "md",
  title,
  titleAlign = "left",
}: SectionProps) {
  return (
    <section className={cn(spacingClasses[spacing], className)} id={id}>
      <PageContainer className={containerClassName} size={size}>
        {title && (
          <div className={cn(titleAlign === "center" && "text-center")}>
            <h2 className="text-3xl font-bold tracking-normal text-slate-950 md:text-4xl">
              {title}
            </h2>
            {description && (
              <p className="mx-auto mt-3 max-w-3xl text-sm leading-6 text-slate-600">
                {description}
              </p>
            )}
          </div>
        )}
        {children}
      </PageContainer>
    </section>
  );
}
