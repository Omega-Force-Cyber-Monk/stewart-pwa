import { Navigate, Route, Routes } from "react-router-dom";

import { RequireOnboarding, RequirePurchase } from "./RouteGuards";

import DashboardPage from "../pages/DashboardPage";
import FunnelPage from "../pages/FunnelPage";
import NotFoundPage from "../pages/NotFoundPage";
import OnboardingPage from "../pages/OnboardingPage";

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/standard" replace />} />
      <Route path="/standard" element={<FunnelPage />} />
      <Route path="/women" element={<FunnelPage />} />
      <Route path="/seniors" element={<FunnelPage />} />
      <Route path="/couples" element={<FunnelPage />} />
      <Route element={<RequirePurchase />}>
        <Route path="/onboarding" element={<OnboardingPage />} />
      </Route>
      <Route element={<RequireOnboarding />}>
        <Route path="/dashboard" element={<DashboardPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
