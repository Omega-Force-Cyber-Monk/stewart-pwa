import HomePage from '../pages/HomePage';
import SpanishPage from '../pages/SpanishPage';
import { Route, Routes } from "react-router-dom";
import WomenPage from "../pages/WomenPage";
import CouplePage from "../pages/CouplePage";
import SeniorPage from "../pages/SeniorPage";

export function AppRouter() {
  return (
    <Routes>
      <Route path="/women" element={<WomenPage />} />
      <Route path="/couple" element={<CouplePage />} />
      <Route path="/senior" element={<SeniorPage />} />
      {/* Add new routes here */}      <Route path="/spanish" element={<SpanishPage />} />      <Route path="/" element={<HomePage />} />


    </Routes>
  );
}
