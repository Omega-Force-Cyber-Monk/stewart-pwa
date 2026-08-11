import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "./storeHooks";

/**
 * Guards admin routes: redirects to the marketing home when the user is not
 * signed in as an admin. Backend still enforces authorization; this is UX only.
 */
export function useRequireAdmin() {
  const { accessToken, user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const isAdmin = !!accessToken && user?.role === "admin";

  useEffect(() => {
    if (!isAdmin) {
      navigate("/", { replace: true });
    }
  }, [isAdmin, navigate]);

  return isAdmin;
}
