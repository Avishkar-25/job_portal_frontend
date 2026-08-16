import React, { useEffect, useState } from "react";
import {
  FaEdit,
  FaPlus,
  FaTrash,
  FaBriefcase,
  FaBuilding,
  FaMoneyBillWave,
  FaBullseye,
} from "react-icons/fa";

import {
  getProfessionalDetails,
  updateProfessionalDetails,
} from "../../../../services/employeeProfileApi";

import ProfessionalModal from "../modals/ProfessionalModal";

const ProfessionalDetails = () => {

  // =======================================
  // User
  // =======================================

  const user = JSON.parse(localStorage.getItem("user"));
  const user_id = user?.user_id;


  // =======================================
  // State
  // =======================================

  const [professional, setProfessional] = useState(null);

  const [showProfessionalModal, setShowProfessionalModal] =
    useState(false);

  const [loading, setLoading] = useState(true);


  // =======================================
  // Load Professional Details
  // =======================================

  useEffect(() => {
    if (user_id) {
      loadProfessional();
    }
  }, [user_id]);


  const loadProfessional = async () => {
    try {

      setLoading(true);

      const res = await getProfessionalDetails(user_id);

      if (res.data.success) {

        const data = res.data.professional;

        if (
          data.experience ||
          data.current_company ||
          data.current_salary ||
          data.expected_salary
        ) {
          setProfessional({
            experience: data.experience || "",
            company: data.current_company || "",
            currentSalary: data.current_salary || "",
            expectedSalary: data.expected_salary || "",
          });
        } else {
          setProfessional(null);
        }
      }

    } catch (err) {

      console.log(
        "Get Professional Details Error:",
        err
      );

      setProfessional(null);

    } finally {

      setLoading(false);

    }
  };


  // =======================================
  // Open Add
  // =======================================

  const handleAdd = () => {

    setProfessional({
      experience: "",
      company: "",
      currentSalary: "",
      expectedSalary: "",
    });

    setShowProfessionalModal(true);
  };


  // =======================================
  // Open Edit
  // =======================================

  const handleEdit = () => {

    setShowProfessionalModal(true);
  };


  // =======================================
  // Save / Update
  // =======================================

  const handleSave = async () => {

    try {

      const data = {
        experience: professional?.experience || "",
        current_company: professional?.company || "",
        current_salary: professional?.currentSalary || "",
        expected_salary: professional?.expectedSalary || "",
      };

      const res =
        await updateProfessionalDetails(
          user_id,
          data
        );

      if (res.data.success) {

        alert(
          "Professional Details Updated Successfully"
        );

        setShowProfessionalModal(false);

        loadProfessional();
      }

    } catch (err) {

      console.log(
        "Save Professional Details Error:",
        err
      );

      console.log(
        "Backend Response:",
        err.response?.data
      );

      alert(
        err.response?.data?.message ||
        "Failed to save Professional Details"
      );
    }
  };


  // =======================================
  // Delete
  // =======================================

  const handleDelete = async () => {

    // Professional details are columns
    // inside employee table.
    // We clear them instead of deleting row.

    if (
      !window.confirm(
        "Delete Professional Details?"
      )
    ) {
      return;
    }

    try {

      const data = {
        experience: "",
        current_company: "",
        current_salary: "",
        expected_salary: "",
      };

      const res =
        await updateProfessionalDetails(
          user_id,
          data
        );

      if (res.data.success) {

        alert(
          "Professional Details Deleted Successfully"
        );

        setProfessional(null);

        loadProfessional();
      }

    } catch (err) {

      console.log(
        "Delete Professional Details Error:",
        err
      );

      alert(
        "Failed to delete Professional Details"
      );
    }
  };


  // =======================================
  // Loading
  // =======================================

  if (loading) {

    return (
      <div className="card border-0 shadow rounded-4 mt-4">

        <div className="card-body p-4 text-center">

          <div
            className="spinner-border text-primary"
            role="status"
          />

          <p className="text-muted mt-2 mb-0">
            Loading professional details...
          </p>

        </div>

      </div>
    );
  }


  return (
    <>
      {/* =================================
          Professional Details
      ================================= */}

      <div className="card border-0 shadow rounded-4 mt-4">

        <div className="card-body p-4">

          {/* Header */}

          <div className="d-flex justify-content-between align-items-center">

            <h4 className="fw-bold mb-0">
              Professional Details
            </h4>


            <div>

              {professional ? (

                <div className="d-flex gap-2">

                  <button
                    className="btn btn-primary btn-sm"
                    onClick={handleEdit}
                  >
                    <FaEdit className="me-2" />
                    Edit
                  </button>

                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={handleDelete}
                  >
                    <FaTrash className="me-2" />
                    Delete
                  </button>

                </div>

              ) : (

                <button
                  className="btn btn-success btn-sm"
                  onClick={handleAdd}
                >
                  <FaPlus className="me-2" />
                  Add
                </button>

              )}

            </div>

          </div>


          <hr />


          {/* =================================
              No Data
          ================================= */}

          {!professional ? (

            <div className="text-center py-5">

              <FaBriefcase
                size={40}
                className="text-muted mb-3"
              />

              <h6 className="fw-bold">
                No Professional Details Added
              </h6>

              <p className="text-muted mb-0">
                Add your experience and salary details.
              </p>

            </div>

          ) : (

            /* =================================
               Details
            ================================= */

            <div className="row g-3">


              {/* Experience */}

              <div className="col-6 col-md-3">

                <div className="border rounded-4 p-3 h-100">

                  <div className="d-flex align-items-center gap-2">

                    <FaBriefcase
                      className="text-primary"
                    />

                    <small className="text-muted">
                      Experience
                    </small>

                  </div>

                  <h6 className="fw-bold mt-2 mb-0">
                    {professional.experience || "-"}
                  </h6>

                </div>

              </div>


              {/* Company */}

              <div className="col-6 col-md-3">

                <div className="border rounded-4 p-3 h-100">

                  <div className="d-flex align-items-center gap-2">

                    <FaBuilding
                      className="text-primary"
                    />

                    <small className="text-muted">
                      Company
                    </small>

                  </div>

                  <h6
                    className="fw-bold mt-2 mb-0 text-truncate"
                    title={professional.company}
                  >
                    {professional.company || "-"}
                  </h6>

                </div>

              </div>


              {/* Current Salary */}

              <div className="col-6 col-md-3">

                <div className="border rounded-4 p-3 h-100">

                  <div className="d-flex align-items-center gap-2">

                    <FaMoneyBillWave
                      className="text-success"
                    />

                    <small className="text-muted">
                      Current Salary
                    </small>

                  </div>

                  <h6 className="fw-bold mt-2 mb-0">
                    {professional.currentSalary || "-"}
                  </h6>

                </div>

              </div>


              {/* Expected Salary */}

              <div className="col-6 col-md-3">

                <div className="border rounded-4 p-3 h-100">

                  <div className="d-flex align-items-center gap-2">

                    <FaBullseye
                      className="text-danger"
                    />

                    <small className="text-muted">
                      Expected Salary
                    </small>

                  </div>

                  <h6 className="fw-bold mt-2 mb-0">
                    {professional.expectedSalary || "-"}
                  </h6>

                </div>

              </div>


            </div>

          )}

        </div>

      </div>


      {/* =================================
          Modal
      ================================= */}

      <ProfessionalModal
        showProfessionalModal={
          showProfessionalModal
        }
        setShowProfessionalModal={
          setShowProfessionalModal
        }
        professional={professional}
        setProfessional={setProfessional}
        handleSave={handleSave}
      />

    </>
  );
};

export default ProfessionalDetails;