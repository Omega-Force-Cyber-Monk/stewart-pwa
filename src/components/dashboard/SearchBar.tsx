import { Search } from "lucide-react";

type SearchBarProps = {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
};

export function SearchBar({ label, onChange, placeholder, value }: SearchBarProps) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-semibold text-slate-700">{label}</span>
      <span className="relative">
        <Search
          aria-hidden="true"
          className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400"
        />
        <input
          className="h-11 w-full rounded-md border border-slate-300 bg-white pl-9 pr-3 text-sm outline-none transition focus:border-cyan-600 focus:ring-2 focus:ring-cyan-100"
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          type="search"
          value={value}
        />
      </span>
    </label>
  );
}
