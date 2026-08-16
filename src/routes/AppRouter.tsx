import HomePage from '../pages/HomePage';
import SpanishPage from '../pages/SpanishPage';
import { Navigate, Route, Routes } from "react-router-dom";
import WomenPage from "../pages/WomenPage";
import CouplePage from "../pages/CouplePage";
import SeniorPage from "../pages/SeniorPage";
import LaunchDashboardPage from "../pages/LaunchDashboardPage";
import BookingSystemPage from "../pages/BookingSystemPage";
import ReferralCardPage from "../pages/ReferralCardPage";
import RepeatRiderPage from "../pages/RepeatRiderPage";
import CustomerAcquisitionPage from "../pages/CustomerAcquisitionPage";
import DirectBookingTrustPage from "../pages/DirectBookingTrustPage";
import LaunchEssentialsPage from "../pages/LaunchEssentialsPage";
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
import AdminResourcesPage from "../pages/AdminResourcesPage";
import AdminAddResourcePage from "../pages/AdminAddResourcePage";
import AdminEditResourcePage from "../pages/AdminEditResourcePage";
import AdminBillingsPage from "../pages/AdminBillingsPage";
import AdminSupportPage from "../pages/AdminSupportPage";
import AdminSettingsPage from "../pages/AdminSettingsPage";
import AdminUsersPage from "../pages/AdminUsersPage";
import AdminChecklistItemsPage from "../pages/AdminChecklistItemsPage";
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
      <Route path="/launch-dashboard" element={<DashboardLayout title="Launch Setup Form"><LaunchDashboardPage /></DashboardLayout>} />
      <Route path="/booking-system" element={<DashboardLayout title="Booking System™"><BookingSystemPage /></DashboardLayout>} />
      <Route path="/referral-card" element={<DashboardLayout title="Referral Card System™"><ReferralCardPage /></DashboardLayout>} />
      <Route path="/repeat-rider" element={<DashboardLayout title="Repeat Rider Follow Up System™"><RepeatRiderPage /></DashboardLayout>} />
      <Route path="/acquisition" element={<DashboardLayout title="Client Acquisition Center™"><CustomerAcquisitionPage /></DashboardLayout>} />
      <Route path="/trust" element={<DashboardLayout title="Direct Booking Trust Center™"><DirectBookingTrustPage /></DashboardLayout>} />
      <Route path="/essentials" element={<DashboardLayout title="Launch Essentials™"><LaunchEssentialsPage /></DashboardLayout>} />
      <Route path="/selling-page" element={<DashboardLayout title="Personalized Selling Page™"><SellingPage /></DashboardLayout>} />
      <Route path="/resources" element={<DashboardLayout title="Resources & Guides"><ResourcesAndGuidesPage /></DashboardLayout>} />
      <Route path="/profile" element={<DashboardLayout title="My Profile"><ProfilePage /></DashboardLayout>} />
      <Route path="/billing" element={<DashboardLayout title="Billing & Orders"><BillingPage /></DashboardLayout>} />

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminRoute><AdminDashboardLayout><AdminDashboardPage /></AdminDashboardLayout></AdminRoute>} />
      <Route path="/admin/drivers" element={<AdminRoute><AdminDashboardLayout title="Driver Management"><AdminDriversPage /></AdminDashboardLayout></AdminRoute>} />
      <Route path="/admin/drivers/:id" element={<AdminRoute><AdminDashboardLayout title="Driver Management"><AdminDriverDetailsPage /></AdminDashboardLayout></AdminRoute>} />
      <Route path="/admin/resources" element={<AdminRoute><AdminDashboardLayout title="Resource Management"><AdminResourcesPage /></AdminDashboardLayout></AdminRoute>} />
      <Route path="/admin/resources/add" element={<AdminRoute><AdminDashboardLayout title="Resource Management"><AdminAddResourcePage /></AdminDashboardLayout></AdminRoute>} />
      <Route path="/admin/resources/edit/:id" element={<AdminRoute><AdminDashboardLayout title="Resource Management"><AdminEditResourcePage /></AdminDashboardLayout></AdminRoute>} />
      <Route path="/admin/billings" element={<AdminRoute><AdminDashboardLayout title="Billing"><AdminBillingsPage /></AdminDashboardLayout></AdminRoute>} />
      <Route path="/admin/support" element={<AdminRoute><AdminDashboardLayout title="Support"><AdminSupportPage /></AdminDashboardLayout></AdminRoute>} />
      <Route path="/admin/settings" element={<AdminRoute><AdminDashboardLayout title="Settings"><AdminSettingsPage /></AdminDashboardLayout></AdminRoute>} />
      <Route path="/admin/users" element={<AdminRoute><AdminDashboardLayout title="User Management"><AdminUsersPage /></AdminDashboardLayout></AdminRoute>} />
      <Route path="/admin/checklist-items" element={<AdminRoute><AdminDashboardLayout title="Checklist Items"><AdminChecklistItemsPage /></AdminDashboardLayout></AdminRoute>} />

      {/* Add new routes here */}
      <Route path="/payment/success" element={<PaymentSuccessPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/spanish" element={<SpanishPage />} />
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
}

function AdminRoute({ children }: { children: React.ReactNode }) {
  const isAdmin = useRequireAdmin();
  if (!isAdmin) return null;
  return <>{children}</>;
}
