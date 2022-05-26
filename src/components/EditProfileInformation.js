// react
import React, { useState } from "react";

// frontend libraries
import {
  FormControl,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  Box,
} from "@mui/material";

// css
import "../styles/edit_profile.css";

// router
import { useNavigate } from "react-router-dom";

// my context
import { Context } from "../components/Screen";
import { useContext } from "react";

// useSessionContext
import { useSessionContext } from "supertokens-auth-react/recipe/session";

// axios
const axios = require("axios").default;

export default function EditProfileInformation() {
  // navigate
  const navigate = useNavigate();

  // my states
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [role, setRole] = useState("");

  // userId
  const userId = useSessionContext().userId;

  async function updateUserInfo(e) {
    e.preventDefault();
    let body = {
      name: name,
      surname: surname,
      role: role,
      user_id: userId,
    };
    await axios
      .post(`http://localhost:3001/setUserInfo`, body)
      .then((response) => {
        console.log(response);
        navigate("/teme");
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div className="edit-profile-container">
      <form onSubmit={updateUserInfo}>
        <FormControl fullWidth margin="dense">
          <TextField
            id="surname"
            label="Nume"
            variant="outlined"
            required
            className="edit-info-input"
            onChange={(event) => {
              setSurname(event.target.value);
            }}
          />
        </FormControl>
        <FormControl fullWidth margin="dense">
          <TextField
            id="name"
            label="Prenume"
            variant="outlined"
            required
            className="edit-info-input"
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
        </FormControl>
        <FormControl fullWidth margin="dense" required>
          <InputLabel id="role-label">Rol</InputLabel>
          <Select
            labelId="role-label"
            id="role"
            label="Role"
            className="edit-info-input"
            value={role}
            onChange={(event) => {
              setRole(event.target.value);
            }}
          >
            <MenuItem value="student">Student</MenuItem>
            <MenuItem value="teacher">Profesor</MenuItem>
          </Select>
        </FormControl>
        <button type="submit" className="fill" style={{ padding: "1rem" }}>
          Salveaza
        </button>
      </form>
    </div>
  );
}
