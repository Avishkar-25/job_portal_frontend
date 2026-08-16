
import React from "react";

const AddressModal = ({
  showAddressModal,
  setShowAddressModal,
  address,
  setAddress,
  handleSaveAddress,
}) => {
  if (!showAddressModal) {
    return null;
  }

  return (
    <>
      {/* ================= Address Modal ================= */}

      <div
        className="modal fade show"
        style={{
          display: "block",
          background: "rgba(0,0,0,.5)",
          zIndex: 1055,
        }}
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content rounded-4 border-0 shadow">

            {/* ================= Header ================= */}

            <div className="modal-header bg-primary text-white px-4 py-3">

              <div>
                <h5 className="modal-title fw-bold mb-1">
                  {address?.address ||
                  address?.state ||
                  address?.pincode ||
                  address?.country
                    ? "Edit Address"
                    : "Add Address"}
                </h5>

                <small className="opacity-75">
                  Enter your complete address details
                </small>
              </div>

              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={() =>
                  setShowAddressModal(false)
                }
              />
            </div>

            {/* ================= Body ================= */}

            <div className="modal-body p-4">

              <div className="row g-4">

                {/* ================= Address ================= */}

                <div className="col-12">

                  <label className="form-label fw-semibold">
                    Address
                  </label>

                  <textarea
                    className="form-control rounded-3"
                    rows="4"
                    placeholder="Enter your complete address"
                    value={address?.address || ""}
                    onChange={(e) =>
                      setAddress({
                        ...address,
                        address: e.target.value,
                      })
                    }
                  />

                </div>

                {/* ================= State ================= */}

                <div className="col-md-6">

                  <label className="form-label fw-semibold">
                    State
                  </label>

                  <input
                    type="text"
                    className="form-control rounded-3"
                    placeholder="Enter state"
                    value={address?.state || ""}
                    onChange={(e) =>
                      setAddress({
                        ...address,
                        state: e.target.value,
                      })
                    }
                  />

                </div>

                {/* ================= Pincode ================= */}

                <div className="col-md-6">

                  <label className="form-label fw-semibold">
                    Pincode
                  </label>

                  <input
                    type="text"
                    className="form-control rounded-3"
                    placeholder="Enter 6 digit pincode"
                    maxLength="6"
                    value={address?.pincode || ""}
                    onChange={(e) =>
                      setAddress({
                        ...address,
                        pincode: e.target.value.replace(
                          /\D/g,
                          ""
                        ),
                      })
                    }
                  />

                </div>

                {/* ================= Country ================= */}

                <div className="col-12">

                  <label className="form-label fw-semibold">
                    Country
                  </label>

                  <input
                    type="text"
                    className="form-control rounded-3"
                    placeholder="Enter country"
                    value={address?.country || ""}
                    onChange={(e) =>
                      setAddress({
                        ...address,
                        country: e.target.value,
                      })
                    }
                  />

                </div>

              </div>

            </div>

            {/* ================= Footer ================= */}

            <div className="modal-footer px-4 py-3">

              <button
                type="button"
                className="btn btn-secondary rounded-pill px-4"
                onClick={() =>
                  setShowAddressModal(false)
                }
              >
                Cancel
              </button>

              <button
                type="button"
                className="btn btn-primary rounded-pill px-4"
                onClick={handleSaveAddress}
              >
                Save Address
              </button>

            </div>

          </div>
        </div>
      </div>

      {/* ================= Backdrop ================= */}

      <div
        className="modal-backdrop fade show"
        style={{ zIndex: 1050 }}
      />
    </>
  );
};


export default AddressModal;