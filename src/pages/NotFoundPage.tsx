import { Link } from "react-router-dom";

import { PageContainer } from "../components/layout/PageContainer";

export default function NotFoundPage() {
  return (
    <main>
      <PageContainer className="grid min-h-[70vh] place-items-center py-10 text-center" size="md">
        <div>
        <p className="text-sm font-semibold text-cyan-700">404</p>
        <h1 className="mt-3 text-3xl font-bold">Page not found</h1>
        <p className="mt-3 text-slate-600">
          This route is not part of the QuitTheApp launch flow.
        </p>
        <Link
          className="mt-6 inline-flex h-11 items-center justify-center rounded-md border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-950 transition hover:bg-slate-50"
          to="/standard"
        >
          Back to standard funnel
        </Link>
        </div>
      </PageContainer>
    </main>
  );
}
