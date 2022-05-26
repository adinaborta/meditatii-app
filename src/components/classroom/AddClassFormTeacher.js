import React, { useState } from "react";
import { TextField } from "@mui/material";
import UploadFile from "../UploadFile";
import axios from "axios";

// my context
import { Context } from "../../components/Screen";
import { useContext } from "react";

// api
import { getClassroomList } from "../../scripts/api";

export default function AddClassFormTeacher() {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [endpoint, setEndpoint] = useState(null);

  // context
  const { userId, setClassroomListComplete } = useContext(Context);

  async function createNewClassroom(e) {
    e.preventDefault();
    const body = {
      name: name,
      subject: subject,
      teacher_id: userId,
    };

    await axios
      .post(`http://localhost:3001/createClassroom`, body)
      .then((response) => {
        console.log(response);
        setEndpoint(
          `uploadClassroomLink?classroom_id=${response.data.responseData.classroom_id}`
        );
      });
  }
  return (
    <>
      <h1 style={{ margin: "2rem 0" }}>Creaza o noua clasa</h1>
      <form className="popup-form" onSubmit={createNewClassroom}>
        <div className="row">
          <TextField
            id="subject"
            label="Subiect"
            variant="outlined"
            required
            onChange={(event) => {
              setSubject(event.target.value);
            }}
          />
        </div>
        <div className="row">
          <TextField
            id="name"
            label="Denumire"
            variant="outlined"
            required
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
        </div>
        <div style={{ width: "100%" }}>
          <UploadFile
            style={{ width: "100%" }}
            acceptedFormatString="png, jpg, jpeg"
            acceptedFormatList="image/*"
            label="Adauga o coperta"
            endpoint={endpoint}
            setEndpoint={setEndpoint}
            multiple={false}
            then={() => {
              getClassroomList(userId, setClassroomListComplete);
            }}
          />
        </div>

        <button
          type="submit"
          className="fill"
          style={{ padding: "1rem", marginTop: "1rem" }}
        >
          Creaza
        </button>
      </form>
    </>
  );
}
