// react
import React, { useState, useEffect } from "react";

// css
import "../styles/homework.css";
import "../styles/list.css";

// helpers
import { getLocation } from "../scripts/helpers";

// my components
import ListActions from "../components/ListActions";
import HomeworkListActions from "../components/homework/HomeworkListActions";
import HomeworkListComponent from "../components/homework/HomeworkListComponent";

// router
import { useNavigate, useLocation } from "react-router-dom";

// my context
import { Context } from "../components/Screen";
import { useContext } from "react";

export default function HomeworkList() {
  // router
  const navigate = useNavigate();
  const location = useLocation();

  // context
  const { role, classroomListComplete, homeworkListComplete } =
    useContext(Context);

  // my states
  const [inputValue, setInputValue] = useState("");
  const [homeworkList, setHomeworkList] = useState([]);
  const [selectMode, setSelectMode] = useState(false);
  const [selectedHomeworks, setSelectedHomeworks] = useState([]);
  const listActions = classroomListComplete.length
    ? role === "teacher"
      ? ["add", "sort", "search", "select", "filter"]
      : ["add", "sort", "search", "filter"]
    : [];

  function pinHomework(event) {
    event.currentTarget.classList.toggle("pinned");
  }

  function handleClick(e) {
    if (!selectMode)
      navigate(`/teme/vizualizare?homeworkId=${e.currentTarget.id}`);
    else {
      let selectedHomeworksTemp = [...selectedHomeworks];
      if (selectedHomeworksTemp.includes(e.currentTarget.id)) {
        e.currentTarget.classList.remove("selected-list-item");
        selectedHomeworksTemp.splice(
          selectedHomeworksTemp.indexOf(e.currentTarget.id),
          1
        );
      } else {
        e.currentTarget.classList.add("selected-list-item");
        selectedHomeworksTemp.push(e.currentTarget.id);
      }
      setSelectedHomeworks(selectedHomeworksTemp);
    }
  }

  useEffect(() => {
    if (!selectMode) {
      setSelectedHomeworks([]);
    }
  }, [selectMode]);

  return (
    <div className="container scrollable-container">
      <ListActions
        listComplete={homeworkListComplete}
        setList={setHomeworkList}
        setInputValue={setInputValue}
        listActions={listActions}
        openPopup={() =>
          navigate(getLocation(location, { openPopup: "addHomeworkOpen" }))
        }
        setSelectMode={setSelectMode}
        title="Teme"
      >
        <HomeworkListActions
          setList={setHomeworkList}
          homeworkList={homeworkList}
          selectedHomeworks={selectedHomeworks}
        />
      </ListActions>
      <HomeworkListComponent
        homeworkList={homeworkList}
        selectMode={selectMode}
        setSelectedHomeworks={setSelectedHomeworks}
        selectedHomeworks={selectedHomeworks}
        handleClick={handleClick}
      />
      {homeworkList.length === 0 && (
        <div className="not-found-container">
          <div className="not-found">
            <h1>Nu a fost gasita nicio tema...</h1>
          </div>
          <img
            src={require("../assets/school_supplies.svg").default}
            className="background-asset"
          />
        </div>
      )}
    </div>
  );
}
