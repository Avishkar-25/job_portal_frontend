import React from "react";
import { useNavigate } from "react-router-dom";

import {
    FaBriefcase,
    FaUsers,
    FaBuilding,
    FaArrowRight
} from "react-icons/fa";
import "./QuickActions.css";
const QuickActions = () => {

    const navigate = useNavigate();

    const actions = [
        {
            title: "Post New Job",
            description: "Create and publish a new job opening",
            icon: FaBriefcase,
            path: "/company/post-job",
            color: "#2563eb",
            light: "rgba(37, 99, 235, 0.10)"
        },
        {
            title: "View Candidates",
            description: "Review and manage job applicants",
            icon: FaUsers,
            path: "/company/applicants",
            color: "#10b981",
            light: "rgba(16, 185, 129, 0.10)"
        },
        {
            title: "Edit Profile",
            description: "Update your company information",
            icon: FaBuilding,
            path: "/company/profile",
            color: "#8b5cf6",
            light: "rgba(139, 92, 246, 0.10)"
        }
    ];

    return (

        <div
            className="card border-0 h-100"
            style={{
                borderRadius: "18px",
                background: "#ffffff",
                boxShadow:
                    "0 8px 28px rgba(15, 23, 42, 0.07)",
                overflow: "hidden"
            }}
        >

            <div className="card-body p-4">

                {/* =========================
                    HEADER
                ========================= */}

                <div className="mb-4">

                    <h4
                        className="mb-1"
                        style={{
                            color: "#0f172a",
                            fontSize: "18px",
                            fontWeight: "750",
                            letterSpacing: "-0.3px"
                        }}
                    >
                        Quick Actions
                    </h4>

                    <p
                        className="mb-0"
                        style={{
                            color: "#64748b",
                            fontSize: "12px"
                        }}
                    >
                        Manage your company quickly
                    </p>

                </div>


                {/* =========================
                    ACTIONS
                ========================= */}

                <div className="d-flex flex-column gap-3">

                    {actions.map((action) => {

                        const Icon = action.icon;

                        return (

                            <button
                                key={action.title}
                                type="button"
                                onClick={() =>
                                    navigate(action.path)
                                }
                                className="quick-action-item"
                                style={{
                                    "--action-color": action.color,
                                    "--action-light": action.light
                                }}
                            >

                                {/* ICON */}

                                <span className="quick-action-icon">

                                    <Icon />

                                </span>


                                {/* CONTENT */}

                                <span className="quick-action-content">

                                    <strong>
                                        {action.title}
                                    </strong>

                                    <small>
                                        {action.description}
                                    </small>

                                </span>


                                {/* ARROW */}

                                <span className="quick-action-arrow">

                                    <FaArrowRight />

                                </span>

                            </button>

                        );

                    })}

                </div>

            </div>

        </div>
    );
};

export default QuickActions;

