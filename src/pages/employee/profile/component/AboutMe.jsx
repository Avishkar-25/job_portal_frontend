import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";

import {
  getAbout,
  updateAbout,
} from "../../../../services/employeeProfileApi";

import AboutModal from "../modals/AboutModal";

const AboutMe = () => {
// const user = JSON.parse(localStorage.getItem("user"));

// console.log(user);

// const user_id = user?.user_id;
// console.log("user =", user);
// console.log("user_id =", user_id);
// console.log("User ID =", user_id);
  // ===========================
  // User
  // ===========================
  const user = JSON.parse(localStorage.getItem("user"));
  const user_id = user?.user_id;

  // ===========================
  // State
  // ===========================
  const [showAboutModal, setShowAboutModal] = useState(false);

  const [about, setAbout] = useState("");

  // ===========================
  // Load About
  // ===========================
  useEffect(() => {

    if (user_id) {
      loadAbout();
    }

  }, [user_id]);

  const loadAbout = async () => {

    try {

      const res = await getAbout(user_id);

      if (res.data.success) {
        setAbout(res.data.about || "");
      }

    } catch (err) {
      console.log(err);
    }

  };

  // ===========================
  // Save About
  // ===========================
  const handleSave = async () => {

    try {

      const res = await updateAbout(user_id, {
        about,
      });

      if (res.data.success) {

        alert("About Updated Successfully");

        setShowAboutModal(false);

        loadAbout();

      }

    } catch (err) {

      console.log(err);

      alert("Failed to update About");

    }

  };

  return (
    <>
      <div className="card border-0 shadow rounded-4 mt-4">

        <div className="card-body p-4">

          <div className="d-flex justify-content-between align-items-center">

            <h4 className="fw-bold mb-0">
              About Me
            </h4>

            <button
              className="btn btn-outline-primary btn-sm"
              onClick={() => setShowAboutModal(true)}
            >
              <FaEdit className="me-2" />
              Edit
            </button>

          </div>

          <hr />

          <p
            className="text-secondary"
            style={{ lineHeight: "30px" }}
          >
            {about || "-"}
          </p>

        </div>

      </div>

      <AboutModal
        showAboutModal={showAboutModal}
        setShowAboutModal={setShowAboutModal}
        about={about}
        setAbout={setAbout}
        handleSave={handleSave}
      />
    </>
  );
};

export default AboutMe;