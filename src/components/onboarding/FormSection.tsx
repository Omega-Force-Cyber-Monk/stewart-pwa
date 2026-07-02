import { type ReactNode } from "react";

type FormSectionProps = {
  children: ReactNode;
  title: string;
};

export function FormSection({ children, title }: FormSectionProps) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-bold text-slate-950">{title}</h2>
      <div className="mt-5 grid gap-4">{children}</div>
    </section>
  );
}
