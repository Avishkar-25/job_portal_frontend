import React from "react";
import { useNavigate } from "react-router-dom";

import {
  FaBriefcase,
  FaUserTie,
  FaBuilding,
  FaSearch,
  FaArrowRight,
  FaCheckCircle,
  FaUsers,
} from "react-icons/fa";

import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page">

      {/* ==========================================
          NAVBAR
      ========================================== */}

      <nav className="navbar navbar-expand-lg navbar-dark home-navbar">
        <div className="container">

          <a
            className="navbar-brand fw-bold fs-3"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
            }}
          >
            <FaBriefcase className="me-2" />
            JobPortal
          </a>

          <div className="d-flex gap-2">

            <button
              className="btn btn-outline-light rounded-pill px-4"
              onClick={() => navigate("/employee/login")}
            >
              Employee Login
            </button>

            <button
              className="btn btn-light text-primary rounded-pill px-4"
              onClick={() => navigate("/company/login")}
            >
              Company Login
            </button>

          </div>

        </div>
      </nav>


      {/* ==========================================
          HERO SECTION
      ========================================== */}

      <section className="home-hero">

        <div className="container">

          <div className="row align-items-center min-vh-100 py-5">

            {/* ======================================
                LEFT CONTENT
            ====================================== */}

            <div className="col-lg-6 text-white mb-5 mb-lg-0">

              <span className="badge home-badge px-3 py-2 mb-4">
                <FaCheckCircle className="me-2" />
                Welcome to Job Portal
              </span>

              <h1 className="display-3 fw-bold lh-sm">

                Find Your{" "}

                <span className="text-warning">
                  Dream Job
                </span>

                <br />

                Build Your{" "}

                <span className="text-warning">
                  Future
                </span>

              </h1>

              <p className="lead mt-4 text-white-50">

                Discover thousands of opportunities from
                trusted companies. Build your career,
                apply for jobs and connect with the right
                employers.

              </p>


              {/* BUTTONS */}

              <div className="d-flex gap-3 mt-4 flex-wrap">

                <button
                  className="btn btn-warning btn-lg rounded-pill px-4 fw-semibold"
                  onClick={() =>
                    navigate("/employee/jobs")
                  }
                >

                  <FaSearch className="me-2" />

                  Find Jobs

                </button>


                <button
                  className="btn btn-outline-light btn-lg rounded-pill px-4"
                  onClick={() =>
                    navigate("/employee/register")
                  }
                >

                  Get Started

                  <FaArrowRight className="ms-2" />

                </button>

              </div>


              {/* STATISTICS */}

              <div className="row mt-5 g-3">

                <div className="col-4">

                  <div className="home-stat">

                    <h2 className="fw-bold mb-0">
                      500+
                    </h2>

                    <small>
                      Companies
                    </small>

                  </div>

                </div>


                <div className="col-4">

                  <div className="home-stat">

                    <h2 className="fw-bold mb-0">
                      10K+
                    </h2>

                    <small>
                      Jobs
                    </small>

                  </div>

                </div>


                <div className="col-4">

                  <div className="home-stat">

                    <h2 className="fw-bold mb-0">
                      20K+
                    </h2>

                    <small>
                      Candidates
                    </small>

                  </div>

                </div>

              </div>

            </div>


            {/* ======================================
                RIGHT CONTENT
            ====================================== */}

            <div className="col-lg-6">

              <div className="row g-4">

                {/* ==================================
                    EMPLOYEE
                ================================== */}

                <div className="col-md-6">

                  <div className="card home-option-card border-0 shadow-lg h-100">

                    <div className="card-body text-center p-4 p-xl-5">

                      <div className="home-icon employee-icon mx-auto mb-4">

                        <FaUserTie />

                      </div>

                      <h3 className="fw-bold mb-3">
                        Employee
                      </h3>

                      <p className="text-muted mb-4">

                        Find jobs that match your
                        skills and build your career.

                      </p>


                      <div className="small text-muted mb-4">

                        <div className="mb-2">

                          <FaCheckCircle
                            className="text-primary me-2"
                          />

                          Search thousands of jobs

                        </div>

                        <div className="mb-2">

                          <FaCheckCircle
                            className="text-primary me-2"
                          />

                          Apply instantly

                        </div>

                        <div>

                          <FaCheckCircle
                            className="text-primary me-2"
                          />

                          Track applications

                        </div>

                      </div>


                      <button
                        className="btn btn-primary w-100 rounded-pill mb-2"
                        onClick={() =>
                          navigate("/employee/register")
                        }
                      >

                        Register

                      </button>


                      <button
                        className="btn btn-outline-primary w-100 rounded-pill"
                        onClick={() =>
                          navigate("/employee/login")
                        }
                      >

                        Login

                      </button>

                    </div>

                  </div>

                </div>


                {/* ==================================
                    COMPANY
                ================================== */}

                <div className="col-md-6">

                  <div className="card home-option-card border-0 shadow-lg h-100">

                    <div className="card-body text-center p-4 p-xl-5">

                      <div className="home-icon company-icon mx-auto mb-4">

                        <FaBuilding />

                      </div>

                      <h3 className="fw-bold mb-3">
                        Company
                      </h3>

                      <p className="text-muted mb-4">

                        Find talented candidates and
                        grow your organization.

                      </p>


                      <div className="small text-muted mb-4">

                        <div className="mb-2">

                          <FaCheckCircle
                            className="text-success me-2"
                          />

                          Post job opportunities

                        </div>

                        <div className="mb-2">

                          <FaCheckCircle
                            className="text-success me-2"
                          />

                          Find talented candidates

                        </div>

                        <div>

                          <FaCheckCircle
                            className="text-success me-2"
                          />

                          Manage applications

                        </div>

                      </div>


                      <button
                        className="btn btn-success w-100 rounded-pill mb-2"
                        onClick={() =>
                          navigate("/company/register")
                        }
                      >

                        Register

                      </button>


                      <button
                        className="btn btn-outline-success w-100 rounded-pill"
                        onClick={() =>
                          navigate("/company/login")
                        }
                      >

                        Login

                      </button>

                    </div>

                  </div>

                </div>

              </div>


              {/* BOTTOM INFO */}

              <div className="home-bottom-info mt-4">

                <div className="d-flex align-items-center">

                  <div className="home-small-icon">

                    <FaUsers />

                  </div>

                  <div className="ms-3">

                    <h6 className="text-white fw-bold mb-1">
                      Connect. Apply. Grow.
                    </h6>

                    <small className="text-white-50">
                      Your career journey starts here.
                    </small>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
};

export default Home;