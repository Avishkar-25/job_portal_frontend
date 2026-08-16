import api from "./api";

// ================================
// Get Employee Profile
// ================================
export const getEmployeeProfile = (user_id) =>
  api.get(`/employee/profile/${user_id}`);

// ================================
// Update Employee Profile
// ================================
export const updateEmployeeProfile = (user_id, data) =>
  api.put(`/employee/profile/${user_id}`, data);

// ================================
// Upload Profile Photo
// ================================
export const uploadProfilePhoto = (user_id, formData) =>
  api.post(`/employee/profile/photo/${user_id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });


//career preference
export const getCareerPreference = (user_id) =>
  api.get(`/employee/career/${user_id}`);

export const updateCareerPreference = (user_id, data) =>
  api.put(`/employee/career/${user_id}`, data);
// Get About
export const getAbout = (user_id) =>
  api.get(`/employee/about/${user_id}`);

// Update About
export const updateAbout = (user_id, data) =>
  api.put(`/employee/about/${user_id}`, data);



// ===============================
// Education
// ===============================

export const getEducation = (user_id) =>
  api.get(`/employee/education/${user_id}`);

export const addEducation = (user_id, data) =>
  api.post(`/employee/education/${user_id}`, data);

export const updateEducation = (qualification_id, data) =>
  api.put(`/employee/education/${qualification_id}`, data);

export const deleteEducation = (qualification_id) =>
  api.delete(`/employee/education/${qualification_id}`);


// =====================================================
// SKILLS API
// =====================================================

export const getSkills = (user_id) =>
  api.get(`/employee/skills/${user_id}`);

export const addSkill = (user_id, data) =>
  api.post(`/employee/skills/${user_id}`, data);

export const updateSkill = (skill_id, data) =>
  api.put(`/employee/skills/${skill_id}`, data);

export const deleteSkill = (skill_id) =>
  api.delete(`/employee/skills/${skill_id}`);

// =======================================
// Professional Details
// =======================================

export const getProfessionalDetails = (user_id) =>
  api.get(`/employee/professional/${user_id}`);

export const updateProfessionalDetails = (user_id, data) =>
  api.put(`/employee/professional/${user_id}`, data);
// =======================================
// Professional Summary
// =======================================

export const getProfessionalSummary = (user_id) =>
  api.get(`/employee/professional-summary/${user_id}`);

export const updateProfessionalSummary = (user_id, data) =>
  api.put(
    `/employee/professional-summary/${user_id}`,
    data
  );
// =======================================
// Resume APIs
// =======================================

export const getResume = (user_id) =>
  api.get(`/employee/resume/${user_id}`);

export const uploadResume = (user_id, formData) =>
  api.post(`/employee/resume/${user_id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const deleteResume = (user_id) =>
  api.delete(`/employee/resume/${user_id}`);

// =======================================
// Social Profiles
// =======================================

export const getSocialProfiles = (user_id) =>
  api.get(`/employee/social/${user_id}`);

export const updateSocialProfiles = (user_id, data) =>
  api.put(`/employee/social/${user_id}`, data);

export const deleteSocialProfile = (user_id, type) =>
  api.delete(`/employee/social/${user_id}/${type}`);

// =======================================
// Address
// =======================================

export const getAddress = (user_id) =>
  api.get(`/employee/address/${user_id}`);

export const updateAddress = (user_id, data) =>
  api.put(`/employee/address/${user_id}`, data);

export const deleteAddress = (user_id) =>
  api.delete(`/employee/address/${user_id}`);