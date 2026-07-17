import { type ReactNode } from "react";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-50 font-sans selection:bg-[#f42661]/30">
      <main>
        {children}
      </main>
    </div>
  );
}
