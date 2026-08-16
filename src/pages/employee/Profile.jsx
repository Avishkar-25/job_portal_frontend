import ProfileCard from "./profile/component/ProfileCard";
import CareerPreference from "./profile/component/CareerPreference";
import AboutMe from "./profile/component/AboutMe";
import Education from "./profile/component/Education";
import Skills from "./profile/component/Skills";
import ProfessionalDetails from "./profile/component/ProfessionalDetails";
import ProfessionalSummary from "./profile/component/ProfessionalSummary";
import Resume from "./profile/component/Resume";
import SocialProfiles from "./profile/component/SocialProfiles";
import Address from "./profile/component/Address";

const Profile = () => {
  return (
    <div className="container py-4">

      <div id="profile-photo">
        <ProfileCard />
      </div>

      <div id="career-preference">
        <CareerPreference />
      </div>

      <div id="about-me">
        <AboutMe />
      </div>

      <div id="education">
        <Education />
      </div>

      <div id="skills">
        <Skills />
      </div>

      <div id="professional-details">
        <ProfessionalDetails />
      </div>

      <div id="professional-summary">
        <ProfessionalSummary />
      </div>

      <div id="resume">
        <Resume />
      </div>

      <div id="social-profiles">
        <SocialProfiles />
      </div>

      <div id="address">
        <Address />
      </div>

    </div>
  );
};

export default Profile;

// import React from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   FaMapMarkerAlt,
//   FaPhoneAlt,
//   FaEnvelope,
//   FaBirthdayCake,
//   FaMars,
//   FaEdit,
//   FaCheckCircle,
//   FaBriefcase,
//   FaClock,
//   FaTrash,
//   FaPlus
// } from "react-icons/fa";
// import { useState , useEffect} from "react";

// import {
//  getEmployeeSkills,
//  addSkill,
//  updateSkill,
//  deleteSkill
// } from "../../services/employeeSkillApi";


// import {
//  getQualifications,
//  addQualification,
//  updateQualification,
//  deleteQualification
// } from "../../services/employeeQualificationApi";
// const Profile = () => {
//   const navigate = useNavigate();
// const user = JSON.parse(localStorage.getItem("user"));
// const [employee, setEmployee] = useState(user);
// const employee_id =
//   employee?.employee_id ?? employee?.user_id ?? employee?._id;

//   const [showEditModal, setShowEditModal] = useState(false);

//   const [profileImage, setProfileImage] = useState(
//     "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
//   );

//   const [selectedFile, setSelectedFile] = useState(null);

//   const [profile, setProfile] = useState({
//     fullName: "Ghadge Avishkar Vitthal",
//     profession: "Full Stack Web Developer",
//     college: "New Arts Commerce & Science College",
//     city: "Ahmednagar",
//     gender: "Male",
//     dob: "2005-03-25",
//     phone: "8055472115",
//     email: "avishkar@example.com",
//   });

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];

//     if (file) {
//       setSelectedFile(file);
//       setProfileImage(URL.createObjectURL(file));
//     }
//   };

//   // career section
//   const [showCareerModal, setShowCareerModal] = useState(false);
//   const [career, setCareer] = useState({
//     jobType: "Full Time, Internship",
//     availability: "Immediate Joiner",
//     location: "Pune, Mumbai, Bangalore, Hyderabad, Ahmedabad, Noida, Chennai, Remote",
//   });

//   // About Section
//   const [showAboutModal, setShowAboutModal] = useState(false);

//   const [about, setAbout] = useState(
//     "Passionate Full Stack Web Developer with experience in React.js, Node.js, Express.js and MySQL. I enjoy building responsive web applications with modern UI/UX. I am a quick learner, problem solver and always excited to work on real-world projects. Currently looking for Full Time opportunities as a Software Developer."
//   );

//   // Education modal
//   const [showEducationModal, setShowEducationModal] = useState(false);
// const [isEdit, setIsEdit] = useState(false);
// const [showDeleteEducation, setShowDeleteEducation] = useState(false);

// const [education, setEducation] = useState({
//   qualification: "Bachelor of Computer Science (B.Sc CS)",
//   college: "New Arts Commerce & Science College, Ahmednagar",
//   year: "2026",
//   cgpa: "7.15",
//   status: "Pursuing",
// });
// useEffect(()=>{

//   if(employee?.employee_id){

//     loadSkills();

//   }

// },[employee]);
// // Skill Modal
// const [showSkillModal, setShowSkillModal] = useState(false);

// const [isSkillEdit, setIsSkillEdit] = useState(false);

// const [skills, setSkills] = useState([]);

// const [skill, setSkill] = useState("");

// const [skillLevel, setSkillLevel] = useState("Beginner");

// const [editSkillId, setEditSkillId] = useState(null);
// // Load Skills

// // Get Employee Skills
// const loadSkills = async()=>{

//   try{

//     if(!employee?.employee_id){
//       console.log("Employee ID missing");
//       return;
//     }


//     const res = await getEmployeeSkills(employee.employee_id);


//     console.log("Skills Response:",res.data);


//     setSkills(res.data.skills || []);


//   }
//   catch(err){

//     console.log(
//       "Get Skills Error:",
//       err.response?.data || err
//     );

//   }

// };
// const saveSkill = async()=>{

// try{

// if(!skill){
//  alert("Enter Skill Name");
//  return;
// }


// if(!employee?.employee_id){
//  alert("Employee ID not found");
//  return;
// }


// const data={

//  employee_id: employee.employee_id,
//  skill_name: skill,
//  skill_level: skillLevel

// };


// console.log("Sending Skill Data:",data);


// if(editSkillId){

//  await updateSkill(editSkillId,data);

// }
// else{

//  await addSkill(data);

// }


// await loadSkills();


// setSkill("");

// setSkillLevel("Beginner");

// setEditSkillId(null);

// setShowSkillModal(false);


// navigate("/employee/profile");


// }
// catch(err){

// console.log(
// "Skill Error:",
// err.response?.data || err
// );

// }

// };
// // Delete Skill
// const removeSkill = async (id) => {

//   try {

//     if(window.confirm("Delete Skill?")){


//       await deleteSkill(id);


//       await loadSkills();


//     }

//   }
//   catch(err){

//     console.log(
//       "Delete Skill Error:",
//       err.response?.data || err
//     );

//   }

// };
// // professional details
// const [showProfessionalModal, setShowProfessionalModal] = useState(false);

// const [professional, setProfessional] = useState({
//   experience: "Fresher",
//   company: "Looking for Opportunity",
//   currentSalary: "₹0 LPA",
//   expectedSalary: "₹6 LPA",
// });

// //  Professional Summary
// const [showSummaryModal, setShowSummaryModal] = useState(false);

// const [summary, setSummary] = useState(
//   "Enthusiastic Full Stack Web Developer with hands-on experience in React.js, Node.js, Express.js, Bootstrap, JavaScript, MySQL and MongoDB. Passionate about building responsive and user-friendly web applications with modern UI/UX. Strong understanding of frontend and backend development, REST APIs and database management. Seeking a Software Developer role where I can contribute my skills, learn new technologies and grow professionally."
// );

// // Resume
// const [showResumeModal, setShowResumeModal] = useState(false);

// const [resume, setResume] = useState({
//   name: "Avishkar_Ghadge_Resume.pdf",
//   date: "26 July 2026",
//   file: null,
// });

