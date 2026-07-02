import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAppSelector } from "../app/hooks";

export function RequirePurchase() {
  const location = useLocation();
  const hasPurchased = useAppSelector((state) => state.appFlow.hasPurchased);

  if (!hasPurchased) {
    return <Navigate to="/standard" replace state={{ from: location }} />;
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
