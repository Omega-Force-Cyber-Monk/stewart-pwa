import { cn } from "../../lib/cn";
import { LAUNCH_PRICING } from "./pricing";

interface LaunchPriceProps {
  oldPrice?: string;
  price?: string;
  label?: string;
  className?: string;
  oldClassName?: string;
  priceClassName?: string;
  labelClassName?: string;
}

export function LaunchPrice({
  oldPrice = LAUNCH_PRICING.baseOld,
  price = LAUNCH_PRICING.base,
  label = "LAUNCH PRICE",
  className,
  oldClassName,
  priceClassName,
  labelClassName,
}: LaunchPriceProps) {
  return (
    <span className={cn("inline-flex flex-col leading-none", className)}>
      <span className={cn("text-sm font-bold line-through opacity-60", oldClassName)}>
        {oldPrice}
      </span>
      <span className={cn("font-bold", priceClassName)}>{price}</span>
      <span className={cn("mt-1 text-xs font-extrabold uppercase tracking-wide", labelClassName)}>
        {label}
      </span>
    </span>
  );
}
