import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Copy, Share2, Download, ImagePlus, X, Loader2, Pencil, Eye, EyeOff } from "lucide-react";
import { useAppDispatch } from "../hooks/storeHooks";
import { logOut } from "../store/features/auth/authSlice";
import {
  useGetRiderProfileQuery,
  useUpdateRiderProfileMutation,
  useUploadAvatarMutation,
  useChangeRiderPasswordMutation,
} from "../store/api/Auth/auth.api";
import {
  useGetSetupStateQuery,
  useGetReferralCardQuery,
  useUpdateSetupStateMutation,
  useUploadBusinessLogoMutation,
} from "../store/api/Business/business.api";
import { AlertModal } from "../components/ui/AlertModal";
import eleanorAvatar from "../assets/eleanorAvatar.png";
import carCover from "../assets/carCover.png";
import { copyToClipboard } from "../utils/clipboard";

interface ApiErrorPayload {
  message?: string | string[];
}

const getApiErrorMessage = (err: unknown, fallback: string): string => {
  if (err && typeof err === "object" && "data" in err) {
    const data = (err as { data?: ApiErrorPayload }).data;
    if (Array.isArray(data?.message)) return data.message[0] || fallback;
    if (data?.message) return data.message;
  }
  return fallback;
};

export default function ProfileSettingsPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const businessLogoInputRef = useRef<HTMLInputElement>(null);

  // Modals state
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isEditInfoModalOpen, setIsEditInfoModalOpen] = useState(false);
  const [isEditBusinessModalOpen, setIsEditBusinessModalOpen] = useState(false);
  const [isEditPasswordModalOpen, setIsEditPasswordModalOpen] = useState(false);

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
  const { data: profileResponse, isLoading: isLoadingProfile, refetch: refetchProfile } = useGetRiderProfileQuery();
  const { data: setupResponse, refetch: refetchSetup } = useGetSetupStateQuery();
  const { data: referralResponse, refetch: refetchReferral } = useGetReferralCardQuery();

  const [updateProfile, { isLoading: isUpdatingProfile }] = useUpdateRiderProfileMutation();
  const [uploadAvatar, { isLoading: isUploadingAvatar }] = useUploadAvatarMutation();
  const [changePassword, { isLoading: isChangingPassword }] = useChangeRiderPasswordMutation();
  const [updateSetup, { isLoading: isUpdatingBusiness }] = useUpdateSetupStateMutation();
  const [uploadBusinessLogo, { isLoading: isUploadingBusinessLogo }] = useUploadBusinessLogoMutation();

  // Form States
  const [profileForm, setProfileForm] = useState(() => ({
    name: profileResponse?.user?.name || "",
    phone: profileResponse?.user?.phone || "",
  }));

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    password: "",
    confirmPassword: "",
  });

  const [businessForm, setBusinessForm] = useState({
    businessName: "",
    email: "",
    phone: "",
    businessInfo: "",
    logoUrl: "",
    cityArea: "",
  });
  const [businessLogoFile, setBusinessLogoFile] = useState<File | null>(null);

  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const openBusinessEditModal = () => {
    const setup = setupResponse?.data;
    setBusinessForm({
      businessName: setup?.business?.businessName || "",
      email: setup?.business?.email || "",
      phone: setup?.business?.phone || "",
      businessInfo: setup?.business?.businessInfo || "",
      logoUrl: setup?.business?.logoUrl || "",
      cityArea: setup?.serviceArea?.cityArea || "",
    });
    setBusinessLogoFile(null);
    setIsEditBusinessModalOpen(true);
  };

  const handleBusinessLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      showAlert("File Too Large", "Business logo must be 5 MB or smaller.", "error");
      e.target.value = "";
      return;
    }

    if (!["image/png", "image/jpeg", "image/webp"].includes(file.type)) {
      showAlert("Invalid File Type", "Use a PNG, JPG, or WEBP business logo.", "error");
      e.target.value = "";
      return;
    }

    setBusinessLogoFile(file);
  };

  const handleBusinessSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const businessName = businessForm.businessName.trim();
    const email = businessForm.email.trim();
    const phone = businessForm.phone.trim();
    const businessInfo = businessForm.businessInfo.trim();
    const cityArea = businessForm.cityArea.trim();

    if (!businessName || !email || !phone || !businessInfo || !cityArea) {
      showAlert("Missing Information", "Complete all required business fields.", "error");
      return;
    }

    if (!/^[+\d][\d\s().-]{6,39}$/.test(phone)) {
      showAlert("Invalid Phone Number", "Enter a valid business phone number.", "error");
      return;
    }

    try {
      let logoUrl = businessForm.logoUrl.trim();

      if (businessLogoFile) {
        const formData = new FormData();
        formData.append("file", businessLogoFile);
        const uploadResponse = await uploadBusinessLogo(formData).unwrap();
        logoUrl = uploadResponse.logoUrl;
      }

      const response = await updateSetup({
        business: {
          businessName,
          email,
          phone,
          businessInfo,
          logoUrl: logoUrl || null,
        },
        serviceArea: {
          cityArea,
          airports: setupResponse?.data?.serviceArea?.airports || [],
        },
      }).unwrap();

      if (response.success) {
        setBusinessLogoFile(null);
        setIsEditBusinessModalOpen(false);
        refetchSetup();
        refetchReferral();
        showAlert("Business Updated", "Your business information was updated successfully.", "success");
      }
    } catch (err) {
      console.error(err);
      showAlert("Update Error", getApiErrorMessage(err, "Failed to update business information."), "error");
    }
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      showAlert("File Too Large", "Image must be 5 MB or smaller.", "error");
      return;
    }
    if (!file.type.startsWith("image/")) {
      showAlert("Invalid File Type", "Please choose an image file.", "error");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await uploadAvatar(formData).unwrap();
      if (res.success) {
        setIsUploadModalOpen(false);
        refetchProfile();
      }
    } catch (err) {
      console.error(err);
      showAlert("Upload Error", getApiErrorMessage(err, "Failed to upload avatar."), "error");
    }
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await updateProfile({
        name: profileForm.name,
        phone: profileForm.phone,
      }).unwrap();
      if (res.success) {
        setIsEditInfoModalOpen(false);
        refetchProfile();
      }
    } catch (err) {
      console.error(err);
      showAlert("Update Error", getApiErrorMessage(err, "Failed to update profile information."), "error");
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);

    if (!passwordForm.currentPassword) {
      setPasswordError("Current password is required.");
      return;
    }
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/.test(passwordForm.password)) {
      setPasswordError("Password must be at least 8 characters and contain uppercase, lowercase, number, and special character.");
      return;
    }
    if (passwordForm.password !== passwordForm.confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }

    try {
      const res = await changePassword({
        currentPassword: passwordForm.currentPassword,
        password: passwordForm.password,
        confirmPassword: passwordForm.confirmPassword,
      }).unwrap();

      if (res.success) {
        showAlert(
          "Password Changed",
          "Password changed successfully! For security, please log in again.",
          "success",
          () => {
            dispatch(logOut());
            navigate("/login");
          }
        );
      }
    } catch (err) {
      console.error(err);
      setPasswordError(getApiErrorMessage(err, "Password change failed. Current password may be incorrect."));
    }
  };

  if (isLoadingProfile) {
    return (
      <div className="flex h-[50svh] items-center justify-center">
        <Loader2 className="w-8 h-8 text-green-500 animate-spin" />
      </div>
    );
  }

  const user = profileResponse?.user;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto w-full relative animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[24px] font-bold text-slate-900 mb-2">My Profile</h1>
        <p className="text-sm text-slate-500">
          Manage your account preferences, security settings, notifications, and business configuration in one place.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 mb-6">
        {/* Left Column */}
        <div className="flex-1 flex flex-col gap-6">

          {/* Personal Information */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm relative">
            <div className="flex items-start justify-between mb-8">
              <h3 className="text-[16px] font-bold text-slate-900">Personal Information</h3>
              <div className="text-right">
                <p className="text-[12px] text-slate-400 mb-0.5">Member since</p>
                <p className="text-[14px] font-medium text-slate-700">5 April, 2026</p>
              </div>
            </div>

            <div className="flex flex-col 2xl:flex-row items-center 2xl:items-start gap-8">

              <div className="relative shrink-0">
                <img
                  src={user?.avatarUrl || eleanorAvatar}
                  alt={user?.name ?? "Profile avatar"}
                  className="w-32 h-32 rounded-full object-cover shadow-sm border border-slate-100 bg-slate-50"
                />
                <button
                  onClick={() => setIsUploadModalOpen(true)}
                  className="absolute bottom-0 right-0 w-8 h-8 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center shadow-md transition-colors border-2 border-white"
                >
                  <ImagePlus className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 grid grid-cols-1 2xl:grid-cols-2 gap-y-6 gap-x-4 w-full min-w-0">
                <div>
                  <p className="text-[12px] text-slate-400 mb-1">Full name</p>
                  <p className="text-[14px] font-bold text-slate-800 break-words">{user?.name || "N/A"}</p>
                </div>
                <div>
                  <p className="text-[12px] text-slate-400 mb-1">Email address</p>
                  <p className="text-[14px] font-bold text-slate-800 break-all">{user?.email || "N/A"}</p>
                </div>
                <div>
                  <p className="text-[12px] text-slate-400 mb-1">Phone number</p>
                  <p className="text-[14px] font-bold text-slate-800 break-words">{user?.phone || "N/A"}</p>
                </div>
              </div>

              <div className="shrink-0 mt-4 2xl:mt-0 2xl:absolute 2xl:bottom-8 2xl:right-8 w-full 2xl:w-auto">
                <button
                  onClick={() => setIsEditInfoModalOpen(true)}
                  className="bg-[#22c55e] hover:bg-[#1ea951] text-white px-5 py-2.5 rounded-lg font-bold text-[13px] transition-colors shadow-sm w-full 2xl:w-auto text-center"
                >
                  Edit Information
                </button>
              </div>
            </div>
          </div>

          {/* Security System */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col xl:flex-row flex-wrap xl:items-center justify-between gap-6">
            <div>
              <h3 className="text-[16px] font-bold text-slate-900 mb-4">Security System</h3>
              <p className="text-[12px] text-slate-400 mb-1">Password</p>
              <p className="text-[18px] font-bold text-slate-800 leading-none">*******</p>
            </div>
            <button
              onClick={() => setIsEditPasswordModalOpen(true)}
              className="bg-green-100 hover:bg-green-200 text-green-700 px-5 py-2.5 rounded-lg font-bold text-[13px] transition-colors shadow-sm w-full xl:w-auto text-center"
            >
              Edit Password
            </button>
          </div>

        </div>

        {/* Right Column */}
        <div className="flex-1 min-w-0">
          {/* Business Information */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm h-full relative">
            <div className="flex items-center justify-between gap-4 mb-6 border-b border-slate-100 pb-4">
              <h3 className="text-[16px] font-bold text-slate-900">Business Information</h3>
              <button
                type="button"
                onClick={openBusinessEditModal}
                disabled={!setupResponse?.data}
                className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-700 transition-colors hover:bg-green-200 disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Edit business information"
                title="Edit business information"
              >
                <Pencil className="size-4" />
              </button>
            </div>

            <div className="flex flex-col 2xl:flex-row items-center 2xl:items-start gap-8">

              <div className="relative shrink-0">
                <img
                  src={setupResponse?.data?.business?.logoUrl || carCover}
                  alt="Business Cover"
                  className="w-32 h-32 rounded-full object-cover shadow-sm border border-slate-100 bg-slate-50"
                />
              </div>

              <div className="flex-1 grid grid-cols-1 2xl:grid-cols-2 gap-y-6 gap-x-4 w-full min-w-0">
                <div>
                  <p className="text-[12px] text-slate-400 mb-1">Business name</p>
                  <p className="text-[14px] font-bold text-slate-800 break-words">
                    {setupResponse?.data?.business?.businessName || "Not set"}
                  </p>
                </div>
                <div>
                  <p className="text-[12px] text-slate-400 mb-1">Email address</p>
                  <p className="text-[14px] font-bold text-slate-800 break-all">
                    {setupResponse?.data?.business?.email || "Not set"}
                  </p>
                </div>
                <div>
                  <p className="text-[12px] text-slate-400 mb-1">Driver ID</p>
                  <p className="text-[14px] font-bold text-slate-800 break-words">
                    #{user?.id ? user.id.slice(-6).toUpperCase() : "DR0001"}
                  </p>
                </div>
                <div>
                  <p className="text-[12px] text-slate-400 mb-1">Phone number</p>
                  <p className="text-[14px] font-bold text-slate-800 break-words">
                    {setupResponse?.data?.business?.phone || "Not set"}
                  </p>
                </div>
                <div>
                  <p className="text-[12px] text-slate-400 mb-1">Business area</p>
                  <p className="text-[14px] font-bold text-slate-800 break-words">
                    {setupResponse?.data?.serviceArea?.cityArea || "Not set"}
                  </p>
                </div>
                <div className="2xl:col-span-2">
                  <p className="text-[12px] text-slate-400 mb-1">Business details</p>
                  <p className="text-[13px] text-slate-800 leading-relaxed max-w-sm">
                    {setupResponse?.data?.business?.businessInfo || "An independent transportation business designed to help you earn more through direct customer bookings."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Referral Information */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-end justify-between gap-8 min-w-0">

        <div className="flex-1 max-w-2xl border-t border-slate-100 pt-6 md:border-none md:pt-0 min-w-0">
          <h3 className="text-[16px] font-bold text-slate-900 mb-6">Referral Information</h3>

          <div className="flex flex-col sm:flex-row gap-6 mb-6">
            <div className="flex flex-col gap-2">
              <p className="text-[13px] font-bold text-slate-700">Your referral code</p>
              <div className="bg-slate-100 rounded-lg px-4 py-3 text-[14px] font-bold text-slate-800 border border-slate-200 break-all">
                {referralResponse?.data?.businessSlug || "CODE2026"}
              </div>
            </div>

            <div className="flex flex-col gap-2 flex-1 max-w-xs md:max-w-none min-w-0">
              <p className="text-[13px] font-bold text-slate-700">Referral link</p>
              <div className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-600 break-all">
                {referralResponse?.data?.digitalCardUrl || (setupResponse?.data?.business?.slug ? `https://${setupResponse.data.business.slug}.quittheapp.com` : "Not set up yet")}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3">
            <button
              onClick={async () => {
                const url = referralResponse?.data?.digitalCardUrl || (setupResponse?.data?.business?.slug ? `https://${setupResponse.data.business.slug}.quittheapp.com` : "");
                if (url) {
                  const success = await copyToClipboard(url);
                  if (success) {
                    showAlert("Success", "Referral link copied to clipboard!", "success");
                  }
                } else {
                  showAlert("Error", "Referral link is not available yet.", "error");
                }
              }}
              className="flex items-center justify-center gap-2 bg-green-100 hover:bg-green-200 text-green-700 px-5 py-2.5 rounded-lg font-bold text-[13px] transition-colors shadow-sm w-full sm:w-auto"
            >
              <Copy className="w-4 h-4" />
              Copy link
            </button>
            <button
              onClick={async () => {
                const url = referralResponse?.data?.digitalCardUrl || (setupResponse?.data?.business?.slug ? `https://${setupResponse.data.business.slug}.quittheapp.com` : "");
                if (url && navigator.share) {
                  navigator.share({
                    title: "Book Direct",
                    url: url
                  });
                } else if (url) {
                  const success = await copyToClipboard(url);
                  if (success) {
                    showAlert("Success", "Referral link copied to clipboard!", "success");
                  }
                } else {
                  showAlert("Error", "Referral link is not available yet.", "error");
                }
              }}
              className="flex items-center justify-center gap-2 bg-green-100 hover:bg-green-200 text-green-700 px-5 py-2.5 rounded-lg font-bold text-[13px] transition-colors shadow-sm w-full sm:w-auto"
            >
              <Share2 className="w-4 h-4" />
              Share link
            </button>
            <button
              onClick={() => {
                const url = referralResponse?.data?.qrCodeUrl;
                if (url) {
                  const link = document.createElement("a");
                  link.href = url;
                  link.download = "qrcode.png";
                  link.click();
                }
              }}
              className="flex items-center justify-center gap-2 bg-green-100 hover:bg-green-200 text-green-700 px-5 py-2.5 rounded-lg font-bold text-[13px] transition-colors shadow-sm w-full sm:w-auto"
            >
              <Download className="w-4 h-4" />
              Download QR Code
            </button>
          </div>
        </div>

        <div className="shrink-0 mx-auto md:mx-0 bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center justify-center">
          {referralResponse?.data?.qrCodeUrl ? (
            <img
              src={referralResponse.data.qrCodeUrl}
              alt="QR Code"
              className="w-[120px] h-[120px] object-contain"
            />
          ) : (
            <svg width="120" height="120" viewBox="0 0 100 100" fill="currentColor" className="text-slate-900">
              <path d="M0,0 h30 v30 h-30 z M10,10 h10 v10 h-10 z" />
              <path d="M70,0 h30 v30 h-30 z M80,10 h10 v10 h-10 z" />
              <path d="M0,70 h30 v30 h-30 z M10,80 h10 v10 h-10 z" />
              <path d="M40,0 h20 v10 h-20 z M40,20 h10 v10 h-10 z" />
              <path d="M0,40 h10 v10 h-10 z M20,40 h20 v10 h-20 z M50,40 h10 v20 h-10 z M70,40 h30 v10 h-30 z" />
              <path d="M10,60 h20 v10 h-20 z M40,60 h10 v30 h-10 z M60,60 h20 v10 h-20 z M90,60 h10 v20 h-10 z" />
              <path d="M70,80 h10 v10 h-10 z M90,90 h10 v10 h-10 z" />
              <path d="M40,90 h20 v10 h-20 z" />
            </svg>
          )}
        </div>
      </div>

      {/* --- MODALS --- */}

      {/* Edit Business Information Modal */}
      {isEditBusinessModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 p-4 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => { if (!isUpdatingBusiness && !isUploadingBusinessLogo) setIsEditBusinessModalOpen(false); }}>
          <form
            onSubmit={handleBusinessSubmit}
            className="relative my-auto flex max-h-[calc(100dvh-2rem)] w-full max-w-3xl flex-col overflow-hidden rounded-3xl bg-white shadow-xl zoom-in-95 animate-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex shrink-0 items-center justify-between border-b border-slate-200 px-6 py-5 sm:px-8">
              <div>
                <h2 className="text-[18px] font-bold text-slate-900">Edit Business Information</h2>
                <p className="mt-1 text-xs text-slate-500">These details appear on your personalized website.</p>
              </div>
              <button
                type="button"
                onClick={() => setIsEditBusinessModalOpen(false)}
                className="inline-flex size-9 items-center justify-center text-slate-400 transition-colors hover:text-slate-600"
                aria-label="Close business information editor"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-6 py-6 sm:px-8">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label htmlFor="editBusinessName" className="text-[13px] font-bold text-slate-700">Business Name</label>
                  <input
                    type="text"
                    id="editBusinessName"
                    value={businessForm.businessName}
                    onChange={(e) => setBusinessForm((prev) => ({ ...prev, businessName: e.target.value }))}
                    maxLength={160}
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-[14px] font-medium text-slate-900 transition-colors focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="editBusinessEmail" className="text-[13px] font-bold text-slate-700">Email Address</label>
                  <input
                    type="email"
                    id="editBusinessEmail"
                    value={businessForm.email}
                    onChange={(e) => setBusinessForm((prev) => ({ ...prev, email: e.target.value }))}
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-[14px] font-medium text-slate-900 transition-colors focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="editBusinessPhone" className="text-[13px] font-bold text-slate-700">Phone Number</label>
                  <input
                    type="tel"
                    id="editBusinessPhone"
                    value={businessForm.phone}
                    onChange={(e) => setBusinessForm((prev) => ({ ...prev, phone: e.target.value }))}
                    maxLength={40}
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-[14px] font-medium text-slate-900 transition-colors focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="editBusinessArea" className="text-[13px] font-bold text-slate-700">Business Area</label>
                  <input
                    type="text"
                    id="editBusinessArea"
                    value={businessForm.cityArea}
                    onChange={(e) => setBusinessForm((prev) => ({ ...prev, cityArea: e.target.value }))}
                    maxLength={160}
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-[14px] font-medium text-slate-900 transition-colors focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                  />
                </div>

                <div className="flex flex-col gap-2 sm:col-span-2">
                  <label htmlFor="editBusinessInfo" className="text-[13px] font-bold text-slate-700">Business Description</label>
                  <textarea
                    id="editBusinessInfo"
                    value={businessForm.businessInfo}
                    onChange={(e) => setBusinessForm((prev) => ({ ...prev, businessInfo: e.target.value }))}
                    maxLength={2000}
                    rows={4}
                    required
                    className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-[14px] font-medium leading-relaxed text-slate-900 transition-colors focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                  />
                </div>

                <div className="flex flex-col gap-2 sm:col-span-2">
                  <label htmlFor="editBusinessLogoUrl" className="text-[13px] font-bold text-slate-700">Logo URL</label>
                  <input
                    type="url"
                    id="editBusinessLogoUrl"
                    value={businessForm.logoUrl}
                    onChange={(e) => {
                      setBusinessLogoFile(null);
                      setBusinessForm((prev) => ({ ...prev, logoUrl: e.target.value }));
                    }}
                    placeholder="https://example.com/logo.png"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-[14px] font-medium text-slate-900 transition-colors focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                  />
                </div>

                <div className="flex flex-col gap-3 sm:col-span-2">
                  <input
                    type="file"
                    ref={businessLogoInputRef}
                    onChange={handleBusinessLogoChange}
                    accept="image/png, image/jpeg, image/webp"
                    className="hidden"
                  />
                  <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center">
                    <img
                      src={businessForm.logoUrl || setupResponse?.data?.business?.logoUrl || carCover}
                      alt="Current business logo"
                      className="size-16 rounded-lg border border-slate-200 bg-white object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-slate-800">
                        {businessLogoFile?.name || "Current business logo"}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">PNG, JPG, or WEBP, up to 5 MB</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => businessLogoInputRef.current?.click()}
                      className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-lg bg-green-100 px-4 text-sm font-bold text-green-700 transition-colors hover:bg-green-200"
                    >
                      <ImagePlus className="size-4" />
                      Choose Logo
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex shrink-0 justify-end gap-3 border-t border-slate-200 px-6 py-4 sm:px-8">
              <button
                type="button"
                onClick={() => setIsEditBusinessModalOpen(false)}
                disabled={isUpdatingBusiness || isUploadingBusinessLogo}
                className="h-10 rounded-lg border border-slate-200 px-5 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-50 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isUpdatingBusiness || isUploadingBusinessLogo}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#22c55e] px-5 text-sm font-bold text-white transition-colors hover:bg-[#1ea951] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {(isUpdatingBusiness || isUploadingBusinessLogo) && <Loader2 className="size-4 animate-spin" />}
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Upload Image Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => !isUploadingAvatar && setIsUploadModalOpen(false)}>
          <div className="bg-white rounded-3xl w-full max-w-[500px] shadow-xl p-8 relative zoom-in-95 animate-in duration-200" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setIsUploadModalOpen(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-[18px] font-bold text-slate-900 mb-8">Update Profile Image</h2>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleAvatarChange}
              accept="image/png, image/jpeg, image/webp"
              className="hidden"
            />

            <div className="flex flex-col items-center justify-center mb-8">
              <div
                onClick={() => fileInputRef.current?.click()}
                className="w-32 h-32 rounded-full border-2 border-dashed border-slate-300 bg-slate-50 flex items-center justify-center relative mb-4 cursor-pointer hover:bg-slate-100 transition-colors"
              >
                {isUploadingAvatar ? (
                  <Loader2 className="w-8 h-8 text-green-500 animate-spin" />
                ) : (
                  <>
                    <img
                      src={user?.avatarUrl || eleanorAvatar}
                      alt="Current Avatar"
                      className="w-full h-full rounded-full object-cover"
                    />
                    <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center shadow-sm border-4 border-white">
                      <ImagePlus className="w-5 h-5" />
                    </div>
                  </>
                )}
              </div>
              <p className="text-[12px] text-slate-500">Upload PNG, JPG, WEBP format (Max 5MB)</p>
            </div>

            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploadingAvatar}
                className="bg-[#22c55e] hover:bg-[#1ea951] text-white px-8 py-3 rounded-xl font-bold text-[14px] transition-colors shadow-sm disabled:opacity-50"
              >
                Select Image File
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Information Modal */}
      {isEditInfoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => !isUpdatingProfile && setIsEditInfoModalOpen(false)}>
          <form
            onSubmit={handleProfileSubmit}
            className="bg-white rounded-3xl w-full max-w-[500px] shadow-xl p-8 relative zoom-in-95 animate-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsEditInfoModalOpen(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-[18px] font-bold text-slate-900 mb-6">Edit Personal Information</h2>

            <div className="flex flex-col gap-5 mb-8">
              <div className="flex flex-col gap-2">
                <label htmlFor="editName" className="text-[13px] font-bold text-slate-700">Full Name</label>
                <input
                  type="text"
                  id="editName"
                  value={profileForm.name}
                  onChange={(e) => setProfileForm(prev => ({ ...prev, name: e.target.value }))}
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-[14px] font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-colors"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="editPhone" className="text-[13px] font-bold text-slate-700">Phone Number</label>
                <input
                  type="tel"
                  id="editPhone"
                  value={profileForm.phone}
                  onChange={(e) => setProfileForm(prev => ({ ...prev, phone: e.target.value }))}
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-[14px] font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-colors"
                />
              </div>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isUpdatingProfile}
                className="bg-[#22c55e] hover:bg-[#1ea951] text-white px-8 py-3 rounded-xl font-bold text-[14px] transition-colors shadow-sm disabled:opacity-50 flex items-center gap-2"
              >
                {isUpdatingProfile && <Loader2 className="w-4 h-4 animate-spin" />}
                Update Information
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Edit Password Modal */}
      {isEditPasswordModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => { if (!isChangingPassword) { setIsEditPasswordModalOpen(false); setPasswordError(null); } }}>
          <form
            onSubmit={handlePasswordSubmit}
            className="bg-white rounded-3xl w-full max-w-[500px] shadow-xl p-8 relative zoom-in-95 animate-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => {
                setIsEditPasswordModalOpen(false);
                setPasswordError(null);
              }}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-[18px] font-bold text-slate-900 mb-6">Edit Password</h2>

            {passwordError && (
              <div className="mb-4 text-xs font-bold text-red-500 bg-red-50 border border-red-200 p-3 rounded-xl">
                {passwordError}
              </div>
            )}

            <div className="flex flex-col gap-6 mb-8">
              <div className="flex flex-col gap-2">
                <label htmlFor="currentPassword" className="text-[13px] font-bold text-slate-700">Current Password</label>
                <div className="relative">
                  <input
                    type={showPasswordModal ? "text" : "password"}
                    id="currentPassword"
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                    required
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 pr-10 text-[14px] font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-colors"
                  />
                  <button type="button" onClick={() => setShowPasswordModal(!showPasswordModal)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                    {showPasswordModal ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="newPassword" className="text-[13px] font-bold text-slate-700">New Password</label>
                <div className="relative">
                  <input
                    type={showPasswordModal ? "text" : "password"}
                    id="newPassword"
                    value={passwordForm.password}
                    onChange={(e) => setPasswordForm(prev => ({ ...prev, password: e.target.value }))}
                    required
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 pr-10 text-[14px] font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-colors"
                  />
                  <button type="button" onClick={() => setShowPasswordModal(!showPasswordModal)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                    {showPasswordModal ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="confirmPassword" className="text-[13px] font-bold text-slate-700">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showPasswordModal ? "text" : "password"}
                    id="confirmPassword"
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    required
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 pr-10 text-[14px] font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-colors"
                  />
                  <button type="button" onClick={() => setShowPasswordModal(!showPasswordModal)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                    {showPasswordModal ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-start">
              <button
                type="submit"
                disabled={isChangingPassword}
                className="bg-[#22c55e] hover:bg-[#1ea951] text-white px-8 py-3 rounded-xl font-bold text-[14px] transition-colors shadow-sm disabled:opacity-50 flex items-center gap-2"
              >
                {isChangingPassword && <Loader2 className="w-4 h-4 animate-spin" />}
                Update Password
              </button>
            </div>
          </form>
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
