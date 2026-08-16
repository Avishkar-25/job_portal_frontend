  import React, { useEffect, useState } from "react";
  import {
    FaEdit,
    FaPlus,
    FaTrash,
  } from "react-icons/fa";

  import {
    getSkills,
    addSkill,
    updateSkill,
    deleteSkill,
  } from "../../../../services/employeeProfileApi";

  import SkillModal from "../modals/SkillModal";

  const Skills = () => {

    // ===============================
    // USER
    // ===============================

    const user = JSON.parse(
      localStorage.getItem("user")
    );

    const user_id = user?.user_id;


    // ===============================
    // STATE
    // ===============================

    const [skills, setSkills] = useState([]);

    const [showSkillModal, setShowSkillModal] =
      useState(false);

    const [isSkillEdit, setIsSkillEdit] =
      useState(false);

    const [selectedSkill, setSelectedSkill] =
      useState(null);

    const [skill, setSkill] = useState("");

    const [skillLevel, setSkillLevel] =
      useState("Beginner");


    // ===============================
    // LOAD SKILLS
    // ===============================

    useEffect(() => {
      if (user_id) {
        loadSkills();
      }
    }, [user_id]);


    const loadSkills = async () => {
      try {

        const res = await getSkills(user_id);

        if (res.data.success) {
          setSkills(res.data.skills || []);
        }

      } catch (err) {

        console.log(
          "Get Skills Error:",
          err
        );

      }
    };


    // ===============================
    // ADD MODAL
    // ===============================

    const handleAdd = () => {

      setIsSkillEdit(false);

      setSelectedSkill(null);

      setSkill("");

      setSkillLevel("Beginner");

      setShowSkillModal(true);
    };


    // ===============================
    // EDIT MODAL
    // ===============================

    const handleEdit = (item) => {

      setIsSkillEdit(true);

      setSelectedSkill(item);

      setSkill(item.skill_name || "");

      setSkillLevel(
        item.skill_level || "Beginner"
      );

      setShowSkillModal(true);
    };


    // ===============================
    // SAVE / UPDATE
    // ===============================

    const saveSkill = async () => {

      try {

        if (!skill.trim()) {
          alert("Please enter skill name");
          return;
        }


        // =============================
        // UPDATE
        // =============================

        if (
          isSkillEdit &&
          selectedSkill
        ) {

          const res = await updateSkill(
            selectedSkill.skill_id,
            {
              skill_name: skill.trim(),
              skill_level: skillLevel,
            }
          );

          if (res.data.success) {

            alert(
              "Skill updated successfully"
            );

            setShowSkillModal(false);

            loadSkills();
          }

          return;
        }


        // =============================
        // ADD
        // =============================

        if (!user_id) {
          alert("User ID not found");
          return;
        }

        const res = await addSkill(
          user_id,
          {
            skill_name: skill.trim(),
            skill_level: skillLevel,
          }
        );

        if (res.data.success) {

          alert(
            "Skill added successfully"
          );

          setShowSkillModal(false);

          setSkill("");

          setSkillLevel("Beginner");

          loadSkills();
        }

      } catch (err) {

        console.log(
          "Save Skill Error:",
          err
        );

        console.log(
          "Backend Response:",
          err.response?.data
        );

        alert(
          err.response?.data?.message ||
          "Failed to save skill"
        );
      }
    };


    // ===============================
    // DELETE
    // ===============================

    const removeSkill = async (id) => {

      const confirmDelete =
        window.confirm(
          "Are you sure you want to delete this skill?"
        );

      if (!confirmDelete) {
        return;
      }

      try {

        const res = await deleteSkill(id);

        if (res.data.success) {

          alert(
            "Skill deleted successfully"
          );

          loadSkills();
        }

      } catch (err) {

        console.log(
          "Delete Skill Error:",
          err
        );

        alert(
          err.response?.data?.message ||
          "Failed to delete skill"
        );
      }
    };


    return (
      <div>

        <div className="card border-0 shadow rounded-4 mt-4">

          <div className="card-body p-4">

            {/* HEADER */}

            <div className="d-flex justify-content-between align-items-center">

              <h4 className="fw-bold mb-0">
                Key Skills
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


            {/* SKILLS */}

          <div className="row g-2">
    {skills.length > 0 ? (
      skills.map((item) => {

        const levelData = {
          Beginner: {
            percent: 25,
            badge: "bg-secondary",
          },
          Intermediate: {
            percent: 50,
            badge: "bg-warning text-dark",
          },
          Advanced: {
            percent: 75,
            badge: "bg-primary",
          },
          Expert: {
            percent: 100,
            badge: "bg-success",
          },
        };

        const level =
          levelData[item.skill_level] ||
          levelData.Beginner;

        return (
          <div
            key={item.skill_id}
            className="col-6 col-md-4 col-lg-3"
          >

            <div
              className="border rounded-4 p-2 h-100 position-relative bg-white"
              style={{
                transition: "all .2s ease",
                boxShadow:
                  "0 3px 10px rgba(0,0,0,.06)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform =
                  "translateY(-3px)";
                e.currentTarget.style.boxShadow =
                  "0 8px 18px rgba(0,0,0,.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform =
                  "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 3px 10px rgba(0,0,0,.06)";
              }}
            >

              {/* TOP */}

              <div className="d-flex align-items-center justify-content-between">

                <div className="d-flex align-items-center gap-2">

                

                  <div style={{ minWidth: 0 }}>

                    <h6
                      className="fw-bold mb-0 text-truncate"
                      style={{
                        fontSize: "13px",
                      }}
                    >
                      {item.skill_name}
                    </h6>

                    <small
                      className="text-muted"
                      style={{
                        fontSize: "10px",
                      }}
                    >
                      Skill
                    </small>

                  </div>

                </div>


                {/* ACTIONS */}

                <div className="d-flex gap-1">

                  <button
                    className="btn btn-sm btn-light rounded-circle text-primary"
                    style={{
                      width: "24px",
                      height: "24px",
                      padding: "0",
                    }}
                    onClick={() =>
                      handleEdit(item)
                    }
                  >
                    <FaEdit size={9} />
                  </button>

                  <button
                    className="btn btn-sm btn-light rounded-circle text-danger"
                    style={{
                      width: "24px",
                      height: "24px",
                      padding: "0",
                    }}
                    onClick={() =>
                      removeSkill(item.skill_id)
                    }
                  >
                    <FaTrash size={9} />
                  </button>

                </div>

              </div>


              {/* LEVEL */}

              <div className="mt-2">

                <div className="d-flex justify-content-between align-items-center">

                  <small
                    className="text-muted"
                    style={{
                      fontSize: "10px",
                    }}
                  >
                    Level
                  </small>

                  <span
                    className={`badge rounded-pill ${level.badge}`}
                    style={{
                      fontSize: "9px",
                      padding: "4px 7px",
                    }}
                  >
                    {item.skill_level}
                  </span>

                </div>


                {/* PROGRESS */}

                <div
                  className="progress rounded-pill mt-1"
                  style={{
                    height: "4px",
                    background: "#eef1f5",
                  }}
                >

                  <div
                    className="progress-bar rounded-pill"
                    style={{
                      width: `${level.percent}%`,
                    }}
                  />

                </div>

              </div>

            </div>

          </div>
        );
      })
    ) : (

      <div className="col-12 text-center py-4">

        <p className="text-muted mb-0">
          No skills added yet
        </p>

      </div>

    )}
  </div>

          </div>

        </div>


        {/* MODAL */}

        <SkillModal
          showSkillModal={
            showSkillModal
          }

          setShowSkillModal={
            setShowSkillModal
          }

          isSkillEdit={
            isSkillEdit
          }

          skill={skill}

          setSkill={setSkill}

          skillLevel={
            skillLevel
          }

          setSkillLevel={
            setSkillLevel
          }

          saveSkill={
            saveSkill
          }
        />

      </div>
    );
  };

  export default Skills;