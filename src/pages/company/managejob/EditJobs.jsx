
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    FaEdit,
    FaArrowLeft,
    FaSave,
    FaBriefcase,
} from "react-icons/fa";

import api from "../../../services/api";
import "./PostJob.css";


const EditJobs = () => {

    const { id } = useParams();

    const navigate = useNavigate();


    // ==========================================
    // JOB STATE
    // ==========================================

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
        last_date: ""

    });


    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);


    // ==========================================
    // FETCH JOB
    // ==========================================

    useEffect(() => {

        if (id) {
            fetchJob();
        }

    }, [id]);


    const fetchJob = async () => {

        try {

            setFetching(true);

            const res = await api.get(
                `/company/jobs/${id}`
            );


            const jobData = res.data.job;


            setJob({

                job_title: jobData.job_title || "",
                category: jobData.category || "",
                job_type: jobData.job_type || "",
                work_mode: jobData.work_mode || "",
                experience: jobData.experience || "",
                openings: jobData.openings || "",
                location: jobData.location || "",
                salary_min: jobData.salary_min || "",
                salary_max: jobData.salary_max || "",
                required_skills: jobData.required_skills || "",
                job_description: jobData.job_description || "",
                responsibilities: jobData.responsibilities || "",
                qualifications: jobData.qualifications || "",

                last_date: jobData.last_date
                    ? jobData.last_date.split("T")[0]
                    : ""

            });


        } catch (error) {

            console.error(
                "FETCH JOB:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Job not found"
            );

            navigate("/company/manage-jobs");


        } finally {

            setFetching(false);

        }

    };


    // ==========================================
    // HANDLE CHANGE
    // ==========================================

    const handleChange = (e) => {

        const {
            name,
            value
        } = e.target;


        setJob((prev) => ({

            ...prev,

            [name]: value

        }));

    };


    // ==========================================
    // UPDATE JOB
    // ==========================================

    const handleSubmit = async (e) => {

        e.preventDefault();


        try {

            setLoading(true);


            const res = await api.put(
                `/company/jobs/${id}`,
                job
            );


            alert(
                res.data.message ||
                "Job updated successfully"
            );


            navigate(
                "/company/manage-jobs"
            );


        } catch (error) {

            console.error(
                "UPDATE JOB:",
                error
            );


            alert(
                error.response?.data?.message ||
                "Update Failed"
            );


        } finally {

            setLoading(false);

        }

    };


    // ==========================================
    // LOADING
    // ==========================================

    if (fetching) {

        return (

            <div
                className="d-flex justify-content-center align-items-center"
                style={{
                    minHeight: "70vh"
                }}
            >

                <div className="text-center">

                    <div
                        className="spinner-border text-primary"
                        role="status"
                    />

                    <p className="text-muted mt-3">
                        Loading job details...
                    </p>

                </div>

            </div>

        );

    }


    // ==========================================
    // UI
    // ==========================================

    return (

        <div className="post-job-page">

            <div className="job-card">


                {/* =================================
                    HEADER
                ================================= */}

                <div className="job-header">

                    <div className="d-flex align-items-center gap-2">

                        <FaEdit />

                        <h2 className="mb-0">
                            Edit Job
                        </h2>

                    </div>


                    <p>
                        Update your job information
                    </p>

                </div>


                {/* =================================
                    FORM
                ================================= */}

                <form
                    onSubmit={handleSubmit}
                >

                    <div className="row g-4">


                        {/* JOB TITLE */}

                        <div className="col-md-6">

                            <label>
                                Job Title
                            </label>

                            <input
                                className="form-control"
                                name="job_title"
                                value={job.job_title}
                                onChange={handleChange}
                                placeholder="Software Developer"
                                required
                            />

                        </div>


                        {/* CATEGORY */}

                        <div className="col-md-6">

                            <label>
                                Category
                            </label>

                            <input
                                className="form-control"
                                name="category"
                                value={job.category}
                                onChange={handleChange}
                                placeholder="IT / Marketing / Finance"
                                required
                            />

                        </div>


                        {/* JOB TYPE */}

                        <div className="col-md-4">

                            <label>
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
                                    Select Type
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
                                    Select Mode
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
                                Experience
                            </label>

                            <input
                                className="form-control"
                                name="experience"
                                value={job.experience}
                                onChange={handleChange}
                                placeholder="2 Years"
                            />

                        </div>


                        {/* OPENINGS */}

                        <div className="col-md-4">

                            <label>
                                Openings
                            </label>

                            <input
                                type="number"
                                min="1"
                                className="form-control"
                                name="openings"
                                value={job.openings}
                                onChange={handleChange}
                            />

                        </div>


                        {/* LOCATION */}

                        <div className="col-md-8">

                            <label>
                                Location
                            </label>

                            <input
                                className="form-control"
                                name="location"
                                value={job.location}
                                onChange={handleChange}
                                placeholder="Pune / Mumbai / Remote"
                            />

                        </div>


                        {/* MIN SALARY */}

                        <div className="col-md-6">

                            <label>
                                Minimum Salary
                            </label>

                            <input
                                type="number"
                                min="0"
                                className="form-control"
                                name="salary_min"
                                value={job.salary_min}
                                onChange={handleChange}
                                placeholder="30000"
                            />

                        </div>


                        {/* MAX SALARY */}

                        <div className="col-md-6">

                            <label>
                                Maximum Salary
                            </label>

                            <input
                                type="number"
                                min="0"
                                className="form-control"
                                name="salary_max"
                                value={job.salary_max}
                                onChange={handleChange}
                                placeholder="60000"
                            />

                        </div>


                        {/* SKILLS */}

                        <div className="col-12">

                            <label>
                                Required Skills
                            </label>

                            <input
                                className="form-control"
                                name="required_skills"
                                value={job.required_skills}
                                onChange={handleChange}
                                placeholder="React, Node.js, MySQL"
                            />

                        </div>


                        {/* DESCRIPTION */}

                        <div className="col-12">

                            <label>
                                Job Description
                            </label>

                            <textarea
                                rows="5"
                                className="form-control"
                                name="job_description"
                                value={job.job_description}
                                onChange={handleChange}
                                placeholder="Describe the job role..."
                            />

                        </div>


                        {/* RESPONSIBILITIES */}

                        <div className="col-md-6">

                            <label>
                                Responsibilities
                            </label>

                            <textarea
                                rows="5"
                                className="form-control"
                                name="responsibilities"
                                value={job.responsibilities}
                                onChange={handleChange}
                                placeholder="Enter job responsibilities..."
                            />

                        </div>


                        {/* QUALIFICATIONS */}

                        <div className="col-md-6">

                            <label>
                                Qualifications
                            </label>

                            <textarea
                                rows="5"
                                className="form-control"
                                name="qualifications"
                                value={job.qualifications}
                                onChange={handleChange}
                                placeholder="Enter required qualifications..."
                            />

                        </div>


                        {/* LAST DATE */}

                        <div className="col-md-6">

                            <label>
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


                        {/* BUTTONS */}

                        <div className="col-12">

                            <div className="d-flex justify-content-center gap-3 flex-wrap">


                                <button
                                    type="button"
                                    className="btn btn-light border rounded-pill px-4 py-2"
                                    onClick={() =>
                                        navigate(
                                            "/company/manage-jobs"
                                        )
                                    }
                                    disabled={loading}
                                >

                                    <FaArrowLeft className="me-2" />

                                    Back

                                </button>


                                <button
                                    type="submit"
                                    className="post-btn"
                                    disabled={loading}
                                >

                                    {loading ? (

                                        <>
                                            <span
                                                className="spinner-border spinner-border-sm me-2"
                                            />

                                            Updating...
                                        </>

                                    ) : (

                                        <>
                                            <FaSave className="me-2" />

                                            Update Job
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


export default EditJobs;

