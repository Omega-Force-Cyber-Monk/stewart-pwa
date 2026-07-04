import { type ReactNode } from "react";

import { cn } from "../../lib/cn";

type ResponsiveGridColumns = 1 | 2 | 3 | 4;
type ResponsiveGridGap = "sm" | "md" | "lg";

type ResponsiveGridProps = {
  children: ReactNode;
  className?: string;
  columns?: ResponsiveGridColumns;
  gap?: ResponsiveGridGap;
};

const columnClasses: Record<ResponsiveGridColumns, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-2 xl:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
};

const gapClasses: Record<ResponsiveGridGap, string> = {
  sm: "gap-4",
  md: "gap-5",
  lg: "gap-6",
};

export function ResponsiveGrid({
  children,
  className,
  columns = 3,
  gap = "md",
}: ResponsiveGridProps) {
  return <div className={cn("grid", columnClasses[columns], gapClasses[gap], className)}>{children}</div>;
}
