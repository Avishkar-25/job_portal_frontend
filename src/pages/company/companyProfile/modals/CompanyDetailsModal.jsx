import React, { useState } from "react";
import api from "../../../../services/api";

const CompanyDetailsModal = ({
    company,
    setCompany,
    closeModal
}) => {

    const [formData, setFormData] = useState({
        gst_number: company.gst_number || "",
        cin_number: company.cin_number || "",
        pan_number: company.pan_number || ""
    });

    const [loading, setLoading] = useState(false);


    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value.toUpperCase()
        });

    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            const response = await api.put(
                "/company/profile/legal",
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
                "Failed to update legal details"
            );

        } finally {

            setLoading(false);
        }
    };


    return (

        <div className="edit-modal-overlay">

            <div className="edit-modal small-modal">

                <div className="edit-modal-header">

                    <div>

                        <h3>
                            <i className="fas fa-file-shield me-2"></i>
                            Legal Details
                        </h3>

                        <p>
                            Update your company legal information
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

                        <div className="mb-3">

                            <label>GST Number</label>

                            <input
                                className="form-control"
                                name="gst_number"
                                value={formData.gst_number}
                                onChange={handleChange}
                                placeholder="Enter GST number"
                            />

                        </div>


                        <div className="mb-3">

                            <label>CIN Number</label>

                            <input
                                className="form-control"
                                name="cin_number"
                                value={formData.cin_number}
                                onChange={handleChange}
                                placeholder="Enter CIN number"
                            />

                        </div>


                        <div>

                            <label>PAN Number</label>

                            <input
                                className="form-control"
                                name="pan_number"
                                value={formData.pan_number}
                                onChange={handleChange}
                                placeholder="Enter PAN number"
                            />

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
                            {loading ? "Saving..." : "Save Changes"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
};

export default CompanyDetailsModal;