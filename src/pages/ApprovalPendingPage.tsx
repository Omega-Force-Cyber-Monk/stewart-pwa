import { CheckCircle2, Clock3, ExternalLink, ShieldCheck } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Badge } from "../components/common/Badge";
import { Button } from "../components/common/Button";
import { DashboardCard } from "../components/layout/DashboardCard";
import { PageContainer } from "../components/layout/PageContainer";
import {
  approveBusinessSetup,
  selectApprovalStatus,
  selectDriverProfile,
} from "../features/appFlow/appFlowSlice";
import { getDriverDisplayDomain, getDriverSitePath } from "../lib/driverSite";

const reviewSteps = [
  "Review your setup form",
  "Prepare launch materials",
  "Connect booking and customer page",
  "Release your personalized website",
];

export default function ApprovalPendingPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const approvalStatus = useAppSelector(selectApprovalStatus);
  const driverProfile = useAppSelector(selectDriverProfile);
  const sitePath = getDriverSitePath(driverProfile);
  const displayDomain = getDriverDisplayDomain(driverProfile);
  const isApproved = approvalStatus === "approved";

  const handleApprove = () => {
    dispatch(approveBusinessSetup());
    navigate(sitePath);
  };

  return (
    <main className="min-h-[calc(100vh-73px)] bg-[#F2F2F2]">
      <PageContainer className="py-10 sm:py-14" size="lg">
        <div className="mx-auto max-w-4xl">
          <DashboardCard className="overflow-hidden rounded-2xl border-slate-200 bg-white p-0">
            <div className="bg-slate-950 px-6 py-8 text-white sm:px-10">
              <Badge className="border-emerald-400/30 bg-emerald-400/10 text-emerald-200">
                {isApproved ? "Approved" : "Admin review pending"}
              </Badge>
              <h1 className="mt-4 text-3xl font-bold tracking-normal sm:text-5xl">
                {isApproved ? "Your personalized page is ready." : "Your setup is under review."}
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
                {isApproved
                  ? `Your customer-facing page is now available at ${displayDomain}.`
                  : "Our team will review your business setup, prepare your launch materials, and approve your personalized website when everything is ready."}
              </p>
            </div>

            <div className="grid gap-6 p-6 sm:p-10 lg:grid-cols-[1fr_320px]">
              <section>
                <h2 className="text-xl font-bold text-slate-950">Approval checklist</h2>
                <div className="mt-5 grid gap-3">
                  {reviewSteps.map((step, index) => (
                    <div
                      className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4"
                      key={step}
                    >
                      <span className="grid size-9 shrink-0 place-items-center rounded-full bg-emerald-50 text-emerald-700">
                        {isApproved || index === 0 ? (
                          <CheckCircle2 aria-hidden="true" className="size-5" />
                        ) : (
                          <Clock3 aria-hidden="true" className="size-5" />
                        )}
                      </span>
                      <span className="text-sm font-semibold text-slate-800">{step}</span>
                    </div>
                  ))}
                </div>
              </section>

              <aside className="grid gap-4">
                <DashboardCard className="border-pink-100 bg-pink-50/70">
                  <ShieldCheck aria-hidden="true" className="size-8 text-[#EE389C]" />
                  <h2 className="mt-4 text-lg font-bold text-slate-950">Frontend approval demo</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    In production, this approval will happen from the admin dashboard. For now,
                    use this simulator to test the customer page release.
                  </p>
                  <Button className="mt-5 w-full bg-[#EE389C] hover:bg-[#d92d8b]" onClick={handleApprove}>
                    Approve and view page
                    <ExternalLink aria-hidden="true" className="size-4" />
                  </Button>
                </DashboardCard>

                {isApproved && (
                  <Link
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-slate-800"
                    to={sitePath}
                  >
                    View personalized page
                    <ExternalLink aria-hidden="true" className="size-4" />
                  </Link>
                )}
              </aside>
            </div>
          </DashboardCard>
        </div>
      </PageContainer>
    </main>
  );
}
