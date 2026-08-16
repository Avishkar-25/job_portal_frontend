
import React, { useState } from "react";
import api from "../../../../services/api";

const CompanySocialModal = ({
    company,
    setCompany,
    closeModal
}) => {

    const [formData, setFormData] = useState({
        linkedin: company.linkedin || "",
        facebook: company.facebook || "",
        instagram: company.instagram || "",
        twitter: company.twitter || ""
    });

    const [loading, setLoading] = useState(false);


    // =========================
    // HANDLE CHANGE
    // =========================

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));

    };


    // =========================
    // HANDLE SUBMIT
    // =========================

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            const response = await api.put(
                "/company/profile/social",
                formData
            );


            if (response.data.success) {

                setCompany((prev) => ({
                    ...prev,
                    ...formData
                }));

                closeModal();

            }

        } catch (error) {

            console.error(
                "Social media update error:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Failed to update social links"
            );

        } finally {

            setLoading(false);

        }

    };


    return (

        <div
            className="edit-modal-overlay"
            onClick={closeModal}
        >

            <div
                className="edit-modal"
                onClick={(e) => e.stopPropagation()}
            >

                {/* =========================
                    HEADER
                ========================= */}

                <div className="edit-modal-header">

                    <div>

                        <h3 className="mb-1">

                            <i className="fas fa-share-nodes me-2 text-primary"></i>

                            Social Media Links

                        </h3>

                        <p className="mb-0 text-muted">
                            Add or update your company social profiles
                        </p>

                    </div>


                    <button
                        type="button"
                        className="modal-close-btn"
                        onClick={closeModal}
                    >

                        <i className="fas fa-times"></i>

                    </button>

                </div>


                {/* =========================
                    FORM
                ========================= */}

                <form onSubmit={handleSubmit}>

                    <div className="edit-modal-body">

                        {/* LinkedIn */}

                        <div className="mb-4">

                            <label className="form-label fw-semibold">

                                <i className="fab fa-linkedin text-primary me-2"></i>

                                LinkedIn

                            </label>

                            <input
                                type="url"
                                className="form-control"
                                name="linkedin"
                                value={formData.linkedin}
                                onChange={handleChange}
                                placeholder="https://linkedin.com/company/..."
                            />

                        </div>


                        {/* Facebook */}

                        <div className="mb-4">

                            <label className="form-label fw-semibold">

                                <i className="fab fa-facebook text-primary me-2"></i>

                                Facebook

                            </label>

                            <input
                                type="url"
                                className="form-control"
                                name="facebook"
                                value={formData.facebook}
                                onChange={handleChange}
                                placeholder="https://facebook.com/..."
                            />

                        </div>


                        {/* Instagram */}

                        <div className="mb-4">

                            <label className="form-label fw-semibold">

                                <i className="fab fa-instagram text-danger me-2"></i>

                                Instagram

                            </label>

                            <input
                                type="url"
                                className="form-control"
                                name="instagram"
                                value={formData.instagram}
                                onChange={handleChange}
                                placeholder="https://instagram.com/..."
                            />

                        </div>


                        {/* Twitter */}

                        <div>

                            <label className="form-label fw-semibold">

                                <i className="fab fa-twitter text-info me-2"></i>

                                Twitter (X)

                            </label>

                            <input
                                type="url"
                                className="form-control"
                                name="twitter"
                                value={formData.twitter}
                                onChange={handleChange}
                                placeholder="https://twitter.com/..."
                            />

                        </div>

                    </div>


                    {/* =========================
                        FOOTER
                    ========================= */}

                    <div className="edit-modal-footer">

                        <button
                            type="button"
                            className="btn btn-light rounded-pill px-4"
                            onClick={closeModal}
                            disabled={loading}
                        >
                            Cancel
                        </button>


                        <button
                            type="submit"
                            className="btn btn-primary rounded-pill px-4"
                            disabled={loading}
                        >

                            {loading ? (

                                <>
                                    <span
                                        className="spinner-border spinner-border-sm me-2"
                                        role="status"
                                    ></span>

                                    Saving...

                                </>

                            ) : (

                                <>
                                    <i className="fas fa-save me-2"></i>
                                    Save Changes
                                </>

                            )}

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );
};

export default CompanySocialModal;

