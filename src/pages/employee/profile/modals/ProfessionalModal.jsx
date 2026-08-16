import React from "react";

const ProfessionalModal = ({
  showProfessionalModal,
  setShowProfessionalModal,
  professional,
  setProfessional,
  handleSave,
}) => {

  if (!showProfessionalModal) {
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


            {/* Header */}

            <div className="modal-header bg-primary text-white">

              <h5 className="modal-title">
                Professional Details
              </h5>

              <button
                className="btn-close btn-close-white"
                onClick={() =>
                  setShowProfessionalModal(false)
                }
              />

            </div>


            {/* Body */}

            <div className="modal-body">

              <div className="row g-3">


                {/* Experience */}

                <div className="col-md-6">

                  <label className="form-label fw-semibold">
                    Experience
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. 2 Years"
                    value={
                      professional?.experience || ""
                    }
                    onChange={(e) =>
                      setProfessional({
                        ...professional,
                        experience:
                          e.target.value,
                      })
                    }
                  />

                </div>


                {/* Company */}

                <div className="col-md-6">

                  <label className="form-label fw-semibold">
                    Current Company
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter company name"
                    value={
                      professional?.company || ""
                    }
                    onChange={(e) =>
                      setProfessional({
                        ...professional,
                        company:
                          e.target.value,
                      })
                    }
                  />

                </div>


                {/* Current Salary */}

                <div className="col-md-6">

                  <label className="form-label fw-semibold">
                    Current Salary
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. ₹3 LPA"
                    value={
                      professional?.currentSalary ||
                      ""
                    }
                    onChange={(e) =>
                      setProfessional({
                        ...professional,
                        currentSalary:
                          e.target.value,
                      })
                    }
                  />

                </div>


                {/* Expected Salary */}

                <div className="col-md-6">

                  <label className="form-label fw-semibold">
                    Expected Salary
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. ₹5 LPA"
                    value={
                      professional?.expectedSalary ||
                      ""
                    }
                    onChange={(e) =>
                      setProfessional({
                        ...professional,
                        expectedSalary:
                          e.target.value,
                      })
                    }
                  />

                </div>


              </div>

            </div>


            {/* Footer */}

            <div className="modal-footer">

              <button
                className="btn btn-secondary"
                onClick={() =>
                  setShowProfessionalModal(false)
                }
              >
                Cancel
              </button>


              <button
                className="btn btn-primary"
                onClick={handleSave}
              >
                Save
              </button>

            </div>


          </div>

        </div>

      </div>


      <div className="modal-backdrop fade show"></div>
    </>
  );
};

export default ProfessionalModal;