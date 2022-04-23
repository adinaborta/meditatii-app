import React, { useState } from "react";
import { useFormControl } from "@mui/material/FormControl";
import { FormControl, TextField } from "@mui/material";

export default function AddClassFormStudent(props) {
  return (
    <>
      <h1 style={{ margin: "2rem 0" }}>Intra intr-o noua clasa</h1>
      <form className="popup-form" onSubmit={props.joinClassroom}>
        <p>Poti afla id-ul clasei tale de la profesorul indrumator.</p>
        <div className="row">
          <TextField
            id="classroom_id"
            label="Id-ul clasei"
            defaultValue="#"
            variant="outlined"
            required
            onChange={(event) => {
              props.setClassroomId(event.target.value);
            }}
          />
        </div>

        <button
          type="submit"
          className="outline-to-fill"
          style={{ padding: "1rem", marginTop: "1rem" }}
        >
          Intra
        </button>
      </form>
    </>
  );
}
