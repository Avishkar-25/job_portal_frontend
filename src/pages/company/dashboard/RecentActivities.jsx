
import React from "react";

const activities = [
  {
    title: "React Developer Job Posted",
    time: "2 hours ago",
    status: "Active",
    badge: "success",
  },
  {
    title: "15 New Applications Received",
    time: "Today",
    status: "New",
    badge: "primary",
  },
  {
    title: "Company Profile Updated",
    time: "Yesterday",
    status: "Updated",
    badge: "warning",
  },
];

const badgeStyles = {
  primary: {
    background: "#e7f1ff",
    color: "#0d6efd",
  },
  success: {
    background: "#eaf7ef",
    color: "#198754",
  },
  warning: {
    background: "#fff8e1",
    color: "#b58100",
  },
  danger: {
    background: "#fdecec",
    color: "#dc3545",
  },
};

const RecentActivities = () => {
  return (
    <div
      className="card border-0 shadow-sm h-100"
      style={{
        borderRadius: "18px",
        overflow: "hidden",
      }}
    >
      <div className="card-body p-4">

        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-3">

          <div>
            <h4 className="fw-bold mb-1">
              Recent Activities
            </h4>

            <small className="text-muted">
              Latest company activity
            </small>
          </div>

        </div>


        {/* Activities */}
        <div>

          {activities.map((item, index) => {

            const theme =
              badgeStyles[item.badge] || badgeStyles.primary;

            return (
              <div
                key={index}
                className="d-flex align-items-center justify-content-between py-3"
                style={{
                  borderBottom:
                    index !== activities.length - 1
                      ? "1px solid #eef1f5"
                      : "none",
                }}
              >

                {/* Left */}
                <div className="d-flex align-items-center">

                  {/* Activity Icon */}
                  <div
                    className="d-flex align-items-center justify-content-center me-3"
                    style={{
                      width: "42px",
                      height: "42px",
                      borderRadius: "12px",
                      background: theme.background,
                      color: theme.color,
                      flexShrink: 0,
                    }}
                  >
                    <i className="fas fa-bell"></i>
                  </div>


                  {/* Activity Content */}
                  <div>

                    <h6
                      className="mb-1 fw-semibold"
                      style={{
                        color: "#1f2937",
                      }}
                    >
                      {item.title}
                    </h6>

                    <small className="text-muted">
                      {item.time}
                    </small>

                  </div>

                </div>


                {/* Status */}
                <span
                  className="fw-semibold"
                  style={{
                    background: theme.background,
                    color: theme.color,
                    padding: "6px 12px",
                    borderRadius: "50px",
                    fontSize: "12px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.status}
                </span>

              </div>
            );
          })}

        </div>

      </div>
    </div>
  );
};

export default RecentActivities;

