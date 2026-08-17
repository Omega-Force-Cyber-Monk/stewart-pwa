import { useState } from "react";
import { useAppSelector } from "../hooks/storeHooks";
import { useCreateRiderCheckoutSessionMutation } from "../store/api/Payment/payment.api";
import { writeStorageValue, storageKeys } from "../lib/storage";
import { Loader2, X, Check, AlertTriangle, Rocket, Users } from "lucide-react";

interface PricingModalProps {
  onClose: () => void;
}

const BASE_VARIANT_ID = "base_variant";
const ADDON_ID = "addon";

export function PricingModal({ onClose }: PricingModalProps) {
  const [selectedPlan, setSelectedPlan] = useState<"base" | "bundle" | null>(null);
  const [guestEmail, setGuestEmail] = useState("");
  const [validationError, setValidationError] = useState("");
  const { accessToken } = useAppSelector((state) => state.auth);
  const [createCheckoutSession, { isLoading, error }] = useCreateRiderCheckoutSessionMutation();

  const handleSelectPlan = async (plan: "base" | "bundle") => {
    setValidationError("");

    const email = guestEmail.trim().toLowerCase();
    if (!accessToken && !email) {
      setValidationError("Please enter your email address to continue.");
      return;
    }
    if (!accessToken && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setValidationError("Please enter a valid email address.");
      return;
    }

    setSelectedPlan(plan);
    const items =
      plan === "base"
        ? [{ productId: BASE_VARIANT_ID, quantity: 1 }]
        : [
          { productId: BASE_VARIANT_ID, quantity: 1 },
          { productId: ADDON_ID, quantity: 1 },
        ];

    try {
      const currentUrl = new URL(window.location.href);
      currentUrl.searchParams.set("checkout", "cancelled");
      const result = await createCheckoutSession({
        items,
        ...(accessToken ? {} : { email }),
        successUrl: `${window.location.origin}${accessToken ? "/payment/success" : "/signup"}?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: currentUrl.toString(),
      }).unwrap();
      if (result.checkoutUrl) {
        writeStorageValue(
          storageKeys.abandonedCheckout,
          JSON.stringify({
            sessionId: result.sessionId,
            plan,
            email: accessToken ? undefined : email,
            startedAt: Date.now(),
          }),
        );
        window.location.href = result.checkoutUrl;
      }
    } catch (err: unknown) {
      console.error("Checkout session failed:", err);
      setSelectedPlan(null);
    }
  };

  const getErrorMessage = () => {
    if (validationError) return validationError;
    if (!error) return "";
    if ("data" in error) {
      const data = error.data as { message?: string | string[] };
      const msg = Array.isArray(data.message) ? data.message[0] : data.message;

      return msg || "Something went wrong. Please try again.";
    }
    return "Failed to start checkout. Please check your connection.";
  };

  const errorMessage = getErrorMessage();

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative w-full max-w-3xl bg-[#12143A] border border-[#00E5FF33] rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[calc(100dvh-2rem)] flex flex-col">
        {/* Header */}
        <div className="relative px-8 pt-8 pb-6 text-center border-b border-[#00E5FF33] flex-shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition"
            aria-label="Close"
          >
            <X className="size-5" />
          </button>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Choose Your Launch Package
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            One-time payment. No monthly fees. Own your business outright.
          </p>
        </div>

        {/* Error Banner */}
        {errorMessage && (
          <div className="mx-8 mt-6 bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-start gap-3 flex-shrink-0">
            <AlertTriangle className="size-5 text-red-400 shrink-0 mt-0.5" />
            <span className="text-sm text-red-200 leading-snug">{errorMessage}</span>
          </div>
        )}

        {!accessToken && (
          <div className="px-6 pt-6">
            <label htmlFor="guest-checkout-email" className="block text-sm font-medium text-slate-300">
              Email address
            </label>
            <input
              id="guest-checkout-email"
              name="guest-checkout-email"
              type="email"
              autoComplete="email"
              required
              value={guestEmail}
              onChange={(event) => {
                setGuestEmail(event.target.value);
                if (validationError) setValidationError("");
              }}
              placeholder="name@example.com"
              className="mt-2 block w-full rounded-lg border border-[#00E5FF33] bg-[#0B0D2C] px-3 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
            />
            <p className="mt-2 text-xs text-slate-500">
              We’ll use this email to connect your purchase to your account.
            </p>
          </div>
        )}

        {/* Plan Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-6 overflow-y-auto min-h-0">
          {/* Plan 1: Do It Yourself */}
          <div className="relative flex flex-col bg-[#0B0D2C] border border-[#00E5FF33] rounded-xl p-5 hover:border-cyan-400/60 transition-all duration-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-cyan-400/10 rounded-lg p-2">
                <Rocket className="size-6 text-cyan-400" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400">
                  Do It Yourself
                </p>
                <h3 className="text-lg font-bold text-white leading-tight">
                  Launch Kit
                </h3>
              </div>
            </div>

            <div className="mb-4">
              <span className="text-4xl font-extrabold text-white">$495</span>
              <span className="text-slate-400 text-sm ml-1">one-time</span>
            </div>

            <ul className="space-y-2 mb-6 flex-1">
              {[
                "Full launch system toolkit",
                "Referral card template",
                "Repeat Rider Engine™",
                "Client Acquisition Center™",
                "Quick Launch Booking System™",
                "Personalized Selling Page™",
                "Launch essentials guide",
                "Resources & guides library",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-slate-300">
                  <Check className="size-4 text-cyan-400 shrink-0 mt-0.5 stroke-[3]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleSelectPlan("base")}
              disabled={isLoading}
              className="w-full flex justify-center items-center gap-2 h-10 px-4 rounded-lg text-sm font-semibold text-white bg-[#04B5A3] hover:bg-[#039384] transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading && selectedPlan === "base" ? (
                <Loader2 className="size-4 animate-spin" />
              ) : null}
              Get Started — $495
            </button>
          </div>

          {/* Plan 2: Done For You */}
          <div className="relative flex flex-col bg-[#0B0D2C] border-2 border-[#04B5A3] rounded-xl p-5 shadow-[0_0_30px_rgba(4,181,163,0.15)]">
            {/* Popular badge */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="bg-[#04B5A3] text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider whitespace-nowrap shadow-lg">
                Most Popular
              </span>
            </div>

            <div className="flex items-center gap-3 mb-4 mt-2">
              <div className="bg-[#04B5A3]/10 rounded-lg p-2">
                <Users className="size-6 text-[#04B5A3]" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#04B5A3]">
                  Done For You
                </p>
                <h3 className="text-lg font-bold text-white leading-tight">
                  Premium Launch Kit
                </h3>
              </div>
            </div>

            <div className="mb-1">
              <span className="text-4xl font-extrabold text-white">$694</span>
              <span className="text-slate-400 text-sm ml-1">one-time</span>
            </div>
            <p className="text-xs text-slate-500 mb-4">$495 base + $199 add-on</p>

            <ul className="space-y-2 mb-6 flex-1">
              {[
                "Everything in the Launch Kit",
                "Done-for-you setup assistance",
                "Custom business page setup",
                "Priority onboarding support",
                "Professional review & feedback",
                "Referral card custom design",
                "Personalized selling page setup",
                "Hands-on implementation support",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-slate-300">
                  <Check className="size-4 text-[#04B5A3] shrink-0 mt-0.5 stroke-[3]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleSelectPlan("bundle")}
              disabled={isLoading}
              className="w-full flex justify-center items-center gap-2 h-10 px-4 rounded-lg text-sm font-semibold text-white bg-[#04B5A3] hover:bg-[#039384] transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading && selectedPlan === "bundle" ? (
                <Loader2 className="size-4 animate-spin" />
              ) : null}
              Get Started — $694
            </button>
          </div>
        </div>

        <div className="px-8 pb-6 text-center flex-shrink-0">
          <p className="text-xs text-slate-500">
            Secure payment via Stripe. You won't be charged until you confirm on the next page.
          </p>
        </div>
      </div>
    </div>
  );
}
