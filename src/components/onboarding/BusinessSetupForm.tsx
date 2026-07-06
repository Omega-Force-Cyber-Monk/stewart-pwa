import {
  ArrowRight,
  Check,
  CheckCircle2,
  HelpCircle,
  Lightbulb,
  Lock,
  Save,
  ShieldCheck,
} from "lucide-react";
import { motion } from "motion/react";
import { type FormEvent, useEffect, useMemo, useRef, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  initialBusinessSetupDraft,
  saveBusinessSetupProgress,
  selectBusinessSetupDraft,
  selectBusinessSetupStep,
  selectHasDfyUpgrade,
  setBusinessSetupStep,
  type BusinessSetupDraft,
} from "../../features/appFlow/appFlowSlice";
import type { TranslationDictionary } from "../../features/localization/localizationTypes";
import { cn } from "../../lib/cn";
import { Button } from "../common/Button";
import { Badge } from "../common/Badge";
import { DashboardCard } from "../layout/DashboardCard";
import { DropzoneField } from "./DropzoneField";
import { isAcceptedHeadshotType } from "./onboardingUtils";

type BusinessSetupFormProps = {
  t: TranslationDictionary;
  onSubmit: () => void;
};

type FieldErrors = Partial<Record<keyof BusinessSetupDraft, string>>;

const steps = [
  "Buyer Info",
  "Business Info",
  "Service Area",
  "Final Confirm",
];

const customerTypes = [
  "Airport travelers",
  "Business travelers",
  "Families",
  "Hotel guests",
  "Out of town visitors",
  "Event travelers",
  "Medical appointment travelers",
  "Other",
];

