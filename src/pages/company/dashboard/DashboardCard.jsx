
import React from "react";

const colors = {
    primary: {
        bg: "#2563eb",
        light: "rgba(37, 99, 235, 0.10)",
    },
    success: {
        bg: "#10b981",
        light: "rgba(16, 185, 129, 0.10)",
    },
    warning: {
        bg: "#f59e0b",
        light: "rgba(245, 158, 11, 0.12)",
    },
    danger: {
        bg: "#ef4444",
        light: "rgba(239, 68, 68, 0.10)",
    },
};

const DashboardCard = ({
    title,
    value,
    icon,
    color = "primary"
}) => {

    const theme = colors[color] || colors.primary;

    return (

        <div
            className="card border-0 h-100"
            style={{
                borderRadius: "18px",
                background: "#ffffff",
                boxShadow: "0 8px 28px rgba(15, 23, 42, 0.07)",
                transition: "all 0.25s ease",
                overflow: "hidden"
            }}

            onMouseEnter={(e) => {
                e.currentTarget.style.transform =
                    "translateY(-4px)";

                e.currentTarget.style.boxShadow =
                    "0 14px 32px rgba(15, 23, 42, 0.11)";
            }}

            onMouseLeave={(e) => {
                e.currentTarget.style.transform =
                    "translateY(0)";

                e.currentTarget.style.boxShadow =
                    "0 8px 28px rgba(15, 23, 42, 0.07)";
            }}
        >

            <div className="card-body p-4">

                <div className="d-flex justify-content-between align-items-center">

                    {/* =========================
                        CONTENT
                    ========================= */}

                    <div>

                        <small
                            className="d-block mb-2"
                            style={{
                                color: "#64748b",
                                fontSize: "12px",
                                fontWeight: "600",
                                letterSpacing: "0.3px"
                            }}
                        >
                            {title}
                        </small>


                        <h2
                            className="mb-0"
                            style={{
                                color: "#0f172a",
                                fontSize: "30px",
                                fontWeight: "750",
                                letterSpacing: "-0.8px"
                            }}
                        >
                            {value}
                        </h2>

                    </div>


                    {/* =========================
                        ICON
                    ========================= */}

                    <div
                        className="d-flex align-items-center justify-content-center"
                        style={{
                            width: "58px",
                            height: "58px",
                            borderRadius: "16px",

                            background: theme.light,
                            color: theme.bg,

                            fontSize: "22px",

                            flexShrink: 0
                        }}
                    >
                        {icon}
                    </div>

                </div>


                {/* =========================
                    BOTTOM ACCENT
                ========================= */}

                <div
                    className="mt-4"
                    style={{
                        height: "3px",
                        width: "42px",
                        borderRadius: "10px",
                        background: theme.bg
                    }}
                />

            </div>

        </div>
    );
};

export default DashboardCard;