// //.............
// // const [showSocialModal, setShowSocialModal] = useState(false);
// const [showAddressModal, setShowAddressModal] = useState(false);
// const [showContactModal, setShowContactModal] = useState(false);


// // ========================= State =========================
// const [socials, setSocials] = useState([
//   {
//     id: 1,
//     type: "GitHub",
//     icon: "https://cdn-icons-png.flaticon.com/512/25/25231.png",
//     link: "github.com/avishkar",
//   },
//   {
//     id: 2,
//     type: "LinkedIn",
//     icon: "https://cdn-icons-png.flaticon.com/512/174/174857.png",
//     link: "linkedin.com/in/avishkar",
//   },
//   {
//     id: 3,
//     type: "Portfolio",
//     icon: "https://cdn-icons-png.flaticon.com/512/1006/1006771.png",
//     link: "www.avishkar.dev",
//   },
// ]);

// const [showSocialModal, setShowSocialModal] = useState(false);
// const [editIndex, setEditIndex] = useState(null);

// const [socialType, setSocialType] = useState("");
// const [socialLink, setSocialLink] = useState("");

// const saveSocial = () => {
//   const icon =
//     socialType === "GitHub"
      // ? "https://cdn-icons-png.flaticon.com/512/25/25231.png"
//       : socialType === "LinkedIn"
      // ? "https://cdn-icons-png.flaticon.com/512/174/174857.png"
//       : "https://cdn-icons-png.flaticon.com/512/1006/1006771.png";

//   if (editIndex !== null) {
//     const temp = [...socials];
//     temp[editIndex] = {
//       ...temp[editIndex],
//       type: socialType,
//       link: socialLink,
//       icon,
//     };
//     setSocials(temp);
//   } else {
//     setSocials([
//       ...socials,
//       {
//         id: Date.now(),
//         type: socialType,
//         link: socialLink,
//         icon,
//       },
//     ]);
//   }

//   setShowSocialModal(false);
//   setEditIndex(null);
//   setSocialType("");
//   setSocialLink("");
// };


// const [address, setAddress] = useState({
//   address: "At Post Ahmednagar, Maharashtra",
//   city: "Ahmednagar",
//   pincode: "414001",
//   state: "Maharashtra",
//   country: "India",
// });

// const [contact, setContact] = useState({
//   mobile: "+91 9876543210",
//   email: "avishkar@gmail.com",
//   alternate: "+91 9988776655",
//   preferred: "10:00 AM - 6:00 PM",
// });
//   return (
//     <div className="container py-4">

//       {/* Profile Card */}

//       <div className="card border-0 shadow rounded-4 overflow-hidden">

//         <div className="card-body p-4">

//           <div className="row align-items-center">

//             {/* Left */}

//             <div className="col-lg-8">

//              <div className="d-flex flex-column flex-lg-row align-items-center align-items-lg-start">

//                 {/* Profile */}

//                 <div className="position-relative">

//                   <img
//                     src={profileImage}
//                     alt="Profile"
//                     className="rounded-circle border border-4 border-success"
//                     style={{
//                       width: "170px",
//                       height: "170px",
//                       objectFit: "cover",
//                     }}
//                   />

//                   <div
//                     className="position-absolute bg-white shadow rounded-pill px-3 py-1"
//                     style={{
//                       bottom: "-5px",
//                       left: "45px",
//                     }}
//                   >
//                     <span className="text-success fw-bold">94%</span>
//                   </div>

//                 </div>

//                 {/* Details */}

//                 <div className="ms-4 flex-grow-1">

//                   <div className="d-flex align-items-center">

//                     <h2 className="fw-bold mb-0">
//                       {profile.fullName}
//                     </h2>

//                     <FaEdit
//                       className="ms-3 text-primary"
//                       style={{ cursor: "pointer", fontSize: "22px" }}
//                       onClick={() => setShowEditModal(true)}
//                     />

//                   </div>

//                   <h5 className="text-secondary mt-2">
//                     {profile.profession}
//                   </h5>

//                   <p className="text-muted mb-4">
//                     {profile.college}
//                   </p>

//                   <hr />

//                   <div className="row mt-4">

//                     <div className="col-md-6">

//                       <p>
//                         <FaMapMarkerAlt className="text-primary me-2" />
//                         {profile.city}
//                       </p>

//                       <p>
//                         <FaMars className="text-primary me-2" />
//                         {profile.gender}
//                       </p>

//                       <p>
//                         <FaBirthdayCake className="text-primary me-2" />
//                         {profile.dob}
//                       </p>

//                     </div>

//                     <div className="col-md-6">

//                       <p>
//                         <FaPhoneAlt className="text-success me-2" />
//                         +91 {profile.phone}
//                         <FaCheckCircle className="ms-2 text-success" />
//                       </p>

//                       <p>
//                         <FaEnvelope className="text-danger me-2" />
//                         {profile.email}
//                         <FaCheckCircle className="ms-2 text-success" />
//                       </p>

//                     </div>

//                   </div>

//                 </div>

//               </div>

//             </div>

//             {/* Right */}

//             <div className="col-lg-4 mt-4 mt-lg-0">

//               <div
//                 className="rounded-4 p-4"
//                 style={{
//                   background: "#FFF5E9",
//                   minHeight: "220px",
//                 }}
//               >

//                 <div className="d-flex align-items-center">

//                   <div
//                     className="rounded-circle bg-white d-flex align-items-center justify-content-center"
//                     style={{
//                       width: "55px",
//                       height: "55px",
//                     }}
//                   >
//                     🏆
//                   </div>

//                   <div className="ms-3">

//                     <h5 className="fw-bold mb-1">
//                       Complete Profile
//                     </h5>

//                     <small className="text-success">
//                       +6% Profile Score
//                     </small>

//                   </div>

//                 </div>

//                 <button
//                   className="btn btn-danger w-100 rounded-pill mt-5 py-3 fw-bold"
//                   onClick={() => navigate("/employee/edit-profile")}
//                 >
//                   Add Missing Details
//                 </button>

//               </div>

//             </div>

//           </div>

//         </div>

//       </div>

//       {/* Career Preference */}

//       <div className="card border-0 shadow rounded-4 mt-4">

//         <div className="card-body p-4">

//           <div className="d-flex justify-content-between">

//             <h4 className="fw-bold">
//               Career Preferences
//             </h4>

//             <button
//               className="btn btn-outline-primary btn-sm"
//               onClick={() => setShowCareerModal(true)}
//             >
//               <FaEdit className="me-2" />
//               Edit
//             </button>

//           </div>

//           <div className="row mt-4">

//             <div className="col-md-6">

//               <h6 className="text-muted">
//                 Preferred Job Type
//               </h6>

             
//                 <p className="fw-semibold">
//                   {career.jobType}
//                 </p>
              

//             </div>

//             <div className="col-md-6">

//               <h6 className="text-muted">
//                 {career.availability}
//               </h6>

//               <p className="fw-semibold">
//                 {career.location}
//               </p>

//             </div>

//           </div>

//           <div className="mt-3">

//             <h6 className="text-muted">
//               Preferred Locations
//             </h6>

//             <p>
//               Pune, Mumbai, Bangalore, Hyderabad,
//               Ahmedabad, Noida, Chennai, Remote
//             </p>

//           </div>

