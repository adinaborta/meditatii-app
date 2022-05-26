import React, { useState } from "react";
import { FormControl, TextField } from "@mui/material";

import { getClassroomList, getHomeworkList } from "../../scripts/api";

// my context
import { Context } from "../../components/Screen";
import { useContext } from "react";

import axios from "axios";

export default function AddClassFormStudent() {
  const [classroomId, setClassroomId] = useState("");

  // context
  const { userId, setClassroomListComplete, setHomeworkListComplete } =
    useContext(Context);

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
        getHomeworkList(userId, setHomeworkListComplete);
      });
  }

  return (
    <>
      <h1 style={{ margin: "2rem 0" }}>Intra intr-o noua clasa</h1>
      <form className="popup-form" onSubmit={joinClassroom}>
        <p>Poti afla id-ul clasei tale de la profesorul indrumator.</p>
        <div className="row">
          <TextField
            id="classroom_id"
            label="Id-ul clasei"
            defaultValue="#"
            variant="outlined"
            required
            onChange={(event) => {
              setClassroomId(event.target.value);
            }}
          />
        </div>

        <button
          type="submit"
          className="fill"
          style={{ padding: "1rem", marginTop: "1rem" }}
        >
          Intra
        </button>
      </form>
    </>
  );
}
