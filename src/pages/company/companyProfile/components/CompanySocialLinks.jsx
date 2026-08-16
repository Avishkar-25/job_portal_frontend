
import React, { useState } from "react";
import api from "../../../../services/api";
import CompanySocialModal from "../modals/CompanySocialModal";

import {
  FaLinkedin,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaTrash,
  FaEdit,
  FaShareAlt,
} from "react-icons/fa";

const CompanySocialLinks = ({ company, setCompany }) => {
  const [showModal, setShowModal] = useState(false);
  const [deleting, setDeleting] = useState(null);

  const socialLinks = [
    {
      label: "LinkedIn",
      name: "linkedin",
      icon: FaLinkedin,
    },
    {
      label: "Facebook",
      name: "facebook",
      icon: FaFacebook,
    },
    {
      label: "Instagram",
      name: "instagram",
      icon: FaInstagram,
    },
    {
      label: "Twitter (X)",
      name: "twitter",
      icon: FaTwitter,
    },
  ];

  // ==========================================
  // DELETE SOCIAL LINK
  // ==========================================

  const handleDelete = async (socialName) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${socialName}?`
    );

    if (!confirmDelete) {
      return;
    }

    try {
      setDeleting(socialName);

      const response = await api.delete(
        `/company/profile/social/${socialName}`
      );

      if (response.data.success) {
        setCompany((prev) => ({
          ...prev,
          [socialName]: null,
        }));
      }
    } catch (error) {
      console.error("Delete social link error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to delete social link"
      );
    } finally {
      setDeleting(null);
    }
  };

  return (
    <>
      {/* =================================
          SOCIAL MEDIA CARD
      ================================= */}

      <div className="profile-section-card mb-4">

        {/* HEADER */}

        <div className="section-header">

          <div className="d-flex align-items-center gap-3">

            <div className="section-icon">
              <FaShareAlt />
            </div>

            <div>
              <h4 className="mb-1">
                Social Media Links
              </h4>

              <p className="mb-0">
                Connect your company's social profiles
              </p>
            </div>

          </div>


          {/* EDIT BUTTON */}

          <button
            type="button"
            className="edit-section-btn"
            onClick={() => setShowModal(true)}
          >
            <FaEdit />
            <span>Edit</span>
          </button>

        </div>


        {/* BODY */}

        <div className="card-body p-4">

          <div className="row g-3">

            {socialLinks.map((social) => {
              const SocialIcon = social.icon;

              return (
                <div
                  className="col-lg-6"
                  key={social.name}
                >

                  <div className="d-flex align-items-center p-3 border rounded-3">

                    {/* SOCIAL ICON */}

                    <div
                      className="d-flex align-items-center justify-content-center rounded-circle me-3 flex-shrink-0"
                      style={{
                        width: "44px",
                        height: "44px",
                        background: "#eef4ff",
                        color: "#2563eb",
                      }}
                    >
                      <SocialIcon size={20} />
                    </div>


                    {/* SOCIAL INFORMATION */}

                    <div className="flex-grow-1 min-width-0">

                      <div className="fw-semibold mb-1">
                        {social.label}
                      </div>

                      {company[social.name] ? (

                        <div className="d-flex align-items-center gap-2">

                          <a
                            href={company[social.name]}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted text-decoration-none small"
                            style={{
                              wordBreak: "break-all",
                              flex: 1,
                            }}
                          >
                            {company[social.name]}
                          </a>


                          {/* DELETE */}

                          <button
                            type="button"
                            className="btn btn-outline-danger btn-sm rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                            style={{
                              width: "34px",
                              height: "34px",
                            }}
                            onClick={() =>
                              handleDelete(social.name)
                            }
                            disabled={
                              deleting === social.name
                            }
                            title={`Delete ${social.label}`}
                          >
                            {deleting === social.name ? (
                              <span className="spinner-border spinner-border-sm"></span>
                            ) : (
                              <FaTrash size={12} />
                            )}
                          </button>

                        </div>

                      ) : (

                        <span className="text-muted small">
                          Not Added
                        </span>

                      )}

                    </div>

                  </div>

                </div>
              );
            })}

          </div>

        </div>

      </div>


      {/* =================================
          SOCIAL MODAL
      ================================= */}

      {showModal && (
        <CompanySocialModal
          company={company}
          setCompany={setCompany}
          closeModal={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default CompanySocialLinks;

