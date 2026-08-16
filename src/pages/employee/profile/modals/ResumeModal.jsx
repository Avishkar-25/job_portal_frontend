import React, { useState } from "react";
import {
  FaFilePdf,
  FaUpload
} from "react-icons/fa";

const ResumeModal = ({
  showResumeModal,
  setShowResumeModal,
  resume,
  handleUpload,
  loading
}) => {

  const [selectedFile, setSelectedFile] =
    useState(null);

  const [error, setError] =
    useState("");


  if (!showResumeModal) {
    return null;
  }


  // =====================================
  // File Select
  // =====================================

  const handleFileChange = (e) => {

    const file = e.target.files[0];

    setError("");
    setSelectedFile(null);

    if (!file) return;


    if (file.type !== "application/pdf") {

      setError(
        "Only PDF files are allowed."
      );

      return;

    }


    if (file.size > 5 * 1024 * 1024) {

      setError(
        "Maximum file size is 5MB."
      );

      return;

    }


    setSelectedFile(file);

  };


  // =====================================
  // Save
  // =====================================

  const handleSave = async () => {

    if (!selectedFile) {

      setError(
        "Please select a PDF resume."
      );

      return;

    }

    await handleUpload(selectedFile);

  };


  return (
    <>

      {/* Modal */}

      <div
        className="modal fade show"
        style={{
          display: "block",
          background: "rgba(0,0,0,.6)"
        }}
      >

        <div className="modal-dialog modal-dialog-centered">

          <div className="modal-content border-0 shadow-lg rounded-4">

            {/* Header */}

            <div className="modal-header bg-primary text-white rounded-top-4">

              <h5 className="modal-title fw-bold">

                {resume
                  ? "Update Resume"
                  : "Upload Resume"}

              </h5>

              <button
                className="btn-close btn-close-white"
                onClick={() =>
                  setShowResumeModal(false)
                }
              />

            </div>


            {/* Body */}

            <div className="modal-body p-4">

              <div className="text-center mb-4">

                <div
                  className="mx-auto bg-danger text-white rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    width: "75px",
                    height: "75px",
                    fontSize: "32px"
                  }}
                >
                  <FaFilePdf />
                </div>

                <h6 className="fw-bold mt-3">
                  Upload Your Resume
                </h6>

                <small className="text-muted">
                  PDF only • Maximum 5MB
                </small>

              </div>


              {/* File */}

              <label className="form-label fw-semibold">

                Select Resume

              </label>

              <input
                type="file"
                className="form-control"
                accept=".pdf,application/pdf"
                onChange={handleFileChange}
              />


              {/* Error */}

              {error && (

                <div className="alert alert-danger mt-3 py-2">

                  {error}

                </div>

              )}


              {/* Selected File */}

              {selectedFile && (

                <div className="alert alert-success mt-3">

                  <FaFilePdf className="me-2" />

                  {selectedFile.name}

                </div>

              )}


              {/* Existing */}

              {resume && !selectedFile && (

                <div className="alert alert-info mt-3">

                  Current Resume:

                  <strong className="ms-2">

                    {resume.original_name}

                  </strong>

                </div>

              )}

            </div>


            {/* Footer */}

            <div className="modal-footer">

              <button
                className="btn btn-secondary"
                onClick={() =>
                  setShowResumeModal(false)
                }
                disabled={loading}
              >
                Cancel
              </button>


              <button
                className="btn btn-primary"
                onClick={handleSave}
                disabled={loading}
              >

                <FaUpload className="me-2" />

                {loading
                  ? "Uploading..."
                  : resume
                  ? "Update Resume"
                  : "Upload Resume"}

              </button>

            </div>

          </div>

        </div>

      </div>


      {/* Backdrop */}

      <div className="modal-backdrop fade show"></div>

    </>
  );
};

export default ResumeModal;