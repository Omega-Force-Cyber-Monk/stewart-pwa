import { ArrowLeft, CheckCircle2, Circle, ExternalLink, Loader2 } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useGetAdminDriverDashboardQuery } from "../store/api/Admin/admin.api";

export default function AdminDriverDashboardPage() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError, refetch } = useGetAdminDriverDashboardQuery(id ?? "", { skip: !id });

  if (isLoading) {
    return <div className="flex h-[50vh] items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-blue-600" /></div>;
  }

  if (isError || !data) {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center gap-4 text-sm text-slate-500">
        <p>Failed to load the driver dashboard.</p>
        <button type="button" onClick={() => refetch()} className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white">Retry</button>
      </div>
    );
  }

  const { driver, dashboard } = data;
  const setup = dashboard?.setup;
  const purchase = dashboard?.purchase;
  const publicUrl = driver.business?.slug ? `https://${driver.business.slug}.quittheapp.com` : null;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link to={`/admin/drivers/${driver.id}`} aria-label="Back to driver details" className="text-slate-500 hover:text-slate-900"><ArrowLeft className="h-5 w-5" /></Link>
          <div>
            <h2 className="text-xl font-bold text-slate-900">{driver.user.name || driver.user.email}</h2>
            <p className="text-sm text-slate-500">Read-only administrator view · #{driver.driverCode}</p>
          </div>
        </div>
        {publicUrl && (
          <a href={publicUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            Open Customer Website <ExternalLink className="h-4 w-4" />
          </a>
        )}
      </div>

      {!dashboard ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">This driver has not created a business yet.</div>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Summary label="Business status" value={setup?.businessStatus || driver.business?.status || "NOT_STARTED"} />
            <Summary label="Launch progress" value={`${setup?.percentage ?? 0}%`} />
            <Summary label="Base package" value={purchase?.basePurchased ? "Paid" : "Not purchased"} />
            <Summary label="Add-on" value={purchase?.addonPurchased ? "Paid" : "Not purchased"} />
          </div>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-lg font-bold text-slate-900">Launch setup</h3>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${setup?.launchReady ? "bg-green-100 text-green-800" : setup?.readyForFinalReview ? "bg-blue-100 text-blue-800" : "bg-amber-100 text-amber-800"}`}>
                {setup?.launchReady ? "Launched" : setup?.readyForFinalReview ? "Ready for final review" : "Setup in progress"}
              </span>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {(setup?.steps ?? []).map((step) => (
                <div key={step.step} className="flex items-center gap-3 rounded-xl border border-slate-200 p-4">
                  {step.completed ? <CheckCircle2 className="h-5 w-5 shrink-0 text-green-600" /> : <Circle className="h-5 w-5 shrink-0 text-slate-300" />}
                  <div>
                    <p className="text-xs font-medium text-slate-500">Step {step.step}</p>
                    <p className="font-semibold text-slate-900">{step.label}</p>
                  </div>
                </div>
              ))}
            </div>
            {!!setup?.missingRequirements.length && (
              <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4">
                <p className="font-semibold text-amber-900">Still required</p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-amber-900">
                  {setup.missingRequirements.map((requirement) => <li key={requirement}>{requirement}</li>)}
                </ul>
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
}

function Summary({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-2 break-words text-lg font-bold text-slate-900">{value}</p>
    </div>
  );
}
