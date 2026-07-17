import { Route, Routes } from "react-router-dom";
import WomenPage from "../pages/WomenPage";
import CouplePage from "../pages/CouplePage";

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<WomenPage />} />
      <Route path="/couple" element={<CouplePage />} />
      {/* Add new routes here */}
    </Routes>
  );
}
