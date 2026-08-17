import { useCallback, useState, useRef, useEffect } from "react";
import {
  Edit,
  Image as ImageIcon,
  ChevronDown,
  Plane,
  X,
  Scan,
  Car,
  Download,
  Eye,
  ShieldCheck,
  Phone,
  Globe,
  QrCode,
  FolderSearch,
  FileText,
  Printer,
  MailOpen,
  Mail,
  FileSpreadsheet,
  FileUp,
  CheckCircle2,
  LayoutTemplate,
  Building2,
  IdCard,
  Users,
  Shield,
  Calendar,
  XCircle,
  MapPin,
  BookOpen,
  CreditCard,
  Loader2,
  AlertCircle
} from "lucide-react";
import { cn } from "../lib/cn";
import { LaunchProgressStepper } from "../components/dashboard/LaunchProgressStepper";
import { AlertModal } from "../components/ui/AlertModal";
import ResourceViewerModal from "../components/dashboard/ResourceViewerModal";
import {
  useInitializeSetupMutation,
  useGetSetupStateQuery,
  useUpdateSetupStateMutation,
  useUploadBusinessLogoMutation,
  useLazyGetAirportSuggestionsQuery,
  useGetReferralCardQuery,
  useGenerateReferralCardMutation,
  useGetBusinessResourcesQuery,
  useGetChecklistItemsQuery,
  useUpdateChecklistItemMutation,
  useGetLaunchReadinessQuery,
  useGetFinalReviewQuery,
  useCompleteLaunchMutation
} from "../store/api/Business/business.api";
import referralCardBg from "../assets/referralCardBg.png";
import autocarLogo from "../assets/autocarLogo.png";
import type { AirportSuggestion, BusinessResource } from "../store/api/Business/business.type";

interface ApiErrorPayload {
  message?: string | { message?: string };
  missingRequirements?: string[];
}

const getApiErrorMessage = (err: unknown, fallback: string): string => {
  if (err && typeof err === "object" && "data" in err) {
    const data = (err as { data?: ApiErrorPayload }).data;
    if (data?.missingRequirements && data.missingRequirements.length > 0) {
      const baseMsg = typeof data.message === "string" ? data.message : "Business is not ready for launch.";
      return `${baseMsg} Missing requirements: ${data.missingRequirements.join(", ")}`;
    }
    if (data?.message) {
      if (typeof data.message === "string") return data.message;
      if (data.message.message) return data.message.message;
    }
  }
  return fallback;
};

function ResourceIcon({ iconKey }: { iconKey: string }) {
  switch (iconKey) {
    case "folder-search":
      return <FolderSearch className="w-10 h-10 text-blue-500 mb-4" strokeWidth={1.5} />;
    case "file-text":
      return <FileText className="w-10 h-10 text-green-500 mb-4" strokeWidth={1.5} />;
    case "printer":
      return <Printer className="w-10 h-10 text-purple-600 mb-4" strokeWidth={1.5} />;
    case "mail-open":
      return <MailOpen className="w-10 h-10 text-yellow-500 mb-4" strokeWidth={1.5} />;
    case "mail":
      return <Mail className="w-10 h-10 text-teal-500 mb-4" strokeWidth={1.5} />;
    case "file-spreadsheet":
      return <FileSpreadsheet className="w-10 h-10 text-cyan-500 mb-4" strokeWidth={1.5} />;
    case "file-up":
      return <FileUp className="w-10 h-10 text-slate-600 mb-4" strokeWidth={1.5} />;
    default:
      return <FileText className="w-10 h-10 text-slate-500 mb-4" strokeWidth={1.5} />;
  }
}

