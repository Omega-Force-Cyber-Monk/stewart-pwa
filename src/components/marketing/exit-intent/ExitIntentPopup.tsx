import { useEffect, useState } from "react";
import { CheckCircle2, Gift, X, Phone, MapPin, User, Mail, Lock, Loader2 } from "lucide-react";
import type { ExitIntentRouteConfig } from "./exitIntentConfig";
import { ENGLISH_CONSENT_TEXT, SPANISH_CONSENT_TEXT, normalizeCity, normalizeConsent, normalizeUsPhone, CONSENT_TEXT_VERSION } from "./exitIntentLogic";
import { useCreatePublicLeadMutation } from "../../../store/api/Business/business.api";
import { getOrCreateMarketingSessionId } from "../../../lib/storage";

interface ExitIntentPopupProps {
  config: ExitIntentRouteConfig;
  onClose: () => void;
}

export function ExitIntentPopup({ config, onClose }: ExitIntentPopupProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [consent, setConsent] = useState(true);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  
  const [createPublicLead, { isLoading }] = useCreatePublicLeadMutation();

  const consentText = config.locale === "es" ? SPANISH_CONSENT_TEXT : ENGLISH_CONSENT_TEXT;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const submitLead = async () => {
    const isSpanish = config.locale === "es";
    const normalizedPhone = normalizeUsPhone(phone);

    let normalizedCity = "";
    if (config.fields.includes("city")) {
      normalizedCity = normalizeCity(city);
      if (!normalizedCity) {
        throw new Error(isSpanish ? "Se requiere la ciudad." : "City is required.");
      }
    }

    if (!normalizeConsent(consent)) {
      throw new Error(
        isSpanish
          ? "Acepta recibir mensajes de texto."
          : "Please agree to receive text messages related to your request."
      );
    }

    const payload = {
      phone: normalizedPhone,
      city: config.fields.includes("city") ? normalizedCity : undefined,
      name: config.fields.includes("name") ? name.trim() : undefined,
      email: config.fields.includes("email") ? email.trim() : undefined,
      sourcePage: config.sourcePage,
      sessionId: getOrCreateMarketingSessionId() || crypto.randomUUID(),
      smsConsent: true as const,
      consentTextVersion: CONSENT_TEXT_VERSION,
      referrer: document.referrer || null,
      utmSource: null,
      utmMedium: null,
      utmCampaign: null,
      utmTerm: null,
      utmContent: null,
    };

    try {
      await createPublicLead(payload).unwrap();
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

    try {
      await submitLead();
      setSubmitted(true);
    } catch (error) {
      setValidationError(
        error instanceof Error
          ? error.message
          : "Unable to submit the form."
      );
    }
  };

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/70 p-3 sm:p-5 backdrop-blur-sm" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="relative w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 sm:p-8 shadow-2xl animate-in fade-in zoom-in duration-200">
        <button type="button" onClick={onClose} className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition">
          <X className="h-5 w-5" />
        </button>

        {submitted ? (
          <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
            <CheckCircle2 className="mb-4 h-16 w-16 text-green-500" />
            <h2 className="text-2xl font-bold text-slate-800">
              {config.locale === "es" ? "¡Gracias! Recibimos tu solicitud." : "Thanks — your request was received."}
            </h2>
            <button type="button" onClick={onClose} className="mt-7 rounded-lg bg-green-500 hover:bg-green-600 px-8 py-3 text-white font-bold transition">
              {config.locale === "es" ? "Cerrar" : "Close"}
            </button>
          </div>
        ) : (
          <>
            {/* Header Section */}
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex flex-col md:flex-row items-center gap-4 mb-6 text-center md:text-left">
              <div className={`${config.theme.iconBg} text-white rounded-full p-4 shrink-0 shadow-md`}>
                <Gift className="size-10" strokeWidth={1.5} />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-slate-800 leading-tight">
                  {config.headline}
                </h2>
                <p className="text-slate-600 font-medium text-sm md:text-base mt-1">
                  {config.subhead}
                </p>
              </div>
            </div>

            {/* Form Section */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {config.fields.includes("name") && (
                  <div className="col-span-1">
                    <label className="block text-sm font-semibold text-slate-700 mb-1">
                      {config.locale === "es" ? "Nombre completo" : "Full Name"}<span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="size-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={config.locale === "es" ? "Tu nombre" : "Your name"}
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-gray-700"
                      />
                    </div>
                  </div>
                )}
                
                {config.fields.includes("phone") && (
                  <div className="col-span-1">
                    <label className="block text-sm font-semibold text-slate-700 mb-1">
                      {config.locale === "es" ? "Teléfono" : "Phone Number"}<span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="size-5 text-gray-400" />
                      </div>
                      <input
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel-national"
                        required
                        value={phone}
                        onChange={(event) => setPhone(event.target.value)}
                        placeholder="(512) 555-5789"
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-gray-700"
                      />
                    </div>
                  </div>
                )}

                {config.fields.includes("city") && (
                  <div className="col-span-1">
                    <label className="block text-sm font-semibold text-slate-700 mb-1">
                      City<span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPin className="size-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="San Francisco"
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-gray-700"
                      />
                    </div>
                  </div>
                )}
                
                {config.fields.includes("email") && (
                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-sm font-semibold text-slate-700 mb-1">
                      {config.locale === "es" ? "Correo electrónico" : "Email Address"}<span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="size-5 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={config.locale === "es" ? "tu@email.com" : "you@email.com"}
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-gray-700"
                      />
                    </div>
                  </div>
                )}
              </div>

              <label className="flex items-center gap-2 mt-4 cursor-pointer">
                <div
                  className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${
                    consent ? "bg-blue-600 border-blue-600" : "bg-white border-gray-300"
                  }`}
                  onClick={() => setConsent(!consent)}
                >
                  {consent && <CheckCircle2 className="text-white size-3.5" strokeWidth={3} />}
                </div>
                <span className="text-sm font-medium text-slate-700 select-none">
                  {consentText}
                </span>
              </label>

              {validationError && <p className="text-red-500 text-sm mt-2 font-semibold">{validationError}</p>}

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full mt-4 py-4 rounded-xl flex items-center justify-center gap-2 text-white font-bold text-lg shadow-lg transition-all ${config.theme.buttonBg} ${isLoading ? "opacity-75 cursor-not-allowed" : ""}`}
              >
                {isLoading ? (
                  <Loader2 className="size-6 animate-spin" />
                ) : (
                  <>
                    <Gift className="size-6" />
                    <span>{config.submitLabel}</span>
                    <span className="font-normal text-2xl leading-none ml-1">→</span>
                  </>
                )}
              </button>
              
              <div className="flex items-center justify-center gap-2 mt-4 text-gray-500">
                <Lock className="size-4" />
                <span className="text-sm font-medium">{config.microcopy}</span>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
