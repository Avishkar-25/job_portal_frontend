
import React from "react";

const SocialModal = ({
  showSocialModal,
  setShowSocialModal,

  editType,
  setEditType,

  socialType,
  setSocialType,

  socialLink,
  setSocialLink,

  saveSocial,
  loading
}) => {

  if (!showSocialModal) {
    return null;
  }


  const closeModal = () => {

    setShowSocialModal(false);

    setEditType(null);

    setSocialType("");

    setSocialLink("");

  };


  return (
    <>
      <div
        className="modal fade show"
        style={{
          display: "block",
          background: "rgba(0,0,0,.5)"
        }}
      >

        <div className="modal-dialog modal-dialog-centered">

          <div className="modal-content rounded-4">


            {/* Header */}

            <div className="modal-header bg-primary text-white">

              <h5 className="modal-title">

                {editType
                  ? "Edit Social Profile"
                  : "Add Social Profile"}

              </h5>


              <button
                className="btn-close btn-close-white"
                onClick={closeModal}
              />

            </div>


            {/* Body */}

            <div className="modal-body">

              <div className="mb-3">

                <label className="form-label fw-semibold">
                  Profile Type
                </label>


                <select
                  className="form-select"
                  value={socialType}
                  onChange={(e) =>
                    setSocialType(
                      e.target.value
                    )
                  }
                  disabled={!!editType}
                >

                  <option value="">
                    Select Profile
                  </option>

                  <option value="LinkedIn">
                    LinkedIn
                  </option>

                  <option value="GitHub">
                    GitHub
                  </option>

                  <option value="Portfolio">
                    Portfolio
                  </option>

                </select>

              </div>


              <div>

                <label className="form-label fw-semibold">
                  Profile Link
                </label>


                <input
                  type="text"
                  className="form-control"
                  placeholder="https://linkedin.com/in/username"
                  value={socialLink}
                  onChange={(e) =>
                    setSocialLink(
                      e.target.value
                    )
                  }
                />

              </div>

            </div>


            {/* Footer */}

            <div className="modal-footer">

              <button
                className="btn btn-secondary"
                onClick={closeModal}
                disabled={loading}
              >
                Cancel
              </button>


              <button
                className="btn btn-primary"
                onClick={saveSocial}
                disabled={loading}
              >

                {loading
                  ? "Saving..."
                  : editType
                    ? "Update"
                    : "Add"}

              </button>

            </div>

          </div>

        </div>

      </div>


      <div className="modal-backdrop fade show"></div>
    </>
  );
};

export default SocialModal;

