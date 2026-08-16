import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import {
  getAppliedJobs,
  cancelApplication,
} from "../../services/employeeJobApi";

const AppliedJobs = () => {
  const navigate = useNavigate();

  const [appliedJobs, setAppliedJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const user_id = user?.user_id;

  // ==========================================
  // BADGE COLOR
  // ==========================================

  const getBadge = (status) => {
    switch (status) {
      case "Applied":
        return "primary";

      case "Pending":
        return "warning";

      case "Under Review":
        return "secondary";

      case "Shortlisted":
        return "info";

      case "Interview":
        return "primary";

      case "Selected":
        return "success";

      case "Rejected":
        return "danger";

      default:
        return "secondary";
    }
  };

  // ==========================================
  // LOAD APPLIED JOBS
  // ==========================================

  const loadAppliedJobs = async () => {
    try {
      setLoading(true);

      if (!user_id) {
        setAppliedJobs([]);
        return;
      }

      const res = await getAppliedJobs(user_id);

      if (res.data.success) {
        setAppliedJobs(
          res.data.jobs || []
        );
      } else {
        setAppliedJobs([]);
      }

    } catch (err) {

      console.error(
        "Load applied jobs error:",
        err
      );

      setAppliedJobs([]);

    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // CANCEL APPLICATION
  // ==========================================

  const handleCancelApplication = async (
    application_id
  ) => {

    if (
      !window.confirm(
        "Are you sure you want to cancel this application?"
      )
    ) {
      return;
    }

    try {

      const res = await cancelApplication(
        application_id
      );

      alert(
        res.data.message ||
          "Application cancelled successfully"
      );

      // Reload applied jobs
      await loadAppliedJobs();

    } catch (err) {

      console.error(
        "Cancel application error:",
        err
      );

      alert(
        err.response?.data?.message ||
          "Failed to cancel application"
      );
    }
  };

  // ==========================================
  // LOAD ON PAGE LOAD
  // ==========================================

  useEffect(() => {
    loadAppliedJobs();
  }, [user_id]);

  // ==========================================
  // SEARCH + STATUS FILTER
  // ==========================================

  const filteredJobs = useMemo(() => {

    return appliedJobs.filter((job) => {

      const searchText =
        search.toLowerCase();

      const matchSearch =
        job.job_title
          ?.toLowerCase()
          .includes(searchText) ||
        job.company_name
          ?.toLowerCase()
          .includes(searchText);

      const matchStatus =
        statusFilter === "All" ||
        job.status === statusFilter;

      return (
        matchSearch &&
        matchStatus
      );
    });

  }, [
    appliedJobs,
    search,
    statusFilter,
  ]);

  // ==========================================
  // LOGIN CHECK
  // ==========================================

  if (!user_id && !loading) {

    return (
      <div className="container-fluid py-4">

        <div className="card border-0 shadow rounded-4">

          <div className="card-body text-center py-5">

            <i
              className="bi bi-person-lock text-primary"
              style={{
                fontSize: "60px",
              }}
            ></i>

            <h4 className="fw-bold mt-3">
              Please Login
            </h4>

            <p className="text-muted">
              Please login to view your
              applied jobs.
            </p>

            <button
              className="btn btn-primary rounded-pill px-4"
              onClick={() =>
                navigate("/employee/login")
              }
            >
              Login
            </button>

          </div>

        </div>

      </div>
    );
  }

  // ==========================================
  // MAIN UI
  // ==========================================

  return (
    <div className="container-fluid py-4">

      {/* ==========================================
          HEADER
      ========================================== */}

      <div className="card border-0 shadow rounded-4 mb-4 bg-primary text-white">

        <div className="card-body py-4">

          <div className="d-flex justify-content-between align-items-center flex-wrap">

            <div>

              <h2 className="fw-bold mb-2">
                Applied Jobs
              </h2>

              <p className="mb-0">
                Track and manage all your
                job applications.
              </p>

            </div>

            <div className="mt-3 mt-lg-0">

              <span className="badge bg-light text-dark fs-6 px-3 py-2">

                Total Applied :{" "}
                {filteredJobs.length}

              </span>

            </div>

          </div>

        </div>

      </div>


      {/* ==========================================
          SEARCH + FILTER
      ========================================== */}

      <div className="card border-0 shadow rounded-4 mb-4">

        <div className="card-body">

          <div className="row g-3">

            {/* SEARCH */}

            <div className="col-lg-8">

              <div className="input-group">

                <span className="input-group-text bg-white">

                  <i className="bi bi-search"></i>

                </span>

                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Search Job Title or Company..."
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                />

              </div>

            </div>


            {/* STATUS */}

            <div className="col-lg-4">

              <select
                className="form-select form-select-lg"
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(
                    e.target.value
                  )
                }
              >

                <option value="All">
                  All Status
                </option>

                <option value="Applied">
                  Applied
                </option>

                <option value="Pending">
                  Pending
                </option>

                <option value="Under Review">
                  Under Review
                </option>

                <option value="Shortlisted">
                  Shortlisted
                </option>

                <option value="Interview">
                  Interview
                </option>

                <option value="Selected">
                  Selected
                </option>

                <option value="Rejected">
                  Rejected
                </option>

              </select>

            </div>

          </div>

        </div>

      </div>


      {/* ==========================================
          LOADING
      ========================================== */}

      {loading && (

        <div className="text-center py-5">

          <div
            className="spinner-border text-primary"
            role="status"
          >
            <span className="visually-hidden">
              Loading...
            </span>
          </div>

          <h5 className="mt-3">
            Loading Applied Jobs...
          </h5>

        </div>

      )}


      {/* ==========================================
          JOB CARDS
      ========================================== */}

      {!loading && (

        <div className="row">

          {filteredJobs.length > 0 ? (

            filteredJobs.map((job) => (

              <div
                className="col-lg-6 col-xl-4 mb-4"
                key={job.application_id}
              >

                <div
                  className="card border-0 shadow rounded-4 h-100"
                  style={{
                    transition: "0.3s",
                    cursor: "pointer",
                  }}

                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform =
                      "translateY(-6px)";
                  }}

                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform =
                      "translateY(0)";
                  }}
                >

                  <div className="card-body p-4">

                    {/* ==================================
                        COMPANY + STATUS
                    ================================== */}

                    <div className="d-flex justify-content-between">

                      <div className="d-flex">

                        <div
                          className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center fw-bold"
                          style={{
                            width: "60px",
                            height: "60px",
                            fontSize: "22px",
                            flexShrink: 0,
                          }}
                        >

                          {job.company_name
                            ?.charAt(0)
                            ?.toUpperCase() || "C"}

                        </div>

                        <div className="ms-3">

                          <h5 className="fw-bold mb-1">

                            {job.job_title}

                          </h5>

                          <div className="text-muted">

                            {job.company_name ||
                              "Company"}

                          </div>

                        </div>

                      </div>


                      {/* STATUS */}

                      <span
                        className={`badge bg-${getBadge(
                          job.status
                        )} align-self-start`}
                      >

                        {job.status ||
                          "Applied"}

                      </span>

                    </div>


                    <hr />


                    {/* ==================================
                        JOB DETAILS
                    ================================== */}

                    <div className="mb-2">

                      <i className="bi bi-geo-alt-fill text-danger me-2"></i>

                      <strong>
                        Location :
                      </strong>{" "}

                      {job.location ||
                        "Not specified"}

                    </div>


                    <div className="mb-2">

                      <i className="bi bi-briefcase-fill text-primary me-2"></i>

                      <strong>
                        Job Type :
                      </strong>{" "}

                      {job.job_type ||
                        "Not specified"}

                    </div>


                    <div className="mb-2">

                      <i className="bi bi-house-fill text-success me-2"></i>

                      <strong>
                        Work Mode :
                      </strong>{" "}

                      {job.work_mode ||
                        "Not specified"}

                    </div>


                    <div className="mb-2">

                      <i className="bi bi-cash-stack text-success me-2"></i>

                      <strong>
                        Salary :
                      </strong>{" "}

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


                    <div className="mb-3 text-muted">

                      <i className="bi bi-calendar-check me-2"></i>

                      <strong>
                        Applied On :
                      </strong>{" "}

                      {job.applied_at
                        ? new Date(
                            job.applied_at
                          ).toLocaleDateString()
                        : "N/A"}

                    </div>


                    {/* ==================================
                        BUTTONS
                    ================================== */}

                    <div className="d-grid gap-2">

                      {/* VIEW DETAILS */}

                      <button
                        className="btn btn-primary rounded-pill"

                        onClick={() =>
                          navigate(
                            `/employee/job/${job.job_id}`,
                            {
                              state: {
                                from:
                                  "/employee/applied-jobs",
                              },
                            }
                          )
                        }
                      >

                        <i className="bi bi-eye me-2"></i>

                        View Job Details

                      </button>


                      {/* CANCEL APPLICATION */}

                      {job.application_id && (

                        <button
                          className="btn btn-outline-danger rounded-pill"

                          onClick={() =>
                            handleCancelApplication(
                              job.application_id
                            )
                          }
                        >

                          <i className="bi bi-x-circle me-2"></i>

                          Cancel Application

                        </button>

                      )}

                    </div>

                  </div>

                </div>

              </div>

            ))

          ) : (

            /* ==========================================
               NO JOBS
            ========================================== */

            <div className="col-12">

              <div className="card border-0 shadow rounded-4">

                <div className="card-body text-center py-5">

                  <i
                    className="bi bi-file-earmark-x text-muted"
                    style={{
                      fontSize: "70px",
                    }}
                  ></i>

                  <h4 className="fw-bold mt-3">
                    No Applied Jobs Found
                  </h4>

                  <p className="text-muted">

                    You haven't applied for any
                    jobs yet or no jobs match
                    your search.

                  </p>

                  <button
                    className="btn btn-primary rounded-pill px-4"

                    onClick={() =>
                      navigate(
                        "/employee/jobs"
                      )
                    }
                  >

                    <i className="bi bi-search me-2"></i>

                    Browse Jobs

                  </button>

                </div>

              </div>

            </div>

          )}

        </div>

      )}

    </div>
  );
};

export default AppliedJobs;