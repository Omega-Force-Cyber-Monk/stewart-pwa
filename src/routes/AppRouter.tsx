import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import SpanishPage from "../pages/SpanishPage";
import WomenPage from "../pages/WomenPage";
import CouplePage from "../pages/CouplePage";
import SeniorPage from "../pages/SeniorPage";
import LaunchDashboardPage from "../pages/LaunchDashboardPage";
import BookingReferralCardPage from "../pages/BookingReferralCardPage";
import SellingPage from "../pages/SellingPage";
import ResourcesAndGuidesPage from "../pages/ResourcesAndGuidesPage";
import ProfilePage from "../pages/ProfilePage";
import BillingPage from "../pages/BillingPage";
import DashboardPage from "../pages/DashboardPage";
import { DashboardLayout } from "../components/layout/DashboardLayout";
import { AdminDashboardLayout } from "../components/layout/AdminDashboardLayout";
import { useRequireAdmin } from "../hooks/useRequireAdmin";
import AdminDashboardPage from "../pages/AdminDashboardPage";
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
import RiderWebsitePage from "../pages/PersonalizeWebsite/RiderWebsitePage";
import { resolveBusinessHost } from "../lib/businessHost";

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
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/women" element={<WomenPage />} />
      <Route path="/couple" element={<CouplePage />} />
      <Route path="/senior" element={<SeniorPage />} />

      <Route path="/dashboard" element={<DashboardLayout><DashboardPage /></DashboardLayout>} />
      <Route path="/booking-referral-card" element={<DashboardLayout title="Booking & Referral Card"><BookingReferralCardPage /></DashboardLayout>} />
      <Route path="/selling-page" element={<DashboardLayout title="Selling Page"><SellingPage /></DashboardLayout>} />
      <Route path="/resources-guide" element={<DashboardLayout title="Resources & Guide"><ResourcesAndGuidesPage /></DashboardLayout>} />
      <Route path="/payment-billing" element={<DashboardLayout title="Payment & Billing"><BillingPage /></DashboardLayout>} />
      <Route path="/profile-settings" element={<DashboardLayout title="Profile & Settings"><ProfilePage /></DashboardLayout>} />
      <Route path="/launch-dashboard" element={<DashboardLayout title="Launch Setup Form"><LaunchDashboardPage /></DashboardLayout>} />

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
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

function AdminRoute({ children }: { children: React.ReactNode }) {
  const isAdmin = useRequireAdmin();
  if (!isAdmin) return null;
  return <>{children}</>;
}
