import { ProgressBar } from "../common/ProgressBar";

interface DfyProgressProps {
  value: number;
}

export function DfyProgress({ value }: DfyProgressProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
        <span>Overall progress</span>
        <span>{value}%</span>
      </div>
      <ProgressBar value={value} />
    </div>
  );
}

