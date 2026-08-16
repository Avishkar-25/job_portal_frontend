import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaCog,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaShieldAlt,
  FaKey,
} from "react-icons/fa";

import api from "../../services/api";

const Settings = () => {
  const navigate = useNavigate();

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

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
  // CHANGE PASSWORD
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.currentPassword.trim()) {
      alert("Please enter current password");
      return;
    }

    if (!formData.newPassword.trim()) {
      alert("Please enter new password");
      return;
    }

    if (formData.newPassword.length < 6) {
      alert("New password must be at least 6 characters");
      return;
    }

    if (!formData.confirmPassword.trim()) {
      alert("Please confirm new password");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      alert("New password and confirm password do not match");
      return;
    }

    try {
      setLoading(true);

      const response = await api.put(
        "/password/change-password",
        {
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
          confirmPassword: formData.confirmPassword,
        }
      );

      alert(
        response.data?.message ||
          "Password changed successfully"
      );

      handleCancel();

    } catch (error) {
      console.error("Change Password Error:", error);

      alert(
        error.response?.data?.message ||
          "Unable to change password"
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // CANCEL
  // ==========================================

  const handleCancel = () => {
    setFormData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    setShowCurrent(false);
    setShowNew(false);
    setShowConfirm(false);
  };

  return (
    <div className="container-fluid py-4 bg-light min-vh-100">

      {/* ==========================================
          HEADER
      ========================================== */}

      <div className="card border-0 shadow-sm rounded-4 overflow-hidden mb-4">

        <div
          className="card-header border-0 text-white p-4"
          style={{
            background:
              "linear-gradient(135deg, #0f172a, #1e3a8a, #2563eb)",
          }}
        >

          <div className="d-flex align-items-center">

            <div
              className="bg-white bg-opacity-25 rounded-4 d-flex align-items-center justify-content-center me-3 flex-shrink-0"
              style={{
                width: "58px",
                height: "58px",
                fontSize: "24px",
              }}
            >
              <FaCog />
            </div>

            <div>

              <h3 className="fw-bold mb-1">
                Settings
              </h3>

              <p className="mb-0 opacity-75">
                Manage your account and security settings
              </p>

            </div>

          </div>

        </div>

      </div>


      {/* ==========================================
          MAIN CONTENT
      ========================================== */}

      <div className="row justify-content-center">

        <div className="col-12 col-md-10 col-lg-8 col-xl-7">

          <div className="card border-0 shadow-sm rounded-4">

            <div className="card-body p-4 p-md-5">


              {/* ======================================
                  CARD HEADER
              ====================================== */}

              <div className="d-flex align-items-center mb-4">

                <div
                  className="bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0"
                  style={{
                    width: "56px",
                    height: "56px",
                    fontSize: "21px",
                  }}
                >
                  <FaLock />
                </div>

                <div>

                  <h4 className="fw-bold mb-1">
                    Change Password
                  </h4>

                  <p className="text-muted mb-0 small">
                    Update your password to keep your account secure.
                  </p>

                </div>

              </div>

              <hr className="mb-4" />


              <form onSubmit={handleSubmit}>

                {/* ======================================
                    CURRENT PASSWORD
                ====================================== */}

                <div className="mb-4">

                  <label className="form-label fw-semibold">
                    Current Password
                  </label>

                  <div className="input-group input-group-lg">

                    <span className="input-group-text bg-light">
                      <FaKey className="text-secondary" />
                    </span>

                    <input
                      type={
                        showCurrent
                          ? "text"
                          : "password"
                      }
                      name="currentPassword"
                      className="form-control"
                      placeholder="Enter current password"
                      value={formData.currentPassword}
                      onChange={handleChange}
                    />

                    <button
                      type="button"
                      className="btn btn-light border"
                      onClick={() =>
                        setShowCurrent(!showCurrent)
                      }
                    >
                      {showCurrent ? (
                        <FaEyeSlash />
                      ) : (
                        <FaEye />
                      )}
                    </button>

                  </div>

                </div>


                {/* ======================================
                    NEW PASSWORD
                ====================================== */}

                <div className="mb-4">

                  <label className="form-label fw-semibold">
                    New Password
                  </label>

                  <div className="input-group input-group-lg">

                    <span className="input-group-text bg-light">
                      <FaLock className="text-secondary" />
                    </span>

                    <input
                      type={
                        showNew
                          ? "text"
                          : "password"
                      }
                      name="newPassword"
                      className="form-control"
                      placeholder="Enter new password"
                      value={formData.newPassword}
                      onChange={handleChange}
                    />

                    <button
                      type="button"
                      className="btn btn-light border"
                      onClick={() =>
                        setShowNew(!showNew)
                      }
                    >
                      {showNew ? (
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


                {/* ======================================
                    CONFIRM PASSWORD
                ====================================== */}

                <div className="mb-4">

                  <label className="form-label fw-semibold">
                    Confirm New Password
                  </label>

                  <div className="input-group input-group-lg">

                    <span className="input-group-text bg-light">
                      <FaShieldAlt className="text-secondary" />
                    </span>

                    <input
                      type={
                        showConfirm
                          ? "text"
                          : "password"
                      }
                      name="confirmPassword"
                      className="form-control"
                      placeholder="Confirm new password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />

                    <button
                      type="button"
                      className="btn btn-light border"
                      onClick={() =>
                        setShowConfirm(!showConfirm)
                      }
                    >
                      {showConfirm ? (
                        <FaEyeSlash />
                      ) : (
                        <FaEye />
                      )}
                    </button>

                  </div>

                </div>


                {/* ======================================
                    SECURITY INFO
                ====================================== */}

                <div className="alert alert-primary border-0 rounded-3 p-3 mb-4">

                  <div className="d-flex align-items-start">

                    <FaShieldAlt
                      className="me-3 mt-1"
                      size={20}
                    />

                    <div>

                      <strong>
                        Password Security
                      </strong>

                      <p className="small mb-0 mt-1">
                        Use a strong password containing
                        letters, numbers and special characters.
                      </p>

                    </div>

                  </div>

                </div>


                {/* ======================================
                    FORGOT PASSWORD
                ====================================== */}

                <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-2 border-bottom pb-4 mb-4">

                  <span className="text-muted">
                    Forgot your password?
                  </span>

                  <button
                    type="button"
                    className="btn btn-link text-primary fw-semibold text-decoration-none p-0"
                    onClick={() =>
                      navigate(
                        "/employee/forgot-password"
                      )
                    }
                  >
                    Reset Password
                  </button>

                </div>


                {/* ======================================
                    BUTTONS
                ====================================== */}

                <div className="d-flex flex-column flex-sm-row justify-content-end gap-2">

                  <button
                    type="button"
                    className="btn btn-light border rounded-pill px-4"
                    onClick={handleCancel}
                    disabled={loading}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="btn btn-primary rounded-pill px-4"
                    disabled={loading}
                  >

                    <FaLock className="me-2" />

                    {loading
                      ? "Changing..."
                      : "Change Password"}

                  </button>

                </div>

              </form>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Settings;