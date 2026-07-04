import { type ReactNode } from "react";

import { cn } from "../../lib/cn";

type PageContainerSize = "md" | "lg" | "xl" | "full";

type PageContainerProps = {
  children: ReactNode;
  className?: string;
  size?: PageContainerSize;
};

const sizeClasses: Record<PageContainerSize, string> = {
  md: "max-w-4xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
  full: "max-w-none",
};

export function PageContainer({
  children,
  className,
  size = "xl",
}: PageContainerProps) {
  return (
    <div className={cn("mx-auto w-full px-4 sm:px-6 lg:px-8", sizeClasses[size], className)}>
      {children}
    </div>
  );
}
