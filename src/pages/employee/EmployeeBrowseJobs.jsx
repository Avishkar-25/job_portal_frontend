import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getAllJobs,
  applyJob,
  saveJob,
  checkProfileCompletion,
} from "../../services/employeeJobApi";

import "./EmployeeBrowseJobs.css";

const EmployeeBrowseJobs = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  // ==========================================
  // STATES
  // ==========================================

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState("");
  const [salary, setSalary] = useState("");

  const [jobType, setJobType] = useState("All");

  const [applying, setApplying] = useState({});
  const [saving, setSaving] = useState({});

  // Profile Modal
  const [showProfileModal, setShowProfileModal] = useState(false);

  const [profilePercentage, setProfilePercentage] = useState(0);
  const [missingFields, setMissingFields] = useState([]);

  // ==========================================
  // LOAD JOBS
  // ==========================================

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      setLoading(true);

      const res = await getAllJobs();

      if (res.data.success) {
        setJobs(res.data.jobs || []);
      }
    } catch (err) {
      console.error("Load jobs error:", err);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // COMPANY LOGO URL
  // ==========================================

  const getCompanyLogo = (logo) => {
    if (!logo) {
      return null;
    }

    if (
      logo.startsWith("http://") ||
      logo.startsWith("https://")
    ) {
      return logo;
    }

    return `http://localhost:5000/${logo.replace(/^\/+/, "")}`;
  };

  // ==========================================
  // LAST DATE CHECK
  // ==========================================
  // Job ची last_date संपली आहे का ते check करतो

  const isDeadlineExpired = (lastDate) => {
    if (!lastDate) {
      return false;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const deadline = new Date(lastDate);
    deadline.setHours(0, 0, 0, 0);

    return today > deadline;
  };

  // ==========================================
  // APPLY JOB
  // ==========================================

  const handleApply = async (job) => {
    try {
      // ======================================
      // LOGIN CHECK
      // ======================================

      if (!user || !user.user_id) {
        alert("Please login first.");
        navigate("/employee/login");
        return;
      }

      // ======================================
      // LAST DATE CHECK
      // ======================================
      // Frontend वरून expired job ला apply
      // करण्यापासून user ला थांबवतो

      if (isDeadlineExpired(job.last_date)) {
        alert(
          "Application last date has expired. You cannot apply for this job."
        );
        return;
      }

      // ======================================
      // CHECK PROFILE
      // ======================================

      const profileRes = await checkProfileCompletion(
        user.user_id
      );

      if (
        profileRes.data.success &&
        !profileRes.data.profileComplete
      ) {
        setProfilePercentage(
          profileRes.data.percentage || 0
        );

        setMissingFields(
          profileRes.data.missingFields || []
        );

        setShowProfileModal(true);

        return;
      }

      // ======================================
      // APPLY
      // ======================================

      setApplying((prev) => ({
        ...prev,
        [job.job_id]: true,
      }));

      const res = await applyJob(job.job_id, {
        user_id: user.user_id,
      });

      alert(
        res.data.message ||
          "Job applied successfully"
      );

    } catch (err) {
      console.error("Apply job error:", err);

      alert(
        err.response?.data?.message ||
          "Something went wrong while applying"
      );
    } finally {
      setApplying((prev) => ({
        ...prev,
        [job.job_id]: false,
      }));
    }
  };

  // ==========================================
  // SAVE JOB
  // ==========================================

  const handleSave = async (job_id) => {
    try {
      if (!user || !user.user_id) {
        alert("Please login first.");
        navigate("/employee/login");
        return;
      }

      setSaving((prev) => ({
        ...prev,
        [job_id]: true,
      }));

      const res = await saveJob(job_id, {
        user_id: user.user_id,
      });

      alert(
        res.data.message ||
          "Job saved successfully"
      );

    } catch (err) {
      console.error("Save job error:", err);

      alert(
        err.response?.data?.message ||
          "Failed to save job"
      );
    } finally {
      setSaving((prev) => ({
        ...prev,
        [job_id]: false,
      }));
    }
  };

  // ==========================================
  // SEARCH + FILTER
  // ==========================================

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const searchText = search
        .trim()
        .toLowerCase();

      const title =
        !searchText ||
        job.job_title
          ?.toLowerCase()
          .includes(searchText);

      const cat =
        category === "" ||
        job.category
          ?.toLowerCase()
          .includes(category.toLowerCase());

      const type =
        jobType === "All" ||
        job.job_type === jobType;

      const loc =
        location === "" ||
        job.location
          ?.toLowerCase()
          .includes(location.toLowerCase());

      const exp =
        experience === "" ||
        job.experience
          ?.toLowerCase()
          .includes(experience.toLowerCase());

      const sal =
        salary === "" ||
        Number(job.salary_min || 0) >=
          Number(salary);

      return (
        title &&
        cat &&
        type &&
        loc &&
        exp &&
        sal
      );
    });
  }, [
    jobs,
    search,
    category,
    jobType,
    location,
    experience,
    salary,
  ]);

  // ==========================================
  // RESET FILTERS
  // ==========================================

  const resetFilters = () => {
    setSearch("");
    setCategory("");
    setLocation("");
    setExperience("");
    setSalary("");
    setJobType("All");
  };

  // ==========================================
  // FIELD LABEL
  // ==========================================

  const getFieldLabel = (field) => {
    const labels = {
      full_name: "Full Name",
      profession: "Profession",
      email: "Email",
      phone: "Phone",
      gender: "Gender",
      dob: "Date of Birth",
      address: "Address",
      city: "City",
      state: "State",
      country: "Country",
      pincode: "Pincode",
      experience: "Experience",
      about: "About",
      professional_summary:
        "Professional Summary",
      resume: "Resume",
      education: "Education",
      skills: "Skills",
      careerPreferences:
        "Career Preferences",
    };

    return labels[field] || field;
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="browse-loading">
        <div className="spinner-border text-primary"></div>

        <h5 className="mt-3">
          Loading Jobs...
        </h5>
      </div>
    );
  }

  // ==========================================
  // JSX
  // ==========================================

  return (
    <div className="employee-browse-jobs">

      {/* ======================================
          HEADER
      ====================================== */}

      <div className="browse-header card border-0 shadow-sm rounded-4 mb-4">
        <div className="card-body p-4">

          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">

            <div>
              <h2 className="fw-bold mb-1">
                Browse Jobs
              </h2>

              <p className="text-muted mb-0">
                Find your dream job
              </p>
            </div>

            <div className="jobs-count">
              <i className="bi bi-briefcase-fill me-2"></i>
              {filteredJobs.length} Jobs Found
            </div>

          </div>

          {/* SEARCH */}

          <div className="row g-3 mt-3">

            {/* 70% Search Input */}

            <div
              className="col"
              style={{
                flex: "0 0 70%",
                maxWidth: "70%",
              }}
            >
              <div className="search-box">

                <i className="bi bi-search"></i>

                <input
                  type="text"
                  placeholder="Search by Job Title..."
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                />

              </div>
            </div>

            {/* 30% Search Button */}

            <div
              className="col"
              style={{
                flex: "0 0 30%",
                maxWidth: "30%",
              }}
            >
              <button
                type="button"
                className="btn btn-primary w-100"
                onClick={loadJobs}
              >
                <i className="bi bi-search me-2"></i>
                Search Jobs
              </button>
            </div>

          </div>

          {/* JOB TYPE */}

          <div className="job-type-filter mt-4">

            {[
              "All",
              "Full Time",
              "Part Time",
              "Internship",
              "Contract",
            ].map((type) => (

              <button
                key={type}
                className={
                  jobType === type
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setJobType(type)
                }
              >
                {type}
              </button>

            ))}

          </div>

          {/* ADVANCED FILTER */}

          <div className="row g-3 mt-2">

            <div className="col-lg-3">

              <div className="filter-box">

                <i className="bi bi-geo-alt"></i>

                <input
                  type="text"
                  placeholder="Location"
                  value={location}
                  onChange={(e) =>
                    setLocation(e.target.value)
                  }
                />

              </div>

            </div>

            <div className="col-lg-3">

              <div className="filter-box">

                <i className="bi bi-folder"></i>

                <input
                  type="text"
                  placeholder="Category"
                  value={category}
                  onChange={(e) =>
                    setCategory(e.target.value)
                  }
                />

              </div>

            </div>

            <div className="col-lg-3">

              <div className="filter-box">

                <i className="bi bi-star"></i>

                <input
                  type="text"
                  placeholder="Experience"
                  value={experience}
                  onChange={(e) =>
                    setExperience(e.target.value)
                  }
                />

              </div>

            </div>

            <div className="col-lg-2">

              <div className="filter-box">

                <i className="bi bi-currency-rupee"></i>

                <input
                  type="number"
                  placeholder="Min Salary"
                  value={salary}
                  onChange={(e) =>
                    setSalary(e.target.value)
                  }
                />

              </div>

            </div>

            <div className="col-lg-1">

              <button
                className="reset-btn"
                onClick={resetFilters}
                title="Reset Filters"
              >
                <i className="bi bi-arrow-clockwise"></i>
              </button>

            </div>

          </div>

        </div>
      </div>

      {/* ======================================
          JOB LIST
      ====================================== */}

      <div className="row g-4">

        {filteredJobs.length > 0 ? (

          filteredJobs.map((job) => {

            const logo =
              getCompanyLogo(
                job.company_logo
              );

            // ==========================================
            // LAST DATE CHECK
            // ==========================================

            const deadlineExpired =
              isDeadlineExpired(
                job.last_date
              );

            return (

              <div
                className="col-xl-3 col-lg-4 col-md-6"
                key={job.job_id}
              >

                <div className="job-card h-100">

                  <div className="job-card-body">

                    {/* =================================
                        COMPANY HEADER
                    ================================= */}

                    <div className="company-header">

                      <div className="company-info">

                        <div className="company-logo">

                          {logo ? (

                            <img
                              src={
                                job.company_logo
                                  ? `http://localhost:5000/uploads/company/logos/${job.company_logo}`
                                  : "/default-company.png"
                              }
                              alt={
                                job.company_name ||
                                "Company"
                              }
                              onError={(e) => {
                                e.currentTarget.src =
                                  "/default-company.png";
                              }}
                              style={{
                                width: "50px",
                                height: "50px",
                                objectFit: "contain",
                                borderRadius: "12px",
                                border:
                                  "1px solid #ddd",
                                padding: "5px",
                                background: "#fff",
                              }}
                            />

                          ) : null}

                          <div
                            className="logo-fallback"
                            style={{
                              display: logo
                                ? "none"
                                : "flex",
                            }}
                          >
                            <i className="bi bi-building"></i>
                          </div>

                        </div>

                        <div className="company-text">

                          <div className="company-name">
                            {job.company_name ||
                              "Company"}
                          </div>

                          <small>
                            <i className="bi bi-building me-1"></i>
                            Hiring Company
                          </small>

                        </div>

                      </div>

                      {/* STATUS */}

                      <span
                        className={
                          job.status === "active"
                            ? "status-badge active"
                            : "status-badge"
                        }
                      >
                        {job.status}
                      </span>

                    </div>

                    {/* =================================
                        JOB TITLE
                    ================================= */}

                    <h5 className="job-title">
                      {job.job_title}
                    </h5>

                    {/* =================================
                        BADGES
                    ================================= */}

                    <div className="job-badges">

                      <span className="category-badge">
                        {job.category}
                      </span>

                      <span className="type-badge">
                        {job.job_type}
                      </span>

                      <span className="mode-badge">
                        {job.work_mode}
                      </span>

                    </div>

                    {/* =================================
                        JOB DETAILS
                    ================================= */}

                    <div className="job-details">

                      <div>
                        <i className="bi bi-geo-alt-fill"></i>

                        <span>
                          {job.location ||
                            "Location not specified"}
                        </span>
                      </div>

                      <div>
                        <i className="bi bi-briefcase-fill"></i>

                        <span>
                          {job.experience ||
                            "Experience not specified"}
                        </span>
                      </div>

                      <div>
                        <i className="bi bi-people-fill"></i>

                        <span>
                          {job.openings || 0}
                          {" "}Openings
                        </span>
                      </div>

                    </div>

                    {/* =================================
                        LAST DATE
                    ================================= */}

                    <div className="job-details">

                      <div>
                        <i className="bi bi-calendar-event"></i>

                        <span>
                          Last Date:{" "}
                          {job.last_date
                            ? new Date(
                                job.last_date
                              ).toLocaleDateString(
                                "en-IN"
                              )
                            : "Not specified"}
                        </span>
                      </div>

                    </div>

                    {/* =================================
                        SALARY
                    ================================= */}

                    <div className="salary">

                      ₹
                      {Number(
                        job.salary_min || 0
                      ).toLocaleString()}

                      {" - "}

                      ₹
                      {Number(
                        job.salary_max || 0
                      ).toLocaleString()}

                    </div>

                    {/* =================================
                        SKILLS
                    ================================= */}

                    <div className="skills">

                      <strong>
                        Skills
                      </strong>

                      <p>
                        {job.required_skills ||
                          "Not specified"}
                      </p>

                    </div>

                    {/* =================================
                        BUTTONS
                    ================================= */}

                    <div className="job-buttons">

                      {/* VIEW */}

                      <button
                        className="btn btn-outline-primary"
                        onClick={() =>
                          navigate(
                            `/employee/job/${job.job_id}`,
                            {
                              state: {
                                from:
                                  "/employee/jobs",
                              },
                            }
                          )
                        }
                      >
                        <i className="bi bi-eye me-1"></i>
                        View Details
                      </button>

                      {/* SAVE */}

                      <button
                        className="btn btn-outline-warning"
                        disabled={
                          saving[job.job_id]
                        }
                        onClick={() =>
                          handleSave(
                            job.job_id
                          )
                        }
                      >

                        {saving[job.job_id] ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-1"></span>
                            Saving...
                          </>
                        ) : (
                          <>
                            <i className="bi bi-bookmark me-1"></i>
                            Save Job
                          </>
                        )}

                      </button>

                      {/* =================================
                          APPLY
                          LAST DATE CHECK ADDED
                      ================================= */}

                      <button
                        className={
                          deadlineExpired
                            ? "btn btn-secondary"
                            : "btn btn-primary"
                        }
                        disabled={
                          applying[job.job_id] ||
                          deadlineExpired
                        }
                        onClick={() =>
                          handleApply(job)
                        }
                      >

                        {deadlineExpired ? (
                          <>
                            <i className="bi bi-calendar-x me-1"></i>
                            Application Closed
                          </>
                        ) : applying[job.job_id] ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-1"></span>
                            Applying...
                          </>
                        ) : (
                          <>
                            <i className="bi bi-send me-1"></i>
                            Apply Now
                          </>
                        )}

                      </button>

                    </div>

                  </div>

                </div>

              </div>

            );
          })

        ) : (

          <div className="col-12">

            <div className="no-jobs">

              <i className="bi bi-search"></i>

              <h4>
                No Jobs Found
              </h4>

              <p>
                Try changing your search or filters.
              </p>

            </div>

          </div>

        )}

      </div>

      {/* ======================================
          PROFILE COMPLETION MODAL
      ====================================== */}

      {showProfileModal && (

        <div
          className="profile-modal-overlay"
          onClick={() =>
            setShowProfileModal(false)
          }
        >

          <div
            className="profile-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* HEADER */}

            <div className="profile-modal-header">

              <div className="profile-modal-icon">
                <i className="bi bi-person-check-fill"></i>
              </div>

              <button
                className="modal-close"
                onClick={() =>
                  setShowProfileModal(false)
                }
              >
                <i className="bi bi-x-lg"></i>
              </button>

            </div>

            {/* BODY */}

            <div className="profile-modal-body">

              <h3>
                Complete Your Profile
              </h3>

              <p>
                Please complete your employee
                profile before applying for a job.
              </p>

              {/* PROGRESS */}

              <div className="completion-info">

                <div className="completion-heading">

                  <span>
                    Profile Completion
                  </span>

                  <strong>
                    {profilePercentage}%
                  </strong>

                </div>

                <div className="completion-progress">

                  <div
                    style={{
                      width:
                        `${profilePercentage}%`,
                    }}
                  ></div>

                </div>

              </div>

              {/* MISSING FIELDS */}

              {missingFields.length > 0 && (

                <div className="missing-fields">

                  <h6>
                    Please complete:
                  </h6>

                  <div>

                    {missingFields.map(
                      (field) => (

                        <span key={field}>
                          <i className="bi bi-exclamation-circle me-1"></i>
                          {getFieldLabel(field)}
                        </span>

                      )
                    )}

                  </div>

                </div>

              )}

            </div>

            {/* FOOTER */}

            <div className="profile-modal-footer">

              <button
                className="cancel-profile-btn"
                onClick={() =>
                  setShowProfileModal(false)
                }
              >
                Cancel
              </button>

              <button
                className="goto-profile-btn"
                onClick={() => {
                  setShowProfileModal(false);
                  navigate("/employee/profile");
                }}
              >
                <i className="bi bi-person-fill me-2"></i>
                Go To Profile
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default EmployeeBrowseJobs;