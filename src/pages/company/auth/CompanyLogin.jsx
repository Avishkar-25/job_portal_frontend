import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaBuilding,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaSignInAlt,
  FaUserPlus,
  FaKey,
} from "react-icons/fa";

import { companyLogin } from "../../../services/companyService";

const CompanyLogin = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // ==========================================
  // INPUT CHANGE
  // ==========================================

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ==========================================
  // LOGIN
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await companyLogin(form);

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      if (res.data.user) {
        localStorage.setItem(
          "user",
          JSON.stringify(res.data.user)
        );
      }

      localStorage.setItem("userType", "company");

      alert(res.data.message || "Login successful");

      navigate("/company/dashboard");

    } catch (err) {
      console.log("COMPANY LOGIN ERROR:", err);

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
      className="min-vh-100 d-flex align-items-center py-5"
      style={{
        background:
          "linear-gradient(135deg, #0f172a, #1e3a8a, #2563eb)",
      }}
    >
      <div className="container">

        <div className="row justify-content-center">

          <div className="col-xl-5 col-lg-6 col-md-8 col-sm-10">

            {/* ==========================================
                LOGIN CARD
            ========================================== */}

            <div
              className="card border-0 shadow-lg"
              style={{
                borderRadius: "24px",
                overflow: "hidden",
              }}
            >

              {/* ==========================================
                  HEADER
              ========================================== */}

              <div
                className="text-white text-center p-4 p-md-5"
                style={{
                  background:
                    "linear-gradient(135deg, #0f172a, #1e3a8a, #2563eb)",
                }}
              >

                <div
                  className="mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle"
                  style={{
                    width: "75px",
                    height: "75px",
                    background: "rgba(255,255,255,0.15)",
                    fontSize: "30px",
                  }}
                >
                  <FaBuilding />
                </div>

                <h2 className="fw-bold mb-2">
                  Company Login
                </h2>

                <p className="mb-0 opacity-75">
                  Login to manage jobs and hire talented candidates.
                </p>

              </div>


              {/* ==========================================
                  FORM
              ========================================== */}

              <div className="card-body p-4 p-md-5">

                <form onSubmit={handleSubmit}>

                  {/* EMAIL */}

                  <div className="mb-4">

                    <label className="form-label fw-semibold">
                      Email Address
                    </label>

                    <div className="input-group input-group-lg">

                      <span className="input-group-text bg-light">
                        <FaEnvelope className="text-primary" />
                      </span>

                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        autoComplete="email"
                        required
                      />

                    </div>

                  </div>


                  {/* PASSWORD */}

                  <div className="mb-2">

                    <label className="form-label fw-semibold">
                      Password
                    </label>

                    <div className="input-group input-group-lg">

                      <span className="input-group-text bg-light">
                        <FaLock className="text-primary" />
                      </span>

                      <input
                        type={
                          showPassword
                            ? "text"
                            : "password"
                        }
                        name="password"
                        className="form-control"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        autoComplete="current-password"
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

                  </div>


                  {/* FORGOT PASSWORD */}

                  <div className="text-end mb-4">

                    <button
                      type="button"
                      className="btn btn-link p-0 text-primary text-decoration-none fw-semibold"
                      onClick={() =>
                        navigate(
                          "/company/forgot-password"
                        )
                      }
                    >
                      <FaKey className="me-1" />

                      Forgot Password?
                    </button>

                  </div>


                  {/* LOGIN BUTTON */}

                  <button
                    type="submit"
                    className="btn btn-primary btn-lg w-100 rounded-pill"
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


                {/* ==========================================
                    REGISTER
                ========================================== */}

                <div className="text-center mt-4 pt-3 border-top">

                  <span className="text-muted">
                    Don't have a company account?
                  </span>

                  <button
                    type="button"
                    className="btn btn-link text-primary fw-semibold text-decoration-none"
                    onClick={() =>
                      navigate("/company/register")
                    }
                  >

                    <FaUserPlus className="me-1" />

                    Register Here

                  </button>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default CompanyLogin;