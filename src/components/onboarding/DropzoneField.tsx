import { ImagePlus } from "lucide-react";
import { useRef } from "react";

import { Button } from "../common/Button";
import { UploadPreview } from "./UploadPreview";
import { cn } from "../../lib/cn";

type DropzoneFieldProps = {
  buttonLabel: string;
  error?: string;
  helperText: string;
  id: string;
  label: string;
  placeholder: string;
  previewUrl?: string;
  replaceLabel: string;
  onFileSelect: (file: File) => void;
};

export function DropzoneField({
  buttonLabel,
  error,
  helperText,
  id,
  label,
  onFileSelect,
  placeholder,
  previewUrl,
  replaceLabel,
}: DropzoneFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const errorId = `${id}-error`;

  return (
    <div className="grid gap-2">
      <span className="text-sm font-semibold text-slate-700">{label}</span>
      <div
        className={cn(
          "flex flex-col gap-4 rounded-lg border border-dashed p-4 sm:flex-row sm:items-center",
          error ? "border-rose-400 bg-rose-50" : "border-slate-300 bg-slate-50",
        )}
      >
        <UploadPreview emptyLabel={placeholder} imageUrl={previewUrl} />
        <div className="flex-1">
          <p className="text-sm leading-6 text-slate-600">{helperText}</p>
          <input
            accept="image/jpeg,image/png,image/webp"
            aria-describedby={error ? errorId : undefined}
            aria-invalid={Boolean(error)}
            className="sr-only"
            id={id}
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) onFileSelect(file);
              event.target.value = "";
            }}
            ref={inputRef}
            type="file"
          />
          <Button
            className="mt-4"
            onClick={() => inputRef.current?.click()}
            variant="secondary"
          >
            <ImagePlus aria-hidden="true" className="size-4" />
            {previewUrl ? replaceLabel : buttonLabel}
          </Button>
        </div>
      </div>
      {error && (
        <p className="text-sm font-medium text-rose-700" id={errorId}>
          {error}
        </p>
      )}
    </div>
  );
}
