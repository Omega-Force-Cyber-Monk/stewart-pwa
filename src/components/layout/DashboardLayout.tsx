import { DashboardShell } from "./DashboardShell";

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export function DashboardLayout({ children, title = "Dashboard Overview" }: DashboardLayoutProps) {
  return (
    <DashboardShell variant="rider" title={title}>
      {children}
    </DashboardShell>
  );
}
