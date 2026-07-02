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
      <Route path="/standard" element={<FunnelPage funnel="standard" />} />
      <Route path="/women" element={<FunnelPage funnel="women" />} />
      <Route path="/seniors" element={<FunnelPage funnel="seniors" />} />
      <Route path="/couples" element={<FunnelPage funnel="couples" />} />
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
