import { CheckCircle2, Circle, RotateCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Badge } from "../components/common/Badge";
import { Button } from "../components/common/Button";
import { ProgressBar } from "../components/common/ProgressBar";
import {
  cycleModuleStatus,
  resetDemo,
  selectCompletedModuleCount,
  selectLaunchProgressPercentage,
  setDfyPipelineStep,
  type ModuleStatus,
} from "../features/appFlow/appFlowSlice";
import { dashboardModules, dfyPipeline } from "../features/dashboard/dashboardContent";
import { useTranslation } from "../features/localization/useTranslation";

const statusTone: Record<ModuleStatus, "neutral" | "success" | "warning" | "accent"> = {
  not_started: "neutral",
  in_progress: "warning",
  complete: "success",
};

export default function DashboardPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const {
    activeFunnel,
    dfyPipelineStep,
    driverProfile,
    hasDfyUpgrade,
    moduleStatuses,
  } = useAppSelector((state) => state.appFlow);
  const completedModules = useAppSelector(selectCompletedModuleCount);
  const moduleProgress = useAppSelector(selectLaunchProgressPercentage);

  const markNextPipelineStep = () => {
    dispatch(setDfyPipelineStep(dfyPipelineStep + 1));
  };

  const handleReset = () => {
    dispatch(resetDemo());
    navigate("/standard");
  };

  const statusLabels: Record<ModuleStatus, string> = {
    not_started: t.dashboard.statusNotStarted,
    in_progress: t.dashboard.statusInProgress,
    complete: t.dashboard.statusComplete,
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <Badge tone={hasDfyUpgrade ? "success" : "accent"}>
            {hasDfyUpgrade ? t.dashboard.dfyPathTitle : t.dashboard.diyPathTitle}
          </Badge>
          <h1 className="mt-3 text-3xl font-bold">{t.dashboard.title}</h1>
          <p className="mt-2 text-slate-600">
            {driverProfile?.fullName || t.common.appName}, {t.dashboard.subtitle} ({activeFunnel})
          </p>
        </div>
        <Button onClick={handleReset} variant="secondary">
          <RotateCcw aria-hidden="true" className="size-4" />
          {t.common.resetDemo}
        </Button>
      </div>

      {hasDfyUpgrade ? (
        <section className="mt-8 rounded-lg border border-slate-200 bg-white p-6">
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-semibold">{t.dashboard.dfyPathTitle}</h2>
              <p className="mt-1 text-sm text-slate-600">{t.dashboard.resourcesLabel}</p>
            </div>
            <Button onClick={markNextPipelineStep}>{t.common.next}</Button>
          </div>

          <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">
            {dfyPipeline.map((step) => {
              const isActive = step.step === dfyPipelineStep;
              const isComplete = step.step < dfyPipelineStep;

              return (
                <article
                  className="rounded-md border border-slate-200 bg-slate-50 p-4"
                  key={step.step}
                >
                  {isComplete ? (
                    <CheckCircle2 aria-hidden="true" className="size-5 text-emerald-600" />
                  ) : (
                    <Circle
                      aria-hidden="true"
                      className={isActive ? "size-5 text-cyan-600" : "size-5 text-slate-300"}
                    />
                  )}
                  <h3 className="mt-3 text-sm font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{step.description}</p>
                </article>
              );
            })}
          </div>
        </section>
      ) : (
        <section className="mt-8 rounded-lg border border-slate-200 bg-white p-6">
          <div className="mb-6">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-xl font-semibold">{t.dashboard.diyPathTitle}</h2>
              <span className="text-sm font-medium text-slate-600">
                {t.dashboard.progressLabel}: {completedModules}/{dashboardModules.length}
              </span>
            </div>
            <ProgressBar className="mt-4" value={moduleProgress} />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {dashboardModules.map((module) => {
              const status = moduleStatuses[module.key];

              return (
                <article className="rounded-md border border-slate-200 p-4" key={module.key}>
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-semibold">{module.title}</h3>
                    <Badge tone={statusTone[status]}>{statusLabels[status]}</Badge>
                  </div>
                  <p className="mt-2 text-sm text-slate-600">{module.description}</p>
                  <Button
                    className="mt-4 h-9"
                    onClick={() => dispatch(cycleModuleStatus({ moduleId: module.key }))}
                    variant="secondary"
                  >
                    {t.common.next}
                  </Button>
                </article>
              );
            })}
          </div>
        </section>
      )}
    </main>
  );
}