//         </div>

//       </div>

//       {/* ================= About Me ================= */}

//       <div className="card border-0 shadow rounded-4 mt-4">

//         <div className="card-body p-4">

//           <div className="d-flex justify-content-between align-items-center">

//             <h4 className="fw-bold mb-0">
//               About Me
//             </h4>

//             <button
//               className="btn btn-outline-primary btn-sm"
//               onClick={() => setShowAboutModal(true)}
//             >
//               <FaEdit className="me-2" />
//               Edit
//             </button>

//           </div>

//           <hr />

//           <p className="text-secondary" style={{ lineHeight: "30px" }}>
//             {about}
//           </p>

//         </div>

//       </div>


//       {/* ================= Education ================= */}

//       <div className="card border-0 shadow rounded-4 mt-4">
//   <div className="card-body p-4">

//     <div className="d-flex justify-content-between align-items-center mb-3">
//       <h4 className="fw-bold mb-0">Education</h4>

//       <div className="d-flex gap-2">
//         <button
//           className="btn btn-success btn-sm"
//           onClick={() => {
//             setIsEdit(false);
//             setShowEducationModal(true);
//           }}
//         >
//           <FaPlus className="me-2" />
//           Add
//         </button>

//         <button
//           className="btn btn-primary btn-sm"
//           onClick={() => {
//             setIsEdit(true);
//             setShowEducationModal(true);
//           }}
//         >
//           <FaEdit className="me-2" />
//           Edit
//         </button>
//       </div>
//     </div>

//     <hr />

//     {/* Sample Education Data */}
//     <div className="border rounded-3 p-3 bg-light">
//       <div className="row">
//         <div className="col-md-6 mb-3">
//           <label className="text-muted small">Degree</label>
//           <h6 className="fw-bold">Bachelor of Computer Science (BCS)</h6>
//         </div>

//         <div className="col-md-6 mb-3">
//           <label className="text-muted small">University</label>
//           <h6 className="fw-bold">Savitribai Phule Pune University</h6>
//         </div>

//         <div className="col-md-6 mb-3">
//           <label className="text-muted small">College</label>
//           <h6 className="fw-bold">
//             New Arts Commerce & Science College, Ahmednagar
//           </h6>
//         </div>

//         <div className="col-md-3 mb-3">
//           <label className="text-muted small">Percentage / CGPA</label>
//           <h6 className="fw-bold">7.15 CGPA</h6>
//         </div>

//         <div className="col-md-3 mb-3">
//           <label className="text-muted small">Passing Year</label>
//           <h6 className="fw-bold">2026</h6>
//         </div>
//       </div>
//     </div>

//   </div>
// </div>

//       {/* ================= Skills ================= */}


// <div className="card border-0 shadow rounded-4 mt-4">

//   <div className="card-body p-4">


//     <div className="d-flex justify-content-between align-items-center">

//       <h4 className="fw-bold mb-0">
//         Key Skills
//       </h4>


//       <button
//         className="btn btn-success btn-sm"
//         onClick={() => {

//           setIsSkillEdit(false);

//           setSkill("");

//           setSkillLevel("Beginner");

//           setEditSkillId(null);

//           setShowSkillModal(true);

//         }}
//       >

//         <FaPlus className="me-2"/>

//         Add

//       </button>


//     </div>


//     <hr/>


//     <div className="d-flex flex-wrap gap-3">


//       {
//         skills.length > 0 ? (

//           skills.map((item,index)=>(


//             <div
//               key={item.skill_id}
//               className="position-relative"
//             >


//               {/* Skill Badge */}

//               <span className="badge bg-primary px-4 py-3 fs-6 rounded-pill">

//                 {item.skill_name}

//               </span>



//               {/* Delete Button */}

//               <button

//                 className="btn btn-sm btn-danger rounded-circle position-absolute"

//                 style={{

//                   top:"-8px",

//                   right:"-8px",

//                   width:"22px",

//                   height:"22px",

//                   padding:"0"

//                 }}

//                 onClick={()=>removeSkill(item.skill_id)}

//               >

//                 ×

//               </button>




//               {/* Edit Button */}

//               <button

//                 className="btn btn-sm btn-warning rounded-circle position-absolute"

//                 style={{

//                   bottom:"-8px",

//                   right:"-8px",

//                   width:"22px",

//                   height:"22px",

//                   padding:"0"

//                 }}


//                 onClick={()=>{


//                   setSkill(item.skill_name);

//                   setSkillLevel(item.skill_level);

//                   setEditSkillId(item.skill_id);

//                   setIsSkillEdit(true);

//                   setShowSkillModal(true);


//                 }}

//               >

//                 <FaEdit size={10}/>


//               </button>


//             </div>


//           ))


//         ) : (


//           <p className="text-muted">

//             No skills added yet

//           </p>


//         )

//       }


//     </div>


//   </div>

// </div>


//       {/* ================= Professional Details ================= */}
// <div className="card border-0 shadow rounded-4 mt-4">
//   <div className="card-body p-4">

//     <div className="d-flex justify-content-between align-items-center">

//       <h4 className="fw-bold mb-0">
//         Professional Details
//       </h4>

//       <div className="d-flex gap-2">

//         {!professional ? (
//           <button
//             className="btn btn-success btn-sm"
//             onClick={() => {
//               setProfessional({
//                 experience: "",
//                 company: "",
//                 currentSalary: "",
//                 expectedSalary: "",
//               });
//               setShowProfessionalModal(true);
//             }}
//           >
//             <FaPlus className="me-2" />
//             Add
//           </button>
//         ) : (
//           <>
//             <button
//               className="btn btn-primary btn-sm"
//               onClick={() => setShowProfessionalModal(true)}
//             >
//               <FaEdit className="me-2" />
//               Edit
//             </button>

//             <button
//               className="btn btn-danger btn-sm"
//               onClick={() => {
//                 if (window.confirm("Delete Professional Details?")) {
//                   setProfessional(null);
//                 }
//               }}
//             >
//               <FaTrash className="me-2" />
//               Delete
//             </button>
//           </>
//         )}

//       </div>

//     </div>

//     <hr />

//     {professional ? (
//       <div className="row g-4">

//         <div className="col-md-6">
//           <div className="border rounded-4 p-4 h-100">
//             <small className="text-muted">Total Experience</small>
//             <h5 className="fw-bold mt-2">{professional.experience}</h5>
//           </div>
//         </div>

//         <div className="col-md-6">
//           <div className="border rounded-4 p-4 h-100">
//             <small className="text-muted">Current Company</small>
//             <h5 className="fw-bold mt-2">{professional.company}</h5>
//           </div>
//         </div>

//         <div className="col-md-6">
//           <div className="border rounded-4 p-4 h-100">
//             <small className="text-muted">Current Salary</small>
//             <h5 className="fw-bold mt-2">{professional.currentSalary}</h5>
//           </div>
//         </div>

//         <div className="col-md-6">
//           <div className="border rounded-4 p-4 h-100">
//             <small className="text-muted">Expected Salary</small>
//             <h5 className="fw-bold mt-2">{professional.expectedSalary}</h5>
//           </div>
//         </div>

//       </div>
//     ) : (
//       <div className="text-center py-5 text-muted">
//         No Professional Details Added
//       </div>
//     )}

//   </div>

// </div>


