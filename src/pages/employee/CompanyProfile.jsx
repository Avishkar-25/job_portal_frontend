import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";

import {
  FaBuilding,
  FaMapMarkerAlt,
  FaGlobe,
  FaPhone,
  FaEnvelope,
  FaIndustry,
  FaUsers,
  FaCalendarAlt,
  FaLinkedin,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaCheckCircle,
  FaFileInvoice,
  FaArrowLeft,
} from "react-icons/fa";

const CompanyProfile = () => {
  const navigate = useNavigate();
  const { company_id } = useParams();

  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);

  // ==========================================
  // GET COMPANY PROFILE
  // ==========================================

  useEffect(() => {
    if (company_id) {
      getCompanyProfile();
    }
  }, [company_id]);

  const getCompanyProfile = async () => {
    try {
      setLoading(true);

      console.log(
        "Fetching company profile:",
        `/employee/company/${company_id}`
      );

      const response = await api.get(
        `/employee/company/${company_id}`
      );

      console.log(
        "Company Profile Response:",
        response.data
      );

      if (response.data.success) {
        setCompany(response.data.company);
      } else {
        setCompany(null);
      }
    } catch (error) {
      console.error(
        "Company Profile Error:",
        error
      );

      if (error.response) {
        console.error(
          "Status:",
          error.response.status
        );

        console.error(
          "Data:",
          error.response.data
        );
      }

      setCompany(null);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div
          className="spinner-border text-primary mb-3"
          role="status"
        ></div>

        <p className="text-muted mb-0">
          Loading company profile...
        </p>
      </div>
    );
  }

  // ==========================================
  // COMPANY NOT FOUND
  // ==========================================

  if (!company) {
    return (
      <div className="container py-5 text-center">
        <FaBuilding
          className="text-primary mb-3"
          style={{ fontSize: "55px" }}
        />

        <h4 className="fw-bold">
          Company Profile Not Found
        </h4>

        <p className="text-muted">
          Company information is currently unavailable.
        </p>

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="btn btn-primary rounded-pill px-4"
        >
          <FaArrowLeft className="me-2" />
          Go Back
        </button>
      </div>
    );
  }

  // ==========================================
  // LOGO URL
  // ==========================================

  const getLogoUrl = () => {
    if (!company.logo) {
      return null;
    }

    // Already complete URL
    if (company.logo.startsWith("http")) {
      return company.logo;
    }

    // If database contains uploads path
    if (company.logo.startsWith("uploads/")) {
      return `http://localhost:5000/${company.logo}`;
    }

    // If database only contains filename
    return `http://localhost:5000/uploads/company/logos/${company.logo}`;
  };

  // ==========================================
  // COVER IMAGE URL
  // ==========================================

  const getCoverUrl = () => {
    if (!company.cover_image) {
      return null;
    }

    if (company.cover_image.startsWith("http")) {
      return company.cover_image;
    }

    if (company.cover_image.startsWith("uploads/")) {
      return `http://localhost:5000/${company.cover_image}`;
    }

    return `http://localhost:5000/uploads/company/covers/${company.cover_image}`;
  };

  // ==========================================
  // WEBSITE URL
  // ==========================================

  const websiteUrl = company.website
    ? company.website.startsWith("http")
      ? company.website
      : `https://${company.website}`
    : null;

  const logoUrl = getLogoUrl();
  const coverUrl = getCoverUrl();

  // ==========================================
  // RETURN
  // ==========================================

  return (
    <div className="bg-light min-vh-100 py-4">
      <div className="container">

        {/* ==========================================
            BACK BUTTON
        ========================================== */}

        <div className="mb-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="btn bg-white border shadow-sm rounded-pill px-4 py-2 d-inline-flex align-items-center"
            style={{
              fontWeight: "500",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform =
                "translateX(-3px)";
              e.currentTarget.style.color = "#0d6efd";
              e.currentTarget.style.borderColor =
                "#0d6efd";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform =
                "translateX(0)";
              e.currentTarget.style.color = "";
              e.currentTarget.style.borderColor = "";
            }}
          >
            <FaArrowLeft className="me-2" />
            Back
          </button>
        </div>

        {/* ==========================================
            HEADER
        ========================================== */}

        <div className="card border-0 shadow-sm overflow-hidden mb-4">

          {/* COVER */}

          <div
            style={{
              height: "220px",
              backgroundImage: coverUrl
                ? `url(${coverUrl})`
                : "linear-gradient(135deg, #0d6efd, #0a58ca)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>

          {/* COMPANY INFORMATION */}

          <div className="card-body">
            <div className="row align-items-center">

              {/* LOGO */}

              <div className="col-md-2 text-center">
                <div
                  className="bg-white border rounded-4 shadow-sm d-flex align-items-center justify-content-center mx-auto overflow-hidden"
                  style={{
                    width: "120px",
                    height: "120px",
                    marginTop: "-70px",
                    position: "relative",
                  }}
                >
                  {logoUrl ? (
                    <img
                      src={logoUrl}
                      alt={
                        company.company_name ||
                        "Company Logo"
                      }
                      className="img-fluid"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                      onError={(e) => {
                        console.error(
                          "Logo not found:",
                          e.currentTarget.src
                        );

                        e.currentTarget.style.display =
                          "none";
                      }}
                    />
                  ) : (
                    <FaBuilding
                      className="text-primary"
                      style={{ fontSize: "45px" }}
                    />
                  )}
                </div>
              </div>

              {/* COMPANY NAME */}

              <div className="col-md-7 mt-3 mt-md-0">

                <div className="d-flex align-items-center flex-wrap gap-2">

                  <h2 className="fw-bold mb-0">
                    {company.company_name}
                  </h2>

                  {company.verification_status ===
                    "verified" && (
                    <span className="badge bg-success rounded-pill px-3 py-2">
                      <FaCheckCircle className="me-1" />
                      Verified
                    </span>
                  )}

                </div>

                <p className="text-muted mb-2 mt-2">
                  <FaIndustry className="text-primary me-2" />

                  {company.industry ||
                    "Industry not available"}
                </p>

                <p className="text-muted mb-0">
                  <FaMapMarkerAlt className="text-danger me-2" />

                  {company.city || ""}

                  {company.city &&
                  company.state
                    ? ", "
                    : ""}

                  {company.state || ""}

                  {company.country
                    ? `, ${company.country}`
                    : ""}
                </p>

              </div>

              {/* WEBSITE */}

              <div className="col-md-3 text-md-end mt-3 mt-md-0">

                {websiteUrl && (
                  <a
                    href={websiteUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-primary rounded-pill px-4"
                  >
                    <FaGlobe className="me-2" />
                    Visit Website
                  </a>
                )}

              </div>

            </div>
          </div>
        </div>

        {/* ==========================================
            STATS
        ========================================== */}

        <div className="row g-3 mb-4">

          {/* FOUNDED */}

          <div className="col-md-3 col-sm-6">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body d-flex align-items-center">

                <div className="bg-primary bg-opacity-10 text-primary rounded-3 p-3 me-3">
                  <FaCalendarAlt className="fs-4" />
                </div>

                <div>
                  <small className="text-muted">
                    Founded
                  </small>

                  <h6 className="fw-bold mb-0">
                    {company.founded_year ||
                      "N/A"}
                  </h6>
                </div>

              </div>
            </div>
          </div>

          {/* COMPANY SIZE */}

          <div className="col-md-3 col-sm-6">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body d-flex align-items-center">

                <div className="bg-success bg-opacity-10 text-success rounded-3 p-3 me-3">
                  <FaUsers className="fs-4" />
                </div>

                <div>
                  <small className="text-muted">
                    Company Size
                  </small>

                  <h6 className="fw-bold mb-0">
                    {company.company_size ||
                      "N/A"}
                  </h6>
                </div>

              </div>
            </div>
          </div>

          {/* HEADQUARTERS */}

          <div className="col-md-3 col-sm-6">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body d-flex align-items-center">

                <div className="bg-warning bg-opacity-10 text-warning rounded-3 p-3 me-3">
                  <FaBuilding className="fs-4" />
                </div>

                <div>
                  <small className="text-muted">
                    Headquarters
                  </small>

                  <h6 className="fw-bold mb-0">
                    {company.headquarters ||
                      "N/A"}
                  </h6>
                </div>

              </div>
            </div>
          </div>

          {/* STATUS */}

          <div className="col-md-3 col-sm-6">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body d-flex align-items-center">

                <div className="bg-info bg-opacity-10 text-info rounded-3 p-3 me-3">
                  <FaCheckCircle className="fs-4" />
                </div>

                <div>
                  <small className="text-muted">
                    Account Status
                  </small>

                  <h6 className="fw-bold text-success mb-0 text-capitalize">
                    {company.account_status ||
                      "N/A"}
                  </h6>
                </div>

              </div>
            </div>
          </div>

        </div>

        {/* ==========================================
            MAIN CONTENT
        ========================================== */}

        <div className="row g-4">

          {/* ==========================================
              LEFT SIDE
          ========================================== */}

          <div className="col-lg-8">

            {/* ABOUT COMPANY */}

            <div className="card border-0 shadow-sm mb-4">
              <div className="card-body p-4">

                <div className="d-flex align-items-center mb-3">

                  <div className="bg-primary bg-opacity-10 text-primary rounded-3 p-3 me-3">
                    <FaBuilding />
                  </div>

                  <div>
                    <h5 className="fw-bold mb-0">
                      About Company
                    </h5>

                    <small className="text-muted">
                      Company overview
                    </small>
                  </div>

                </div>

                <p className="text-secondary lh-lg mb-0">
                  {company.description ||
                    "No company description available."}
                </p>

              </div>
            </div>

            {/* COMPANY DETAILS */}

            <div className="card border-0 shadow-sm mb-4">
              <div className="card-body p-4">

                <div className="d-flex align-items-center mb-4">

                  <div className="bg-primary bg-opacity-10 text-primary rounded-3 p-3 me-3">
                    <FaIndustry />
                  </div>

                  <div>
                    <h5 className="fw-bold mb-0">
                      Company Details
                    </h5>

                    <small className="text-muted">
                      Basic company information
                    </small>
                  </div>

                </div>

                <div className="row g-3">

                  <div className="col-md-6">
                    <div className="bg-light rounded-3 p-3">
                      <small className="text-muted">
                        Industry
                      </small>

                      <div className="fw-semibold mt-1">
                        {company.industry ||
                          "N/A"}
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="bg-light rounded-3 p-3">
                      <small className="text-muted">
                        Company Size
                      </small>

                      <div className="fw-semibold mt-1">
                        {company.company_size ||
                          "N/A"}
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="bg-light rounded-3 p-3">
                      <small className="text-muted">
                        Founded Year
                      </small>

                      <div className="fw-semibold mt-1">
                        {company.founded_year ||
                          "N/A"}
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="bg-light rounded-3 p-3">
                      <small className="text-muted">
                        Headquarters
                      </small>

                      <div className="fw-semibold mt-1">
                        {company.headquarters ||
                          "N/A"}
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* OFFICE ADDRESS */}

            <div className="card border-0 shadow-sm mb-4">
              <div className="card-body p-4">

                <div className="d-flex align-items-center mb-4">

                  <div className="bg-danger bg-opacity-10 text-danger rounded-3 p-3 me-3">
                    <FaMapMarkerAlt />
                  </div>

                  <div>
                    <h5 className="fw-bold mb-0">
                      Office Address
                    </h5>

                    <small className="text-muted">
                      Company location
                    </small>
                  </div>

                </div>

                <div className="bg-light rounded-3 p-3">

                  <div className="d-flex">

                    <FaMapMarkerAlt className="text-danger mt-1 me-3" />

                    <div>

                      <h6 className="fw-bold">
                        {company.address ||
                          "Address not available"}
                      </h6>

                      <p className="text-muted mb-0">
                        {company.city || ""}

                        {company.city &&
                        company.state
                          ? ", "
                          : ""}

                        {company.state || ""}
                      </p>

                      <p className="text-muted mb-0">
                        {company.country || ""}

                        {company.pincode
                          ? ` - ${company.pincode}`
                          : ""}
                      </p>

                    </div>

                  </div>

                </div>

              </div>
            </div>

            {/* BUSINESS INFORMATION */}

            <div className="card border-0 shadow-sm">

              <div className="card-body p-4">

                <div className="d-flex align-items-center mb-4">

                  <div className="bg-warning bg-opacity-10 text-warning rounded-3 p-3 me-3">
                    <FaFileInvoice />
                  </div>

                  <div>
                    <h5 className="fw-bold mb-0">
                      Business Information
                    </h5>

                    <small className="text-muted">
                      Registered company details
                    </small>
                  </div>

                </div>

                <div className="row g-3">

                  <div className="col-md-4">
                    <div className="border rounded-3 p-3">
                      <small className="text-muted">
                        GST Number
                      </small>

                      <div className="fw-semibold mt-1 small">
                        {company.gst_number ||
                          "N/A"}
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="border rounded-3 p-3">
                      <small className="text-muted">
                        CIN Number
                      </small>

                      <div className="fw-semibold mt-1 small">
                        {company.cin_number ||
                          "N/A"}
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="border rounded-3 p-3">
                      <small className="text-muted">
                        PAN Number
                      </small>

                      <div className="fw-semibold mt-1 small">
                        {company.pan_number ||
                          "N/A"}
                      </div>
                    </div>
                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* ==========================================
              RIGHT SIDE
          ========================================== */}

          <div className="col-lg-4">

            {/* CONTACT */}

            <div className="card border-0 shadow-sm mb-4">

              <div className="card-body p-4">

                <div className="d-flex align-items-center mb-4">

                  <div className="bg-primary bg-opacity-10 text-primary rounded-3 p-3 me-3">
                    <FaEnvelope />
                  </div>

                  <div>
                    <h5 className="fw-bold mb-0">
                      Contact
                    </h5>

                    <small className="text-muted">
                      Get in touch
                    </small>
                  </div>

                </div>

                {/* EMAIL */}

                <div className="d-flex align-items-start mb-4">

                  <div className="bg-light rounded-3 p-2 me-3 text-primary">
                    <FaEnvelope />
                  </div>

                  <div>

                    <small className="text-muted d-block">
                      Email
                    </small>

                    <a
                      href={`mailto:${
                        company.email || ""
                      }`}
                      className="text-decoration-none fw-semibold text-dark small"
                    >
                      {company.email || "N/A"}
                    </a>

                  </div>

                </div>

                {/* PHONE */}

                <div className="d-flex align-items-start mb-4">

                  <div className="bg-light rounded-3 p-2 me-3 text-success">
                    <FaPhone />
                  </div>

                  <div>

                    <small className="text-muted d-block">
                      Phone
                    </small>

                    <a
                      href={`tel:${
                        company.phone || ""
                      }`}
                      className="text-decoration-none fw-semibold text-dark small"
                    >
                      {company.phone || "N/A"}
                    </a>

                  </div>

                </div>

                {/* WEBSITE */}

                <div className="d-flex align-items-start">

                  <div className="bg-light rounded-3 p-2 me-3 text-primary">
                    <FaGlobe />
                  </div>

                  <div>

                    <small className="text-muted d-block">
                      Website
                    </small>

                    {websiteUrl ? (
                      <a
                        href={websiteUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-decoration-none fw-semibold small"
                      >
                        Visit Website
                      </a>
                    ) : (
                      <span className="text-muted small">
                        N/A
                      </span>
                    )}

                  </div>

                </div>

              </div>
            </div>

            {/* SOCIAL LINKS */}

            <div className="card border-0 shadow-sm mb-4">

              <div className="card-body p-4">

                <h5 className="fw-bold mb-3">
                  Follow Company
                </h5>

                <div className="d-grid gap-2">

                  {company.linkedin && (
                    <a
                      href={company.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-outline-primary text-start"
                    >
                      <FaLinkedin className="me-2" />
                      LinkedIn
                    </a>
                  )}

                  {company.facebook && (
                    <a
                      href={company.facebook}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-outline-primary text-start"
                    >
                      <FaFacebook className="me-2" />
                      Facebook
                    </a>
                  )}

                  {company.instagram && (
                    <a
                      href={company.instagram}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-outline-danger text-start"
                    >
                      <FaInstagram className="me-2" />
                      Instagram
                    </a>
                  )}

                  {company.twitter && (
                    <a
                      href={company.twitter}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-outline-dark text-start"
                    >
                      <FaTwitter className="me-2" />
                      Twitter
                    </a>
                  )}

                  {!company.linkedin &&
                    !company.facebook &&
                    !company.instagram &&
                    !company.twitter && (
                      <p className="text-muted small mb-0">
                        No social links available.
                      </p>
                    )}

                </div>

              </div>

            </div>

            {/* VERIFICATION */}

            <div className="card border-0 shadow-sm">

              <div className="card-body p-4 text-center">

                <FaCheckCircle
                  className="text-success mb-3"
                  style={{ fontSize: "50px" }}
                />

                <h5 className="fw-bold">
                  Verified Company
                </h5>

                <p className="text-muted small mb-3">
                  This company profile has been verified.
                </p>

                <span className="badge bg-success-subtle text-success px-3 py-2">
                  <FaCheckCircle className="me-1" />

                  {company.verification_status ||
                    "verified"}
                </span>

              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default CompanyProfile;