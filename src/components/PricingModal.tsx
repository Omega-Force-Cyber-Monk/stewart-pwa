import { useEffect, useState } from "react";
import { useAppSelector } from "../hooks/storeHooks";
import { useCreateRiderCheckoutSessionMutation } from "../store/api/Payment/payment.api";
import { readStorageValue, writeStorageValue, storageKeys } from "../lib/storage";
import { readMarketingOverlayState, setMarketingOverlayState } from "../lib/marketingOverlay";
import { Loader2, X, Check, AlertTriangle, Rocket, Users, Download, Share, Eye, ZoomIn, ZoomOut } from "lucide-react";
import { LaunchPrice } from "./marketing/LaunchPrice";
import { LAUNCH_PRICING } from "./marketing/pricing";

interface PricingModalProps {
  onClose: () => void;
  upsellKitImageSrc?: string;
  funnelCategory?: string;
  sourcePage?: string;
  isSpanish?: boolean;
  initialPlan?: "base" | "bundle";
  initialShowUpsell?: boolean;
}

const BASE_VARIANT_ID = "base_variant";
const ADDON_ID = "addon";

export function PricingModal({
  onClose,
  upsellKitImageSrc,
  funnelCategory,
  sourcePage,
  isSpanish,
  initialPlan,
  initialShowUpsell,
}: PricingModalProps) {
  const spanish = Boolean(
    isSpanish || funnelCategory === "SPANISH" || sourcePage === "SPANISH"
  );

  const { accessToken, user } = useAppSelector((state) => state.auth);
  const [selectedPlan, setSelectedPlan] = useState<"base" | "bundle" | null>(
    initialPlan ?? null
  );
  const [isDfyCheckout, setIsDfyCheckout] = useState(
    () => initialPlan === "bundle"
  );
  const [guestEmail, setGuestEmail] = useState(() => {
    try {
      const raw = readStorageValue(storageKeys.abandonedCheckout);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (typeof parsed?.email === "string" && parsed.email.trim()) {
          return parsed.email.trim();
        }
      }
    } catch {
      // ignore
    }
    return user?.email || "";
  });
  const [validationError, setValidationError] = useState("");
  const [showUpsell, setShowUpsell] = useState(initialShowUpsell ?? false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [createCheckoutSession, { isLoading, error }] =
    useCreateRiderCheckoutSessionMutation();

  useEffect(() => {
    if (initialPlan === "bundle") {
      setSelectedPlan("bundle");
      setIsDfyCheckout(true);
    } else {
      setIsDfyCheckout(false);
      setSelectedPlan(initialPlan || "base");
    }
  }, [initialPlan]);

  useEffect(() => {
    if (initialShowUpsell !== undefined) {
      setShowUpsell(initialShowUpsell);
    }
  }, [initialShowUpsell]);

  useEffect(() => {
    const current = readMarketingOverlayState();
    setMarketingOverlayState({ ...current, pricingModalVisible: true });
    return () => {
      const next = readMarketingOverlayState();
      setMarketingOverlayState({ ...next, pricingModalVisible: false });
    };
  }, []);

  const content = spanish
    ? {
        title: "Elige tu paquete de lanzamiento",
        subtitle:
          "Pago único. Sin cuotas mensuales. Sé dueño total de tu negocio.",
        emailLabel: "Correo electrónico",
        emailPlaceholder: "nombre@ejemplo.com",
        emailHelp:
          "Usaremos este correo para conectar tu compra con tu cuenta.",
        emailRequired:
          "Por favor, ingresa tu correo electrónico para continuar.",
        emailInvalid: "Por favor, ingresa un correo electrónico válido.",
        errorGeneric: "Algo salió mal. Por favor, inténtalo de nuevo.",
        errorConnection:
          "Error al iniciar el pago. Por favor, verifica tu conexión.",
        plan1Tag: "Hazlo tú mismo",
        plan1Title: "Kit de Lanzamiento",
        plan1Interval: "pago único",
        plan1Features: [
          "Kit completo de herramientas de lanzamiento",
          "Plantilla de tarjeta de referencia",
          "Repeat Rider Engine™",
          "Centro de Adquisición de Clientes™",
          "Sistema de Reservas Quick Launch™",
          "Página de Venta Personalizada™",
          "Guía de elementos esenciales de lanzamiento",
          "Biblioteca de recursos y guías",
        ],
        plan1Cta: `Comenzar — ${LAUNCH_PRICING.base}`,
        plan2Badge: "Más Popular",
        plan2Tag: "Mejora Hecha Para Ti",
        plan2Title: "Kit de Marketing",
        plan2PriceLabel: "PRECIO DE MEJORA",
        plan2Interval: "pago único",
        plan2Subtext: `Agrégalo a tu Kit de Lanzamiento de ${LAUNCH_PRICING.base}`,
        plan2Features: [
          "Configuración Completa de Negocio",
          "Todos los Materiales de Marketing",
          "Configuración de Acuity Scheduling",
          "Página de Venta Personalizada",
          "Código QR y Recursos de Referencia",
          "3 Videos de Lanzamiento",
          "Soporte Continuo",
        ],
        plan2Cta: `SÍ, HÁGANLO POR MÍ +${LAUNCH_PRICING.addon}`,
        dfyServiceBadge: "SERVICIO COMPLETO",
        dfyBaseLine: "Kit de Lanzamiento",
        dfyAddonLine: "Mejora Lo Hacemos Por Ti",
        dfyCheckoutCta: "SÍ, HÁGANLO POR MÍ — $394 EN TOTAL",
        plan2ViewDetails: "Ver Detalles del Paquete Adicional",
        stripeNote:
          "Pago seguro a través de Stripe. No se te cobrará hasta que confirmes en la página siguiente.",
        dfyTitle: "Mejora Hecha Para Ti QuitTheApp",
        dfyBottomCta: "AGREGA LA MEJORA HECHA PARA TI DE $99",
        dfyBottomSub: "$295 Kit Base + $99 Hecho Por Ti = $394 Total",
        totalLabel: "Total hoy:",
        dfyCheckoutTitle: "Finalizar Compra — Mejora Hecha Para Ti",
        dfyCheckoutSubtitle:
          "Pago único. Kit de Lanzamiento Base ($295) + Mejora Hecha Para Ti ($99).",
        dfySwitchPlan: "← Ver todas las opciones de paquetes",
        dfyReturnLink: "Volver a los ejemplos de marketing",
        share: "Compartir",
        download: "Descargar",
        close: "Cerrar",
        linkCopied: "¡Enlace copiado al portapapeles!",
      }
    : {
        title: "Choose Your Launch Package",
        subtitle:
          "One-time payment. No monthly fees. Own your business outright.",
        emailLabel: "Email address",
        emailPlaceholder: "name@example.com",
        emailHelp:
          "We’ll use this email to connect your purchase to your account.",
        emailRequired: "Please enter your email address to continue.",
        emailInvalid: "Please enter a valid email address.",
        errorGeneric: "Something went wrong. Please try again.",
        errorConnection:
          "Failed to start checkout. Please check your connection.",
        plan1Tag: "Do It Yourself",
        plan1Title: "Launch Kit",
        plan1Interval: "one-time",
        plan1Features: [
          "Full launch system toolkit",
          "Referral card template",
          "Repeat Rider Engine™",
          "Client Acquisition Center™",
          "Quick Launch Booking System™",
          "Personalized Selling Page™",
          "Launch essentials guide",
          "Resources & guides library",
        ],
        plan1Cta: `Get Started — ${LAUNCH_PRICING.base}`,
        plan2Badge: "Most Popular",
        plan2Tag: "Done For You Upgrade",
        plan2Title: "Marketing Kit",
        plan2PriceLabel: "UPGRADE PRICE",
        plan2Interval: "one-time",
        plan2Subtext: `Add to your ${LAUNCH_PRICING.base} Launch Kit`,
        plan2Features: [
          "Complete Business Setup",
          "All Marketing Materials",
          "Acuity Scheduling Setup",
          "Personalized Selling Page",
          "QR Code & Referral Assets",
          "3 Launch Videos",
          "Ongoing Support",
        ],
        plan2Cta: `YES, DO IT FOR ME +${LAUNCH_PRICING.addon}`,
        dfyServiceBadge: "FULL SERVICE",
        dfyBaseLine: "Launch Kit",
        dfyAddonLine: "Done For You Upgrade",
        dfyCheckoutCta: "YES, DO IT FOR ME — $394 TOTAL",
        plan2ViewDetails: "View Add-on Details",
        stripeNote:
          "Secure payment via Stripe. You won't be charged until you confirm on the next page.",
        dfyTitle: "QuitTheApp Done For You Upgrade",
        dfyBottomCta: "ADD THE $99 DONE FOR YOU UPGRADE",
        dfyBottomSub: "$295 Base Kit + $99 Done For You = $394 Total",
        totalLabel: "Total due today:",
        dfyCheckoutTitle: "Done For You Upgrade Checkout",
        dfyCheckoutSubtitle:
          "One-time payment. Base Launch Kit ($295) + Done For You Upgrade ($99).",
        dfySwitchPlan: "← View all package options",
        dfyReturnLink: "Back to marketing examples",
        share: "Share",
        download: "Download",
        close: "Close",
        linkCopied: "Link copied to clipboard!",
      };

  const handleSelectPlan = async (
    plan: "base" | "bundle",
    emailOverride?: string
  ) => {
    setValidationError("");

    const email = (emailOverride !== undefined ? emailOverride : guestEmail)
      .trim()
      .toLowerCase();
    if (!accessToken && !email) {
      setValidationError(content.emailRequired);
      return;
    }
    if (!accessToken && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setValidationError(content.emailInvalid);
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
        ...(funnelCategory ? { funnelCategory } : {}),
        ...(sourcePage ? { sourcePage } : {}),
        ...(spanish ? { locale: "es" } : {}),
        successUrl: `${window.location.origin}/payment/success?session_id={CHECKOUT_SESSION_ID}&plan=${plan}`,
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
          })
        );
        window.location.href = result.checkoutUrl;
      }
    } catch (err: unknown) {
      console.error("Checkout session failed:", err);
      // Keep selected plan intact on failure
    }
  };

  const handleDfyBottomCta = () => {
    if (isLoading) return;
    setSelectedPlan("bundle");
    setIsDfyCheckout(true);
    setValidationError("");
    setShowUpsell(false);
    if (!accessToken) {
      setTimeout(() => {
        document.getElementById("guest-checkout-email")?.focus();
      }, 50);
    }
  };

  const getErrorMessage = () => {
    if (validationError) return validationError;
    if (!error) return "";
    if ("data" in error) {
      const data = error.data as { message?: string | string[] };
      const msg = Array.isArray(data.message) ? data.message[0] : data.message;

      return msg || content.errorGeneric;
    }
    return content.errorConnection;
  };

  const errorMessage = getErrorMessage();
  const returnTargets: Record<string, string> = {
    MAIN: "/#experience",
    STANDARD: "/#experience",
    WOMEN: "/women#reviews",
    SENIOR: "/senior#proven-model-and-faq",
    FIFTY_PLUS: "/senior#proven-model-and-faq",
    COUPLE: "/couple#proven-model",
    SPANISH: "/spanish#proven-model",
  };
  const dfyReturnTarget =
    returnTargets[sourcePage ?? ""] || returnTargets[funnelCategory ?? ""] || "/#experience";

  return (
    <>
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
              aria-label={content.close}
            >
              <X className="size-5" />
            </button>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              {isDfyCheckout ? content.dfyCheckoutTitle : content.title}
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              {isDfyCheckout ? content.dfyCheckoutSubtitle : content.subtitle}
            </p>
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div className="mx-8 mt-6 bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-start gap-3 flex-shrink-0">
              <AlertTriangle className="size-5 text-red-400 shrink-0 mt-0.5" />
              <span className="text-sm text-red-200 leading-snug">
                {errorMessage}
              </span>
            </div>
          )}

          {!accessToken && (
            <div className="px-6 pt-6">
              <label
                htmlFor="guest-checkout-email"
                className="block text-sm font-medium text-slate-300"
              >
                {content.emailLabel}
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
                placeholder={content.emailPlaceholder}
                className="mt-2 block w-full rounded-lg border border-[#00E5FF33] bg-[#0B0D2C] px-3 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
              />
              <p className="mt-2 text-xs text-slate-500">{content.emailHelp}</p>
            </div>
          )}

          {isDfyCheckout ? (
            /* Dedicated DFY Preselected Checkout View */
            <div className="p-6 overflow-y-auto min-h-0 flex flex-col gap-4">
              <div className="relative flex flex-col bg-[#0B0D2C] border-2 border-[#04B5A3] shadow-[0_0_35px_rgba(4,181,163,0.35)] ring-2 ring-[#04B5A3] rounded-xl p-5">
                {/* Popular badge */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-[#04B5A3] text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider whitespace-nowrap shadow-lg">
                    {content.dfyServiceBadge}
                  </span>
                </div>

                <div className="flex items-center gap-3 mb-4 mt-2">
                  <div className="bg-[#04B5A3]/10 rounded-lg p-2">
                    <Users className="size-6 text-[#04B5A3]" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-[#04B5A3]">
                      {content.plan2Tag}
                    </p>
                    <h3 className="text-lg font-bold text-white leading-tight">
                      {content.plan2Title}
                    </h3>
                  </div>
                </div>

                <div className="mb-4 bg-[#12143A]/80 border border-[#00E5FF22] rounded-lg p-3">
                  <div className="flex justify-between items-baseline mb-1 text-sm">
                    <span className="text-slate-300">{content.dfyBaseLine}:</span>
                    <span className="font-semibold text-white">{LAUNCH_PRICING.base}</span>
                  </div>
                  <div className="flex justify-between items-baseline mb-2 text-sm">
                    <span className="text-[#04B5A3] font-medium">{content.dfyAddonLine}:</span>
                    <span className="font-semibold text-[#04B5A3]">{LAUNCH_PRICING.addon}</span>
                  </div>
                  <div className="border-t border-[#00E5FF33] pt-2 flex justify-between items-baseline">
                    <span className="text-sm font-bold text-white">{content.totalLabel}</span>
                    <span className="text-2xl font-extrabold text-[#04B5A3]">$394</span>
                  </div>
                </div>

                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6 text-sm text-slate-300">
                  {content.plan2Features.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <Check className="size-4 text-[#04B5A3] shrink-0 mt-0.5 stroke-[3]" />
                      <span className="text-xs sm:text-sm">{item}</span>
                    </li>
                  ))}
                </ul>

                <button
                  id="checkout-pay-btn"
                  onClick={() => handleSelectPlan("bundle")}
                  disabled={isLoading}
                  className="w-full flex justify-center items-center gap-2 h-12 px-6 rounded-xl text-base font-bold text-white bg-[#04B5A3] hover:bg-[#039384] transition disabled:opacity-60 disabled:cursor-not-allowed shadow-[0_0_25px_rgba(4,181,163,0.35)]"
                >
                  {isLoading && selectedPlan === "bundle" ? (
                    <Loader2 className="size-5 animate-spin" />
                  ) : (
                    <Rocket className="size-5" />
                  )}
                  <span>{content.dfyCheckoutCta}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsDfyCheckout(false);
                    setSelectedPlan("base");
                    setValidationError("");
                  }}
                  className="mt-4 text-sm font-semibold text-[#04B5A3] hover:text-[#67f4e5]"
                >
                  {content.dfySwitchPlan}
                </button>
              </div>
            </div>
          ) : (
            /* Normal 2-Column Choice View for Entry A */
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-6 overflow-y-auto min-h-0">
              {/* Plan 1: Do It Yourself */}
              <div
                onClick={() => setSelectedPlan("base")}
                className={`relative flex flex-col bg-[#0B0D2C] border rounded-xl p-5 transition-all duration-200 cursor-pointer ${
                  selectedPlan === "base"
                    ? "border-[#04B5A3] ring-2 ring-[#04B5A3]/40"
                    : "border-[#00E5FF33] hover:border-cyan-400/60"
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-cyan-400/10 rounded-lg p-2">
                    <Rocket className="size-6 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400">
                      {content.plan1Tag}
                    </p>
                    <h3 className="text-lg font-bold text-white leading-tight">
                      {content.plan1Title}
                    </h3>
                  </div>
                </div>

                <div className="mb-4">
                  <LaunchPrice
                    priceClassName="text-4xl text-white"
                    oldClassName="text-slate-400"
                    labelClassName="text-cyan-400"
                  />
                  <span className="text-slate-400 text-sm ml-1">
                    {content.plan1Interval}
                  </span>
                </div>

                <ul className="space-y-2 mb-6 flex-1">
                  {content.plan1Features.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-slate-300"
                    >
                      <Check className="size-4 text-cyan-400 shrink-0 mt-0.5 stroke-[3]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectPlan("base");
                  }}
                  disabled={isLoading}
                  className="w-full flex justify-center items-center gap-2 h-10 px-4 rounded-lg text-sm font-semibold text-white bg-[#04B5A3] hover:bg-[#039384] transition disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isLoading && selectedPlan === "base" ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : null}
                  {content.plan1Cta}
                </button>
              </div>

              {/* Plan 2: Done For You */}
              <div
                onClick={() => setSelectedPlan("bundle")}
                className={`relative flex flex-col bg-[#0B0D2C] border-2 rounded-xl p-5 transition-all duration-200 cursor-pointer ${
                  selectedPlan === "bundle"
                    ? "border-[#04B5A3] shadow-[0_0_35px_rgba(4,181,163,0.35)] ring-2 ring-[#04B5A3]"
                    : "border-[#04B5A3] shadow-[0_0_30px_rgba(4,181,163,0.15)]"
                }`}
              >
                {/* Popular badge */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-[#04B5A3] text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider whitespace-nowrap shadow-lg">
                    {content.plan2Badge}
                  </span>
                </div>

                <div className="flex items-center gap-3 mb-4 mt-2">
                  <div className="bg-[#04B5A3]/10 rounded-lg p-2">
                    <Users className="size-6 text-[#04B5A3]" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-[#04B5A3]">
                      {content.plan2Tag}
                    </p>
                    <h3 className="text-lg font-bold text-white leading-tight">
                      {content.plan2Title}
                    </h3>
                  </div>
                </div>

                <div className="mb-1">
                  <LaunchPrice
                    price={LAUNCH_PRICING.addon}
                    label={content.plan2PriceLabel}
                    priceClassName="text-4xl text-white"
                    oldClassName="text-slate-400"
                    labelClassName="text-[#04B5A3]"
                  />
                  <span className="text-slate-400 text-sm ml-1">
                    {content.plan2Interval}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mb-4">
                  {content.plan2Subtext}
                </p>

                <ul className="space-y-2 mb-6 flex-1">
                  {content.plan2Features.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-slate-300"
                    >
                      <Check className="size-4 text-[#04B5A3] shrink-0 mt-0.5 stroke-[3]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectPlan("bundle");
                  }}
                  disabled={isLoading}
                  className="w-full flex justify-center items-center gap-2 h-10 px-4 rounded-lg text-sm font-semibold text-white bg-[#04B5A3] hover:bg-[#039384] transition disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isLoading && selectedPlan === "bundle" ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : null}
                  {content.plan2Cta}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedPlan("bundle");
                    setShowUpsell(true);
                  }}
                  className="w-full flex justify-center items-center gap-2 h-10 px-4 mb-4 rounded-lg text-sm font-semibold text-[#04B5A3] bg-[#04B5A3]/10 hover:bg-[#04B5A3]/20 transition"
                >
                  <Eye className="size-4" />
                  {content.plan2ViewDetails}
                </button>
              </div>
            </div>
          )}

          <div className="px-8 pb-6 text-center flex-shrink-0">
            <p className="text-xs text-slate-500">{content.stripeNote}</p>
          </div>
        </div>
      </div>

      {/* Fullscreen Done For You Upgrade Preview */}
      {showUpsell && upsellKitImageSrc && (
        <div className="fixed inset-0 z-[10000] bg-black/95 flex flex-col items-center justify-between p-3 sm:p-4">
          {/* Top Bar with actions */}
          <div className="w-full max-w-5xl flex justify-between items-center mb-2 gap-4 flex-shrink-0 z-10">
            <span className="text-white font-bold text-sm sm:text-base tracking-tight truncate">
              {content.dfyTitle}
            </span>
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <button
                onClick={async () => {
                  if (navigator.share) {
                    try {
                      await navigator.share({
                        title: content.dfyTitle,
                        url: window.location.origin + upsellKitImageSrc,
                      });
                    } catch {
                      // Ignore share cancellation
                    }
                  } else {
                    navigator.clipboard.writeText(
                      window.location.origin + upsellKitImageSrc
                    );
                    alert(content.linkCopied);
                  }
                }}
                className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition text-xs sm:text-sm"
              >
                <Share className="size-4" />
                <span className="hidden sm:inline">{content.share}</span>
              </button>
              <a
                href={upsellKitImageSrc}
                download
                className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition text-xs sm:text-sm"
              >
                <Download className="size-4" />
                <span className="hidden sm:inline">{content.download}</span>
              </a>
              <button
                onClick={() => setShowUpsell(false)}
                className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition text-xs sm:text-sm"
              >
                <X className="size-4" />
                <span className="hidden sm:inline">{content.close}</span>
              </button>
            </div>
          </div>

          {/* Zoom controls */}
          <div className="w-full max-w-5xl flex justify-center mb-2 gap-2 flex-shrink-0 z-10">
            <button
              onClick={() => setZoomLevel((prev) => Math.max(0.5, prev - 0.25))}
              className="p-1.5 sm:p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition"
              aria-label="Zoom Out"
            >
              <ZoomOut className="size-4 sm:size-5" />
            </button>
            <span className="text-white font-mono flex items-center px-2 text-xs sm:text-sm">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={() => setZoomLevel((prev) => Math.min(3, prev + 0.25))}
              className="p-1.5 sm:p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition"
              aria-label="Zoom In"
            >
              <ZoomIn className="size-4 sm:size-5" />
            </button>
          </div>

          {/* Scrollable graphic container */}
          <div className="flex-1 w-full max-w-5xl overflow-auto flex relative min-h-0">
            <div
              className="m-auto flex-shrink-0 relative"
              style={{
                width: `${zoomLevel * 100}%`,
                transition: "width 0.2s ease-out",
              }}
            >
              <img
                src={upsellKitImageSrc}
                alt={content.dfyTitle}
                className="w-full h-auto shadow-2xl rounded-lg"
              />
              {/* Transparent click hotspot over the existing visual CTA button in the graphic */}
              <button
                id="dfy-bottom-cta"
                type="button"
                onClick={() => handleDfyBottomCta()}
                disabled={isLoading}
                className="absolute right-[1.8%] bottom-[5.5%] w-[37.5%] h-[7.2%] cursor-pointer rounded-2xl bg-transparent border-0 focus:outline-none focus:ring-2 focus:ring-[#04B5A3]/50 transition-colors"
                title={content.dfyBottomCta}
                aria-label={content.dfyBottomCta}
              />
            </div>
          </div>
          <a
            href={dfyReturnTarget}
            className="mt-3 rounded-lg bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
          >
            {content.dfyReturnLink}
          </a>
        </div>
      )}
    </>
  );
}
