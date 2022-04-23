import React, { useState } from "react";
import { useFormControl } from "@mui/material/FormControl";
import { FormControl, TextField } from "@mui/material";

export default function AddClassFormTeacher(props) {
  return (
    <>
      <h1 style={{ margin: "2rem 0" }}>Creaza o noua clasa</h1>
      <form className="popup-form" onSubmit={props.createNewClassroom}>
        <div className="row">
          <TextField
            id="subject"
            label="Subiect"
            variant="outlined"
            required
            onChange={(event) => {
              props.setSubject(event.target.value);
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
              props.setName(event.target.value);
            }}
          />
        </div>

        <button
          type="submit"
          className="outline-to-fill"
          style={{ padding: "1rem", marginTop: "1rem" }}
        >
          Creaza
        </button>
      </form>
    </>
  );
}
