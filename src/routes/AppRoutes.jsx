import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

// ================= HOME =================
import Home from "../pages/Home/Home";

// ================= EMPLOYEE AUTH =================
import EmployeeRegister from "../pages/employee/auth/EmployeeRegister";
import EmployeeLogin from "../pages/employee/auth/EmployeeLogin";

// ================= EMPLOYEE LAYOUT =================
import EmployeeLayout from "../pages/employee/EmployeeLayout";

// ================= EMPLOYEE PAGES =================
import EmployeeDashboard from "../pages/employee/EmployeeDashboard";
import EmployeeBrowseJobs from "../pages/employee/EmployeeBrowseJobs";
import JobDetails from "../pages/employee/JobDetails";
import AppliedJobs from "../pages/employee/AppliedJobs";
import SavedJobs from "../pages/employee/SavedJobs";
import Profile from "../pages/employee/Profile";
import Resume from "../pages/employee/Resume";
import Notifications from "../pages/employee/Notifications";
import Settings from "../pages/employee/Settings";
import EditProfile from "../pages/employee/EditProfile";
import EmployeeCompanyProfile from "../pages/employee/CompanyProfile";
// Employee Forgot Password
import EmployeeForgotPassword from "../pages/employee/ForgotPassword";

// ================= COMPANY AUTH =================
import CompanyRegister from "../pages/company/auth/CompanyRegister";
import CompanyLogin from "../pages/company/auth/CompanyLogin";

// Company Forgot Password
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


const AppRoutes = () => {
  return (
    <BrowserRouter>

      <Routes>

        {/* =====================================================
            HOME
        ===================================================== */}

        <Route
          path="/"
          element={<Home />}
        />


        {/* =====================================================
            EMPLOYEE AUTH
        ===================================================== */}

        <Route
          path="/employee/register"
          element={<EmployeeRegister />}
        />

        <Route
          path="/employee/login"
          element={<EmployeeLogin />}
        />

        {/* Employee Forgot Password
            Outside EmployeeLayout
            So Sidebar/Navbar Dashboard will NOT appear
        */}
        <Route
          path="/employee/forgot-password"
          element={<EmployeeForgotPassword />}
        />


        {/* =====================================================
            EMPLOYEE PANEL
        ===================================================== */}

        <Route
          path="/employee"
          element={<EmployeeLayout />}
        >

          <Route
            path="dashboard"
            element={<EmployeeDashboard />}
          />

          <Route
            path="jobs"
            element={<EmployeeBrowseJobs />}
          />

          <Route
            path="job/:id"
            element={<JobDetails />}
          />

          <Route
            path="applied-jobs"
            element={<AppliedJobs />}
          />

          <Route
            path="saved-jobs"
            element={<SavedJobs />}
          />

          <Route
            path="profile"
            element={<Profile />}
          />

          <Route
            path="edit-profile"
            element={<EditProfile />}
          />

          <Route
            path="resume"
            element={<Resume />}
          />

          <Route
            path="notifications"
            element={<Notifications />}
          />

          <Route
            path="settings"
            element={<Settings />}
          />
 {/* Employee View Company Profile */}
  <Route
    path="company/:company_id"
    element={<EmployeeCompanyProfile />}
  />
        </Route>


        {/* =====================================================
            COMPANY AUTH
        ===================================================== */}

        <Route
          path="/company/register"
          element={<CompanyRegister />}
        />

        <Route
          path="/company/login"
          element={<CompanyLogin />}
        />


        {/* =====================================================
            COMPANY FORGOT PASSWORD
            Outside CompanyLayout
            So Sidebar/Navbar Dashboard will NOT appear
        ===================================================== */}

        <Route
          path="/company/forgot-password"
          element={<CompanyForgotPassword />}
        />


        {/* =====================================================
            COMPANY PANEL
        ===================================================== */}

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

          {/* Company Settings */}
          <Route
            path="settings"
            element={<Setting />}
          />

        </Route>

      </Routes>

    </BrowserRouter>
  );
};

export default AppRoutes;