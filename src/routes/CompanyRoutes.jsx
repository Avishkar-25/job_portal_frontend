import React from "react";
import { Routes, Route } from "react-router-dom";

// ================= COMPANY AUTH =================
import CompanyRegister from "../pages/company/auth/CompanyRegister";
import CompanyLogin from "../pages/company/auth/CompanyLogin";
import CompanyForgotPassword from "../pages/company/ForgotPassword";

// ================= COMPANY LAYOUT =================
import CompanyLayout from "../pages/company/CompanyLayout";

// ================= COMPANY PAGES =================
import CompanyDashboard from "../pages/company/Dashboard";
import PostJob from "../pages/company/managejob/PostJob";
import ManageJobs from "../pages/company/ManageJobs";
import Applicants from "../pages/company/Applicants";
import CompanyProfile from "../pages/company/CompanyProfile";
import Analytics from "../pages/company/Analytics";
import Setting from "../pages/company/Setting";
import EditJobs from "../pages/company/managejob/EditJobs";
import EmployeeProfile from "../pages/company/EmployeeProfile";

const CompanyRoutes = () => {
  return (
    <Routes>

      {/* ================= COMPANY AUTH ================= */}

      <Route
        path="/company/register"
        element={<CompanyRegister />}
      />

      <Route
        path="/company/login"
        element={<CompanyLogin />}
      />

      <Route
        path="/company/forgot-password"
        element={<CompanyForgotPassword />}
      />


      {/* ================= COMPANY PANEL ================= */}

      <Route
        path="/company"
        element={<CompanyLayout />}
      >

        {/* Dashboard */}
        <Route
          path="dashboard"
          element={<CompanyDashboard />}
        />

        {/* Post Job */}
        <Route
          path="post-job"
          element={<PostJob />}
        />

        {/* Manage Jobs */}
        <Route
          path="manage-jobs"
          element={<ManageJobs />}
        />

        {/* Applicants */}
        <Route
          path="applicants"
          element={<Applicants />}
        />

        {/* Analytics */}
        <Route
          path="analytics"
          element={<Analytics />}
        />

        {/* Company Profile */}
        <Route
          path="profile"
          element={<CompanyProfile />}
        />

        {/* Edit Job */}
        <Route
          path="edit-job/:id"
          element={<EditJobs />}
        />

        {/* Employee Profile */}
        <Route
          path="employee-profile/:employee_id"
          element={<EmployeeProfile />}
        />

        {/* Settings */}
        <Route
          path="settings"
          element={<Setting />}
        />

      </Route>

    </Routes>
  );
};

export default CompanyRoutes;