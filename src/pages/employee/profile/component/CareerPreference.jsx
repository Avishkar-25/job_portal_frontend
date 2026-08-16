import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";

import {
  getCareerPreference,
  updateCareerPreference,
} from "../../../../services/employeeProfileApi";

import CareerModal from "../modals/CareerModal";

const CareerPreference = () => {
  // ===========================
  // User
  // ===========================
  const user = JSON.parse(localStorage.getItem("user"));
  const user_id = user?.user_id;

  // ===========================
  // State
  // ===========================
  const [showCareerModal, setShowCareerModal] = useState(false);

  const [career, setCareer] = useState({
    jobType: "",
    availability: "",
    location: "",
  });

  // ===========================
  // Load Career
  // ===========================
  useEffect(() => {
    if (user_id) {
      loadCareer();
    }
  }, [user_id]);

  const loadCareer = async () => {
    try {
      const res = await getCareerPreference(user_id);

      if (res.data.success) {
        setCareer({
          jobType: res.data.career.job_type || "",
          availability: res.data.career.availability || "",
          location: res.data.career.preferred_locations || "",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  // ===========================
  // Save Career
  // ===========================
  const handleSave = async () => {
    try {
      const data = {
        job_type: career.jobType,
        availability: career.availability,
        preferred_locations: career.location,
      };

      const res = await updateCareerPreference(user_id, data);

      if (res.data.success) {
        alert("Career Preference Updated Successfully");

        setShowCareerModal(false);

        loadCareer();
      }
    } catch (err) {
      console.log(err);
      alert("Failed to update Career Preference");
    }
  };

  return (
    <>
      {/* ================= Career Preference ================= */}

      <div className="card border-0 shadow rounded-4 mt-4">
        <div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-center">
            <h4 className="fw-bold mb-0">
              Career Preferences
            </h4>

            <button
              className="btn btn-outline-primary btn-sm"
              onClick={() => setShowCareerModal(true)}
            >
              <FaEdit className="me-2" />
              Edit
            </button>
          </div>

          <div className="row mt-4">
            <div className="col-md-6">
              <h6 className="text-muted">
                Preferred Job Type
              </h6>

              <p className="fw-semibold">
                {career.jobType || "-"}
              </p>
            </div>

            <div className="col-md-6">
              <h6 className="text-muted">
                Availability
              </h6>

              <p className="fw-semibold">
                {career.availability || "-"}
              </p>
            </div>
          </div>

          <div className="mt-3">
            <h6 className="text-muted">
              Preferred Locations
            </h6>

            <p className="fw-semibold">
              {career.location || "-"}
            </p>
          </div>
        </div>
      </div>

      {/* ================= Modal ================= */}

      <CareerModal
        showCareerModal={showCareerModal}
        setShowCareerModal={setShowCareerModal}
        career={career}
        setCareer={setCareer}
        handleSave={handleSave}
      />
    </>
  );
};

export default CareerPreference;