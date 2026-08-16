import React from "react";

const SkillModal = ({
  showSkillModal,
  setShowSkillModal,
  isSkillEdit,
  skill,
  setSkill,
  skillLevel,
  setSkillLevel,
  saveSkill,
}) => {

  if (!showSkillModal) {
    return null;
  }


  return (
    <>
      <div
        className="modal fade show"
        style={{
          display: "block",
          background: "rgba(0,0,0,.5)",
        }}
      >

        <div className="modal-dialog modal-dialog-centered">

          <div className="modal-content rounded-4">


            {/* HEADER */}

            <div className="modal-header bg-primary text-white">

              <h5 className="modal-title">

                {isSkillEdit
                  ? "Edit Skill"
                  : "Add Skill"}

              </h5>

              <button
                className="btn-close btn-close-white"
                onClick={() =>
                  setShowSkillModal(false)
                }
              />

            </div>


            {/* BODY */}

            <div className="modal-body">

              <div className="mb-3">

                <label className="form-label fw-semibold">
                  Skill Name
                </label>

                <input
                  type="text"
                  className="form-control"
                  value={skill}
                  onChange={(e) =>
                    setSkill(e.target.value)
                  }
                  placeholder="Enter Skill"
                />

              </div>


              <div className="mb-3">

                <label className="form-label fw-semibold">
                  Skill Level
                </label>

                <select
                  className="form-select"
                  value={skillLevel}
                  onChange={(e) =>
                    setSkillLevel(
                      e.target.value
                    )
                  }
                >

                  <option value="Beginner">
                    Beginner
                  </option>

                  <option value="Intermediate">
                    Intermediate
                  </option>

                  <option value="Advanced">
                    Advanced
                  </option>

                  <option value="Expert">
                    Expert
                  </option>

                </select>

              </div>

            </div>


            {/* FOOTER */}

            <div className="modal-footer">

              <button
                className="btn btn-secondary"
                onClick={() =>
                  setShowSkillModal(false)
                }
              >
                Cancel
              </button>

              <button
                className="btn btn-primary"
                onClick={saveSkill}
              >

                {isSkillEdit
                  ? "Update Skill"
                  : "Add Skill"}

              </button>

            </div>

          </div>

        </div>

      </div>

      <div className="modal-backdrop fade show"></div>
    </>
  );
};

export default SkillModal;