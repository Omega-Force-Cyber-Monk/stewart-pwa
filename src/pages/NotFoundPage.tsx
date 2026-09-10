import { ArrowLeft, Home, SearchX } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <main className="grid min-h-screen place-items-center bg-slate-50 px-4 py-10">
      <section className="w-full max-w-2xl text-center">
        <div className="mx-auto mb-6 grid h-20 w-20 place-items-center rounded-2xl bg-white text-dashboard-rider shadow-sm ring-1 ring-green-100">
          <SearchX className="h-10 w-10" />
        </div>
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-dashboard-rider">404</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl">
          Page not found
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-slate-500 sm:text-base">
          The page may have moved, or the link may be incorrect. Head back to a known page and keep moving.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-100"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </button>
          <Link
            to="/"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-dashboard-rider px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-dashboard-rider-dark"
          >
            <Home className="h-4 w-4" />
            Home
          </Link>
        </div>
      </section>
    </main>
  );
}
