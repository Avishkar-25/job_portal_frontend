
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowRight,
  FaBuilding,
  FaBriefcase,
  FaUsers,
} from "react-icons/fa";

const WelcomeCard = ({ companyName }) => {

  const navigate = useNavigate();

  return (

    <div
      className="card border-0 shadow-sm mb-4 overflow-hidden"
      style={{
        borderRadius: "20px",
        background:
          "linear-gradient(135deg, #0f172a 0%, #1e3a8a 55%, #2563eb 100%)",
        color: "#fff",
        position: "relative",
      }}
    >

      {/* Decorative Background */}
      <div
        style={{
          position: "absolute",
          width: "220px",
          height: "220px",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.06)",
          right: "-70px",
          top: "-80px",
        }}
      />

      <div
        style={{
          position: "absolute",
          width: "160px",
          height: "160px",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.04)",
          right: "120px",
          bottom: "-90px",
        }}
      />


      <div className="card-body p-4 p-lg-5 position-relative">

        <div className="row align-items-center">

          {/* LEFT CONTENT */}
          <div className="col-lg-8">

            <div className="mb-3">

              <span
                className="d-inline-flex align-items-center px-3 py-2 rounded-pill"
                style={{
                  background: "rgba(255,255,255,0.12)",
                  fontSize: "13px",
                  fontWeight: "600",
                }}
              >
                <FaBuilding className="me-2" />

                Employer Dashboard
              </span>

            </div>


            <h2
              className="fw-bold mb-2"
              style={{
                fontSize: "clamp(24px, 3vw, 34px)",
                letterSpacing: "-0.5px",
              }}
            >
              Welcome Back, {companyName || "Company"} 👋
            </h2>


            <p
              className="mb-4"
              style={{
                color: "rgba(255,255,255,0.78)",
                fontSize: "15px",
                maxWidth: "600px",
                lineHeight: "1.7",
              }}
            >
              Manage your job postings, review applicants and keep your
              company profile up to date — all from one place.
            </p>


            {/* QUICK INFO */}
            <div className="d-flex flex-wrap gap-3 mb-4">

              <div
                className="d-flex align-items-center"
                style={{
                  color: "rgba(255,255,255,0.85)",
                  fontSize: "14px",
                }}
              >
                <FaBriefcase className="me-2" />

                Manage Jobs
              </div>


              <div
                className="d-flex align-items-center"
                style={{
                  color: "rgba(255,255,255,0.85)",
                  fontSize: "14px",
                }}
              >
                <FaUsers className="me-2" />

                Find Candidates
              </div>

            </div>


            {/* BUTTON */}
            <button
              type="button"
              className="btn btn-light rounded-pill px-4 py-2 fw-semibold"
              onClick={() => navigate("/company/profile")}
              style={{
                transition: "all 0.25s ease",
              }}
            >

              View Company Profile

              <FaArrowRight className="ms-2" />

            </button>

          </div>


          {/* RIGHT ICON */}
          <div className="col-lg-4 text-center mt-4 mt-lg-0">

            <div
              className="d-flex align-items-center justify-content-center mx-auto"
              style={{
                width: "145px",
                height: "145px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.10)",
                border: "1px solid rgba(255,255,255,0.15)",
                boxShadow:
                  "0 15px 40px rgba(0,0,0,0.15)",
              }}
            >

              <div
                className="d-flex align-items-center justify-content-center"
                style={{
                  width: "105px",
                  height: "105px",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.12)",
                  fontSize: "44px",
                }}
              >

                <FaBuilding />

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
};

export default WelcomeCard;

