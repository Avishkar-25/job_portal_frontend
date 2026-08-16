
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    FaBriefcase,
    FaEdit,
    FaTrash,
    FaMapMarkerAlt,
    FaCalendarAlt,
    FaUsers,
} from "react-icons/fa";

import api from "../../../services/api";

const ManageJobTable = () => {

    const navigate = useNavigate();

    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);


    // ==========================================
    // FETCH JOBS
    // ==========================================

    useEffect(() => {
        fetchJobs();
    }, []);


    const fetchJobs = async () => {

        try {

            setLoading(true);

            const res = await api.get("/company/jobs");

            setJobs(res.data.jobs || []);

        } catch (error) {

            console.error("FETCH JOBS:", error);

        } finally {

            setLoading(false);

        }

    };


    // ==========================================
    // DELETE JOB
    // ==========================================

    const deleteJob = async (job_id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this job?"
        );

        if (!confirmDelete) {
            return;
        }


        try {

            const res = await api.delete(
                `/company/jobs/${job_id}`
            );

            alert(res.data.message);

            fetchJobs();

        } catch (error) {

            console.error("DELETE JOB:", error);

            alert(
                error.response?.data?.message ||
                "Failed to delete job"
            );

        }

    };


    // ==========================================
    // EDIT JOB
    // ==========================================

    const editJob = (job_id) => {

        navigate(`/company/edit-job/${job_id}`);

    };


    return (

        <div className="container-fluid py-4">

            <div className="card border-0 shadow-sm rounded-4 overflow-hidden">

                {/* ================= HEADER ================= */}

                <div
                    className="card-header border-0 text-white p-4"
                    style={{
                        background:
                            "linear-gradient(135deg, #0f172a, #1e3a8a, #2563eb)"
                    }}
                >

                    <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">

                        <div>

                            <h3 className="fw-bold mb-1">
                                <FaBriefcase className="me-2" />

                                Manage Jobs
                            </h3>

                            <p className="mb-0 opacity-75">
                                Manage your posted job opportunities
                            </p>

                        </div>


                        <div className="d-flex align-items-center gap-2">

                            <span className="badge bg-white text-dark rounded-pill px-3 py-2">

                                Total Jobs: {jobs.length}

                            </span>


                            <button
                                className="btn btn-light rounded-pill px-3"
                                onClick={() =>
                                    navigate("/company/post-job")
                                }
                            >

                                + Post Job

                            </button>

                        </div>

                    </div>

                </div>


                {/* ================= TABLE ================= */}

                <div className="table-responsive">

                    <table className="table table-hover align-middle mb-0">

                        <thead
                            style={{
                                background: "#f8fafc"
                            }}
                        >

                            <tr>

                                <th className="px-4 py-3">
                                    #
                                </th>

                                <th className="py-3">
                                    Job
                                </th>

                                <th className="py-3">
                                    Type
                                </th>

                                <th className="py-3">
                                    Location
                                </th>

                                <th className="py-3">
                                    Openings
                                </th>

                                <th className="py-3">
                                    Last Date
                                </th>

                                <th className="py-3 text-center">
                                    Actions
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {/* ================= LOADING ================= */}

                            {loading && (

                                <tr>

                                    <td
                                        colSpan="7"
                                        className="text-center py-5"
                                    >

                                        <div
                                            className="spinner-border text-primary"
                                            role="status"
                                        />

                                        <p className="text-muted mt-2 mb-0">
                                            Loading jobs...
                                        </p>

                                    </td>

                                </tr>

                            )}


                            {/* ================= NO JOBS ================= */}

                            {!loading && jobs.length === 0 && (

                                <tr>

                                    <td
                                        colSpan="7"
                                        className="text-center py-5"
                                    >

                                        <FaBriefcase
                                            size={40}
                                            className="text-muted mb-3"
                                        />

                                        <h5 className="fw-semibold">
                                            No Jobs Found
                                        </h5>

                                        <p className="text-muted">
                                            You haven't posted any jobs yet.
                                        </p>

                                        <button
                                            className="btn btn-primary rounded-pill px-4"
                                            onClick={() =>
                                                navigate("/company/post-job")
                                            }
                                        >
                                            Post Your First Job
                                        </button>

                                    </td>

                                </tr>

                            )}


                            {/* ================= JOB LIST ================= */}

                            {!loading &&
                                jobs.length > 0 &&
                                jobs.map((job, index) => (

                                    <tr key={job.job_id}>

                                        {/* INDEX */}

                                        <td className="px-4 fw-semibold text-muted">

                                            {index + 1}

                                        </td>


                                        {/* JOB TITLE */}

                                        <td>

                                            <div>

                                                <div className="fw-bold text-dark">

                                                    {job.job_title}

                                                </div>

                                                <small className="text-muted">

                                                    {job.category || "General"}

                                                </small>

                                            </div>

                                        </td>


                                        {/* JOB TYPE */}

                                        <td>

                                            <span
                                                className="badge rounded-pill px-3 py-2"
                                                style={{
                                                    background: "#e7f1ff",
                                                    color: "#0d6efd"
                                                }}
                                            >

                                                {job.job_type || "N/A"}

                                            </span>

                                        </td>


                                        {/* LOCATION */}

                                        <td>

                                            <span className="text-muted">

                                                <FaMapMarkerAlt
                                                    className="me-1 text-danger"
                                                />

                                                {job.location || "Remote"}

                                            </span>

                                        </td>


                                        {/* OPENINGS */}

                                        <td>

                                            <span className="text-muted">

                                                <FaUsers className="me-1 text-primary" />

                                                {job.openings || 0}

                                            </span>

                                        </td>


                                        {/* LAST DATE */}

                                        <td>

                                            <span className="text-muted">

                                                <FaCalendarAlt
                                                    className="me-1 text-warning"
                                                />

                                                {job.last_date
                                                    ? new Date(
                                                        job.last_date
                                                    ).toLocaleDateString()
                                                    : "Not specified"}

                                            </span>

                                        </td>


                                        {/* ACTIONS */}

                                        <td>

                                            <div className="d-flex justify-content-center gap-2">

                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-outline-primary rounded-circle"
                                                    title="Edit Job"
                                                    onClick={() =>
                                                        editJob(job.job_id)
                                                    }
                                                    style={{
                                                        width: "36px",
                                                        height: "36px"
                                                    }}
                                                >

                                                    <FaEdit />

                                                </button>


                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-outline-danger rounded-circle"
                                                    title="Delete Job"
                                                    onClick={() =>
                                                        deleteJob(job.job_id)
                                                    }
                                                    style={{
                                                        width: "36px",
                                                        height: "36px"
                                                    }}
                                                >

                                                    <FaTrash />

                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );

};

export default ManageJobTable;

