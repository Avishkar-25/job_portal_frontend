
import React, { useEffect, useState } from "react";
import {
  FaEdit,
  FaPlus,
  FaTrash,
  FaLinkedin,
  FaGithub,
  FaGlobe
} from "react-icons/fa";

import {
  getSocialProfiles,
  updateSocialProfiles,
  deleteSocialProfile
} from "../../../../services/employeeProfileApi";

import SocialModal from "../modals/SocialModal";

const SocialProfiles = () => {

  // =======================================
  // User
  // =======================================

  const user = JSON.parse(localStorage.getItem("user"));
  const user_id = user?.user_id;


  // =======================================
  // State
  // =======================================

  const [socials, setSocials] = useState([]);

  const [showSocialModal, setShowSocialModal] = useState(false);

  const [editType, setEditType] = useState(null);

  const [socialType, setSocialType] = useState("");

  const [socialLink, setSocialLink] = useState("");

  const [loading, setLoading] = useState(false);


  // =======================================
  // Load Social Profiles
  // =======================================

  useEffect(() => {

    if (user_id) {
      loadSocialProfiles();
    }

  }, [user_id]);


  const loadSocialProfiles = async () => {

    try {

      const res = await getSocialProfiles(user_id);

      if (res.data.success) {

        const data = res.data.social;

        const result = [];

        if (data.linkedin) {
          result.push({
            type: "LinkedIn",
            key: "linkedin",
            link: data.linkedin
          });
        }

        if (data.github) {
          result.push({
            type: "GitHub",
            key: "github",
            link: data.github
          });
        }

        if (data.portfolio) {
          result.push({
            type: "Portfolio",
            key: "portfolio",
            link: data.portfolio
          });
        }

        setSocials(result);
      }

    } catch (err) {

      console.log(
        "Load Social Profiles Error:",
        err
      );

    }

  };


  // =======================================
  // Open Add Modal
  // =======================================

  const handleAdd = () => {

    setEditType(null);

    setSocialType("");

    setSocialLink("");

    setShowSocialModal(true);

  };


  // =======================================
  // Open Edit Modal
  // =======================================

  const handleEdit = (item) => {

    setEditType(item.key);

    setSocialType(item.type);

    setSocialLink(item.link);

    setShowSocialModal(true);

  };


  // =======================================
  // Save Social
  // =======================================

  const saveSocial = async () => {

    if (!socialType || !socialLink.trim()) {

      alert("Please enter profile type and link");

      return;

    }


    try {

      setLoading(true);


      const data = {

        linkedin:
          socialType === "LinkedIn"
            ? socialLink
            : socials.find(
                item => item.key === "linkedin"
              )?.link || null,

        github:
          socialType === "GitHub"
            ? socialLink
            : socials.find(
                item => item.key === "github"
              )?.link || null,

        portfolio:
          socialType === "Portfolio"
            ? socialLink
            : socials.find(
                item => item.key === "portfolio"
              )?.link || null

      };


      // If editing another profile,
      // keep existing values

      if (editType && editType !== "linkedin") {
        data.linkedin =
          socials.find(
            item => item.key === "linkedin"
          )?.link || null;
      }

      if (editType && editType !== "github") {
        data.github =
          socials.find(
            item => item.key === "github"
          )?.link || null;
      }

      if (editType && editType !== "portfolio") {
        data.portfolio =
          socials.find(
            item => item.key === "portfolio"
          )?.link || null;
      }


      const res =
        await updateSocialProfiles(
          user_id,
          data
        );


      if (res.data.success) {

        alert(
          editType
            ? "Social Profile Updated Successfully"
            : "Social Profile Added Successfully"
        );

        setShowSocialModal(false);

        setEditType(null);

        loadSocialProfiles();

      }

    } catch (err) {

      console.log(
        "Save Social Error:",
        err
      );

      alert(
        err.response?.data?.message ||
        "Failed to save social profile"
      );

    } finally {

      setLoading(false);

    }

  };


  // =======================================
  // Delete Social
  // =======================================

  const handleDelete = async (item) => {

    const confirmDelete =
      window.confirm(
        `Delete ${item.type} profile?`
      );

    if (!confirmDelete) return;


    try {

      const res =
        await deleteSocialProfile(
          user_id,
          item.key
        );


      if (res.data.success) {

        alert(
          `${item.type} deleted successfully`
        );

        loadSocialProfiles();

      }

    } catch (err) {

      console.log(
        "Delete Social Error:",
        err
      );

      alert(
        err.response?.data?.message ||
        "Failed to delete profile"
      );

    }

  };


  // =======================================
  // Icon
  // =======================================

  const getIcon = (type) => {

    if (type === "LinkedIn") {
      return (
        <FaLinkedin size={38} />
      );
    }

    if (type === "GitHub") {
      return (
        <FaGithub size={38} />
      );
    }

    return (
      <FaGlobe size={38} />
    );

  };


  // =======================================
  // UI
  // =======================================

  return (
    <>
      <div className="card border-0 shadow rounded-4 mt-4">

        <div className="card-body p-4">

          {/* Header */}

          <div className="d-flex justify-content-between align-items-center">

            <h4 className="fw-bold mb-0">
              Social Profiles
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


          {/* Cards */}

          {socials.length > 0 ? (

            <div className="row g-3">

              {socials.map((item) => (

                <div
                  className="col-6 col-md-4"
                  key={item.key}
                >

                  <div
                    className="border rounded-4 p-3 text-center h-100 position-relative"
                    style={{
                      minHeight: "150px"
                    }}
                  >

                    {/* Edit */}

                    <button
                      className="btn btn-warning btn-sm rounded-circle position-absolute"
                      style={{
                        top: "-8px",
                        left: "-8px",
                        width: "28px",
                        height: "28px",
                        padding: 0
                      }}
                      onClick={() =>
                        handleEdit(item)
                      }
                    >
                      <FaEdit size={12} />
                    </button>


                    {/* Delete */}

                    <button
                      className="btn btn-danger btn-sm rounded-circle position-absolute"
                      style={{
                        top: "-8px",
                        right: "-8px",
                        width: "28px",
                        height: "28px",
                        padding: 0
                      }}
                      onClick={() =>
                        handleDelete(item)
                      }
                    >
                      <FaTrash size={11} />
                    </button>


                    {/* Icon */}

                    <div className="text-primary mt-2">
                      {getIcon(item.type)}
                    </div>


                    {/* Type */}

                    <h6 className="fw-bold mt-2 mb-1">
                      {item.type}
                    </h6>


                    {/* Link */}

                    <a
                      href={
                        item.link.startsWith("http")
                          ? item.link
                          : `https://${item.link}`
                      }
                      target="_blank"
                      rel="noreferrer"
                      className="small text-decoration-none text-truncate d-block"
                    >
                      {item.link}
                    </a>

                  </div>

                </div>

              ))}

            </div>

          ) : (

            <div className="text-center py-5 text-muted">

              <FaGlobe
                size={45}
                className="mb-3"
              />

              <p className="mb-0">
                No social profiles added yet
              </p>

              <small>
                Add your LinkedIn, GitHub or Portfolio
              </small>

            </div>

          )}

        </div>

      </div>


      {/* =======================================
          Modal
      ======================================= */}

      <SocialModal
        showSocialModal={showSocialModal}
        setShowSocialModal={setShowSocialModal}

        editType={editType}
        setEditType={setEditType}

        socialType={socialType}
        setSocialType={setSocialType}

        socialLink={socialLink}
        setSocialLink={setSocialLink}

        saveSocial={saveSocial}

        loading={loading}
      />

    </>
  );
};

export default SocialProfiles;

