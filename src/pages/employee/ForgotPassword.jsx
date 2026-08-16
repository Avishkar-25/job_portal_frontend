import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // ==========================================
  // SEND OTP
  // ==========================================

  const handleSendOtp = async () => {
    setError("");
    setMessage("");

    if (!email) {
      setError("Please enter your registered email.");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post(
        "/employee/password/forgot-password/send-otp",
        {
          email,
        }
      );

      if (res.data.success) {
        setMessage("OTP sent successfully to your email.");
        setStep(2);
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to send OTP."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // VERIFY OTP
  // ==========================================

  const handleVerifyOtp = async () => {
    setError("");
    setMessage("");

    if (!otp) {
      setError("Please enter OTP.");
      return;
    }

    if (otp.length !== 6) {
      setError("OTP must be 6 digits.");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post(
        "/employee/password/forgot-password/verify-otp",
        {
          email,
          otp,
        }
      );

      if (res.data.success) {
        setMessage("OTP verified successfully.");
        setStep(3);
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Invalid OTP."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // RESET PASSWORD
  // ==========================================

  const handleResetPassword = async () => {
    setError("");
    setMessage("");

    if (!newPassword || !confirmPassword) {
      setError("Please fill all password fields.");
      return;
    }

    if (newPassword.length < 6) {
      setError(
        "Password must be at least 6 characters."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post(
        "/employee/password/forgot-password/reset",
        {
          email,
          newPassword,
          confirmPassword,
        }
      );

      if (res.data.success) {
        alert(
          "Password reset successfully. Please login."
        );

        navigate("/employee/login");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to reset password."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // BACK
  // ==========================================

  const handleBack = () => {
    if (step === 1) {
      navigate("/employee/login");
    } else {
      setStep(step - 1);
      setError("");
      setMessage("");
    }
  };

  return (
    <div
      className="min-vh-100 d-flex justify-content-center align-items-center"
      style={{
        background: "#f5f7fb",
        padding: "30px 15px",
      }}
    >
      <div
        className="card border-0 shadow-lg rounded-4"
        style={{
          width: "100%",
          maxWidth: "540px",
        }}
      >
        <div className="card-body p-4 p-md-5">

          {/* BACK */}
          <button
            type="button"
            className="btn btn-link text-secondary text-decoration-none p-0 mb-4"
            onClick={handleBack}
          >
            <i className="bi bi-arrow-left me-2"></i>
            Back
          </button>

          {/* ICON */}
          <div className="text-center">

            <div
              className="mx-auto d-flex align-items-center justify-content-center rounded-4 mb-3"
              style={{
                width: "72px",
                height: "72px",
                background: "#e7f0ff",
                color: "#0d6efd",
                fontSize: "32px",
              }}
            >
              <i
                className={
                  step === 1
                    ? "bi bi-lock-fill"
                    : step === 2
                    ? "bi bi-shield-lock-fill"
                    : "bi bi-key-fill"
                }
              ></i>
            </div>

            {/* TITLE */}

            <h2 className="fw-bold mb-2">
              {step === 1 && "Forgot Password?"}
              {step === 2 && "Verify OTP"}
              {step === 3 && "Create New Password"}
            </h2>

            <p className="text-muted mb-4">
              {step === 1 &&
                "Enter your registered email to receive an OTP."}

              {step === 2 &&
                "Enter the 6-digit OTP sent to your email."}

              {step === 3 &&
                "Create a new secure password for your account."}
            </p>

          </div>

          {/* ======================================
              STEPS
          ====================================== */}

          <div className="d-flex justify-content-center align-items-center mb-4">

            {/* STEP 1 */}

            <div
              className={`rounded-circle d-flex align-items-center justify-content-center fw-bold ${
                step >= 1
                  ? "bg-primary text-white"
                  : "bg-secondary text-white"
              }`}
              style={{
                width: "32px",
                height: "32px",
              }}
            >
              1
            </div>

            <div
              style={{
                width: "55px",
                height: "3px",
                background:
                  step >= 2 ? "#0d6efd" : "#adb5bd",
              }}
            ></div>

            {/* STEP 2 */}

            <div
              className={`rounded-circle d-flex align-items-center justify-content-center fw-bold ${
                step >= 2
                  ? "bg-primary text-white"
                  : "bg-secondary text-white"
              }`}
              style={{
                width: "32px",
                height: "32px",
              }}
            >
              2
            </div>

            <div
              style={{
                width: "55px",
                height: "3px",
                background:
                  step >= 3 ? "#0d6efd" : "#adb5bd",
              }}
            ></div>

            {/* STEP 3 */}

            <div
              className={`rounded-circle d-flex align-items-center justify-content-center fw-bold ${
                step >= 3
                  ? "bg-primary text-white"
                  : "bg-secondary text-white"
              }`}
              style={{
                width: "32px",
                height: "32px",
              }}
            >
              3
            </div>

          </div>

          {/* ======================================
              ERROR
          ====================================== */}

          {error && (
            <div className="alert alert-danger rounded-3">
              <i className="bi bi-exclamation-circle me-2"></i>
              {error}
            </div>
          )}

          {/* ======================================
              SUCCESS
          ====================================== */}

          {message && (
            <div className="alert alert-success rounded-3">
              <i className="bi bi-check-circle me-2"></i>
              {message}
            </div>
          )}

          {/* ======================================
              STEP 1 - EMAIL
          ====================================== */}

          {step === 1 && (
            <>
              <div
                className="rounded-3 p-3 mb-4"
                style={{
                  background: "#dce9ff",
                }}
              >
                <div className="d-flex">

                  <i
                    className="bi bi-envelope-fill text-primary me-3"
                    style={{
                      fontSize: "22px",
                    }}
                  ></i>

                  <div className="w-100">

                    <label className="fw-bold mb-2">
                      Registered Email
                    </label>

                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter your registered email"
                      value={email}
                      onChange={(e) =>
                        setEmail(e.target.value)
                      }
                    />

                    <small className="text-muted">
                      OTP will be sent to this email.
                    </small>

                  </div>

                </div>
              </div>

              <button
                className="btn btn-primary w-100 rounded-pill py-2 fs-5"
                onClick={handleSendOtp}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Sending...
                  </>
                ) : (
                  <>
                    <i className="bi bi-send-fill me-2"></i>
                    Send OTP
                  </>
                )}
              </button>
            </>
          )}

          {/* ======================================
              STEP 2 - OTP
          ====================================== */}

          {step === 2 && (
            <>
              <div
                className="rounded-3 p-3 mb-4"
                style={{
                  background: "#dce9ff",
                }}
              >
                <div className="text-center">

                  <i
                    className="bi bi-shield-lock-fill text-primary"
                    style={{
                      fontSize: "35px",
                    }}
                  ></i>

                  <h6 className="fw-bold mt-2">
                    OTP Sent Successfully
                  </h6>

                  <p className="text-muted mb-3">
                    We sent a 6-digit OTP to
                  </p>

                  <strong>
                    {email}
                  </strong>

                </div>
              </div>

              <label className="fw-semibold mb-2">
                Enter OTP
              </label>

              <input
                type="text"
                className="form-control form-control-lg text-center mb-3"
                placeholder="Enter 6 digit OTP"
                maxLength="6"
                value={otp}
                onChange={(e) =>
                  setOtp(
                    e.target.value.replace(/\D/g, "")
                  )
                }
                style={{
                  letterSpacing: "8px",
                  fontWeight: "bold",
                }}
              />

              <button
                className="btn btn-primary w-100 rounded-pill py-2 fs-5"
                onClick={handleVerifyOtp}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Verifying...
                  </>
                ) : (
                  <>
                    <i className="bi bi-check-circle-fill me-2"></i>
                    Verify OTP
                  </>
                )}
              </button>
            </>
          )}

          {/* ======================================
              STEP 3 - NEW PASSWORD
          ====================================== */}

          {step === 3 && (
            <>
              <div className="mb-3">

                <label className="fw-semibold mb-2">
                  New Password
                </label>

                <div className="input-group">
                  <span className="input-group-text">
                    <i className="bi bi-lock-fill"></i>
                  </span>

                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) =>
                      setNewPassword(e.target.value)
                    }
                  />
                </div>

              </div>

              <div className="mb-4">

                <label className="fw-semibold mb-2">
                  Confirm Password
                </label>

                <div className="input-group">
                  <span className="input-group-text">
                    <i className="bi bi-lock-fill"></i>
                  </span>

                  <input
                    type="password"
                    className="form-control"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) =>
                      setConfirmPassword(e.target.value)
                    }
                  />
                </div>

              </div>

              <button
                className="btn btn-primary w-100 rounded-pill py-2 fs-5"
                onClick={handleResetPassword}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Updating...
                  </>
                ) : (
                  <>
                    <i className="bi bi-key-fill me-2"></i>
                    Create New Password
                  </>
                )}
              </button>
            </>
          )}

          {/* FOOTER */}

          <div className="text-center mt-4">
            <small className="text-muted">
              <i className="bi bi-shield-check me-1"></i>
              Secure Password Recovery
            </small>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;