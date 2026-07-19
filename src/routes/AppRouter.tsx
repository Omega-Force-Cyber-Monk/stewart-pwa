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
import DashboardPage from "../pages/DashboardPage";
import { DashboardLayout } from "../components/layout/DashboardLayout";

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
      {/* Add new routes here */}      <Route path="/spanish" element={<SpanishPage />} />      <Route path="/" element={<HomePage />} />


    </Routes>
  );
}
