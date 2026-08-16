import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaSignInAlt,
  FaBriefcase,
  FaShieldAlt,
} from "react-icons/fa";

import api from "../../../services/api";

const EmployeeLogin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // ==========================================
  // INPUT CHANGE
  // ==========================================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ==========================================
  // LOGIN
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email.trim()) {
      alert("Please enter your email");
      return;
    }

    if (!formData.password.trim()) {
      alert("Please enter your password");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post(
        "/employee/login",
        formData
      );

      if (res.data.success) {
        // JWT Token
        localStorage.setItem(
          "token",
          res.data.token
        );

        // Logged in user
        localStorage.setItem(
          "user",
          JSON.stringify(res.data.user)
        );

        alert(
          res.data.message ||
            "Login successful"
        );

        navigate("/employee/dashboard");
      } else {
        alert(
          res.data.message ||
            "Login Failed"
        );
      }
    } catch (err) {
      console.error("LOGIN ERROR:", err);

      alert(
        err.response?.data?.message ||
          "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center py-5"
      style={{
        background:
          "linear-gradient(135deg, #f8fafc 0%, #e7f0ff 100%)",
      }}
    >
      <div className="container">

        <div className="row justify-content-center">

          <div className="col-12 col-md-8 col-lg-6 col-xl-5">

            {/* ======================================
                MAIN CARD
            ====================================== */}

            <div className="card border-0 shadow-lg rounded-4 overflow-hidden">

              {/* ======================================
                  HEADER
              ====================================== */}

              <div
                className="text-white text-center p-4"
                style={{
                  background:
                    "linear-gradient(135deg, #0f172a, #1e3a8a, #2563eb)",
                }}
              >

                <div
                  className="mx-auto mb-3 rounded-circle d-flex align-items-center justify-content-center bg-white text-primary"
                  style={{
                    width: "70px",
                    height: "70px",
                    fontSize: "28px",
                  }}
                >
                  <FaSignInAlt />
                </div>

                <h2 className="fw-bold mb-1">
                  Employee Login
                </h2>

                <p className="mb-0 opacity-75">
                  Welcome back! Login to continue
                </p>

              </div>

              {/* ======================================
                  BODY
              ====================================== */}

              <div className="card-body p-4 p-md-5">

                {/* INFO */}

                <div
                  className="alert border-0 rounded-3 mb-4"
                  style={{
                    background: "#e7f1ff",
                    color: "#1e3a8a",
                  }}
                >

                  <div className="d-flex align-items-start">

                    <FaBriefcase
                      className="me-3 mt-1"
                      size={20}
                    />

                    <div>

                      <strong>
                        Welcome to JobPortal
                      </strong>

                      <p className="small mb-0 mt-1">
                        Login to search jobs,
                        apply for opportunities
                        and manage your applications.
                      </p>

                    </div>

                  </div>

                </div>

                <form onSubmit={handleSubmit}>

                  {/* ==================================
                      EMAIL
                  ================================== */}

                  <div className="mb-4">

                    <label className="form-label fw-semibold">
                      Email Address
                    </label>

                    <div className="input-group input-group-lg">

                      <span className="input-group-text bg-light">
                        <FaEnvelope className="text-secondary" />
                      </span>

                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        autoComplete="email"
                        placeholder="Enter your email"
                        required
                      />

                    </div>

                  </div>

                  {/* ==================================
                      PASSWORD
                  ================================== */}

                  <div className="mb-2">

                    <label className="form-label fw-semibold">
                      Password
                    </label>

                    <div className="input-group input-group-lg">

                      <span className="input-group-text bg-light">
                        <FaLock className="text-secondary" />
                      </span>

                      <input
                        type={
                          showPassword
                            ? "text"
                            : "password"
                        }
                        className="form-control"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        autoComplete="current-password"
                        placeholder="Enter your password"
                        required
                      />

                      <button
                        type="button"
                        className="btn btn-light border"
                        onClick={() =>
                          setShowPassword(
                            !showPassword
                          )
                        }
                      >
                        {showPassword ? (
                          <FaEyeSlash />
                        ) : (
                          <FaEye />
                        )}
                      </button>

                    </div>

                  </div>

                  {/* ==================================
                      FORGOT PASSWORD
                  ================================== */}

                  <div className="text-end mb-4">

                    <Link
                      to="/employee/forgot-password"
                      className="text-primary fw-semibold text-decoration-none"
                    >
                      <FaLock
                        className="me-1"
                        size={13}
                      />
                      Forgot Password?
                    </Link>

                  </div>

                  {/* ==================================
                      LOGIN BUTTON
                  ================================== */}

                  <button
                    type="submit"
                    className="btn btn-primary btn-lg w-100 rounded-pill fw-semibold"
                    disabled={loading}
                  >

                    {loading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                        ></span>

                        Logging in...
                      </>
                    ) : (
                      <>
                        <FaSignInAlt className="me-2" />

                        Login
                      </>
                    )}

                  </button>

                </form>

                {/* ==================================
                    SECURITY INFO
                ================================== */}

                <div
                  className="rounded-3 p-3 mt-4"
                  style={{
                    background: "#f8fafc",
                    border: "1px solid #e2e8f0",
                  }}
                >

                  <div className="d-flex align-items-center">

                    <FaShieldAlt
                      className="text-success me-2"
                    />

                    <small className="text-muted">
                      Your login information is
                      securely protected.
                    </small>

                  </div>

                </div>

                {/* ==================================
                    REGISTER
                ================================== */}

                <div className="text-center mt-4 pt-3 border-top">

                  <span className="text-muted">
                    Don't have an account?
                  </span>

                  <Link
                    to="/employee/register"
                    className="ms-2 text-primary fw-semibold text-decoration-none"
                  >
                    Create Account
                  </Link>

                </div>

              </div>

            </div>

            {/* ======================================
                FOOTER
            ====================================== */}

            <div className="text-center mt-3">

              <small className="text-muted">

                <FaBriefcase className="me-1" />

                JobPortal • Find your next opportunity

              </small>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default EmployeeLogin;