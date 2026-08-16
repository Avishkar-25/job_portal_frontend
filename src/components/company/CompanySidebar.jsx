
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import {
    FaHome,
    FaPlusCircle,
    FaBriefcase,
    FaUsers,
    FaChartBar,
    FaBuilding,
    FaCog,
    FaSignOutAlt,
    FaBars,
    FaTimes
} from "react-icons/fa";

import "./CompanySidebar.css";

const CompanySidebar = () => {

    const [open, setOpen] = useState(false);

    const navigate = useNavigate();

    // ==========================================
    // COMPANY DATA
    // ==========================================

    let company = null;

    try {
        const storedCompany = localStorage.getItem("company");

        if (storedCompany) {
            company = JSON.parse(storedCompany);
        }
    } catch (error) {
        console.error("Invalid company data:", error);
        company = null;
    }


    // ==========================================
    // LOGOUT
    // ==========================================

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("company");

        setOpen(false);

        navigate("/company/login");
    };


    // ==========================================
    // MENU ITEMS
    // ==========================================

    const menuItems = [
        {
            label: "Dashboard",
            icon: FaHome,
            path: "/company/dashboard"
        },
        {
            label: "Post Job",
            icon: FaPlusCircle,
            path: "/company/post-job"
        },
        {
            label: "Manage Jobs",
            icon: FaBriefcase,
            path: "/company/manage-jobs"
        },
        {
            label: "Applicants",
            icon: FaUsers,
            path: "/company/applicants"
        },
        {
            label: "Analytics",
            icon: FaChartBar,
            path: "/company/analytics"
        },
        {
            label: "Company Profile",
            icon: FaBuilding,
            path: "/company/profile"
        },
        {
            label: "Settings",
            icon: FaCog,
            path: "/company/settings"
        }
    ];


    // ==========================================
    // CLOSE MOBILE SIDEBAR
    // ==========================================

    const handleMenuClick = () => {
        setOpen(false);
    };


    return (
        <>

            {/* ==========================================
                MOBILE MENU BUTTON
            ========================================== */}

            <button
                type="button"
                className={`company-mobile-menu-btn ${
                    open ? "menu-open" : ""
                }`}
                onClick={() => setOpen(!open)}
                aria-label="Toggle company menu"
            >
                {open ? <FaTimes /> : <FaBars />}
            </button>


            {/* ==========================================
                MOBILE OVERLAY
            ========================================== */}

            {open && (
                <div
                    className="company-sidebar-overlay"
                    onClick={() => setOpen(false)}
                />
            )}


            {/* ==========================================
                SIDEBAR
            ========================================== */}

            <aside
                className={`company-sidebar ${
                    open ? "sidebar-open" : ""
                }`}
            >

                {/* ======================================
                    BRAND
                ====================================== */}

                <div className="company-sidebar-brand">

                    <div className="brand-logo">
                        <FaBuilding />
                    </div>

                    <div className="brand-content">

                        <h2>
                            JobPortal
                        </h2>

                        <span>
                            Employer Panel
                        </span>

                    </div>

                </div>


                {/* ======================================
                    NAVIGATION
                ====================================== */}

                <nav className="company-sidebar-nav">

                    <div className="nav-section-title">
                        MAIN MENU
                    </div>


                    {menuItems.map((item) => {

                        const Icon = item.icon;

                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                onClick={handleMenuClick}
                                className={({ isActive }) =>
                                    `company-nav-link ${
                                        isActive
                                            ? "active"
                                            : ""
                                    }`
                                }
                            >

                                <span className="nav-icon">
                                    <Icon />
                                </span>

                                <span className="nav-label">
                                    {item.label}
                                </span>

                                <span className="nav-active-indicator" />

                            </NavLink>
                        );
                    })}

                </nav>


                {/* ======================================
                    BOTTOM AREA
                ====================================== */}

                <div className="company-sidebar-bottom">

                    {/* ==================================
                        COMPANY PROFILE
                    ================================== */}

                    <div className="sidebar-company-card">

                        <div className="sidebar-company-avatar">

                            {company?.logo ? (

                                <img
                                    src={
                                        company.logo.startsWith("http")
                                            ? company.logo
                                            : `http://localhost:5000/uploads/company/logos/${company.logo}`
                                    }
                                    alt={
                                        company.company_name ||
                                        "Company"
                                    }
                                />

                            ) : (

                                <FaBuilding />

                            )}

                        </div>


                        <div className="sidebar-company-info">

                            <strong>
                                {company?.company_name ||
                                    "Your Company"}
                            </strong>

                            <span>
                                Employer
                            </span>

                        </div>

                    </div>


                    {/* ==================================
                        LOGOUT
                    ================================== */}

                    <button
                        type="button"
                        className="company-logout-btn"
                        onClick={logout}
                    >

                        <span className="logout-icon">
                            <FaSignOutAlt />
                        </span>

                        <span>
                            Logout
                        </span>

                    </button>

                </div>

            </aside>

        </>
    );
};

export default CompanySidebar;

