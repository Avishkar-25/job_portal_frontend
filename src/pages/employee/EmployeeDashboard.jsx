import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

import {
  FaBriefcase,
  FaFileAlt,
  FaHeart,
  FaTrophy,
  FaSearch,
  FaUser,
  FaMapMarkerAlt,
  FaClock,
  FaCheckCircle,
  FaBolt,
  FaArrowRight,
} from "react-icons/fa";

const EmployeeDashboard = () => {
  const navigate = useNavigate();

  // ==========================================
  // STATE
  // ==========================================

  const [stats, setStats] = useState({
    availableJobs: 0,
    appliedJobs: 0,
    savedJobs: 0,
    interviews: 0,
  });

  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [recentApplications, setRecentApplications] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);

  const [loading, setLoading] = useState(true);

  // ==========================================
  // FETCH DASHBOARD
  // ==========================================

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        navigate("/employee/login");
        return;
      }

      const res = await api.get(
        `/employee/dashboard/${user.user_id}`
      );

      if (res.data.success) {
        setStats(
          res.data.stats || {
            availableJobs: 0,
            appliedJobs: 0,
            savedJobs: 0,
            interviews: 0,
          }
        );

        setRecommendedJobs(res.data.recommendedJobs || []);
        setRecentApplications(res.data.recentApplications || []);
        setSavedJobs(res.data.savedJobs || []);
      }
    } catch (err) {
      console.error("Dashboard fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center py-5">
        <div className="spinner-border text-primary"></div>
        <span className="ms-2 text-muted">
          Loading Dashboard...
        </span>
      </div>
    );
  }

  // ==========================================
  // STAT CARD
  // ==========================================

  const StatCard = ({
    icon,
    value,
    title,
    color,
    onClick,
  }) => {
    return (
      <div className="col-xl-3 col-md-6">
        <div
          className="card border-0 shadow-sm h-100"
          style={{
            cursor: onClick ? "pointer" : "default",
            borderRadius: "14px",
          }}
          onClick={onClick}
        >
          <div className="card-body p-4">
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <h3 className="fw-bold mb-1">
                  {value}
                </h3>

                <p className="text-muted mb-0 small">
                  {title}
                </p>
              </div>

              <div
                className={`bg-${color} bg-opacity-10 text-${color} rounded-3 d-flex align-items-center justify-content-center`}
                style={{
                  width: "50px",
                  height: "50px",
                  fontSize: "20px",
                }}
              >
                {icon}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container-fluid py-3">

      {/* ==========================================
          HEADER
      ========================================== */}

      <div
        className="card border-0 shadow-sm mb-4"
        style={{
          borderRadius: "16px",
          background: "#f8faff",
        }}
      >
        <div className="card-body p-4">
          <div className="row align-items-center">

            <div className="col-lg-8">
              <h3 className="fw-bold mb-2">
                Welcome Back 👋
              </h3>

              <p className="text-muted mb-3">
                Find jobs, manage your applications and
                build your career.
              </p>

              <button
                className="btn btn-primary px-4 rounded-pill"
                onClick={() =>
                  navigate("/employee/jobs")
                }
              >
                <FaSearch className="me-2" />
                Browse Jobs
              </button>
            </div>

            <div className="col-lg-4 text-center d-none d-lg-block">
              <FaBriefcase
                size={75}
                className="text-primary opacity-25"
              />
            </div>

          </div>
        </div>
      </div>


      {/* ==========================================
          STATISTICS
      ========================================== */}

      <div className="row g-3 mb-4">

        <StatCard
          icon={<FaBriefcase />}
          value={stats.availableJobs}
          title="Available Jobs"
          color="primary"
          onClick={() =>
            navigate("/employee/jobs")
          }
        />

        <StatCard
          icon={<FaFileAlt />}
          value={stats.appliedJobs}
          title="Applied Jobs"
          color="success"
          onClick={() =>
            navigate("/employee/applied-jobs")
          }
        />

        <StatCard
          icon={<FaHeart />}
          value={stats.savedJobs}
          title="Saved Jobs"
          color="danger"
          onClick={() =>
            navigate("/employee/saved-jobs")
          }
        />

        <StatCard
          icon={<FaTrophy />}
          value={stats.interviews}
          title="Interviews"
          color="warning"
        />

      </div>


      {/* ==========================================
          QUICK ACTIONS
      ========================================== */}

      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body p-4">

          <div className="d-flex align-items-center mb-3">
            <FaBolt className="text-primary me-2" />

            <h5 className="fw-bold mb-0">
              Quick Actions
            </h5>
          </div>

          <div className="row g-3">

            <div className="col-md-3">
              <button
                className="btn btn-primary w-100 py-2"
                onClick={() =>
                  navigate("/employee/jobs")
                }
              >
                <FaSearch className="me-2" />
                Browse Jobs
              </button>
            </div>

            <div className="col-md-3">
              <button
                className="btn btn-success w-100 py-2"
                onClick={() =>
                  navigate("/employee/profile")
                }
              >
                <FaUser className="me-2" />
                My Profile
              </button>
            </div>

            <div className="col-md-3">
              <button
                className="btn btn-warning w-100 py-2"
                onClick={() =>
                  navigate("/employee/applied-jobs")
                }
              >
                <FaFileAlt className="me-2" />
                Applications
              </button>
            </div>

            <div className="col-md-3">
              <button
                className="btn btn-danger w-100 py-2"
                onClick={() =>
                  navigate("/employee/saved-jobs")
                }
              >
                <FaHeart className="me-2" />
                Saved Jobs
              </button>
            </div>

          </div>
        </div>
      </div>


      {/* ==========================================
          RECOMMENDED JOBS
      ========================================== */}

      <div className="card border-0 shadow-sm mb-4">

        <div className="card-header bg-white border-0 p-4">
          <div className="d-flex justify-content-between align-items-center">

            <div>
              <h5 className="fw-bold mb-1">
                Recommended Jobs
              </h5>

              <small className="text-muted">
                Jobs recommended for you
              </small>
            </div>

            <button
              className="btn btn-sm btn-outline-primary rounded-pill"
              onClick={() =>
                navigate("/employee/jobs")
              }
            >
              View All
              <FaArrowRight className="ms-2" />
            </button>

          </div>
        </div>


        <div className="card-body pt-0">

          {recommendedJobs.length > 0 ? (

            <div className="row g-3">

              {recommendedJobs
                .slice(0, 6)
                .map((job) => (

                  <div
                    className="col-lg-6"
                    key={job.job_id}
                  >

                    <div className="border rounded-3 p-3 h-100">

                      <div className="d-flex">

                        <img
                          src={
                            job.logo
                              ? `http://localhost:5000/uploads/company/logos/${job.logo}`
                              : "https://via.placeholder.com/60"
                          }
                          alt="Company"
                          className="rounded-circle border me-3"
                          style={{
                            width: "55px",
                            height: "55px",
                            objectFit: "cover",
                          }}
                        />

                        <div className="flex-grow-1">

                          <h6 className="fw-bold mb-1">
                            {job.job_title}
                          </h6>

                          <p className="text-primary small mb-2">
                            {job.company_name}
                          </p>

                          <div className="d-flex flex-wrap gap-2">

                            {job.category && (
                              <span className="badge bg-light text-dark border">
                                {job.category}
                              </span>
                            )}

                            {job.job_type && (
                              <span className="badge bg-primary">
                                {job.job_type}
                              </span>
                            )}

                            {job.work_mode && (
                              <span className="badge bg-success">
                                {job.work_mode}
                              </span>
                            )}

                          </div>

                        </div>

                      </div>


                      <hr />


                      <div className="row small">

                        <div className="col-6">

                          <span className="text-muted">
                            <FaMapMarkerAlt className="me-1" />
                            Location
                          </span>

                          <p className="fw-semibold mb-0 mt-1">
                            {job.location || "Not specified"}
                          </p>

                        </div>

                        <div className="col-6">

                          <span className="text-muted">
                            <FaBriefcase className="me-1" />
                            Experience
                          </span>

                          <p className="fw-semibold mb-0 mt-1">
                            {job.experience || "Fresher"}
                          </p>

                        </div>

                      </div>


                      <div className="mt-3">

                        <small className="text-muted">
                          Salary
                        </small>

                        <p className="text-success fw-bold mb-2">

                          ₹
                          {job.salary_min
                            ? Number(
                                job.salary_min
                              ).toLocaleString()
                            : "0"}

                          {" - "}

                          ₹
                          {job.salary_max
                            ? Number(
                                job.salary_max
                              ).toLocaleString()
                            : "0"}

                        </p>

                      </div>


                      <button
                        className="btn btn-outline-primary btn-sm w-100 rounded-pill"
                        onClick={() =>
                          navigate(
                            `/employee/job/${job.job_id}`
                          )
                        }
                      >
                        View Details
                      </button>

                    </div>

                  </div>

                ))}

            </div>

          ) : (

            <div className="text-center py-5">

              <FaBriefcase
                size={45}
                className="text-muted mb-3"
              />

              <h6 className="fw-bold">
                No Recommended Jobs
              </h6>

              <p className="text-muted small">
                Browse available jobs and start applying.
              </p>

              <button
                className="btn btn-primary btn-sm rounded-pill px-4"
                onClick={() =>
                  navigate("/employee/jobs")
                }
              >
                Browse Jobs
              </button>

            </div>

          )}

        </div>
      </div>


      {/* ==========================================
          RECENT APPLICATIONS + SAVED JOBS
      ========================================== */}

      <div className="row g-4 mb-4">

        {/* RECENT APPLICATIONS */}

        <div className="col-lg-7">

          <div className="card border-0 shadow-sm h-100">

            <div className="card-header bg-white border-0 p-4">

              <div className="d-flex justify-content-between align-items-center">

                <div>
                  <h5 className="fw-bold mb-1">
                    Recent Applications
                  </h5>

                  <small className="text-muted">
                    Your latest applications
                  </small>
                </div>

                <button
                  className="btn btn-sm btn-outline-primary rounded-pill"
                  onClick={() =>
                    navigate("/employee/applied-jobs")
                  }
                >
                  View All
                </button>

              </div>

            </div>


            <div className="card-body pt-0">

              {recentApplications.length > 0 ? (

                recentApplications
                  .slice(0, 5)
                  .map((job) => (

                    <div
                      key={job.application_id}
                      className="border-bottom py-3"
                    >

                      <div className="d-flex justify-content-between align-items-center gap-3">

                        <div>

                          <h6 className="fw-bold mb-1">
                            {job.job_title}
                          </h6>

                          <p className="text-primary small mb-1">
                            {job.company_name}
                          </p>

                          <small className="text-muted">
                            <FaMapMarkerAlt className="me-1" />
                            {job.location}
                          </small>

                        </div>


                        <div className="text-end">

                          <span
                            className={`badge ${
                              job.status === "Selected"
                                ? "bg-success"
                                : job.status === "Rejected"
                                ? "bg-danger"
                                : job.status === "Shortlisted"
                                ? "bg-info text-dark"
                                : "bg-primary"
                            }`}
                          >
                            {job.status}
                          </span>

                          <div className="mt-1">
                            <small className="text-muted">
                              {job.applied_at
                                ? new Date(
                                    job.applied_at
                                  ).toLocaleDateString()
                                : ""}
                            </small>
                          </div>

                        </div>

                      </div>

                    </div>

                  ))

              ) : (

                <div className="text-center py-5">

                  <FaFileAlt
                    size={40}
                    className="text-muted mb-3"
                  />

                  <h6 className="fw-bold">
                    No Applications Yet
                  </h6>

                  <p className="text-muted small">
                    Start applying for jobs.
                  </p>

                  <button
                    className="btn btn-primary btn-sm rounded-pill"
                    onClick={() =>
                      navigate("/employee/jobs")
                    }
                  >
                    Browse Jobs
                  </button>

                </div>

              )}

            </div>

          </div>

        </div>


        {/* SAVED JOBS */}

        <div className="col-lg-5">

          <div className="card border-0 shadow-sm h-100">

            <div className="card-header bg-white border-0 p-4">

              <div className="d-flex justify-content-between align-items-center">

                <div>
                  <h5 className="fw-bold mb-1">
                    Saved Jobs
                  </h5>

                  <small className="text-muted">
                    Recently saved
                  </small>
                </div>

                <button
                  className="btn btn-sm btn-outline-danger rounded-pill"
                  onClick={() =>
                    navigate("/employee/saved-jobs")
                  }
                >
                  View All
                </button>

              </div>

            </div>


            <div className="card-body pt-0">

              {savedJobs.length > 0 ? (

                savedJobs
                  .slice(0, 5)
                  .map((job) => (

                    <div
                      key={job.job_id}
                      className="border-bottom py-3"
                    >

                      <div className="d-flex justify-content-between align-items-center">

                        <div>

                          <h6 className="fw-bold mb-1">
                            {job.job_title}
                          </h6>

                          <small className="text-primary d-block">
                            {job.company_name}
                          </small>

                          <small className="text-muted">
                            <FaMapMarkerAlt className="me-1" />
                            {job.location}
                          </small>

                        </div>

                        <button
                          className="btn btn-sm btn-primary rounded-pill"
                          onClick={() =>
                            navigate(
                              `/employee/job/${job.job_id}`
                            )
                          }
                        >
                          View
                        </button>

                      </div>

                    </div>

                  ))

              ) : (

                <div className="text-center py-5">

                  <FaHeart
                    size={40}
                    className="text-muted mb-3"
                  />

                  <h6 className="fw-bold">
                    No Saved Jobs
                  </h6>

                  <p className="text-muted small">
                    Save jobs you are interested in.
                  </p>

                  <button
                    className="btn btn-danger btn-sm rounded-pill"
                    onClick={() =>
                      navigate("/employee/jobs")
                    }
                  >
                    Browse Jobs
                  </button>

                </div>

              )}

            </div>

          </div>

        </div>

      </div>


      {/* ==========================================
          PROFILE QUICK CARD
      ========================================== */}

      <div className="card border-0 shadow-sm">

        <div className="card-body p-4">

          <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">

            <div className="d-flex align-items-center">

              <div
                className="bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center me-3"
                style={{
                  width: "50px",
                  height: "50px",
                }}
              >
                <FaUser />
              </div>

              <div>

                <h6 className="fw-bold mb-1">
                  Keep Your Profile Updated
                </h6>

                <small className="text-muted">
                  Complete your profile to improve your job
                  opportunities.
                </small>

              </div>

            </div>

            <button
              className="btn btn-primary rounded-pill px-4"
              onClick={() =>
                navigate("/employee/profile")
              }
            >
              Update Profile
              <FaArrowRight className="ms-2" />
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default EmployeeDashboard;