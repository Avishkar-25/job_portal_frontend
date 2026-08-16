import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./Applicants.css";

import {
  FaUsers,
  FaSearch,
  FaTimes,
  FaBriefcase,
  FaTag,
  FaEnvelope,
  FaPhone,
  FaCalendarAlt,
  FaFilePdf,
  FaFile,
  FaUser,
  FaComment,
  FaInbox,
  FaInfoCircle,
  FaSyncAlt,
} from "react-icons/fa";

const Applicants = () => {
  const navigate = useNavigate();

  const [showInterviewModal, setShowInterviewModal] = useState(false);

const [interviewData, setInterviewData] = useState({
  application_id: "",
  date: "",
  time: "",
  location: "",
});
  const [selectedJob, setSelectedJob] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  /* =========================================
     GET APPLICANTS
  ========================================= */

  useEffect(() => {
    getApplicants();
  }, []);

  const getApplicants = async () => {
    try {
      setLoading(true);

      const res = await api.get("/company/applicants");

      if (res.data.success) {
        setApplicants(res.data.applicants);
      }
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Failed to load applicants"
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================================
     UPDATE STATUS
  ========================================= */

 const updateStatus = async (application_id, status) => {
  try {

    // Interview select केल्यावर form उघड
    if (status === "Interview") {

      setInterviewData({
        application_id,
        date: "",
        time: "",
        location: "",
      });

      setShowInterviewModal(true);

      return;
    }

    const res = await api.put(
      `/company/applicants/${application_id}`,
      { status }
    );

    alert(res.data.message || "Status updated successfully");

    getApplicants();

  } catch (error) {

    console.log(error);

    alert(
      error.response?.data?.message ||
      "Status Update Failed"
    );
  }
};

  /* =========================================
     JOB FILTER OPTIONS
  ========================================= */

  const jobs = [
    "All",
    ...new Set(
      applicants.map((item) => item.job_title)
    ),
  ];

  /* =========================================
     STATUS OPTIONS
  ========================================= */

  const statusOptions = [
    "Applied",
    "Pending",
    "Shortlisted",
    "Interview",
    "Selected",
    "Rejected",
  ];

  const scheduleInterview = async (e) => {
  e.preventDefault();

  if (!interviewData.date) {
    alert("Please select interview date");
    return;
  }

  if (!interviewData.time) {
    alert("Please select interview time");
    return;
  }

  if (!interviewData.location.trim()) {
    alert("Please enter interview location");
    return;
  }

  try {

    const res = await api.put(
      `/company/applicants/${interviewData.application_id}/interview`,
      {
        date: interviewData.date,
        time: interviewData.time,
        location: interviewData.location,
      }
    );

    alert(
      res.data.message ||
      "Interview scheduled successfully"
    );

    setShowInterviewModal(false);

    setInterviewData({
      application_id: "",
      date: "",
      time: "",
      location: "",
    });

    getApplicants();

  } catch (error) {

    console.log("Interview Error:", error);

    alert(
      error.response?.data?.message ||
      "Failed to schedule interview"
    );
  }
};
  /* =========================================
     FILTER APPLICANTS
  ========================================= */

  const filteredApplicants = applicants.filter((item) => {
    const jobMatch =
      selectedJob === "All" ||
      item.job_title === selectedJob;

    const statusMatch =
      selectedStatus === "All" ||
      item.status === selectedStatus;

    const searchValue = searchTerm
      .trim()
      .toLowerCase();

    const searchMatch =
      item.full_name
        ?.toLowerCase()
        .includes(searchValue) ||
      item.email
        ?.toLowerCase()
        .includes(searchValue);

    return (
      jobMatch &&
      statusMatch &&
      searchMatch
    );
  });

  /* =========================================
     STATUS CLASS
  ========================================= */

  const getStatusClass = (status) => {
    switch (status) {
      case "Applied":
        return "status-applied";

      case "Pending":
        return "status-pending";

      case "Shortlisted":
        return "status-shortlisted";

      case "Interview":
        return "status-interview";

      case "Selected":
        return "status-selected";

      case "Rejected":
        return "status-rejected";

      default:
        return "status-default";
    }
  };

  /* =========================================
     JSX
  ========================================= */

  return (
    <div className="applicants-page">

      {/* =====================================
          HEADER
      ===================================== */}

      <div className="applicants-header">

        <div className="header-content">

          <div className="header-icon">
            <FaUsers />
          </div>

          <div>
            <h2>Job Applicants</h2>

            <p>
              Manage and track all candidate
              applications
            </p>
          </div>

        </div>

        {/* HEADER STATS */}

        <div className="header-stats">

          <div className="header-stat">
            <span>Total Applicants</span>

            <strong>
              {applicants.length}
            </strong>
          </div>

          <div className="header-stat">
            <span>Showing</span>

            <strong>
              {filteredApplicants.length}
            </strong>
          </div>

        </div>

      </div>


      {/* =====================================
          MAIN CARD
      ===================================== */}

      <div className="applicants-card">

        {/* ===================================
            SEARCH
        =================================== */}

        <div className="search-wrapper">

          <FaSearch className="search-icon" />

          <input
            type="text"
            placeholder="Search candidate name or email..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
          />

          {searchTerm && (
            <button
              type="button"
              className="clear-search"
              onClick={() =>
                setSearchTerm("")
              }
            >
              <FaTimes />
            </button>
          )}

          <button
            type="button"
            className="search-btn"
          >
            <FaSearch />

            <span>Search</span>
          </button>

        </div>


        {/* ===================================
            FILTERS
        =================================== */}

        <div className="filters-box">

          {/* JOB FILTER */}

          <div className="filter-section">

            <div className="filter-title">

              <FaBriefcase />

              <span>
                Filter by Job
              </span>

            </div>

            <div className="filter-buttons">

              {jobs.map((job) => (
                <button
                  key={job}
                  type="button"
                  className={
                    selectedJob === job
                      ? "filter-btn active"
                      : "filter-btn"
                  }
                  onClick={() =>
                    setSelectedJob(job)
                  }
                >
                  {job}
                </button>
              ))}

            </div>

          </div>


          {/* STATUS FILTER */}

          <div className="filter-section">

            <div className="filter-title">

              <FaTag />

              <span>
                Filter by Status
              </span>

            </div>

            <div className="filter-buttons">

              <button
                type="button"
                className={
                  selectedStatus === "All"
                    ? "filter-btn status-active"
                    : "filter-btn"
                }
                onClick={() =>
                  setSelectedStatus("All")
                }
              >
                All
              </button>

              {statusOptions.map((status) => (
                <button
                  key={status}
                  type="button"
                  className={
                    selectedStatus === status
                      ? "filter-btn status-active"
                      : "filter-btn"
                  }
                  onClick={() =>
                    setSelectedStatus(status)
                  }
                >
                  {status}
                </button>
              ))}

            </div>

          </div>

        </div>


        {/* ===================================
            TABLE
        =================================== */}

        <div className="table-wrapper">

          <table className="applicants-table">

            <thead>

              <tr>

                <th>#</th>

                <th>
                  Candidate
                </th>

                <th>
                  Email
                </th>

                <th>
                  Phone
                </th>

                <th>
                  Job
                </th>

                <th>
                  Experience
                </th>

                <th>
                  Actions
                </th>

              </tr>

            </thead>


            <tbody>

              {/* =================================
                  LOADING
              ================================= */}

              {loading ? (

                <tr>

                  <td
                    colSpan="7"
                    className="empty-state"
                  >

                    <div className="loading-box">

                      <div className="spinner"></div>

                      <p>
                        Loading applicants...
                      </p>

                    </div>

                  </td>

                </tr>

              ) : filteredApplicants.length > 0 ? (

                /* =================================
                   APPLICANTS
                ================================= */

                filteredApplicants.map(
                  (item, index) => (

                    <tr
                      key={
                        item.application_id
                      }
                    >

                      {/* NUMBER */}

                      <td>

                        <span className="row-number">
                          {index + 1}
                        </span>

                      </td>


                      {/* CANDIDATE */}

                      <td>

                        <div className="candidate">

                          <div className="candidate-avatar">

                            {item.full_name
                              ?.charAt(0)
                              ?.toUpperCase() ||
                              "?"}

                          </div>

                          <div>

                            <strong>
                              {item.full_name}
                            </strong>

                            <small>
                              ID:{" "}
                              {item.employee_id ||
                                "N/A"}
                            </small>

                          </div>

                        </div>

                      </td>


                      {/* EMAIL */}

                      <td>

                        <a
                          href={`mailto:${item.email}`}
                          className="email-link"
                        >

                          <FaEnvelope />

                          {item.email}

                        </a>

                      </td>


                      {/* PHONE */}

                      <td>

                        <span className="phone-text">

                          <FaPhone />

                          {item.phone ||
                            "N/A"}

                        </span>

                      </td>


                      {/* JOB */}

                      <td>

                        <span className="job-badge">
                          {item.job_title}
                        </span>

                      </td>


                      {/* EXPERIENCE */}

                      <td>

                        <span className="experience">

                          <FaCalendarAlt />

                          {item.experience ||
                            "0"}{" "}
                          yrs

                        </span>

                      </td>


                      {/* ACTIONS */}

                      <td>

                        <div className="actions-area">

                          {/* TOP ACTION */}

                          <div className="action-top">

                            <select
                              className={`status-select ${getStatusClass(
                                item.status
                              )}`}
                              value={
                                item.status
                              }
                              onChange={(e) =>
                                updateStatus(
                                  item.application_id,
                                  e.target.value
                                )
                              }
                            >

                              {statusOptions.map(
                                (status) => (

                                  <option
                                    key={
                                      status
                                    }
                                    value={
                                      status
                                    }
                                  >
                                    {status}
                                  </option>

                                )
                              )}

                            </select>


                            {/* DATE */}

                            <span className="applied-date">

                              <FaCalendarAlt />

                              {item.applied_at
                                ? new Date(
                                    item.applied_at
                                  ).toLocaleDateString(
                                    "en-IN"
                                  )
                                : "N/A"}

                            </span>

                          </div>


                          {/* ACTION BUTTONS */}

                          <div className="action-buttons">

                            {/* RESUME */}

                            {item.resume ? (

  <a
    href={
      item.resume.startsWith("/uploads")
        ? `http://localhost:5000${item.resume}`
        : `http://localhost:5000/uploads/${item.resume}`
    }
    target="_blank"
    rel="noopener noreferrer"
    className="action-btn resume-btn"
  >

    <FaFilePdf />

    Resume

  </a>

) : (

  <button
    disabled
    className="action-btn disabled-btn"
  >

    <FaFile />

    No Resume

  </button>

)}


                            {/* PROFILE */}

                            <button
                              type="button"
                              className="action-btn profile-btn"
                              onClick={() =>
                                navigate(
                                  `/company/employee-profile/${item.employee_id}`
                                )
                              }
                            >

                              <FaUser />

                              Profile

                            </button>


                            

                          </div>

                        </div>

                      </td>

                    </tr>

                  )
                )

              ) : (

                /* =================================
                   EMPTY
                ================================= */

                <tr>

                  <td
                    colSpan="7"
                    className="empty-state"
                  >

                    <div className="empty-icon">

                      <FaInbox />

                    </div>

                    <h5>
                      No Applicants Found
                    </h5>

                    <p>
                      Try adjusting your
                      filters or search
                      criteria.
                    </p>

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>


        {/* =====================================
            FOOTER
        ===================================== */}

        <div className="applicants-footer">

          <small>

            <FaInfoCircle />

            Showing{" "}

            <strong>
              {filteredApplicants.length}
            </strong>{" "}

            of{" "}

            <strong>
              {applicants.length}
            </strong>{" "}

            applicants

          </small>


          <div className="footer-actions">

            <button
              type="button"
              onClick={getApplicants}
            >

              <FaSyncAlt />

              Refresh

            </button>

          </div>

        </div>

      </div>
{/* ==========================================
    INTERVIEW MODAL
========================================== */}

{showInterviewModal && (

  <div className="interview-modal-overlay">

    <div className="interview-modal">

      <div className="interview-modal-header">

        <div>
          <h3>Schedule Interview</h3>

          <p>
            Enter interview details for the candidate
          </p>
        </div>

        <button
          type="button"
          className="interview-close-btn"
          onClick={() => setShowInterviewModal(false)}
        >
          <FaTimes />
        </button>

      </div>

      <form onSubmit={scheduleInterview}>

        {/* DATE */}

        <div className="interview-form-group">

          <label>
            <FaCalendarAlt />
            Interview Date
          </label>

          <input
            type="date"
            value={interviewData.date}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) =>
              setInterviewData({
                ...interviewData,
                date: e.target.value,
              })
            }
          />

        </div>


        {/* TIME */}

        <div className="interview-form-group">

          <label>
            <FaCalendarAlt />
            Interview Time
          </label>

          <input
            type="time"
            value={interviewData.time}
            onChange={(e) =>
              setInterviewData({
                ...interviewData,
                time: e.target.value,
              })
            }
          />

        </div>


        {/* LOCATION */}

        <div className="interview-form-group">

          <label>
            <FaBriefcase />
            Interview Location
          </label>

          <input
            type="text"
            placeholder="e.g. Company Office, Ahmednagar"
            value={interviewData.location}
            onChange={(e) =>
              setInterviewData({
                ...interviewData,
                location: e.target.value,
              })
            }
          />

        </div>


        {/* INFO */}

        <div className="interview-info">

          <FaInfoCircle />

          <span>
            The candidate will receive the interview
            date, time and location by email.
          </span>

        </div>


        {/* ACTIONS */}

        <div className="interview-modal-actions">

          <button
            type="button"
            className="interview-cancel-btn"
            onClick={() => setShowInterviewModal(false)}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="interview-schedule-btn"
          >
            <FaCalendarAlt />
            Schedule Interview
          </button>

        </div>

      </form>

    </div>

  </div>

)}
    </div>
  );
};

export default Applicants;