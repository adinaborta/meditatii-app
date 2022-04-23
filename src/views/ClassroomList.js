import React, { useState, useEffect, useContext } from "react";
import { useSessionContext } from "supertokens-auth-react/recipe/session";
import "../styles/list.css";
import { Icon } from "@iconify/react";
import ListActions from "../components/ListActions";
import { Context } from "../components/Screen";
import AddItem from "../components/AddItem";
import AddClassFormTeacher from "../components/AddClassFormTeacher";
import AddClassFormStudent from "../components/AddClassFormStudent";
import ClassroomFilters from "../components/ClassroomFilters";
import { getClassroomList } from "../scripts/helpers";
import axios from "axios";

export default function ClassroomList() {
  // userId
  const userId = useSessionContext().userId;

  // context
  const {
    role,
    setRole,
    classroomListComplete,
    setClassroomListComplete,
    setPath,
  } = useContext(Context);

  // my states
  const [message, setMessage] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [classroomList, setClassroomList] = useState([]);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [classroomId, setClassroomId] = useState("");

  async function createNewClassroom(e) {
    e.preventDefault();
    let body = {
      name: name,
      subject: subject,
      teacher_id: userId,
    };
    await axios
      .post(`http://localhost:3001/createClassroom`, body)
      .then((response) => {
        console.log(response);
        getClassroomList(userId, setClassroomListComplete);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  async function joinClassroom(e) {
    e.preventDefault();
    let classroomIdEdit = classroomId.trim();
    if (classroomIdEdit[0] === "#") classroomIdEdit = classroomIdEdit.slice(1);
    let body = {
      user_id: userId,
      classroom_id: classroomIdEdit,
    };
    await axios
      .post(`http://localhost:3001/joinClassroom`, body)
      .then((response) => {
        console.log(response);
        getClassroomList(userId, setClassroomListComplete);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  useEffect(() => {
    if (classroomListComplete.length !== 0) {
      setMessage("Nu a fost gasita nicio clasa...");
      setClassroomList(classroomListComplete);
    } else {
      setMessage("Nu faceti parte din nicio clasa.");
    }
  }, [classroomListComplete]);

  useEffect(() => {
    setPath([{ route: "/clase", header: "Clase" }]);
  }, []);

  return (
    <div className="container scrollable-container">
      <ListActions
        listComplete={classroomListComplete}
        setList={setClassroomList}
        listClass="list-container"
        setInputValue={setInputValue}
        setOpen={setOpen}
      >
        <ClassroomFilters
          classroomListComplete={classroomListComplete}
          setList={setClassroomId}
        />
      </ListActions>
      <div className="list-container details-view gallery-view-container">
        {classroomList.map(
          (
            { subject, teacher_name, teacher_surname, name, classroom_id },
            i
          ) => {
            return (
              <div className="list-item-preview-container" key={i}>
                <div className="list-item-preview">
                  <div className="row">
                    <h3>
                      {name} #{classroom_id}
                    </h3>
                  </div>
                  <div className="row mg-b-1">
                    <h4>{subject}</h4>
                  </div>
                  <div className="row color-light">
                    <h5>
                      Profesor: {teacher_name} {teacher_surname}
                    </h5>
                  </div>
                  <div className="row"></div>
                </div>
              </div>
            );
          }
        )}
      </div>

      {classroomList.length === 0 && message !== "" && (
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
      <AddItem setOpen={setOpen} open={open} id={"add-classroom-form"}>
        {role === "teacher" ? (
          <AddClassFormTeacher
            createNewClassroom={createNewClassroom}
            setSubject={setSubject}
            setName={setName}
          />
        ) : (
          <AddClassFormStudent
            joinClassroom={joinClassroom}
            setClassroomId={setClassroomId}
          />
        )}
      </AddItem>
    </div>
  );
}
