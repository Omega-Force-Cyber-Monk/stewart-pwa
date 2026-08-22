import { useEffect, useState } from "react";
import { AlertCircle, Check, ChevronLeft, ChevronRight, MapPin, Pencil, Plane, Rocket } from "lucide-react";
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
  useUpdateSetupStateMutation,
  useUploadBusinessLogoMutation,
} from "../store/api/Business/business.api";
import type { AirportSuggestion } from "../store/api/Business/business.type";

const stepTitles = ["Buyer Information", "Business Information", "Service Area", "Final Review"];

type ApiError = { data?: { message?: string | { message?: string }; missingRequirements?: string[] } };

function errorMessage(error: unknown) {
  const payload = (error as ApiError)?.data;
  const message = typeof payload?.message === "string" ? payload.message : payload?.message?.message;
  if (payload?.missingRequirements?.length) return `${message || "Business is not ready for launch."} Missing: ${payload.missingRequirements.join(", ")}`;
  return message || "Something went wrong. Please try again.";
}

function Field({ label, value, onChange, type = "text", required = false, placeholder }: { label: string; value: string; onChange: (value: string) => void; type?: string; required?: boolean; placeholder?: string }) {
  return <label className="block text-sm font-medium text-slate-700"><span>{label}{required && <span className="text-red-500">*</span>}</span><input required={required} type={type} value={value} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-dashboard-rider focus:ring-2 focus:ring-green-100" /></label>;
}

