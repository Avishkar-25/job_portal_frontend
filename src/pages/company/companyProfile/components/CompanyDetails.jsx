import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import api from "../../../../services/api";
import CompanyDetailsModal from "../modals/CompanyDetailsModal";
import {
   
    FaFileAlt
} from "react-icons/fa";
const CompanyDetails = ({ company, setCompany }) => {

    const [showModal, setShowModal] = useState(false);
    const [deleting, setDeleting] = useState(null);

    // ==========================================
    // DELETE LEGAL DETAIL
    // ==========================================

    const handleDelete = async (type) => {

        const fieldNames = {
            gst_number: "GST Number",
            cin_number: "CIN Number",
            pan_number: "PAN Number"
        };

        const confirmDelete = window.confirm(
            `Are you sure you want to delete ${fieldNames[type]}?`
        );

        if (!confirmDelete) {
            return;
        }

        try {

            setDeleting(type);

            const response = await api.delete(
                `/company/profile/legal/${type}`
            );

            if (response.data.success) {

                setCompany((prev) => ({
                    ...prev,
                    [type]: null
                }));

            }

        } catch (error) {

            console.error(
                "Delete legal detail error:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Failed to delete legal detail"
            );

        } finally {

            setDeleting(null);
        }
    };


    return (
        <>
            {/* ==========================================
                LEGAL DETAILS CARD
            ========================================== */}

            <div className="profile-section-card">

                {/* HEADER */}

                <div className="section-header">

                    <div className="d-flex align-items-center gap-3">

                        <div className="section-icon">
                            <FaFileAlt  size={22} />
                        </div>

                        <div>
                            <h4 className="mb-1">
                                Company Legal Details
                            </h4>

                            <p className="mb-0">
                                Business registration information
                            </p>
                        </div>

                    </div>


                    {/* EDIT */}

                    <button
                        type="button"
                        className="edit-section-btn"
                        onClick={() => setShowModal(true)}
                    >

                        <FaEdit />

                        <span>
                            Edit
                        </span>

                    </button>

                </div>


                {/* ==========================================
                    LEGAL GRID
                ========================================== */}

                <div className="legal-grid">


                    {/* GST */}

                    <div className="legal-item">

                        <span>
                            GST Number
                        </span>

                        <div className="d-flex align-items-center justify-content-between gap-2">

                            <strong>
                                {company.gst_number ||
                                    "Not provided"}
                            </strong>

                            {company.gst_number && (

                                <button
                                    type="button"
                                    className="btn btn-outline-danger btn-sm rounded-circle"
                                    style={{
                                        width: "34px",
                                        height: "34px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}
                                    onClick={() =>
                                        handleDelete("gst_number")
                                    }
                                    disabled={
                                        deleting === "gst_number"
                                    }
                                    title="Delete GST Number"
                                >

                                    {deleting === "gst_number" ? (

                                        <span
                                            className="spinner-border spinner-border-sm"
                                        ></span>

                                    ) : (

                                        <FaTrash size={13} />

                                    )}

                                </button>

                            )}

                        </div>

                    </div>


                    {/* CIN */}

                    <div className="legal-item">

                        <span>
                            CIN Number
                        </span>

                        <div className="d-flex align-items-center justify-content-between gap-2">

                            <strong>
                                {company.cin_number ||
                                    "Not provided"}
                            </strong>

                            {company.cin_number && (

                                <button
                                    type="button"
                                    className="btn btn-outline-danger btn-sm rounded-circle"
                                    style={{
                                        width: "34px",
                                        height: "34px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}
                                    onClick={() =>
                                        handleDelete("cin_number")
                                    }
                                    disabled={
                                        deleting === "cin_number"
                                    }
                                    title="Delete CIN Number"
                                >

                                    {deleting === "cin_number" ? (

                                        <span
                                            className="spinner-border spinner-border-sm"
                                        ></span>

                                    ) : (

                                        <FaTrash size={13} />

                                    )}

                                </button>

                            )}

                        </div>

                    </div>


                    {/* PAN */}

                    <div className="legal-item">

                        <span>
                            PAN Number
                        </span>

                        <div className="d-flex align-items-center justify-content-between gap-2">

                            <strong>
                                {company.pan_number ||
                                    "Not provided"}
                            </strong>

                            {company.pan_number && (

                                <button
                                    type="button"
                                    className="btn btn-outline-danger btn-sm rounded-circle"
                                    style={{
                                        width: "34px",
                                        height: "34px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}
                                    onClick={() =>
                                        handleDelete("pan_number")
                                    }
                                    disabled={
                                        deleting === "pan_number"
                                    }
                                    title="Delete PAN Number"
                                >

                                    {deleting === "pan_number" ? (

                                        <span
                                            className="spinner-border spinner-border-sm"
                                        ></span>

                                    ) : (

                                        <FaTrash size={13} />

                                    )}

                                </button>

                            )}

                        </div>

                    </div>

                </div>

            </div>


            {/* ==========================================
                EDIT MODAL
            ========================================== */}

            {showModal && (

                <CompanyDetailsModal
                    company={company}
                    setCompany={setCompany}
                    closeModal={() => setShowModal(false)}
                />

            )}

        </>
    );
};

export default CompanyDetails;