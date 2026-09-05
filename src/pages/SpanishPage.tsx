import spanishLogo from "../assets/logo_standard.png";
import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Menu, X, Plane } from "lucide-react";
import { cn } from "../lib/cn";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  Gift,
  Lock,
  Monitor,
  RefreshCcw,
  Rocket,
  ShieldCheck,
  Star,
  Users,
  Clock,
  Check,
  Globe,
  Heart,
  TrendingUp,
  Car,
} from "lucide-react";
import { PageContainer } from "../components/layout/PageContainer";
import { ProfileDropdown } from "../components/ProfileDropdown";
import { PricingModal } from "../components/PricingModal";
import { useAppDispatch, useAppSelector } from "../hooks/storeHooks";
import { logOut } from "../store/features/auth/authSlice";
import { useLogoutUserMutation } from "../store/api/Auth/auth.api";
import spanishBanner from "../assets/spanishBanner.png";
import { PaymentBadges } from "../components/common/PaymentBadges";
import spanishHero from "../assets/spanishHero.png";
import upsellKit from "../assets/spanish_upsell_kit.png";

export default function SpanishPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  // Auto-open the pricing modal when redirected here with ?showPricing=true.
  const [showPricingModal, setShowPricingModal] = useState(
    () => searchParams.get("showPricing") === "true"
  );

  // Clear the ?showPricing=true query param once considered
  useEffect(() => {
    if (searchParams.get("showPricing") === "true") {
      setSearchParams({}, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const openPricingModal = () => setShowPricingModal(true);

  return (
    <>
      {showPricingModal && (
        <PricingModal onClose={() => setShowPricingModal(false)} upsellKitImageSrc={upsellKit} />
      )}
      <SpanishNavbar openPricingModal={openPricingModal} />
      <HeroBanner openPricingModal={openPricingModal} />
      <BusinessBuiltAroundYourLifeSection />
      <AllYouNeedSection />
      <HowItWorksSection />
      <ProvenModelSection />
      <HowItWorksAndFaqSection openPricingModal={openPricingModal} />
    </>
  );
}

function SpanishNavbar({ openPricingModal }: { openPricingModal: () => void }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { accessToken, user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [logoutUser] = useLogoutUserMutation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
    } catch (e) {
      console.error("Logout failed:", e);
    }
    dispatch(logOut());
  };

  return (
    <>
      <nav
        className={cn(
          "left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "fixed top-0 bg-[#040a23]/95 backdrop-blur-md shadow-md py-3"
            : "absolute top-0 bg-transparent py-4",
        )}
      >
        <PageContainer size="full">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/spanish" className="flex items-center gap-2 z-50">
              <img
                src={spanishLogo}
                alt="QuitTheApp Logo"
                className="h-8 lg:h-10 object-contain"
              />
            </Link>

            {/* Desktop Navigation & CTA */}
            <div className="hidden lg:flex items-center gap-8">
              <nav className="flex items-center gap-8">
                <a
                  href="#how-it-works"
                  className="text-white hover:text-[#22c55e] text-sm font-semibold transition-colors"
                >
                  Cómo Funciona
                </a>
                <a
                  href="#how-it-works-steps"
                  className="text-white hover:text-[#22c55e] text-sm font-semibold transition-colors"
                >
                  Qué Incluye
                </a>
                <a
                  href="#reviews"
                  className="text-white hover:text-[#22c55e] text-sm font-semibold transition-colors"
                >
                  Casos de Éxito
                </a>
                <a
                  href="#faq"
                  className="text-white hover:text-[#22c55e] text-sm font-semibold transition-colors"
                >
                  FAQ
                </a>
              </nav>

              {accessToken ? (
                <ProfileDropdown openPricingModal={openPricingModal} />
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-white hover:text-[#22c55e] text-sm font-semibold transition-colors"
                  >
                    Iniciar sesión
                  </Link>
                  <button
                    onClick={openPricingModal}
                    className="cursor-pointer bg-[#16a34a] hover:bg-[#15803d] text-white font-bold py-2.5 px-6 rounded-md transition-colors text-sm shadow-lg"
                  >
                    Empezar mi negocio privado de transporte — $495
                  </button>
                </>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="cursor-pointer lg:hidden text-white z-50 p-2 -mr-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </PageContainer>
      </nav>
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#040a23] pt-24 px-6 flex flex-col lg:hidden overflow-y-auto">
          <a
            href="#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="text-white hover:text-[#22c55e] text-lg font-semibold py-4 border-b border-white/10 transition-colors"
          >
            Cómo Funciona
          </a>
          <a
            href="#how-it-works-steps"
            onClick={() => setMobileMenuOpen(false)}
            className="text-white hover:text-[#22c55e] text-lg font-semibold py-4 border-b border-white/10 transition-colors"
          >
            Qué Incluye
          </a>
          <a
            href="#reviews"
            onClick={() => setMobileMenuOpen(false)}
            className="text-white hover:text-[#22c55e] text-lg font-semibold py-4 border-b border-white/10 transition-colors"
          >
            Casos de Éxito
          </a>
          <a
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="text-white hover:text-[#22c55e] text-lg font-semibold py-4 border-b border-white/10 transition-colors"
          >
            FAQ
          </a>

          {accessToken ? (
            <>
              {user?.role === "admin" ? (
                <Link
                  to="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-white hover:text-[#22c55e] text-lg font-semibold py-4 border-b border-white/10 transition-colors"
                >
                  Panel de Administración
                </Link>
              ) : user?.status === "active" ? (
                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-white hover:text-[#22c55e] text-lg font-semibold py-4 border-b border-white/10 transition-colors"
                >
                  Panel de Control
                </Link>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openPricingModal();
                  }}
                  className="text-left text-white hover:text-[#22c55e] text-lg font-semibold py-4 border-b border-white/10 transition-colors w-full"
                >
                  Completar Compra
                </button>
              )}
              <Link
                to={user?.role === "admin" ? "/admin/settings" : "/profile"}
                onClick={() => setMobileMenuOpen(false)}
                className="text-white hover:text-[#22c55e] text-lg font-semibold py-4 border-b border-white/10 transition-colors"
              >
                {user?.role === "admin" ? "Configuración de Administración" : "Perfil y Configuración"}
              </Link>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogout();
                }}
                className="text-left text-red-400 hover:text-red-300 text-lg font-semibold py-4 border-b border-white/10 transition-colors w-full"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="text-white hover:text-[#22c55e] text-lg font-semibold py-4 border-b border-white/10 transition-colors"
              >
                Iniciar sesión
              </Link>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openPricingModal();
                }}
                className="cursor-pointer bg-[#16a34a] hover:bg-[#15803d] text-white font-bold py-3 px-6 rounded-md transition-colors w-full mt-4 min-h-[52px]"
              >
                Empezar mi negocio privado de transporte — $495
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}

function HeroBanner({ openPricingModal }: { openPricingModal: () => void }) {
  const { accessToken } = useAppSelector((state) => state.auth);

  return (
    <div className="relative w-full data-exit-intent-hero min-h-[100svh] lg:min-h-[90svh] pt-[clamp(64px,8vw,80px)] flex flex-col justify-between overflow-hidden bg-[#040a23]">
      {/* Background Image on the right side */}
      <div className="absolute inset-0 w-full h-full flex justify-end bg-[#040a23]">
        <div className="relative w-full max-w-[1240px] h-full">
          {/* Left edge fade for ultra-wide screens */}
          <div className="hidden lg:block absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-[#040a23] via-[#040a23]/80 to-transparent z-10"></div>
          <img
            src={spanishBanner}
            alt="Spanish Banner"
            className="hidden lg:block w-full h-full object-cover object-[75%_top] sm:object-[80%_top] lg:object-[85%_center] pointer-events-none opacity-90"
          />
      {/* Mobile Background Image */}
      <img
        src={spanishHero}
        alt="Phone concept mobile"
        className="block lg:hidden absolute inset-0 w-full h-full object-cover object-right-top pointer-events-none"
      />
        </div>
      </div>
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-[#040a23]/95 via-[#040a23]/50 to-[#040a23]/20 lg:bg-gradient-to-r lg:from-[#040a23] lg:via-[#040a23]/80 lg:to-transparent z-0"></div>

      {/* Main Content dictating height */}
      <div className="relative z-10 w-full flex-grow flex pb-8 items-center pt-8 lg:pt-0">
        <PageContainer size="full" className="flex flex-col h-full justify-center">
          <div className="flex flex-col lg:flex-row w-full justify-between items-center lg:items-stretch flex-grow gap-[clamp(1.5rem,4vw,3rem)]">
            {/* Left Side Content */}
            <div className="w-full max-w-[clamp(280px,40vw,672px)] text-left z-10 self-center">
              <h1 className="text-[clamp(2rem,4vw,3.25rem)] font-bold text-white leading-[1.1] mb-[clamp(1rem,1.5vw,1.25rem)] tracking-tight text-balance uppercase">
                CONSTRUYE <br />
                ALGO TUYO. <br />
                <span className="text-[#22c55e]">A TU MANERA.</span>
              </h1>

              <p className="text-[clamp(1rem,1.35vw,1.125rem)] text-slate-200 mb-[clamp(1.5rem,2vw,2rem)] max-w-[clamp(280px,38vw,576px)] leading-relaxed text-pretty">
                Convierte el vehículo que ya tienes, las relaciones que ya has construido y tu conocimiento de tu comunidad en el punto de partida para crear tu propio negocio de transporte privado.
              </p>

              <ul className="space-y-[clamp(0.5rem,0.8vw,0.625rem)] mb-[clamp(1.5rem,2vw,2rem)]">
                {[
                  "Empieza poco a poco",
                  "Trabaja alrededor de tu vida",
                  "Convierte relaciones en clientes y recomendaciones",
                  "Atiende a clientes en español, inglés o ambos",
                  "Construye un negocio que tú controlas",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center text-slate-100 text-[clamp(0.875rem,1.1vw,1.125rem)]"
                  >
                    <div className="rounded-full bg-[#22c55e] flex items-center justify-center shrink-0 mr-[clamp(0.5rem,0.8vw,0.75rem)] w-[clamp(1.25rem,1.8vw,1.5rem)] h-[clamp(1.25rem,1.8vw,1.5rem)]">
                      <Check className="text-[#040a23] w-[60%] h-[60%]" strokeWidth={3} />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {accessToken ? (
                <button
                  onClick={openPricingModal}
                  className="cursor-pointer bg-[#22c55e] hover:bg-[#16a34a] text-[#040a23] font-bold py-[clamp(0.875rem,1.2vw,1rem)] px-[clamp(1.25rem,2vw,2rem)] rounded-[clamp(0.375rem,0.5vw,0.5rem)] transition-colors shadow-lg shadow-[#22c55e]/30 flex items-center justify-between group w-full sm:w-auto text-[clamp(0.875rem,1.1vw,1.125rem)] min-h-[52px]"
                >
                  <span className="text-left leading-snug pr-4 uppercase">
                    QUIERO EMPEZAR MI NEGOCIO POR $495
                  </span>
                  <div className="bg-[#040a23] rounded-full p-[clamp(0.2rem,0.3vw,0.3rem)] ml-[clamp(0.75rem,1vw,1rem)] group-hover:translate-x-1 transition-transform shrink-0">
                    <ChevronRight className="text-[#22c55e] w-[clamp(1.1rem,1.2vw,1.3rem)] h-[clamp(1.1rem,1.2vw,1.3rem)]" />
                  </div>
                </button>
              ) : (
                <button
                  onClick={openPricingModal}
                  className="cursor-pointer bg-[#22c55e] hover:bg-[#16a34a] text-[#040a23] font-bold py-[clamp(0.875rem,1.2vw,1rem)] px-[clamp(1.25rem,2vw,2rem)] rounded-[clamp(0.375rem,0.5vw,0.5rem)] transition-colors shadow-lg shadow-[#22c55e]/30 flex items-center justify-between group w-full sm:w-auto text-[clamp(0.875rem,1.1vw,1.125rem)] min-h-[52px]"
                >
                  <span className="text-left leading-snug pr-4 uppercase">
                    QUIERO EMPEZAR MI NEGOCIO POR $495
                  </span>
                  <div className="bg-[#040a23] rounded-full p-[clamp(0.2rem,0.3vw,0.3rem)] ml-[clamp(0.75rem,1vw,1rem)] group-hover:translate-x-1 transition-transform shrink-0">
                    <ChevronRight className="text-[#22c55e] w-[clamp(1.1rem,1.2vw,1.3rem)] h-[clamp(1.1rem,1.2vw,1.3rem)]" />
                  </div>
                </button>
              )}
            </div>

            {/* Right Side Floating Box — stacks below the content on mobile, side-by-side on lg */}
            <div className="w-full lg:w-[45%] flex justify-center lg:justify-end self-end z-10">
              <div className="flex bg-[#040a23]/90 backdrop-blur-md border border-[#22c55e]/30 rounded-[clamp(1rem,1.5vw,1.5rem)] p-[clamp(0.9rem,1.5vw,1.5rem)] shadow-2xl w-full max-w-[clamp(225px,26vw,375px)] flex-col items-center text-center">
                <div className="flex flex-col items-center gap-[clamp(0.75rem,1.5vw,1.5rem)] mb-3 w-full justify-center">
                  <Globe className="text-[#22c55e] w-[clamp(2.5rem,4.5vw,5.25rem)] h-[clamp(2.5rem,4.5vw,5.25rem)] shrink-0 opacity-90" strokeWidth={1.5} />
                  <h3 className="text-white font-bold text-[clamp(0.95rem,1.35vw,1.3rem)] leading-tight uppercase">
                    PANEL Y MATERIALES<br/>DISPONIBLES EN ESPAÑOL
                  </h3>
                </div>

                <p className="text-[#22c55e] font-bold text-[clamp(0.85rem,1.1vw,1rem)] mt-2">
                  Cambia el idioma del sistema a español cuando lo necesites.
                </p>
              </div>
            </div>

          </div>
        </PageContainer>
      </div>
    </div>
  );
}

function BusinessBuiltAroundYourLifeSection() {
  const leftItems = [
    { icon: Car, title: "Tu vehículo", description: "Un punto\nde partida." },
    { icon: Users, title: "Tus relaciones", description: "Tus primeros\nclientes." },
    { icon: Users, title: "Tu comunidad", description: "Recomendaciones\nque te traen más\nclientes." },
    { icon: ShieldCheck, title: "Tu reputación", description: "Confianza que\ngenera reservas\nrecurrentes." },
    { icon: Clock, title: "Tu tiempo\ndisponible", description: "Flexibilidad para\ntrabajar a tu\nmanera." },
    { icon: Star, title: "Tu esfuerzo", description: "Algo que te\npertenece y\npuede crecer." },
  ];

  const rightItems = [
    { icon: TrendingUp, title: "Más ingresos" },
    { icon: Clock, title: "Más libertad" },
    { icon: Heart, title: "Más impacto" },
    { icon: Users, title: "Más futuro" },
  ];

  return (
    <section className="bg-white py-1 pb-4" id="business-built">
      <PageContainer size="full">
        <div className="flex flex-col xl:flex-row gap-4 items-stretch pt-6">

          {/* Left Side: Ya Tienes Más De Lo Que Crees */}
          <div className="w-full xl:w-[60%] flex flex-col bg-white border border-[#e2e8f0] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] rounded-2xl p-6 lg:p-8">
            <h2 className="text-[#1a1f71] font-extrabold text-[1.1rem] sm:text-[1.2rem] uppercase tracking-wide mb-8 text-center">
              YA TIENES MÁS DE LO QUE CREES PARA EMPEZAR
            </h2>

            <div className="flex flex-col sm:flex-row w-full justify-between items-stretch divide-y sm:divide-y-0 sm:divide-x divide-[#e2e8f0]">
              {leftItems.map((item, idx) => (
                <div key={idx} className="flex flex-col items-center text-center flex-1 py-4 sm:py-0 px-2 sm:px-3">
                  <div className="mb-4 text-[#15803d]">
                    <item.icon className="w-7 h-7 sm:w-9 sm:h-9" strokeWidth={1.5} />
                  </div>
                  <h4 className="font-bold text-[#1a1f71] text-[12px] sm:text-[13px] leading-tight mb-2 whitespace-pre-line">
                    {item.title}
                  </h4>
                  <p className="text-[#1a1f71] text-[11px] sm:text-[12px] leading-[1.3] font-medium whitespace-pre-line text-slate-600">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: No Necesitas Otro Trabajo */}
          <div className="w-full xl:w-[40%] flex flex-col items-center lg:items-start text-center lg:text-left h-full">
            <div className="bg-[#f4fbf4] border border-[#e2e8f0] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] rounded-2xl p-6 lg:p-8 flex flex-col h-full w-full justify-center">
              <h2 className="text-[#15803d] font-extrabold text-[1.15rem] sm:text-[1.3rem] uppercase tracking-wide mb-4 leading-tight text-center">
                NO NECESITAS OTRO TRABAJO.<br />
                PUEDES CONSTRUIR ALGO TUYO.
              </h2>
              <p className="text-[#0b0f19] text-[13px] sm:text-[14px] font-medium mb-8 leading-[1.6] w-full text-center sm:text-left">
                Deja de intercambiar tiempo por dinero.<br />
                Crea un negocio profesional de transporte privado que te permite ganar más, ayudar a tu comunidad y tener el control de tu futuro.
              </p>

              <div className="w-full h-px bg-[#15803d]/20 mb-6"></div>

              <div className="grid grid-cols-4 gap-2 sm:gap-4 items-start w-full">
                {rightItems.map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center text-center">
                    <item.icon className="w-6 h-6 sm:w-8 sm:h-8 text-[#15803d] mb-3" strokeWidth={1.5} />
                    <h4 className="font-medium text-[#1a1f71] text-[11px] sm:text-[12px] leading-tight">
                      {item.title}
                    </h4>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Callout Box (Full Width below) */}
        <div className="w-full max-w-4xl mx-auto mt-10">
          <div className="bg-[#0b0f19] text-white rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 shadow-md text-center sm:text-left">
            <div className="bg-[#22c55e] w-12 h-12 rounded-lg flex items-center justify-center shrink-0 shadow-sm">
              <Users className="w-6 h-6 text-white" strokeWidth={2} />
            </div>
            <p className="text-[13px] sm:text-sm font-medium leading-relaxed m-0 text-white/90">
              <strong className="text-white font-bold block sm:inline">¿Ya conduces para una app?</strong> Perfecto. Tu experiencia puede ayudarte a empezar.<br className="hidden lg:block" />
              <strong className="text-white font-bold block sm:inline sm:ml-2">¿Nunca has conducido para una app?</strong> No es requisito.
            </p>
          </div>
        </div>

      </PageContainer>
    </section>
  );
}

function AllYouNeedSection() {
  const features = [
    {
      icon: CalendarDays,
      title: "Sistema Rápido de Reservas™",
      description: "Los clientes reservan transporte al aeropuerto directamente contigo.",
    },
    {
      icon: Users,
      title: "Centro de Adquisición de Clientes™",
      description: "Tarjetas QR, plantillas de contacto y estrategias para conseguir más clientes.",
    },
    {
      icon: Monitor,
      title: "Página de Ventas Personalizada™",
      description: "Tu propia página profesional que muestra tus servicios, tarifas y facilita que te reserven.",
    },
    {
      icon: RefreshCcw,
      title: "Motor de Clientes Recurrentes™",
      description: "Mantén el contacto, pide reseñas, genera más recomendaciones y convierte un buen servicio en futuras reservas.",
    },
    {
      icon: Globe,
      title: "Panel en Español",
      description: "Usa el panel, sigue las instrucciones y accede a los recursos en español cuando lo necesites.",
    },
  ];

  return (
    <section className="bg-white py-1" id="all-you-need">
      <PageContainer size="full">
        <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm p-6">
          <h2 className="text-center text-[#1a1f71] font-extrabold text-xl sm:text-2xl tracking-wide uppercase mb-10">
            TODO LO QUE NECESITAS PARA LANZAR Y CONSEGUIR CLIENTES
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-y-10 relative mb-12">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center text-center px-6 relative"
              >
                <div className="mb-4">
                  <feature.icon
                    className="w-12 h-12 text-[#22c55e]"
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="font-bold text-[#0b0f19] mb-3 text-[13px] sm:text-sm leading-snug">
                  {feature.title}
                </h3>
                <p className="text-[#0b0f19] text-xs sm:text-[13px] leading-relaxed font-medium">
                  {feature.description}
                </p>

                {/* Vertical Divider for Desktop */}
                {idx < features.length - 1 && (
                  <div className="hidden lg:block absolute right-0 top-[10%] bottom-[10%] w-px bg-slate-200"></div>
                )}
                {/* Horizontal Divider for Mobile/Tablet */}
                {idx < features.length - 1 && (
                  <div className="lg:hidden absolute bottom-[-1.25rem] left-[20%] right-[20%] h-px bg-slate-200"></div>
                )}
              </div>
            ))}
          </div>

          <div className="bg-[#f0fdf4] border border-[#bbf7d0] rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-4xl mx-auto mt-4">
            <Gift
              className="w-8 h-8 text-[#eab308] shrink-0"
              strokeWidth={1.5}
            />
            <p className="text-[#0b0f19] text-sm text-center sm:text-left leading-relaxed font-medium">
              <strong className="text-[#1a1f71] font-bold">
                También incluye:
              </strong>{" "}
              acceso al Panel de Lanzamiento™, herramientas del Panel del Operador™, alojamiento de tu página personalizada, capacitación, actualizaciones del sistema y soporte de personas reales.
            </p>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    {
      number: 1,
      icon: Lock,
      title: "Paso 1: Obtén acceso",
      description:
        "Compra el sistema DIY por $495 y entra de inmediato al Panel de Lanzamiento™ y a todos los recursos para comenzar.",
    },
    {
      number: 2,
      icon: ClipboardList,
      title: "Paso 2: Cuéntanos sobre tu negocio",
      description:
        "Agrega tu área de servicio, rutas, tarifas, horarios, preferencias de reserva y la información que quieres mostrar a tus clientes.",
    },
    {
      number: 3,
      icon: Rocket,
      title: "Paso 3: Configura y empieza",
      description:
        "Sigue las instrucciones para configurar tu sistema de reservas y tu página personalizada. Si quieres ayuda adicional, puedes agregar la opción \"Lo hacemos por ti\" por $199.",
    },
  ];

  return (
    <section className="bg-white py-1" id="how-it-works-steps">
      <PageContainer size="full">
        <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm p-6">
          <h2 className="text-center text-[#1a1f71] font-extrabold text-[1.1rem] sm:text-xl uppercase tracking-wide mb-10">
            CÓMO FUNCIONA
          </h2>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-4 w-full">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="flex items-center w-full lg:w-auto flex-1 justify-center"
              >
                <div className="flex flex-row items-center gap-4 w-full justify-center">
                  {/* Number Circle */}
                  <div className="w-8 h-8 rounded-full bg-[#22c55e] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-sm">
                    {step.number}
                  </div>

                  {/* Dark Blue Icon */}
                  <div className="shrink-0">
                    <step.icon
                      className="w-9 h-9 text-[#1a1f71]"
                      strokeWidth={1.5}
                    />
                  </div>

                  {/* Text Content */}
                  <div className="flex flex-col justify-center max-w-[240px]">
                    <h4 className="font-bold text-[#1a1f71] text-sm sm:text-base leading-snug">
                      {step.title}
                    </h4>
                    <p className="text-[#1a1f71] text-[11px] sm:text-[12px] leading-snug font-medium mt-1">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Arrow separator */}
                {idx < steps.length - 1 && (
                  <div className="hidden lg:flex shrink-0 mx-2 text-[#1a1f71]">
                    <ArrowRight className="w-6 h-6 stroke-[3px]" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </PageContainer>
    </section>
  );
}

function ProvenModelSection() {
  return (
    <section className="bg-white py-1" id="proven-model">
      <PageContainer size="full">
        <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm p-6">
          <h2 className="text-center text-[#1a1f71] font-extrabold text-xl sm:text-2xl tracking-wide uppercase mb-10">
            CONSTRUIDO CON EXPERIENCIA REAL EN TRANSPORTE
          </h2>

          <div className="flex flex-col lg:flex-row items-stretch justify-between gap-6 lg:gap-4 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">

            {/* Stat 1 */}
            <div className="flex flex-col flex-1 pt-6 lg:pt-0 lg:px-4 first:pt-0 first:pl-0 last:pr-0 text-center lg:text-left">
              <div className="flex flex-col sm:flex-row items-center lg:items-start gap-4 mb-4">
                <div className="w-14 h-14 rounded-full bg-[#22c55e] text-white flex items-center justify-center shrink-0">
                  <Plane className="w-7 h-7" strokeWidth={2} />
                </div>
                <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                  <span className="text-[#15803d] font-bold text-xs uppercase tracking-wider mb-0.5">TODO EMPEZÓ CON</span>
                  <h4 className="font-extrabold text-[#1a1f71] text-lg sm:text-xl leading-tight uppercase">
                    SOLO 3<br />RESERVAS.
                  </h4>
                </div>
              </div>
              <p className="text-[#1a1f71] text-[13px] leading-relaxed font-medium">
                Lo que empezó como unos cuantos viajes privados al aeropuerto se convirtió en la base de un negocio real de transporte.
              </p>
            </div>

            {/* Stat 2 */}
            <div className="flex flex-col flex-1 pt-6 lg:pt-0 lg:px-4 first:pt-0 first:pl-0 last:pr-0 text-center lg:text-left">
              <div className="flex flex-col sm:flex-row items-center lg:items-start gap-4 mb-4">
                <div className="w-14 h-14 rounded-full bg-[#22c55e] text-white flex items-center justify-center shrink-0">
                  <Users className="w-7 h-7" strokeWidth={2} />
                </div>
                <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                  <span className="text-[#15803d] font-bold text-xs uppercase tracking-wider mb-0.5">CERCA DE</span>
                  <h4 className="font-extrabold text-[#1a1f71] text-lg sm:text-xl leading-tight uppercase">
                    6,000 VIAJES<br />
                    <span className="text-sm font-bold tracking-normal">PROGRAMADOS EN UN SOLO AÑO.</span>
                  </h4>
                </div>
              </div>
              <p className="text-[#1a1f71] text-[13px] leading-relaxed font-medium">
                Los clientes directos regresan. Los pasajeros frecuentes traen recomendaciones y el sistema se perfecciona en el camino.
              </p>
            </div>

            {/* Stat 3 */}
            <div className="flex flex-col flex-1 pt-6 lg:pt-0 lg:px-4 first:pt-0 first:pl-0 last:pr-0 text-center lg:text-left">
              <div className="flex flex-col sm:flex-row items-center lg:items-start gap-4 mb-4">
                <div className="w-14 h-14 rounded-full bg-[#22c55e] text-white flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-7 h-7" strokeWidth={2} />
                </div>
                <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                  <span className="text-[#15803d] font-bold text-xs uppercase tracking-wider mb-0.5">QUITTHEAPP NACIÓ DE</span>
                  <h4 className="font-extrabold text-[#1a1f71] text-lg sm:text-xl leading-tight uppercase">
                    TODO LO QUE<br />PASÓ EN EL CAMINO.
                  </h4>
                </div>
              </div>
              <p className="text-[#1a1f71] text-[13px] leading-relaxed font-medium">
                No necesitas miles de clientes para empezar. Necesitas un sistema probado y un proceso simple que te ayude a lanzar tu negocio.
              </p>
            </div>

          </div>
        </div>
      </PageContainer>
    </section>
  );
}

function HowItWorksAndFaqSection({ openPricingModal }: { openPricingModal: () => void }) {
  const { accessToken, user } = useAppSelector((state) => state.auth);

  const faqs = [
    {
      question: "¿Los $495 son realmente un solo pago?",
      answer:
        "Sí. El sistema DIY de QuitTheApp cuesta $495 como pago único y no tiene una cuota mensual de plataforma de QuitTheApp. También está disponible la mejora opcional “Lo hacemos por ti” por $199. Pueden aplicarse gastos normales del negocio, como software de programación, procesamiento de pagos, seguro comercial, licencias, combustible, mantenimiento del vehículo y otros costos operativos.",
    },
    {
      question: "¿Mi página personalizada y el alojamiento están incluidos?",
      answer:
        "Sí. QuitTheApp crea y aloja tu página personalizada de ventas. El sistema DIY de $495 te guía para proporcionar la información de tu negocio, tus servicios, tus tarifas, tus preferencias de reserva y tus detalles de marca. La mejora opcional “Lo hacemos por ti”, por $199, ofrece asistencia adicional con la configuración.",
    },
    {
      question: "¿Cómo consigo mis primeros clientes?",
      answer:
        "Utiliza el Centro de Adquisición de Clientes™ con tarjetas QR, herramientas de recomendación, plantillas de contacto y estrategias prácticas diseñadas para ayudarte a atraer posibles clientes y generar oportunidades de reserva directa.",
    },
    {
      question: "¿Necesito saber de tecnología?",
      answer:
        "No. El sistema DIY de $495 incluye instrucciones paso a paso para proporcionar la información de tu negocio, establecer tus preferencias de reserva y preparar el contenido de tu página personalizada. Si prefieres asistencia adicional, puedes agregar la mejora opcional “Lo hacemos por ti” por $199.",
    },
    {
      question: "¿Qué pasa si no funciona para mí?",
      answer:
        "QuitTheApp fue creado a partir de la experiencia real de construir y operar un negocio privado de transporte al aeropuerto desde 2016. Los resultados dependen de tu mercado, tarifas, esfuerzo, gastos y de tu capacidad para atraer clientes. Nuestro equipo brinda soporte para ayudarte a comprender y utilizar el sistema.",
    },
    {
      question: "¿Funcionará donde yo vivo?",
      answer:
        "El sistema puede utilizarse en mercados con aeropuerto y con viajeros que necesiten transporte confiable. Tú eliges tu área de servicio, tarifas, horarios y disponibilidad. Los resultados dependen de la demanda local, la competencia, los precios, los gastos y tus esfuerzos de promoción.",
    },
  ];

  return (
    <section className="bg-slate-50 py-4 sm:py-8" id="faq">
      <PageContainer size="full">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-stretch pt-4">

          {/* Left Side: FAQs */}
          <div className="w-full lg:w-[35%] flex flex-col bg-white border border-[#e2e8f0] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] rounded-2xl p-5 lg:p-6">
            <h2 className="text-[#1a1f71] font-extrabold text-[1rem] sm:text-[1.1rem] uppercase tracking-wide mb-4">
              PREGUNTAS FRECUENTES
            </h2>
            <div className="flex flex-col divide-y divide-[#e2e8f0]">
              {faqs.map((faq, idx) => (
                <details key={idx} className="group overflow-hidden [&_summary::-webkit-details-marker]:hidden py-3">
                  <summary className="flex items-center justify-between cursor-pointer text-[#1a1f71] font-medium text-[12.5px] sm:text-[13px] select-none">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#22c55e] text-white flex items-center justify-center text-[11px] font-bold shrink-0">
                        ?
                      </div>
                      {faq.question}
                    </div>
                    <span className="transition group-open:rotate-180 shrink-0 ml-2">
                      <svg fill="none" height="16" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="16"><path d="M6 9l6 6 6-6"></path></svg>
                    </span>
                  </summary>
                  <p className="text-[#1a1f71] text-[12px] font-medium pt-2 pb-1 leading-relaxed pl-[2.1rem]">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>

          {/* Right Side: CTA Box */}
          <div className="w-full lg:w-[65%] flex flex-col items-center">
            <div className="bg-[#0b1021] rounded-2xl p-6 lg:p-8 flex flex-col md:flex-row gap-8 items-center lg:items-stretch shadow-xl w-full border border-slate-800">

              {/* CTA Left Info */}
              <div className="w-full md:w-[60%] flex flex-col justify-between">
                <div>
                  <h3 className="text-white font-extrabold text-[1.2rem] lg:text-[1.35rem] leading-[1.1] mb-2 uppercase tracking-wide">
                    EMPIEZA HOY TU PROPIO NEGOCIO<br />
                    <span className="text-[#22c55e]">DE TRANSPORTE PRIVADO</span>
                  </h3>

                  <div className="flex flex-row items-center gap-4 lg:gap-5 mt-4 mb-6">
                    <span className="text-[3.5rem] lg:text-[4.5rem] font-extrabold text-[#22c55e] leading-none tracking-tight">
                      $495
                    </span>
                    <div className="text-white/80 text-[10px] lg:text-[11px] font-medium leading-[1.3] border-l border-white/20 pl-4 py-1">
                      <strong className="text-white font-bold block mb-1">Un solo pago.</strong>
                      Incluye el sistema completo DIY de Quit TheApp<br />y tu página personalizada.<br />
                      También puedes agregar "Lo hacemos por ti"<br />por $199.
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-start mt-auto w-full">
                  <PaymentBadges justify="start" paymentLabel="Pago seguro procesado por" />
                </div>
              </div>

              {/* CTA Right Action */}
              <div className="w-full md:w-[40%] flex flex-col justify-center">
                {user?.status === "active" ? (
                  <Link
                    to="/dashboard"
                    className="cursor-pointer bg-[#22c55e] hover:bg-[#16a34a] text-white font-bold py-4 px-5 rounded-xl transition-colors flex items-center justify-between group w-full text-left shadow-lg mb-6"
                  >
                    <span className="text-[1.1rem] lg:text-[1.2rem] uppercase leading-tight w-full pr-2">
                      IR AL PANEL<br />DE CONTROL
                    </span>
                    <ArrowRight className="w-6 h-6 shrink-0 group-hover:translate-x-1 transition-transform" />
                  </Link>
                ) : accessToken ? (
                  <button
                    onClick={openPricingModal}
                    className="cursor-pointer bg-[#22c55e] hover:bg-[#16a34a] text-white font-bold py-4 px-5 rounded-xl transition-colors flex items-center justify-between group w-full text-left shadow-lg mb-6"
                  >
                    <span className="text-[1.1rem] lg:text-[1.2rem] uppercase leading-tight w-full pr-2">
                      QUIERO EMPEZAR<br />MI NEGOCIO<br />$495
                    </span>
                    <ArrowRight className="w-6 h-6 shrink-0 group-hover:translate-x-1 transition-transform" />
                  </button>
                ) : (
                  <button
                    onClick={openPricingModal}
                    className="cursor-pointer bg-[#22c55e] hover:bg-[#16a34a] text-white font-bold py-4 px-5 rounded-xl transition-colors flex items-center justify-between group w-full text-left shadow-lg mb-6"
                  >
                    <span className="text-[1.1rem] lg:text-[1.2rem] uppercase leading-tight w-full pr-2">
                      QUIERO EMPEZAR<br />MI NEGOCIO<br />$495
                    </span>
                    <ArrowRight className="w-6 h-6 shrink-0 group-hover:translate-x-1 transition-transform" />
                  </button>
                )}

                <ul className="space-y-2.5">
                  <li className="flex items-center text-white text-[11px] lg:text-[12px] font-medium">
                    <CheckCircle2 className="w-[16px] h-[16px] fill-[#22c55e] text-[#0b1021] mr-3 shrink-0" />
                    Pago seguro
                  </li>
                  <li className="flex items-center text-white text-[11px] lg:text-[12px] font-medium">
                    <CheckCircle2 className="w-[16px] h-[16px] fill-[#22c55e] text-[#0b1021] mr-3 shrink-0" />
                    Procesamiento protegido
                  </li>
                  <li className="flex items-center text-white text-[11px] lg:text-[12px] font-medium">
                    <CheckCircle2 className="w-[16px] h-[16px] fill-[#22c55e] text-[#0b1021] mr-3 shrink-0" />
                    Sin cuotas mensuales
                  </li>
                  <li className="flex items-center text-white text-[11px] lg:text-[12px] font-medium">
                    <CheckCircle2 className="w-[16px] h-[16px] fill-[#22c55e] text-[#0b1021] mr-3 shrink-0" />
                    Personas reales. Soporte real.
                  </li>
                </ul>
              </div>
            </div>

            <p className="text-slate-500 font-medium text-[10px] text-center mt-6">
              © 2026 QuitTheApp, LLC. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
