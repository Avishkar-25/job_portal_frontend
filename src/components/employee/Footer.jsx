import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
const Footer = () => {
  return (
    <footer className="bg-dark text-light pt-5 pb-3 mt-5">

      <div className="container">

        <div className="row g-4">

          {/* Logo */}
          <div className="col-lg-4">

            <h3 className="fw-bold text-primary">
              JobPortal
            </h3>

            <p className="text-light-emphasis mt-3">
              Find your dream job with top companies.
              Explore thousands of verified jobs across India.
            </p>

          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6">

            <h5 className="fw-bold mb-3">
              Quick Links
            </h5>

            <ul className="list-unstyled">

              <li className="mb-2">
                <Link className="footer-link" to="/">
                  Home
                </Link>
              </li>

              <li className="mb-2">
                <Link className="footer-link" to="/employee/jobs">
                  Browse Jobs
                </Link>
              </li>

              <li className="mb-2">
                <Link className="footer-link" to="/about">
                  About
                </Link>
              </li>

              <li>
                <Link className="footer-link" to="/contact">
                  Contact
                </Link>
              </li>

            </ul>

          </div>

          {/* Employee */}
          <div className="col-lg-3 col-md-6">

            <h5 className="fw-bold mb-3">
              Employee
            </h5>

            <ul className="list-unstyled">

              <li className="mb-2">
                <Link className="footer-link" to="/employee/register">
                  Register
                </Link>
              </li>

              <li className="mb-2">
                <Link className="footer-link" to="/employee/login">
                  Login
                </Link>
              </li>

              <li className="mb-2">
                <Link className="footer-link" to="/employee/profile">
                  My Profile
                </Link>
              </li>

              <li>
                <Link className="footer-link" to="/employee/applied-jobs">
                  Applied Jobs
                </Link>
              </li>

            </ul>

          </div>

          {/* Contact */}
          <div className="col-lg-3">

            <h5 className="fw-bold mb-3">
              Contact
            </h5>

            <p className="mb-2">
              📍 Ahmednagar, Maharashtra
            </p>

            <p className="mb-2">
              📧 support@jobportal.com
            </p>

            <p>
              📞 +91 9876543210
            </p>

            <div className="d-flex gap-3 mt-3">

              <a href="/" className="social-icon">
                <i className="bi bi-facebook"></i>
              </a>

              <a href="/" className="social-icon">
                <i className="bi bi-instagram"></i>
              </a>

              <a href="/" className="social-icon">
                <i className="bi bi-linkedin"></i>
              </a>

              <a href="/" className="social-icon">
                <i className="bi bi-twitter-x"></i>
              </a>

            </div>

          </div>

        </div>

        <hr className="border-secondary my-4" />

        <div className="text-center">

          <p className="mb-0 text-light-emphasis">
            © 2026 JobPortal. All Rights Reserved.
          </p>

        </div>

      </div>

    </footer>
  );
};

export default Footer;