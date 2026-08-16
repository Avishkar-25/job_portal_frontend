import React, { useEffect, useState } from "react";
import {
  FaEdit,
  FaPlus,
  FaTrash,
  FaMapMarkerAlt,
} from "react-icons/fa";

import {
  getEmployeeProfile,
  updateEmployeeProfile,
} from "../../../../services/employeeProfileApi";

import AddressModal from "../modals/AddressModal";

const Address = () => {
  // ==============================
  // User
  // ==============================
  const user = JSON.parse(localStorage.getItem("user"));
  const user_id = user?.user_id;

  // ==============================
  // State
  // ==============================
  const [address, setAddress] = useState({
    address: "",
    pincode: "",
    state: "",
    country: "",
  });

  const [showAddressModal, setShowAddressModal] = useState(false);

  const [hasAddress, setHasAddress] = useState(false);

  // ==============================
  // Load Address
  // ==============================
  useEffect(() => {
    if (user_id) {
      loadAddress();
    }
  }, [user_id]);

  const loadAddress = async () => {
    try {
      const res = await getEmployeeProfile(user_id);

      if (res.data.success) {
        const profile = res.data.profile;

        const addressData = {
          address: profile.address || "",
          pincode: profile.pincode || "",
          state: profile.state || "",
          country: profile.country || "",
        };

        setAddress(addressData);

        if (
          profile.address ||
          profile.pincode ||
          profile.state ||
          profile.country
        ) {
          setHasAddress(true);
        } else {
          setHasAddress(false);
        }
      }
    } catch (error) {
      console.log("Load Address Error:", error);
    }
  };

  // ==============================
  // Save / Update Address
  // ==============================
  const handleSaveAddress = async () => {
    try {
      const data = {
        address: address.address,
        pincode: address.pincode,
        state: address.state,
        country: address.country,
      };

      const res = await updateEmployeeProfile(user_id, data);

      if (res.data.success) {
        alert("Address Updated Successfully");

        setHasAddress(true);
        setShowAddressModal(false);

        loadAddress();
      }
    } catch (error) {
      console.log("Save Address Error:", error);

      alert(
        error?.response?.data?.message ||
          "Failed to update address"
      );
    }
  };

  // ==============================
  // Delete Address
  // ==============================
  const handleDeleteAddress = async () => {
    if (!window.confirm("Delete Address?")) {
      return;
    }

    try {
      const data = {
        address: null,
        pincode: null,
        state: null,
        country: null,
      };

      const res = await updateEmployeeProfile(user_id, data);

      if (res.data.success) {
        alert("Address Deleted Successfully");

        setAddress({
          address: "",
          pincode: "",
          state: "",
          country: "",
        });

        setHasAddress(false);

        loadAddress();
      }
    } catch (error) {
      console.log("Delete Address Error:", error);

      alert(
        error?.response?.data?.message ||
          "Failed to delete address"
      );
    }
  };

  // ==============================
  // Open Add Modal
  // ==============================
  const handleAdd = () => {
    setAddress({
      address: "",
      pincode: "",
      state: "",
      country: "",
    });

    setShowAddressModal(true);
  };

  return (
    <>
      {/* ==============================
          Address Card
      ============================== */}

      <div className="card border-0 shadow rounded-4 mt-4">

        <div className="card-body p-4">

          {/* Header */}
          <div className="d-flex justify-content-between align-items-center">

            <div className="d-flex align-items-center gap-2">

              <div
                className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center"
                style={{
                  width: "42px",
                  height: "42px",
                }}
              >
                <FaMapMarkerAlt />
              </div>

              <h4 className="fw-bold mb-0">
                Address
              </h4>

            </div>

            <div>

              {!hasAddress ? (

                <button
                  className="btn btn-success btn-sm rounded-pill px-3"
                  onClick={handleAdd}
                >
                  <FaPlus className="me-2" />
                  Add
                </button>

              ) : (

                <div className="d-flex gap-2">

                  <button
                    className="btn btn-primary btn-sm rounded-pill px-3"
                    onClick={() =>
                      setShowAddressModal(true)
                    }
                  >
                    <FaEdit className="me-2" />
                    Edit
                  </button>

                  <button
                    className="btn btn-outline-danger btn-sm rounded-pill px-3"
                    onClick={handleDeleteAddress}
                  >
                    <FaTrash className="me-2" />
                    Delete
                  </button>

                </div>

              )}

            </div>

          </div>

          <hr />

          {/* ==============================
              Address Details
          ============================== */}

          {hasAddress ? (

            <div className="row g-3">

              {/* Address */}
              <div className="col-12">

                <div className="border rounded-4 p-3">

                  <small className="text-muted d-block mb-1">
                    Address
                  </small>

                  <div className="fw-semibold">
                    {address.address || "-"}
                  </div>

                </div>

              </div>

              {/* State */}
              <div className="col-md-4">

                <div className="border rounded-4 p-3 h-100">

                  <small className="text-muted d-block mb-1">
                    State
                  </small>

                  <div className="fw-semibold">
                    {address.state || "-"}
                  </div>

                </div>

              </div>

              {/* Pincode */}
              <div className="col-md-4">

                <div className="border rounded-4 p-3 h-100">

                  <small className="text-muted d-block mb-1">
                    Pincode
                  </small>

                  <div className="fw-semibold">
                    {address.pincode || "-"}
                  </div>

                </div>

              </div>

              {/* Country */}
              <div className="col-md-4">

                <div className="border rounded-4 p-3 h-100">

                  <small className="text-muted d-block mb-1">
                    Country
                  </small>

                  <div className="fw-semibold">
                    {address.country || "-"}
                  </div>

                </div>

              </div>

            </div>

          ) : (

            <div className="text-center py-5">

              <FaMapMarkerAlt
                size={40}
                className="text-muted mb-3"
              />

              <h6 className="text-muted">
                No Address Added
              </h6>

              <p className="text-muted small mb-0">
                Add your current address details
              </p>

            </div>

          )}

        </div>

      </div>

      {/* ==============================
          Address Modal
      ============================== */}

      <AddressModal
        showAddressModal={showAddressModal}
        setShowAddressModal={setShowAddressModal}
        address={address}
        setAddress={setAddress}
        handleSaveAddress={handleSaveAddress}
      />
    </>
  );
};

export default Address;