import React, { useEffect, useState } from "react";
import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaFilePdf,
  FaEye,
  FaDownload
} from "react-icons/fa";

import {
  getResume,
  uploadResume,
  deleteResume
} from "../../../../services/employeeProfileApi";

import ResumeModal from "../modals/ResumeModal";

const Resume = () => {

  // =====================================
  // User
  // =====================================

  const user = JSON.parse(localStorage.getItem("user"));
  const user_id = user?.user_id;

  // =====================================
  // State
  // =====================================

  const [resume, setResume] = useState(null);

  const [showResumeModal, setShowResumeModal] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  // =====================================
  // Load Resume
  // =====================================

  useEffect(() => {

    if (user_id) {
      loadResume();
    }

  }, [user_id]);


  const loadResume = async () => {

    try {

      const res = await getResume(user_id);

      if (res.data.success && res.data.resume) {

        setResume(res.data.resume);

      } else {

        setResume(null);

      }

    } catch (err) {

      console.log("Get Resume Error:", err);

      setResume(null);

    }

  };


  // =====================================
  // Upload Resume
  // =====================================

  const handleUpload = async (file) => {

    if (!file) {
      alert("Please select PDF");
      return;
    }

    if (file.type !== "application/pdf") {
      alert("Only PDF files are allowed");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Maximum file size is 5MB");
      return;
    }

    try {

      setLoading(true);

      const formData = new FormData();

      formData.append("resume", file);

      const res =
        await uploadResume(user_id, formData);

      if (res.data.success) {

        alert("Resume uploaded successfully");

        setShowResumeModal(false);

        loadResume();

      }

    } catch (err) {

      console.log("Upload Resume Error:", err);

      alert(
        err.response?.data?.message ||
        "Failed to upload resume"
      );

    } finally {

      setLoading(false);

    }

  };


  // =====================================
  // Delete Resume
  // =====================================

  const handleDelete = async () => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete resume?"
      );

    if (!confirmDelete) return;

    try {

      setLoading(true);

      const res =
        await deleteResume(user_id);

      if (res.data.success) {

        alert("Resume deleted successfully");

        setResume(null);

      }

    } catch (err) {

      console.log("Delete Resume Error:", err);

      alert(
        err.response?.data?.message ||
        "Failed to delete resume"
      );

    } finally {

      setLoading(false);

    }

  };


  // =====================================
  // View Resume
  // =====================================

  const handleView = () => {

    if (!resume?.url) return;

    window.open(
      resume.url,
      "_blank"
    );

  };


  // =====================================
  // Download Resume
  // =====================================

  const handleDownload = () => {

    if (!resume?.url) return;

    const link =
      document.createElement("a");

    link.href = resume.url;

    link.download =
      resume.original_name ||
      "Resume.pdf";

    link.target = "_blank";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

  };


  return (
    <div>

      {/* =================================
          Resume Card
      ================================= */}

      <div className="card border-0 shadow rounded-4 mt-4">

        <div className="card-body p-4">

          {/* Header */}

          <div className="d-flex justify-content-between align-items-center">

            <h4 className="fw-bold mb-0">
              Resume
            </h4>

            <div className="d-flex gap-2">

              {!resume ? (

                <button
                  className="btn btn-success btn-sm"
                  onClick={() =>
                    setShowResumeModal(true)
                  }
                >
                  <FaPlus className="me-2" />
                  Add
                </button>

              ) : (

                <>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() =>
                      setShowResumeModal(true)
                    }
                  >
                    <FaEdit className="me-2" />
                    Edit
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={handleDelete}
                    disabled={loading}
                  >
                    <FaTrash className="me-2" />
                    Delete
                  </button>
                </>

              )}

            </div>

          </div>

          <hr />

          {/* =================================
              Resume Display
          ================================= */}

          {resume ? (

            <div className="border rounded-4 p-3">

              <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">

                {/* Left */}

                <div className="d-flex align-items-center">

                  <div
                    className="bg-danger text-white rounded-3 d-flex align-items-center justify-content-center"
                    style={{
                      width: "60px",
                      height: "60px",
                      fontSize: "26px"
                    }}
                  >
                    <FaFilePdf />
                  </div>

                  <div className="ms-3">

                    <h6 className="fw-bold mb-1">
                      {resume.original_name}
                    </h6>

                    <small className="text-muted">
                      Uploaded on{" "}
                      {resume.uploaded_at
                        ? new Date(
                            resume.uploaded_at
                          ).toLocaleDateString()
                        : "-"}
                    </small>

                  </div>

                </div>


                {/* Buttons */}

                <div className="d-flex gap-2">

                  <button
                    className="btn btn-success btn-sm px-3"
                    onClick={handleView}
                  >
                    <FaEye className="me-2" />
                    View
                  </button>

                  <button
                    className="btn btn-outline-primary btn-sm px-3"
                    onClick={handleDownload}
                  >
                    <FaDownload className="me-2" />
                    Download
                  </button>

                </div>

              </div>

            </div>

          ) : (

            <div className="text-center py-5 text-muted">

              <FaFilePdf
                size={45}
                className="mb-3"
              />

              <h6>
                No Resume Uploaded
              </h6>

              <p className="small mb-0">
                Upload your latest resume in PDF format
              </p>

            </div>

          )}

        </div>

      </div>


      {/* =================================
          Modal
      ================================= */}

      <ResumeModal
        showResumeModal={showResumeModal}
        setShowResumeModal={setShowResumeModal}
        resume={resume}
        handleUpload={handleUpload}
        loading={loading}
      />

    </div>
  );
};

export default Resume;