//       {/* ================= Work Summary ================= */}

//      <div className="card border-0 shadow rounded-4 mt-4 mb-5">

//   <div className="card-body p-4">

//     <div className="d-flex justify-content-between align-items-center">

//       <h4 className="fw-bold mb-0">
//         Professional Summary
//       </h4>

//       <div className="d-flex gap-2">

//         {!summary ? (
//           <button
//             className="btn btn-success btn-sm"
//             onClick={() => setShowSummaryModal(true)}
//           >
//             <FaPlus className="me-2" />
//             Add
//           </button>
//         ) : (
//           <>
//             <button
//               className="btn btn-primary btn-sm"
//               onClick={() => setShowSummaryModal(true)}
//             >
//               <FaEdit className="me-2" />
//               Edit
//             </button>

//             <button
//               className="btn btn-danger btn-sm"
//               onClick={() => {
//                 if (window.confirm("Delete Professional Summary?")) {
//                   setSummary("");
//                 }
//               }}
//             >
//               <FaTrash className="me-2" />
//               Delete
//             </button>
//           </>
//         )}

//       </div>

//     </div>

//     <hr />

//     {summary ? (
//       <p
//         className="text-secondary"
//         style={{
//           lineHeight: "32px",
//           textAlign: "justify",
//         }}
//       >
//         {summary}
//       </p>
//     ) : (
//       <div className="text-center py-5 text-muted">
//         No Professional Summary Added
//       </div>
//     )}

//   </div>

// </div>
//       {/* ================= Resume ================= */}

//      <div className="card border-0 shadow rounded-4 mt-4">

//   <div className="card-body p-4">

//     <div className="d-flex justify-content-between align-items-center">

//       <h4 className="fw-bold mb-0">
//         Resume
//       </h4>

//       <div className="d-flex gap-2">

//         {!resume ? (
//           <button
//             className="btn btn-success btn-sm"
//             onClick={() => setShowResumeModal(true)}
//           >
//             <FaPlus className="me-2" />
//             Add
//           </button>
//         ) : (
//           <>
//             <button
//               className="btn btn-primary btn-sm"
//               onClick={() => setShowResumeModal(true)}
//             >
//               <FaEdit className="me-2" />
//               Edit
//             </button>

//             <button
//               className="btn btn-danger btn-sm"
//               onClick={() => {
//                 if (window.confirm("Delete Resume?")) {
//                   setResume(null);
//                 }
//               }}
//             >
//               <FaTrash className="me-2" />
//               Delete
//             </button>
//           </>
//         )}

//       </div>

//     </div>

//     <hr />

//     {resume ? (
//       <div className="d-flex justify-content-between align-items-center flex-wrap">

//         <div className="d-flex align-items-center">

//           <div
//             className="bg-danger text-white rounded-3 d-flex justify-content-center align-items-center"
//             style={{
//               width: "70px",
//               height: "70px",
//               fontSize: "30px",
//             }}
//           >
//             📄
//           </div>

//           <div className="ms-3">

//             <h5 className="mb-1 fw-bold">
//               {resume.name}
//             </h5>

//             <small className="text-muted">
//               Uploaded on {resume.date}
//             </small>

//           </div>

//         </div>

//         <div className="mt-3 mt-lg-0">

//           <button className="btn btn-success me-2 px-4">
//             View
//           </button>

//           <button className="btn btn-outline-primary px-4">
//             Download
//           </button>

//         </div>

//       </div>
//     ) : (
//       <div className="text-center py-5 text-muted">
//         No Resume Uploaded
//       </div>
//     )}

//   </div>

// </div>



//       {/* ================= Social Profiles ================= */}

//     <div className="card border-0 shadow rounded-4 mt-4">

//   <div className="card-body p-4">

//     <div className="d-flex justify-content-between align-items-center">

//       <h4 className="fw-bold mb-0">
//         Social Profiles
//       </h4>

//       <button
//         className="btn btn-success btn-sm"
//         onClick={() => {
//           setEditIndex(null);
//           setSocialType("");
//           setSocialLink("");
//           setShowSocialModal(true);
//         }}
//       >
//         <FaPlus className="me-2" />
//         Add
//       </button>

//     </div>

//     <hr />

//     <div className="row g-4">

//       {socials.map((item, index) => (

//         <div className="col-md-4" key={item.id}>

//           <div className="border rounded-4 p-4 text-center h-100 position-relative">

//             {/* Edit */}
//             <button
//               className="btn btn-warning btn-sm rounded-circle position-absolute"
//               style={{
//                 top: "-10px",
//                 left: "-10px",
//                 width: "28px",
//                 height: "28px",
//                 padding: 0,
//               }}
//               onClick={() => {
//                 setEditIndex(index);
//                 setSocialType(item.type);
//                 setSocialLink(item.link);
//                 setShowSocialModal(true);
//               }}
//             >
//               <FaEdit size={12} />
//             </button>

//             {/* Delete */}
//             <button
//               className="btn btn-danger btn-sm rounded-circle position-absolute"
//               style={{
//                 top: "-10px",
//                 right: "-10px",
//                 width: "28px",
//                 height: "28px",
//                 padding: 0,
//               }}
//               onClick={() => {
//                 if (window.confirm("Delete this profile?")) {
//                   setSocials(socials.filter((_, i) => i !== index));
//                 }
//               }}
//             >
//               ×
//             </button>

//             <img
//               src={item.icon}
//               width="45"
//               alt={item.type}
//             />

//             <h5 className="mt-3">
//               {item.type}
//             </h5>

//             <a
//               href={`https://${item.link}`}
//               target="_blank"
//               rel="noreferrer"
//               className="text-decoration-none"
//             >
//               {item.link}
//             </a>

//           </div>

//         </div>

//       ))}

//     </div>

//   </div>

// </div>



//       {/* ================= Address ================= */}

//       <div className="card border-0 shadow rounded-4 mt-4">

//   <div className="card-body p-4">

//     <div className="d-flex justify-content-between align-items-center">

//       <h4 className="fw-bold mb-0">
//         Address
//       </h4>

//       <div className="d-flex gap-2">

//         {!address ? (
//           <button
//             className="btn btn-success btn-sm"
//             onClick={() => setShowAddressModal(true)}
//           >
//             <FaPlus className="me-2" />
//             Add
//           </button>
//         ) : (
//           <>
//             <button
//               className="btn btn-primary btn-sm"
//               onClick={() => setShowAddressModal(true)}
//             >
//               <FaEdit className="me-2" />
//               Edit
//             </button>

//             <button
//               className="btn btn-danger btn-sm"
//               onClick={() => {
//                 if (window.confirm("Delete Address?")) {
//                   setAddress(null);
//                 }
//               }}
//             >
//               <FaTrash className="me-2" />
//               Delete
//             </button>
//           </>
//         )}

//       </div>

//     </div>

//     <hr />

//     {address ? (

//       <div className="row">

//         <div className="col-md-6 mb-4">
//           <small className="text-muted">Address</small>
//           <h6>{address.address}</h6>
//         </div>

//         <div className="col-md-3 mb-4">
//           <small className="text-muted">City</small>
//           <h6>{address.city}</h6>
//         </div>

//         <div className="col-md-3 mb-4">
//           <small className="text-muted">Pincode</small>
//           <h6>{address.pincode}</h6>
//         </div>

