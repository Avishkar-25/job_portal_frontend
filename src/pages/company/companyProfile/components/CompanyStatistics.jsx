import React from "react";

const CompanyStatistics = ({ stats }) => {
  const statistics = [
    {
      title: "Total Jobs",
      value: stats.totalJobs,
      icon: "fas fa-briefcase",
      bg: "primary",
    },
    {
      title: "Active Jobs",
      value: stats.activeJobs,
      icon: "fas fa-check-circle",
      bg: "success",
    },
    {
      title: "Applicants",
      value: stats.applicants,
      icon: "fas fa-users",
      bg: "warning",
    },
    {
      title: "Selected",
      value: stats.selected,
      icon: "fas fa-user-check",
      bg: "danger",
    },
  ];

  return (
    <div className="card shadow border-0 rounded-4 mb-4">
      <div className="card-header bg-success text-white">
        <h5 className="mb-0">
          <i className="fas fa-chart-bar me-2"></i>
          Company Statistics
        </h5>
      </div>

      <div className="card-body">

        {statistics.map((item, index) => (
          <div
            key={index}
            className="d-flex align-items-center justify-content-between border rounded-3 p-3 mb-3"
          >
            <div className="d-flex align-items-center">

              <div
                className={`bg-${item.bg} text-white rounded-circle d-flex align-items-center justify-content-center me-3`}
                style={{
                  width: "50px",
                  height: "50px",
                  fontSize: "20px",
                }}
              >
                <i className={item.icon}></i>
              </div>

              <div>
                <h6 className="mb-1">{item.title}</h6>
                <small className="text-muted">
                  Current Count
                </small>
              </div>

            </div>

            <h3 className={`text-${item.bg} fw-bold mb-0`}>
              {item.value}
            </h3>

          </div>
        ))}

      </div>
    </div>
  );
};

export default CompanyStatistics;