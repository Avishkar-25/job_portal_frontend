
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getSavedJobs,
  removeSavedJob,
  applyJob,
  cancelApplication,
} from "../../services/employeeJobApi";

const SavedJobs = () => {
  const navigate = useNavigate();

  const [savedJobs, setSavedJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
  const user_id = user?.user_id;

  // ==========================================
  // LOAD SAVED JOBS
  // ==========================================

  useEffect(() => {
    if (user_id) {
      loadSavedJobs();
    }
  }, [user_id]);

  const loadSavedJobs = async () => {
    try {
      const res = await getSavedJobs(user_id);

      if (res.data.success) {
        setSavedJobs(res.data.jobs);

        const applied = res.data.jobs
          .filter((job) => job.application_id)
          .map((job) => job.job_id);

        setAppliedJobs(applied);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // ==========================================
  // APPLY JOB
  // ==========================================

  const handleApply = async (job_id) => {
    try {
      const res = await applyJob(job_id, {
        user_id,
      });

      if (res.data.success) {
        alert(
          res.data.message ||
            "Job applied successfully"
        );

        setAppliedJobs((prev) => [
          ...prev,
          job_id,
        ]);

        loadSavedJobs();
      }
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Unable to apply for this job"
      );
    }
  };

  // ==========================================
  // CANCEL APPLICATION
  // ==========================================

  const handleCancelApplication = async (job_id) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this application?"
    );

    if (!confirmCancel) {
      return;
    }

    try {
      const res = await cancelApplication(job_id, {
        user_id,
      });

      if (res.data.success) {
        alert(
          res.data.message ||
            "Application cancelled successfully"
        );

        setAppliedJobs((prev) =>
          prev.filter(
            (id) => id !== job_id
          )
        );

        loadSavedJobs();
      }
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Unable to cancel application"
      );
    }
  };

  // ==========================================
  // REMOVE SAVED JOB
  // ==========================================

  const handleRemove = async (job_id) => {
    try {
      const res = await removeSavedJob(job_id, {
        user_id,
      });

      alert(res.data.message);

      loadSavedJobs();
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  // ==========================================
  // JSX
  // ==========================================

  return (
    <div className="container-fluid py-4">

      {/* HEADER */}

      <div className="card border-0 shadow rounded-4 bg-danger text-white mb-4">

        <div className="card-body d-flex justify-content-between align-items-center flex-wrap">

          <div>
            <h2 className="fw-bold">
              ❤️ Saved Jobs
            </h2>

            <p className="mb-0">
              Jobs saved for later.
            </p>
          </div>

          <span className="badge bg-light text-dark fs-6">
            Total Saved : {savedJobs.length}
          </span>

        </div>
      </div>


      {/* SAVED JOBS */}

      <div className="row g-4">

        {savedJobs.length > 0 ? (

          savedJobs.map((job) => {

            const isApplied =
              appliedJobs.includes(
                job.job_id
              );

            return (

              <div
                className="col-lg-4 col-md-6"
                key={job.saved_id}
              >

                <div className="card border-0 shadow-sm rounded-4 h-100">

                  <div className="card-body text-center">

                    {/* COMPANY LOGO */}

                    <img
                      src={
                        job.logo
                          ? `http://localhost:5000/uploads/${job.logo}`
                          : `https://via.placeholder.com/90`
                      }
                      alt="Company Logo"
                      className="rounded-circle border shadow-sm mb-3"
                      style={{
                        width: "90px",
                        height: "90px",
                        objectFit: "cover",
                      }}
                    />

                    {/* COMPANY */}

                    <h5 className="fw-bold text-primary mb-1">
                      {job.company_name}
                    </h5>

                    {/* JOB */}

                    <h6 className="fw-semibold mb-3">
                      {job.job_title}
                    </h6>

                    <hr />

                    {/* DETAILS */}

                    <div className="text-start">

                      <p className="mb-2">
                        📍 <strong>Location :</strong>{" "}
                        {job.location}
                      </p>

                      <p className="mb-2">
                        💼 <strong>Job Type :</strong>{" "}
                        {job.job_type}
                      </p>

                      <p className="mb-2">
                        🏠 <strong>Work Mode :</strong>{" "}
                        {job.work_mode}
                      </p>

                      <p className="mb-2 text-success fw-bold">
                        ₹
                        {Number(
                          job.salary_min || 0
                        ).toLocaleString()}{" "}
                        - ₹
                        {Number(
                          job.salary_max || 0
                        ).toLocaleString()}
                      </p>

                      <p className="text-muted small">
                        Saved On :{" "}
                        {job.saved_at
                          ? new Date(
                              job.saved_at
                            ).toLocaleDateString()
                          : "N/A"}
                      </p>

                    </div>


                    {/* BUTTONS */}

                    <div className="d-grid gap-2 mt-3">

                      {/* APPLY / CANCEL */}

                      {!isApplied ? (

                        <button
                          type="button"
                          className="btn btn-primary rounded-pill"
                          onClick={() =>
                            handleApply(
                              job.job_id
                            )
                          }
                        >
                          Apply Now
                        </button>

                      ) : (

                        <button
                          type="button"
                          className="btn btn-outline-danger rounded-pill"
                          onClick={() =>
                            handleCancelApplication(
                              job.job_id
                            )
                          }
                        >
                          Cancel Application
                        </button>

                      )}


                      {/* VIEW DETAILS */}

                      <button
                        type="button"
                        className="btn btn-outline-primary rounded-pill"
                        onClick={() =>
                          navigate(
                            `/employee/job/${job.job_id}`
                          )
                        }
                      >
                        View Details
                      </button>


                      {/* REMOVE */}

                      <button
                        type="button"
                        className="btn btn-outline-secondary rounded-pill"
                        onClick={() =>
                          handleRemove(
                            job.job_id
                          )
                        }
                      >
                        Remove
                      </button>

                    </div>

                  </div>

                </div>

              </div>

            );
          })

        ) : (

          <div className="col-12">

            <div className="alert alert-warning text-center rounded-4 py-5">

              <h4>No Saved Jobs</h4>

              <p className="mb-0">
                You haven't saved any jobs yet.
              </p>

            </div>

          </div>

        )}

      </div>

    </div>
  );
};

export default SavedJobs;

