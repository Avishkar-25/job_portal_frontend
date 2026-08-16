import ManageJobTable from "./managejob/ManageJobTable";


const ManageJobs =()=>{


return(

<div>

<ManageJobTable/>

</div>

);


};


export default ManageJobs;








// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../../services/api";

// const ManageJobs = () => {
//   const navigate = useNavigate();

//   const [jobs, setJobs] = useState([]);

//   useEffect(() => {
//     fetchJobs();
//   }, []);

//   const fetchJobs = async () => {
//     try {
//       const res = await api.get("/company/jobs");
//       setJobs(res.data.jobs);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className="container-fluid py-4">

//       <div className="card shadow border-0 rounded-4">

//         <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
//           <h3 className="mb-0">Manage Jobs</h3>

//           <span className="badge bg-light text-dark">
//             Total Jobs : {jobs.length}
//           </span>
//         </div>

//         <div className="table-responsive">

//           <table className="table table-hover align-middle mb-0">

//             <thead className="table-dark">

//             <tr>
//   <th>#</th>
//   <th>Job Title</th>
//   <th>Category</th>
//   <th>Type</th>
//   <th>Mode</th>
//   <th>Experience</th>
//   <th>Openings</th>
//   <th>Location</th>
//   <th>Salary</th>
//   <th>Skills</th>
//   <th>Status</th>
//   <th>Last Date</th>
//   <th>Created</th>
//   <th>Updated</th>
//   <th>Action</th>
// </tr>

//             </thead>

//             <tbody>

//               {jobs.length > 0 ? (

//                 jobs.map((job, index) => (

//                   <tr key={job.job_id}>

//                    <td>{index + 1}</td>

// <td>{job.job_title}</td>

// <td>{job.category}</td>

// <td>{job.job_type}</td>

// <td>{job.work_mode}</td>

// <td>{job.experience}</td>

// <td>{job.openings}</td>

// <td>{job.location}</td>

// <td>
//   ₹{job.salary_min} - ₹{job.salary_max}
// </td>

// <td>{job.required_skills}</td>

// <td>
//   <span className={`badge ${
//     job.status === "Active" ? "bg-success" : "bg-secondary"
//   }`}>
//     {job.status}
//   </span>
// </td>

// <td>
//   {job.last_date ? job.last_date.split("T")[0] : "-"}
// </td>

// <td>
//   {job.created_at ? job.created_at.split("T")[0] : "-"}
// </td>

// <td>
//   {job.updated_at ? job.updated_at.split("T")[0] : "-"}
// </td>

// <td>
//   <button
//     className="btn btn-warning btn-sm me-2"
//     onClick={() => navigate(`/company/edit-job/${job.job_id}`)}
//   >
//     Edit
//   </button>

//   <button
//     className="btn btn-danger btn-sm"
//     onClick={() => alert("Delete API Pending")}
//   >
//     Delete
//   </button>
// </td>
                    

//                   </tr>

//                 ))

//               ) : (

//                 <tr>
//                   <td colSpan="7" className="text-center py-4">
//                     No Jobs Found
//                   </td>
//                 </tr>

//               )}

//             </tbody>

//           </table>

//         </div>

//       </div>

//     </div>
//   );
// };

// export default ManageJobs;