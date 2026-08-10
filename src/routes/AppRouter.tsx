import HomePage from '../pages/HomePage';
import SpanishPage from '../pages/SpanishPage';
import { Route, Routes } from "react-router-dom";
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
import AdminDashboardPage from "../pages/AdminDashboardPage";
import AdminDriversPage from "../pages/AdminDriversPage";
import AdminDriverDetailsPage from "../pages/AdminDriverDetailsPage";
import AdminResourcesPage from "../pages/AdminResourcesPage";
import AdminAddResourcePage from "../pages/AdminAddResourcePage";
import AdminBillingsPage from "../pages/AdminBillingsPage";
import AdminSupportPage from "../pages/AdminSupportPage";
import AdminSettingsPage from "../pages/AdminSettingsPage";
import LoginPage from "../pages/Auth/LoginPage";
import SignupPage from "../pages/Auth/SignupPage";
import ForgotPasswordPage from "../pages/Auth/ForgotPasswordPage";
import ResetPasswordPage from "../pages/Auth/ResetPasswordPage";
import PaymentSuccessPage from "../pages/PaymentSuccessPage";
import RiderWebsitePage from "../pages/PersonalizeWebsite/RiderWebsitePage";

export function AppRouter() {
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
      <Route path="/admin" element={<AdminDashboardLayout><AdminDashboardPage /></AdminDashboardLayout>} />
      <Route path="/admin/drivers" element={<AdminDashboardLayout title="Driver Management"><AdminDriversPage /></AdminDashboardLayout>} />
      <Route path="/admin/drivers/:id" element={<AdminDashboardLayout title="Driver Management"><AdminDriverDetailsPage /></AdminDashboardLayout>} />
      <Route path="/admin/resources" element={<AdminDashboardLayout title="Resource Management"><AdminResourcesPage /></AdminDashboardLayout>} />
      <Route path="/admin/resources/add" element={<AdminDashboardLayout title="Resource Management"><AdminAddResourcePage /></AdminDashboardLayout>} />
      <Route path="/admin/billings" element={<AdminDashboardLayout title="Billing"><AdminBillingsPage /></AdminDashboardLayout>} />
      <Route path="/admin/support" element={<AdminDashboardLayout title="Support"><AdminSupportPage /></AdminDashboardLayout>} />
      <Route path="/admin/settings" element={<AdminDashboardLayout title="Settings"><AdminSettingsPage /></AdminDashboardLayout>} />

      {/* Add new routes here */}
      <Route path="/book/:slug" element={<RiderWebsitePage />} />
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
