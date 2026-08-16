
import React from "react";
import {
  updateEmployeeProfile,
  uploadProfilePhoto
} from "../../../../services/employeeProfileApi";

const EditProfileModal = ({
  showEditModal,
  setShowEditModal,
  profile,
  setProfile,
  profileImage,
  setProfileImage,
  user_id,
  loadProfile,
}) => {

  if (!showEditModal) return null;

  // ===============================
  // Save Profile
  // ===============================

  const handleSave = async () => {

    try {

      const data = {

        full_name: profile.fullName || "",
        email: profile.email || "",
        phone: profile.phone || "",

        gender: profile.gender || null,
        dob: profile.dob || null,

        city: profile.city || "",

        // Profession
        profession: profile.profession || "",

      };

      const res = await updateEmployeeProfile(
        user_id,
        data
      );

      if (res.data.success) {

        alert("Profile Updated Successfully");

        loadProfile();

        setShowEditModal(false);

      }

    }
    catch (err) {

      console.log(err);

      alert("Failed to update profile");

    }

  };


  // ===============================
  // Upload Profile Photo
  // ===============================

  const handleImageChange = async (e) => {

    try {

      const file = e.target.files[0];

      if (!file)
        return;

      // Preview
      const preview = URL.createObjectURL(file);

      setProfileImage(preview);

      const formData = new FormData();

      formData.append(
        "profile_photo",
        file
      );

      const res = await uploadProfilePhoto(
        user_id,
        formData
      );

      console.log(res.data);

      if (res.data.success) {

        setProfileImage(
          `http://localhost:5000/${res.data.profile_photo}`
        );

      }

    }
    catch (error) {

      console.log(error);

      alert("Photo upload failed");

    }

  };


  return (

    <>

      <div
        className="modal d-block"
        style={{
          background: "rgba(0,0,0,.5)"
        }}
      >

        <div className="modal-dialog modal-lg modal-dialog-centered">

          <div className="modal-content rounded-4 shadow border-0">


            {/* Header */}

            <div className="modal-header bg-primary text-white">

              <h4 className="fw-bold">
                Edit Profile
              </h4>

              <button
                className="btn-close btn-close-white"
                onClick={() => setShowEditModal(false)}
              ></button>

            </div>


            {/* Body */}

            <div className="modal-body p-4">


              {/* Profile Photo */}

              <div className="text-center mb-4">

                <img
                  src={profileImage}
                  alt="profile"
                  className="rounded-circle border border-3 border-primary"
                  style={{
                    width: "120px",
                    height: "120px",
                    objectFit: "cover"
                  }}
                />

                <div className="mt-3">

                  <input
                    type="file"
                    id="profilePhoto"
                    accept="image/*"
                    className="d-none"
                    onChange={handleImageChange}
                  />

                  <label
                    htmlFor="profilePhoto"
                    className="btn btn-outline-primary btn-sm"
                  >
                    Change Photo
                  </label>

                </div>

              </div>


              <div className="row">


                {/* Full Name */}

                <div className="col-md-6 mb-3">

                  <label className="form-label fw-semibold">
                    Full Name
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    value={profile.fullName || ""}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        fullName: e.target.value
                      })
                    }
                  />

                </div>


                {/* Profession */}

                <div className="col-md-6 mb-3">

                  <label className="form-label fw-semibold">
                    Profession
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Full Stack Web Developer"
                    value={profile.profession || ""}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        profession: e.target.value
                      })
                    }
                  />

                </div>


                {/* Gender */}

                <div className="col-md-6 mb-3">

                  <label className="form-label fw-semibold">
                    Gender
                  </label>

                  <select
                    className="form-select"
                    value={profile.gender || ""}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        gender: e.target.value
                      })
                    }
                  >

                    <option value="">
                      Select Gender
                    </option>

                    <option value="Male">
                      Male
                    </option>

                    <option value="Female">
                      Female
                    </option>

                    <option value="Other">
                      Other
                    </option>

                  </select>

                </div>


                {/* Date Of Birth */}

                <div className="col-md-6 mb-3">

                  <label className="form-label fw-semibold">
                    Date Of Birth
                  </label>

                  <input
                    type="date"
                    className="form-control"
                    value={profile.dob || ""}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        dob: e.target.value
                      })
                    }
                  />

                </div>


                {/* Phone */}

                <div className="col-md-6 mb-3">

                  <label className="form-label fw-semibold">
                    Phone
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    value={profile.phone || ""}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        phone: e.target.value
                      })
                    }
                  />

                </div>


                {/* Email */}

                <div className="col-md-12 mb-3">

                  <label className="form-label fw-semibold">
                    Email
                  </label>

                  <input
                    type="email"
                    className="form-control"
                    value={profile.email || ""}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        email: e.target.value
                      })
                    }
                  />

                </div>


                {/* City */}

                <div className="col-md-6 mb-3">

                  <label className="form-label fw-semibold">
                    City
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    value={profile.city || ""}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        city: e.target.value
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
                onClick={() => setShowEditModal(false)}
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

    </>

  );

};

export default EditProfileModal;

