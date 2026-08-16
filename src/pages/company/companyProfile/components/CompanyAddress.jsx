
import React, { useState } from "react";

import {
  FaMapMarkerAlt,
  FaMapMarker,
  FaEdit,
} from "react-icons/fa";

import CompanyAddressModal from "../modals/CompanyAddressModal";

const CompanyAddress = ({ company, setCompany }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* =========================
          COMPANY ADDRESS
      ========================= */}

      <div className="profile-section-card">

        {/* HEADER */}

        <div className="section-header">

          <div className="section-title-wrapper">

            <div className="section-icon">
              <FaMapMarkerAlt />
            </div>

            <div>
              <h4>Company Address</h4>

              <p>
                Registered company location
              </p>
            </div>

          </div>


          {/* EDIT BUTTON */}

          <button
            type="button"
            className="edit-section-btn"
            onClick={() => setShowModal(true)}
          >
            <FaEdit />
            <span>Edit</span>
          </button>

        </div>


        {/* ADDRESS DISPLAY */}

        <div className="address-display">

          <div className="address-icon">
            <FaMapMarker />
          </div>

          <div className="address-content">

            <strong>
              {company.address || "Address not provided"}
            </strong>

            <p>
              {company.city || ""}

              {company.city && company.state
                ? ", "
                : ""}

              {company.state || ""}

              {company.country
                ? `, ${company.country}`
                : ""}
            </p>

            <span>
              Pincode:{" "}
              {company.pincode || "Not provided"}
            </span>

          </div>

        </div>

      </div>


      {/* ADDRESS MODAL */}

      {showModal && (
        <CompanyAddressModal
          company={company}
          setCompany={setCompany}
          closeModal={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default CompanyAddress;

