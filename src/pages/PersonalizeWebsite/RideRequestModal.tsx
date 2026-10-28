import { useState, type FormEvent, type ReactNode } from "react";
import { Loader2, X } from "lucide-react";
import {
  RIDE_REQUEST_DISCLAIMER,
  type CreateRideRequestPayload,
} from "../../store/api/Business/business.type";
import { useCreatePublicRideRequestMutation } from "../../store/api/Business/business.api";

type RideRequestModalProps = {
  open: boolean;
  onClose: () => void;
  businessSlug: string;
  businessName: string;
};

const emptyForm: CreateRideRequestPayload = {
  customerName: "",
  customerEmail: "",
  customerPhone: "",
  pickupLocation: "",
  destination: "",
  requestedDate: "",
  requestedTime: "",
  passengerCount: 1,
  notes: "",
};

export function RideRequestModal({
  open,
  onClose,
  businessSlug,
  businessName,
}: RideRequestModalProps) {
  const [form, setForm] = useState<CreateRideRequestPayload>(emptyForm);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [correlationId, setCorrelationId] = useState<string | null>(null);
  const [submitRideRequest, { isLoading }] = useCreatePublicRideRequestMutation();

  if (!open) return null;

  const updateField = <K extends keyof CreateRideRequestPayload>(
    key: K,
    value: CreateRideRequestPayload[K],
  ) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleClose = () => {
    setError(null);
    setSuccessMessage(null);
    setCorrelationId(null);
    setForm(emptyForm);
    onClose();
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    try {
      const result = await submitRideRequest({
        slug: businessSlug,
        body: {
          ...form,
          customerName: form.customerName.trim(),
          customerEmail: form.customerEmail.trim(),
          customerPhone: form.customerPhone.trim(),
          pickupLocation: form.pickupLocation.trim(),
          destination: form.destination.trim(),
          notes: form.notes?.trim() || undefined,
          passengerCount: Number(form.passengerCount),
        },
      }).unwrap();
      setSuccessMessage(result.disclaimer || RIDE_REQUEST_DISCLAIMER);
      setCorrelationId(result.correlationId);
    } catch (submitError) {
      const message =
        typeof submitError === "object" &&
        submitError &&
        "data" in submitError &&
        typeof (submitError as { data?: { message?: string | string[] } }).data?.message === "string"
          ? (submitError as { data: { message: string } }).data.message
          : typeof submitError === "object" &&
              submitError &&
              "data" in submitError &&
              Array.isArray((submitError as { data?: { message?: string[] } }).data?.message)
            ? (submitError as { data: { message: string[] } }).data.message.join(" ")
            : "We could not send your ride request. Please try again or call the business.";
      setError(message);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center bg-black/70 p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ride-request-title"
    >
      <div className="w-full sm:max-w-lg max-h-[92vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl bg-white text-slate-900 shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4">
          <div>
            <h2 id="ride-request-title" className="text-lg font-bold text-slate-900">
              Request a ride
            </h2>
            <p className="text-sm text-slate-500">{businessName}</p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close ride request form"
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {successMessage ? (
          <div className="space-y-4 px-5 py-6">
            <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-900">
              {successMessage}
            </p>
            {correlationId ? (
              <p className="text-xs text-slate-500">Request ID: {correlationId}</p>
            ) : null}
            <button
              type="button"
              onClick={handleClose}
              className="w-full rounded-xl bg-[var(--qta-public-accent,#4bae4f)] px-4 py-3 text-sm font-bold text-white"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 px-5 py-5">
            <Field label="Full name" required>
              <input
                required
                value={form.customerName}
                onChange={(event) => updateField("customerName", event.target.value)}
                className="field"
                maxLength={120}
              />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Email" required>
                <input
                  required
                  type="email"
                  value={form.customerEmail}
                  onChange={(event) => updateField("customerEmail", event.target.value)}
                  className="field"
                  maxLength={254}
                />
              </Field>
              <Field label="Phone" required>
                <input
                  required
                  value={form.customerPhone}
                  onChange={(event) => updateField("customerPhone", event.target.value)}
                  className="field"
                  placeholder="(555) 555-5555"
                  maxLength={32}
                />
              </Field>
            </div>
            <Field label="Pickup location" required>
              <input
                required
                value={form.pickupLocation}
                onChange={(event) => updateField("pickupLocation", event.target.value)}
                className="field"
                maxLength={300}
              />
            </Field>
            <Field label="Destination" required>
              <input
                required
                value={form.destination}
                onChange={(event) => updateField("destination", event.target.value)}
                className="field"
                maxLength={300}
              />
            </Field>
            <div className="grid gap-4 sm:grid-cols-3">
              <Field label="Date" required>
                <input
                  required
                  type="date"
                  value={form.requestedDate}
                  onChange={(event) => updateField("requestedDate", event.target.value)}
                  className="field"
                />
              </Field>
              <Field label="Time" required>
                <input
                  required
                  type="time"
                  value={form.requestedTime}
                  onChange={(event) => updateField("requestedTime", event.target.value)}
                  className="field"
                />
              </Field>
              <Field label="Passengers" required>
                <input
                  required
                  type="number"
                  min={1}
                  max={20}
                  value={form.passengerCount}
                  onChange={(event) =>
                    updateField("passengerCount", Number(event.target.value) || 1)
                  }
                  className="field"
                />
              </Field>
            </div>
            <Field label="Notes / special instructions">
              <textarea
                value={form.notes}
                onChange={(event) => updateField("notes", event.target.value)}
                className="field min-h-[88px] resize-y"
                maxLength={1000}
              />
            </Field>

            <p className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-xs leading-relaxed text-slate-600">
              {RIDE_REQUEST_DISCLAIMER}
            </p>

            {error ? (
              <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--qta-public-accent,#4bae4f)] px-4 py-3 text-sm font-bold uppercase tracking-wide text-white disabled:opacity-60"
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {isLoading ? "Sending request..." : "Send ride request"}
            </button>
          </form>
        )}
      </div>
      <style>{`
        .field {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid #e2e8f0;
          background: #fff;
          padding: 0.65rem 0.85rem;
          font-size: 0.875rem;
          color: #0f172a;
        }
        .field:focus {
          outline: 2px solid color-mix(in srgb, var(--qta-public-accent, #4bae4f) 35%, white);
          border-color: var(--qta-public-accent, #4bae4f);
        }
      `}</style>
    </div>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5 text-left">
      <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
        {required ? " *" : ""}
      </span>
      {children}
    </label>
  );
}
