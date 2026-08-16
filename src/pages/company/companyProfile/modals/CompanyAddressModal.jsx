import React, { useState } from "react";
import api from "../../../../services/api";

const CompanyAddressModal = ({
    company,
    setCompany,
    closeModal
}) => {

    const [formData, setFormData] = useState({
        address: company.address || "",
        city: company.city || "",
        state: company.state || "",
        country: company.country || "",
        pincode: company.pincode || ""
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
                "/company/profile/address",
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
                "Failed to update address"
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
                            <i className="fas fa-map-marker-alt me-2"></i>
                            Company Address
                        </h3>

                        <p>
                            Update your company location
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

                            <label>Address</label>

                            <textarea
                                className="form-control"
                                rows="3"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                            />

                        </div>


                        <div className="row g-3">

                            <div className="col-md-6">

                                <label>City</label>

                                <input
                                    className="form-control"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                />

                            </div>


                            <div className="col-md-6">

                                <label>State</label>

                                <input
                                    className="form-control"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                />

                            </div>


                            <div className="col-md-6">

                                <label>Country</label>

                                <input
                                    className="form-control"
                                    name="country"
                                    value={formData.country}
                                    onChange={handleChange}
                                />

                            </div>


                            <div className="col-md-6">

                                <label>Pincode</label>

                                <input
                                    className="form-control"
                                    name="pincode"
                                    value={formData.pincode}
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

                            {loading ? "Saving..." : "Save Changes"}

                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
};

export default CompanyAddressModal;