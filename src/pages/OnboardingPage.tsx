import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Button } from "../components/common/Button";
import { submitOnboarding, type DriverProfile } from "../features/appFlow/appFlowSlice";
import { appCopy } from "../features/localization/copy";

const initialProfile: DriverProfile = {
  name: "",
  email: "",
  phone: "",
  city: "",
  vehicleStatus: "",
  launchGoal: "",
};

export default function OnboardingPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const locale = useAppSelector((state) => state.appFlow.locale);
  const [profile, setProfile] = useState<DriverProfile>(initialProfile);

  const updateField = (field: keyof DriverProfile, value: string) => {
    setProfile((currentProfile) => ({ ...currentProfile, [field]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(submitOnboarding(profile));
    navigate("/dashboard");
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <div className="mb-8">
        <p className="text-sm font-semibold text-cyan-700">{appCopy[locale].onboarding}</p>
        <h1 className="mt-2 text-3xl font-bold">Tell us about your transportation launch.</h1>
        <p className="mt-3 text-slate-600">
          This frontend-only intake seeds the dashboard experience for the selected funnel.
        </p>
      </div>

      <form className="grid gap-4 rounded-lg border border-slate-200 bg-white p-6" onSubmit={handleSubmit}>
        {(
          [
            ["name", "Full name"],
            ["email", "Email"],
            ["phone", "Phone"],
            ["city", "Launch city"],
            ["vehicleStatus", "Vehicle status"],
            ["launchGoal", "Launch goal"],
          ] as Array<[keyof DriverProfile, string]>
        ).map(([field, label]) => (
          <label className="grid gap-2" key={field}>
            <span className="text-sm font-semibold text-slate-700">{label}</span>
            <input
              className="h-11 rounded-md border border-slate-300 px-3 text-sm outline-none transition focus:border-cyan-600 focus:ring-2 focus:ring-cyan-100"
              onChange={(event) => updateField(field, event.target.value)}
              required
              type={field === "email" ? "email" : "text"}
              value={profile[field]}
            />
          </label>
        ))}

        <Button className="mt-2 w-full" type="submit">
          Continue to dashboard
        </Button>
      </form>
    </main>
  );
}