//         <div className="col-md-6">
//           <small className="text-muted">State</small>
//           <h6>{address.state}</h6>
//         </div>

//         <div className="col-md-6">
//           <small className="text-muted">Country</small>
//           <h6>{address.country}</h6>
//         </div>

//       </div>

//     ) : (

//       <div className="text-center py-5">
//         <h6 className="text-muted">No Address Added</h6>
//       </div>

//     )}

//   </div>

// </div>



//       {/* ================= Contact ================= */}

//       <div className="card border-0 shadow rounded-4 mt-4 mb-5">

//   <div className="card-body p-4">

//     <div className="d-flex justify-content-between align-items-center">

//       <h4 className="fw-bold mb-0">
//         Contact Information
//       </h4>

//       <div className="d-flex gap-2">

//         {!contact ? (
//           <button
//             className="btn btn-success btn-sm"
//             onClick={() => setShowContactModal(true)}
//           >
//             <FaPlus className="me-2" />
//             Add
//           </button>
//         ) : (
//           <>
//             <button
//               className="btn btn-primary btn-sm"
//               onClick={() => setShowContactModal(true)}
//             >
//               <FaEdit className="me-2" />
//               Edit
//             </button>

//             <button
//               className="btn btn-danger btn-sm"
//               onClick={() => {
//                 if (window.confirm("Delete Contact Information?")) {
//                   setContact(null);
//                 }
//               }}
//             >
//               <FaTrash className="me-2" />
//               Delete
//             </button>
//           </>
//         )}

//       </div>

//     </div>

//     <hr />

//     {contact ? (

//       <div className="row">

//         <div className="col-md-6 mb-4">
//           <small className="text-muted">Mobile Number</small>
//           <h6>{contact.mobile}</h6>
//         </div>

//         <div className="col-md-6 mb-4">
//           <small className="text-muted">Email Address</small>
//           <h6>{contact.email}</h6>
//         </div>

//         <div className="col-md-6">
//           <small className="text-muted">Alternate Contact</small>
//           <h6>{contact.alternate}</h6>
//         </div>

//         <div className="col-md-6">
//           <small className="text-muted">Preferred Contact Time</small>
//           <h6>{contact.preferred}</h6>
//         </div>

//       </div>

//     ) : (

//       <div className="text-center py-5">
//         <h6 className="text-muted">No Contact Information Added</h6>
//       </div>

//     )}

//   </div>

// </div>


//       {/* ================= Edit Profile Modal ================= */}

//       {showEditModal && (
//         <>
//           <div
//             className="modal d-block"
//             tabIndex="-1"
//             role="dialog"
//             aria-modal="true"
//             style={{
//               background: "rgba(0,0,0,.5)",
//             }}
//           >
//             <div className="modal-dialog modal-lg modal-dialog-centered">
//               <div className="modal-content border-0 rounded-4 shadow">

//                 {/* Header */}

//                 <div className="modal-header bg-primary text-white">

//                   <h4 className="modal-title fw-bold">
//                     Edit Profile
//                   </h4>

//                   <button
//                     className="btn-close btn-close-white"
//                     onClick={() => setShowEditModal(false)}
//                   ></button>

//                 </div>

//                 {/* Body */}

//                 <div className="modal-body p-4">

//                   <div className="text-center mb-4">
//                     <img
//                       src={profileImage}
//                       alt="Current profile"
//                       className="rounded-circle border border-3 border-primary"
//                       style={{
//                         width: "120px",
//                         height: "120px",
//                         objectFit: "cover",
//                       }}
//                     />
//                     <div className="mt-3">
//                       <input
//                         type="file"
//                         id="profilePhoto"
//                         accept="image/*"
//                         className="d-none"
//                         onChange={handleImageChange}
//                       />

//                       <label
//                         htmlFor="profilePhoto"
//                         className="btn btn-outline-primary btn-sm"
//                       >
//                         Change Photo
//                       </label>
//                     </div>
//                   </div>

//                   <div className="row mt-4">

//                     <div className="col-md-6 mb-3">

//                       <label className="form-label fw-semibold">
//                         Full Name
//                       </label>

//                       <input
//                         type="text"
//                         className="form-control"
//                         value={profile.fullName}
//                         onChange={(e) =>
//                           setProfile({
//                             ...profile,
//                             fullName: e.target.value,
//                           })
//                         }
//                       />

//                     </div>

//                     <div className="col-md-6 mb-3">

//                       <label className="form-label fw-semibold">
//                         Profession
//                       </label>

//                       <input
//                         type="text"
//                         className="form-control"
//                         value={profile.profession}
//                         onChange={(e) =>
//                           setProfile({
//                             ...profile,
//                             profession: e.target.value,
//                           })
//                         }
//                       />

//                     </div>

//                     <div className="col-md-12 mb-3">

//                       <label className="form-label fw-semibold">
//                         College
//                       </label>

//                       <input
//                         type="text"
//                         className="form-control"
//                         value={profile.college}
//                         onChange={(e) =>
//                           setProfile({
//                             ...profile,
//                             college: e.target.value,
//                           })
//                         }
//                       />

//                     </div>

//                     <div className="col-md-6 mb-3">

//                       <label className="form-label fw-semibold">
//                         City
//                       </label>

//                       <input
//                         type="text"
//                         className="form-control"
//                         value={profile.city}
//                         onChange={(e) =>
//                           setProfile({
//                             ...profile,
//                             city: e.target.value,
//                           })
//                         }
//                       />

//                     </div>

//                     <div className="col-md-6 mb-3">

//                       <label className="form-label fw-semibold">
//                         Gender
//                       </label>

//                       <select
//                         className="form-select"
//                         value={profile.gender}
//                         onChange={(e) =>
//                           setProfile({
//                             ...profile,
//                             gender: e.target.value,
//                           })
//                         }
//                       >
//                         <option>Male</option>
//                         <option>Female</option>
//                         <option>Other</option>
//                       </select>

//                     </div>

//                     <div className="col-md-6 mb-3">

//                       <label className="form-label fw-semibold">
//                         Date of Birth
//                       </label>

//                       <input
//                         type="date"
//                         className="form-control"
//                         value={profile.dob}
//                         onChange={(e) =>
//                           setProfile({
//                             ...profile,
//                             dob: e.target.value,
//                           })
//                         }
//                       />

//                     </div>

//                     <div className="col-md-6 mb-3">

//                       <label className="form-label fw-semibold">
//                         Mobile Number
//                       </label>

//                       <input
//                         type="text"
//                         className="form-control"
//                         value={profile.phone}
//                         onChange={(e) =>
//                           setProfile({
//                             ...profile,
//                             phone: e.target.value,
//                           })
//                         }
//                       />

//                     </div>

//                     <div className="col-md-12 mb-3">

//                       <label className="form-label fw-semibold">
//                         Email Address
//                       </label>

//                       <input
//                         type="email"
//                         className="form-control"
//                         value={profile.email}
//                         onChange={(e) =>
//                           setProfile({
//                             ...profile,
//                             email: e.target.value,
//                           })
//                         }
//                       />

//                     </div>

//                   </div>

//                 </div>

//                 {/* Footer */}

//                 <div className="modal-footer">

//                   <button
//                     className="btn btn-secondary px-4"
//                     onClick={() => setShowEditModal(false)}
//                   >
//                     Cancel
//                   </button>

