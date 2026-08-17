import { ArrowLeft, CheckCircle2, Loader2, LockKeyhole, XCircle } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useGetAdminDriverDashboardQuery } from "../store/api/Admin/admin.api";
import { cn } from "../lib/cn";

const formatDate = (value?: string | null) => {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export default function AdminDriverDashboardPage() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError, refetch } = useGetAdminDriverDashboardQuery(id ?? "", {
    skip: !id,
  });

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#1a56ff]" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center gap-4">
        <p className="text-sm text-slate-500">Unable to load this driver dashboard.</p>
        <button
          onClick={refetch}
          className="rounded-lg bg-[#1a56ff] px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  const { driver, dashboard } = data;
  const setup = dashboard?.setup;
  const purchase = dashboard?.purchase;
  const checklistGroups = dashboard?.checklists ?? {};

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <Link
            to={`/admin/drivers/${driver.id}`}
            className="mt-1 text-slate-500 transition-colors hover:text-slate-800"
            aria-label="Back to driver details"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-2xl font-bold text-slate-800">Driver Dashboard View</h2>
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700">
                <LockKeyhole className="h-3.5 w-3.5" />
                Admin read-only
              </span>
            </div>
            <p className="mt-1 text-sm text-slate-500">
              Reviewing {driver.user.name || driver.user.email} · {driver.driverCode}
            </p>
          </div>
        </div>
        <Link
          to={`/admin/drivers/${driver.id}`}
          className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Driver Details
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm xl:col-span-2">
          <h3 className="mb-5 text-lg font-bold text-slate-800">Business Overview</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Info label="Owner" value={driver.user.name || "—"} />
            <Info label="Email" value={driver.user.email} />
            <Info label="Business" value={driver.business?.name || "Not started"} />
            <Info label="Business Status" value={driver.business?.status || "—"} />
            <Info label="Service Area" value={driver.serviceArea?.cityArea || "—"} />
            <Info label="Airports" value={driver.serviceArea?.airports?.join(", ") || "—"} />
            <Info label="Driver Category" value={driver.category} />
            <Info label="Joined" value={formatDate(driver.createdAt)} />
          </div>
        </section>

        <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="mb-5 text-lg font-bold text-slate-800">Purchase Access</h3>
          <div className="space-y-4">
            <StatusRow label="DIY Launch Kit" active={purchase?.basePurchased ?? false} />
            <StatusRow label="We Do It for You Upgrade" active={purchase?.addonPurchased ?? false} />
            <div className="border-t border-slate-100 pt-4">
              <p className="text-xs uppercase tracking-wide text-slate-400">Latest purchase</p>
              <p className="mt-1 text-sm font-semibold text-slate-800">{formatDate(purchase?.purchaseDate)}</p>
            </div>
          </div>
        </section>
      </div>

      <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-lg font-bold text-slate-800">Launch Setup Progress</h3>
          <span className="text-sm font-semibold text-[#1a56ff]">{Math.round(setup?.percentage ?? 0)}%</span>
        </div>
        <div className="mt-4 h-2.5 w-full rounded-full bg-slate-100">
          <div
            className="h-2.5 rounded-full bg-[#1a56ff] transition-all"
            style={{ width: `${Math.min(100, Math.max(0, setup?.percentage ?? 0))}%` }}
          />
        </div>
        <p className="mt-2 text-xs text-slate-500">
          Current step {setup?.currentStep ?? 1} of 8 · {setup?.completedSteps?.length ?? 0} steps completed
        </p>
        {setup?.missingRequirements?.length ? (
          <div className="mt-4 rounded-lg border border-amber-100 bg-amber-50 p-3 text-sm text-amber-800">
            <p className="font-semibold">Remaining requirements</p>
            <ul className="mt-1 list-inside list-disc">
              {setup.missingRequirements.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        ) : null}
      </section>

      <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <h3 className="mb-5 text-lg font-bold text-slate-800">Checklist Progress</h3>
        {Object.keys(checklistGroups).length === 0 ? (
          <p className="text-sm text-slate-500">No checklist items are available yet.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {Object.entries(checklistGroups).map(([group, items]) => (
              <div key={group} className="rounded-xl border border-slate-100 p-4">
                <h4 className="text-sm font-bold uppercase tracking-wide text-slate-600">{group.replaceAll("_", " ")}</h4>
                <div className="mt-3 space-y-2">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-start gap-2 text-sm">
                      {item.completed ? (
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                      ) : (
                        <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-slate-300" />
                      )}
                      <span className={cn(item.completed ? "text-slate-700" : "text-slate-400")}>{item.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-slate-50 p-3">
      <p className="text-xs uppercase tracking-wide text-slate-400">{label}</p>
      <p className="mt-1 break-words text-sm font-semibold text-slate-800">{value}</p>
    </div>
  );
}

function StatusRow({ label, active }: { label: string; active: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-3 last:border-0 last:pb-0">
      <span className="text-sm text-slate-600">{label}</span>
      <span className={cn("rounded-full px-2.5 py-1 text-xs font-semibold", active ? "bg-green-50 text-green-600" : "bg-slate-100 text-slate-500")}>
        {active ? "Purchased" : "Not purchased"}
      </span>
    </div>
  );
}