export default function LaunchDashboardPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [apiError, setApiError] = useState<string | null>(null);
  const [showQrModal, setShowQrModal] = useState(false);
  const [selectedResource, setSelectedResource] = useState<BusinessResource | null>(null);
  const [openedResourceIds, setOpenedResourceIds] = useState<string[]>([]);
  const referralAutoGenerationAttempted = useRef(false);
  const [alertModal, setAlertModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    type: "success" | "error" | "info" | "confirm";
    onConfirm?: () => void;
  }>({
    isOpen: false,
    title: "",
    message: "",
    type: "info",
  });

  const showAlert = (
    title: string,
    message: string,
    type: "success" | "error" | "info" | "confirm" = "info",
    onConfirm?: () => void
  ) => {
    setAlertModal({ isOpen: true, title, message, type, onConfirm });
  };

  // API Queries & Mutations
  const { data: setupResponse, isLoading: isLoadingSetup, refetch: refetchSetup } = useGetSetupStateQuery();
  const [initializeSetup] = useInitializeSetupMutation();
  const [updateSetup, { isLoading: isUpdatingSetup }] = useUpdateSetupStateMutation();
  const [uploadLogo, { isLoading: isUploadingLogo }] = useUploadBusinessLogoMutation();

  const { data: referralCardResponse, refetch: refetchReferral } = useGetReferralCardQuery();
  const [generateReferral, { isLoading: isGeneratingReferral }] = useGenerateReferralCardMutation();

  const { data: launchReadyResponse, refetch: refetchLaunchReady } = useGetLaunchReadinessQuery();
  const { data: finalReviewResponse } = useGetFinalReviewQuery(undefined, {
    skip: currentStep !== 8
  });
  const [completeLaunch, { isLoading: isCompletingLaunch }] = useCompleteLaunchMutation();

  // Checklist Items & Resources Queries
  const { data: checklistAcq, refetch: refetchChecklistAcq } = useGetChecklistItemsQuery({ step: "CUSTOMER_ACQUISITION" });
  const { data: checklistBrand, refetch: refetchChecklistBrand } = useGetChecklistItemsQuery({ step: "BRAND_AND_TRUST" });
  const [updateChecklistItem] = useUpdateChecklistItemMutation();

  const { data: resourcesAcq } = useGetBusinessResourcesQuery({ step: "CUSTOMER_ACQUISITION" });
  const { data: resourcesBrand } = useGetBusinessResourcesQuery({ step: "BRAND_AND_TRUST" });

  useEffect(() => {
    const referral = referralCardResponse?.data;
    if (
      !referral ||
      referral.ready ||
      referral.missingRequirements.length > 0 ||
      referralAutoGenerationAttempted.current
    ) {
      return;
    }

    referralAutoGenerationAttempted.current = true;
    generateReferral()
      .then(() => {
        refetchReferral();
        refetchSetup();
      })
      .catch((error) => {
        console.error("Automatic referral card generation failed:", error);
      });
  }, [generateReferral, referralCardResponse, refetchReferral, refetchSetup]);

  // Airport suggestions query
  const [triggerGetSuggestions, { data: suggestionsResponse }] = useLazyGetAirportSuggestionsQuery();
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Form States
  const [buyerData, setBuyerData] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  const [businessData, setBusinessData] = useState({
    businessName: "",
    email: "",
    phone: "",
    businessInfo: "",
    logoUrl: "",
  });

  const [acuityData, setAcuityData] = useState({
    connected: false,
    bookingUrl: "",
  });

  const [logoFile, setLogoFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [serviceData, setServiceData] = useState({
    cityArea: "",
  });
  const [airportInput, setAirportInput] = useState("");
  const [airports, setAirports] = useState<string[]>([]);

  // Initialize draft on mount
  useEffect(() => {
    initializeSetup();
  }, [initializeSetup]);

  // Hydrate form state from API data on first load, without clobbering user edits later
  const [hasEdited, setHasEdited] = useState(false);
  const setupData = setupResponse?.data;
  if (!hasEdited && setupData) {
    setBuyerData({
      fullName: setupData.buyer?.fullName || "",
      email: setupData.buyer?.email || "",
      phone: setupData.buyer?.phone || "",
    });
    setBusinessData({
      businessName: setupData.business?.businessName || "",
      email: setupData.business?.email || "",
      phone: setupData.business?.phone || "",
      businessInfo: setupData.business?.businessInfo || "",
      logoUrl: setupData.business?.logoUrl || "",
    });
    setAcuityData({
      connected: setupData.acuity?.connected || false,
      bookingUrl: setupData.acuity?.bookingUrl || "",
    });
    setServiceData({
      cityArea: setupData.serviceArea?.cityArea || "",
    });
    setAirports(setupData.serviceArea?.airports || []);
    setCurrentStep(setupData.progress?.currentStep || 1);
    setHasEdited(true);
  }

  // Handlers for Step 1
  const handleBuyerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasEdited(true);
    const { name, value } = e.target;
    setBuyerData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStep1Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);
    try {
      const res = await updateSetup({
        buyer: {
          fullName: buyerData.fullName,
          email: buyerData.email,
          phone: buyerData.phone,
        }
      }).unwrap();
      if (res.success) {
        setCurrentStep(res.data.progress.currentStep);
      }
    } catch (err) {
      console.error(err);
      setApiError(getApiErrorMessage(err, "Failed to update buyer info. Please try again."));
    }
  };

  // Handlers for Step 2
  const handleBusinessChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setHasEdited(true);
    const { name, value } = e.target;
    setBusinessData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAcuityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasEdited(true);
    const { name, value, type, checked } = e.target;
    setAcuityData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLogoFile(e.target.files[0]);
    }
  };

  const handleStep2Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);

    if (acuityData.connected && (!acuityData.bookingUrl || !acuityData.bookingUrl.trim())) {
      setApiError("Acuity booking URL is required when connected.");
      return;
    }

    try {
      let finalLogoUrl = businessData.logoUrl;

      // Upload file first if selected
      if (logoFile) {
        const formData = new FormData();
        formData.append("file", logoFile);
        const uploadRes = await uploadLogo(formData).unwrap();
        if (uploadRes.success) {
          finalLogoUrl = uploadRes.logoUrl;
        }
      }

      const res = await updateSetup({
        business: {
          businessName: businessData.businessName,
          email: businessData.email,
          phone: businessData.phone,
          businessInfo: businessData.businessInfo,
          logoUrl: finalLogoUrl,
        },
        acuity: {
          connected: acuityData.connected,
          bookingUrl: acuityData.connected ? acuityData.bookingUrl : null,
        }
      }).unwrap();

      if (res.success) {
        setCurrentStep(res.data.progress.currentStep);
      }
    } catch (err) {
      console.error(err);
      setApiError(getApiErrorMessage(err, "Failed to update business details."));
    }
  };

  // Handlers for Step 3
  const handleServiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasEdited(true);
    const val = e.target.value;
    setServiceData({ cityArea: val });
    if (val.trim().length > 2) {
      triggerGetSuggestions({ cityArea: val });
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const selectSuggestion = (suggestion: AirportSuggestion) => {
    setServiceData({ cityArea: suggestion.cityArea });
    setShowSuggestions(false);
    // Auto-add suggested airports if not already added
    const newAirports = [...airports];
    suggestion.airportOptions.forEach((opt) => {
      if (!newAirports.includes(opt.code)) {
        newAirports.push(opt.code);
      }
    });
    setAirports(newAirports);
  };

  const handleAirportKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (airportInput.trim() !== "") {
        const code = airportInput.trim().toUpperCase();
        if (!airports.includes(code)) {
          setAirports([...airports, code]);
        }
        setAirportInput("");
      }
    }
  };

  const removeAirport = (indexToRemove: number) => {
    setAirports(airports.filter((_, index) => index !== indexToRemove));
  };

  const handleStep3Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);
    if (airports.length === 0) {
      setApiError("Please serve at least one airport.");
      return;
    }
    try {
      const res = await updateSetup({
        serviceArea: {
          cityArea: serviceData.cityArea,
          airports: airports,
        }
      }).unwrap();

      if (res.success) {
        setCurrentStep(res.data.progress.currentStep);
      }
    } catch (err) {
      console.error(err);
      setApiError(getApiErrorMessage(err, "Failed to save service area."));
    }
  };

  // Handlers for Step 4
  const handleGenerateReferral = async () => {
    setApiError(null);
    try {
      await generateReferral().unwrap();
      refetchReferral();
      refetchSetup();
    } catch (err) {
      console.error(err);
      setApiError(getApiErrorMessage(err, "Failed to generate referral card."));
    }
  };

  const handleStep4Submit = (e: React.FormEvent) => {
    e.preventDefault();
    refetchSetup();
    setCurrentStep(5);
  };

  // Handlers for Step 5 & 6
  const handleToggleChecklist = async (id: string, currentStatus: boolean) => {
    try {
      await updateChecklistItem({ id, completed: !currentStatus }).unwrap();
      refetchChecklistAcq();
      refetchChecklistBrand();
      refetchSetup();
      refetchLaunchReady();
    } catch (err) {
      console.error(err);
    }
  };

  const markResourceOpened = useCallback(async (resource: BusinessResource) => {
    setOpenedResourceIds((current) =>
      current.includes(resource.id) ? current : [...current, resource.id],
    );

    const resources = resource.step === "CUSTOMER_ACQUISITION"
      ? resourcesAcq?.resources ?? []
      : resourcesBrand?.resources ?? [];
    const checklist = resource.step === "CUSTOMER_ACQUISITION"
      ? checklistAcq?.checklistItems ?? []
      : checklistBrand?.checklistItems ?? [];
    const sortedResources = [...resources].sort((a, b) => a.sortOrder - b.sortOrder);
    const sortedChecklist = [...checklist].sort((a, b) => a.sortOrder - b.sortOrder);
    const resourceIndex = sortedResources.findIndex((item) => item.id === resource.id);
    const checklistItem = sortedChecklist[resourceIndex];

    if (checklistItem && !checklistItem.completed) {
      try {
        await updateChecklistItem({ id: checklistItem.id, completed: true }).unwrap();
        refetchChecklistAcq();
        refetchChecklistBrand();
        refetchSetup();
        refetchLaunchReady();
      } catch (error) {
        console.error("Failed to update checklist:", error);
      }
    }
  }, [checklistAcq, checklistBrand, refetchChecklistAcq, refetchChecklistBrand, refetchLaunchReady, refetchSetup, resourcesAcq, resourcesBrand, updateChecklistItem]);

  const isAcquisitionComplete = Boolean(
    checklistAcq?.checklistItems?.length && checklistAcq.checklistItems.every((item) => item.completed),
  );
  const isBrandTrustComplete = Boolean(
    checklistBrand?.checklistItems?.length && checklistBrand.checklistItems.every((item) => item.completed),
  );

  const handleStep5Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAcquisitionComplete) return;
    refetchSetup();
    setCurrentStep(6);
  };

  const handleStep6Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isBrandTrustComplete) return;
    refetchSetup();
    setCurrentStep(7);
  };

  // Handlers for Step 7
  const handleStep7Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep(8);
  };

  // Handlers for Step 8
  const handleStep8Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);
    try {
      const res = await completeLaunch().unwrap();
      if (res.success) {
        showAlert(
          "Launch Complete! 🚀",
          "Your direct booking website and business assets are successfully published. Redirecting to your dashboard...",
          "success",
          () => {
            window.location.href = "/dashboard";
          }
        );
      }
    } catch (err) {
      console.error(err);
      setApiError(getApiErrorMessage(err, "Launch failed. Please complete all checklist items and connection details."));
    }
  };

  // Progress Ring Calculation
  const progressPercentage = launchReadyResponse?.percentage ?? setupResponse?.data?.progress?.percentage ?? 0;
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressPercentage / 100) * circumference;

  // Active items checklist calculation
  const completedSteps = setupResponse?.data?.progress?.completedSteps || launchReadyResponse?.completedSteps || [];
  const acuityConnected = acuityData.connected || setupResponse?.data?.acuity?.connected || false;

  if (isLoadingSetup) {
    return (
      <div className="flex h-[60svh] items-center justify-center">
        <Loader2 className="w-8 h-8 text-green-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1400px] mx-auto w-full">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-[28px] font-bold text-slate-900 tracking-tight mb-2">
          Launch Dashboard™
        </h1>
        <p className="text-slate-500 text-[15px]">
          Complete your business setup to launch your direct booking website.
        </p>
      </div>

      {apiError && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          <div className="text-sm font-medium">{apiError}</div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200">
        <LaunchProgressStepper showFooter={false} currentStep={currentStep} />

        <div className="px-4 md:px-8 pb-8 pt-4">

          {/* ================= STEP 1 ================= */}
          {currentStep === 1 && (
            <>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-[22px] font-bold text-slate-900 mb-1">
                    Buyer Information
                  </h2>
                  <p className="text-sm text-slate-500">
                    Please enter your personal details
                  </p>
                </div>
                <button
                  type="button"
                  className="bg-green-50 p-3 rounded-xl hover:bg-green-100 transition-colors"
                  aria-label="Edit information"
                >
                  <Edit className="w-5 h-5 text-green-500" />
                </button>
              </div>

              <form onSubmit={handleStep1Submit} className="border border-slate-200 rounded-2xl p-6 md:p-8 flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="fullName" className="text-sm font-semibold text-slate-700">
                    Full Name<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={buyerData.fullName}
                    onChange={handleBuyerChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="buyerEmail" className="text-sm font-semibold text-slate-700">
                    Email Address<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="buyerEmail"
                    name="email"
                    value={buyerData.email}
                    onChange={handleBuyerChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="buyerPhone" className="text-sm font-semibold text-slate-700">
                    Phone Number<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="buyerPhone"
                    name="phone"
                    value={buyerData.phone}
                    onChange={handleBuyerChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
                <div className="mt-4 flex justify-end">
                  <button
                    type="submit"
                    disabled={isUpdatingSetup}
                    className="bg-[#22c55e] hover:bg-[#1ea951] text-white px-8 py-3 rounded-lg font-bold transition-colors flex items-center gap-2"
                  >
                    {isUpdatingSetup && <Loader2 className="w-4 h-4 animate-spin" />}
                    Save & Continue
                  </button>
                </div>
              </form>
            </>
          )}

          {/* ================= STEP 2 ================= */}
          {currentStep === 2 && (
            <>
              <div className="mb-8">
                <h2 className="text-[22px] font-bold text-slate-900 mb-1">
                  Business Information
                </h2>
                <p className="text-sm text-slate-500">
                  Provide your business details to personalize your website and business assets.
                </p>
              </div>

              <form onSubmit={handleStep2Submit} className="border border-slate-200 rounded-2xl p-6 md:p-8 flex flex-col gap-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left Column */}
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="businessName" className="text-sm font-semibold text-slate-700">
                        Business Name<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="businessName"
                        name="businessName"
                        placeholder="Enter your business name"
                        value={businessData.businessName}
                        onChange={handleBusinessChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                        required
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="businessEmail" className="text-sm font-semibold text-slate-700">
                        Email Address<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="businessEmail"
                        name="email"
                        placeholder="Business Email Address"
                        value={businessData.email}
                        onChange={handleBusinessChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                        required
                      />
                    </div>

                    <div className="flex flex-col gap-2 flex-1">
                      <label htmlFor="businessInfo" className="text-sm font-semibold text-slate-700">
                        Business Information<span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="businessInfo"
                        name="businessInfo"
                        placeholder="Tell us about your business or provide any important information."
                        value={businessData.businessInfo}
                        onChange={handleBusinessChange}
                        className="w-full h-full min-h-[140px] px-4 py-3 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none"
                        required
                      />
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="businessPhone" className="text-sm font-semibold text-slate-700">
                        Phone Number<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        id="businessPhone"
                        name="phone"
                        placeholder="Business Phone Number"
                        value={businessData.phone}
                        onChange={handleBusinessChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                        required
                      />
                    </div>

                    <div className="flex flex-col gap-4 p-5 bg-slate-50 border border-slate-200 rounded-xl">
                      <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-green-600" />
                        Booking System Connection
                      </h4>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          name="connected"
                          checked={acuityData.connected}
                          onChange={handleAcuityChange}
                          className="w-5 h-5 accent-green-600 cursor-pointer rounded border-slate-300"
                        />
                        <span className="text-sm text-slate-700 font-medium select-none">
                          Connect Acuity Scheduling
                        </span>
                      </label>

                      {acuityData.connected && (
                        <div className="flex flex-col gap-2 mt-2 animate-fade-in">
                          <label htmlFor="bookingUrl" className="text-xs font-semibold text-slate-600">
                            Acuity Booking URL<span className="text-red-500">*</span>
                          </label>
                          <input
                            type="url"
                            id="bookingUrl"
                            name="bookingUrl"
                            placeholder="https://acuityscheduling.com/schedule.php?owner=..."
                            value={acuityData.bookingUrl}
                            onChange={handleAcuityChange}
                            required={acuityData.connected}
                            className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                          />
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col gap-2 flex-1">
                      <label className="text-sm font-semibold text-slate-700">
                        Upload Business Logo <span className="text-slate-400 font-normal">(optional)</span>
                      </label>

                      <div className="flex-1 min-h-[140px] flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-xl bg-[#fafafa] relative hover:bg-slate-50 transition-colors">
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleFileSelect}
                          accept="image/png, image/jpeg, image/webp"
                          className="hidden"
                        />

                        {logoFile || businessData.logoUrl ? (
                          <div className="flex flex-col items-center gap-2 p-4 text-center">
                            <ImageIcon className="w-8 h-8 text-green-500" />
                            <span className="text-sm font-semibold text-slate-700 truncate max-w-full px-4">
                              {logoFile ? logoFile.name : "Logo current image"}
                            </span>
                            {businessData.logoUrl && !logoFile && (
                              <img src={businessData.logoUrl} alt="Logo" className="h-10 object-contain my-1" />
                            )}
                            <button
                              type="button"
                              onClick={() => {
                                setLogoFile(null);
                                setBusinessData(prev => ({ ...prev, logoUrl: "" }));
                              }}
                              className="text-xs text-red-500 font-medium hover:underline mt-1"
                            >
                              Remove file
                            </button>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center gap-3">
                            <div className="bg-green-100 p-3 rounded-xl">
                              <ImageIcon className="w-6 h-6 text-green-600" />
                            </div>
                            <span className="text-[11px] font-semibold text-slate-400">Accepted file types: PNG, JPG, WEBP</span>
                            <button
                              type="button"
                              onClick={() => fileInputRef.current?.click()}
                              className="bg-[#22c55e] hover:bg-[#1ea951] text-white px-6 py-2 rounded-lg text-sm font-bold transition-colors mt-1"
                            >
                              Browse files
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="mt-4 pt-6 border-t border-slate-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="bg-white border border-slate-200 text-slate-500 hover:text-slate-700 hover:border-slate-300 px-8 py-3 rounded-lg font-bold transition-all"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isUpdatingSetup || isUploadingLogo}
                    className="bg-[#22c55e] hover:bg-[#1ea951] text-white px-8 py-3 rounded-lg font-bold transition-colors flex items-center gap-2"
                  >
                    {(isUpdatingSetup || isUploadingLogo) && <Loader2 className="w-4 h-4 animate-spin" />}
                    Save & Continue
                  </button>
                </div>
              </form>
            </>
          )}

          {/* ================= STEP 3 ================= */}
          {currentStep === 3 && (
            <>
              <div className="mb-8">
                <h2 className="text-[22px] font-bold text-slate-900 mb-1">
                  Service Area
                </h2>
                <p className="text-sm text-slate-500">
                  Tell us where you provide transportation services so customer's know where you're available
                </p>
              </div>

              <form onSubmit={handleStep3Submit} className="border border-slate-200 rounded-2xl p-6 md:p-8 flex flex-col gap-8">
                <div className="flex flex-col gap-6 max-w-3xl relative">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="cityArea" className="text-sm font-semibold text-slate-700">
                      City or Metro Area<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="cityArea"
                      name="cityArea"
                      autoComplete="off"
                      placeholder="Enter the city or metro area you serve"
                      value={serviceData.cityArea}
                      onChange={handleServiceChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      required
                    />

                    {/* Suggestions dropdown */}
                    {showSuggestions && suggestionsResponse?.suggestions && suggestionsResponse.suggestions.length > 0 && (
                      <div className="absolute left-0 right-0 top-[82px] z-50 bg-white border border-slate-200 rounded-xl shadow-lg mt-1 overflow-hidden">
                        {suggestionsResponse.suggestions.map((sug, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => selectSuggestion(sug)}
                            className="w-full text-left px-4 py-3 hover:bg-slate-50 transition text-sm text-slate-800 font-semibold border-b border-slate-100 last:border-0"
                          >
                            {sug.cityArea} ({sug.airports.join(", ")})
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="airports" className="text-sm font-semibold text-slate-700">
                      Airports Served<span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="airports"
                        placeholder="Select or enter airport codes (e.g. MCO, MIA) and press Enter"
                        value={airportInput}
                        onChange={(e) => setAirportInput(e.target.value)}
                        onKeyDown={handleAirportKeyDown}
                        className="w-full px-4 py-3 pr-10 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      />
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                    </div>

                    {/* Selected Tags */}
                    {airports.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {airports.map((airport, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 bg-[#f8f9fa] border border-slate-200 text-slate-700 px-3 py-2 rounded-lg text-sm font-medium"
                          >
                            <Plane className="w-4 h-4 text-slate-500" />
                            {airport}
                            <button
                              type="button"
                              onClick={() => removeAirport(index)}
                              className="text-slate-400 hover:text-slate-600 transition-colors ml-1"
                              aria-label={`Remove ${airport}`}
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="mt-4 pt-6 border-t border-slate-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="bg-white border border-slate-200 text-slate-500 hover:text-slate-700 hover:border-slate-300 px-8 py-3 rounded-lg font-bold transition-all"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isUpdatingSetup}
                    className="bg-[#22c55e] hover:bg-[#1ea951] text-white px-8 py-3 rounded-lg font-bold transition-colors flex items-center gap-2"
                  >
                    {isUpdatingSetup && <Loader2 className="w-4 h-4 animate-spin" />}
                    Save & Continue
                  </button>
                </div>
              </form>
            </>
          )}

          {/* ================= STEP 4 ================= */}
          {currentStep === 4 && (
            <>
              <div className="mb-8">
                <h2 className="text-[22px] font-bold text-slate-900 mb-1">
                  Referral Card
                </h2>
                <p className="text-sm text-slate-500">
                  Your referral card has been created using your business information. Share it with customers to encourage repeat bookings.
                </p>
              </div>

              <div className="flex flex-col lg:flex-row gap-8">

                {/* Left Column: Card Mockup & Action Buttons */}
                <div className="flex-[2] flex flex-col gap-6">
                  {/* Card UI Wrapper */}
                  <div className="border border-slate-200 rounded-3xl p-4 sm:p-6 lg:p-8 bg-white shadow-sm flex items-center justify-center min-h-[480px]">

                    {/* The Referral Card */}
                    <div className="relative w-full max-w-[600px] h-[320px] rounded-2xl overflow-hidden shadow-lg flex flex-col justify-between bg-white">

                      {/* Background Image Area (Right Side) */}
                      <div className="absolute top-0 right-0 w-1/2 h-full">
                        <img
                          src={referralCardBg}
                          alt="Car driving"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent"></div>
                      </div>

                      {/* Foreground Content */}
                      <div className="relative z-10 flex flex-col h-full justify-between p-8">
                        <div>
                          <h3 className="text-[32px] sm:text-[40px] font-bold leading-tight text-slate-900 mb-3">
                            Book Direct<br />Next Time
                          </h3>
                          <p className="text-sm text-slate-600 max-w-[200px]">
                            Private airport transportation you can actually afford.
                          </p>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="bg-slate-900 rounded-full p-2.5 flex items-center justify-center">
                            <Scan className="w-5 h-5 text-white" />
                          </div>
                          <span className="text-sm font-semibold text-slate-800">
                            Scan to book your<br />next ride.
                          </span>
                        </div>
                      </div>

                      {/* Black Footer Banner */}
                      <div className="relative z-10 bg-[#111] text-white py-3 px-6 rounded-tr-3xl flex items-center gap-3 w-[70%]">
                        <Car className="w-5 h-5" />
                        <span className="font-bold text-sm tracking-wide">Your Driver. Your Best Price</span>
                      </div>

                      {/* QR Code Overlay */}
                      <div className="absolute top-1/2 right-12 -translate-y-1/2 z-20 bg-white p-2.5 rounded-xl shadow-lg border border-slate-100">
                        <div className="border border-slate-200 rounded-lg p-2 bg-slate-50">
                          {referralCardResponse?.data?.qrCodeUrl ? (
                            <img
                              src={referralCardResponse.data.qrCodeUrl}
                              alt="QR Code"
                              className="w-20 h-20 object-contain"
                            />
                          ) : (
                            <QrCode className="w-20 h-20 text-slate-900" />
                          )}
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Action Buttons Row */}
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    {(!referralCardResponse?.data?.ready) ? (
                      <button
                        type="button"
                        onClick={handleGenerateReferral}
                        disabled={isGeneratingReferral}
                        className="flex items-center justify-center gap-2 w-full bg-[#22c55e] hover:bg-[#1ea951] text-white px-4 py-3 rounded-xl font-bold transition-all text-sm disabled:opacity-50"
                      >
                        {isGeneratingReferral ? <Loader2 className="w-4 h-4 animate-spin" /> : <QrCode className="w-4 h-4" />}
                        Generate Referral Assets
                      </button>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={() => setShowQrModal(true)}
                          className="flex items-center justify-center gap-2 flex-1 w-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900 px-4 py-3 rounded-xl font-bold transition-all text-sm"
                        >
                          <Scan className="w-4 h-4" />
                          View QR Code
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (referralCardResponse?.data?.qrCodeUrl) {
                              const link = document.createElement("a");
                              link.href = referralCardResponse.data.qrCodeUrl;
                              link.download = "qrcode.png";
                              link.click();
                            }
                          }}
                          className="flex items-center justify-center gap-2 flex-1 w-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900 px-4 py-3 rounded-xl font-bold transition-all text-sm"
                        >
                          <Download className="w-4 h-4" />
                          <span className="flex flex-col items-start leading-tight">
                            Download QR Code
                            <span className="text-[10px] text-slate-400 font-normal">PNG format</span>
                          </span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const url = referralCardResponse?.data?.printCardUrl || referralCardResponse?.data?.digitalCardUrl;
                            if (url) window.open(url, "_blank");
                          }}
                          disabled={!referralCardResponse?.data?.printCardUrl && !referralCardResponse?.data?.digitalCardUrl}
                          className="flex items-center justify-center gap-2 flex-1 w-full bg-[#22c55e] hover:bg-[#1ea951] text-white px-4 py-3 rounded-xl font-bold transition-all text-sm disabled:opacity-50"
                        >
                          <Download className="w-4 h-4" />
                          Download Print-Ready Card
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* Right Column: Info Cards */}
                <div className="flex-1 flex flex-col gap-6">
                  {/* Included Card */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-6">What's included?</h3>
                    <div className="flex flex-col gap-5">
                      <div className="flex items-start gap-4">
                        <ShieldCheck className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                        <div>
                          <div className="text-sm font-bold text-slate-900">Your business branding</div>
                          <div className="text-[13px] text-slate-500">Logo and business name</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <Phone className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                        <div>
                          <div className="text-sm font-bold text-slate-900">Your contact information</div>
                          <div className="text-[13px] text-slate-500">Phone number and website</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <Scan className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                        <div>
                          <div className="text-sm font-bold text-slate-900">QR code</div>
                          <div className="text-[13px] text-slate-500">Linked to your booking website</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <Globe className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                        <div>
                          <div className="text-sm font-bold text-slate-900">Direct booking access</div>
                          <div className="text-[13px] text-slate-500">Customer can book instantly</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* How to Use Card */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-6">How to Use Your Card</h3>
                    <div className="flex flex-col gap-6">
                      <div className="flex items-start gap-4">
                        <div className="w-6 h-6 shrink-0 bg-green-600 text-white rounded-full flex items-center justify-center text-[13px] font-bold mt-0.5">1</div>
                        <div>
                          <div className="text-sm font-bold text-slate-900 mb-1 leading-tight">Hand it to every customer</div>
                          <div className="text-xs text-slate-500 leading-snug">Give your referral card to each passenger after every completed ride.</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-6 h-6 shrink-0 bg-green-600 text-white rounded-full flex items-center justify-center text-[13px] font-bold mt-0.5">2</div>
                        <div>
                          <div className="text-sm font-bold text-slate-900 mb-1 leading-tight">Ask customers to scan the QR code</div>
                          <div className="text-xs text-slate-500 leading-snug">Encourage customers to scan the QR code to access your website and save it for future bookings.</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-6 h-6 shrink-0 bg-green-600 text-white rounded-full flex items-center justify-center text-[13px] font-bold mt-0.5">3</div>
                        <div>
                          <div className="text-sm font-bold text-slate-900 mb-1 leading-tight">Encourage repeat bookings</div>
                          <div className="text-xs text-slate-500 leading-snug">Let customers know they can book directly with you for their next trip.</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Bottom Actions */}
              <form onSubmit={handleStep4Submit} className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="bg-white border border-slate-200 text-slate-500 hover:text-slate-700 hover:border-slate-300 px-8 py-3 rounded-lg font-bold transition-all"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={!referralCardResponse?.data?.ready}
                  className="bg-[#22c55e] hover:bg-[#1ea951] text-white px-8 py-3 rounded-lg font-bold transition-colors disabled:opacity-50"
                >
                  Save & Continue
                </button>
              </form>
            </>
          )}

          {/* ================= STEP 5 ================= */}
          {currentStep === 5 && (
            <>
              <div className="mb-8">
                <h2 className="text-[22px] font-bold text-slate-900 mb-1">
                  Customer Acquisition
                </h2>
                <p className="text-sm text-slate-500">
                  Grow your business by building relationships with hotels, local businesses, and referral partners.
                </p>
              </div>

              <div className="flex flex-col lg:flex-row gap-8">

                {/* Left Column: Resource Cards */}
                <div className="flex-[2] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6 bg-slate-50 rounded-3xl border border-slate-200">
                  {resourcesAcq?.resources && resourcesAcq.resources.length > 0 ? (
                    resourcesAcq.resources.map((res) => (
                      <div
                        key={res.id}
                        className="bg-white border-2 rounded-2xl p-5 text-center flex flex-col items-center justify-between shadow-sm min-h-[220px]"
                        style={{ borderColor: res.cardColor || "#e2e8f0" }}
                      >
                        <div className="flex flex-col items-center">
                          <div className="flex items-center gap-2">
                            <ResourceIcon iconKey={res.iconKey} />
                            {openedResourceIds.includes(res.id) && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                          </div>
                          <h3 className="text-[14px] font-bold text-slate-900 mb-2 leading-tight">{res.title}</h3>
                          <p className="text-[11px] text-slate-500 leading-relaxed px-1 mb-4">
                            {res.description}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setSelectedResource(res)}
                          className="w-full py-2 border border-slate-200 text-xs font-semibold text-slate-700 rounded-lg hover:bg-slate-50 transition flex items-center justify-center gap-2"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          {openedResourceIds.includes(res.id) ? "Opened" : "Open Resource"}
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full py-8 text-center text-slate-500 text-sm">
                      No active resources found for Customer Acquisition.
                    </div>
                  )}
                </div>

                {/* Right Column: Launch Checklist Guide */}
                <div className="flex-1 flex flex-col gap-6">
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 h-full">
                    <h3 className="text-[17px] font-bold text-slate-900 mb-8">Launch Checklist Guide</h3>
                    <div className="flex flex-col gap-6">
                      {checklistAcq?.checklistItems && checklistAcq.checklistItems.length > 0 ? (
                        checklistAcq.checklistItems.map((item) => (
                          <div
                            key={item.id}
                            onClick={() => handleToggleChecklist(item.id, item.completed)}
                            className="flex items-start gap-4 cursor-pointer group"
                          >
                            <CheckCircle2
                              className={cn(
                                "w-6 h-6 shrink-0 transition-colors",
                                item.completed ? "text-[#22c55e] fill-green-100" : "text-slate-300 group-hover:text-green-500"
                              )}
                              strokeWidth={2}
                            />
                            <div>
                              <div className={cn(
                                "text-sm font-bold text-slate-900 mb-1 leading-tight",
                                item.completed && "line-through text-slate-400"
                              )}>
                                {item.title}
                              </div>
                              <div className="text-xs text-slate-500 leading-snug">{item.description}</div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center text-slate-500 text-sm py-4">No checklist items.</div>
                      )}
                    </div>
                  </div>
                </div>

              </div>

              {/* Bottom Actions */}
              <form onSubmit={handleStep5Submit} className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(4)}
                  className="bg-white border border-slate-200 text-slate-500 hover:text-slate-700 hover:border-slate-300 px-8 py-3 rounded-lg font-bold transition-all"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={!isAcquisitionComplete}
                  className={cn(
                    "px-8 py-3 rounded-lg font-bold transition-colors",
                    isAcquisitionComplete
                      ? "bg-[#22c55e] hover:bg-[#1ea951] text-white"
                      : "bg-slate-300 text-slate-500 cursor-not-allowed",
                  )}
                >
                  Save & Continue
                </button>
              </form>
            </>
          )}

          {/* ================= STEP 6 ================= */}
          {currentStep === 6 && (
            <>
              <div className="mb-8">
                <h2 className="text-[22px] font-bold text-slate-900 mb-1">
                  Brand & Trust
                </h2>
                <p className="text-sm text-slate-500">
                  Build customer confidence with professionally crafted trust resources designed to increase bookings and conversions.
                </p>
              </div>

              <div className="flex flex-col lg:flex-row gap-8">

                {/* Left Column: Resource Cards */}
                <div className="flex-[2] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-8 bg-slate-50 rounded-3xl border border-slate-200">
                  {resourcesBrand?.resources && resourcesBrand.resources.length > 0 ? (
                    resourcesBrand.resources.map((res) => (
                      <div
                        key={res.id}
                        className="bg-white border-2 rounded-2xl p-6 text-center flex flex-col items-center justify-between shadow-sm min-h-[260px]"
                        style={{ borderColor: res.cardColor || "#e2e8f0" }}
                      >
                        <div className="flex flex-col items-center">
                          <div className="flex items-center gap-2">
                            <ResourceIcon iconKey={res.iconKey} />
                            {openedResourceIds.includes(res.id) && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                          </div>
                          <h3 className="text-[16px] font-bold text-slate-900 mb-3 leading-tight">{res.title}</h3>
                          <p className="text-[12px] text-slate-500 leading-relaxed mb-6">
                            {res.description}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setSelectedResource(res)}
                          className="w-full py-2.5 rounded-lg font-bold text-[13px] transition-all bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-2"
                        >
                          <Eye className="w-4 h-4" />
                          {openedResourceIds.includes(res.id) ? "Opened" : "Open Resource"}
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full py-8 text-center text-slate-500 text-sm">
                      No active resources found for Brand & Trust.
                    </div>
                  )}
                </div>

                {/* Right Column: Trust Checklist */}
                <div className="flex-1 flex flex-col gap-6">
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 h-full">
                    <h3 className="text-[17px] font-bold text-slate-900 mb-8">Trust Checklist</h3>
                    <div className="flex flex-col gap-6">
                      {checklistBrand?.checklistItems && checklistBrand.checklistItems.length > 0 ? (
                        checklistBrand.checklistItems.map((item) => (
                          <div
                            key={item.id}
                            onClick={() => handleToggleChecklist(item.id, item.completed)}
                            className="flex items-start gap-4 cursor-pointer group"
                          >
                            <CheckCircle2
                              className={cn(
                                "w-6 h-6 shrink-0 transition-colors",
                                item.completed ? "text-[#22c55e] fill-green-100" : "text-slate-300 group-hover:text-green-500"
                              )}
                              strokeWidth={2}
                            />
                            <div>
                              <div className={cn(
                                "text-sm font-bold text-slate-900 mb-1 leading-tight",
                                item.completed && "line-through text-slate-400"
                              )}>
                                {item.title}
                              </div>
                              <div className="text-xs text-slate-500 leading-snug">{item.description}</div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center text-slate-500 text-sm py-4">No checklist items.</div>
                      )}
                    </div>
                  </div>
                </div>

              </div>

              {/* Bottom Actions */}
              <form onSubmit={handleStep6Submit} className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(5)}
                  className="bg-white border border-slate-200 text-slate-500 hover:text-slate-700 hover:border-slate-300 px-8 py-3 rounded-lg font-bold transition-all"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={!isBrandTrustComplete}
                  className={cn(
                    "px-8 py-3 rounded-lg font-bold transition-colors",
                    isBrandTrustComplete
                      ? "bg-[#22c55e] hover:bg-[#1ea951] text-white"
                      : "bg-slate-300 text-slate-500 cursor-not-allowed",
                  )}
                >
                  Save & Continue
                </button>
              </form>
            </>
          )}

          {/* ================= STEP 7 ================= */}
          {currentStep === 7 && (
            <>
              <div className="mb-8">
                <h2 className="text-[22px] font-bold text-slate-900 mb-1">
                  Launch Ready
                </h2>
                <p className="text-sm text-slate-500">
                  Congratulations! Your business is almost ready to go live. Complete the final checklist below before publishing and start attracting customers with confidence.
                </p>
              </div>

              <div className="flex flex-col lg:flex-row gap-8">

                {/* Left Column: Final Checklist */}
                <div className="flex-[2] bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 flex flex-col gap-0 shadow-sm">

                  {/* Item 1 */}
                  <div className="flex items-center justify-between py-5 border-b border-slate-100 last:border-0">
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                        <Building2 className="w-6 h-6 text-green-500" />
                      </div>
                      <div>
                        <h4 className="text-[15px] font-bold text-slate-900">Business Setup</h4>
                        <p className="text-[12px] text-slate-500 mt-0.5">Business information has been completed and verified.</p>
                      </div>
                    </div>
                    {completedSteps.includes(1) && completedSteps.includes(2) ? (
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-green-600">Complete</span>
                        <CheckCircle2 className="w-5 h-5 text-green-500 fill-green-100" />
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-orange-500">Incomplete</span>
                        <XCircle className="w-5 h-5 text-orange-500" />
                      </div>
                    )}
                  </div>

                  {/* Item 2 */}
                  <div className="flex items-center justify-between py-5 border-b border-slate-100 last:border-0">
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                        <Globe className="w-6 h-6 text-green-500" />
                      </div>
                      <div>
                        <h4 className="text-[15px] font-bold text-slate-900">Service Area</h4>
                        <p className="text-[12px] text-slate-500 mt-0.5">Your service city and metro coverage are verified.</p>
                      </div>
                    </div>
                    {completedSteps.includes(3) ? (
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-green-600">Complete</span>
                        <CheckCircle2 className="w-5 h-5 text-green-500 fill-green-100" />
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-orange-500">Incomplete</span>
                        <XCircle className="w-5 h-5 text-orange-500" />
                      </div>
                    )}
                  </div>

                  {/* Item 3 */}
                  <div className="flex items-center justify-between py-5 border-b border-slate-100 last:border-0">
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                        <IdCard className="w-6 h-6 text-green-500" />
                      </div>
                      <div>
                        <h4 className="text-[15px] font-bold text-slate-900">Referral Card</h4>
                        <p className="text-[12px] text-slate-500 mt-0.5">Your referral card has been generated and is ready to share with customers.</p>
                      </div>
                    </div>
                    {completedSteps.includes(4) ? (
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-green-600">Complete</span>
                        <CheckCircle2 className="w-5 h-5 text-green-500 fill-green-100" />
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-orange-500">Incomplete</span>
                        <XCircle className="w-5 h-5 text-orange-500" />
                      </div>
                    )}
                  </div>

                  {/* Item 4 */}
                  <div className="flex items-center justify-between py-5 border-b border-slate-100 last:border-0">
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                        <QrCode className="w-6 h-6 text-green-500" />
                      </div>
                      <div>
                        <h4 className="text-[15px] font-bold text-slate-900">QR Code</h4>
                        <p className="text-[12px] text-slate-500 mt-0.5">Your branded QR code has been created and is ready to use online and offline.</p>
                      </div>
                    </div>
                    {completedSteps.includes(4) ? (
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-green-600">Complete</span>
                        <CheckCircle2 className="w-5 h-5 text-green-500 fill-green-100" />
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-orange-500">Incomplete</span>
                        <XCircle className="w-5 h-5 text-orange-500" />
                      </div>
                    )}
                  </div>

                  {/* Item 5 */}
                  <div className="flex items-center justify-between py-5 border-b border-slate-100 last:border-0">
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                        <Users className="w-6 h-6 text-green-500" />
                      </div>
                      <div>
                        <h4 className="text-[15px] font-bold text-slate-900">Customer Acquisition</h4>
                        <p className="text-[12px] text-slate-500 mt-0.5">Your marketing materials and customer acquisition resources are prepared.</p>
                      </div>
                    </div>
                    {completedSteps.includes(5) ? (
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-green-600">Complete</span>
                        <CheckCircle2 className="w-5 h-5 text-green-500 fill-green-100" />
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-orange-500">Incomplete</span>
                        <XCircle className="w-5 h-5 text-orange-500" />
                      </div>
                    )}
                  </div>

                  {/* Item 6 */}
                  <div className="flex items-center justify-between py-5 border-b border-slate-100 last:border-0">
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                        <Shield className="w-6 h-6 text-green-500" />
                      </div>
                      <div>
                        <h4 className="text-[15px] font-bold text-slate-900">Trust Resources</h4>
                        <p className="text-[12px] text-slate-500 mt-0.5">Your trust-building assets are ready to help convert visitors into customers.</p>
                      </div>
                    </div>
                    {completedSteps.includes(6) ? (
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-green-600">Complete</span>
                        <CheckCircle2 className="w-5 h-5 text-green-500 fill-green-100" />
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-orange-500">Incomplete</span>
                        <XCircle className="w-5 h-5 text-orange-500" />
                      </div>
                    )}
                  </div>

                  {/* Item 7 */}
                  <div className="flex items-center justify-between py-5 border-b border-slate-100 last:border-0">
                    <div className="flex items-center gap-5">
                      <div className={cn(
                        "w-12 h-12 rounded-full flex items-center justify-center shrink-0",
                        acuityConnected ? "bg-green-50" : "bg-orange-100"
                      )}>
                        <Calendar className={cn("w-6 h-6", acuityConnected ? "text-green-500" : "text-orange-500")} />
                      </div>
                      <div>
                        <h4 className={cn("text-[15px] font-bold", acuityConnected ? "text-slate-900" : "text-orange-500")}>Booking System</h4>
                        <p className="text-[12px] text-slate-500 mt-0.5">Connect your preferred booking platform so customers can book your services online.</p>
                      </div>
                    </div>
                    {acuityConnected ? (
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-green-600">Connected</span>
                        <CheckCircle2 className="w-5 h-5 text-green-500 fill-green-100" />
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-orange-500">Not Connected</span>
                        <XCircle className="w-5 h-5 text-orange-500" />
                      </div>
                    )}
                  </div>

                </div>

                {/* Right Column: Launch Progress */}
                <div className="flex-1">
                  <div className="bg-white border border-slate-200 rounded-3xl p-8 flex flex-col items-center justify-center shadow-sm h-full text-center">
                    <h3 className="text-[18px] font-bold text-slate-900 mb-8">Your Launch Progress</h3>

                    {/* SVG Progress Ring */}
                    <div className="relative w-56 h-56 mb-8 flex items-center justify-center">
                      <svg
                        className="w-full h-full transform -rotate-90"
                        viewBox="0 0 200 200"
                      >
                        {/* Background track */}
                        <circle
                          cx="100"
                          cy="100"
                          r={radius}
                          fill="transparent"
                          stroke="#f1f5f9"
                          strokeWidth="12"
                        />
                        {/* Progress ring */}
                        <circle
                          cx="100"
                          cy="100"
                          r={radius}
                          fill="transparent"
                          stroke="#22c55e"
                          strokeWidth="12"
                          strokeDasharray={circumference}
                          strokeDashoffset={strokeDashoffset}
                          strokeLinecap="round"
                          className="transition-all duration-1000 ease-out"
                        />
                      </svg>
                      {/* Text inside ring */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-[20px] font-bold text-green-600">
                          {progressPercentage}% Complete
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col items-center max-w-[260px]">
                      <h4 className="text-[16px] font-bold text-slate-900 mb-2">
                        {progressPercentage === 100 ? "Ready to Launch! 🚀" : "Almost Ready! 🚀"}
                      </h4>
                      <p className="text-[12px] text-slate-500 leading-relaxed">
                        {progressPercentage === 100
                          ? "All steps completed! Continue to the final review and launch your private direct booking airport business."
                          : "You're just a few steps away from launching your business. Connect your booking system now, or launch without it and add it later."
                        }
                      </p>
                    </div>

                  </div>
                </div>

              </div>

              {/* Bottom Actions */}
              <form onSubmit={handleStep7Submit} className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(6)}
                  className="bg-white border border-slate-200 text-slate-500 hover:text-slate-700 hover:border-slate-300 px-8 py-3 rounded-lg font-bold transition-all"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="bg-[#22c55e] hover:bg-[#1ea951] text-white px-8 py-3 rounded-lg font-bold transition-colors"
                >
                  Continue to final review
                </button>
              </form>
            </>
          )}

          {/* ================= STEP 8 ================= */}
          {currentStep === 8 && (
            <>
              <div className="mb-8">
                <h2 className="text-[22px] font-bold text-slate-900 mb-1">
                  Final Review
                </h2>
                <p className="text-sm text-slate-500">
                  Review your business details and generated assets one last time before launching your direct booking website.
                </p>
              </div>

              <div className="flex flex-col lg:flex-row gap-8">

                {/* Left Column: Business Information */}
                <div className="flex-[1] bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 flex flex-col shadow-sm relative">

                  {/* Edit Button */}
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="absolute top-6 right-6 w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600 hover:bg-green-100 transition-colors"
                  >
                    <Edit className="w-5 h-5" />
                  </button>

                  <h3 className="text-[17px] font-bold text-slate-900 mb-8">Business Information</h3>

                  <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-4">
                      <Building2 className="w-5 h-5 text-slate-400 shrink-0" />
                      <div className="w-[120px] text-[13px] text-slate-500 font-medium">Business Name</div>
                      <div className="text-[14px] text-slate-900 font-semibold">{businessData.businessName || "Not set"}</div>
                    </div>

                    <div className="flex items-center gap-4">
                      <Phone className="w-5 h-5 text-slate-400 shrink-0" />
                      <div className="w-[120px] text-[13px] text-slate-500 font-medium">Business Phone</div>
                      <div className="text-[14px] text-slate-900 font-semibold">{businessData.phone || "Not set"}</div>
                    </div>

                    <div className="flex items-center gap-4">
                      <Mail className="w-5 h-5 text-slate-400 shrink-0" />
                      <div className="w-[120px] text-[13px] text-slate-500 font-medium">Business Email</div>
                      <div className="text-[14px] text-slate-900 font-semibold">{businessData.email || "Not set"}</div>
                    </div>

                    <div className="flex items-start gap-4">
                      <MapPin className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                      <div className="w-[120px] text-[13px] text-slate-500 font-medium pt-0.5">Service Area</div>
                      <div className="text-[14px] text-slate-900 font-semibold leading-snug">{serviceData.cityArea || "Not set"}</div>
                    </div>

                    <div className="flex items-start gap-4">
                      <Plane className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                      <div className="w-[120px] text-[13px] text-slate-500 font-medium pt-0.5">Airports Served</div>
                      <div className="text-[14px] text-slate-900 font-semibold leading-snug">
                        {airports.length > 0 ? airports.join(", ") : "None"}
                      </div>
                    </div>

                    <div className="flex items-start gap-4 mt-2">
                      <ImageIcon className="w-5 h-5 text-slate-400 shrink-0 mt-1" />
                      <div className="w-[120px] text-[13px] text-slate-500 font-medium pt-1">Business Logo</div>
                      <div className="overflow-hidden rounded-xl border border-slate-200">
                        {businessData.logoUrl ? (
                          <img src={businessData.logoUrl} alt="Logo" className="w-[160px] h-[80px] object-cover" />
                        ) : (
                          <img src={autocarLogo} alt="Placeholder Logo" className="w-[160px] h-[80px] object-cover opacity-50" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Generated Assets */}
                <div className="flex-[1] bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
                  <h3 className="text-[17px] font-bold text-slate-900 mb-8">Generated Assets</h3>

                  <div className="flex flex-col lg:flex-row gap-8">
                    {/* List of Assets */}
                    <div className="flex-1 flex flex-col gap-6">
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center shrink-0 mt-0.5">
                          <Globe className="w-4 h-4 text-green-500" />
                        </div>
                        <div>
                          <div className="text-[14px] font-bold text-slate-900 mb-0.5">Driver Website</div>
                          <div className="text-[12px] text-slate-500 leading-snug">
                            Your direct booking website is ready:{" "}
                            <a
                              href={finalReviewResponse?.data?.assets?.websiteUrl || "#"}
                              target="_blank"
                              rel="noreferrer"
                              className="text-green-600 hover:underline"
                            >
                              {finalReviewResponse?.data?.assets?.websiteUrl || "Loading..."}
                            </a>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center shrink-0 mt-0.5">
                          <CreditCard className="w-4 h-4 text-green-500" />
                        </div>
                        <div>
                          <div className="text-[14px] font-bold text-slate-900 mb-0.5">Referral Card</div>
                          <div className="text-[12px] text-slate-500 leading-snug">Your branded referral card has been generated and is ready to share.</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center shrink-0 mt-0.5">
                          <QrCode className="w-4 h-4 text-green-500" />
                        </div>
                        <div>
                          <div className="text-[14px] font-bold text-slate-900 mb-0.5">QR Code</div>
                          <div className="text-[12px] text-slate-500 leading-snug">Your QR code is linked to your booking website and ready for print or digital use.</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center shrink-0 mt-0.5">
                          <LayoutTemplate className="w-4 h-4 text-green-500" />
                        </div>
                        <div>
                          <div className="text-[14px] font-bold text-slate-900 mb-0.5">Selling Page</div>
                          <div className="text-[12px] text-slate-500 leading-snug">Your shareable landing page is ready to promote your services.</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center shrink-0 mt-0.5">
                          <BookOpen className="w-4 h-4 text-green-500" />
                        </div>
                        <div>
                          <div className="text-[14px] font-bold text-slate-900 mb-0.5">Resources & Guides</div>
                          <div className="text-[12px] text-slate-500 leading-snug">Marketing resources, trust guides, and launch materials are available to help grow your business.</div>
                        </div>
                      </div>
                    </div>

                    {/* Booking System Upsell */}
                    <div className="w-full lg:w-[220px] shrink-0 h-[240px] border-2 border-orange-200 bg-orange-50/30 rounded-2xl p-6 flex flex-col items-center justify-center text-center">
                      <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center mb-4 shadow-sm">
                        <Calendar className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="text-[15px] font-bold text-slate-900 mb-1">Booking System</h4>
                      <p className="text-[11px] text-slate-500 mb-4">Direct Booking system</p>

                      {acuityConnected ? (
                        <div className="px-3 py-1 rounded-full bg-green-100 text-green-600 text-[11px] font-bold mb-4">
                          Connected
                        </div>
                      ) : (
                        <div className="px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-[11px] font-bold mb-4">
                          Not Connected
                        </div>
                      )}

                      <p className="text-[11px] text-slate-500 leading-relaxed px-2">
                        {acuityConnected
                          ? "Acuity Connection is connected and working."
                          : "To enable, connect Acuity Scheduling in Step 2."
                        }
                      </p>
                    </div>
                  </div>

                </div>

              </div>

              {/* Bottom Actions */}
              <form onSubmit={handleStep8Submit} className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(7)}
                  className="bg-white border border-slate-200 text-slate-500 hover:text-slate-700 hover:border-slate-300 px-8 py-3 rounded-lg font-bold transition-all"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isCompletingLaunch || !launchReadyResponse?.readyForFinalReview}
                  className={`${
                    isCompletingLaunch || !launchReadyResponse?.readyForFinalReview
                      ? "bg-slate-300 text-slate-500 cursor-not-allowed"
                      : "bg-[#22c55e] hover:bg-[#1ea951] text-white shadow-sm"
                  } px-8 py-3 rounded-lg font-bold transition-colors flex items-center gap-2`}
                >
                  {isCompletingLaunch && <Loader2 className="w-4 h-4 animate-spin" />}
                  Complete Launch
                </button>
              </form>
            </>
          )}

        </div>
      </div>

      <ResourceViewerModal
        resource={selectedResource}
        isOpen={Boolean(selectedResource)}
        onClose={() => setSelectedResource(null)}
        onOpened={markResourceOpened}
      />

      {/* QR Code Viewer Modal */}
      {showQrModal && referralCardResponse?.data?.qrCodeUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl relative text-center flex flex-col items-center">
            <button
              onClick={() => setShowQrModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>
            <h3 className="text-[17px] font-bold text-slate-900 mb-1">
              Your Branded QR Code
            </h3>
            <p className="text-xs text-slate-500 mb-6 leading-relaxed">
              Scan this code with your phone to preview your direct booking page.
            </p>
            <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50 mb-6 shadow-sm">
              <img
                src={referralCardResponse.data.qrCodeUrl}
                alt="Branded QR Code"
                className="w-56 h-56 object-contain"
              />
            </div>
            <button
              onClick={() => {
                if (referralCardResponse?.data?.qrCodeUrl) {
                  const link = document.createElement("a");
                  link.href = referralCardResponse.data.qrCodeUrl;
                  link.download = "qrcode.png";
                  link.click();
                }
              }}
              className="w-full bg-[#22c55e] hover:bg-[#1ea951] text-white py-2.5 rounded-lg text-sm font-bold transition flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download QR Code
            </button>
          </div>
        </div>
      )}

      {/* Custom Reusable Alert Modal */}
      <AlertModal
        isOpen={alertModal.isOpen}
        onClose={() => {
          setAlertModal((prev) => ({ ...prev, isOpen: false }));
          if (alertModal.type === "success" && alertModal.onConfirm) {
            alertModal.onConfirm();
          }
        }}
        title={alertModal.title}
        message={alertModal.message}
        type={alertModal.type}
        onConfirm={() => {
          setAlertModal((prev) => ({ ...prev, isOpen: false }));
          if (alertModal.onConfirm) alertModal.onConfirm();
        }}
      />
    </div>
  );
}
