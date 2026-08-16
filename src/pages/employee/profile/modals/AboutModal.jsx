import React from "react";

const AboutModal = ({
  showAboutModal,
  setShowAboutModal,
  about,
  setAbout,
  handleSave,
}) => {

  if (!showAboutModal) return null;

  return (
    <>

      <div
        className="modal fade show"
        style={{
          display: "block",
          background: "rgba(0,0,0,.5)",
        }}
      >

        <div className="modal-dialog modal-lg modal-dialog-centered">

          <div className="modal-content rounded-4">

            <div className="modal-header bg-primary text-white">

              <h4 className="modal-title">
                Edit About Me
              </h4>

              <button
                className="btn-close btn-close-white"
                onClick={() => setShowAboutModal(false)}
              ></button>

            </div>

            <div className="modal-body">

              <label className="form-label fw-bold">
                About Yourself
              </label>

              <textarea
                rows="8"
                className="form-control"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              ></textarea>

            </div>

            <div className="modal-footer">

              <button
                className="btn btn-secondary"
                onClick={() => setShowAboutModal(false)}
              >
                Cancel
              </button>

              <button
                className="btn btn-primary"
                onClick={handleSave}
              >
                Save Changes
              </button>

            </div>

          </div>

        </div>

      </div>

      <div className="modal-backdrop fade show"></div>

    </>
  );
};

export default AboutModal;