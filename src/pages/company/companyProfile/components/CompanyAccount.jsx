
import React from "react";

import {
  FaUserShield,
  FaCheckCircle,
  FaCircle,
  FaIdCard,
  FaCalendarAlt,
  FaSyncAlt,
} from "react-icons/fa";

const CompanyAccount = ({ company }) => {
  return (
    <div className="profile-section-card">

      {/* HEADER */}

      <div className="section-header">

        <div className="d-flex align-items-center gap-3">

          <div className="section-icon">
            <FaUserShield />
          </div>

          <div>
            <h4 className="mb-1">
              Account Information
            </h4>

            <p className="mb-0">
              Company account status
            </p>
          </div>

        </div>

      </div>


      {/* ACCOUNT INFORMATION */}

      <div className="account-grid">

        {/* COMPANY ID */}

        <div>
          <span>
            <FaIdCard />
            Company ID
          </span>

          <strong>
            #{company.company_id}
          </strong>
        </div>


        {/* VERIFICATION */}

        <div>
          <span>
            <FaCheckCircle />
            Verification
          </span>

          <strong
            className={
              company.verification_status === "Verified"
                ? "text-success"
                : "text-warning"
            }
          >
            <FaCheckCircle />

            {company.verification_status || "Pending"}
          </strong>
        </div>


        {/* ACCOUNT STATUS */}

        <div>
          <span>
            <FaCircle />
            Account Status
          </span>

          <strong
            className={
              company.account_status === "Active"
                ? "text-success"
                : "text-secondary"
            }
          >
            {company.account_status || "Inactive"}
          </strong>
        </div>


        {/* CREATED AT */}

        <div>
          <span>
            <FaCalendarAlt />
            Created At
          </span>

          <strong>
            {company.created_at
              ? new Date(
                  company.created_at
                ).toLocaleDateString()
              : "N/A"}
          </strong>
        </div>


        {/* LAST UPDATED */}

        <div>
          <span>
            <FaSyncAlt />
            Last Updated
          </span>

          <strong>
            {company.updated_at
              ? new Date(
                  company.updated_at
                ).toLocaleDateString()
              : "N/A"}
          </strong>
        </div>

      </div>

    </div>
  );
};

export default CompanyAccount;

