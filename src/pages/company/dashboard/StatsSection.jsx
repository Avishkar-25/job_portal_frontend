import React from "react";

import {
  FaBriefcase,
  FaUsers,
  FaClipboardList,
  FaCheckCircle,
} from "react-icons/fa";

import DashboardCard from "./DashboardCard";

const StatsSection = ({ dashboard }) => {

  return (
    <div className="row g-4">

      {/* Total Jobs */}
      <div className="col-xl-3 col-md-6">
        <DashboardCard
          title="Total Jobs"
          value={dashboard.total_jobs}
          icon={<FaBriefcase />}
          color="primary"
        />
      </div>


      {/* Applications */}
      <div className="col-xl-3 col-md-6">
        <DashboardCard
          title="Applications"
          value={dashboard.applications}
          icon={<FaUsers />}
          color="success"
        />
      </div>


      {/* Active Jobs */}
      <div className="col-xl-3 col-md-6">
        <DashboardCard
          title="Active Jobs"
          value={dashboard.active_jobs}
          icon={<FaClipboardList />}
          color="warning"
        />
      </div>


      {/* Hired */}
      <div className="col-xl-3 col-md-6">
        <DashboardCard
          title="Hired"
          value={dashboard.hired}
          icon={<FaCheckCircle />}
          color="danger"
        />
      </div>

    </div>
  );
};

export default StatsSection;