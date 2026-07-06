import { Navigate, Route, Routes } from "react-router-dom";

import { RequireApproval, RequireOnboarding, RequirePurchase } from "./RouteGuards";

import ApprovalPendingPage from "../pages/ApprovalPendingPage";
import ComingSoonPage from "../pages/ComingSoonPage";
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
        <Route path="/approval" element={<ApprovalPendingPage />} />
      </Route>
      <Route element={<RequireApproval />}>
        <Route path="/site/:username" element={<PersonalizedDriverPage />} />
      </Route>
      {/* <Route path="/admin" element={<SuperAdminDashboardPage />} /> */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
