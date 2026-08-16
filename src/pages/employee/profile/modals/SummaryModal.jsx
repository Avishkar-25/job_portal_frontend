
import React from "react";
import { FaSave, FaTimes } from "react-icons/fa";

const SummaryModal = ({
  showSummaryModal,
  setShowSummaryModal,
  summary,
  setSummary,
  handleSave,
  loading,
}) => {

  if (!showSummaryModal) {
    return null;
  }

  return (
    <>
      {/* ==============================
          Modal
      ============================== */}

      <div
        className="modal fade show"
        style={{
          display: "block",
          background: "rgba(0,0,0,.55)",
        }}
      >

        <div className="modal-dialog modal-lg modal-dialog-centered">

          <div className="modal-content rounded-4 border-0 shadow-lg">

            {/* ================= Header ================= */}

            <div className="modal-header bg-primary text-white">

              <div>
                <h5 className="modal-title fw-bold mb-1">
                  {summary
                    ? "Edit Professional Summary"
                    : "Add Professional Summary"}
                </h5>

                <small className="opacity-75">
                  Write a short description about your
                  professional experience and skills.
                </small>
              </div>

              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={() =>
                  setShowSummaryModal(false)
                }
                disabled={loading}
              />

            </div>

            {/* ================= Body ================= */}

            <div className="modal-body p-4">

              <label className="form-label fw-semibold">
                Professional Summary
              </label>

              <textarea
                className="form-control rounded-3"
                rows="8"
                value={summary}
                onChange={(e) =>
                  setSummary(e.target.value)
                }
                placeholder="Example: Experienced Full Stack Web Developer with strong knowledge of React.js, Node.js, Express.js and MySQL..."
                disabled={loading}
              />

              <div className="d-flex justify-content-between mt-2">

                <small className="text-muted">
                  Write 2-5 sentences about yourself.
                </small>

                <small className="text-muted">
                  {summary.length} characters
                </small>

              </div>

            </div>

            {/* ================= Footer ================= */}

            <div className="modal-footer">

              <button
                type="button"
                className="btn btn-secondary"
                onClick={() =>
                  setShowSummaryModal(false)
                }
                disabled={loading}
              >
                <FaTimes className="me-2" />
                Cancel
              </button>

              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSave}
                disabled={loading}
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
                    <FaSave className="me-2" />
                    Save Summary
                  </>
                )}

              </button>

            </div>

          </div>

        </div>

      </div>

      {/* ==============================
          Backdrop
      ============================== */}

      <div className="modal-backdrop fade show"></div>
    </>
  );
};

export default SummaryModal;

