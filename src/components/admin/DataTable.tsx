import type { ReactNode } from "react";

interface DataTableProps {
  headers: string[];
  children: ReactNode;
  showing?: string;
  actions?: ReactNode;
}

export function DataTable({ headers, children, showing, actions }: DataTableProps) {
  return <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"><div className="flex items-center justify-end gap-3 p-4">{actions}</div><div className="overflow-x-auto"><table className="w-full text-left text-sm"><thead className="bg-blue-50 text-xs font-semibold text-blue-700"><tr>{headers.map((header) => <th key={header} className="whitespace-nowrap px-4 py-3">{header}</th>)}</tr></thead><tbody className="divide-y divide-slate-100">{children}</tbody></table></div>{showing && <div className="border-t border-slate-100 px-4 py-3 text-xs text-slate-500">{showing}</div>}</div>;
}

export function AdminStatusChip({ status }: { status: string }) {
  const normalized = status.toUpperCase();
  const styles = normalized === "APPROVED" || normalized === "COMPLETED" || normalized === "PAID" || normalized === "CONVERTED" ? "bg-green-50 text-green-700" : normalized === "UNDER_REVIEW" || normalized === "CONTACTED" ? "bg-blue-50 text-blue-700" : normalized === "REJECTED" || normalized === "FAILED" || normalized === "SPAM" ? "bg-red-50 text-red-700" : "bg-amber-50 text-amber-700";
  const label = status.replace(/_/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${styles}`}>{label}</span>;
}
