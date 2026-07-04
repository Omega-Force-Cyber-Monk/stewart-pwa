import { type ReactNode } from "react";

import { DashboardCard } from "../layout/DashboardCard";

type FormSectionProps = {
  children: ReactNode;
  title: string;
};

export function FormSection({ children, title }: FormSectionProps) {
  return (
    <DashboardCard as="section">
      <h2 className="text-lg font-bold text-slate-950">{title}</h2>
      <div className="mt-5 grid gap-4">{children}</div>
    </DashboardCard>
  );
}
