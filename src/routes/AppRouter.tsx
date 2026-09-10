import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import HomePage from "../pages/HomePage";
import SpanishPage from "../pages/SpanishPage";
import WomenPage from "../pages/WomenPage";
import CouplePage from "../pages/CouplePage";
import SeniorPage from "../pages/SeniorPage";
import LaunchDashboardPage from "../pages/LaunchDashboardPage";
import BookingReferralCardPage from "../pages/BookingReferralCardPage";
import SellingPage from "../pages/SellingPage";
import ResourcesAndGuidesPage from "../pages/ResourcesAndGuidesPage";
import ProfileSettingsPage from "../pages/ProfileSettingsPage";
import PaymentBillingPage from "../pages/PaymentBillingPage";
import SupportPage from "../pages/SupportPage";
import DashboardPage from "../pages/DashboardPage";
import { DashboardLayout } from "../components/layout/DashboardLayout";
import { AdminDashboardLayout } from "../components/layout/AdminDashboardLayout";
import { useRequireAdmin } from "../hooks/useRequireAdmin";
import AdminDashboardPage from "../pages/AdminDashboardPage";
import AdminLeadsPage from "../pages/AdminLeadsPage";
import AdminDriversPage from "../pages/AdminDriversPage";
import AdminDriverDetailsPage from "../pages/AdminDriverDetailsPage";
import AdminResourcesUploadPage from "../pages/AdminResourcesUploadPage";
import AdminBillingsPage from "../pages/AdminBillingsPage";
import AdminSupportPage from "../pages/AdminSupportPage";
import AdminSettingsPage from "../pages/AdminSettingsPage";
import LoginPage from "../pages/Auth/LoginPage";
import SignupPage from "../pages/Auth/SignupPage";
import ForgotPasswordPage from "../pages/Auth/ForgotPasswordPage";
import ResetPasswordPage from "../pages/Auth/ResetPasswordPage";
import PaymentSuccessPage from "../pages/PaymentSuccessPage";
import NotFoundPage from "../pages/NotFoundPage";
import RiderWebsitePage from "../pages/PersonalizeWebsite/RiderWebsitePage";
import { resolveBusinessHost } from "../lib/businessHost";
import { useAppDispatch, useAppSelector } from "../hooks/storeHooks";
import { useGetRiderProfileQuery } from "../store/api/Auth/auth.api";
import { useGetRiderDashboardQuery } from "../store/api/Business/business.api";
import { updateUser } from "../store/features/auth/authSlice";
import { LoadingScreen } from "../components/ui/LoadingScreen";

const publicBusinessDomain =
  import.meta.env.VITE_PUBLIC_BUSINESS_DOMAIN || "quittheapp.com";

