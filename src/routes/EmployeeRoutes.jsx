import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

// ================= HOME =================
import Home from "../pages/Home/Home";

// ================= EMPLOYEE ROUTES =================
import EmployeeRoutes from "./EmployeeRoutes";

// ================= COMPANY ROUTES =================
import CompanyRoutes from "./CompanyRoutes";

const AppRoutes = () => {
  return (
    <BrowserRouter>

      <Routes>

        {/* ================= HOME ================= */}

        <Route
          path="/"
          element={<Home />}
        />

        {/* ================= EMPLOYEE ROUTES ================= */}

        <Route
          path="*"
          element={<EmployeeRoutes />}
        />

        {/* ================= COMPANY ROUTES ================= */}

        <Route
          path="*"
          element={<CompanyRoutes />}
        />

      </Routes>

    </BrowserRouter>
  );
};

export default AppRoutes;