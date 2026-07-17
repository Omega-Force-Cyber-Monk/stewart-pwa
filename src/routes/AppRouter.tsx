import { Route, Routes } from "react-router-dom";
import WomenPage from "../pages/WomenPage";

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<WomenPage />} />
      {/* Add new routes here */}
    </Routes>
  );
}
