import api from "./api";

// =============================
// Company Register
// =============================
export const companyRegister = (data) => {
  return api.post("/company/register", data);
};

// =============================
// Company Login
// =============================
export const companyLogin = (data) => {
  return api.post("/company/login", data);
};

// =============================
// Dashboard
// =============================
export const getDashboard = () => {
  return api.get("/company/dashboard");
};

// =============================
// Applicants
// =============================
export const updateApplicantStatus = (application_id, status) => {
  return api.put(
    `/company/applicants/${application_id}`,
    { status }
  );
};

// =============================
// Employee Profile
// =============================
export const getEmployeeProfile = (employee_id) => {
  return api.get(
    `/company/employee-profile/${employee_id}`
  );
};