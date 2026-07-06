import { Navigate, Route, Routes } from "react-router-dom";

import { RequireOnboarding, RequirePurchase } from "./RouteGuards";

import ComingSoonPage from "../pages/ComingSoonPage";
import DashboardPage from "../pages/DashboardPage";
import FunnelPage from "../pages/FunnelPage";
import NotFoundPage from "../pages/NotFoundPage";
import OnboardingPage from "../pages/OnboardingPage";
import PersonalizedDriverPage from "../pages/PersonalizedDriverPage";
// import SuperAdminDashboardPage from "../pages/SuperAdminDashboardPage";

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/women" replace />} />
      <Route path="/standard" element={<ComingSoonPage audience="standard" />} />
      <Route path="/women" element={<FunnelPage />} />
      <Route path="/couple" element={<ComingSoonPage audience="couple" />} />
      <Route path="/couples" element={<Navigate to="/couple" replace />} />
      <Route path="/seniors" element={<ComingSoonPage audience="seniors" />} />
      <Route element={<RequirePurchase />}>
        <Route path="/onboarding" element={<OnboardingPage />} />
      </Route>
      <Route element={<RequireOnboarding />}>
        <Route path="/dashboard" element={<DashboardPage />} />
      </Route>
      <Route path="/site/:username" element={<PersonalizedDriverPage />} />
      {/* <Route path="/admin" element={<SuperAdminDashboardPage />} /> */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