export function AppRouter() {
  const businessHost = resolveBusinessHost(
    window.location.hostname,
    publicBusinessDomain,
  );

  if (businessHost.kind !== "main") {
    const slug = businessHost.kind === "tenant" ? businessHost.slug : undefined;

    return (
      <Routes>
        <Route path="/" element={<RiderWebsitePage slug={slug} />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/women" element={<WomenPage />} />
      <Route path="/couple" element={<CouplePage />} />
      <Route path="/senior" element={<SeniorPage />} />

      <Route path="/dashboard" element={<RiderRoute><DashboardLayout><DashboardPage /></DashboardLayout></RiderRoute>} />
      <Route path="/booking-referral-card" element={<RiderRoute><DashboardLayout title="Booking & Referral Card"><BookingReferralCardPage /></DashboardLayout></RiderRoute>} />
      <Route path="/selling-page" element={<RiderRoute><DashboardLayout title="Selling Page"><SellingPage /></DashboardLayout></RiderRoute>} />
      <Route path="/resources-guide" element={<RiderRoute><DashboardLayout title="Resources & Guide"><ResourcesAndGuidesPage /></DashboardLayout></RiderRoute>} />
      <Route path="/support" element={<RiderRoute><DashboardLayout title="Support"><SupportPage /></DashboardLayout></RiderRoute>} />
      <Route path="/payment-billing" element={<RiderRoute><DashboardLayout title="Payment & Billing"><PaymentBillingPage /></DashboardLayout></RiderRoute>} />
      <Route path="/profile-settings" element={<RiderRoute><DashboardLayout title="Profile & Settings"><ProfileSettingsPage /></DashboardLayout></RiderRoute>} />
      <Route path="/launch-dashboard" element={<RiderRoute><DashboardLayout title="Launch Setup Form"><LaunchDashboardPage /></DashboardLayout></RiderRoute>} />

      {/* Legacy rider paths intentionally redirect to the redesigned destinations. */}
      <Route path="/booking-system" element={<Navigate to="/booking-referral-card" replace />} />
      <Route path="/referral-card" element={<Navigate to="/booking-referral-card" replace />} />
      <Route path="/resources" element={<Navigate to="/resources-guide" replace />} />
      <Route path="/billing" element={<Navigate to="/payment-billing" replace />} />
      <Route path="/profile" element={<Navigate to="/profile-settings" replace />} />
      <Route path="/repeat-rider" element={<Navigate to="/dashboard" replace />} />
      <Route path="/acquisition" element={<Navigate to="/dashboard" replace />} />
      <Route path="/trust" element={<Navigate to="/dashboard" replace />} />
      <Route path="/essentials" element={<Navigate to="/dashboard" replace />} />

      {/* Admin routes */}
      <Route path="/admin" element={<AdminRoute><AdminDashboardLayout><AdminDashboardPage /></AdminDashboardLayout></AdminRoute>} />
      <Route path="/admin/leads" element={<AdminRoute><AdminDashboardLayout title="Lead Submissions"><AdminLeadsPage /></AdminDashboardLayout></AdminRoute>} />
      <Route path="/admin/drivers" element={<AdminRoute><AdminDashboardLayout title="Drivers Management"><AdminDriversPage /></AdminDashboardLayout></AdminRoute>} />
      <Route path="/admin/drivers/:id" element={<AdminRoute><AdminDashboardLayout title="Drivers Management"><AdminDriverDetailsPage /></AdminDashboardLayout></AdminRoute>} />
      <Route path="/admin/resources-upload" element={<AdminRoute><AdminDashboardLayout title="Resources Upload"><AdminResourcesUploadPage /></AdminDashboardLayout></AdminRoute>} />
      <Route path="/admin/billings" element={<AdminRoute><AdminDashboardLayout title="Billings"><AdminBillingsPage /></AdminDashboardLayout></AdminRoute>} />
      <Route path="/admin/support" element={<AdminRoute><AdminDashboardLayout title="Support"><AdminSupportPage /></AdminDashboardLayout></AdminRoute>} />
      <Route path="/admin/settings" element={<AdminRoute><AdminDashboardLayout title="Settings"><AdminSettingsPage /></AdminDashboardLayout></AdminRoute>} />

      {/* Legacy admin paths redirect to the consolidated destinations. */}
      <Route path="/admin/drivers/:id/dashboard" element={<Navigate to=".." relative="path" replace />} />
      <Route path="/admin/resources" element={<Navigate to="/admin/resources-upload" replace />} />
      <Route path="/admin/resources/add" element={<Navigate to="/admin/resources-upload" replace />} />
      <Route path="/admin/resources/edit/:id" element={<Navigate to="/admin/resources-upload" replace />} />
      <Route path="/admin/users" element={<Navigate to="/admin/drivers" replace />} />
      <Route path="/admin/checklist-items" element={<Navigate to="/admin" replace />} />

      <Route path="/payment/success" element={<PaymentSuccessPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/spanish" element={<SpanishPage />} />
      <Route path="/settings" element={<SettingsRoute />} />
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

function AdminRoute({ children }: { children: React.ReactNode }) {
  const isAdmin = useRequireAdmin();
  if (!isAdmin) return null;
  return <>{children}</>;
}

function SettingsRoute() {
  const { accessToken, user } = useAppSelector((state) => state.auth);

  if (!accessToken) {
    return <Navigate to="/login?redirect=%2Fsettings" replace />;
  }

  return <Navigate to={user?.role === "admin" ? "/admin/settings" : "/profile-settings"} replace />;
}

function RiderRoute({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { accessToken, user } = useAppSelector((state) => state.auth);
  const isLaunchRoute = location.pathname === "/launch-dashboard";
  const profile = useGetRiderProfileQuery(undefined, {
    skip: !accessToken,
  });
  const dashboard = useGetRiderDashboardQuery(undefined, {
    skip: !accessToken || user?.role === "admin" || user?.isVerified === false,
  });
  const effectiveUser = profile.data?.user ?? user;

  useEffect(() => {
    if (profile.data?.user) {
      dispatch(updateUser(profile.data.user));
    }
  }, [dispatch, profile.data?.user]);

  if (!accessToken) {
    const redirect = encodeURIComponent(`${location.pathname}${location.search}`);
    return <Navigate to={`/login?redirect=${redirect}`} replace />;
  }

  if (effectiveUser?.role === "admin") {
    return <Navigate to="/admin" replace />;
  }

  if (effectiveUser?.isVerified === false) {
    const email = effectiveUser.email ? `&email=${encodeURIComponent(effectiveUser.email)}` : "";
    return <Navigate to={`/signup?step=verify-otp${email}`} replace />;
  }

  if (profile.isLoading || dashboard.isLoading) {
    return <LoadingScreen />;
  }

  if (profile.error || dashboard.error) {
    return <Navigate to="/login" replace />;
  }

  const purchase = dashboard.data?.purchase ?? profile.data?.purchase;
  if (!purchase?.baseVariant) {
    return <Navigate to="/?showPricing=true" replace />;
  }

  const businessStatus = dashboard.data?.business?.status ?? profile.data?.business?.status;
  const onboardingComplete =
    dashboard.data?.launchReady === true ||
    dashboard.data?.setupProgress?.completed === true ||
    businessStatus === "ACTIVE";

  if (!onboardingComplete && !isLaunchRoute) {
    return <Navigate to="/launch-dashboard" replace />;
  }

  if (onboardingComplete && isLaunchRoute) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}
