import api from "./api";

// Get All Jobs
export const getAllJobs = () => {
  return api.get("/jobs");
};

// Get Job By ID
export const getJobById = (id) => {
  return api.get(`/jobs/${id}`);
};

// Apply Job
export const applyJob = (job_id, data) => {
  return api.post(`/jobs/apply/${job_id}`, data);
};

// Applied Jobs
export const getAppliedJobs = (user_id) => {
  return api.get(`/jobs/applied-jobs/${user_id}`);
};

// Save Job
export const saveJob = (job_id, data) => {
  return api.post(`/jobs/save/${job_id}`, data);
};

// Saved Jobs
export const getSavedJobs = (user_id) => {
  return api.get(`/jobs/saved/${user_id}`);
};

// Remove Saved Job
export const removeSavedJob = (job_id, data) => {
  return api.delete(`/jobs/unsave/${job_id}`, {
    data,
  });
};

// Cancel Application
export const cancelApplication = (application_id) => {
  return api.delete(`/employee/applications/${application_id}`);
};

// Check Profile Completion
export const checkProfileCompletion = (user_id) => {
  return api.get(`/employee/profile-completion/${user_id}`);
};