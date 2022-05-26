// react
import React, { useState, useEffect } from "react";

// helpers
import { getLocation } from "../scripts/helpers";

// frontend libraries
import { Icon } from "@iconify/react";
import ClassroomDetails from "../components/classroom/ClassroomDetails";
import ClassroomPeople from "../components/classroom/ClassroomPeople";
import ClassroomHomeworks from "../components/classroom/ClassroomHomeworks";

// styles
import "../styles/classroom.css";

// context
import { useContext } from "react";
import { Context } from "../components/Screen";

// helpers
import { getIdxOfClassroomById } from "../scripts/helpers.js";

// useQuery
import { useQuery } from "../scripts/hooks";

// router
import { Link } from "react-router-dom";

// useBasePath
import { useBasePath } from "../scripts/hooks";

// router
import { useNavigate, useLocation } from "react-router-dom";

export default function ClassroomSlide(props) {
  // my states
  const [classroom, setClassroom] = useState([]);

  // context
  const { classroomListComplete, role } = useContext(Context);

  // useQuery
  const query = useQuery();
  const classroomId = query.get("classroomId") ? query.get("classroomId") : -1;
  const activeView = query.get("activeView") ? query.get("activeView") : "1";

  // useNavigate
  const navigate = useNavigate();

  // useLocation
  const location = useLocation();

  const path = useBasePath();

  useEffect(() => {
    let classroomIdx = getIdxOfClassroomById(
      classroomId,
      classroomListComplete
    );
    setClassroom(classroomListComplete[classroomIdx]);
  }, [classroomListComplete]);

  return (
    <div className="scrollable-container">
      {classroom && (
        <>
          <div className="big-cover">
            <img src={classroom.firebase_link} />
            {role === "teacher" && (
              <div
                className="icon-container-with-text fill cover-edit-icon"
                onClick={() =>
                  navigate(
                    getLocation(location, {
                      openPopup: "addClassroomImageOpen",
                    })
                  )
                }
              >
                <Icon icon="fluent:edit-16-filled" />
                <h3 className="text-in-icon-container">Schimba</h3>
              </div>
            )}
          </div>
          <div
            className="views-navbar"
            style={{
              backgroundColor: "#548687",
            }}
          >
            <Link
              to={`${path}?classroomId=${classroom.classroom_id}&activeView=1`}
            >
              <div className="bg-green-to-bg-black ">
                <h5>Informatii generale</h5>
              </div>
            </Link>
            <Link
              to={`${path}?classroomId=${classroom.classroom_id}&activeView=2`}
            >
              <div className="bg-green-to-bg-black">
                <h5>Persoane</h5>
              </div>
            </Link>
            <Link
              to={`${path}?classroomId=${classroom.classroom_id}&activeView=3`}
            >
              <div className="bg-green-to-bg-black">
                <h5>Teme</h5>
              </div>
            </Link>
          </div>
          {activeView === "1" && <ClassroomDetails classroom={classroom} />}
          {activeView === "2" && (
            <ClassroomPeople
              classroomId={classroom.classroom_id}
              studentsOnly={false}
            />
          )}
          {activeView === "3" && <ClassroomHomeworks classroom={classroom} />}
        </>
      )}
    </div>
  );
}
