import React, { useState } from "react";

const CompanyHeaderm = ({
    company,
    uploadLogo,
    uploadCover,
    closeModal
}) => {

    const [logoFile, setLogoFile] = useState(null);
    const [coverFile, setCoverFile] = useState(null);
    const [loading, setLoading] = useState(false);


    // ===============================
    // LOGO CHANGE
    // ===============================

    const handleLogoChange = (e) => {

        const file = e.target.files?.[0];

        if (!file) return;

        setLogoFile(file);
    };


    // ===============================
    // COVER CHANGE
    // ===============================

    const handleCoverChange = (e) => {

        const file = e.target.files?.[0];

        if (!file) return;

        setCoverFile(file);
    };


    // ===============================
    // SUBMIT
    // ===============================

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!logoFile && !coverFile) {

            alert("Please select logo or cover image.");

            return;
        }

        try {

            setLoading(true);


            // ===============================
            // UPLOAD LOGO
            // ===============================

            if (logoFile && uploadLogo) {

                await uploadLogo(logoFile);

            }


            // ===============================
            // UPLOAD COVER
            // ===============================

            if (coverFile && uploadCover) {

                await uploadCover(coverFile);

            }


            closeModal();

        } catch (error) {

            console.error(
                "Company image update error:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Failed to update company images"
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

                {/* ===============================
                    HEADER
                =============================== */}

                <div className="edit-modal-header">

                    <div>

                        <h3 className="mb-1">

                            <i className="fas fa-image me-2 text-primary"></i>

                            Edit Company Images

                        </h3>

                        <p className="mb-0 text-muted">

                            Update your company logo and cover image

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


                {/* ===============================
                    FORM
                =============================== */}

                <form onSubmit={handleSubmit}>

                    <div className="edit-modal-body">


                        {/* ===============================
                            COMPANY LOGO
                        =============================== */}

                        <div className="mb-4">

                            <label className="form-label fw-semibold">

                                Company Logo

                            </label>


                            <div className="d-flex align-items-center gap-3">

                                <img
                                    src={
                                        logoFile
                                            ? URL.createObjectURL(logoFile)
                                            : company.logo
                                                ? company.logo
                                                : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                                    }
                                    alt="Company Logo"
                                    style={{
                                        width: "90px",
                                        height: "90px",
                                        objectFit: "cover",
                                        borderRadius: "50%",
                                        border: "3px solid #eee"
                                    }}
                                />


                                <div className="flex-grow-1">

                                    <input
                                        type="file"
                                        className="form-control"
                                        accept="image/jpeg,image/jpg,image/png,image/webp"
                                        onChange={handleLogoChange}
                                    />

                                    <small className="text-muted">

                                        JPG, JPEG, PNG, WEBP · Max 5MB

                                    </small>

                                </div>

                            </div>

                        </div>


                        {/* ===============================
                            COMPANY COVER
                        =============================== */}

                        <div className="mb-3">

                            <label className="form-label fw-semibold">

                                Company Cover Image

                            </label>


                            <div
                                className="mb-3"
                                style={{
                                    height: "150px",
                                    borderRadius: "12px",
                                    overflow: "hidden",
                                    background:
                                        "linear-gradient(135deg,#4f46e5,#2563eb,#06b6d4)"
                                }}
                            >

                                {coverFile ? (

                                    <img
                                        src={URL.createObjectURL(coverFile)}
                                        alt="Selected Cover"
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover"
                                        }}
                                    />

                                ) : company.cover_image ? (

                                    <img
                                        src={company.cover_image}
                                        alt="Company Cover"
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover"
                                        }}
                                    />

                                ) : (

                                    <div
                                        className="h-100 d-flex align-items-center justify-content-center text-white"
                                    >

                                        No cover image

                                    </div>

                                )}

                            </div>


                            <input
                                type="file"
                                className="form-control"
                                accept="image/jpeg,image/jpg,image/png,image/webp"
                                onChange={handleCoverChange}
                            />

                            <small className="text-muted">

                                JPG, JPEG, PNG, WEBP · Max 5MB

                            </small>

                        </div>

                    </div>


                    {/* ===============================
                        FOOTER
                    =============================== */}

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
                            disabled={
                                loading ||
                                (!logoFile && !coverFile)
                            }
                        >

                            {loading ? (

                                <>
                                    <span
                                        className="spinner-border spinner-border-sm me-2"
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

export default CompanyHeaderm;