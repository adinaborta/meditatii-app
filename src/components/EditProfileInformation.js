import React, { useState } from "react";
import { useFormControl } from "@mui/material/FormControl";
import {
  FormControl,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  Box,
} from "@mui/material";
import "../styles/edit_profile.css";
import { useSessionContext } from "supertokens-auth-react/recipe/session";
import { useNavigate } from "react-router-dom";
const axios = require("axios").default;

export default function EditProfileInformation() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [role, setRole] = useState("");
  const user_id = useSessionContext().userId;
  const navigate = useNavigate();
  async function updateUserInfo(e) {
    e.preventDefault();
    let body = {
      name: name,
      surname: surname,
      role: role,
      user_id: user_id,
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
        <button
          type="submit"
          className="outline-to-fill"
          style={{ padding: "1rem" }}
        >
          Salveaza
        </button>
      </form>
    </div>
  );
}
