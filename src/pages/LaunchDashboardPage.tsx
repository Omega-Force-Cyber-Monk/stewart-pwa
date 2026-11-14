import { useLanguage } from "../i18n/LanguageProvider";
import { useEffect, useRef, useState } from "react";
import {
  AlertCircle,
  Check,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Loader2,
  MapPin,
  Pencil,
  Plane,
  Rocket,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { LaunchProgressStepper } from "../components/dashboard/LaunchProgressStepper";
import { useGetRiderProfileQuery } from "../store/api/Auth/auth.api";
import {
  useCompleteLaunchMutation,
  useGetFinalReviewQuery,
  useGetLaunchReadinessQuery,
  useGetSetupStateQuery,
  useInitializeSetupMutation,
  useLazyGetAirportSuggestionsQuery,
  useLazyGetRiderDashboardQuery,
  useUpdateSetupStateMutation,
  useUploadBusinessLogoMutation,
} from "../store/api/Business/business.api";
import type { AirportOption, AirportSuggestion } from "../store/api/Business/business.type";
import { trackOnboardingCompleted } from "../lib/gtmEvents";

const stepTitles = ["Buyer Information", "Business Information", "Service Area", "Final Review"];
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ApiError = { data?: { message?: string | string[] | { message?: string }; missingRequirements?: string[] } };

function errorMessage(error: unknown) {
  const payload = (error as ApiError)?.data;
  const rawMsg = payload?.message;
  const message = Array.isArray(rawMsg)
    ? rawMsg.join(", ")
    : typeof rawMsg === "string"
      ? rawMsg
      : rawMsg?.message;
  if (payload?.missingRequirements?.length) return `${message || "Business is not ready for launch."} Missing: ${payload.missingRequirements.join(", ")}`;
  return message || "Something went wrong. Please try again.";
}

function Field({ label, value, onChange, type = "text", required = false, placeholder }: { label: string; value: string; onChange: (value: string) => void; type?: string; required?: boolean; placeholder?: string }) {
  const { t } = useLanguage();
  return (
    <label className="block text-sm font-medium text-slate-700">
      <span>{t(label)}{required && <span className="text-red-500">*</span>}</span>
      <input
        required={required}
        type={type}
        value={value}
        placeholder={t(placeholder)}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-dashboard-rider focus:ring-2 focus:ring-green-100"
      />
    </label>
  );
}

export default function LaunchDashboardPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { data: profile, refetch: refetchProfile } = useGetRiderProfileQuery();
  const { data: setupResponse, isLoading } = useGetSetupStateQuery();
  const [initializeSetup] = useInitializeSetupMutation();
  const [updateSetup, { isLoading: isSaving }] = useUpdateSetupStateMutation();
  const [uploadLogo] = useUploadBusinessLogoMutation();
  const { data: readiness } = useGetLaunchReadinessQuery();
  const [completeLaunch, { isLoading: isLaunching }] = useCompleteLaunchMutation();
  const [triggerGetDashboard] = useLazyGetRiderDashboardQuery();
  const [step, setStep] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [buyer, setBuyer] = useState({ fullName: "", email: "", phone: "" });
  const [business, setBusiness] = useState({ businessName: "", email: "", phone: "", businessInfo: "", logoUrl: "" });
  const [acuity, setAcuity] = useState({ connected: false, bookingUrl: "" });
  const [serviceArea, setServiceArea] = useState({ cityArea: "", airports: [] as string[] });
  const [airportSearch, setAirportSearch] = useState("");
  const [suggestions, setSuggestions] = useState<AirportSuggestion[]>([]);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const logoInputRef = useRef<HTMLInputElement | null>(null);
  const submissionInFlightRef = useRef(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [getAirportSuggestions] = useLazyGetAirportSuggestionsQuery();
  const { data: finalReview } = useGetFinalReviewQuery(undefined, { skip: step !== 4 });
  const { language } = useLanguage();
  const spanish = language === 'es';
  const locationText = spanish ? {
    city: "Ciudad o \u00e1rea metropolitana", cityHint: "Escribe tu ciudad real. Los aeropuertos se seleccionan por separado.",
    cityPlaceholder: "Por ejemplo: Naples, FL", airports: "Aeropuertos que atiendes",
    airportHint: "Busca por ciudad o c\u00f3digo y selecciona cada aeropuerto por separado.",
    airportPlaceholder: "Busca una ciudad o un c\u00f3digo de aeropuerto", required: "Ingresa tu ciudad y selecciona al menos un aeropuerto.",
    invalid: "No se pudo guardar. Ingresa una ciudad v\u00e1lida (m\u00e1ximo 160 caracteres) y c\u00f3digos de aeropuerto admitidos.",
    remove: "Eliminar", back: "Atr\u00e1s", save: "Guardar y continuar",
  } : {
    city: "City or Metro Area", cityHint: "Enter your actual service city. Select airports separately.",
    cityPlaceholder: "For example: Naples, FL", airports: "Airports Served",
    airportHint: "Search by city or code and select each airport individually.",
    airportPlaceholder: "Search a city or airport code", required: "City and at least one airport are required.",
    invalid: "Enter a valid city (maximum 160 characters) and supported airport codes.",
    remove: "Remove", back: "Back", save: "Save & Continue",
  };
  const addonOwned = profile?.purchase?.addon ?? false;

  useEffect(() => {
    if (!setupResponse?.data || hydrated) return;
    const data = setupResponse.data;
    setBuyer({ fullName: data.buyer.fullName || "", email: data.buyer.email || "", phone: data.buyer.phone || "" });
    setBusiness({ businessName: data.business.businessName || "", email: data.business.email || "", phone: data.business.phone || "", businessInfo: data.business.businessInfo || "", logoUrl: data.business.logoUrl || "" });
    setAcuity({ connected: data.acuity.connected, bookingUrl: data.acuity.bookingUrl || "" });
    setServiceArea({ cityArea: data.serviceArea.cityArea || "", airports: data.serviceArea.airports || [] });
    setStep(new URLSearchParams(window.location.search).get("step") === "3" ? 3 : Math.min(4, Math.max(1, data.progress.currentStep || 1)));
    setHydrated(true);
  }, [hydrated, setupResponse]);

  useEffect(() => {
    initializeSetup().catch(() => undefined);
  }, [initializeSetup]);

  const runSubmission = async (action: () => Promise<void>) => {
    if (submissionInFlightRef.current) return;
    submissionInFlightRef.current = true;
    setIsSubmitting(true);
    try {
      await action();
    } finally {
      submissionInFlightRef.current = false;
      setIsSubmitting(false);
    }
  };

  const save = async (section: Parameters<typeof updateSetup>[0]) => {
    setError(null);
    try {
      const response = await updateSetup(section).unwrap();
      setStep(Math.min(4, Math.max(1, response.data.progress.currentStep || step + 1)));
    } catch (cause) {
      setError(spanish && section.serviceArea ? locationText.invalid : errorMessage(cause));
    }
  };

  const submitBuyer = async (event: React.FormEvent) => {
    event.preventDefault();
    const normalizedBuyer = {
      fullName: buyer.fullName.trim(),
      email: buyer.email.trim(),
      phone: buyer.phone.trim(),
    };
    if (!normalizedBuyer.fullName || !emailPattern.test(normalizedBuyer.email) || !normalizedBuyer.phone) {
      setError("Enter your full name, a valid email address, and phone number.");
      return;
    }
    await runSubmission(() => save({ buyer: normalizedBuyer }));
  };

  const submitBusiness = async (event: React.FormEvent) => {
    event.preventDefault();
    const normalizedBusiness = {
      businessName: business.businessName.trim(),
      email: business.email.trim(),
      phone: business.phone.trim(),
      businessInfo: business.businessInfo.trim(),
    };
    if (!normalizedBusiness.businessName || !emailPattern.test(normalizedBusiness.email) || !normalizedBusiness.phone || !normalizedBusiness.businessInfo) {
      setError("Enter a business name, valid business email, phone number, and business information.");
      return;
    }

    await runSubmission(async () => {
      if (!addonOwned && acuity.connected && !acuity.bookingUrl.trim()) {
        setError("Acuity booking URL is required when connected.");
        return;
      }

      let logoUrl = business.logoUrl;
      try {
        if (logoFile) {
          const formData = new FormData();
          formData.append("file", logoFile);
          logoUrl = (await uploadLogo(formData).unwrap()).logoUrl;
        }
        const nextBusiness = { ...normalizedBusiness, logoUrl: logoUrl || "" };
        setBusiness((current) => ({ ...current, ...nextBusiness }));
        setLogoFile(null);
        if (logoInputRef.current) logoInputRef.current.value = "";
        await save({
          business: { ...nextBusiness, logoUrl: logoUrl?.trim() ? logoUrl.trim() : null },
          ...(addonOwned ? {} : { acuity: { connected: acuity.connected, bookingUrl: acuity.connected && acuity.bookingUrl?.trim() ? acuity.bookingUrl.trim() : null } })
        });
      } catch (cause) {
        setError(errorMessage(cause));
      }
    });
  };

  const submitService = async (event: React.FormEvent) => {
    event.preventDefault();
    const normalizedServiceArea = {
      cityArea: serviceArea.cityArea.trim().replace(/\s+/g, " "),
      airports: Array.from(
        new Set(
          serviceArea.airports.filter(Boolean),
        ),
      ),
    };

    if (!normalizedServiceArea.cityArea || normalizedServiceArea.airports.length === 0) {
      setError(locationText.required);
      return;
    }
    const hasUnsafeCharacter = Array.from(normalizedServiceArea.cityArea).some((character) =>
      character.charCodeAt(0) < 32 || character.charCodeAt(0) === 127 || character === '<' || character === '>',
    );
    if (normalizedServiceArea.cityArea.length > 160 || hasUnsafeCharacter) {
      setError(locationText.invalid);
      return;
    }
    setAirportSearch("");
    setSuggestions([]);
    setServiceArea(normalizedServiceArea);
    await runSubmission(() => save({ serviceArea: normalizedServiceArea }));
  };

  const matchesAirport = (value: string, option: AirportOption) =>
    [option.code, option.name.toUpperCase(), option.label.toUpperCase()].includes(value.trim().toUpperCase());
  const toggleAirport = (option: AirportOption) => {
    setServiceArea((current) => ({ ...current, airports: current.airports.some((value) => matchesAirport(value, option))
      ? current.airports.filter((value) => !matchesAirport(value, option))
      : [...current.airports, option.code] }));
  };

  // Suggestions belong to the airport field. Ignore responses for older queries.
  useEffect(() => {
    let active = true;
    setSuggestions([]);
    const query = airportSearch.trim();
    if (step !== 3 || query.length < 2) return;
    const timer = setTimeout(() => {
      getAirportSuggestions({ cityArea: query }).unwrap()
        .then((response) => { if (active) setSuggestions(response.suggestions); })
        .catch(() => { if (active) setSuggestions([]); });
    }, 250);
    return () => { active = false; clearTimeout(timer); };
  }, [airportSearch, getAirportSuggestions, step]);

  const removeLogo = () => {
    setLogoFile(null);
    setBusiness((current) => ({ ...current, logoUrl: "" }));
    if (logoInputRef.current) logoInputRef.current.value = "";
  };

  const launch = async (event: React.FormEvent) => {
    event.preventDefault();
    await runSubmission(async () => {
      setError(null);
      try {
        await completeLaunch().unwrap();
        trackOnboardingCompleted(profile?.user?.id);
        setShowSuccess(true);
        await Promise.all([
          triggerGetDashboard().unwrap().catch(() => null),
          refetchProfile().unwrap().catch(() => null),
        ]);
        navigate("/dashboard?onboarding=completed", { replace: true });
      } catch (cause) {
        setError(errorMessage(cause));
      }
    });
  };

  if (isLoading) return <div className="grid min-h-[50vh] place-items-center text-dashboard-rider"><Rocket className="h-8 w-8 animate-pulse" /></div>;

  const review = finalReview?.data;
  const canLaunch = Boolean(readiness?.readyForFinalReview || readiness?.ready);
  const websiteUrl = review?.assets.websiteUrl || setupResponse?.data.business.websiteUrl || "";
  const missingRequirements = readiness?.missingRequirements?.filter((item) => !item.toLowerCase().includes("final review")) ?? [];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">{t("Launch Dashboard")}</h2>
        <p className="mt-1 text-sm text-slate-500">{t("Complete your business setup to launch your direct booking website.")}</p>
      </div>

      {error && <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700"><AlertCircle className="h-5 w-5 shrink-0" />{t(error)}</div>}
      {showSuccess && <div className="flex items-center gap-3 rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-700"><Check className="h-5 w-5" />{t("Your website and business assets are live. Redirecting to your dashboard...")}</div>}

      <section className="rounded-2xl bg-white shadow-sm">
        <LaunchProgressStepper showFooter={false} currentStep={step} />
        <div className="border-t border-slate-100 p-5 sm:p-8">
          <div className="mb-6 flex items-start justify-between">
            <div>
              <h3 className="text-xl font-semibold text-slate-900">{t(stepTitles[step - 1])}</h3>
              <p className="mt-1 text-sm text-slate-500">{t(step === 1 ? "Please enter your personal details" : step === 2 ? "Provide your business details to personalize your website and business assets." : step === 3 ? "Tell us where you provide transportation services." : "Review your business details and generated assets before launching.")}</p>
            </div>
            {step < 4 && <Pencil className="h-5 w-5 text-dashboard-rider" />}
          </div>

          {step === 1 && (
            <form onSubmit={submitBuyer} className="max-w-3xl space-y-5 rounded-xl border border-slate-200 p-5">
              <Field label={t("Full Name")} required value={buyer.fullName} onChange={(value) => setBuyer((current) => ({ ...current, fullName: value }))} />
              <Field label={t("Email Address")} required type="email" value={buyer.email} onChange={(value) => setBuyer((current) => ({ ...current, email: value }))} />
              <Field label={t("Phone Number")} required value={buyer.phone} onChange={(value) => setBuyer((current) => ({ ...current, phone: value }))} />
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSaving || isSubmitting}
                  className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-lg bg-dashboard-rider px-5 py-2.5 text-sm font-semibold text-white hover:bg-dashboard-rider-dark transition disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSaving && <Loader2 className="h-4 w-4 animate-spin" />}
                  <span>{t("Save & Continue")}</span>
                  {!isSaving && <ChevronRight className="h-4 w-4" />}
                </button>
              </div>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={submitBusiness} className="space-y-5 rounded-xl border border-slate-200 p-5">
              <div className="grid gap-5 md:grid-cols-2">
                <Field label={t("Business Name")} required value={business.businessName} onChange={(value) => setBusiness((current) => ({ ...current, businessName: value }))} />
                <Field label={t("Phone Number")} required value={business.phone} onChange={(value) => setBusiness((current) => ({ ...current, phone: value }))} />
                <Field label={t("Email Address")} required type="email" value={business.email} onChange={(value) => setBusiness((current) => ({ ...current, email: value }))} />
                <label className="text-sm font-medium text-slate-700">
                  {t("Upload Business Logo (optional)")}<input
                    ref={logoInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={(event) => setLogoFile(event.target.files?.[0] || null)}
                    className="mt-2 block w-full cursor-pointer rounded-lg border border-dashed border-slate-300 bg-white p-3 text-xs text-slate-700"
                  />
                  {(business.logoUrl || logoFile) && (
                    <div className="mt-2 flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-600">
                      <span className="truncate">{t(logoFile ? logoFile.name : "Saved logo")}</span>
                      <button
                        type="button"
                        onClick={removeLogo}
                        className="cursor-pointer inline-flex items-center gap-1 font-semibold text-slate-500 hover:text-red-600"
                      >
                        <X className="h-3.5 w-3.5" />
                        <span>{t("Remove")}</span>
                      </button>
                    </div>
                  )}
                </label>
              </div>
              <label className="block text-sm font-medium text-slate-700">
                {t("Business Information")}<span className="text-red-500">*</span>
                <textarea
                  required
                  value={business.businessInfo}
                  onChange={(event) => setBusiness((current) => ({ ...current, businessInfo: event.target.value }))}
                  rows={4}
                  className="mt-2 w-full rounded-lg border border-slate-200 bg-white p-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-dashboard-rider"
                />
              </label>
              {!addonOwned && (
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                  <p className="font-semibold text-slate-800">{t("Native ride request")}</p>
                  <p className="mt-1 leading-6">
                    {t("Your selling page includes a built-in ride-request form. Acuity scheduling is not required for QuitTheApp launch.")}</p>
                </div>
              )}
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  disabled={isSaving || isSubmitting}
                  className="cursor-pointer inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm text-slate-600 hover:bg-slate-50 transition disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>{t("Back")}</span>
                </button>
                <button
                  type="submit"
                  disabled={isSaving || isSubmitting}
                  className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-lg bg-dashboard-rider px-5 py-2.5 text-sm font-semibold text-white hover:bg-dashboard-rider-dark transition disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSaving && <Loader2 className="h-4 w-4 animate-spin" />}
                  <span>{t("Save & Continue")}</span>
                  {!isSaving && <ChevronRight className="h-4 w-4" />}
                </button>
              </div>
            </form>
          )}

          {step === 3 && (
            <form onSubmit={submitService} className="max-w-3xl space-y-5 rounded-xl border border-slate-200 p-5">
              <div className="relative">
                <label className="block text-sm font-medium text-slate-700">
                  {locationText.city}<span className="text-red-500">*</span>
                  <input
                    required
                    value={serviceArea.cityArea}
                    maxLength={160}
                    onChange={(event) => setServiceArea((current) => ({ ...current, cityArea: event.target.value }))}
                    placeholder={t(locationText.cityPlaceholder)}
                    className="mt-2 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-dashboard-rider"
                  />
                </label>
                <p className="mt-2 text-xs text-slate-500">{locationText.cityHint}</p>
              </div>
              <label className="block text-sm font-medium text-slate-700">
                {locationText.airports}<span className="text-red-500">*</span>
                <div className="mt-2 flex gap-2">
                  <input
                    value={airportSearch}
                    onChange={(event) => setAirportSearch(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        event.preventDefault();
                        if (!/^[A-Za-z]{3}$/.test(airportSearch.trim())) return;
                        setServiceArea((current) => ({
                          ...current,
                          airports: Array.from(new Set([...current.airports, airportSearch.trim().toUpperCase()])),
                        }));
                        setAirportSearch("");
                      }
                    }}
                    placeholder={t(locationText.airportPlaceholder)}
                    className="h-11 min-w-0 flex-1 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-dashboard-rider"
                  />
                  <Plane className="mt-3 h-4 w-4 text-slate-400" />
                </div>
              </label>
              <p className="text-xs text-slate-500">{locationText.airportHint}</p>
              {suggestions.length > 0 && (
                <div className="max-h-60 overflow-y-auto rounded-lg border border-slate-300 bg-white p-2 text-slate-900 shadow-sm">
                  {Array.from(new Map(suggestions.flatMap((item) => item.airportOptions).map((airport) => [airport.code, airport])).values()).map((airport) => (
                    <label key={airport.code} className="flex cursor-pointer items-center gap-3 rounded p-3 text-sm text-slate-900 hover:bg-slate-100 focus-within:bg-slate-100">
                      <input className="accent-green-700" type="checkbox" checked={serviceArea.airports.some((value) => matchesAirport(value, airport))} onChange={() => toggleAirport(airport)} />
                      <span><strong className="font-bold text-slate-950">{airport.code}</strong><span className="text-slate-700"> - {airport.name}</span></span>
                    </label>
                  ))}
                </div>
              )}
              <div className="flex flex-wrap gap-2">
                {serviceArea.airports.map((airport) => (
                  <span key={airport} className="inline-flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 text-sm text-slate-700">
                    <MapPin className="h-3.5 w-3.5" />
                    {airport}
                    <button
                      type="button"
                      onClick={() => setServiceArea((current) => ({ ...current, airports: current.airports.filter((item) => item !== airport) }))}
                      aria-label={t(`${locationText.remove} ${airport}`)}
                      className="cursor-pointer ml-1 text-slate-400 hover:text-slate-700"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  disabled={isSaving || isSubmitting}
                  className="cursor-pointer inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm text-slate-600 hover:bg-slate-50 transition disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>{locationText.back}</span>
                </button>
                <button
                  type="submit"
                  disabled={isSaving || isSubmitting}
                  className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-lg bg-dashboard-rider px-5 py-2.5 text-sm font-semibold text-white hover:bg-dashboard-rider-dark transition disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSaving && <Loader2 className="h-4 w-4 animate-spin" />}
                  <span>{locationText.save}</span>
                  {!isSaving && <ChevronRight className="h-4 w-4" />}
                </button>
              </div>
            </form>
          )}

          {step === 4 && (
            <form onSubmit={launch} className="space-y-5">
              <div className="grid gap-5 lg:grid-cols-2">
                <div className="rounded-xl border border-slate-200 p-5">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <h4 className="font-semibold text-slate-900">{t("Information Overview")}</h4>
                    <button type="button" onClick={() => setStep(1)} className="cursor-pointer text-dashboard-rider hover:opacity-80" aria-label={t("Edit information")}>
                      <Pencil className="h-4 w-4" />
                    </button>
                  </div>
                  <dl className="mt-4 space-y-4 text-sm">
                    <div>
                      <dt className="font-semibold text-slate-800">{t("Personal Information")}</dt>
                      <dd className="mt-1 text-slate-500">
                        {review?.buyer?.fullName || buyer.fullName}
                        <br />
                        {review?.buyer?.phone || buyer.phone}
                        <br />
                        {review?.buyer?.email || buyer.email}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-slate-800">{t("Business Information")}</dt>
                      <dd className="mt-1 text-slate-500">
                        {review?.business?.name || business.businessName}
                        <br />
                        {review?.business?.phone || business.phone}
                        <br />
                        {review?.business?.email || business.email}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-slate-800">{t("Service Area Information")}</dt>
                      <dd className="mt-1 text-slate-500">
                        {review?.serviceArea?.cityArea || serviceArea.cityArea}
                        <br />
                        {(review?.serviceArea?.airports || serviceArea.airports).join(", ")}
                      </dd>
                    </div>
                  </dl>
                </div>
                <div className="rounded-xl border border-slate-200 p-5">
                  <h4 className="border-b border-slate-100 pb-4 font-semibold text-slate-900">{t("Generated Assets")}</h4>
                  <div className="mt-4 space-y-4 text-sm text-slate-900 [&_strong]:font-semibold [&_strong]:text-slate-900">
                    <p>
                      <strong>{t("Driver Website")}</strong>
                      <br />
                      {websiteUrl ? (
                        <a href={websiteUrl} target="_blank" rel="noopener noreferrer" className="cursor-pointer inline-flex items-center gap-1 break-all text-dashboard-rider hover:underline">
                          {websiteUrl}
                          <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                        </a>
                      ) : (
                        <span className="text-slate-500">{t("Your website URL will appear after the business name is saved.")}</span>
                      )}
                    </p>
                    <p>
                      <strong>{t("Referral Card & QR Code")}</strong>
                      <br />
                      <span className="text-slate-500">{t("Your QR code is generated automatically when you confirm launch.")}</span>
                    </p>
                    <p>
                      <strong>{t("Selling Page")}</strong>
                      <br />
                      <span className="text-slate-500">{t("Your shareable landing page is ready to promote your services.")}</span>
                    </p>
                    <p>
                      <strong>{t("Resources & Guides")}</strong>
                      <br />
                      <span className="text-slate-500">{t("Marketing resources and launch materials are available to help you grow.")}</span>
                    </p>
                    {!canLaunch && missingRequirements.length > 0 && (
                      <div className="rounded-lg bg-amber-50 p-3 text-sm text-amber-800">
                        {t("Missing:")}{missingRequirements.join(", ")}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  disabled={isLaunching || isSubmitting}
                  className="cursor-pointer inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm text-slate-600 hover:bg-slate-50 transition disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>{t("Back")}</span>
                </button>
                <button
                  type="submit"
                  disabled={!canLaunch || isLaunching || isSubmitting}
                  className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-lg bg-dashboard-rider px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-dashboard-rider-dark transition disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isLaunching ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>{t("Launching business...")}</span>
                    </>
                  ) : (
                    <>
                      <Rocket className="h-4 w-4" />
                      <span>{t("Confirm & Launch")}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
