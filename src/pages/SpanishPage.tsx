import spanishLogo from "../assets/spanishLogo.png";
import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Menu, X, Plane, User } from "lucide-react";
import { cn } from "../lib/cn";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Gift,
  Lock,
  Monitor,
  RefreshCcw,
  Rocket,
  ShieldCheck,
  Star,
  Users,
  XCircle,
  CreditCard,
  Clock,
} from "lucide-react";
import { PageContainer } from "../components/layout/PageContainer";
import { ProfileDropdown } from "../components/ProfileDropdown";
import { PricingModal } from "../components/PricingModal";
import { useAppDispatch, useAppSelector } from "../hooks/storeHooks";
import { logOut } from "../store/features/auth/authSlice";
import { useLogoutUserMutation } from "../store/api/Auth/auth.api";
import spanishBanner from "../assets/spanishBanner.png";
import reviewImage from "../assets/review.jpg";
import standardImage from "../assets/standard.png";
import reviewCoupleImage from "../assets/reviewCouple.png";

export default function SpanishPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { accessToken } = useAppSelector((state) => state.auth);

  // Auto-open the pricing modal when redirected here with ?showPricing=true.
  const [showPricingModal, setShowPricingModal] = useState(
    () => searchParams.get("showPricing") === "true" && !!accessToken
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
        <PricingModal onClose={() => setShowPricingModal(false)} />
      )}
      <SpanishNavbar openPricingModal={openPricingModal} />
      <HeroBanner openPricingModal={openPricingModal} />
      <FeaturesSection />
      <ComparisonSection />
      <WhyWinSection />
      <HowItWorksSection />
      <ReviewsSection />
      <FaqSection />
      <FooterCTASection openPricingModal={openPricingModal} />
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
                    Empezar mi negocio — $495
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
                Empezar mi negocio — $495
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
    <div className="relative w-full min-h-[100svh] h-auto flex flex-col justify-between overflow-hidden bg-[#040a23] pt-[80px]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={spanishBanner}
          alt="Spanish Banner"
          className="w-full h-full object-cover object-[center_top] lg:object-[right_top]"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-transparent lg:to-black/30"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 lg:hidden"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full flex-grow flex items-center py-8">
        <PageContainer size="full">
          <div className="w-full max-w-[650px] text-left">
            <h1 className="text-[clamp(2.5rem,4vw,4rem)] font-extrabold text-white leading-[1.05] mb-6 tracking-tight uppercase">
              DEJA LAS APPS.
              <br />
              <span className="text-[#22c55e]">
                CONSTRUYE TU
                <br />
                PROPIO NEGOCIO.
              </span>
            </h1>
            <p className="text-white/90 text-[clamp(1rem,1.5vw,1.125rem)] font-medium mb-8 max-w-[550px] leading-relaxed">
              QuitTheApp te brinda las herramientas para lanzar tu propio
              negocio privado de transporte al aeropuerto, aceptar solicitudes
              de reserva directa, crear una base de clientes recurrentes y
              construir un negocio que tú controlas.
            </p>
            <ul className="space-y-3 mb-10">
              {[
                "Construye tu propia lista de clientes",
                "Acepta solicitudes de reserva directa",
                "Establece tus propias tarifas y horarios",
                "Genera clientes recurrentes y recomendaciones",
                "Crea un negocio que tú controlas",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-center text-white text-[clamp(0.9rem,1vw,1rem)] font-semibold"
                >
                  <CheckCircle2 className="mr-3 w-5 h-5 fill-[#22c55e] text-white shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            {accessToken ? (
              <button
                onClick={openPricingModal}
                className="cursor-pointer bg-[#16a34a] hover:bg-[#15803d] text-white font-bold py-4 px-6 rounded-xl transition-colors flex items-center justify-between group w-full sm:w-auto text-[clamp(1rem,1.2vw,1.1rem)]"
              >
                <span className="text-left pr-4">
                  Empezar mi negocio privado de transporte — $495
                </span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform shrink-0" />
              </button>
            ) : (
              <button
                onClick={openPricingModal}
                className="cursor-pointer bg-[#16a34a] hover:bg-[#15803d] text-white font-bold py-4 px-6 rounded-xl transition-colors flex items-center justify-between group w-full sm:w-auto text-[clamp(1rem,1.2vw,1.1rem)]"
              >
                <span className="text-left pr-4">
                  Empezar mi negocio privado de transporte — $495
                </span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform shrink-0" />
              </button>
            )}
          </div>
        </PageContainer>
      </div>

      {/* Bottom Trust Badges */}
      <div className="relative z-10 w-full border-t border-white/10 bg-black/40 backdrop-blur-sm py-4 sm:py-5 lg:py-6">
        <PageContainer size="full">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 w-full text-white px-2">
            <div className="flex items-center gap-3 w-full md:w-auto justify-center md:justify-start">
              <CreditCard
                className="w-6 h-6 sm:w-7 sm:h-7 shrink-0 text-white"
                strokeWidth={1.5}
              />
              <div className="text-[11px] sm:text-xs lg:text-[13px] font-bold leading-tight">
                Pago único
              </div>
            </div>

            <div className="hidden md:block w-px h-8 bg-white/20"></div>

            <div className="flex items-center gap-3 w-full md:w-auto justify-center md:justify-start">
              <Clock
                className="w-6 h-6 sm:w-7 sm:h-7 shrink-0 text-white"
                strokeWidth={1.5}
              />
              <div className="text-[11px] sm:text-xs lg:text-[13px] font-bold leading-tight">
                Sistema de lanzamiento
                <br />
                <span className="text-white/60 font-medium">paso a paso</span>
              </div>
            </div>

            <div className="hidden md:block w-px h-8 bg-white/20"></div>

            <div className="flex items-center gap-3 w-full md:w-auto justify-center md:justify-start">
              <ShieldCheck
                className="w-6 h-6 sm:w-7 sm:h-7 shrink-0 text-white"
                strokeWidth={1.5}
              />
              <div className="text-[11px] sm:text-xs lg:text-[13px] font-bold leading-tight">
                Sin mensualidades
              </div>
            </div>

            <div className="hidden md:block w-px h-8 bg-white/20"></div>

            <div className="flex items-center gap-3 w-full md:w-auto justify-center md:justify-start">
              <Clock
                className="w-6 h-6 sm:w-7 sm:h-7 shrink-0 text-white"
                strokeWidth={1.5}
              />
              <div className="text-[11px] sm:text-xs lg:text-[13px] font-bold leading-tight">
                Configuración
                <br />
                <span className="text-white/60 font-medium">guiada</span>
              </div>
            </div>
          </div>
        </PageContainer>
      </div>
    </div>
  );
}

