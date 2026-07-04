import { type HTMLAttributes, type ReactNode } from "react";

import { cn } from "../../lib/cn";

type DashboardCardVariant = "default" | "surface" | "accent" | "success";

type DashboardCardProps = HTMLAttributes<HTMLElement> & {
  as?: "article" | "div" | "section";
  children: ReactNode;
  className?: string;
  hover?: boolean;
  variant?: DashboardCardVariant;
};

const variantClasses: Record<DashboardCardVariant, string> = {
  default: "border-slate-200 bg-white",
  surface: "border-slate-200 bg-slate-50",
  accent: "border-cyan-200 bg-cyan-50",
  success: "border-emerald-200 bg-emerald-50",
};

export function DashboardCard({
  as: Component = "div",
  children,
  className,
  hover = false,
  variant = "default",
  ...props
}: DashboardCardProps) {
  return (
    <Component
      className={cn(
        "rounded-lg border p-5 shadow-sm",
        variantClasses[variant],
        hover && "transition duration-200 hover:-translate-y-0.5 hover:border-cyan-200 hover:shadow-md",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