function TextInput({
  error,
  label,
  onChange,
  placeholder,
  required,
  type = "text",
  value,
}: {
  error?: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  type?: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const id = label.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  return (
    <label className="grid gap-2 text-sm font-semibold text-slate-800" htmlFor={id}>
      <span>
        {label} {required && <span className="text-red-500">*</span>}
      </span>
      <input
        aria-invalid={Boolean(error)}
        className={cn(
          "min-h-12 rounded-md border bg-white px-3 text-sm outline-none transition focus:ring-2",
          error
            ? "border-red-400 focus:border-red-500 focus:ring-red-100"
            : "border-slate-300 focus:border-emerald-700 focus:ring-emerald-100",
        )}
        id={id}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        type={type}
        value={value}
      />
      {error && <span className="text-xs font-semibold text-red-600">{error}</span>}
    </label>
  );
}

function TextArea({
  error,
  label,
  onChange,
  placeholder,
  required,
  value,
}: {
  error?: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-slate-800">
      <span>
        {label} {required && <span className="text-red-500">*</span>}
      </span>
      <textarea
        aria-invalid={Boolean(error)}
        className={cn(
          "min-h-28 rounded-md border bg-white px-3 py-3 text-sm outline-none transition focus:ring-2",
          error
            ? "border-red-400 focus:border-red-500 focus:ring-red-100"
            : "border-slate-300 focus:border-emerald-700 focus:ring-emerald-100",
        )}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        value={value}
      />
      {error && <span className="text-xs font-semibold text-red-600">{error}</span>}
    </label>
  );
}

function RadioGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <fieldset className="grid gap-3">
      <legend className="text-sm font-semibold text-slate-800">{label}</legend>
      <div className="flex flex-wrap gap-4">
        {options.map((option) => (
          <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-slate-700" key={option}>
            <input
              checked={value === option}
              className="size-4 accent-emerald-700"
              onChange={() => onChange(option)}
              type="radio"
            />
            {option}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function BusinessSetupForm({ onSubmit, t }: BusinessSetupFormProps) {
  const dispatch = useAppDispatch();
  const persistedDraft = useAppSelector(selectBusinessSetupDraft);
  const persistedStep = useAppSelector(selectBusinessSetupStep);
  const hasDfyUpgrade = useAppSelector(selectHasDfyUpgrade);
  const [draft, setDraft] = useState<BusinessSetupDraft>({
    ...initialBusinessSetupDraft,
    ...persistedDraft,
  });
  const [currentStep, setCurrentStep] = useState(persistedStep);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [savedMessage, setSavedMessage] = useState("Progress saved locally.");
  const previewUrlRef = useRef<string | undefined>(undefined);

  const planTitle = hasDfyUpgrade
    ? "Done-For-You Launch Setup"
    : "DIY Launch Setup";

  const completionPercent = Math.round(((currentStep + 1) / steps.length) * 100);

  useEffect(() => {
    dispatch(setBusinessSetupStep(currentStep));
  }, [currentStep, dispatch]);

  useEffect(() => {
    return () => {
      if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
    };
  }, []);

  const updateDraft = (nextDraft: Partial<BusinessSetupDraft>) => {
    setDraft((current) => {
      const merged = { ...current, ...nextDraft };
      dispatch(saveBusinessSetupProgress(merged));
      return merged;
    });
    setSavedMessage("Progress saved locally.");
  };

  const updateField = <Field extends keyof BusinessSetupDraft>(
    field: Field,
    value: BusinessSetupDraft[Field],
  ) => {
    updateDraft({ [field]: value });
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const validateStep = (step: number) => {
    const nextErrors: FieldErrors = {};
    const requiredFieldsByStep: Array<Array<keyof BusinessSetupDraft>> = [
      ["fullName", "email", "phone", "cityState"],
      ["preferredDomain", "businessContactPhone", "businessContactEmail"],
      ["serviceCity", "airports", "pickupAreas", "topServiceAreas"],
      [],
    ];

    requiredFieldsByStep[step].forEach((field) => {
      const value = draft[field];
      const isEmpty = Array.isArray(value) ? value.length === 0 : !String(value || "").trim();
      if (isEmpty) nextErrors[field] = t.onboarding.validationRequired;
    });

    return nextErrors;
  };

  const goToStep = (step: number) => {
    const boundedStep = Math.min(steps.length - 1, Math.max(0, step));
    if (boundedStep > currentStep) {
      const nextErrors = validateStep(currentStep);
      if (Object.keys(nextErrors).length > 0) {
        setErrors(nextErrors);
        return;
      }
    }
    setCurrentStep(boundedStep);
  };

  const handleSaveProgress = () => {
    dispatch(saveBusinessSetupProgress(draft));
    setSavedMessage("Progress saved. You can safely come back later.");
  };

  const handleFileSelect = (file: File) => {
    if (!isAcceptedHeadshotType(file)) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        headshotPreviewUrl: t.onboarding.validationImageType,
      }));
      return;
    }

    if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
    const nextPreviewUrl = URL.createObjectURL(file);
    previewUrlRef.current = nextPreviewUrl;
    updateField("headshotPreviewUrl", nextPreviewUrl);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateStep(currentStep);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep((step) => step + 1);
      return;
    }

    dispatch(saveBusinessSetupProgress(draft));
    onSubmit();
  };

  const selectedCustomerTypes = useMemo(
    () => new Set(draft.customerTypes),
    [draft.customerTypes],
  );

  const toggleCustomerType = (customerType: string) => {
    const next = selectedCustomerTypes.has(customerType)
      ? draft.customerTypes.filter((item) => item !== customerType)
      : [...draft.customerTypes, customerType];

    updateField("customerTypes", next);
  };

  return (
    <form className="grid gap-6 lg:grid-cols-[1fr_300px]" onSubmit={handleSubmit}>
      <div className="grid gap-6">
        <DashboardCard className="rounded-xl bg-white p-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_280px] lg:items-center">
            <div>
              <Badge className="border-emerald-200 bg-emerald-50 text-emerald-700">
                {planTitle}
              </Badge>
              <h2 className="mt-4 text-3xl font-bold tracking-normal text-slate-950">
                QuitTheApp Launch Setup Form
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-700">
                This setup form gives the team the information needed to prepare your launch
                materials, booking flow, referral assets, customer page, and business profile.
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <div className="flex items-center gap-3">
                <ShieldCheck aria-hidden="true" className="size-9 text-blue-700" />
                <div>
                  <p className="font-bold text-slate-950">100% Secure</p>
                  <p className="mt-1 text-xs leading-5 text-slate-600">
                    Your information is private and protected.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <div
              aria-label="Setup progress"
              className="grid gap-3 sm:grid-cols-4"
              role="list"
            >
              {steps.map((step, index) => {
                const isComplete = index < currentStep;
                const isActive = index === currentStep;

                return (
                  <button
                    className="group grid gap-2 text-left"
                    key={step}
                    onClick={() => goToStep(index)}
                    type="button"
                  >
                    <span
                      className={cn(
                        "grid size-9 place-items-center rounded-full border text-sm font-bold transition",
                        isComplete && "border-emerald-700 bg-emerald-700 text-white",
                        isActive && "border-emerald-700 bg-white text-emerald-700",
                        !isComplete && !isActive && "border-slate-300 bg-white text-slate-500",
                      )}
                    >
                      {isComplete ? <Check aria-hidden="true" className="size-4" /> : index + 1}
                    </span>
                    <span className="text-xs font-bold text-slate-800">{step}</span>
                  </button>
                );
              })}
            </div>
            <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full rounded-full bg-emerald-700" style={{ width: `${completionPercent}%` }} />
            </div>
          </div>
        </DashboardCard>

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
          initial={{ opacity: 0, y: 16 }}
          key={currentStep}
          transition={{ duration: 0.2 }}
        >
          {currentStep === 0 && (
            <section>
              <h2 className="text-xl font-bold text-slate-950">Section 1: Buyer Information</h2>
              <p className="mt-2 text-sm text-slate-600">
                Tell us about yourself so we can help you successfully launch your business.
              </p>
              <div className="mt-6 grid gap-5 md:grid-cols-2">
                <TextInput error={errors.fullName} label="Full Name" onChange={(value) => updateField("fullName", value)} placeholder="Enter your full name" required value={draft.fullName} />
                <TextInput error={errors.email} label="Email Address" onChange={(value) => updateField("email", value)} placeholder="Enter your email address" required type="email" value={draft.email} />
                <TextInput error={errors.phone} label="Phone Number" onChange={(value) => updateField("phone", value)} placeholder="(239) 555-1234" required value={draft.phone} />
                <TextInput error={errors.cityState} label="City and State" onChange={(value) => updateField("cityState", value)} placeholder="Naples, FL" required value={draft.cityState} />
                <RadioGroup label="Best Way to Contact You" onChange={(value) => updateField("contactMethod", value)} options={["text", "email", "phone call"]} value={draft.contactMethod} />
                <TextInput label="Best Time to Contact You" onChange={(value) => updateField("bestContactTime", value)} placeholder="Example: Mornings between 8-10 AM" value={draft.bestContactTime} />
              </div>
              <div className="mt-5">
                <RadioGroup label="Would You Prefer to Receive Your Materials in Spanish?" onChange={(value) => updateField("spanishPreference", value)} options={["yes", "no", "both"]} value={draft.spanishPreference} />
              </div>
            </section>
          )}

          {currentStep === 1 && (
            <section>
              <h2 className="text-xl font-bold text-slate-950">Section 2: Business Information</h2>
              <p className="mt-2 text-sm text-slate-600">Tell us about your transportation business.</p>
              <div className="mt-6 grid gap-5 md:grid-cols-2">
                <TextInput label="Name of Your Transportation Business" onChange={(value) => updateField("businessName", value)} placeholder="Enter your business name" value={draft.businessName} />
                <RadioGroup label="Do You Already Have a Business Name?" onChange={(value) => updateField("businessNameStatus", value)} options={["I already have a business name", "I need help choosing a business name", "I am not sure yet"]} value={draft.businessNameStatus} />
                <div className="md:col-span-2">
                  <TextArea label="Business Name Ideas" onChange={(value) => updateField("businessNameIdeas", value)} placeholder="List any name ideas you are considering..." value={draft.businessNameIdeas} />
                </div>
                <TextInput error={errors.preferredDomain} label="Preferred Domain" onChange={(value) => updateField("preferredDomain", value)} placeholder="john-airport" required value={draft.preferredDomain} />
                <TextInput error={errors.businessContactPhone} label="Customer Contact Phone" onChange={(value) => updateField("businessContactPhone", value)} placeholder="(239) 555-1234" required value={draft.businessContactPhone} />
                <TextInput error={errors.businessContactEmail} label="Customer Contact Email" onChange={(value) => updateField("businessContactEmail", value)} placeholder="hello@yourbusiness.com" required type="email" value={draft.businessContactEmail} />
                <RadioGroup label="Do You Have a Business Logo?" onChange={(value) => updateField("hasLogo", value)} options={["yes", "no", "not yet"]} value={draft.hasLogo} />
                <TextInput label="Tagline or Short Phrase" onChange={(value) => updateField("tagline", value)} placeholder="Professional airport transportation you can count on." value={draft.tagline} />
                <div className="md:col-span-2">
                  <DropzoneField
                    buttonLabel={t.onboarding.uploadButton}
                    error={errors.headshotPreviewUrl}
                    helperText="Upload a headshot or logo preview. It stays local in this frontend demo."
                    id="headshotPreviewUrl"
                    label="Headshot or Logo Preview"
                    onFileSelect={handleFileSelect}
                    placeholder={t.onboarding.uploadPlaceholder}
                    previewUrl={draft.headshotPreviewUrl}
                    replaceLabel={t.onboarding.replaceImage}
                  />
                </div>
              </div>
            </section>
          )}

          {currentStep === 2 && (
            <section>
              <h2 className="text-xl font-bold text-slate-950">Section 3: Service Area</h2>
              <p className="mt-2 text-sm text-slate-600">Help us understand where and who you will serve.</p>
              <div className="mt-6 grid gap-5 md:grid-cols-2">
                <TextInput error={errors.serviceCity} label="City or Metro Area" onChange={(value) => updateField("serviceCity", value)} placeholder="Naples, FL" required value={draft.serviceCity} />
                <TextInput error={errors.airports} label="Airport or Airports You Plan to Serve" onChange={(value) => updateField("airports", value)} placeholder="RSW, PGD, FLL, MIA" required value={draft.airports} />
                <TextArea error={errors.pickupAreas} label="Main Pickup Areas" onChange={(value) => updateField("pickupAreas", value)} placeholder="Downtown hotels, suburbs, cruise port, medical district..." required value={draft.pickupAreas} />
                <fieldset className="grid gap-3">
                  <legend className="text-sm font-semibold text-slate-800">Customer Types to Focus On</legend>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {customerTypes.map((customerType) => (
                      <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-slate-700" key={customerType}>
                        <input checked={selectedCustomerTypes.has(customerType)} className="size-4 accent-emerald-700" onChange={() => toggleCustomerType(customerType)} type="checkbox" />
                        {customerType}
                      </label>
                    ))}
                  </div>
                </fieldset>
                <RadioGroup label="Airport Focus" onChange={(value) => updateField("airportFocus", value)} options={["one main airport", "multiple airports", "not sure yet"]} value={draft.airportFocus} />
                <TextArea error={errors.topServiceAreas} label="Top Three Service Areas" onChange={(value) => updateField("topServiceAreas", value)} placeholder="Naples, Marco Island, Bonita Springs" required value={draft.topServiceAreas} />
              </div>
            </section>
          )}

          {currentStep === 3 && (
            <section>
              <h2 className="text-xl font-bold text-slate-950">Final Confirmation</h2>
              <p className="mt-2 text-sm text-slate-600">
                Review the essentials. Submitting sends your setup to admin review.
              </p>
              <div className="mt-6 grid gap-3 rounded-lg bg-slate-50 p-4">
                {[
                  ["Name", draft.fullName],
                  ["Plan", planTitle],
                  ["Market", draft.serviceCity || draft.cityState],
                  ["Airports", draft.airports],
                  ["Preferred domain", draft.preferredDomain],
                  ["Business", draft.businessName || "Needs naming help"],
                ].map(([label, value]) => (
                  <div className="flex justify-between gap-4 border-b border-slate-200 py-2 last:border-0" key={label}>
                    <span className="text-sm font-semibold text-slate-500">{label}</span>
                    <span className="text-right text-sm font-bold text-slate-950">{value}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          <div className="mt-8 flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <Button onClick={handleSaveProgress} type="button" variant="secondary">
              <Save aria-hidden="true" className="size-4" />
              Save Progress
            </Button>
            <div className="flex flex-col gap-3 sm:flex-row">
              {currentStep > 0 && (
                <Button onClick={() => goToStep(currentStep - 1)} type="button" variant="secondary">
                  Back
                </Button>
              )}
              <Button className="bg-emerald-700 hover:bg-emerald-800" type="submit">
                {currentStep === steps.length - 1 ? "Submit for Approval" : "Next Section"}
                <ArrowRight aria-hidden="true" className="size-4" />
              </Button>
            </div>
          </div>
          <p className="mt-4 flex items-center gap-2 text-xs font-semibold text-slate-500">
            <Lock aria-hidden="true" className="size-4" />
            {savedMessage}
          </p>
        </motion.div>
      </div>

      <aside className="grid h-max gap-5 lg:sticky lg:top-28">
        <DashboardCard className="bg-white">
          <div className="flex items-center gap-3">
            <Lightbulb aria-hidden="true" className="size-7 text-amber-500" />
            <h2 className="text-lg font-bold text-slate-950">Setup Tips</h2>
          </div>
          <h3 className="mt-5 font-bold text-slate-950">Why we ask</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Your answers help us customize your booking system, customer page,
            referral assets, and launch materials.
          </p>
          <h3 className="mt-5 font-bold text-slate-950">What happens next?</h3>
          <div className="mt-3 grid gap-3">
            {["We review your responses", "Build your launch materials", "Set up your booking flow", "Release your customer page"].map((item) => (
              <p className="flex items-center gap-2 text-sm text-slate-700" key={item}>
                <CheckCircle2 aria-hidden="true" className="size-4 text-emerald-700" />
                {item}
              </p>
            ))}
          </div>
        </DashboardCard>

        <DashboardCard className="bg-white">
          <HelpCircle aria-hidden="true" className="size-7 text-emerald-700" />
          <h2 className="mt-3 text-lg font-bold text-slate-950">Need help?</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Our team is here if you have questions while completing setup.
          </p>
          <Button className="mt-5 w-full bg-emerald-700 hover:bg-emerald-800" type="button">
            Contact Support
          </Button>
        </DashboardCard>
      </aside>
    </form>
  );
}
