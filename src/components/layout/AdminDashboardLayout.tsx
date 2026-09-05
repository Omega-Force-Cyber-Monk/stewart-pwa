import { DashboardShell } from "./DashboardShell";

interface AdminDashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export function AdminDashboardLayout({ children, title = "Dashboard Overview" }: AdminDashboardLayoutProps) {
  return (
    <DashboardShell variant="admin" title={title}>
      {children}
    </DashboardShell>
  );
}
