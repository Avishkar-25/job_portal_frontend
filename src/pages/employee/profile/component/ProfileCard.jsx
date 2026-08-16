
import React, { useState, useEffect } from "react";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaBirthdayCake,
  FaMars,
  FaEdit,
  FaCheckCircle,
} from "react-icons/fa";

import EditProfileModal from "../modals/EditProfileModal";
import { getEmployeeProfile } from "../../../../services/employeeProfileApi";

const ProfileCard = () => {

  const [showEditModal, setShowEditModal] = useState(false);

  const [profileImage, setProfileImage] = useState(
    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
  );

  const [profile, setProfile] = useState({
    fullName: "",
    profession: "",
    college: "",
    city: "",
    gender: "",
    dob: "",
    phone: "",
    email: "",

    // Additional fields for completion
    address: "",
    state: "",
    country: "",
    pincode: "",
    experience: "",
    current_company: "",
    current_salary: "",
    expected_salary: "",
    linkedin: "",
    github: "",
    portfolio: "",
    about: "",
    professional_summary: "",

    // Education
    education: [],

    // Career Preferences
    careerPreferences: null,

    profileCompletion: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const user_id = user?.user_id;


  // =====================================================
  // Calculate Profile Completion
  // =====================================================

  const calculateProfileCompletion = (data) => {

    const fields = [

      // Basic Information
      data.full_name,
      data.email,
      data.phone,
      data.gender,
      data.dob,

      // Address
      data.address,
      data.city,
      data.state,
      data.country,
      data.pincode,

      // Professional
      data.profession,
      data.experience,
      data.current_company,
      data.current_salary,
      data.expected_salary,

      // Profile
      data.about,
      data.professional_summary,

      // Social
      data.linkedin,
      data.github,
      data.portfolio,

      // Resume
      data.resume,

      // Profile Photo
      data.profile_photo,
    ];


    let completed = fields.filter(
      (field) =>
        field !== null &&
        field !== undefined &&
        String(field).trim() !== ""
    ).length;


    let total = fields.length;


    // =================================================
    // Education
    // =================================================

    if (
      data.education &&
      data.education.length > 0
    ) {

      completed += 1;

    }

    total += 1;


    // =================================================
    // Career Preferences
    // =================================================

    const career = data.careerPreferences;

    if (
      career &&
      (
        career.job_type ||
        career.availability ||
        career.preferred_locations
      )
    ) {

      completed += 1;

    }

    total += 1;


    return Math.round(
      (completed / total) * 100
    );

  };


  // =====================================================
  // Load Profile
  // =====================================================

  const loadProfile = async () => {

    try {

      setLoading(true);

      const res =
        await getEmployeeProfile(user_id);


      if (res.data.success) {

        const data =
          res.data.profile;


        // Latest Education
        const latestEducation =
          data.education?.[0];


        // Calculate percentage
        const completion =
          calculateProfileCompletion(data);


        setProfile({

          fullName:
            data.full_name || "",

          profession:
            data.profession || "",

          college:
            latestEducation?.college_name || "",

          city:
            data.city || "",

          gender:
            data.gender || "",

          dob:
            data.dob
              ? data.dob.substring(0, 10)
              : "",

          phone:
            data.phone || "",

          email:
            data.email || "",


          // Additional fields
          address:
            data.address || "",

          state:
            data.state || "",

          country:
            data.country || "",

          pincode:
            data.pincode || "",

          experience:
            data.experience || "",

          current_company:
            data.current_company || "",

          current_salary:
            data.current_salary || "",

          expected_salary:
            data.expected_salary || "",

          linkedin:
            data.linkedin || "",

          github:
            data.github || "",

          portfolio:
            data.portfolio || "",

          about:
            data.about || "",

          professional_summary:
            data.professional_summary || "",


          // Education
          education:
            data.education || [],


          // Career Preferences
          careerPreferences:
            data.careerPreferences || null,


          // Dynamic Completion
          profileCompletion:
            completion,

        });


        // Profile Photo
        if (data.profile_photo) {

          setProfileImage(
            `http://localhost:5000/uploads/employee/profiles/${data.profile_photo}`
          );

        }


        setError("");

      }

    }
    catch (err) {

      console.error(err);

      setError(
        "Failed to load profile"
      );

    }
    finally {

      setLoading(false);

    }

  };


  // =====================================================
  // Load On Page
  // =====================================================

  useEffect(() => {

    if (user_id) {

      loadProfile();

    }

  }, [user_id]);


  // =====================================================
  // Loading
  // =====================================================

  if (loading) {

    return (

      <div className="container py-5">

        <div className="text-center">

          <div
            className="spinner-border text-primary"
            role="status"
          />

          <p className="text-muted mt-3">
            Loading profile...
          </p>

        </div>

      </div>

    );

  }


  // =====================================================
  // Error
  // =====================================================

  if (error) {

    return (

      <div className="container py-5">

        <div className="alert alert-danger">
          {error}
        </div>

      </div>

    );

  }


  return (

    <div className="container py-4">


      {/* =================================================
          Profile Card
      ================================================= */}

      <div
        className="card border-0 shadow-lg rounded-4 overflow-hidden"
        style={{
          background: "#fff",
        }}
      >


        {/* Top Accent */}

        <div
          style={{
            height: "8px",
            background:
              "linear-gradient(90deg, #0d6efd, #198754, #6f42c1)",
          }}
        />


        <div className="card-body p-4 p-lg-5">


          <div className="row align-items-center g-4">


            {/* =================================================
                Profile Image
            ================================================= */}

            <div className="col-lg-3 text-center">

              <div
                className="position-relative d-inline-block"
                style={{
                  padding: "6px",
                  borderRadius: "50%",
                  background:
                    "linear-gradient(135deg, #0d6efd, #198754)",
                }}
              >

                <img
                  src={profileImage}
                  alt="Profile"
                  className="rounded-circle bg-white"
                  style={{
                    width: "165px",
                    height: "165px",
                    objectFit: "cover",
                    display: "block",
                    border: "5px solid white",
                  }}
                />


                {/* =================================================
                    Dynamic Profile Completion
                ================================================= */}

                <div
                  className="position-absolute bg-white shadow rounded-pill px-3 py-1"
                  style={{
                    bottom: "-8px",
                    left: "50%",
                    transform:
                      "translateX(-50%)",
                    whiteSpace: "nowrap",
                  }}
                >

                  <span className="text-success fw-bold">

                    {profile.profileCompletion}%

                  </span>

                  <small className="text-muted ms-1">
                    Complete
                  </small>

                </div>

              </div>


              {/* =================================================
                  Progress Bar
              ================================================= */}

              {/* <div className="mt-4 px-3"> */}

                {/* <div className="d-flex justify-content-between mb-1">

                  <small className="text-muted">
                    Profile Completion
                  </small>

                  <small className="fw-bold text-success">

                    {profile.profileCompletion}%

                  </small>

                </div> */}
{/* 

                <div
                  className="progress"
                  style={{
                    height: "8px",
                  }}
                >

                  <div
                    className="progress-bar bg-success"
                    role="progressbar"
                    style={{
                      width:
                        `${profile.profileCompletion}%`,
                    }}
                  />

                </div> */}

              {/* </div> */}

            </div>


            {/* =================================================
                Profile Information
            ================================================= */}

            <div className="col-lg-9">


              {/* Name */}

              <div className="d-flex align-items-center flex-wrap gap-2">

                <h2 className="fw-bold mb-0">

                  {profile.fullName || "Your Name"}

                </h2>


                <button
                  type="button"
                  className="btn btn-light border rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    width: "40px",
                    height: "40px",
                  }}
                  onClick={() =>
                    setShowEditModal(true)
                  }
                  title="Edit Profile"
                >

                  <FaEdit
                    className="text-primary"
                  />

                </button>

              </div>


              {/* Profession */}

              <h5 className="text-primary fw-semibold mt-2 mb-1">

                {profile.profession ||
                  "Add your profession"}

              </h5>


              {/* College */}

              <p className="text-muted mb-4">

                {profile.college ||
                  "Add your education"}

              </p>


              <hr className="opacity-10" />


              {/* =================================================
                  Contact Information
              ================================================= */}

              <div className="row mt-4 g-3">


                {/* Location */}

                <div className="col-md-6">

                  <div className="d-flex align-items-center">

                    <div
                      className="rounded-3 bg-primary bg-opacity-10 text-primary d-flex align-items-center justify-content-center me-3"
                      style={{
                        width: "42px",
                        height: "42px",
                      }}
                    >

                      <FaMapMarkerAlt />

                    </div>


                    <div>

                      <small className="text-muted d-block">
                        Location
                      </small>

                      <span className="fw-semibold">

                        {profile.city ||
                          "Not added"}

                      </span>

                    </div>

                  </div>

                </div>


                {/* Gender */}

                <div className="col-md-6">

                  <div className="d-flex align-items-center">

                    <div
                      className="rounded-3 bg-info bg-opacity-10 text-info d-flex align-items-center justify-content-center me-3"
                      style={{
                        width: "42px",
                        height: "42px",
                      }}
                    >

                      <FaMars />

                    </div>


                    <div>

                      <small className="text-muted d-block">
                        Gender
                      </small>

                      <span className="fw-semibold">

                        {profile.gender ||
                          "Not added"}

                      </span>

                    </div>

                  </div>

                </div>


                {/* Date Of Birth */}

                <div className="col-md-6">

                  <div className="d-flex align-items-center">

                    <div
                      className="rounded-3 bg-warning bg-opacity-10 text-warning d-flex align-items-center justify-content-center me-3"
                      style={{
                        width: "42px",
                        height: "42px",
                      }}
                    >

                      <FaBirthdayCake />

                    </div>


                    <div>

                      <small className="text-muted d-block">
                        Date of Birth
                      </small>

                      <span className="fw-semibold">

                        {profile.dob ||
                          "Not added"}

                      </span>

                    </div>

                  </div>

                </div>


                {/* Phone */}

                <div className="col-md-6">

                  <div className="d-flex align-items-center">

                    <div
                      className="rounded-3 bg-success bg-opacity-10 text-success d-flex align-items-center justify-content-center me-3"
                      style={{
                        width: "42px",
                        height: "42px",
                      }}
                    >

                      <FaPhoneAlt />

                    </div>


                    <div>

                      <small className="text-muted d-block">
                        Phone
                      </small>

                      <span className="fw-semibold">

                        {profile.phone
                          ? `+91 ${profile.phone}`
                          : "Not added"}

                        {profile.phone && (

                          <FaCheckCircle
                            className="text-success ms-2"
                          />

                        )}

                      </span>

                    </div>

                  </div>

                </div>


                {/* Email */}

                <div className="col-12">

                  <div className="d-flex align-items-center">

                    <div
                      className="rounded-3 bg-danger bg-opacity-10 text-danger d-flex align-items-center justify-content-center me-3"
                      style={{
                        width: "42px",
                        height: "42px",
                      }}
                    >

                      <FaEnvelope />

                    </div>


                    <div>

                      <small className="text-muted d-block">
                        Email Address
                      </small>

                      <span className="fw-semibold">

                        {profile.email ||
                          "Not added"}

                        {profile.email && (

                          <FaCheckCircle
                            className="text-success ms-2"
                          />

                        )}

                      </span>

                    </div>

                  </div>

                </div>


              </div>

            </div>

          </div>

        </div>

      </div>


      {/* =================================================
          Edit Profile Modal
      ================================================= */}

      <EditProfileModal

        showEditModal={showEditModal}

        setShowEditModal={
          setShowEditModal
        }

        profile={profile}

        setProfile={setProfile}

        profileImage={profileImage}

        setProfileImage={
          setProfileImage
        }

        user_id={user_id}

        loadProfile={loadProfile}

      />

    </div>

  );

};

export default ProfileCard;

