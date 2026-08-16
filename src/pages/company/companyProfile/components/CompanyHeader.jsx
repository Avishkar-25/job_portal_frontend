
import React, { useState } from "react";
import CompanyHeaderm from "../modals/CompanyHeaderm";

import {
  FaBuilding,
  FaMapMarkerAlt,
  FaGlobe,
  FaIndustry,
  FaEdit,
} from "react-icons/fa";

import "./CompanyHeader.css";

const API_URL = "http://localhost:5000";

const CompanyHeader = ({
  company,
  setCompany,
  uploadLogo,
  uploadCover,
}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* ==========================================
          COMPANY HEADER
      ========================================== */}

      <div
        className="company-header-modern"
        style={{
          backgroundImage: company.cover_image
            ? `url(${API_URL}/uploads/company/covers/${company.cover_image})`
            : "linear-gradient(135deg, #2563eb, #4f46e5, #06b6d4)",
        }}
      >

        {/* ======================================
            COVER OVERLAY
        ====================================== */}

        <div className="company-header-overlay"></div>


        {/* ======================================
            EDIT PROFILE BUTTON
        ====================================== */}

        <button
          type="button"
          className="company-header-edit-btn"
          onClick={() => setShowModal(true)}
        >
          <FaEdit />
          <span>Edit Profile</span>
        </button>


        {/* ======================================
            COMPANY CONTENT
        ====================================== */}

        <div className="company-header-content">


          {/* ==================================
              COMPANY LOGO
          ================================== */}

          <div className="company-logo-wrapper">

            <img
              src={
                company.logo
                  ? `${API_URL}/uploads/company/logos/${company.logo}`
                  : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              }
              alt="Company Logo"
              className="company-logo"
            />

          </div>


          {/* ==================================
              COMPANY INFORMATION
          ================================== */}

          <div className="company-header-info">

            <div className="company-name-row">

              <FaBuilding className="company-title-icon" />

              <h2>
                {company.company_name || "Company Name"}
              </h2>

            </div>


            {/* ==================================
                META INFORMATION
            ================================== */}

            <div className="company-meta">


              {/* Industry */}

              {company.industry && (
                <span className="company-meta-item">
                  <FaIndustry />
                  {company.industry}
                </span>
              )}


              {/* Location */}

              {(company.city || company.state) && (
                <span className="company-meta-item">
                  <FaMapMarkerAlt />

                  {company.city || ""}

                  {company.city && company.state
                    ? ", "
                    : ""}

                  {company.state || ""}
                </span>
              )}


              {/* Website */}

              {company.website && (
                <a
                  href={
                    company.website.startsWith("http")
                      ? company.website
                      : `https://${company.website}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="company-meta-item website-link"
                >
                  <FaGlobe />
                  Visit Website
                </a>
              )}

            </div>


            {/* ==================================
                COMPANY DESCRIPTION
            ================================== */}

            {company.description && (
              <p className="company-description">
                {company.description}
              </p>
            )}

          </div>

        </div>

      </div>


      {/* ==========================================
          COMPANY IMAGE MODAL
      ========================================== */}

      {showModal && (
        <CompanyHeaderm
          company={company}
          setCompany={setCompany}
          uploadLogo={uploadLogo}
          uploadCover={uploadCover}
          closeModal={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default CompanyHeader;

