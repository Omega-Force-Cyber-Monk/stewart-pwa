import { SearchX } from "lucide-react";

type EmptyStateProps = {
  title: string;
  description: string;
};

export function EmptyState({ description, title }: EmptyStateProps) {
  return (
    <div className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center">
      <SearchX aria-hidden="true" className="mx-auto size-9 text-slate-400" />
      <h3 className="mt-4 text-lg font-bold text-slate-950">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600">{description}</p>
    </div>
  );
}
