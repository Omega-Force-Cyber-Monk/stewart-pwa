import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Loader2, CheckCircle2 } from "lucide-react";
import { useGetRiderProfileQuery } from "../store/api/Auth/auth.api";
import { useClaimPurchaseAnalyticsMutation } from "../store/api/Payment/payment.api";
import { useAppDispatch, useAppSelector } from "../hooks/storeHooks";
import { updateUser } from "../store/features/auth/authSlice";
import standardLogo from "../assets/standardLogo.png";
import standardBanner from "../assets/standardBanner.png";
import { removeStorageValue, storageKeys } from "../lib/storage";
import { reportVerifiedPurchase } from "../lib/gtmEvents";
import { LanguageSelector, useLanguage } from '../i18n/LanguageProvider';

export default function PaymentSuccessPage() {
  const { t, language, setLanguage } = useLanguage();
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const stripeSessionId = searchParams.get("session_id");
  const [claimAnalytics] = useClaimPurchaseAnalyticsMutation();
  const [confirmedSession, setConfirmedSession] = useState<string | null>(null);
  const [confirmationError, setConfirmationError] = useState(false);
  const purchaseConfirmed = Boolean(stripeSessionId && confirmedSession === stripeSessionId);
  useEffect(() => { setLanguage(language); }, [language, setLanguage]);

  useEffect(() => {
    if (!stripeSessionId) return;
    let active = true;
    let timer: number | undefined;
    let attempts = 0;
    const verify = async () => {
      try {
        const confirmed = await reportVerifiedPurchase(stripeSessionId, () =>
          claimAnalytics({ stripeSessionId }).unwrap(),
        );
        if (!active) return;
        if (confirmed) {
          setConfirmedSession(stripeSessionId);
          setConfirmationError(false);
          removeStorageValue(storageKeys.abandonedCheckout);
          return;
        }
      } catch {
        if (!active) return;
      }
      if (++attempts < 20) timer = window.setTimeout(() => { void verify(); }, 3000);
      else setConfirmationError(true);
    };
    void verify();
    return () => { active = false; window.clearTimeout(timer); };
  }, [stripeSessionId, claimAnalytics]);

  useEffect(() => {
    if (!stripeSessionId || accessToken || !purchaseConfirmed) return;
    const timer = window.setTimeout(() => {
      navigate(`/signup?session_id=${encodeURIComponent(stripeSessionId)}&lang=${language}`, { replace: true });
    }, 1200);
    return () => window.clearTimeout(timer);
  }, [accessToken, navigate, stripeSessionId, purchaseConfirmed, language]);

  // Keep account state in sync; purchase confirmation uses this checkout only.
  const { data: profileData } = useGetRiderProfileQuery(undefined, {
    skip: !accessToken,
    pollingInterval: 3000, // poll every 3s until the purchase is confirmed
  });
  const waiting = !purchaseConfirmed;

  // Sync the latest user into Redux when the profile refreshes
  useEffect(() => {
    if (profileData?.user) {
      dispatch(updateUser(profileData.user));
    }
  }, [profileData, dispatch]);

  useEffect(() => {
    if (!purchaseConfirmed || !accessToken) return;
    const timer = window.setTimeout(() => {
      navigate("/launch-dashboard", { replace: true });
    }, 1200);
    return () => window.clearTimeout(timer);
  }, [navigate, purchaseConfirmed, accessToken]);

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center py-12 px-6 overflow-x-hidden selection:bg-brand-btn/30">
      {/* Full-screen background */}
      <div className="absolute inset-0 w-full h-full z-0 select-none pointer-events-none">
        <img
          src={standardBanner}
          alt="Background"
          className="w-full h-full object-cover object-center lg:object-right opacity-15"
        />
        <div className="absolute inset-0 bg-brand-page/90" />
      </div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-lg bg-brand-card/90 backdrop-blur-xl border border-brand-border/40 rounded-xl p-10 shadow-2xl text-center">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img src={standardLogo} alt="QuitTheApp Logo" className="h-10 object-contain" />
        </div>

        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            {/* Outer glow ring */}
            <div className="absolute inset-0 rounded-full bg-[#04B5A3]/20 animate-ping" />
            <div className="relative w-20 h-20 rounded-full bg-[#04B5A3]/10 border-2 border-[#04B5A3] flex items-center justify-center">
              <svg
                className="w-10 h-10 text-[#04B5A3]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Heading */}
        <div className="mb-4"><LanguageSelector /></div>
        <h1 className="text-2xl font-bold text-white tracking-tight mb-3">
          {t(purchaseConfirmed ? "Payment Successful!" : "Checking your payment")}
        </h1>

        {/* Body */}
        <p className="text-sm text-slate-300 leading-relaxed mb-2">
          {t(purchaseConfirmed ? "Your purchase has been confirmed." : "We are verifying your checkout with Stripe.")}
        </p>
        <p className="text-sm text-slate-400 leading-relaxed mb-8">
          {t(purchaseConfirmed ? (accessToken
            ? "Your launch dashboard is ready. We are taking you there now."
            : "Next, create your account so we can connect this purchase to your launch package.")
            : "Please keep this page open while we check your payment status.")}
        </p>

        {/* Waiting state: webhook not processed yet */}
        {waiting && (
          <div className="flex flex-col items-center gap-3 mb-8 py-4">
            <Loader2 className="size-8 text-[#04B5A3] animate-spin" />
            <p className="text-sm text-slate-400">{t(confirmationError || !stripeSessionId
              ? "We could not confirm this checkout. Please refresh to retry, or contact support if you were charged."
              : "Confirming your payment… this usually takes a few seconds.")}</p>
          </div>
        )}

        {/* Primary CTA */}
        {purchaseConfirmed && accessToken && (
          <Link
            to="/launch-dashboard"
            className="w-full flex justify-center items-center gap-2 h-11 px-6 rounded-lg text-sm font-semibold text-white bg-[#04B5A3] hover:bg-[#039384] transition shadow-lg shadow-[#04B5A3]/20 mb-4"
          >
            <CheckCircle2 className="size-5" />
            {t('Continue to Launch Dashboard →')}
          </Link>
        )}

        {/* Secondary link */}
        <Link
          to="/"
          className="text-sm text-slate-500 hover:text-slate-300 transition-colors"
        >
          {t('Return to Homepage')}
        </Link>
      </div>
    </div>
  );
}
