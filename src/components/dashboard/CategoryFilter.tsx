import { cn } from "../../lib/cn";

type CategoryFilterProps<T extends string> = {
  label: string;
  options: T[];
  selectedValue: T | "All";
  onChange: (value: T | "All") => void;
};

export function CategoryFilter<T extends string>({
  label,
  onChange,
  options,
  selectedValue,
}: CategoryFilterProps<T>) {
  const allOptions: Array<T | "All"> = ["All", ...options];

  return (
    <fieldset className="grid gap-2">
      <legend className="text-sm font-semibold text-slate-700">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {allOptions.map((option) => {
          const isSelected = option === selectedValue;

          return (
            <button
              aria-pressed={isSelected}
              className={cn(
                "min-h-9 cursor-pointer rounded-md border px-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600",
                isSelected
                  ? "border-cyan-700 bg-cyan-700 text-white"
                  : "border-slate-200 bg-white text-slate-700 hover:border-cyan-200 hover:bg-cyan-50 hover:text-cyan-800",
              )}
              key={option}
              onClick={() => onChange(option)}
              type="button"
            >
              {option}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
