import React, { useState } from "react";
import api from "../../../../services/api";

const CompanyInformationModal = ({
    company,
    setCompany,
    closeModal
}) => {

    const [formData, setFormData] = useState({
        company_name: company.company_name || "",
        email: company.email || "",
        phone: company.phone || "",
        industry: company.industry || "",
        website: company.website || "",
        description: company.description || "",
        founded_year: company.founded_year || "",
        company_size: company.company_size || "",
        headquarters: company.headquarters || ""
    });

    const [loading, setLoading] = useState(false);


    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            const response = await api.put(
                "/company/profile/information",
                formData
            );


            if (response.data.success) {

                setCompany({
                    ...company,
                    ...formData
                });

                closeModal();
            }

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Failed to update company information"
            );

        } finally {

            setLoading(false);
        }
    };


    return (

        <div className="edit-modal-overlay">

            <div className="edit-modal">

                <div className="edit-modal-header">

                    <div>

                        <h3>
                            <i className="fas fa-building me-2"></i>
                            Company Information
                        </h3>

                        <p>
                            Update your company information
                        </p>

                    </div>

                    <button
                        className="modal-close-btn"
                        onClick={closeModal}
                    >
                        <i className="fas fa-times"></i>
                    </button>

                </div>


                <form onSubmit={handleSubmit}>

                    <div className="edit-modal-body">

                        <div className="row g-3">

                            <div className="col-md-6">
                                <label>Company Name</label>

                                <input
                                    className="form-control"
                                    name="company_name"
                                    value={formData.company_name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>


                            <div className="col-md-6">
                                <label>Industry</label>

                                <input
                                    className="form-control"
                                    name="industry"
                                    value={formData.industry}
                                    onChange={handleChange}
                                />
                            </div>


                            <div className="col-md-6">
                                <label>Email</label>

                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>


                            <div className="col-md-6">
                                <label>Phone</label>

                                <input
                                    className="form-control"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            </div>


                            <div className="col-md-6">
                                <label>Website</label>

                                <input
                                    className="form-control"
                                    name="website"
                                    value={formData.website}
                                    onChange={handleChange}
                                />
                            </div>


                            <div className="col-md-6">
                                <label>Founded Year</label>

                                <input
                                    type="number"
                                    className="form-control"
                                    name="founded_year"
                                    value={formData.founded_year}
                                    onChange={handleChange}
                                />
                            </div>


                            <div className="col-md-6">
                                <label>Company Size</label>

                                <input
                                    className="form-control"
                                    name="company_size"
                                    value={formData.company_size}
                                    onChange={handleChange}
                                />
                            </div>


                            <div className="col-md-6">
                                <label>Headquarters</label>

                                <input
                                    className="form-control"
                                    name="headquarters"
                                    value={formData.headquarters}
                                    onChange={handleChange}
                                />
                            </div>


                            <div className="col-12">
                                <label>Description</label>

                                <textarea
                                    className="form-control"
                                    rows="5"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                />
                            </div>

                        </div>

                    </div>


                    <div className="edit-modal-footer">

                        <button
                            type="button"
                            className="btn btn-light rounded-pill px-4"
                            onClick={closeModal}
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
                                    <span className="spinner-border spinner-border-sm me-2"></span>
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

export default CompanyInformationModal;