// react
import React, { useState, useEffect } from "react";

// css
import "../styles/list.css";
import "../styles/classroom.css";

// my components
import ListActions from "../components/ListActions";
import ClassroomListActions from "../components/classroom/ClassroomListActions";

// router
import { useNavigate, useLocation } from "react-router-dom";

// my context
import { Context } from "../components/Screen";
import { useContext } from "react";
import { getLocation } from "../scripts/helpers";

export default function ClassroomList() {
  // router
  const navigate = useNavigate();
  const location = useLocation();

  // context
  const { classroomListComplete, role } = useContext(Context);

  // my states
  const [inputValue, setInputValue] = useState("");
  const [classroomList, setClassroomList] = useState([]);
  const [selectMode, setSelectMode] = useState(false);
  const [selectedClassrooms, setSelectedClassrooms] = useState([]);

  const listActions = classroomList.length
    ? role === "teacher"
      ? ["add", "sort", "search", "select"]
      : ["add", "sort", "search"]
    : ["add"];

  useEffect(() => {
    setClassroomList(classroomListComplete);
  }, [classroomListComplete]);

  return (
    <div className="container scrollable-container">
      <ListActions
        listComplete={classroomListComplete}
        setList={setClassroomList}
        setInputValue={setInputValue}
        listActions={listActions}
        openPopup={() =>
          navigate(getLocation(location, { openPopup: "addClassroomOpen" }))
        }
        setSelectMode={setSelectMode}
        title="Clase"
      >
        <ClassroomListActions
          setList={setClassroomList}
          selectedClassrooms={selectedClassrooms}
        />
      </ListActions>
      {classroomList.length ? (
        <div className="list-container details-view gallery-view-container">
          {classroomList.map(
            (
              {
                subject,
                teacher_name,
                teacher_surname,
                name,
                classroom_id,
                firebase_link,
              },
              i
            ) => {
              return (
                <div className="list-item-preview-container" key={i}>
                  <div
                    className={`list-item-preview ${
                      selectMode ? "not-selected-list-item" : ""
                    }`}
                    id={classroom_id}
                    onClick={(e) => {
                      if (!selectMode)
                        navigate(
                          `/clase/vizualizare?classroomId=${classroom_id}`
                        );
                      else {
                        let selectedClassroomsTemp = [...selectedClassrooms];
                        if (
                          selectedClassroomsTemp.includes(e.currentTarget.id)
                        ) {
                          e.currentTarget.classList.remove(
                            "selected-list-item"
                          );
                          selectedClassroomsTemp.splice(
                            selectedClassroomsTemp.indexOf(e.currentTarget.id),
                            1
                          );
                        } else {
                          e.currentTarget.classList.add("selected-list-item");
                          selectedClassroomsTemp.push(e.currentTarget.id);
                        }
                        setSelectedClassrooms(selectedClassroomsTemp);
                      }
                    }}
                  >
                    <div className="cover">
                      <img src={firebase_link} />
                    </div>
                    <div className="list-item-content">
                      <div className="row">
                        <h2>#{classroom_id}</h2>
                      </div>
                      <div className="row">
                        <h3>{name}</h3>
                      </div>
                      <div className="row mg-b-1">
                        <h4>Subiect: {subject}</h4>
                      </div>
                      <div className="row color-light">
                        <h5>
                          Profesor: {teacher_name} {teacher_surname}
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
          )}
        </div>
      ) : (
        ""
      )}
      {classroomList.length === 0 ? (
        <div className="not-found-container">
          <div className="not-found">
            <h1>Nu a fost gasita nicio clasa...</h1>
          </div>
          <img
            src={require("../assets/school_supplies.svg").default}
            className="background-asset"
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
