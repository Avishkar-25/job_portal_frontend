  import React from "react";
  const CareerModal = ({
  showCareerModal,
  setShowCareerModal,
  career,
  setCareer,
  handleSave,
}) => {
  return (
    <>
     
  
  {/* ============= Career Preferences======= */}
      {showCareerModal && (
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
                    Edit Career Preferences
                  </h4>

                  <button
                    className="btn-close btn-close-white"
                    onClick={() => setShowCareerModal(false)}
                  ></button>
                </div>

                <div className="modal-body">

                  <div className="mb-3">
                    <label className="form-label fw-bold">
                      Preferred Job Type
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      value={career.jobType}
                      onChange={(e) =>
                        setCareer({
                          ...career,
                          jobType: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold">
                      Availability
                    </label>

                    <select
                      className="form-select"
                      value={career.availability}
                      onChange={(e) =>
                        setCareer({
                          ...career,
                          availability: e.target.value,
                        })
                      }
                    >
                      <option>Immediate Joiner</option>
                      <option>15 Days</option>
                      <option>30 Days</option>
                      <option>45 Days</option>
                      <option>60 Days</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold">
                      Preferred Locations
                    </label>

                    <textarea
                      rows="4"
                      className="form-control"
                      value={career.location}
                      onChange={(e) =>
                        setCareer({
                          ...career,
                          location: e.target.value,
                        })
                      }
                    ></textarea>
                  </div>

                </div>

                <div className="modal-footer">

                 <button
className="btn btn-secondary"
onClick={()=>setShowCareerModal(false)}
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
      )}
    </>
  );
};

export default CareerModal;
  
  
  
  
  
  
  
  
  
  