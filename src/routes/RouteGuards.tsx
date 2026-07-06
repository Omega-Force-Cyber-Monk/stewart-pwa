import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAppSelector } from "../app/hooks";
import { getDriverSitePath } from "../lib/driverSite";

export function RequirePurchase() {
  const location = useLocation();
  const hasPurchased = useAppSelector((state) => state.appFlow.hasPurchased);
  const onboardingCompleted = useAppSelector(
    (state) => state.appFlow.onboardingCompleted,
  );
  const approvalStatus = useAppSelector(
    (state) => state.appFlow.approvalStatus || "not_submitted",
  );
  const driverProfile = useAppSelector((state) => state.appFlow.driverProfile);

  if (!hasPurchased) {
    return <Navigate to="/women" replace state={{ from: location }} />;
  }

  if (onboardingCompleted && approvalStatus === "approved") {
    return <Navigate to={getDriverSitePath(driverProfile)} replace />;
  }

  if (onboardingCompleted) {
    return <Navigate to="/approval" replace />;
  }

  return <Outlet />;
}

export function RequireOnboarding() {
  const location = useLocation();
  const onboardingCompleted = useAppSelector(
    (state) => state.appFlow.onboardingCompleted,
  );

  if (!onboardingCompleted) {
    return <Navigate to="/onboarding" replace state={{ from: location }} />;
  }

  return <Outlet />;
}

export function RequireApproval() {
  const location = useLocation();
  const onboardingCompleted = useAppSelector(
    (state) => state.appFlow.onboardingCompleted,
  );
  const approvalStatus = useAppSelector(
    (state) => state.appFlow.approvalStatus || "not_submitted",
  );

  if (!onboardingCompleted) {
    return <Navigate to="/onboarding" replace state={{ from: location }} />;
  }

  if (approvalStatus !== "approved") {
    return <Navigate to="/approval" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
