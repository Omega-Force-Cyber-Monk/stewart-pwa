import { cn } from "../../lib/cn";

type TextFieldProps = {
  error?: string;
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
};

export function TextField({
  error,
  id,
  label,
  onChange,
  placeholder,
  value,
}: TextFieldProps) {
  const errorId = `${id}-error`;

  return (
    <div className="grid gap-2">
      <label className="text-sm font-semibold text-slate-700" htmlFor={id}>
        {label}
      </label>
      <input
        aria-describedby={error ? errorId : undefined}
        aria-invalid={Boolean(error)}
        className={cn(
          "h-11 rounded-md border px-3 text-sm outline-none transition focus:ring-2",
          error
            ? "border-rose-400 focus:border-rose-500 focus:ring-rose-100"
            : "border-slate-300 focus:border-cyan-600 focus:ring-cyan-100",
        )}
        id={id}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        type="text"
        value={value}
      />
      {error && (
        <p className="text-sm font-medium text-rose-700" id={errorId}>
          {error}
        </p>
      )}
    </div>
  );
}
