import { CheckCircle2, Circle, RotateCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Badge } from "../components/common/Badge";
import { Button } from "../components/common/Button";
import { ProgressBar } from "../components/common/ProgressBar";
import {
  resetDemo,
  setDfyPipelineStep,
  updateModuleStatus,
  type ModuleStatus,
} from "../features/appFlow/appFlowSlice";
import { dashboardModules, dfyPipeline } from "../features/dashboard/dashboardContent";

const statusTone: Record<ModuleStatus, "neutral" | "success" | "warning" | "accent"> = {
  locked: "neutral",
  available: "accent",
  "in-progress": "warning",
  complete: "success",
};

export default function DashboardPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    activeFunnel,
    dfyPipelineStep,
    driverProfile,
    hasDfyUpgrade,
    moduleStatuses,
  } = useAppSelector((state) => state.appFlow);

  const completedModules = Object.values(moduleStatuses).filter(
    (status) => status === "complete",
  ).length;
  const moduleProgress = (completedModules / dashboardModules.length) * 100;
  const activePipelineIndex = dfyPipeline.findIndex((step) => step.key === dfyPipelineStep);

  const markNextPipelineStep = () => {
    const nextStep = dfyPipeline[Math.min(activePipelineIndex + 1, dfyPipeline.length - 1)];
    dispatch(setDfyPipelineStep(nextStep.key));
  };

  const handleReset = () => {
    dispatch(resetDemo());
    navigate("/standard");
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <Badge tone={hasDfyUpgrade ? "success" : "accent"}>
            {hasDfyUpgrade ? "DFY delivery" : "DIY modules"}
          </Badge>
          <h1 className="mt-3 text-3xl font-bold">Launch dashboard</h1>
          <p className="mt-2 text-slate-600">
            {driverProfile?.name || "Driver"}, your {activeFunnel} launch workspace is ready.
          </p>
        </div>
        <Button onClick={handleReset} variant="secondary">
          <RotateCcw aria-hidden="true" className="size-4" />
          Reset demo
        </Button>
      </div>

      {hasDfyUpgrade ? (
        <section className="mt-8 rounded-lg border border-slate-200 bg-white p-6">
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-semibold">DFY delivery pipeline</h2>
              <p className="mt-1 text-sm text-slate-600">
                Track the staged buildout for your launch package.
              </p>
            </div>
            <Button onClick={markNextPipelineStep}>Advance pipeline</Button>
          </div>

          <div className="grid gap-4 md:grid-cols-5">
            {dfyPipeline.map((step, index) => {
              const isActive = step.key === dfyPipelineStep;
              const isComplete = index < activePipelineIndex;

              return (
                <article
                  className="rounded-md border border-slate-200 bg-slate-50 p-4"
                  key={step.key}
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
              <h2 className="text-xl font-semibold">DIY launch modules</h2>
              <span className="text-sm font-medium text-slate-600">
                {completedModules}/{dashboardModules.length} complete
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
                    <Badge tone={statusTone[status]}>{status}</Badge>
                  </div>
                  <p className="mt-2 text-sm text-slate-600">{module.description}</p>
                  <Button
                    className="mt-4 h-9"
                    disabled={status === "locked"}
                    onClick={() =>
                      dispatch(updateModuleStatus({ module: module.key, status: "complete" }))
                    }
                    variant="secondary"
                  >
                    Mark complete
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
