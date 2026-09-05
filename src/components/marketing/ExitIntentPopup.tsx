import { useEffect, useState } from "react";
import { Building2, CheckCircle2, Loader2, Phone, X } from "lucide-react";
import { useCreatePublicLeadMutation } from "../../store/api/Business/business.api";
import type { CreatePublicLeadRequest } from "../../store/api/Business/business.type";
import {
  CONSENT_TEXT_VERSION,
  ENGLISH_CONSENT_TEXT,
  SPANISH_CONSENT_TEXT,
  normalizeCity,
  normalizeConsent,
  normalizeUsPhone,
  overwriteLastTouchAttribution,
} from "./exitIntentLogic";
import { getOrCreateMarketingSessionId, readMarketingAttribution } from "../../lib/storage";
import type { ExitIntentRouteConfig } from "./exitIntentConfig";

interface ExitIntentPopupProps {
  config: ExitIntentRouteConfig;
  onClose: () => void;
}



export function ExitIntentPopup({ config, onClose }: ExitIntentPopupProps) {
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [consent, setConsent] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitLead, { isLoading }] = useCreatePublicLeadMutation();
  const consentText = config.locale === "es" ? SPANISH_CONSENT_TEXT : ENGLISH_CONSENT_TEXT;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const submitLeadAction = async () => {
    const normalizedPhone = normalizeUsPhone(phone);
    const normalizedCity = normalizeCity(city);
    if (!normalizedCity) {
      throw new Error("City is required.");
    }
    if (!normalizeConsent(consent)) {
      throw new Error("Please agree to receive text messages related to your request.");
    }

    const attribution = readMarketingAttribution() || overwriteLastTouchAttribution({ sourcePage: config.sourcePage });
    const request: CreatePublicLeadRequest = {
      phone: normalizedPhone,
      city: normalizedCity,
      sourcePage: config.sourcePage,
      sessionId: getOrCreateMarketingSessionId() || crypto.randomUUID(),
      utmSource: attribution.utmSource || null,
      utmMedium: attribution.utmMedium || null,
      utmCampaign: attribution.utmCampaign || null,
      utmTerm: attribution.utmTerm || null,
      utmContent: attribution.utmContent || null,
      referrer: attribution.referrer || null,
      smsConsent: true,
      consentTextVersion: CONSENT_TEXT_VERSION,
    };

    try {
      await submitLead(request).unwrap();
    } catch (apiError: unknown) {
      const errorData = (apiError as { data?: { message?: string | string[]; error?: string } })?.data || (apiError as { message?: string | string[]; error?: string });
      const message = Array.isArray(errorData?.message)
        ? errorData.message.join(" ")
        : errorData?.message || errorData?.error || "Unable to submit the form.";
      throw new Error(message, { cause: apiError });
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValidationError(null);
    setSubmissionError(null);

    try {
      await submitLeadAction();
      setSubmitted(true);
    } catch (error) {
      setSubmissionError(
        error instanceof Error
          ? error.message
          : "Unable to submit the form."
      );
    }
  };

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/70 p-3 sm:p-5"
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-intent-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 sm:p-8 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close popup"
          className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 sm:right-5 sm:top-5"
        >
          <X className="h-5 w-5" strokeWidth={1.5} />
        </button>

        {submitted ? (
          <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
            <CheckCircle2 className="mb-4 h-14 w-14 text-[#2aa84a]" strokeWidth={1.5} />
            <h2 className="text-2xl font-bold leading-tight text-[#121212] sm:text-3xl">
              Thanks — your request was received.
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-500">
              We’ll send the requested checklist or guide to the phone number provided.
            </p>
            <button type="button" onClick={onClose} className="mt-7 rounded-lg bg-[#2aa84a] px-8 py-2.5 text-sm font-semibold text-white hover:bg-[#23913f] transition-colors">
              Close
            </button>
          </div>
        ) : (
          <>
            <h2 id="exit-intent-title" className="pr-6 text-2xl font-bold leading-tight tracking-tight text-[#121212] sm:text-[28px]">
              {config.headline}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[#666]">
              {config.subhead}
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <label className="block text-sm font-semibold text-[#171717]">
                {config.locale === "es" ? "Número de teléfono" : "Phone Number"}<span className="text-red-500">*</span>
                <span className="relative mt-1.5 block">
                  <Phone className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" strokeWidth={1.5} />
                  <input
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel-national"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    placeholder="(512) 555-5789"
                    aria-label="Phone number"
                    className="h-12 w-full rounded-lg border border-slate-200 pl-11 pr-4 text-sm outline-none transition focus:border-[#2aa84a] focus:ring-1 focus:ring-[#2aa84a]"
                  />
                </span>
              </label>
              <label className="block text-sm font-semibold text-[#171717]">
                {config.locale === "es" ? "Ciudad" : "City"}<span className="text-red-500">*</span>
                <span className="relative mt-1.5 block">
                  <Building2 className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" strokeWidth={1.5} />
                  <input
                    value={city}
                    onChange={(event) => setCity(event.target.value)}
                    autoComplete="address-level2"
                    placeholder="San Francisco"
                    aria-label="City"
                    className="h-12 w-full rounded-lg border border-slate-200 pl-11 pr-4 text-sm outline-none transition focus:border-[#2aa84a] focus:ring-1 focus:ring-[#2aa84a]"
                  />
                </span>
              </label>
              <label className="flex items-start gap-3 pt-2 text-sm leading-snug text-slate-500">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(event) => setConsent(event.target.checked)}
                  className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 accent-[#2aa84a]"
                />
                <span>{consentText}</span>
              </label>
              {(validationError || submissionError) && <p className="text-sm font-medium text-red-500">{validationError || submissionError}</p>}
              <button type="submit" disabled={isLoading} className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#2aa84a] text-sm font-semibold text-white transition hover:bg-[#23913f] disabled:cursor-not-allowed disabled:opacity-60 shadow-sm">
                {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                {config.submitLabel}
              </button>
            </form>
            <p className="mt-6 text-center text-sm text-slate-400">{config.microcopy}</p>
          </>
        )}
      </div>
    </div>
  );
}
