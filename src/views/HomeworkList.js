import React, { useState, useEffect, useContext } from "react";
import { useSessionContext } from "supertokens-auth-react/recipe/session";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { Context } from "../components/Screen";
import ListActions from "../components/ListActions";
import AddItem from "../components/AddItem";
import AddHomeworkForm from "../components/AddHomeworkForm";
import HomeworkFilters from "../components/HomeworkFilters";
import { getHomeworkList } from "../scripts/helpers";
import "../styles/homework.css";
import "../styles/list.css";
import axios from "axios";

export default function HomeworkList() {
  // userId
  const userId = useSessionContext().userId;

  // context
  const {
    role,
    setPath,
    classroomListComplete,
    homeworkListComplete,
    setHomeworkListComplete,
  } = useContext(Context);

  // my states
  const [message, setMessage] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [homeworkList, setHomeworkList] = useState([]);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState(new Date().getTime() + 3600000);
  const [classroomId, setClassroomId] = useState("");

  function uploadHomework(e) {
    e.preventDefault();
    let body = {
      title: title,
      description: description,
      classroom_id: classroomId,
      deadline: deadline,
      teacher_id: userId,
    };
    axios
      .post(`http://localhost:3001/uploadHomework`, body)
      .then((response) => {
        console.log(response);
        getHomeworkList(userId, setHomeworkListComplete);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function pinHomework(event) {
    event.currentTarget.classList.toggle("pinned");
  }

  useEffect(() => {
    if (homeworkListComplete.length !== 0) {
      setMessage("Nu a fost gasita nicio tema...");
      setHomeworkList(homeworkListComplete);
    } else {
      setMessage("Nu a fost postata nicio tema.");
    }
  }, [homeworkListComplete]);

  useEffect(() => {
    setPath([{ route: "/teme", header: "Teme" }]);
  }, []);

  return (
    <div className="container scrollable-container">
      <ListActions
        setList={setHomeworkList}
        listComplete={homeworkListComplete}
        listClass="list-container"
        setInputValue={setInputValue}
        setOpen={setOpen}
        addItem={
          role === "teacher" && classroomListComplete.length > 0
            ? "show"
            : "hide"
        }
      >
        <HomeworkFilters
          classroomListComplete={classroomListComplete}
          setList={setHomeworkList}
          homeworkListComplete={homeworkListComplete}
          homeworkList={homeworkList}
        />
      </ListActions>
      <div className="list-container details-view">
        {homeworkList.map(
          ({ title, description, deadline, subject, name, homework_id }, i) => {
            return (
              <div className="list-item-preview-container" key={i}>
                <div className="pin" onClick={pinHomework}>
                  <div className="icon-container">
                    <Icon icon="bi:pin-angle" />
                  </div>
                </div>
                <Link to={`/teme/vizualizare/${homework_id}`}>
                  <div
                    className={`list-item-preview ${
                      new Date(deadline).getTime() < new Date().getTime()
                        ? "overdue-preview"
                        : ""
                    }`}
                  >
                    <div className="row homework-row-main-info">
                      <h3>
                        {title} - {name}
                      </h3>
                      <div
                        className="inline-container due-time"
                        style={{
                          color: "#0B001480",
                        }}
                      >
                        <div className="icon-container-small">
                          <Icon icon="bi:clock" />
                        </div>
                        <h5 className="due-time">{deadline}</h5>
                      </div>
                    </div>
                    <div className="row homework-row-description">
                      <p className="homework-description">{description}</p>
                    </div>
                  </div>
                </Link>
              </div>
            );
          }
        )}
      </div>
      {homeworkList.length === 0 && message !== "" && (
        <>
          <div className="not-found">
            <h1>{message}</h1>
          </div>
          <img
            src={require("../assets/school_supplies.svg").default}
            className="background-asset"
          />
        </>
      )}
      <AddItem setOpen={setOpen} open={open} id={"add-homework-form"}>
        {role === "teacher" && (
          <AddHomeworkForm
            uploadHomework={uploadHomework}
            setTitle={setTitle}
            setDescription={setDescription}
            setDeadline={setDeadline}
            deadline={deadline}
            classroomList={classroomListComplete}
            classroomId={classroomId}
            setClassroomId={setClassroomId}
          />
        )}
      </AddItem>
    </div>
  );
}
