// react
import React, { useState } from "react";

// frontend libraries
import {
  Select,
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

// api
import { getHomeworkList } from "../../scripts/api";

// my context
import { useContext } from "react";
import { Context } from "../Screen";

// axios
import axios from "axios";

export default function AddHomeworkForm(props) {
  // my states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState(new Date().addDays(1));
  const [classroomId, setClassroomId] = useState("");

  // context
  const { classroomListComplete, setHomeworkListComplete, userId } =
    useContext(Context);

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
  return (
    <>
      <h1 style={{ margin: "2rem 0" }}>Posteaza o noua tema</h1>
      <form className="popup-form" onSubmit={uploadHomework}>
        <div className="row">
          <TextField
            id="title"
            label="Titlu"
            variant="outlined"
            fullWidth
            required
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
        </div>
        <div className="row">
          <TextField
            id="description"
            label="Cerinta"
            variant="outlined"
            fullWidth
            required
            multiline
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          />
        </div>
        <div className="row">
          <div className="col-50" style={{ paddingRight: "0.5rem" }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                label="Deadline"
                value={deadline}
                onChange={(event) => {
                  setDeadline(event);
                }}
                fullWidth
                minDateTime={new Date().getTime() + 3500000}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
          <div className="col-50" style={{ paddingLeft: "0.5rem" }}>
            <FormControl>
              <InputLabel id="classroom-id-label">Clasa</InputLabel>
              <Select
                labelId="classroom-id-label"
                id="classroom-id"
                label="Clasa"
                value={classroomId}
                onChange={(event) => {
                  setClassroomId(event.target.value);
                }}
              >
                {classroomListComplete.map(
                  ({ classroom_id, name, subject }) => {
                    return (
                      <MenuItem value={classroom_id} key={classroom_id}>
                        #{classroom_id} - {name} ({subject})
                      </MenuItem>
                    );
                  }
                )}
              </Select>
            </FormControl>
          </div>
        </div>

        <button
          type="submit"
          className="fill"
          style={{ padding: "1rem", marginTop: "1rem" }}
        >
          Salveaza
        </button>
      </form>
    </>
  );
}
