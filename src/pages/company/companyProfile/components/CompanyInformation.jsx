
import React, { useState } from "react";

import {
  FaBuilding,
  FaEdit,
  FaEnvelope,
  FaPhone,
  FaIndustry,
  FaGlobe,
  FaCalendarAlt,
  FaUsers,
  FaMapMarkerAlt,
  FaAlignLeft,
} from "react-icons/fa";

import CompanyInformationModal from "../modals/CompanyInformationModal";

import "./CompanyInformation.css";

const CompanyInformation = ({ company, setCompany }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* ==========================================
          COMPANY INFORMATION CARD
      ========================================== */}

      <div className="profile-section-card">

        {/* ==========================================
            HEADER
        ========================================== */}

        <div className="section-header">

          <div className="section-title-wrapper">

            <div className="section-icon">
              <FaBuilding />
            </div>

            <div>
              <h4>Company Information</h4>

              <p>
                Basic information about your company
              </p>
            </div>

          </div>


          {/* ==================================
              EDIT BUTTON
          ================================== */}

          <button
            type="button"
            className="edit-section-btn"
            onClick={() => setShowModal(true)}
          >
            <FaEdit />
            <span>Edit</span>
          </button>

        </div>


        {/* ==========================================
            INFORMATION GRID
        ========================================== */}

        <div className="info-grid">

          {/* COMPANY NAME */}

          <div className="info-item">

            <div className="info-label">
              <FaBuilding />
              <span>Company Name</span>
            </div>

            <strong>
              {company.company_name || "Not provided"}
            </strong>

          </div>


          {/* EMAIL */}

          <div className="info-item">

            <div className="info-label">
              <FaEnvelope />
              <span>Email</span>
            </div>

            <strong>
              {company.email || "Not provided"}
            </strong>

          </div>


          {/* PHONE */}

          <div className="info-item">

            <div className="info-label">
              <FaPhone />
              <span>Phone</span>
            </div>

            <strong>
              {company.phone || "Not provided"}
            </strong>

          </div>


          {/* INDUSTRY */}

          <div className="info-item">

            <div className="info-label">
              <FaIndustry />
              <span>Industry</span>
            </div>

            <strong>
              {company.industry || "Not provided"}
            </strong>

          </div>


          {/* WEBSITE */}

          <div className="info-item">

            <div className="info-label">
              <FaGlobe />
              <span>Website</span>
            </div>

            {company.website ? (
              <a
                href={
                  company.website.startsWith("http")
                    ? company.website
                    : `https://${company.website}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="info-link"
              >
                {company.website}
              </a>
            ) : (
              <strong>Not provided</strong>
            )}

          </div>


          {/* FOUNDED YEAR */}

          <div className="info-item">

            <div className="info-label">
              <FaCalendarAlt />
              <span>Founded Year</span>
            </div>

            <strong>
              {company.founded_year || "Not provided"}
            </strong>

          </div>


          {/* COMPANY SIZE */}

          <div className="info-item">

            <div className="info-label">
              <FaUsers />
              <span>Company Size</span>
            </div>

            <strong>
              {company.company_size || "Not provided"}
            </strong>

          </div>


          {/* HEADQUARTERS */}

          <div className="info-item">

            <div className="info-label">
              <FaMapMarkerAlt />
              <span>Headquarters</span>
            </div>

            <strong>
              {company.headquarters || "Not provided"}
            </strong>

          </div>

        </div>


        {/* ==========================================
            DESCRIPTION
        ========================================== */}

        <div className="description-box">

          <div className="description-label">
            <FaAlignLeft />
            <span>Description</span>
          </div>

          <p>
            {company.description ||
              "No company description added yet."}
          </p>

        </div>

      </div>


      {/* ==========================================
          EDIT MODAL
      ========================================== */}

      {showModal && (
        <CompanyInformationModal
          company={company}
          setCompany={setCompany}
          closeModal={() => setShowModal(false)}
        />
      )}

    </>
  );
};

export default CompanyInformation;

