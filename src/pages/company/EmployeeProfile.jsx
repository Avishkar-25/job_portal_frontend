import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";

import {
  FaArrowLeft,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaBriefcase,
  FaFilePdf,
  FaGraduationCap,
  FaTools,
} from "react-icons/fa";

const EmployeeProfile = () => {
  const { employee_id } = useParams();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, [employee_id]);

  const loadProfile = async () => {
    try {
      const res = await api.get(
        `/company/employee-profile/${employee_id}`
      );

      if (res.data.success) {
        setProfile(res.data.profile);
      }
    } catch (error) {
      console.error("Profile error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" />
        <h5 className="mt-3">Loading Employee Profile...</h5>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center py-5">
        <h4>Employee Profile Not Found</h4>

        <button
          className="btn btn-primary rounded-pill mt-3"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft className="me-2" />
          Back
        </button>
      </div>
    );
  }

  const profilePhoto = profile.profile_photo
    ? `http://localhost:5000/uploads/${profile.profile_photo}`
    : null;

const resumeUrl = profile?.resume
  ? profile.resume.startsWith("/uploads")
    ? `http://localhost:5000${profile.resume}`
    : `http://localhost:5000/uploads/${profile.resume}`
  : null;

  return (
    <div className="container-fluid py-4">

      {/* Back */}

      <button
        className="btn btn-outline-primary rounded-pill mb-4 px-4"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft className="me-2" />
        Back
      </button>

      {/* Profile Header */}

      <div className="card border-0 shadow rounded-4 mb-4 overflow-hidden">

        <div
          className="p-5 text-white"
          style={{
            background:
              "linear-gradient(135deg,#0d6efd,#6610f2)",
          }}
        >

          <div className="d-flex align-items-center flex-wrap">

            {profilePhoto ? (
              <img
                src={profilePhoto}
                alt={profile.full_name}
                className="rounded-circle border border-4 border-white"
                style={{
                  width: 110,
                  height: 110,
                  objectFit: "cover",
                }}
              />
            ) : (
              <div
                className="rounded-circle bg-white text-primary d-flex justify-content-center align-items-center"
                style={{
                  width: 110,
                  height: 110,
                  fontSize: 45,
                }}
              >
                <FaUser />
              </div>
            )}

            <div className="ms-4 mt-3 mt-md-0">

              <h2 className="fw-bold mb-1">
                {profile.full_name}
              </h2>

              <p className="mb-2">
                <FaBriefcase className="me-2" />
                {profile.experience || "Experience not specified"}
              </p>

              <p className="mb-0">
                <FaMapMarkerAlt className="me-2" />
                {profile.location || "Location not specified"}
              </p>

            </div>

          </div>

        </div>

      </div>

      <div className="row g-4">

        {/* Left */}

        <div className="col-lg-8">

          {/* About */}

          <div className="card border-0 shadow rounded-4 mb-4">

            <div className="card-body p-4">

              <h4 className="fw-bold mb-3">
                About
              </h4>

              <p className="text-muted mb-0">
                {profile.about || "No information available."}
              </p>

            </div>

          </div>

          {/* Contact */}

          <div className="card border-0 shadow rounded-4 mb-4">

            <div className="card-body p-4">

              <h4 className="fw-bold mb-4">
                Contact Information
              </h4>

              <div className="row g-3">

                <div className="col-md-6">

                  <div className="border rounded-4 p-3">

                    <small className="text-muted">
                      Email
                    </small>

                    <div className="fw-semibold mt-1">
                      <FaEnvelope className="text-primary me-2" />
                      {profile.email}
                    </div>

                  </div>

                </div>

                <div className="col-md-6">

                  <div className="border rounded-4 p-3">

                    <small className="text-muted">
                      Phone
                    </small>

                    <div className="fw-semibold mt-1">
                      <FaPhone className="text-primary me-2" />
                      {profile.phone || "N/A"}
                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* Skills */}

          <div className="card border-0 shadow rounded-4 mb-4">

            <div className="card-body p-4">

              <h4 className="fw-bold mb-4">
                <FaTools className="text-primary me-2" />
                Skills
              </h4>

              {profile.skills?.length > 0 ? (
                <div className="d-flex flex-wrap gap-2">

                  {profile.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="badge bg-primary fs-6 px-3 py-2"
                    >
                      {skill.skill_name}
                    </span>
                  ))}

                </div>
              ) : (
                <p className="text-muted">
                  No skills added.
                </p>
              )}

            </div>

          </div>

          {/* Education */}

          <div className="card border-0 shadow rounded-4">

            <div className="card-body p-4">

              <h4 className="fw-bold mb-4">
                <FaGraduationCap className="text-primary me-2" />
                Education
              </h4>

              {profile.education?.length > 0 ? (
                profile.education.map((edu, index) => (
                  <div
                    key={index}
                    className="border rounded-4 p-3 mb-3"
                  >

                    <h5 className="fw-bold">
                      {edu.qualification}
                    </h5>

                    <p className="mb-1">
                      {edu.college_name}
                    </p>

                    <small className="text-muted">
                      Passing Year: {edu.passing_year}
                      {" | "}
                      CGPA: {edu.cgpa || "N/A"}
                    </small>

                  </div>
                ))
              ) : (
                <p className="text-muted">
                  No education details available.
                </p>
              )}

            </div>

          </div>

        </div>

        {/* Right */}

        <div className="col-lg-4">

          {/* Experience */}

          <div className="card border-0 shadow rounded-4 mb-4">

            <div className="card-body p-4">

              <h5 className="fw-bold mb-3">
                Experience
              </h5>

              <div className="bg-primary bg-opacity-10 rounded-4 p-3">

                <FaBriefcase className="text-primary me-2" />

                <strong>
                  {profile.experience || "Not specified"}
                </strong>

              </div>

            </div>

          </div>

          {/* Resume */}

          <div className="card border-0 shadow rounded-4">

            <div className="card-body p-4 text-center">

              <FaFilePdf
                className="text-danger mb-3"
                style={{ fontSize: 60 }}
              />

              <h5 className="fw-bold">
                Resume
              </h5>

              {resumeUrl ? (
                <div className="d-grid gap-2 mt-3">

                  <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-danger rounded-pill"
                  >
                    <FaFilePdf className="me-2" />
                    View Resume
                  </a>

                  <a
                    href={resumeUrl}
                    download
                    className="btn btn-outline-danger rounded-pill"
                  >
                    Download Resume
                  </a>

                </div>
              ) : (
                <p className="text-muted mb-0">
                  Resume not uploaded.
                </p>
              )}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default EmployeeProfile;