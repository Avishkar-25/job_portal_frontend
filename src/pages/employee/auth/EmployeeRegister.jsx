import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaUserPlus,
  FaEye,
  FaEyeSlash,
  FaBriefcase,
  FaCheckCircle,
} from "react-icons/fa";

import api from "../../../services/api";

const EmployeeRegister = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    user_type: "employee",
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
  // REGISTER
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("Please enter your name");
      return;
    }

    if (!formData.email.trim()) {
      alert("Please enter your email");
      return;
    }

    if (!formData.password.trim()) {
      alert("Please enter your password");
      return;
    }

    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/employee/register", {
        ...formData,
        user_type: "employee",
      });

      alert(res.data.message || "Registration successful");

      navigate("/employee/login");
    } catch (err) {
      console.error("REGISTER ERROR:", err);

      alert(
        err.response?.data?.message ||
          "Registration Failed"
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
                  <FaUserPlus />
                </div>

                <h2 className="fw-bold mb-1">
                  Create Employee Account
                </h2>

                <p className="mb-0 opacity-75">
                  Join JobPortal and find your dream job
                </p>

              </div>

              {/* ======================================
                  FORM BODY
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
                      <strong>Employee Registration</strong>

                      <p className="small mb-0 mt-1">
                        Create your account to browse jobs,
                        apply for positions and manage your
                        applications.
                      </p>
                    </div>

                  </div>

                </div>

                <form onSubmit={handleSubmit}>

                  {/* ==================================
                      NAME
                  ================================== */}

                  <div className="mb-4">

                    <label className="form-label fw-semibold">
                      Full Name
                    </label>

                    <div className="input-group input-group-lg">

                      <span className="input-group-text bg-light">
                        <FaUser className="text-secondary" />
                      </span>

                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={handleChange}
                        autoComplete="name"
                        required
                      />

                    </div>

                  </div>

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
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        autoComplete="email"
                        required
                      />

                    </div>

                  </div>

                  {/* ==================================
                      PASSWORD
                  ================================== */}

                  <div className="mb-4">

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
                        placeholder="Create a password"
                        value={formData.password}
                        onChange={handleChange}
                        autoComplete="new-password"
                        required
                      />

                      <button
                        type="button"
                        className="btn btn-light border"
                        onClick={() =>
                          setShowPassword(!showPassword)
                        }
                      >
                        {showPassword ? (
                          <FaEyeSlash />
                        ) : (
                          <FaEye />
                        )}
                      </button>

                    </div>

                    <div className="form-text">
                      Password must be at least 6 characters.
                    </div>

                  </div>

                  {/* ==================================
                      SECURITY INFO
                  ================================== */}

                  <div
                    className="rounded-3 p-3 mb-4"
                    style={{
                      background: "#f8fafc",
                      border: "1px solid #e2e8f0",
                    }}
                  >

                    <div className="d-flex align-items-center">

                      <FaCheckCircle
                        className="text-success me-2"
                      />

                      <small className="text-muted">
                        Your account information is securely
                        stored.
                      </small>

                    </div>

                  </div>

                  {/* ==================================
                      REGISTER BUTTON
                  ================================== */}

                  <button
                    type="submit"
                    className="btn btn-primary btn-lg w-100 rounded-pill fw-semibold"
                    disabled={loading}
                  >

                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Creating Account...
                      </>
                    ) : (
                      <>
                        <FaUserPlus className="me-2" />
                        Create Account
                      </>
                    )}

                  </button>

                </form>

                {/* ==================================
                    LOGIN
                ================================== */}

                <div className="text-center mt-4 pt-3 border-top">

                  <span className="text-muted">
                    Already have an account?
                  </span>

                  <button
                    type="button"
                    className="btn btn-link text-primary fw-semibold text-decoration-none"
                    onClick={() =>
                      navigate("/employee/login")
                    }
                  >
                    Login
                  </button>

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

export default EmployeeRegister;