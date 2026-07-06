import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "../app/hooks";
import { PageContainer } from "../components/layout/PageContainer";
import { BusinessSetupForm } from "../components/onboarding/BusinessSetupForm";
import { submitBusinessSetup } from "../features/appFlow/appFlowSlice";
import { useTranslation } from "../features/localization/useTranslation";

export default function OnboardingPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmit = () => {
    dispatch(submitBusinessSetup());
    navigate("/approval");
  };

  return (
    <main>
      <PageContainer className="py-10">
      <div className="mb-8 max-w-3xl">
        <p className="text-sm font-semibold text-cyan-700">{t.common.appName}</p>
        <h1 className="mt-2 text-3xl font-bold tracking-normal text-slate-950 md:text-5xl">
          Launch setup
        </h1>
        <p className="mt-3 text-base leading-7 text-slate-600">
          Complete the setup form so the admin team can review and prepare your personalized page.
        </p>
      </div>

      <BusinessSetupForm onSubmit={handleSubmit} t={t} />
      </PageContainer>
    </main>
  );
}