//                   <button
//                     className="btn btn-primary px-4"
//                     onClick={() => {
//                       alert("Profile Updated Successfully");
//                       setShowEditModal(false);
//                     }}
//                   >
//                     Save Changes
//                   </button>

//                 </div>

//               </div>
//             </div>
//           </div>
//         </>
//       )}

//       {/* ============= Career Preferences======= */}
//       {showCareerModal && (
//         <>
//           <div
//             className="modal fade show"
//             style={{
//               display: "block",
//               background: "rgba(0,0,0,.5)",
//             }}
//           >
//             <div className="modal-dialog modal-lg modal-dialog-centered">
//               <div className="modal-content rounded-4">

//                 <div className="modal-header bg-primary text-white">
//                   <h4 className="modal-title">
//                     Edit Career Preferences
//                   </h4>

//                   <button
//                     className="btn-close btn-close-white"
//                     onClick={() => setShowCareerModal(false)}
//                   ></button>
//                 </div>

//                 <div className="modal-body">

//                   <div className="mb-3">
//                     <label className="form-label fw-bold">
//                       Preferred Job Type
//                     </label>

//                     <input
//                       type="text"
//                       className="form-control"
//                       value={career.jobType}
//                       onChange={(e) =>
//                         setCareer({
//                           ...career,
//                           jobType: e.target.value,
//                         })
//                       }
//                     />
//                   </div>

//                   <div className="mb-3">
//                     <label className="form-label fw-bold">
//                       Availability
//                     </label>

//                     <select
//                       className="form-select"
//                       value={career.availability}
//                       onChange={(e) =>
//                         setCareer({
//                           ...career,
//                           availability: e.target.value,
//                         })
//                       }
//                     >
//                       <option>Immediate Joiner</option>
//                       <option>15 Days</option>
//                       <option>30 Days</option>
//                       <option>45 Days</option>
//                       <option>60 Days</option>
//                     </select>
//                   </div>

//                   <div className="mb-3">
//                     <label className="form-label fw-bold">
//                       Preferred Locations
//                     </label>

//                     <textarea
//                       rows="4"
//                       className="form-control"
//                       value={career.location}
//                       onChange={(e) =>
//                         setCareer({
//                           ...career,
//                           location: e.target.value,
//                         })
//                       }
//                     ></textarea>
//                   </div>

//                 </div>

//                 <div className="modal-footer">

//                   <button
//                     className="btn btn-secondary"
//                     onClick={() => setShowCareerModal(false)}
//                   >
//                     Cancel
//                   </button>

//                   <button
//                     className="btn btn-primary"
//                     onClick={() => setShowCareerModal(false)}
//                   >
//                     Save Changes
//                   </button>

//                 </div>

//               </div>
//             </div>
//           </div>

//           <div className="modal-backdrop fade show"></div>
//         </>
//       )}
//       {/* ================== About ================== */}
//       {showAboutModal && (
//         <>
//           <div
//             className="modal fade show"
//             style={{
//               display: "block",
//               background: "rgba(0,0,0,.5)",
//             }}
//           >
//             <div className="modal-dialog modal-lg modal-dialog-centered">

//               <div className="modal-content rounded-4">

//                 <div className="modal-header bg-primary text-white">

//                   <h4 className="modal-title">
//                     Edit About Me
//                   </h4>

//                   <button
//                     className="btn-close btn-close-white"
//                     onClick={() => setShowAboutModal(false)}
//                   ></button>

//                 </div>

//                 <div className="modal-body">

//                   <label className="form-label fw-bold">
//                     About Yourself
//                   </label>

//                   <textarea
//                     className="form-control"
//                     rows="8"
//                     value={about}
//                     onChange={(e) => setAbout(e.target.value)}
//                     placeholder="Write something about yourself..."
//                   ></textarea>

//                   <small className="text-muted">
//                     Tell recruiters about your skills, experience and career goals.
//                   </small>

//                 </div>

//                 <div className="modal-footer">

//                   <button
//                     className="btn btn-secondary"
//                     onClick={() => setShowAboutModal(false)}
//                   >
//                     Cancel
//                   </button>

//                   <button
//                     className="btn btn-primary"
//                     onClick={() => setShowAboutModal(false)}
//                   >
//                     Save Changes
//                   </button>

//                 </div>

//               </div>

//             </div>
//           </div>

//           <div className="modal-backdrop fade show"></div>
//         </>
//       )}

//       {/* ===================Education Edit ============== */}
//       {showEducationModal && (
//         <>
//           <div
//             className="modal fade show"
//             style={{
//               display: "block",
//               background: "rgba(0,0,0,.5)",
//             }}
//           >
//             <div className="modal-dialog modal-lg modal-dialog-centered">
//               <div className="modal-content rounded-4">

//                 <div className="modal-header bg-primary text-white">

//                   <h4>Edit Education</h4>

//                   <button
//                     className="btn-close btn-close-white"
//                     onClick={() => setShowEducationModal(false)}
//                   ></button>

//                 </div>

//                 <div className="modal-body">

//                   <div className="mb-3">
//                     <label>Qualification</label>

//                     <input
//                       className="form-control"
//                       value={education.qualification}
//                       onChange={(e) =>
//                         setEducation({
//                           ...education,
//                           qualification: e.target.value,
//                         })
//                       }
//                     />
//                   </div>

//                   <div className="mb-3">
//                     <label>College Name</label>

//                     <input
//                       className="form-control"
//                       value={education.college}
//                       onChange={(e) =>
//                         setEducation({
//                           ...education,
//                           college: e.target.value,
//                         })
//                       }
//                     />
//                   </div>

//                   <div className="row">

//                     <div className="col-md-4">

//                       <label>Passing Year</label>

//                       <input
//                         className="form-control"
//                         value={education.year}
//                         onChange={(e) =>
//                           setEducation({
//                             ...education,
//                             year: e.target.value,
//                           })
//                         }
//                       />

//                     </div>

//                     <div className="col-md-4">

//                       <label>CGPA</label>

//                       <input
//                         className="form-control"
//                         value={education.cgpa}
//                         onChange={(e) =>
//                           setEducation({
//                             ...education,
//                             cgpa: e.target.value,
//                           })
//                         }
//                       />

//                     </div>

//                     <div className="col-md-4">

//                       <label>Status</label>

//                       <select
//                         className="form-select"
//                         value={education.status}
//                         onChange={(e) =>
//                           setEducation({
//                             ...education,
//                             status: e.target.value,
//                           })
//                         }
//                       >
//                         <option>Pursuing</option>
//                         <option>Completed</option>
//                       </select>

//                     </div>

//                   </div>

//                 </div>

//                 <div className="modal-footer">

//                   <button
//                     className="btn btn-secondary"
//                     onClick={() => setShowEducationModal(false)}
//                   >
//                     Cancel
//                   </button>

//                   <button
//                     className="btn btn-primary"
//                     onClick={() => setShowEducationModal(false)}
//                   >
//                     Save
//                   </button>

//                 </div>

//               </div>
//             </div>
//           </div>

//           <div className="modal-backdrop fade show"></div>
//         </>
//       )}

//       {/* =============== Education Delete========== */}
//       {showDeleteEducation && (
//         <>
//           <div
//             className="modal fade show"
//             style={{
//               display: "block",
//               background: "rgba(0,0,0,.5)",
//             }}
//           >
//             <div className="modal-dialog modal-dialog-centered">

