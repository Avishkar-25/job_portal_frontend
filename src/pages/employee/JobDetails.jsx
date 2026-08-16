import React, { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
  useLocation,
  
} from "react-router-dom";
import {
  FaBuilding,
} from "react-icons/fa";
import {
  getJobById,
  applyJob,
  checkProfileCompletion,
} from "../../services/employeeJobApi";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // ==========================================
  // STATES
  // ==========================================

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  const [applying, setApplying] = useState(false);

  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profilePercentage, setProfilePercentage] = useState(0);
  const [missingFields, setMissingFields] = useState([]);

  // ==========================================
  // FIELD LABEL
  // ==========================================

  const getFieldLabel = (field) => {
    const labels = {
      name: "Name",
      email: "Email",
      phone: "Phone",
      dob: "Date of Birth",
      gender: "Gender",
      location: "Location",
      address: "Address",
      pincode: "Pincode",
      profile_image: "Profile Photo",
      resume: "Resume",
      skills: "Skills",
      education: "Education",
      qualification: "Qualification",
      experience: "Experience",
    };

    return (
      labels[field] ||
      field
        ?.replaceAll("_", " ")
        ?.replace(/\b\w/g, (char) => char.toUpperCase())
    );
  };

  // ==========================================
  // BACK URL
  // ==========================================

  const backUrl = location.state?.from || "/employee/jobs";

  // ==========================================
  // LOAD JOB
  // ==========================================

  useEffect(() => {
    loadJob();
  }, [id]);

  const loadJob = async () => {
    try {
      setLoading(true);

      const res = await getJobById(id);

      if (res.data.success) {
        setJob(res.data.job);
      }
    } catch (error) {
      console.error("Job details error:", error);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // APPLY JOB
  // ==========================================

  const handleApply = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      // LOGIN CHECK
      if (!user?.user_id) {
        navigate("/employee/login");
        return;
      }

      // JOB CHECK
      if (!job?.job_id) {
        return;
      }

      setApplying(true);

      // ========================================
      // CHECK PROFILE COMPLETION FIRST
      // ========================================

      const profileRes = await checkProfileCompletion(
        user.user_id
      );

      const percentage = Number(
        profileRes.data?.percentage || 0
      );

      console.log("Profile Completion:", percentage);

      // ========================================
      // BELOW 70% → SHOW MODAL
      // ========================================

      if (percentage < 70) {
        setProfilePercentage(percentage);

        setMissingFields(
          profileRes.data?.missingFields || []
        );

        setShowProfileModal(true);

        return;
      }

      // ========================================
      // 70% OR MORE → APPLY
      // ========================================

      const res = await applyJob(job.job_id, {
        user_id: user.user_id,
      });

      alert(
        res.data?.message ||
          "Job applied successfully!"
      );

    } catch (error) {
      console.error("Apply Error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to apply for this job"
      );
    } finally {
      setApplying(false);
    }
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="text-center py-5">

        <div
          className="spinner-border text-primary mb-3"
          style={{
            width: "3rem",
            height: "3rem",
          }}
        ></div>

        <h5 className="text-muted">
          Loading Job Details...
        </h5>

      </div>
    );
  }

  // ==========================================
  // JOB NOT FOUND
  // ==========================================

  if (!job) {
    return (
      <div className="text-center py-5">

        <div className="mb-3">
          <i className="bi bi-exclamation-circle text-danger fs-1"></i>
        </div>

        <h4 className="fw-bold">
          Job Not Found
        </h4>

        <p className="text-muted">
          The requested job could not be found.
        </p>

        <button
          className="btn btn-outline-primary rounded-pill px-4"
          onClick={() => navigate(backUrl)}
        >
          <i className="bi bi-arrow-left me-2"></i>
          Back to Jobs
        </button>

      </div>
    );
  }

  // ==========================================
  // JSX
  // ==========================================

  return (
    <div className="container-fluid py-4">

      {/* ==========================================
          BACK BUTTON
      ========================================== */}

      <button
        className="btn btn-light border rounded-pill mb-4 px-4 fw-semibold shadow-sm"
        onClick={() => navigate(backUrl)}
      >
        <i className="bi bi-arrow-left me-2"></i>
        Back to Jobs
      </button>


      {/* ==========================================
          JOB HEADER
      ========================================== */}

      <div className="card border-0 shadow-lg rounded-4 overflow-hidden mb-4">

        <div
          className="p-4 p-md-5 text-white"
          style={{
            background:
              "linear-gradient(135deg, #0d6efd 0%, #6610f2 100%)",
          }}
        >

          {/* TOP ROW */}

          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-start gap-4">

            <div>

              <span className="badge bg-white text-primary rounded-pill px-3 py-2 mb-3">
                <i className="bi bi-briefcase-fill me-2"></i>
                Job Opportunity
              </span>

              <h2 className="fw-bold mb-2">
                {job.job_title}
              </h2>

              <div className="d-flex align-items-center gap-2">

                <i className="bi bi-building fs-5"></i>

                <span className="fs-5">
                  {job.company_name || "Company"}
                </span>

              </div>

            </div>


            {/* COMPANY PROFILE BUTTON */}
<button
  className="btn btn-primary"
  onClick={() =>
    navigate(`/employee/company/${job.company_id}`)
  }
>
  <FaBuilding className="me-2" />
  View Company
</button>

          </div>


          {/* JOB META */}

          <div className="row g-2 mt-4">

            {/* LOCATION */}

            <div className="col-12 col-sm-6 col-lg-3">

              <div className="bg-white bg-opacity-10 rounded-3 p-3 h-100">

                <small className="opacity-75 d-block mb-1">
                  <i className="bi bi-geo-alt-fill me-2"></i>
                  Location
                </small>

                <strong>
                  {job.location || "N/A"}
                </strong>

              </div>

            </div>


            {/* JOB TYPE */}

            <div className="col-12 col-sm-6 col-lg-3">

              <div className="bg-white bg-opacity-10 rounded-3 p-3 h-100">

                <small className="opacity-75 d-block mb-1">
                  <i className="bi bi-clock-fill me-2"></i>
                  Job Type
                </small>

                <strong>
                  {job.job_type || "N/A"}
                </strong>

              </div>

            </div>


            {/* WORK MODE */}

            <div className="col-12 col-sm-6 col-lg-3">

              <div className="bg-white bg-opacity-10 rounded-3 p-3 h-100">

                <small className="opacity-75 d-block mb-1">
                  <i className="bi bi-laptop-fill me-2"></i>
                  Work Mode
                </small>

                <strong>
                  {job.work_mode || "N/A"}
                </strong>

              </div>

            </div>


            {/* SALARY */}

            <div className="col-12 col-sm-6 col-lg-3">

              <div className="bg-white bg-opacity-10 rounded-3 p-3 h-100">

                <small className="opacity-75 d-block mb-1">
                  <i className="bi bi-currency-rupee me-2"></i>
                  Salary
                </small>

                <strong>
                  ₹{job.salary_min || 0}
                  {" - "}
                  ₹{job.salary_max || 0}
                </strong>

              </div>

            </div>

          </div>

        </div>

      </div>


      {/* ==========================================
          MAIN CONTENT
      ========================================== */}

      <div className="row g-4">


        {/* ======================================
            LEFT SIDE
        ====================================== */}

        <div className="col-lg-8">


          {/* JOB DESCRIPTION */}

          <div className="card border-0 shadow-sm rounded-4 mb-4">

            <div className="card-body p-4 p-md-5">

              <div className="d-flex align-items-center mb-4">

                <div
                  className="bg-primary bg-opacity-10 text-primary rounded-3 d-flex align-items-center justify-content-center me-3"
                  style={{
                    width: "48px",
                    height: "48px",
                  }}
                >
                  <i className="bi bi-file-text fs-4"></i>
                </div>

                <div>

                  <h4 className="fw-bold mb-0">
                    Job Description
                  </h4>

                  <small className="text-muted">
                    About this opportunity
                  </small>

                </div>

              </div>

              <p className="text-secondary lh-lg mb-0">
                {job.job_description ||
                  "No job description available."}
              </p>

            </div>

          </div>


          {/* REQUIRED SKILLS */}

          <div className="card border-0 shadow-sm rounded-4 mb-4">

            <div className="card-body p-4 p-md-5">

              <div className="d-flex align-items-center mb-4">

                <div
                  className="bg-success bg-opacity-10 text-success rounded-3 d-flex align-items-center justify-content-center me-3"
                  style={{
                    width: "48px",
                    height: "48px",
                  }}
                >
                  <i className="bi bi-stars fs-4"></i>
                </div>

                <div>

                  <h4 className="fw-bold mb-0">
                    Required Skills
                  </h4>

                  <small className="text-muted">
                    Skills required for this position
                  </small>

                </div>

              </div>

              <div className="bg-light rounded-3 p-3">
                {job.required_skills ||
                  "No skills specified."}
              </div>

            </div>

          </div>


          {/* RESPONSIBILITIES */}

          <div className="card border-0 shadow-sm rounded-4 mb-4">

            <div className="card-body p-4 p-md-5">

              <div className="d-flex align-items-center mb-4">

                <div
                  className="bg-warning bg-opacity-10 text-warning rounded-3 d-flex align-items-center justify-content-center me-3"
                  style={{
                    width: "48px",
                    height: "48px",
                  }}
                >
                  <i className="bi bi-list-check fs-4"></i>
                </div>

                <div>

                  <h4 className="fw-bold mb-0">
                    Responsibilities
                  </h4>

                  <small className="text-muted">
                    What you will be doing
                  </small>

                </div>

              </div>

              <p className="text-secondary lh-lg mb-0">
                {job.responsibilities ||
                  "No responsibilities specified."}
              </p>

            </div>

          </div>


          {/* QUALIFICATIONS */}

          <div className="card border-0 shadow-sm rounded-4">

            <div className="card-body p-4 p-md-5">

              <div className="d-flex align-items-center mb-4">

                <div
                  className="bg-info bg-opacity-10 text-info rounded-3 d-flex align-items-center justify-content-center me-3"
                  style={{
                    width: "48px",
                    height: "48px",
                  }}
                >
                  <i className="bi bi-mortarboard-fill fs-4"></i>
                </div>

                <div>

                  <h4 className="fw-bold mb-0">
                    Qualifications
                  </h4>

                  <small className="text-muted">
                    Education and requirements
                  </small>

                </div>

              </div>

              <p className="text-secondary lh-lg mb-0">
                {job.qualifications ||
                  "No qualifications specified."}
              </p>

            </div>

          </div>

        </div>


        {/* ======================================
            RIGHT SIDE
        ====================================== */}

        <div className="col-lg-4">

          <div
            className="card border-0 shadow-lg rounded-4 overflow-hidden"
            style={{
              position: "sticky",
              top: "20px",
            }}
          >

            {/* CARD HEADER */}

            <div
              className="p-4 text-white"
              style={{
                background:
                  "linear-gradient(135deg,#0d6efd,#6610f2)",
              }}
            >

              <div className="d-flex align-items-center">

                <div
                  className="bg-white bg-opacity-25 rounded-3 d-flex align-items-center justify-content-center me-3"
                  style={{
                    width: "48px",
                    height: "48px",
                  }}
                >
                  <i className="bi bi-briefcase-fill fs-4"></i>
                </div>

                <div>

                  <h5 className="fw-bold mb-0">
                    Job Information
                  </h5>

                  <small className="opacity-75">
                    Position details
                  </small>

                </div>

              </div>

            </div>


            {/* BODY */}

            <div className="card-body p-4">


              {/* CATEGORY */}

              <div className="d-flex align-items-center py-3 border-bottom">

                <div className="text-primary me-3">
                  <i className="bi bi-grid fs-5"></i>
                </div>

                <div className="flex-grow-1">

                  <small className="text-muted d-block">
                    Category
                  </small>

                  <strong>
                    {job.category || "N/A"}
                  </strong>

                </div>

              </div>


              {/* EXPERIENCE */}

              <div className="d-flex align-items-center py-3 border-bottom">

                <div className="text-success me-3">
                  <i className="bi bi-person-workspace fs-5"></i>
                </div>

                <div className="flex-grow-1">

                  <small className="text-muted d-block">
                    Experience
                  </small>

                  <strong>
                    {job.experience || "N/A"}
                  </strong>

                </div>

              </div>


              {/* OPENINGS */}

              <div className="d-flex align-items-center py-3 border-bottom">

                <div className="text-warning me-3">
                  <i className="bi bi-people-fill fs-5"></i>
                </div>

                <div className="flex-grow-1">

                  <small className="text-muted d-block">
                    Openings
                  </small>

                  <strong>
                    {job.openings || "N/A"}
                  </strong>

                </div>

              </div>


              {/* SALARY */}

              <div className="d-flex align-items-center py-3 border-bottom">

                <div className="text-success me-3">
                  <i className="bi bi-currency-rupee fs-5"></i>
                </div>

                <div className="flex-grow-1">

                  <small className="text-muted d-block">
                    Salary
                  </small>

                  <strong className="text-success">
                    ₹{job.salary_min || 0}
                    {" - "}
                    ₹{job.salary_max || 0}
                  </strong>

                </div>

              </div>


              {/* LAST DATE */}

              <div className="d-flex align-items-center py-3 border-bottom">

                <div className="text-danger me-3">
                  <i className="bi bi-calendar-event fs-5"></i>
                </div>

                <div className="flex-grow-1">

                  <small className="text-muted d-block">
                    Application Last Date
                  </small>

                  <strong>
                    {job.last_date
                      ? job.last_date.substring(0, 10)
                      : "N/A"}
                  </strong>

                </div>

              </div>


              {/* STATUS */}

              <div className="d-flex align-items-center py-3">

                <div className="text-success me-3">
                  <i className="bi bi-check-circle-fill fs-5"></i>
                </div>

                <div className="flex-grow-1">

                  <small className="text-muted d-block">
                    Status
                  </small>

                  <span className="badge bg-success rounded-pill px-3">
                    {job.status}
                  </span>

                </div>

              </div>


              {/* APPLY BUTTON */}

              <button
                type="button"
                className="btn btn-primary w-100 btn-lg rounded-pill mt-3 py-3 fw-semibold shadow-sm"
                onClick={handleApply}
                disabled={applying}
              >

                {applying ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Checking Profile...
                  </>
                ) : (
                  <>
                    <i className="bi bi-send-fill me-2"></i>
                    Apply Now
                    <i className="bi bi-arrow-right ms-2"></i>
                  </>
                )}

              </button>


              <div className="text-center mt-3">

                <small className="text-muted">

                  <i className="bi bi-shield-check me-1"></i>

                  Profile must be at least 70% complete

                </small>

              </div>

            </div>

          </div>

        </div>

      </div>


      {/* ==========================================
          PROFILE COMPLETION MODAL
      ========================================== */}

      {showProfileModal && (

        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{
            backgroundColor: "rgba(0,0,0,0.65)",
            backdropFilter: "blur(3px)",
          }}
        >

          <div className="modal-dialog modal-dialog-centered">

            <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden">


              {/* MODAL HEADER */}

              <div
                className="modal-header border-0 text-white p-4"
                style={{
                  background:
                    "linear-gradient(135deg,#0d6efd,#6610f2)",
                }}
              >

                <h5 className="modal-title fw-bold">

                  <i className="bi bi-person-check-fill me-2"></i>

                  Complete Your Profile

                </h5>

                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() =>
                    setShowProfileModal(false)
                  }
                ></button>

              </div>


              {/* MODAL BODY */}

              <div className="modal-body text-center p-4">


                {/* ICON */}

                <div
                  className="mx-auto mb-3 d-flex align-items-center justify-content-center"
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    background:
                      "linear-gradient(135deg,#0d6efd,#6610f2)",
                    color: "#fff",
                    fontSize: "32px",
                  }}
                >
                  <i className="bi bi-person-fill"></i>
                </div>


                <h4 className="fw-bold">
                  Profile Completion Required
                </h4>


                <p className="text-muted mb-4">

                  Your profile must be at least{" "}

                  <strong className="text-primary">
                    70%
                  </strong>

                  {" "}complete before you can apply
                  for this job.

                </p>


                {/* PROFILE PERCENTAGE */}

                <div className="mb-4 text-start">

                  <div className="d-flex justify-content-between mb-2">

                    <small className="fw-semibold">
                      Profile Completion
                    </small>

                    <small className="fw-bold text-danger">
                      {profilePercentage}%
                    </small>

                  </div>


                  <div
                    className="progress rounded-pill"
                    style={{
                      height: "12px",
                    }}
                  >

                    <div
                      className="progress-bar bg-danger rounded-pill"
                      role="progressbar"
                      style={{
                        width: `${profilePercentage}%`,
                      }}
                    ></div>

                  </div>

                </div>


                {/* MISSING FIELDS */}

                {missingFields.length > 0 && (

                  <div className="text-start">

                    <div className="alert alert-warning border-0 rounded-3">

                      <div className="fw-semibold mb-2">

                        <i className="bi bi-exclamation-triangle-fill me-2"></i>

                        Please complete:

                      </div>


                      <div className="d-flex flex-wrap gap-2">

                        {missingFields.map((field) => (

                          <span
                            key={field}
                            className="badge bg-white text-danger border px-3 py-2"
                          >
                            {getFieldLabel(field)}
                          </span>

                        ))}

                      </div>

                    </div>

                  </div>

                )}

              </div>


              {/* MODAL FOOTER */}

              <div className="modal-footer border-0 d-flex justify-content-center gap-2 pb-4">

                <button
                  type="button"
                  className="btn btn-light border px-4 rounded-pill"
                  onClick={() =>
                    setShowProfileModal(false)
                  }
                >
                  Cancel
                </button>


                <button
                  type="button"
                  className="btn btn-primary px-4 rounded-pill"
                  onClick={() => {

                    setShowProfileModal(false);

                    navigate("/employee/profile");

                  }}
                >

                  <i className="bi bi-person-fill me-2"></i>

                  Complete Profile

                  <i className="bi bi-arrow-right ms-2"></i>

                </button>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default JobDetails;