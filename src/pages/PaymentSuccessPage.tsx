import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Loader2, CheckCircle2 } from "lucide-react";
import { useGetRiderProfileQuery } from "../store/api/Auth/auth.api";
import { useConfirmRiderCheckoutSessionMutation } from "../store/api/Payment/payment.api";
import { useAppDispatch, useAppSelector } from "../hooks/storeHooks";
import { updateUser } from "../store/features/auth/authSlice";
import standardLogo from "../assets/standardLogo.png";
import standardBanner from "../assets/standardBanner.png";
import { removeStorageValue, storageKeys } from "../lib/storage";

export default function PaymentSuccessPage() {
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const [searchParams] = useSearchParams();
  const stripeSessionId = searchParams.get("session_id");
  const [confirmCheckoutSession] = useConfirmRiderCheckoutSessionMutation();

  useEffect(() => {
    if (!stripeSessionId) return;
    removeStorageValue(storageKeys.abandonedCheckout);

    if (!accessToken) return;
    void confirmCheckoutSession({ stripeSessionId }).catch(() => undefined);
  }, [accessToken, stripeSessionId, confirmCheckoutSession]);

  // Poll /auth/me to pick up the updated status after the Stripe webhook fires
  const { data: profileData, isLoading } = useGetRiderProfileQuery(undefined, {
    skip: !accessToken,
    pollingInterval: 3000, // poll every 3s until the purchase is confirmed
  });

  // Sync the latest user into Redux when the profile refreshes
  useEffect(() => {
    if (profileData?.user) {
      dispatch(updateUser(profileData.user));
    }
  }, [profileData, dispatch]);

  // The Stripe webhook marks the payment as paid asynchronously; only show
  // the dashboard CTA once the backend confirms ownership.
  const purchaseConfirmed = profileData?.purchase?.status === "paid";
  const waiting = !isLoading && !purchaseConfirmed;

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
        <h1 className="text-2xl font-bold text-white tracking-tight mb-3">
          Payment Successful!
        </h1>

        {/* Body */}
        <p className="text-sm text-slate-300 leading-relaxed mb-2">
          Your purchase has been confirmed and your account is being activated.
        </p>
        <p className="text-sm text-slate-400 leading-relaxed mb-8">
          Your dashboard is ready. Click below to start setting up your private airport business.
        </p>

        {/* Waiting state: webhook not processed yet */}
        {waiting && (
          <div className="flex flex-col items-center gap-3 mb-8 py-4">
            <Loader2 className="size-8 text-[#04B5A3] animate-spin" />
            <p className="text-sm text-slate-400">
              Confirming your payment… this usually takes a few seconds.
            </p>
          </div>
        )}

        {/* Primary CTA */}
        {purchaseConfirmed && (
          <Link
            to="/dashboard"
            className="w-full flex justify-center items-center gap-2 h-11 px-6 rounded-lg text-sm font-semibold text-white bg-[#04B5A3] hover:bg-[#039384] transition shadow-lg shadow-[#04B5A3]/20 mb-4"
          >
            <CheckCircle2 className="size-5" />
            Go to My Dashboard →
          </Link>
        )}

        {/* Secondary link */}
        <Link
          to="/"
          className="text-sm text-slate-500 hover:text-slate-300 transition-colors"
        >
          Return to Homepage
        </Link>
      </div>
    </div>
  );
}
