import { type ReactNode } from "react";
import { Link } from "react-router-dom";

import logoWeb from "../../assets/logoWeb.png";
import { PageContainer } from "./PageContainer";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
        <PageContainer
          className="flex min-h-[64px] items-center justify-between gap-4 py-3"
          size="landing"
        >
          <div className="flex min-w-0 items-center">
            <Link
              aria-label="Home"
              className="flex min-h-11 min-w-0 cursor-pointer items-center rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-500"
              to="/"
            >
              <img
                alt="Logo"
                className="h-9 w-auto shrink-0 object-contain sm:h-10"
                src={logoWeb}
              />
            </Link>
          </div>
        </PageContainer>
      </header>
      {children}
    </div>
  );
}
