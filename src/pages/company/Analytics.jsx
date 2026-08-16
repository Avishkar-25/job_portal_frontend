import React, { useEffect, useState } from "react";

import {
  FaBriefcase,
  FaUsers,
  FaUserCheck,
  FaTimesCircle,
  FaChartBar,
  FaClock,
  FaCalendarCheck,
  FaCheckCircle,
  FaUserTimes,
} from "react-icons/fa";

import api from "../../services/api";

const Analytics = () => {

  // ==========================================
  // STATE
  // ==========================================

  const [analytics, setAnalytics] = useState({
    jobs: {
      total: 0,
      active: 0,
      closed: 0,
    },

    applications: {
      total: 0,
      pendingReview: 0,
      shortlisted: 0,
      interviewScheduled: 0,
      selected: 0,
      rejected: 0,
    },

    monthly: [],
  });

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  // ==========================================
  // GET ANALYTICS
  // ==========================================

  const getAnalytics = async () => {
    try {

      setLoading(true);
      setError("");

      const response = await api.get(
        "/company/analytics"
      );

      if (response.data.success) {

        setAnalytics(
          response.data.data
        );

      }

    } catch (error) {

      console.error(
        "Analytics error:",
        error
      );

      setError(
        error.response?.data?.message ||
        "Failed to load analytics"
      );

    } finally {

      setLoading(false);

    }
  };


  // ==========================================
  // LOAD DATA
  // ==========================================

  useEffect(() => {
    getAnalytics();
  }, []);


  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center py-5">

        <div
          className="spinner-border text-primary"
          role="status"
        ></div>

        <span className="ms-2 text-muted">
          Loading analytics...
        </span>

      </div>
    );
  }


  // ==========================================
  // ERROR
  // ==========================================

  if (error) {
    return (
      <div className="alert alert-danger">
        {error}
      </div>
    );
  }


  return (
    <div>

      {/* ==========================================
          PAGE HEADER
      ========================================== */}

      <div className="mb-4">

        <h2 className="fw-bold mb-1">
          Analytics Dashboard
        </h2>

        <p className="text-muted mb-0">
          Overview of your company's recruitment
          performance
        </p>

      </div>


      {/* ==========================================
          SUMMARY CARDS
      ========================================== */}

      <div className="row g-4">


        {/* TOTAL JOBS */}

        <div className="col-lg-3 col-md-6">

          <div className="profile-section-card h-100">

            <div className="card-body p-4">

              <div className="d-flex align-items-center gap-3">

                <div className="section-icon">
                  <FaBriefcase />
                </div>

                <div>

                  <h3 className="fw-bold mb-1">
                    {analytics.jobs.total}
                  </h3>

                  <span className="text-muted small">
                    Total Jobs
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>


        {/* APPLICATIONS */}

        <div className="col-lg-3 col-md-6">

          <div className="profile-section-card h-100">

            <div className="card-body p-4">

              <div className="d-flex align-items-center gap-3">

                <div className="section-icon">
                  <FaUsers />
                </div>

                <div>

                  <h3 className="fw-bold mb-1">
                    {analytics.applications.total}
                  </h3>

                  <span className="text-muted small">
                    Applications
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>


        {/* SHORTLISTED */}

        <div className="col-lg-3 col-md-6">

          <div className="profile-section-card h-100">

            <div className="card-body p-4">

              <div className="d-flex align-items-center gap-3">

                <div className="section-icon">
                  <FaUserCheck />
                </div>

                <div>

                  <h3 className="fw-bold mb-1">
                    {analytics.applications.shortlisted}
                  </h3>

                  <span className="text-muted small">
                    Shortlisted
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>


        {/* CLOSED JOBS */}

        <div className="col-lg-3 col-md-6">

          <div className="profile-section-card h-100">

            <div className="card-body p-4">

              <div className="d-flex align-items-center gap-3">

                <div className="section-icon">
                  <FaTimesCircle />
                </div>

                <div>

                  <h3 className="fw-bold mb-1">
                    {analytics.jobs.closed}
                  </h3>

                  <span className="text-muted small">
                    Closed Jobs
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>


      {/* ==========================================
          ANALYTICS SECTIONS
      ========================================== */}

      <div className="row g-4 mt-1">


        {/* ==========================================
            MONTHLY OVERVIEW
        ========================================== */}

        <div className="col-lg-8">

          <div className="profile-section-card h-100">

            <div className="section-header">

              <div className="d-flex align-items-center gap-3">

                <div className="section-icon">
                  <FaChartBar />
                </div>

                <div>

                  <h4 className="mb-1">
                    Monthly Recruitment Overview
                  </h4>

                  <p className="mb-0">
                    Jobs and applications
                  </p>

                </div>

              </div>

            </div>


            {/* MONTHLY DATA */}

            <div className="card-body p-4">

              {analytics.monthly.length === 0 ? (

                <div className="text-center text-muted py-5">

                  <FaChartBar
                    size={40}
                    className="mb-3"
                  />

                  <h6>
                    No monthly data available
                  </h6>

                </div>

              ) : (

                <div className="table-responsive">

                  <table className="table align-middle mb-0">

                    <thead>

                      <tr>

                        <th>
                          Month
                        </th>

                        <th>
                          Jobs
                        </th>

                        <th>
                          Applications
                        </th>

                      </tr>

                    </thead>

                    <tbody>

                      {analytics.monthly.map(
                        (item) => (

                          <tr key={item.month}>

                            <td className="fw-semibold">
                              {new Date(
                                `${item.month}-01`
                              ).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  year: "numeric",
                                }
                              )}
                            </td>

                            <td>
                              {item.jobs}
                            </td>

                            <td>
                              {item.applications}
                            </td>

                          </tr>

                        )
                      )}

                    </tbody>

                  </table>

                </div>

              )}

            </div>

          </div>

        </div>


        {/* ==========================================
            QUICK STATISTICS
        ========================================== */}

        <div className="col-lg-4">

          <div className="profile-section-card h-100">

            <div className="section-header">

              <div className="d-flex align-items-center gap-3">

                <div className="section-icon">
                  <FaChartBar />
                </div>

                <div>

                  <h4 className="mb-1">
                    Quick Statistics
                  </h4>

                  <p className="mb-0">
                    Current recruitment status
                  </p>

                </div>

              </div>

            </div>


            <div className="card-body p-4">


              {/* ACTIVE JOBS */}

              <div className="d-flex justify-content-between mb-3">

                <span className="text-muted">

                  <FaBriefcase className="me-2 text-primary" />

                  Active Jobs

                </span>

                <strong>
                  {analytics.jobs.active}
                </strong>

              </div>


              {/* PENDING REVIEW */}

              <div className="d-flex justify-content-between mb-3">

                <span className="text-muted">

                  <FaClock className="me-2 text-primary" />

                  Pending Review

                </span>

                <strong>
                  {analytics.applications.pendingReview}
                </strong>

              </div>


              {/* INTERVIEW */}

              <div className="d-flex justify-content-between mb-3">

                <span className="text-muted">

                  <FaCalendarCheck className="me-2 text-primary" />

                  Interview Scheduled

                </span>

                <strong>
                  {analytics.applications.interviewScheduled}
                </strong>

              </div>


              {/* SELECTED */}

              <div className="d-flex justify-content-between mb-3">

                <span className="text-muted">

                  <FaCheckCircle className="me-2 text-primary" />

                  Selected

                </span>

                <strong>
                  {analytics.applications.selected}
                </strong>

              </div>


              {/* REJECTED */}

              <div className="d-flex justify-content-between">

                <span className="text-muted">

                  <FaUserTimes className="me-2 text-primary" />

                  Rejected

                </span>

                <strong>
                  {analytics.applications.rejected}
                </strong>

              </div>


            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Analytics;