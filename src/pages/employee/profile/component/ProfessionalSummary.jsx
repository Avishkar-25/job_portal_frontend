
import React, { useEffect, useState } from "react";
import {
  FaEdit,
  FaTrash,
  FaPlus,
} from "react-icons/fa";

import {
  getProfessionalSummary,
  updateProfessionalSummary,
} from "../../../../services/employeeProfileApi";

import SummaryModal from "../modals/SummaryModal";

const ProfessionalSummary = () => {

  // ============================
  // User
  // ============================
  const user = JSON.parse(localStorage.getItem("user"));
  const user_id = user?.user_id;

  // ============================
  // State
  // ============================
  const [summary, setSummary] = useState("");

  const [showSummaryModal, setShowSummaryModal] =
    useState(false);

  const [loading, setLoading] = useState(false);

  // ============================
  // Load Summary
  // ============================
  useEffect(() => {
    if (user_id) {
      loadSummary();
    }
  }, [user_id]);

  const loadSummary = async () => {
    try {

      const res = await getProfessionalSummary(user_id);

      if (res.data.success) {
        setSummary(
          res.data.summary || ""
        );
      }

    } catch (err) {

      console.log(
        "Get Summary Error:",
        err
      );

    }
  };

  // ============================
  // Open Add
  // ============================
  const handleAdd = () => {

    setSummary("");

    setShowSummaryModal(true);
  };

  // ============================
  // Open Edit
  // ============================
  const handleEdit = () => {

    setShowSummaryModal(true);
  };

  // ============================
  // Save Summary
  // ============================
  const handleSave = async () => {

    if (!summary.trim()) {
      alert("Please enter professional summary");
      return;
    }

    try {

      setLoading(true);

      const data = {
        professional_summary:
          summary.trim(),
      };

      const res =
        await updateProfessionalSummary(
          user_id,
          data
        );

      if (res.data.success) {

        alert(
          "Professional Summary saved successfully"
        );

        setShowSummaryModal(false);

        loadSummary();
      }

    } catch (err) {

      console.log(
        "Save Summary Error:",
        err
      );

      alert(
        "Failed to save Professional Summary"
      );

    } finally {

      setLoading(false);

    }
  };

  // ============================
  // Delete Summary
  // ============================
  const handleDelete = async () => {

    const confirmDelete =
      window.confirm(
        "Delete Professional Summary?"
      );

    if (!confirmDelete) return;

    try {

      setLoading(true);

      const data = {
        professional_summary: null,
      };

      const res =
        await updateProfessionalSummary(
          user_id,
          data
        );

      if (res.data.success) {

        setSummary("");

        alert(
          "Professional Summary deleted"
        );

        loadSummary();
      }

    } catch (err) {

      console.log(
        "Delete Summary Error:",
        err
      );

      alert(
        "Failed to delete Professional Summary"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <>
      {/* ==============================
          Professional Summary
      ============================== */}

      <div className="card border-0 shadow rounded-4 mt-4 mb-5">

        <div className="card-body p-4">

          {/* Header */}

          <div className="d-flex justify-content-between align-items-center">

            <h4 className="fw-bold mb-0">
              Professional Summary
            </h4>

            <div className="d-flex gap-2">

              {!summary ? (

                <button
                  className="btn btn-success btn-sm"
                  onClick={handleAdd}
                >
                  <FaPlus className="me-2" />
                  Add
                </button>

              ) : (

                <>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={handleEdit}
                    disabled={loading}
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

          {/* ==============================
              Summary Display
          ============================== */}

          {summary ? (

            <div
              className="bg-light border rounded-4 p-4"
            >

              <p
                className="text-secondary mb-0"
                style={{
                  lineHeight: "1.8",
                  textAlign: "justify",
                }}
              >
                {summary}
              </p>

            </div>

          ) : (

            <div
              className="text-center py-5 text-muted"
            >
              <p className="mb-2">
                No Professional Summary Added
              </p>

              <small>
                Click Add to create your professional summary.
              </small>
            </div>

          )}

        </div>

      </div>

      {/* ==============================
          Modal
      ============================== */}

      <SummaryModal
        showSummaryModal={showSummaryModal}
        setShowSummaryModal={
          setShowSummaryModal
        }
        summary={summary}
        setSummary={setSummary}
        handleSave={handleSave}
        loading={loading}
      />

    </>
  );
};

export default ProfessionalSummary;