//               <div className="modal-content rounded-4">

//                 <div className="modal-header bg-danger text-white">

//                   <h5>Delete Education</h5>

//                   <button
//                     className="btn-close btn-close-white"
//                     onClick={() => setShowDeleteEducation(false)}
//                   ></button>

//                 </div>

//                 <div className="modal-body text-center">

//                   <h4>⚠️</h4>

//                   <p>
//                     Are you sure you want to delete this education record?
//                   </p>

//                 </div>

//                 <div className="modal-footer">

//                   <button
//                     className="btn btn-secondary"
//                     onClick={() => setShowDeleteEducation(false)}
//                   >
//                     Cancel
//                   </button>

//                   <button
//                     className="btn btn-danger"
//                     onClick={() => {
//                       setShowDeleteEducation(false);
//                     }}
//                   >
//                     Delete
//                   </button>

//                 </div>

//               </div>

//             </div>
//           </div>

//           <div className="modal-backdrop fade show"></div>
//         </>
//       )}

//       {/* Skill modal */}
//       {showSkillModal && (
//   <>
//     <div
//       className="modal fade show"
//       style={{
//         display: "block",
//         background: "rgba(0,0,0,.5)",
//       }}
//     >
//       <div className="modal-dialog modal-dialog-centered">

//         <div className="modal-content rounded-4">

//           <div className="modal-header bg-primary text-white">

//             <h5 className="modal-title">
//               {isSkillEdit ? "Edit Skill" : "Add Skill"}
//             </h5>

//             <button
//               className="btn-close btn-close-white"
//               onClick={() => setShowSkillModal(false)}
//             />

//           </div>

//           <div className="modal-body">

//             <label className="form-label fw-semibold">
//               Skill Name
//             </label>

//             <input
//               type="text"
//               className="form-control"
//               value={skill}
//               onChange={(e) => setSkill(e.target.value)}
//               placeholder="Enter Skill"
//             />

//           </div>

//           <div className="modal-footer">

//             <button
//               className="btn btn-secondary"
//               onClick={() => setShowSkillModal(false)}
//             >
//               Cancel
//             </button>

//             <button
//               className="btn btn-primary"
//               onClick={saveSkill}
//             >
//               {isSkillEdit ? "Update Skill" : "Add Skill"}
//             </button>

//           </div>

//         </div>

//       </div>
//     </div>

//     <div className="modal-backdrop fade show"></div>
//   </>
// )}

//    {/* profession details  */}
//    {showProfessionalModal && (
//   <>
//     <div
//       className="modal fade show"
//       style={{
//         display: "block",
//         background: "rgba(0,0,0,.5)",
//       }}
//     >
//       <div className="modal-dialog modal-lg modal-dialog-centered">

//         <div className="modal-content rounded-4">

//           <div className="modal-header bg-primary text-white">

//             <h5 className="modal-title">
//               Professional Details
//             </h5>

//             <button
//               className="btn-close btn-close-white"
//               onClick={() => setShowProfessionalModal(false)}
//             />

//           </div>

//           <div className="modal-body">

//             <div className="row g-3">

//               <div className="col-md-6">
//                 <label className="form-label">Experience</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   value={professional?.experience || ""}
//                   onChange={(e) =>
//                     setProfessional({
//                       ...professional,
//                       experience: e.target.value,
//                     })
//                   }
//                 />
//               </div>

//               <div className="col-md-6">
//                 <label className="form-label">Current Company</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   value={professional?.company || ""}
//                   onChange={(e) =>
//                     setProfessional({
//                       ...professional,
//                       company: e.target.value,
//                     })
//                   }
//                 />
//               </div>

//               <div className="col-md-6">
//                 <label className="form-label">Current Salary</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   value={professional?.currentSalary || ""}
//                   onChange={(e) =>
//                     setProfessional({
//                       ...professional,
//                       currentSalary: e.target.value,
//                     })
//                   }
//                 />
//               </div>

//               <div className="col-md-6">
//                 <label className="form-label">Expected Salary</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   value={professional?.expectedSalary || ""}
//                   onChange={(e) =>
//                     setProfessional({
//                       ...professional,
//                       expectedSalary: e.target.value,
//                     })
//                   }
//                 />
//               </div>

//             </div>

//           </div>

//           <div className="modal-footer">

//             <button
//               className="btn btn-secondary"
//               onClick={() => setShowProfessionalModal(false)}
//             >
//               Cancel
//             </button>

//             <button
//               className="btn btn-primary"
//               onClick={() => setShowProfessionalModal(false)}
//             >
//               Save
//             </button>

//           </div>

//         </div>

//       </div>
//     </div>

//     <div className="modal-backdrop fade show"></div>
//   </>
// )}
//          {/* Professional Summary */}
//          {showSummaryModal && (
//   <>
//     <div
//       className="modal fade show"
//       style={{
//         display: "block",
//         background: "rgba(0,0,0,.5)",
//       }}
//     >
//       <div className="modal-dialog modal-lg modal-dialog-centered">

//         <div className="modal-content rounded-4">

//           <div className="modal-header bg-primary text-white">

//             <h5 className="modal-title">
//               {summary ? "Edit Professional Summary" : "Add Professional Summary"}
//             </h5>

//             <button
//               className="btn-close btn-close-white"
//               onClick={() => setShowSummaryModal(false)}
//             />

//           </div>

//           <div className="modal-body">

//             <label className="form-label fw-semibold">
//               Professional Summary
//             </label>

//             <textarea
//               className="form-control"
//               rows="8"
//               value={summary}
//               onChange={(e) => setSummary(e.target.value)}
//               placeholder="Write your professional summary..."
//             />

//           </div>

//           <div className="modal-footer">

//             <button
//               className="btn btn-secondary"
//               onClick={() => setShowSummaryModal(false)}
//             >
//               Cancel
//             </button>

//             <button
//               className="btn btn-primary"
//               onClick={() => setShowSummaryModal(false)}
//             >
//               Save
//             </button>

//           </div>

//         </div>

//       </div>
//     </div>

//     <div className="modal-backdrop fade show"></div>
//   </>
// )}
   
//    {/* Resume  */}
//    {showResumeModal && (
//   <>
//     <div
//       className="modal fade show"
//       style={{
//         display: "block",
//         background: "rgba(0,0,0,.5)",
//       }}
//     >
//       <div className="modal-dialog modal-dialog-centered">

//         <div className="modal-content rounded-4">

//           <div className="modal-header bg-primary text-white">

//             <h5 className="modal-title">
//               {resume ? "Update Resume" : "Upload Resume"}
//             </h5>

//             <button
//               className="btn-close btn-close-white"
//               onClick={() => setShowResumeModal(false)}
//             />

//           </div>

//           <div className="modal-body">

//             <label className="form-label fw-semibold">
//               Select Resume (PDF)
//             </label>

//             <input
//               type="file"
//               className="form-control"
//               accept=".pdf"
//               onChange={(e) => {
//                 if (e.target.files.length > 0) {
//                   setResume({
//                     name: e.target.files[0].name,
//                     date: new Date().toLocaleDateString(),
//                     file: e.target.files[0],
//                   });
//                 }
//               }}
//             />

//           </div>

//           <div className="modal-footer">

