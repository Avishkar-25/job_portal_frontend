import React, { useEffect, useState } from "react";

import {
  FaEdit,
  FaPlus,
  FaTrash,
} from "react-icons/fa";

import {
  getEducation,
  addEducation,
  updateEducation,
  deleteEducation,
} from "../../../../services/employeeProfileApi";

import EducationModal from "../modals/EducationModal";


const Education = () => {

  // =========================================
  // USER
  // =========================================

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const user_id = user?.user_id;


  // =========================================
  // STATES
  // =========================================

  const [educationList, setEducationList] =
    useState([]);

  const [showEducationModal, setShowEducationModal] =
    useState(false);

  const [isEdit, setIsEdit] =
    useState(false);

  const [selectedEducation, setSelectedEducation] =
    useState(null);

  const [education, setEducation] = useState({
    qualification: "",
    college_name: "",
    passing_year: "",
    cgpa: "",
  });


  // =========================================
  // LOAD EDUCATION
  // =========================================

  useEffect(() => {

    if (user_id) {
      loadEducation();
    }

  }, [user_id]);


  const loadEducation = async () => {

    try {

      const res = await getEducation(user_id);

      if (res.data.success) {

        setEducationList(
          res.data.education || []
        );

      }

    } catch (error) {

      console.log(
        "Load Education Error:",
        error
      );

    }

  };


  // =========================================
  // ADD
  // =========================================

  const handleAdd = () => {

    setIsEdit(false);

    setSelectedEducation(null);

    setEducation({
      qualification: "",
      college_name: "",
      passing_year: "",
      cgpa: "",
    });

    setShowEducationModal(true);

  };


  // =========================================
  // EDIT
  // =========================================

  const handleEdit = (item) => {

    setIsEdit(true);

    setSelectedEducation(item);

    setEducation({
      qualification:
        item.qualification || "",

      college_name:
        item.college_name || "",

      passing_year:
        item.passing_year || "",

      cgpa:
        item.cgpa || "",
    });

    setShowEducationModal(true);

  };


  // =========================================
  // SAVE / UPDATE
  // =========================================

  const handleSave = async () => {

    try {

      if (!education.qualification.trim()) {
        alert("Please enter qualification");
        return;
      }

      if (!education.college_name.trim()) {
        alert("Please enter college name");
        return;
      }

      if (!education.passing_year) {
        alert("Please enter passing year");
        return;
      }

      if (!education.cgpa.trim()) {
        alert("Please enter CGPA");
        return;
      }


      // =====================================
      // UPDATE
      // =====================================

      if (isEdit && selectedEducation) {

        const data = {
          qualification:
            education.qualification.trim(),

          college_name:
            education.college_name.trim(),

          passing_year:
            Number(education.passing_year),

          cgpa:
            education.cgpa.trim(),
        };


        const res = await updateEducation(
          selectedEducation.qualification_id,
          data
        );


        if (res.data.success) {

          alert(
            "Education updated successfully"
          );

          setShowEducationModal(false);

          loadEducation();

        }

        return;
      }


      // =====================================
      // ADD
      // =====================================

      const data = {

        qualification:
          education.qualification.trim(),

        college_name:
          education.college_name.trim(),

        passing_year:
          Number(education.passing_year),

        cgpa:
          education.cgpa.trim(),

      };


      const res = await addEducation(
        user_id,
        data
      );


      if (res.data.success) {

        alert(
          "Education added successfully"
        );

        setShowEducationModal(false);

        setEducation({
          qualification: "",
          college_name: "",
          passing_year: "",
          cgpa: "",
        });

        loadEducation();

      }

    } catch (error) {

      console.log(
        "Save Education Error:",
        error
      );

      console.log(
        "Backend Response:",
        error.response?.data
      );

      alert(
        error.response?.data?.message ||
        "Failed to save education"
      );

    }

  };


  // =========================================
  // DELETE
  // =========================================

  const handleDelete = async (
    qualification_id
  ) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this education record?"
    );

    if (!confirmDelete) {
      return;
    }


    try {

      const res = await deleteEducation(
        qualification_id
      );


      if (res.data.success) {

        alert(
          "Education deleted successfully"
        );

        loadEducation();

      }

    } catch (error) {

      console.log(
        "Delete Education Error:",
        error
      );

      alert(
        error.response?.data?.message ||
        "Failed to delete education"
      );

    }

  };


  return (

    <div>

      {/* =====================================
          EDUCATION CARD
      ====================================== */}

      <div className="card border-0 shadow rounded-4 mt-4">

        <div className="card-body p-4">


          {/* HEADER */}

          <div className="d-flex justify-content-between align-items-center mb-3">

            <h4 className="fw-bold mb-0">
              Education
            </h4>


            <button
              className="btn btn-success btn-sm"
              onClick={handleAdd}
            >

              <FaPlus className="me-2" />

              Add

            </button>

          </div>


          <hr />


          {/* =====================================
              EDUCATION LIST
          ====================================== */}

          {educationList.length === 0 ? (

            <div className="text-center text-muted py-4">

              No education details added yet.

            </div>

          ) : (

            educationList.map((item) => (

              <div
                key={item.qualification_id}
                className="border rounded-3 p-3 bg-light mb-3"
              >

                <div className="row">


                  {/* Qualification */}

                  <div className="col-md-6 mb-3">

                    <label className="text-muted small">
                      Degree / Qualification
                    </label>

                    <h6 className="fw-bold">
                      {item.qualification}
                    </h6>

                  </div>


                  {/* College */}

                  <div className="col-md-6 mb-3">

                    <label className="text-muted small">
                      College
                    </label>

                    <h6 className="fw-bold">
                      {item.college_name}
                    </h6>

                  </div>


                  {/* CGPA */}

                  <div className="col-md-6 mb-3">

                    <label className="text-muted small">
                      Percentage / CGPA
                    </label>

                    <h6 className="fw-bold">
                      {item.cgpa}
                    </h6>

                  </div>


                  {/* Passing Year */}

                  <div className="col-md-6 mb-3">

                    <label className="text-muted small">
                      Passing Year
                    </label>

                    <h6 className="fw-bold">
                      {item.passing_year}
                    </h6>

                  </div>

                </div>


                {/* BUTTONS */}

                <div className="d-flex justify-content-end gap-2">

                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() =>
                      handleEdit(item)
                    }
                  >

                    <FaEdit className="me-1" />

                    Edit

                  </button>


                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() =>
                      handleDelete(
                        item.qualification_id
                      )
                    }
                  >

                    <FaTrash className="me-1" />

                    Delete

                  </button>

                </div>

              </div>

            ))

          )}

        </div>

      </div>


      {/* =====================================
          EDUCATION MODAL
      ====================================== */}

      <EducationModal
        showEducationModal={
          showEducationModal
        }

        setShowEducationModal={
          setShowEducationModal
        }

        education={education}

        setEducation={setEducation}

        isEdit={isEdit}

        handleSave={handleSave}
      />

    </div>

  );

};


export default Education;