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
  normalizePhone,
  overwriteLastTouchAttribution,
} from "./exitIntentLogic";
import { getOrCreateMarketingSessionId, readMarketingAttribution } from "../../lib/storage";
import type { ExitIntentRouteConfig } from "./exitIntentConfig";

interface ExitIntentPopupProps {
  config: ExitIntentRouteConfig;
  onClose: () => void;
}

function getSubmissionError(error: unknown): string {
  if (error && typeof error === "object" && "data" in error) {
    const data = (error as { data?: { message?: string | string[] } }).data;
    if (Array.isArray(data?.message)) return data.message[0] || "Unable to submit your request.";
    if (data?.message) return data.message;
  }
  return "Unable to submit your request. Please try again.";
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValidationError(null);
    setSubmissionError(null);

    const normalizedPhone = normalizePhone(phone);
    const normalizedCity = normalizeCity(city);
    if (!normalizedPhone) {
      setValidationError("Enter a valid 10-digit phone number.");
      return;
    }
    if (!normalizedCity) {
      setValidationError("City is required.");
      return;
    }
    if (!normalizeConsent(consent)) {
      setValidationError("Please agree to receive text messages related to your request.");
      return;
    }

    const attribution = readMarketingAttribution() || overwriteLastTouchAttribution({ sourcePage: config.sourcePage });
    const request: CreatePublicLeadRequest = {
      phone: normalizedPhone,
      city: normalizedCity,
      sourcePage: config.sourcePage,
      sessionId: getOrCreateMarketingSessionId(),
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
      setSubmitted(true);
    } catch (error) {
      setSubmissionError(getSubmissionError(error));
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
      <div className="relative w-full max-w-[724px] overflow-y-auto rounded-[26px] bg-white px-7 py-9 shadow-2xl sm:px-9 sm:py-12 md:px-10 md:py-12">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close popup"
          className="absolute right-7 top-7 rounded-lg p-1 text-slate-900 transition hover:bg-slate-100 sm:right-9 sm:top-9"
        >
          <X className="h-6 w-6" strokeWidth={1.5} />
        </button>

        {submitted ? (
          <div className="flex min-h-[430px] flex-col items-center justify-center text-center">
            <CheckCircle2 className="mb-5 h-16 w-16 text-[#2aa84a]" strokeWidth={1.5} />
            <h2 className="max-w-xl text-3xl font-bold leading-tight text-[#121212] sm:text-4xl">
              Thanks — your request was received.
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-7 text-slate-500">
              We’ll send the requested checklist or guide to the phone number provided.
            </p>
            <button type="button" onClick={onClose} className="mt-9 rounded-lg bg-[#2aa84a] px-8 py-3 text-sm font-semibold text-white hover:bg-[#23913f]">
              Close
            </button>
          </div>
        ) : (
          <>
            <h2 id="exit-intent-title" className="max-w-[600px] pr-8 text-3xl font-bold leading-[1.2] tracking-tight text-[#121212] sm:text-[36px]">
              {config.headline}
            </h2>
            <p className="mt-5 max-w-[635px] text-lg leading-6 text-[#929292] sm:text-[19px]">
              {config.subhead}
            </p>

            <form onSubmit={handleSubmit} className="mt-9 space-y-4">
              <label className="block text-base font-medium text-[#171717]">
                {config.locale === "es" ? "Número de teléfono" : "Phone Number"}<span className="text-red-500">*</span>
                <span className="relative mt-2 block">
                  <Phone className="pointer-events-none absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2 text-[#111]" strokeWidth={1.5} />
                  <input
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="(415) 555-0134"
                    aria-label="Phone number"
                    className="h-[54px] w-full rounded-lg border border-[#dedede] pl-14 pr-4 text-base outline-none transition focus:border-[#2aa84a] focus:ring-2 focus:ring-green-100"
                  />
                </span>
              </label>
              <label className="block text-base font-medium text-[#171717]">
                {config.locale === "es" ? "Ciudad" : "City"}<span className="text-red-500">*</span>
                <span className="relative mt-2 block">
                  <Building2 className="pointer-events-none absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2 text-[#111]" strokeWidth={1.5} />
                  <input
                    value={city}
                    onChange={(event) => setCity(event.target.value)}
                    autoComplete="address-level2"
                    placeholder="San Francisco"
                    aria-label="City"
                    className="h-[54px] w-full rounded-lg border border-[#dedede] pl-14 pr-4 text-base outline-none transition focus:border-[#2aa84a] focus:ring-2 focus:ring-green-100"
                  />
                </span>
              </label>
              <label className="flex items-start gap-4 pt-3 text-base leading-6 text-[#4d607b]">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(event) => setConsent(event.target.checked)}
                  className="mt-0.5 h-5 w-5 shrink-0 rounded border-slate-300 accent-[#2aa84a]"
                />
                <span>{consentText}</span>
              </label>
              {(validationError || submissionError) && <p className="text-sm font-medium text-red-600">{validationError || submissionError}</p>}
              <button type="submit" disabled={isLoading} className="mt-4 flex h-[58px] w-full items-center justify-center gap-2 rounded-lg bg-[#2aa84a] text-base font-medium text-white transition hover:bg-[#23913f] disabled:cursor-not-allowed disabled:opacity-60">
                {isLoading && <Loader2 className="h-5 w-5 animate-spin" />}
                {config.submitLabel}
              </button>
            </form>
            <p className="mt-9 text-center text-lg text-[#4d607b]">{config.microcopy}</p>
          </>
        )}
      </div>
    </div>
  );
}
