import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaBuilding,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaIndustry,
  FaLock,
  FaMapMarkerAlt,
  FaArrowRight,
  FaSignInAlt,
} from "react-icons/fa";

import { companyRegister } from "../../../services/companyService";

const CompanyRegister = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    company_name: "",
    phone: "",
    industry: "",
    address: "",
  });

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
  // SUBMIT
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await companyRegister(form);

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      if (res.data.user) {
        localStorage.setItem(
          "user",
          JSON.stringify(res.data.user)
        );
      }

      alert(res.data.message || "Company registered successfully");

      navigate("/company/dashboard");

    } catch (err) {
      console.log("COMPANY REGISTER ERROR:", err);

      alert(
        err.response?.data?.message ||
          "Company registration failed"
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

          <div className="col-xl-7 col-lg-8 col-md-10">

            {/* ==========================================
                MAIN CARD
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
                  Create Company Account
                </h2>

                <p className="mb-0 opacity-75">
                  Register your company and start hiring talented
                  candidates.
                </p>

              </div>

              {/* ==========================================
                  FORM
              ========================================== */}

              <div className="card-body p-4 p-md-5">

                <form onSubmit={handleSubmit}>

                  <div className="row">

                    {/* HR NAME */}

                    <div className="col-md-6 mb-4">

                      <label className="form-label fw-semibold">
                        HR Name
                      </label>

                      <div className="input-group">

                        <span className="input-group-text bg-light">
                          <FaUser className="text-primary" />
                        </span>

                        <input
                          type="text"
                          className="form-control"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Enter HR name"
                          required
                        />

                      </div>

                    </div>


                    {/* COMPANY NAME */}

                    <div className="col-md-6 mb-4">

                      <label className="form-label fw-semibold">
                        Company Name
                      </label>

                      <div className="input-group">

                        <span className="input-group-text bg-light">
                          <FaBuilding className="text-primary" />
                        </span>

                        <input
                          type="text"
                          className="form-control"
                          name="company_name"
                          value={form.company_name}
                          onChange={handleChange}
                          placeholder="Enter company name"
                          required
                        />

                      </div>

                    </div>


                    {/* EMAIL */}

                    <div className="col-md-6 mb-4">

                      <label className="form-label fw-semibold">
                        Email
                      </label>

                      <div className="input-group">

                        <span className="input-group-text bg-light">
                          <FaEnvelope className="text-primary" />
                        </span>

                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="Enter company email"
                          autoComplete="email"
                          required
                        />

                      </div>

                    </div>


                    {/* PHONE */}

                    <div className="col-md-6 mb-4">

                      <label className="form-label fw-semibold">
                        Phone
                      </label>

                      <div className="input-group">

                        <span className="input-group-text bg-light">
                          <FaPhone className="text-primary" />
                        </span>

                        <input
                          type="tel"
                          className="form-control"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="Enter phone number"
                          required
                        />

                      </div>

                    </div>


                    {/* INDUSTRY */}

                    <div className="col-md-6 mb-4">

                      <label className="form-label fw-semibold">
                        Industry
                      </label>

                      <div className="input-group">

                        <span className="input-group-text bg-light">
                          <FaIndustry className="text-primary" />
                        </span>

                        <input
                          type="text"
                          className="form-control"
                          name="industry"
                          value={form.industry}
                          onChange={handleChange}
                          placeholder="e.g. IT, Finance"
                          required
                        />

                      </div>

                    </div>


                    {/* PASSWORD */}

                    <div className="col-md-6 mb-4">

                      <label className="form-label fw-semibold">
                        Password
                      </label>

                      <div className="input-group">

                        <span className="input-group-text bg-light">
                          <FaLock className="text-primary" />
                        </span>

                        <input
                          type="password"
                          className="form-control"
                          name="password"
                          value={form.password}
                          onChange={handleChange}
                          placeholder="Create password"
                          autoComplete="new-password"
                          required
                        />

                      </div>

                      <small className="text-muted">
                        Password must be at least 6 characters.
                      </small>

                    </div>


                    {/* ADDRESS */}

                    <div className="col-12 mb-4">

                      <label className="form-label fw-semibold">
                        Company Address
                      </label>

                      <div className="input-group">

                        <span className="input-group-text bg-light align-items-start pt-3">
                          <FaMapMarkerAlt className="text-danger" />
                        </span>

                        <textarea
                          className="form-control"
                          rows="4"
                          name="address"
                          value={form.address}
                          onChange={handleChange}
                          placeholder="Enter complete company address"
                          required
                        ></textarea>

                      </div>

                    </div>

                  </div>


                  {/* ==========================================
                      REGISTER BUTTON
                  ========================================== */}

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

                        Creating Account...
                      </>
                    ) : (
                      <>
                        <FaArrowRight className="me-2" />

                        Create Company Account
                      </>
                    )}

                  </button>

                </form>


                {/* ==========================================
                    LOGIN
                ========================================== */}

                <div className="text-center mt-4 pt-3 border-top">

                  <span className="text-muted">
                    Already have a company account?
                  </span>

                  <button
                    type="button"
                    className="btn btn-link text-primary fw-semibold text-decoration-none"
                    onClick={() =>
                      navigate("/company/login")
                    }
                  >

                    <FaSignInAlt className="me-1" />

                    Login Here

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

export default CompanyRegister;