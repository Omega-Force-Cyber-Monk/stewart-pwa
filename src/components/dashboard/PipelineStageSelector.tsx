import { DashboardCard } from "../layout/DashboardCard";
import type { PipelineStep } from "../../features/dashboard/dfyPipelineTypes";

type PipelineStageSelectorProps = {
  currentStep: number;
  steps: PipelineStep[];
  onChange: (stepIndex: number) => void;
};

export function PipelineStageSelector({
  currentStep,
  onChange,
  steps,
}: PipelineStageSelectorProps) {
  return (
    <DashboardCard as="section">
      <label className="grid gap-2">
        <span className="text-sm font-bold text-slate-950">Current Project Stage</span>
        <select
          aria-label="Current Project Stage"
          className="h-11 cursor-pointer rounded-md border border-slate-300 bg-white px-3 text-sm font-semibold text-slate-800 outline-none transition focus:border-cyan-600 focus:ring-2 focus:ring-cyan-100"
          onChange={(event) => onChange(Number(event.target.value))}
          value={currentStep}
        >
          {steps.map((step, index) => (
            <option key={step.id} value={index}>
              {step.title}
            </option>
          ))}
        </select>
      </label>
    </DashboardCard>
  );
}