export default function LaunchDashboardPage() {
  const navigate = useNavigate();
  const { data: profile } = useGetRiderProfileQuery();
  const { data: setupResponse, isLoading } = useGetSetupStateQuery();
  const [initializeSetup] = useInitializeSetupMutation();
  const [updateSetup, { isLoading: isSaving }] = useUpdateSetupStateMutation();
  const [uploadLogo] = useUploadBusinessLogoMutation();
  const { data: readiness } = useGetLaunchReadinessQuery();
  const [completeLaunch, { isLoading: isLaunching }] = useCompleteLaunchMutation();
  const [step, setStep] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [buyer, setBuyer] = useState({ fullName: "", email: "", phone: "" });
  const [business, setBusiness] = useState({ businessName: "", email: "", phone: "", businessInfo: "", logoUrl: "" });
  const [acuity, setAcuity] = useState({ connected: false, bookingUrl: "" });
  const [serviceArea, setServiceArea] = useState({ cityArea: "", airports: [] as string[] });
  const [airportSearch, setAirportSearch] = useState("");
  const [suggestions, setSuggestions] = useState<AirportSuggestion[]>([]);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [getAirportSuggestions] = useLazyGetAirportSuggestionsQuery();
  const { data: finalReview } = useGetFinalReviewQuery(undefined, { skip: step !== 4 });
  const addonOwned = profile?.purchase?.addon ?? false;

  useEffect(() => {
    if (!setupResponse?.data || hydrated) return;
    const data = setupResponse.data;
    setBuyer({ fullName: data.buyer.fullName || "", email: data.buyer.email || "", phone: data.buyer.phone || "" });
    setBusiness({ businessName: data.business.businessName || "", email: data.business.email || "", phone: data.business.phone || "", businessInfo: data.business.businessInfo || "", logoUrl: data.business.logoUrl || "" });
    setAcuity({ connected: data.acuity.connected, bookingUrl: data.acuity.bookingUrl || "" });
    setServiceArea({ cityArea: data.serviceArea.cityArea || "", airports: data.serviceArea.airports || [] });
    setStep(Math.min(4, Math.max(1, data.progress.currentStep || 1)));
    setHydrated(true);
  }, [hydrated, setupResponse]);

  useEffect(() => {
    initializeSetup().catch(() => undefined);
  }, [initializeSetup]);

  const save = async (section: Parameters<typeof updateSetup>[0]) => {
    setError(null);
    try {
      const response = await updateSetup(section).unwrap();
      setStep(Math.min(4, Math.max(1, response.data.progress.currentStep || step + 1)));
    } catch (cause) {
      setError(errorMessage(cause));
    }
  };

  const submitBuyer = async (event: React.FormEvent) => { event.preventDefault(); await save({ buyer }); };
  const submitBusiness = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!addonOwned && acuity.connected && !acuity.bookingUrl.trim()) { setError("Acuity booking URL is required when connected."); return; }
    let logoUrl = business.logoUrl;
    try {
      if (logoFile) { const formData = new FormData(); formData.append("file", logoFile); logoUrl = (await uploadLogo(formData).unwrap()).logoUrl; }
      await save({ business: { ...business, logoUrl }, ...(addonOwned ? {} : { acuity: { connected: acuity.connected, bookingUrl: acuity.connected ? acuity.bookingUrl : null } }) });
    } catch (cause) { setError(errorMessage(cause)); }
  };
  const submitService = async (event: React.FormEvent) => { event.preventDefault(); if (!serviceArea.cityArea.trim() || serviceArea.airports.length === 0) { setError("City and at least one airport are required."); return; } await save({ serviceArea }); };
  const chooseCity = (suggestion: AirportSuggestion) => { setServiceArea((current) => ({ ...current, cityArea: suggestion.cityArea, airports: Array.from(new Set([...current.airports, ...suggestion.airportOptions.map((option) => option.code)])) })); setSuggestions([]); };
  const updateCity = async (value: string) => { setServiceArea((current) => ({ ...current, cityArea: value })); if (value.trim().length > 2) { try { setSuggestions((await getAirportSuggestions({ cityArea: value }).unwrap()).suggestions); } catch { setSuggestions([]); } } else setSuggestions([]); };
  const launch = async (event: React.FormEvent) => { event.preventDefault(); setError(null); try { await completeLaunch().unwrap(); setShowSuccess(true); window.setTimeout(() => navigate("/dashboard", { replace: true }), 1200); } catch (cause) { setError(errorMessage(cause)); } };

  if (isLoading) return <div className="grid min-h-[50vh] place-items-center text-dashboard-rider"><Rocket className="h-8 w-8 animate-pulse" /></div>;
  const review = finalReview?.data;

  return <div className="space-y-6">
    <div><h2 className="text-2xl font-bold text-slate-900">Launch Dashboard™</h2><p className="mt-1 text-sm text-slate-500">Complete your business setup to launch your direct booking website.</p></div>
    {error && <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700"><AlertCircle className="h-5 w-5 shrink-0" />{error}</div>}
    {showSuccess && <div className="flex items-center gap-3 rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-700"><Check className="h-5 w-5" />Your website and business assets are live. Redirecting to your dashboard…</div>}
    <section className="rounded-2xl bg-white shadow-sm"><LaunchProgressStepper showFooter={false} currentStep={step} /><div className="border-t border-slate-100 p-5 sm:p-8">
      <div className="mb-6 flex items-start justify-between"><div><h3 className="text-xl font-semibold text-slate-900">{stepTitles[step - 1]}</h3><p className="mt-1 text-sm text-slate-500">{step === 1 ? "Please enter your personal details" : step === 2 ? "Provide your business details to personalize your website and business assets." : step === 3 ? "Tell us where you provide transportation services." : "Review your business details and generated assets before launching."}</p></div>{step < 4 && <Pencil className="h-5 w-5 text-dashboard-rider" />}</div>
      {step === 1 && <form onSubmit={submitBuyer} className="max-w-3xl space-y-5 rounded-xl border border-slate-200 p-5"><Field label="Full Name" required value={buyer.fullName} onChange={(value) => setBuyer((current) => ({ ...current, fullName: value }))} /><Field label="Email Address" required type="email" value={buyer.email} onChange={(value) => setBuyer((current) => ({ ...current, email: value }))} /><Field label="Phone Number" required value={buyer.phone} onChange={(value) => setBuyer((current) => ({ ...current, phone: value }))} /><div className="flex justify-end"><button className="rounded-lg bg-dashboard-rider px-5 py-2.5 text-sm font-semibold text-white hover:bg-dashboard-rider-dark" disabled={isSaving}>Save &amp; Continue <ChevronRight className="ml-1 inline h-4 w-4" /></button></div></form>}
      {step === 2 && <form onSubmit={submitBusiness} className="space-y-5 rounded-xl border border-slate-200 p-5"><div className="grid gap-5 md:grid-cols-2"><Field label="Business Name" required value={business.businessName} onChange={(value) => setBusiness((current) => ({ ...current, businessName: value }))} /><Field label="Phone Number" required value={business.phone} onChange={(value) => setBusiness((current) => ({ ...current, phone: value }))} /><Field label="Email Address" required type="email" value={business.email} onChange={(value) => setBusiness((current) => ({ ...current, email: value }))} /><label className="text-sm font-medium text-slate-700">Upload Business Logo (optional)<input type="file" accept="image/png,image/jpeg,image/svg+xml" onChange={(event) => setLogoFile(event.target.files?.[0] || null)} className="mt-2 block w-full rounded-lg border border-dashed border-slate-300 p-3 text-xs" /></label></div><label className="block text-sm font-medium text-slate-700">Business Information<span className="text-red-500">*</span><textarea required value={business.businessInfo} onChange={(event) => setBusiness((current) => ({ ...current, businessInfo: event.target.value }))} rows={4} className="mt-2 w-full rounded-lg border border-slate-200 p-3 text-sm outline-none focus:border-dashboard-rider" /></label>{!addonOwned && <div className="rounded-lg bg-slate-50 p-4"><label className="flex items-center gap-2 text-sm font-medium text-slate-700"><input type="checkbox" checked={acuity.connected} onChange={(event) => setAcuity((current) => ({ ...current, connected: event.target.checked }))} /> Connect Acuity Scheduling</label>{acuity.connected && <div className="mt-4"><Field label="Acuity Booking URL" required value={acuity.bookingUrl} onChange={(value) => setAcuity((current) => ({ ...current, bookingUrl: value }))} placeholder="https://acuityscheduling.com/..." /></div>}</div>}<div className="flex justify-between"><button type="button" onClick={() => setStep(1)} className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm text-slate-600"><ChevronLeft className="mr-1 inline h-4 w-4" />Back</button><button className="rounded-lg bg-dashboard-rider px-5 py-2.5 text-sm font-semibold text-white" disabled={isSaving}>Save &amp; Continue</button></div></form>}
      {step === 3 && <form onSubmit={submitService} className="max-w-3xl space-y-5 rounded-xl border border-slate-200 p-5"><div className="relative"><label className="block text-sm font-medium text-slate-700">City or Metro Area<span className="text-red-500">*</span><input required value={serviceArea.cityArea} onChange={(event) => updateCity(event.target.value)} placeholder="Enter the city or metro area you serve" className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-dashboard-rider" /></label>{suggestions.length > 0 && <div className="absolute z-10 mt-1 w-full rounded-lg border border-slate-200 bg-white p-2 shadow-lg">{suggestions.map((suggestion) => <button type="button" key={suggestion.cityArea} onClick={() => chooseCity(suggestion)} className="block w-full rounded px-3 py-2 text-left text-sm hover:bg-slate-50">{suggestion.cityArea}</button>)}</div>}</div><label className="block text-sm font-medium text-slate-700">Airports Served<span className="text-red-500">*</span><div className="mt-2 flex gap-2"><input value={airportSearch} onChange={(event) => setAirportSearch(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && airportSearch.trim()) { event.preventDefault(); setServiceArea((current) => ({ ...current, airports: Array.from(new Set([...current.airports, airportSearch.trim().toUpperCase()])) })); setAirportSearch(""); } }} placeholder="Type airport code and press Enter" className="h-11 flex-1 rounded-lg border border-slate-200 px-3 text-sm" /><Plane className="mt-3 h-4 w-4 text-slate-400" /></div></label><div className="flex flex-wrap gap-2">{serviceArea.airports.map((airport) => <span key={airport} className="inline-flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 text-sm text-slate-700"><MapPin className="h-3.5 w-3.5" />{airport}<button type="button" onClick={() => setServiceArea((current) => ({ ...current, airports: current.airports.filter((item) => item !== airport) }))} aria-label={`Remove ${airport}`}>×</button></span>)}</div><div className="flex justify-between"><button type="button" onClick={() => setStep(2)} className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm text-slate-600"><ChevronLeft className="mr-1 inline h-4 w-4" />Back</button><button className="rounded-lg bg-dashboard-rider px-5 py-2.5 text-sm font-semibold text-white" disabled={isSaving}>Save &amp; Continue</button></div></form>}
      {step === 4 && <form onSubmit={launch} className="space-y-5"><div className="grid gap-5 lg:grid-cols-2"><div className="rounded-xl border border-slate-200 p-5"><div className="flex items-center justify-between border-b border-slate-100 pb-4"><h4 className="font-semibold text-slate-900">Information Overview</h4><button type="button" onClick={() => setStep(1)} className="text-dashboard-rider" aria-label="Edit information"><Pencil className="h-4 w-4" /></button></div><dl className="mt-4 space-y-4 text-sm"><div><dt className="font-semibold text-slate-800">Personal Information</dt><dd className="mt-1 text-slate-500">{review?.buyer?.fullName || buyer.fullName}<br />{review?.buyer?.phone || buyer.phone}<br />{review?.buyer?.email || buyer.email}</dd></div><div><dt className="font-semibold text-slate-800">Business Information</dt><dd className="mt-1 text-slate-500">{review?.business?.name || business.businessName}<br />{review?.business?.phone || business.phone}<br />{review?.business?.email || business.email}</dd></div><div><dt className="font-semibold text-slate-800">Service Area Information</dt><dd className="mt-1 text-slate-500">{review?.serviceArea?.cityArea || serviceArea.cityArea}<br />{(review?.serviceArea?.airports || serviceArea.airports).join(", ")}</dd></div></dl></div><div className="rounded-xl border border-slate-200 p-5"><h4 className="border-b border-slate-100 pb-4 font-semibold text-slate-900">Generated Assets</h4><div className="mt-4 space-y-4 text-sm"><p><strong>Driver Website</strong><br /><span className="text-slate-500">Your direct booking website will be ready to receive customers.</span></p><p><strong>Referral Card &amp; QR Code</strong><br /><span className="text-slate-500">Your branded referral assets are generated at launch.</span></p><p><strong>Selling Page</strong><br /><span className="text-slate-500">Your shareable landing page is ready to promote your services.</span></p><p><strong>Resources &amp; Guides</strong><br /><span className="text-slate-500">Marketing resources and launch materials are available to help you grow.</span></p></div></div></div><div className="flex items-center justify-between"><button type="button" onClick={() => setStep(3)} className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm text-slate-600"><ChevronLeft className="mr-1 inline h-4 w-4" />Back</button><button disabled={!readiness?.ready || isLaunching} className="rounded-lg bg-dashboard-rider px-6 py-3 text-sm font-semibold text-white disabled:opacity-50"><Rocket className="mr-2 inline h-4 w-4" />Confirm &amp; Launch</button></div></form>}
    </div></section>
  </div>;
}
