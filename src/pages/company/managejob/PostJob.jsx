
import React, { useState } from "react";
import api from "../../../services/api";
import "./PostJob.css";
import { useNavigate } from "react-router-dom";

import {
  FaBriefcase,
  FaLayerGroup,
  FaClock,
  FaLaptopHouse,
  FaUserTie,
  FaUsers,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaTools,
  FaAlignLeft,
  FaTasks,
  FaGraduationCap,
  FaCalendarAlt,
  FaPaperPlane,
} from "react-icons/fa";

const PostJob = () => {

  const navigate = useNavigate();

  const [job, setJob] = useState({
    job_title: "",
    category: "",
    job_type: "",
    work_mode: "",
    experience: "",
    openings: "",
    location: "",
    salary_min: "",
    salary_max: "",
    required_skills: "",
    job_description: "",
    responsibilities: "",
    qualifications: "",
    last_date: "",
  });

  const [loading, setLoading] = useState(false);


  // ==========================================
  // HANDLE INPUT CHANGE
  // ==========================================

  const handleChange = (e) => {

    setJob({
      ...job,
      [e.target.name]: e.target.value,
    });

  };


  // ==========================================
  // SUBMIT JOB
  // ==========================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const res = await api.post(
        "/company/jobs/create",
        job
      );

      alert(res.data.message);

      navigate("/company/manage-jobs");

    } catch (error) {

      console.error("POST JOB ERROR:", error);

      alert(
        error.response?.data?.message ||
        "Job Post Failed"
      );

    } finally {

      setLoading(false);

    }

  };


  return (

    <div className="post-job-page">

      <div className="job-card">


        {/* ==========================================
            HEADER
        ========================================== */}

        <div className="job-header">

          <div className="job-header-icon">
            <FaBriefcase />
          </div>

          <div>

            <h2>
              Post New Job
            </h2>

            <p>
              Create a new job opening and find the right candidates.
            </p>

          </div>

        </div>


        {/* ==========================================
            FORM
        ========================================== */}

        <form onSubmit={handleSubmit}>

          <div className="row g-4">


            {/* JOB TITLE */}

            <div className="col-md-6">

              <label>
                <FaBriefcase />
                Job Title
              </label>

              <input
                className="form-control"
                name="job_title"
                value={job.job_title}
                placeholder="e.g. Software Developer"
                onChange={handleChange}
                required
              />

            </div>


            {/* CATEGORY */}

            <div className="col-md-6">

              <label>
                <FaLayerGroup />
                Category
              </label>

              <input
                className="form-control"
                name="category"
                value={job.category}
                placeholder="e.g. IT / Marketing / Finance"
                onChange={handleChange}
                required
              />

            </div>


            {/* JOB TYPE */}

            <div className="col-md-4">

              <label>
                <FaClock />
                Job Type
              </label>

              <select
                className="form-select"
                name="job_type"
                value={job.job_type}
                onChange={handleChange}
                required
              >

                <option value="">
                  Select Job Type
                </option>

                <option value="Full Time">
                  Full Time
                </option>

                <option value="Part Time">
                  Part Time
                </option>

                <option value="Internship">
                  Internship
                </option>

                <option value="Contract">
                  Contract
                </option>

              </select>

            </div>


            {/* WORK MODE */}

            <div className="col-md-4">

              <label>
                <FaLaptopHouse />
                Work Mode
              </label>

              <select
                className="form-select"
                name="work_mode"
                value={job.work_mode}
                onChange={handleChange}
                required
              >

                <option value="">
                  Select Work Mode
                </option>

                <option value="Onsite">
                  On Site
                </option>

                <option value="Remote">
                  Remote
                </option>

                <option value="Hybrid">
                  Hybrid
                </option>

              </select>

            </div>


            {/* EXPERIENCE */}

            <div className="col-md-4">

              <label>
                <FaUserTie />
                Experience
              </label>

              <input
                className="form-control"
                name="experience"
                value={job.experience}
                placeholder="e.g. 2 Years"
                onChange={handleChange}
              />

            </div>


            {/* OPENINGS */}

            <div className="col-md-4">

              <label>
                <FaUsers />
                Number of Openings
              </label>

              <input
                type="number"
                min="1"
                className="form-control"
                name="openings"
                value={job.openings}
                placeholder="e.g. 5"
                onChange={handleChange}
              />

            </div>


            {/* LOCATION */}

            <div className="col-md-8">

              <label>
                <FaMapMarkerAlt />
                Location
              </label>

              <input
                className="form-control"
                name="location"
                value={job.location}
                placeholder="e.g. Pune, Maharashtra"
                onChange={handleChange}
              />

            </div>


            {/* MINIMUM SALARY */}

            <div className="col-md-6">

              <label>
                <FaMoneyBillWave />
                Minimum Salary
              </label>

              <input
                type="number"
                min="0"
                className="form-control"
                name="salary_min"
                value={job.salary_min}
                placeholder="e.g. 30000"
                onChange={handleChange}
              />

            </div>


            {/* MAXIMUM SALARY */}

            <div className="col-md-6">

              <label>
                <FaMoneyBillWave />
                Maximum Salary
              </label>

              <input
                type="number"
                min="0"
                className="form-control"
                name="salary_max"
                value={job.salary_max}
                placeholder="e.g. 60000"
                onChange={handleChange}
              />

            </div>


            {/* REQUIRED SKILLS */}

            <div className="col-12">

              <label>
                <FaTools />
                Required Skills
              </label>

              <input
                className="form-control"
                name="required_skills"
                value={job.required_skills}
                placeholder="React, Node.js, MySQL, JavaScript"
                onChange={handleChange}
              />

              <small className="form-hint">
                Separate multiple skills with commas.
              </small>

            </div>


            {/* JOB DESCRIPTION */}

            <div className="col-12">

              <label>
                <FaAlignLeft />
                Job Description
              </label>

              <textarea
                className="form-control"
                rows="5"
                name="job_description"
                value={job.job_description}
                placeholder="Describe the job role, company expectations and opportunity..."
                onChange={handleChange}
              />

            </div>


            {/* RESPONSIBILITIES */}

            <div className="col-md-6">

              <label>
                <FaTasks />
                Responsibilities
              </label>

              <textarea
                className="form-control"
                rows="5"
                name="responsibilities"
                value={job.responsibilities}
                placeholder="List the main responsibilities..."
                onChange={handleChange}
              />

            </div>


            {/* QUALIFICATIONS */}

            <div className="col-md-6">

              <label>
                <FaGraduationCap />
                Qualifications
              </label>

              <textarea
                className="form-control"
                rows="5"
                name="qualifications"
                value={job.qualifications}
                placeholder="Education, experience and other requirements..."
                onChange={handleChange}
              />

            </div>


            {/* LAST DATE */}

            <div className="col-md-6">

              <label>
                <FaCalendarAlt />
                Last Date To Apply
              </label>

              <input
                type="date"
                className="form-control"
                name="last_date"
                value={job.last_date}
                onChange={handleChange}
              />

            </div>


            {/* ACTION */}

            <div className="col-12">

              <div className="job-form-actions">

                <button
                  type="button"
                  className="job-cancel-btn"
                  onClick={() =>
                    navigate("/company/manage-jobs")
                  }
                  disabled={loading}
                >
                  Cancel
                </button>


                <button
                  type="submit"
                  className="post-btn"
                  disabled={loading}
                >

                  {loading ? (

                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Posting Job...
                    </>

                  ) : (

                    <>
                      <FaPaperPlane />
                      Post Job
                    </>

                  )}

                </button>

              </div>

            </div>

          </div>

        </form>

      </div>

    </div>

  );
};

export default PostJob;

