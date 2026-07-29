import { type HTMLAttributes, type ReactNode } from "react";

import { cn } from "../../lib/cn";

type PageContainerSize = "md" | "lg" | "xl" | "landing" | "full";

type PageContainerProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  className?: string;
  size?: PageContainerSize;
};

const sizeClasses: Record<PageContainerSize, string> = {
  md: "max-w-4xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
  landing: "max-w-[1520px]",
  full: "max-w-none",
};

export function PageContainer({
  children,
  className,
  size = "xl",
  ...props
}: PageContainerProps) {
  return (
    <div
      className={cn("mx-auto w-full px-[20px] md:px-[50px]", sizeClasses[size], className)}
      {...props}
    >
      {children}
    </div>
  );
}
