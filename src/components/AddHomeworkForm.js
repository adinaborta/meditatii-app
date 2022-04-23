import React from "react";
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

export default function AddHomeworkForm(props) {
  return (
    <>
      <h1 style={{ margin: "2rem 0" }}>Posteaza o noua tema</h1>
      <form className="popup-form" onSubmit={props.uploadHomework}>
        <div className="row">
          <TextField
            id="title"
            label="Titlu"
            variant="outlined"
            fullWidth
            required
            onChange={(event) => {
              props.setTitle(event.target.value);
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
              props.setDescription(event.target.value);
            }}
          />
        </div>
        <div className="row">
          <div className="col-50" style={{ paddingRight: "0.5rem" }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                label="Deadline"
                value={props.deadline}
                onChange={(event) => {
                  props.setDeadline(event);
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
                value={props.classroomId}
                onChange={(event) => {
                  props.setClassroomId(event.target.value);
                }}
              >
                {props.classroomList.map(({ classroom_id, name, subject }) => {
                  return (
                    <MenuItem value={classroom_id} key={classroom_id}>
                      #{classroom_id} - {name} ({subject})
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
        </div>

        <button
          type="submit"
          className="outline-to-fill"
          style={{ padding: "1rem", marginTop: "1rem" }}
        >
          Salveaza
        </button>
      </form>
    </>
  );
}
