import { motion } from "motion/react";
import { type FormEvent, useEffect, useRef, useState } from "react";

import { Button } from "../common/Button";
import { DropzoneField } from "./DropzoneField";
import { FormProgress } from "./FormProgress";
import { FormSection } from "./FormSection";
import { SubmitCard } from "./SubmitCard";
import { TextField } from "./TextField";
import { isAcceptedHeadshotType } from "./onboardingUtils";
import type { DriverProfile } from "../../features/appFlow/appFlowTypes";
import type { TranslationDictionary } from "../../features/localization/localizationTypes";

type BusinessSetupFormProps = {
  t: TranslationDictionary;
  onSubmit: (profile: DriverProfile) => void;
};

type FormErrors = Partial<Record<keyof DriverProfile, string>>;

const initialProfile: DriverProfile = {
  fullName: "",
  targetCity: "",
  regionalAirports: "",
  preferredDomain: "",
  headshotPreviewUrl: "",
};

const preferredDomainPattern = /^[a-zA-Z0-9.-]+$/;

export function BusinessSetupForm({ onSubmit, t }: BusinessSetupFormProps) {
  const [profile, setProfile] = useState<DriverProfile>(initialProfile);
  const [errors, setErrors] = useState<FormErrors>({});
  const previewUrlRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    return () => {
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
      }
    };
  }, []);

  const updateField = (field: keyof DriverProfile, value: string) => {
    setProfile((currentProfile) => ({ ...currentProfile, [field]: value }));
    setErrors((currentErrors) => ({ ...currentErrors, [field]: undefined }));
  };

  const validate = (profileToValidate: DriverProfile) => {
    const nextErrors: FormErrors = {};
    const requiredFields: Array<keyof DriverProfile> = [
      "fullName",
      "targetCity",
      "regionalAirports",
      "preferredDomain",
    ];

    requiredFields.forEach((field) => {
      if (!profileToValidate[field]?.trim()) {
        nextErrors[field] = t.onboarding.validationRequired;
      }
    });

    const preferredDomain = profileToValidate.preferredDomain.trim();
    if (preferredDomain && !preferredDomainPattern.test(preferredDomain)) {
      nextErrors.preferredDomain = t.onboarding.validationPreferredDomain;
    }

    return nextErrors;
  };

  const handleFileSelect = (file: File) => {
    if (!isAcceptedHeadshotType(file)) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        headshotPreviewUrl: t.onboarding.validationImageType,
      }));
      return;
    }

    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
    }

    const nextPreviewUrl = URL.createObjectURL(file);
    previewUrlRef.current = nextPreviewUrl;
    updateField("headshotPreviewUrl", nextPreviewUrl);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedProfile: DriverProfile = {
      fullName: profile.fullName.trim(),
      targetCity: profile.targetCity.trim(),
      regionalAirports: profile.regionalAirports.trim(),
      preferredDomain: profile.preferredDomain.trim(),
      headshotPreviewUrl: profile.headshotPreviewUrl,
    };
    const nextErrors = validate(trimmedProfile);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    onSubmit(trimmedProfile);
  };

  return (
    <form className="grid gap-6 lg:grid-cols-[1fr_360px] lg:items-start" onSubmit={handleSubmit}>
      <div className="grid gap-6">
        <FormProgress
          completedLabel={t.onboarding.completedLabel}
          currentLabel={t.onboarding.currentLabel}
          purchaseLabel={t.onboarding.progressPurchase}
          setupLabel={t.onboarding.progressBusinessSetup}
        />
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.2 }}
        >
          <FormSection title={t.onboarding.businessInformationTitle}>
            <TextField
              error={errors.fullName}
              id="fullName"
              label={t.onboarding.fullNameLabel}
              onChange={(value) => updateField("fullName", value)}
              placeholder={t.onboarding.fullNamePlaceholder}
              value={profile.fullName}
            />
            <TextField
              error={errors.targetCity}
              id="targetCity"
              label={t.onboarding.targetCityLabel}
              onChange={(value) => updateField("targetCity", value)}
              placeholder={t.onboarding.targetCityPlaceholder}
              value={profile.targetCity}
            />
            <TextField
              error={errors.regionalAirports}
              id="regionalAirports"
              label={t.onboarding.regionalAirportsLabel}
              onChange={(value) => updateField("regionalAirports", value)}
              placeholder={t.onboarding.regionalAirportsPlaceholder}
              value={profile.regionalAirports}
            />
            <TextField
              error={errors.preferredDomain}
              id="preferredDomain"
              label={t.onboarding.preferredDomainLabel}
              onChange={(value) => updateField("preferredDomain", value)}
              placeholder={t.onboarding.preferredDomainPlaceholder}
              value={profile.preferredDomain}
            />
          </FormSection>
        </motion.div>

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 12 }}
          transition={{ delay: 0.05, duration: 0.2 }}
        >
          <FormSection title={t.onboarding.headshotUploadTitle}>
            <DropzoneField
              buttonLabel={t.onboarding.uploadButton}
              error={errors.headshotPreviewUrl}
              helperText={t.onboarding.headshotHelper}
              id="headshotPreviewUrl"
              label={t.onboarding.headshotLabel}
              onFileSelect={handleFileSelect}
              placeholder={t.onboarding.uploadPlaceholder}
              previewUrl={profile.headshotPreviewUrl}
              replaceLabel={t.onboarding.replaceImage}
            />
          </FormSection>
        </motion.div>

        <Button className="h-12 w-full lg:hidden" type="submit">
          {t.onboarding.initializeDashboard}
        </Button>
      </div>

      <div className="grid gap-4">
        <SubmitCard
          buttonLabel={t.onboarding.initializeDashboard}
          labels={{
            emptyValue: t.onboarding.emptySummaryValue,
            headshot: t.onboarding.summaryHeadshot,
            name: t.onboarding.summaryName,
            preferredDomain: t.onboarding.summaryPreferredDomain,
            regionalAirports: t.onboarding.summaryRegionalAirports,
            targetMarket: t.onboarding.summaryTargetMarket,
          }}
          profile={profile}
          title={t.onboarding.summaryTitle}
        />
        <Button className="hidden h-12 w-full lg:inline-flex" type="submit">
          {t.onboarding.initializeDashboard}
        </Button>
      </div>
    </form>
  );
}
