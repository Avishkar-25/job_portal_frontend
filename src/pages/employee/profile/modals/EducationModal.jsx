import React from "react";

const EducationModal = ({
  showEducationModal,
  setShowEducationModal,
  education,
  setEducation,
  isEdit,
  handleSave,
}) => {

  if (!showEducationModal) {
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

        <div className="modal-dialog modal-lg modal-dialog-centered">

          <div className="modal-content rounded-4">


            {/* =================================
                HEADER
            ================================= */}

            <div className="modal-header bg-primary text-white">

              <h4 className="mb-0">

                {isEdit
                  ? "Edit Education"
                  : "Add Education"}

              </h4>


              <button
                className="btn-close btn-close-white"
                onClick={() =>
                  setShowEducationModal(false)
                }
              ></button>

            </div>


            {/* =================================
                BODY
            ================================= */}

            <div className="modal-body">


              {/* Qualification */}

              <div className="mb-3">

                <label className="form-label">
                  Qualification
                </label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Bachelor of Computer Science"
                  value={
                    education.qualification
                  }
                  onChange={(e) =>
                    setEducation({
                      ...education,
                      qualification:
                        e.target.value,
                    })
                  }
                />

              </div>


              {/* College */}

              <div className="mb-3">

                <label className="form-label">
                  College Name
                </label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter college name"
                  value={
                    education.college_name
                  }
                  onChange={(e) =>
                    setEducation({
                      ...education,
                      college_name:
                        e.target.value,
                    })
                  }
                />

              </div>


              {/* Passing Year + CGPA */}

              <div className="row">


                <div className="col-md-6 mb-3">

                  <label className="form-label">
                    Passing Year
                  </label>

                  <input
                    type="number"
                    className="form-control"
                    placeholder="2026"
                    value={
                      education.passing_year
                    }
                    onChange={(e) =>
                      setEducation({
                        ...education,
                        passing_year:
                          e.target.value,
                      })
                    }
                  />

                </div>


                <div className="col-md-6 mb-3">

                  <label className="form-label">
                    CGPA
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="7.15"
                    value={
                      education.cgpa
                    }
                    onChange={(e) =>
                      setEducation({
                        ...education,
                        cgpa:
                          e.target.value,
                      })
                    }
                  />

                </div>

              </div>

            </div>


            {/* =================================
                FOOTER
            ================================= */}

            <div className="modal-footer">

              <button
                className="btn btn-secondary"
                onClick={() =>
                  setShowEducationModal(false)
                }
              >
                Cancel
              </button>


              <button
                className="btn btn-primary"
                onClick={handleSave}
              >

                {isEdit
                  ? "Update"
                  : "Save"}

              </button>

            </div>


          </div>

        </div>

      </div>


      {/* ONLY BACKDROP - NO NESTED MODAL */}

      <div className="modal-backdrop fade show"></div>

    </>
  );
};

export default EducationModal;