//             <button
//               className="btn btn-secondary"
//               onClick={() => setShowResumeModal(false)}
//             >
//               Cancel
//             </button>

//             <button
//               className="btn btn-primary"
//               onClick={() => setShowResumeModal(false)}
//             >
//               Save
//             </button>

//           </div>

//         </div>

//       </div>
//     </div>

//     <div className="modal-backdrop fade show"></div>
//   </>
// )}

//  {/* Social */}
// {showSocialModal && (
//   <>
//     <div
//       className="modal fade show"
//       style={{
//         display: "block",
//         background: "rgba(0,0,0,.5)",
//       }}
//     >
//       <div className="modal-dialog modal-dialog-centered">

//         <div className="modal-content rounded-4">

//           <div className="modal-header bg-primary text-white">

//             <h5 className="modal-title">
//               {editIndex !== null
//                 ? "Edit Social Profile"
//                 : "Add Social Profile"}
//             </h5>

//             <button
//               className="btn-close btn-close-white"
//               onClick={() => {
//                 setShowSocialModal(false);
//                 setEditIndex(null);
//               }}
//             />

//           </div>

//           <div className="modal-body">

//             <div className="mb-3">

//               <label className="form-label fw-semibold">
//                 Profile Type
//               </label>

//               <select
//                 className="form-select"
//                 value={socialType}
//                 onChange={(e) => setSocialType(e.target.value)}
//               >
//                 <option value="">Select Profile</option>
//                 <option>GitHub</option>
//                 <option>LinkedIn</option>
//                 <option>Portfolio</option>
//               </select>

//             </div>

//             <div>

//               <label className="form-label fw-semibold">
//                 Profile Link
//               </label>

//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Enter Profile Link"
//                 value={socialLink}
//                 onChange={(e) => setSocialLink(e.target.value)}
//               />

//             </div>

//           </div>

//           <div className="modal-footer">

//             <button
//               className="btn btn-secondary"
//               onClick={() => {
//                 setShowSocialModal(false);
//                 setEditIndex(null);
//               }}
//             >
//               Cancel
//             </button>

//             <button
//               className="btn btn-primary"
//               onClick={saveSocial}
//             >
//               {editIndex !== null ? "Update" : "Add"}
//             </button>

//           </div>

//         </div>

//       </div>
//     </div>

//     <div className="modal-backdrop fade show"></div>
//   </>
// )}

//  {/* Address */}
//  {showAddressModal && (
//   <>
//     <div
//       className="modal fade show"
//       style={{
//         display: "block",
//         background: "rgba(0,0,0,.5)",
//       }}
//     >
//       <div className="modal-dialog modal-lg modal-dialog-centered">

//         <div className="modal-content rounded-4">

//           <div className="modal-header bg-primary text-white">

//             <h5 className="modal-title">
//               {address ? "Edit Address" : "Add Address"}
//             </h5>

//             <button
//               className="btn-close btn-close-white"
//               onClick={() => setShowAddressModal(false)}
//             />

//           </div>

//           <div className="modal-body">

//             <div className="row g-3">

//               <div className="col-md-12">
//                 <label className="form-label">Address</label>
//                 <textarea
//                   className="form-control"
//                   rows="3"
//                   value={address?.address || ""}
//                   onChange={(e) =>
//                     setAddress({
//                       ...address,
//                       address: e.target.value,
//                     })
//                   }
//                 />
//               </div>

//               <div className="col-md-6">
//                 <label className="form-label">City</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   value={address?.city || ""}
//                   onChange={(e) =>
//                     setAddress({
//                       ...address,
//                       city: e.target.value,
//                     })
//                   }
//                 />
//               </div>

//               <div className="col-md-6">
//                 <label className="form-label">Pincode</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   value={address?.pincode || ""}
//                   onChange={(e) =>
//                     setAddress({
//                       ...address,
//                       pincode: e.target.value,
//                     })
//                   }
//                 />
//               </div>

//               <div className="col-md-6">
//                 <label className="form-label">State</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   value={address?.state || ""}
//                   onChange={(e) =>
//                     setAddress({
//                       ...address,
//                       state: e.target.value,
//                     })
//                   }
//                 />
//               </div>

//               <div className="col-md-6">
//                 <label className="form-label">Country</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   value={address?.country || ""}
//                   onChange={(e) =>
//                     setAddress({
//                       ...address,
//                       country: e.target.value,
//                     })
//                   }
//                 />
//               </div>

//             </div>

//           </div>

//           <div className="modal-footer">

//             <button
//               className="btn btn-secondary"
//               onClick={() => setShowAddressModal(false)}
//             >
//               Cancel
//             </button>

//             <button
//               className="btn btn-primary"
//               onClick={() => setShowAddressModal(false)}
//             >
//               Save
//             </button>

//           </div>

//         </div>

//       </div>
//     </div>

//     <div className="modal-backdrop fade show"></div>
//   </>
// )}
 
//    {/* Contact  */}
//    {showContactModal && (
//   <>
//     <div
//       className="modal fade show"
//       style={{
//         display: "block",
//         background: "rgba(0,0,0,.5)",
//       }}
//     >
//       <div className="modal-dialog modal-lg modal-dialog-centered">

//         <div className="modal-content rounded-4">

//           <div className="modal-header bg-primary text-white">

//             <h5 className="modal-title">
//               {contact ? "Edit Contact Information" : "Add Contact Information"}
//             </h5>

//             <button
//               className="btn-close btn-close-white"
//               onClick={() => setShowContactModal(false)}
//             /x>

//           </div>

//           <div className="modal-body">

//             <div className="row g-3">

//               <div className="col-md-6">
//                 <label className="form-label">Mobile Number</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   value={contact?.mobile || ""}
//                   onChange={(e) =>
//                     setContact({
//                       ...contact,
//                       mobile: e.target.value,
//                     })
//                   }
//                 />
//               </div>

//               <div className="col-md-6">
//                 <label className="form-label">Email Address</label>
//                 <input
//                   type="email"
//                   className="form-control"
//                   value={contact?.email || ""}
//                   onChange={(e) =>
//                     setContact({
//                       ...contact,
//                       email: e.target.value,
//                     })
//                   }
//                 />
//               </div>

//               <div className="col-md-6">
//                 <label className="form-label">Alternate Contact</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   value={contact?.alternate || ""}
//                   onChange={(e) =>
//                     setContact({
//                       ...contact,
//                       alternate: e.target.value,
//                     })
//                   }
//                 />
//               </div>

//               <div className="col-md-6">
//                 <label className="form-label">Preferred Contact Time</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder="10:00 AM - 6:00 PM"
//                   value={contact?.preferred || ""}
//                   onChange={(e) =>
//                     setContact({
//                       ...contact,
//                       preferred: e.target.value,
//                     })
//                   }
//                 />
//               </div>

//             </div>

//           </div>

//           <div className="modal-footer">

//             <button
//               className="btn btn-secondary"
//               onClick={() => setShowContactModal(false)}
//             >
//               Cancel
//             </button>

//             <button
//               className="btn btn-primary"
//               onClick={() => setShowContactModal(false)}
//             >
//               Save
//             </button>

//           </div>

//         </div>

//       </div>
//     </div>

//     <div className="modal-backdrop fade show"></div>
//   </>
// )}
//     </div>
    
//   )
// };

// export default Profile;