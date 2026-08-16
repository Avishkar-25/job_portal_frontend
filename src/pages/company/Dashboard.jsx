import React, { useEffect, useState } from "react";
import { getDashboard } from "../../services/companyService";

import WelcomeCard from "./dashboard/WelcomeCard";
import StatsSection from "./dashboard/StatsSection";
import RecentActivities from "./dashboard/RecentActivities";
import QuickActions from "./dashboard/QuickActions";

const Dashboard = () => {
  const [dashboard, setDashboard] = useState({
    company_name: "",
    total_jobs: 0,
    active_jobs: 0,
    applications: 0,
    hired: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const res = await getDashboard();

      setDashboard(res.data.dashboard);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <h4>Loading Dashboard...</h4>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4">

      <WelcomeCard companyName={dashboard.company_name} />

      <StatsSection dashboard={dashboard} />

      <div className="row mt-4">

        <div className="col-lg-8">
          <RecentActivities />
        </div>

        <div className="col-lg-4">
          <QuickActions />
        </div>

      </div>

    </div>
  );
};

export default Dashboard;

























// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//     FaBriefcase,
//     FaUsers,
//     FaClipboardList,
//     FaCheckCircle,
//     FaArrowRight,
//     FaBuilding
// } from "react-icons/fa";
// import "./Dashboard.css";
// import { getDashboard } from "../../../services/companyService";
// import DashboardCard from "../../components/company/DashboardCard";

// const Dashboard = () => {

// const navigate = useNavigate();
// const [data,setData]=useState({

//     total_jobs:45,
//     applications:320,
//     active_jobs:18,
//     hired:12

// });



// return (

// <div className="dashboard-page">


// {/* Welcome Card */}

// <div className="welcome-box">


// <div>


// <h1>
// Welcome Back 👋
// </h1>


// <p>
// Manage your jobs, candidates and company profile from one place.
// </p>


// <button className="dashboard-btn"
//  onClick={()=> navigate("/company/profile")}
// >

// View Company Profile
// <FaArrowRight/>

// </button>


// </div>



// <div className="company-icon">

// <FaBuilding/>

// </div>



// </div>







// {/* Stats */}

// <div className="row g-4 mt-4">



// <div className="col-xl-3 col-md-6">

// <DashboardCard

// title="Total Jobs"

// value={data.total_jobs}

// icon={<FaBriefcase/>}

// color="primary"

// />

// </div>





// <div className="col-xl-3 col-md-6">


// <DashboardCard

// title="Applications"

// value={data.applications}

// icon={<FaUsers/>}

// color="success"

// />

// </div>






// <div className="col-xl-3 col-md-6">


// <DashboardCard

// title="Active Jobs"

// value={data.active_jobs}

// icon={<FaClipboardList/>}

// color="warning"

// />

// </div>







// <div className="col-xl-3 col-md-6">


// <DashboardCard

// title="Hired"

// value={data.hired}

// icon={<FaCheckCircle/>}

// color="danger"

// />

// </div>




// </div>







// {/* Bottom Cards */}


// <div className="row mt-4 g-4">



// <div className="col-lg-8">


// <div className="dark-card">


// <h4>
// Recent Activities
// </h4>



// <div className="activity">

// <div>

// <h6>
// React Developer Job Posted
// </h6>

// <small>
// 2 hours ago
// </small>

// </div>


// <span className="badge bg-success">

// Active

// </span>


// </div>





// <div className="activity">

// <div>

// <h6>
// 15 New Applications Received
// </h6>

// <small>
// Today
// </small>

// </div>


// <span className="badge bg-primary">

// New

// </span>


// </div>






// <div className="activity">

// <div>

// <h6>
// Company Profile Updated
// </h6>

// <small>
// Yesterday
// </small>

// </div>


// <span className="badge bg-warning">

// Update

// </span>


// </div>




// </div>


// </div>








// <div className="col-lg-4">


// <div className="dark-card">


// <h4>
// Quick Actions
// </h4>


// <button
//   className="action-btn"
//   onClick={() => navigate("/company/post-job")}
// >
//   <FaBriefcase className="me-2" />
//   Post New Job
// </button>




// <button className="action-btn"
// onClick={() => navigate("/company/applicants")}>

// <FaUsers/>

// View Candidates

// </button>





// <button className="action-btn"
// onClick={() => navigate("/company/edit-profile")}>

// <FaBuilding/>

// Edit Profile

// </button>



// </div>


// </div>




// </div>





// </div>


// );


// };


// export default Dashboard;