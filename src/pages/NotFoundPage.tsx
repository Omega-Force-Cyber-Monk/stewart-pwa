import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <main className="mx-auto grid min-h-[70vh] max-w-3xl place-items-center px-4 py-10 text-center">
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
    </main>
  );
}
