import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaArrowLeft,
  FaGraduationCap,
  FaCode,
  FaFilePdf,
  FaUserCircle,
  FaBriefcase,
  FaFileAlt,
  FaShareAlt,
  FaUser,
  FaMapMarkerAlt,
  FaCheckCircle,
} from "react-icons/fa";

import { getEmployeeProfile } from "../../services/employeeProfileApi";

const EditProfile = () => {
  const navigate = useNavigate();

  // =====================================
  // State
  // =====================================

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // =====================================
  // Get User ID
  // =====================================

  const user = JSON.parse(localStorage.getItem("user"));

  const user_id = user?.user_id;

  // =====================================
  // Get Profile
  // =====================================

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!user_id) {
          console.log("User ID not found");
          setLoading(false);
          return;
        }

        const response = await getEmployeeProfile(user_id);

        console.log("Edit Profile Data:", response.data);

        if (response.data?.success) {
          setProfile(response.data.profile);
        }
      } catch (error) {
        console.log("Profile fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user_id]);

  // =====================================
  // Check Value
  // =====================================

  const hasValue = (value) => {
    if (value === null || value === undefined) {
      return false;
    }

    if (typeof value === "string") {
      return value.trim() !== "";
    }

    return true;
  };

  // =====================================
  // Section Completion
  // =====================================

  const sectionStatus = {
    education:
      Array.isArray(profile?.education) &&
      profile.education.length > 0,

    skills:
      Array.isArray(profile?.skills) &&
      profile.skills.length > 0,

    resume: hasValue(profile?.resume),

    "profile-photo": hasValue(profile?.profile_photo),

    "professional-details":
      hasValue(profile?.experience) &&
      hasValue(profile?.current_company) &&
      hasValue(profile?.current_salary) &&
      hasValue(profile?.expected_salary),

    "professional-summary":
      hasValue(profile?.professional_summary),

    "social-profiles":
      hasValue(profile?.linkedin) ||
      hasValue(profile?.github) ||
      hasValue(profile?.portfolio),

    about: hasValue(profile?.about),

    address:
      hasValue(profile?.address) &&
      hasValue(profile?.city) &&
      hasValue(profile?.state) &&
      hasValue(profile?.country) &&
      hasValue(profile?.pincode),
  };

  // =====================================
  // Calculate Completion
  // =====================================

  const totalSections = Object.keys(sectionStatus).length;

  const completedSections = Object.values(sectionStatus).filter(
    Boolean
  ).length;

  const completionPercentage =
    totalSections > 0
      ? Math.round((completedSections / totalSections) * 100)
      : 0;

  // =====================================
  // Redirect to Profile Section
  // =====================================

  const handleComplete = (section) => {
    navigate("/employee/profile", {
      state: {
        scrollTo: section,
      },
    });
  };

  // =====================================
  // Loading
  // =====================================

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary"></div>

        <p className="text-muted mt-3 mb-0">
          Loading profile...
        </p>
      </div>
    );
  }

  // =====================================
  // Section Data
  // =====================================

  const sections = [
    {
      key: "education",
      title: "Education",
      description:
        "Add your qualification, college, passing year and CGPA.",
      icon: <FaGraduationCap />,
      iconClass: "bg-primary bg-opacity-10 text-primary",
      buttonClass: "btn-primary",
      buttonText: "Complete Education",
    },

    {
      key: "skills",
      title: "Skills",
      description:
        "Add your technical and professional skills with skill level.",
      icon: <FaCode />,
      iconClass: "bg-success bg-opacity-10 text-success",
      buttonClass: "btn-success",
      buttonText: "Add Skills",
    },

    {
      key: "resume",
      title: "Resume",
      description:
        "Upload your latest resume in PDF format.",
      icon: <FaFilePdf />,
      iconClass: "bg-danger bg-opacity-10 text-danger",
      buttonClass: "btn-danger",
      buttonText: "Upload Resume",
    },

    {
      key: "profile-photo",
      title: "Profile Photo",
      description:
        "Add a professional profile photo to your account.",
      icon: <FaUserCircle />,
      iconClass: "bg-warning bg-opacity-10 text-warning",
      buttonClass: "btn-warning",
      buttonText: "Add Profile Photo",
    },

    {
      key: "professional-details",
      title: "Professional Details",
      description:
        "Add experience, current company, current and expected salary.",
      icon: <FaBriefcase />,
      iconClass: "bg-info bg-opacity-10 text-info",
      buttonClass: "btn-info text-white",
      buttonText: "Complete Details",
    },

    {
      key: "professional-summary",
      title: "Professional Summary",
      description:
        "Add a short professional summary about yourself.",
      icon: <FaFileAlt />,
      iconClass: "bg-secondary bg-opacity-10 text-secondary",
      buttonClass: "btn-secondary",
      buttonText: "Add Summary",
    },

    {
      key: "social-profiles",
      title: "Social Profiles",
      description:
        "Add your LinkedIn, GitHub and portfolio profiles.",
      icon: <FaShareAlt />,
      iconClass: "bg-dark bg-opacity-10 text-dark",
      buttonClass: "btn-dark",
      buttonText: "Add Social Profiles",
    },

    {
      key: "about",
      title: "About Me",
      description:
        "Tell employers about yourself, your interests and experience.",
      icon: <FaUser />,
      iconClass: "bg-primary bg-opacity-10 text-primary",
      buttonClass: "btn-primary",
      buttonText: "Add About Me",
    },

    {
      key: "address",
      title: "Address",
      description:
        "Add your complete address, state, country and pincode.",
      icon: <FaMapMarkerAlt />,
      iconClass: "bg-success bg-opacity-10 text-success",
      buttonClass: "btn-success",
      buttonText: "Complete Address",
    },
  ];

  // =====================================
  // Pending Sections
  // =====================================

  const pendingSections = sections.filter(
    (section) => !sectionStatus[section.key]
  );

  return (
    <div className="container py-4">

      {/* =====================================
          Header
      ===================================== */}

      <div className="d-flex align-items-center mb-4">

        <button
          type="button"
          className="btn btn-light border rounded-circle me-3 d-flex align-items-center justify-content-center"
          style={{
            width: "44px",
            height: "44px",
          }}
          onClick={() =>
            navigate("/employee/profile")
          }
        >
          <FaArrowLeft />
        </button>

        <div>
          <h3 className="fw-bold mb-1">
            Complete Your Profile
          </h3>

          <p className="text-muted mb-0">
            Complete the missing details to improve your profile
          </p>
        </div>

      </div>

      {/* =====================================
          Profile Completion
      ===================================== */}

      <div className="card border-0 shadow-sm rounded-4 mb-4">

        <div className="card-body p-4">

          <div className="d-flex justify-content-between align-items-center mb-2">

            <div>
              <h5 className="fw-bold mb-1">
                Profile Completion
              </h5>

              <small className="text-muted">
                {completedSections} of {totalSections} sections completed
              </small>
            </div>

            <span
              className={`badge rounded-pill px-3 py-2 ${
                completionPercentage === 100
                  ? "bg-success"
                  : "bg-primary"
              }`}
            >
              {completionPercentage}%
            </span>

          </div>

          <div
            className="progress mt-3"
            style={{
              height: "10px",
            }}
          >
            <div
              className={`progress-bar ${
                completionPercentage === 100
                  ? "bg-success"
                  : ""
              }`}
              role="progressbar"
              style={{
                width: `${completionPercentage}%`,
              }}
            />
          </div>

          {completionPercentage === 100 && (
            <div className="text-success small fw-semibold mt-3">
              <FaCheckCircle className="me-2" />
              Your profile is complete!
            </div>
          )}

        </div>

      </div>

      {/* =====================================
          All Completed Message
      ===================================== */}

      {pendingSections.length === 0 && (
        <div className="alert alert-success rounded-4 border-0 shadow-sm mb-4">
          <FaCheckCircle className="me-2" />

          <strong>Great!</strong> You have completed all
          profile sections.
        </div>
      )}

      {/* =====================================
          Missing Details
      ===================================== */}

      {pendingSections.length > 0 && (
        <>
          <div className="mb-3">

            <h5 className="fw-bold mb-1">
              Complete These Sections
            </h5>

            <p className="text-muted small mb-0">
              These sections still need your attention.
            </p>

          </div>

          <div className="row g-4">

            {pendingSections.map((section) => (

              <div
                className="col-md-6 col-lg-4"
                key={section.key}
              >

                <div className="card border-0 shadow-sm rounded-4 h-100">

                  <div className="card-body p-4">

                    {/* Icon */}

                    <div
                      className={`rounded-3 ${section.iconClass} d-flex align-items-center justify-content-center mb-3`}
                      style={{
                        width: "55px",
                        height: "55px",
                        fontSize: "24px",
                      }}
                    >
                      {section.icon}
                    </div>

                    {/* Title */}

                    <h5 className="fw-bold">
                      {section.title}
                    </h5>

                    {/* Description */}

                    <p className="text-muted small">
                      {section.description}
                    </p>

                    {/* Status */}

                    <div className="mb-3">

                      <span className="badge bg-warning text-dark rounded-pill">
                        Incomplete
                      </span>

                    </div>

                    {/* Button */}

                    <button
                      type="button"
                      className={`btn ${section.buttonClass} w-100 rounded-pill`}
                      onClick={() =>
                        handleComplete(section.key)
                      }
                    >
                      {section.buttonText}
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>
        </>
      )}

    </div>
  );
};

export default EditProfile;