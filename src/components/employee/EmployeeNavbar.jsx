import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import api from "../../services/api";

const EmployeeNavbar = () => {
  const navigate = useNavigate();

  // ==========================================
  // GET LOGGED IN USER
  // ==========================================

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const user_id = user?.user_id;

  // ==========================================
  // PROFILE STATE
  // ==========================================

  const [profile, setProfile] = useState(null);

  // ==========================================
  // GET EMPLOYEE PROFILE
  // ==========================================

  useEffect(() => {
    const getProfile = async () => {
      try {
        if (!user_id) return;

        const res = await api.get(
          `/employee/profile/${user_id}`
        );

        if (res.data.success) {
          setProfile(
            res.data.employee ||
            res.data.profile ||
            res.data.data
          );
        }
      } catch (error) {
        console.log(
          "Navbar Profile Error:",
          error
        );
      }
    };

    getProfile();
  }, [user_id]);

  // ==========================================
  // DYNAMIC NAME
  // ==========================================

  const userName =
    profile?.name ||
    user?.name ||
    "Employee";

  // ==========================================
  // DYNAMIC PROFILE IMAGE
  // ==========================================

  const profileImage =
    profile?.profile_image ||
    profile?.profileImage ||
    profile?.profile_photo ||
    profile?.photo ||
    profile?.image ||
    null;

  // ==========================================
  // IMAGE URL
  // uploads/profiles/
  // ==========================================

  const imageUrl = profileImage
    ? profileImage.startsWith("http")
      ? profileImage
      : `http://localhost:5000/uploads/employee/profiles/${profileImage}`
    : "https://i.pravatar.cc/150?img=12";

  // ==========================================
  // LOGOUT
  // ==========================================

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/employee/login");
  };

  // ==========================================
  // JSX
  // ==========================================

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow sticky-top">

      <div className="container">

        {/* =====================================
            LOGO
        ====================================== */}

        <Link
          className="navbar-brand fw-bold fs-3"
          to="/employee/dashboard"
        >
          <i className="bi bi-briefcase-fill me-2"></i>
          JobPortal
        </Link>

        {/* =====================================
            MOBILE TOGGLE
        ====================================== */}

        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse"
          id="navbarContent"
        >

          {/* =====================================
              MAIN MENU
          ====================================== */}

          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">

            {/* Dashboard */}

            <li className="nav-item">
              <NavLink
                className="nav-link px-3"
                to="/employee/dashboard"
              >
                Dashboard
              </NavLink>
            </li>

            {/* Browse Jobs */}

            <li className="nav-item">
              <NavLink
                className="nav-link px-3"
                to="/employee/jobs"
              >
                Browse Jobs
              </NavLink>
            </li>

            {/* Applied Jobs */}

            <li className="nav-item">
              <NavLink
                className="nav-link px-3"
                to="/employee/applied-jobs"
              >
                Applied Jobs
              </NavLink>
            </li>

            {/* Saved Jobs */}

            <li className="nav-item">
              <NavLink
                className="nav-link px-3"
                to="/employee/saved-jobs"
              >
                Saved Jobs
              </NavLink>
            </li>

          </ul>

          {/* =====================================
              RIGHT SIDE
          ====================================== */}

          <ul className="navbar-nav align-items-center">

            {/* =================================
                NOTIFICATION
            ================================== */}

            <li className="nav-item me-3">

              <Link
                className="nav-link position-relative"
                to="/employee/notifications"
              >

                <i className="bi bi-bell-fill fs-5"></i>

                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  5
                </span>

              </Link>

            </li>

            {/* =================================
                PROFILE DROPDOWN
            ================================== */}

            <li className="nav-item dropdown">

              <button
                type="button"
                className="nav-link dropdown-toggle d-flex align-items-center border-0 bg-transparent"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >

                {/* Profile Image */}

                <img
                  src={imageUrl}
                  alt={userName}
                  width="42"
                  height="42"
                  className="rounded-circle border border-2 border-white me-2"
                  style={{
                    objectFit: "cover",
                  }}
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://i.pravatar.cc/150?img=12";
                  }}
                />

                {/* Dynamic Name */}

                <span>
                  {userName}
                </span>

              </button>

              {/* =================================
                  DROPDOWN MENU
              ================================== */}

              <ul className="dropdown-menu dropdown-menu-end shadow border-0">

                {/* My Profile */}

                <li>
                  <Link
                    className="dropdown-item"
                    to="/employee/profile"
                  >
                    <i className="bi bi-person me-2"></i>
                    My Profile
                  </Link>
                </li>

                

                {/* Settings */}

                <li>
                  <Link
                    className="dropdown-item"
                    to="/employee/settings"
                  >
                    <i className="bi bi-gear me-2"></i>
                    Settings
                  </Link>
                </li>

                <li>
                  <hr className="dropdown-divider" />
                </li>

                {/* Logout */}

                <li>
                  <button
                    type="button"
                    className="dropdown-item text-danger"
                    onClick={handleLogout}
                  >
                    <i className="bi bi-box-arrow-right me-2"></i>
                    Logout
                  </button>
                </li>

              </ul>

            </li>

          </ul>

        </div>

      </div>

    </nav>
  );
};

export default EmployeeNavbar;