const features = [
  {
    icon: CalendarDays,
    title: "Sistema Rápido de Reservas™",
    description:
      "Crea un flujo profesional de reservas que permita a tus clientes solicitar transporte privado al aeropuerto directamente con tu negocio.",
  },
  {
    icon: Users,
    title: "Centro de Adquisición de Clientes™",
    description:
      "Utiliza tarjetas QR, herramientas de recomendación, plantillas de contacto y estrategias prácticas para atraer nuevos clientes y generar reservas directas.",
  },
  {
    icon: Monitor,
    title: "Página de Ventas Personalizada™",
    description:
      "Muestra quién eres, explica tus servicios y brinda a los viajeros un espacio profesional para conocerte y solicitar una reserva.",
  },
  {
    icon: RefreshCcw,
    title: "Motor de Clientes Recurrentes™",
    description:
      "Da seguimiento, solicita reseñas, fomenta recomendaciones y convierte cada buen viaje en futuras reservas.",
  },
];

function FeaturesSection() {
  return (
    <section className="bg-white py-3" id="how-it-works">
      <PageContainer size="full">
        <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm p-6">
          <h2 className="text-center text-[#1a1f71] font-extrabold text-xl sm:text-2xl tracking-wide uppercase mb-10">
            TODO LO QUE NECESITAS PARA CREAR TU PROPIA BASE DE CLIENTES
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-10 relative mb-12">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center text-center px-6 relative"
              >
                <div className="mb-4">
                  <feature.icon
                    className="w-12 h-12 text-[#2563eb]"
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="font-bold text-[#0b0f19] mb-3 text-sm sm:text-base leading-snug">
                  {feature.title}
                </h3>
                <p className="text-[#0b0f19] text-sm leading-relaxed max-w-[220px]">
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

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-4xl mx-auto mt-4">
            <Gift
              className="w-8 h-8 text-[#eab308] shrink-0"
              strokeWidth={1.5}
            />
            <p className="text-[#0b0f19] text-sm text-center sm:text-left leading-relaxed font-medium">
              <strong className="text-[#1a1f71] font-bold">
                También incluye:
              </strong>{" "}
              acceso al Panel de Lanzamiento™, herramientas del Panel del
              Operador™, alojamiento de tu página personalizada, recursos de
              capacitación, actualizaciones permanentes del sistema y soporte
              humano real.
            </p>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}

function ComparisonSection() {
  const badList = [
    "La plataforma controla la relación con el cliente",
    "Las tarifas se determinan dentro de la app",
    "No eres dueño de tu lista de clientes",
    "No tienes un sistema propio para reservas recurrentes",
    "Tu acceso a las solicitudes de viaje de la app puede cambiar",
  ];

  const goodList = [
    "Tú construyes tu propia lista de clientes",
    "Tú estableces tus propias tarifas",
    "Aceptas solicitudes de reserva directa",
    "Generas clientes recurrentes y recomendaciones",
    "Construyes un negocio que tú controlas",
  ];

  return (
    <section className="bg-slate-50 py-12 lg:py-16" id="comparison">
      <PageContainer size="full">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 relative max-w-6xl mx-auto px-4 sm:px-8">
          {/* Left Card */}
          <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-sm w-full lg:w-1/2 flex flex-col items-start min-h-[380px]">
            <h3 className="text-[#ef4444] font-bold text-sm lg:text-[15px] uppercase tracking-wider mb-8">
              CONDUCIR CON APPS DE RIDESHARE
            </h3>
            <ul className="space-y-5 w-full">
              {badList.map((item, i) => (
                <li
                  key={i}
                  className="flex items-center text-[#1a1f71] font-extrabold text-sm lg:text-[15px]"
                >
                  <XCircle className="w-[22px] h-[22px] mr-3 fill-[#ef4444] text-white shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* VS Circle */}
          <div className="lg:absolute lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 z-10 flex justify-center w-full lg:w-auto my-[-20px] lg:my-0">
            <div className="w-[70px] h-[70px] lg:w-[84px] lg:h-[84px] bg-[#0b0f19] rounded-full flex items-center justify-center text-white font-extrabold text-xl lg:text-3xl shadow-md lg:shadow-none lg:border-[6px] lg:border-slate-50 relative z-20">
              VS.
            </div>
          </div>

          {/* Right Card */}
          <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-sm w-full lg:w-1/2 flex flex-col items-start min-h-[380px]">
            <h3 className="text-[#22c55e] font-bold text-sm lg:text-[15px] uppercase tracking-wider mb-8">
              TU NEGOCIO PRIVADO DE TRANSPORTE AL AEROPUERTO
            </h3>
            <ul className="space-y-5 w-full">
              {goodList.map((item, i) => (
                <li
                  key={i}
                  className="flex items-center text-[#22c55e] font-extrabold text-sm lg:text-[15px]"
                >
                  <CheckCircle2 className="w-[22px] h-[22px] mr-3 fill-[#22c55e] text-white shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}

function WhyWinSection() {
  const reasons = [
    {
      icon: ShieldCheck,
      title: "La experiencia genera confianza",
      description:
        "La comunicación profesional, la puntualidad y el conocimiento local pueden ayudar a que los viajeros se sientan seguros al reservar directamente contigo.",
    },
    {
      icon: Users,
      title: "Mejores relaciones con los clientes",
      description:
        "Los viajeros valoran el servicio personalizado, la confiabilidad y la comunicación clara.",
    },
    {
      icon: Clock,
      title: "Horario flexible",
      description:
        "Elige los días, horarios, rutas y áreas de servicio que se adapten a tu disponibilidad y tus metas.",
    },
    {
      icon: Lock,
      title: "Un negocio que tú controlas",
      description:
        "Construye una lista de clientes, una reputación y un sistema de reservas para tu negocio.",
    },
  ];

  return (
    <section className="bg-white py-3" id="why-win">
      <PageContainer size="full">
        <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm p-6">
          <h2 className="text-center text-[#1a1f71] font-extrabold text-[1.1rem] sm:text-xl uppercase tracking-wide mb-10">
            POR QUÉ LOS CONDUCTORES INDEPENDIENTES PUEDEN TENER ÉXITO
          </h2>

          <div className="flex flex-col lg:flex-row items-start justify-between gap-6 lg:gap-4 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
            {reasons.map((reason, idx) => (
              <div
                key={idx}
                className="flex flex-row items-center lg:items-start lg:flex-col gap-4 flex-1 pt-6 lg:pt-0 lg:px-4 first:pt-0 first:pl-0 last:pr-0"
              >
                <div className="w-14 h-14 rounded-full bg-[#f1f5f9] flex items-center justify-center shrink-0">
                  <reason.icon
                    className="w-7 h-7 text-[#1a1f71]"
                    strokeWidth={2}
                  />
                </div>
                <div className="flex flex-col">
                  <h4 className="font-bold text-[#1a1f71] text-[13px] sm:text-sm leading-snug whitespace-pre-line mb-1">
                    {reason.title}
                  </h4>
                  <p className="text-[#1a1f71] text-xs sm:text-[13px] leading-snug font-medium">
                    {reason.description}
                  </p>
                </div>
              </div>
            ))}
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
        "Compra el sistema DIY por $495 y recibe acceso inmediato a los recursos de lanzamiento.",
    },
    {
      number: 2,
      icon: ClipboardList,
      title: "Paso 2: Ingresa tu información",
      description:
        "Proporciona la información de tu negocio, tu área de servicio, tus rutas, tus tarifas, tus preferencias de reserva y tus detalles de marca.",
    },
    {
      number: 3,
      icon: Rocket,
      title: "Paso 3: Configura y lanza",
      description:
        "Sigue las instrucciones paso a paso para proporcionar la información necesaria para tu sistema de reservas y tu página personalizada. Si prefieres asistencia adicional, agrega la mejora opcional “Lo hacemos por ti” por $199.",
    },
  ];

  return (
    <section className="bg-white py-3" id="how-it-works-steps">
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
                  <div className="w-8 h-8 rounded-full bg-[#2563eb] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-sm">
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
                  <div className="flex flex-col justify-center max-w-[200px]">
                    <h4 className="font-bold text-[#1a1f71] text-sm sm:text-base leading-snug">
                      {step.title}
                    </h4>
                    <p className="text-[#1a1f71] text-xs sm:text-[13px] leading-snug font-medium mt-1">
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

function ReviewsSection() {
  const reviews = [
    {
      quote:
        "Quit TheApp me dio todo lo que necesitaba para dejar las apps y construir mi negocio propio.",
      name: "Alex F.",
      location: "Phoenix, AZ",
      image: reviewImage,
    },
    {
      quote:
        "En menos de dos semanas ya tenía reservas directas. Lo mejor que he invertido en mi negocio.",
      name: "Brenda T.",
      location: "Dallas, TX",
      image: standardImage,
    },
    {
      quote:
        "Ahora mis clientes me eligen a mi no a una app. Estoy construyendo algo real y duradero.",
      name: "Carlos M.",
      location: "Naples, FL, USA",
      image: reviewCoupleImage,
    },
  ];

  return (
    <section className="bg-white py-3" id="reviews">
      <PageContainer size="full">
        <div className="w-full rounded-[2rem] border border-slate-200 shadow-sm p-6 bg-white">
          <h2 className="text-[1.1rem] sm:text-xl lg:text-[1.35rem] font-bold text-[#1a1f71] text-center mb-8 uppercase tracking-wide">
            CONDUCTORES INDEPENDIENTES ESTÁN CONSTRUYENDO SUS PROPIOS NEGOCIOS
          </h2>

          <div className="flex flex-col lg:flex-row items-stretch justify-between gap-8 lg:gap-0 lg:divide-x divide-slate-100 w-full">
            {reviews.map((review, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row items-stretch gap-4 sm:gap-6 w-full flex-1 lg:px-6 first:pl-0 last:pr-0"
              >
                {/* Image */}
                <div className="shrink-0 w-full sm:w-[130px] lg:w-[140px] flex">
                  <img
                    src={review.image}
                    alt={review.name}
                    loading="lazy"
                    className="w-full h-40 sm:h-full rounded-xl object-cover object-top shadow-sm"
                  />
                </div>

                {/* Review Content */}
                <div className="flex flex-col justify-start py-1 text-left flex-1">
                  {/* Quote */}
                  <p className="text-[#1a1f71] font-medium text-sm sm:text-base leading-snug mb-4">
                    "{review.quote}"
                  </p>

                  <div className="mt-auto">
                    {/* Stars */}
                    <div className="flex items-center justify-start gap-[2px] mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-[18px] h-[18px] fill-[#eab308] text-[#eab308]"
                        />
                      ))}
                    </div>

                    {/* Author */}
                    <div>
                      <h5 className="font-bold text-[#1a1f71] text-[15px] leading-tight">
                        {review.name}
                      </h5>
                      <span className="text-[#1a1f71] font-medium text-sm">
                        {review.location}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </PageContainer>
    </section>
  );
}

function FaqSection() {
  const faqs = [
    {
      question: "¿El pago de $495 es realmente un pago único?",
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
      question: "¿Necesito experiencia técnica?",
      answer:
        "No. El sistema DIY de $495 incluye instrucciones paso a paso para proporcionar la información de tu negocio, establecer tus preferencias de reserva y preparar el contenido de tu página personalizada. Si prefieres asistencia adicional, puedes agregar la mejora opcional “Lo hacemos por ti” por $199.",
    },
    {
      question: "¿Qué pasa si no funciona para mí?",
      answer:
        "QuitTheApp fue creado a partir de la experiencia real de construir y operar un negocio privado de transporte al aeropuerto desde 2016. Los resultados dependen de tu mercado, tarifas, esfuerzo, gastos y de tu capacidad para atraer clientes. Nuestro equipo brinda soporte para ayudarte a comprender y utilizar el sistema.",
    },
    {
      question: "¿Funcionará en mi ciudad?",
      answer:
        "El sistema puede utilizarse en mercados con aeropuerto y con viajeros que necesiten transporte confiable. Tú eliges tu área de servicio, tarifas, horarios y disponibilidad. Los resultados dependen de la demanda local, la competencia, los precios, los gastos y tus esfuerzos de promoción.",
    },
  ];

  return (
    <section className="bg-white py-3" id="faq">
      <PageContainer size="full">
        <div className="w-full rounded-[2rem] border border-slate-200 shadow-sm p-6 bg-white">
          <h2 className="text-[1.1rem] sm:text-xl lg:text-[1.35rem] font-bold text-[#1a1f71] text-center mb-10 uppercase tracking-wide">
            PREGUNTAS FRECUENTES
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10 w-full relative">
            {/* Optional dividers can be simulated with background lines, but grid gap looks cleaner */}
            {/* Desktop Vertical Dividers */}
            <div className="hidden lg:block absolute left-[33.33%] top-0 bottom-0 w-px bg-slate-100 -translate-x-1/2"></div>
            <div className="hidden lg:block absolute left-[66.66%] top-0 bottom-0 w-px bg-slate-100 -translate-x-1/2"></div>

            {faqs.map((faq, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className="shrink-0 w-7 h-7 rounded-full bg-[#2563eb] text-white flex items-center justify-center font-bold text-sm shadow-sm mt-0.5">
                  Q
                </div>
                <div className="flex flex-col">
                  <h4 className="font-bold text-[#1a1f71] text-[15px] leading-snug mb-1">
                    {faq.question}
                  </h4>
                  <p className="text-[#1a1f71] text-[13px] font-medium leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </PageContainer>
    </section>
  );
}

function FooterCTASection({ openPricingModal }: { openPricingModal: () => void }) {
  const { accessToken, user } = useAppSelector((state) => state.auth);

  const benefits = [
    "Sin cuota mensual de plataforma de QuitTheApp",
    "Diseñado para operadores independientes de transporte al aeropuerto",
    "Soporte humano real",
    "Acceso de por vida al panel del operador",
    "Recursos de capacitación y configuración incluidos",
  ];

  const trustBadges = [
    { icon: Lock, text: "Pago seguro" },
    { icon: ShieldCheck, text: "Procesamiento protegido" },
    { icon: CreditCard, text: "Pago único" },
    {
      icon: Plane,
      text: "Diseñado para operadores de transporte al aeropuerto",
    },
    { icon: User, text: "Personas reales. Soporte real." },
  ];

  return (
    <section className="bg-[#0b0f19] pt-12 pb-6 border-t border-slate-800">
      <PageContainer size="full">
        {/* Main 3-Column Layout */}
        <div className="flex flex-col lg:flex-row justify-between gap-10 lg:gap-8 pb-10 border-b border-slate-800">
          {/* Column 1: Intro */}
          <div className="lg:w-1/3 flex flex-col pr-0 lg:pr-8 lg:border-r border-slate-800">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight mb-6">
              EMPIEZA HOY TU
              <br />
              NEGOCIO PRIVADO
              <br />
              DE TRANSPORTE{" "}
              <span className="text-[#22c55e]">AL AEROPUERTO</span>
            </h3>
            <div className="flex items-start gap-4">
              <p className="text-slate-300 text-sm leading-relaxed max-w-[90%]">
                Construye un negocio profesional y confiable que te permita
                controlar tus clientes, tus tarifas y tu crecimiento.
              </p>
            </div>
          </div>

          {/* Column 2: Pricing & Checklist */}
          <div className="lg:w-1/3 flex flex-col justify-center">
            <div className="flex flex-col gap-1 mb-6">
              <span className="text-3xl sm:text-4xl font-extrabold text-[#22c55e] leading-none mb-1">
                $495
              </span>
              <span className="text-white font-bold text-sm leading-snug">
                Pago único.
                <br />
                Incluye el sistema completo DIY de QuitTheApp y tu página
                de ventas personalizada.
                <br />
                Mejora opcional “Lo hacemos por ti” disponible por $199.
              </span>
            </div>
            <ul className="space-y-3">
              {benefits.map((benefit, i) => (
                <li
                  key={i}
                  className="flex items-start text-slate-300 text-xs sm:text-sm"
                >
                  <CheckCircle2 className="w-[18px] h-[18px] text-[#22c55e] fill-[#22c55e] text-white mr-3 shrink-0 mt-0.5" />
                  <span className="leading-tight">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Button & Payments */}
          <div className="lg:w-1/3 flex flex-col justify-center items-center lg:items-end">
            {user?.status === "active" ? (
              <Link
                to="/dashboard"
                className="cursor-pointer bg-[#16a34a] hover:bg-[#15803d] text-white font-bold py-4 px-6 rounded-lg transition-colors shadow-lg shadow-[#16a34a]/20 flex items-center justify-between group w-full text-sm sm:text-base mb-4"
              >
                <span className="text-center w-full pr-4">
                  Ir al Panel de Control
                </span>
                <ArrowRight className="w-5 h-5 shrink-0 group-hover:translate-x-1 transition-transform" />
              </Link>
            ) : accessToken ? (
              <button
                onClick={openPricingModal}
                className="cursor-pointer bg-[#16a34a] hover:bg-[#15803d] text-white font-bold py-4 px-6 rounded-lg transition-colors shadow-lg shadow-[#16a34a]/20 flex items-center justify-between group w-full text-sm sm:text-base mb-4"
              >
                <span className="text-center w-full pr-4">
                  Empezar mi negocio privado de transporte — $495
                </span>
                <ArrowRight className="w-5 h-5 shrink-0 group-hover:translate-x-1 transition-transform" />
              </button>
            ) : (
              <button
                onClick={openPricingModal}
                className="cursor-pointer bg-[#16a34a] hover:bg-[#15803d] text-white font-bold py-4 px-6 rounded-lg transition-colors shadow-lg shadow-[#16a34a]/20 flex items-center justify-between group w-full text-sm sm:text-base mb-4"
              >
                <span className="text-center w-full pr-4">
                  Empezar mi negocio privado de transporte — $495
                </span>
                <ArrowRight className="w-5 h-5 shrink-0 group-hover:translate-x-1 transition-transform" />
              </button>
            )}

            {/* Payment Badges (CSS simulated) */}
            <div className="flex flex-col items-center lg:items-end gap-2">
              <div className="flex gap-2 flex-wrap justify-center lg:justify-end">
                <div className="bg-white px-2 py-1 rounded text-[#1a1f71] font-bold text-xs italic tracking-tighter border border-slate-300">
                  VISA
                </div>
                <div className="bg-[#00a1e0] px-2 py-1 rounded text-white font-bold text-xs border border-[#00a1e0]">
                  AMEX
                </div>
                <div className="bg-[#1c3c95] px-2 py-1 rounded text-white font-bold text-xs border border-[#1c3c95]">
                  DISCOVER
                </div>
                <div className="bg-[#1c1c1c] px-2 py-1 rounded flex items-center justify-center border border-slate-800">
                  <div className="w-3 h-3 rounded-full bg-[#eb001b] -mr-1 opacity-90 mix-blend-screen"></div>
                  <div className="w-3 h-3 rounded-full bg-[#f79e1b] opacity-90 mix-blend-screen"></div>
                </div>
              </div>
              <div className="text-slate-400 text-[11px] flex items-center gap-1.5 font-medium mt-1">
                Pago seguro procesado por{" "}
                <span className="bg-[#635bff] px-1.5 py-0.5 rounded text-white font-bold text-[10px]">
                  stripe
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Trust Indicators & Copyright */}
        <div className="pt-6 flex flex-col items-center">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-4 mb-6">
            {trustBadges.map((badge, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 text-white font-bold"
              >
                <badge.icon
                  className="w-4 h-4 shrink-0 text-[#22c55e]"
                  strokeWidth={2}
                />
                <span className="text-[10px] sm:text-[11px]">{badge.text}</span>
              </div>
            ))}
          </div>
          <p className="text-slate-400 font-medium text-[10px] sm:text-[11px]">
            © 2026 QuitTheApp, LLC. Todos los derechos reservados.
          </p>
        </div>
      </PageContainer>
    </section>
  );
}
