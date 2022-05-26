import React, { useEffect, useState } from "react";
// frontend libraries
import {
  Select,
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Checkbox,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

// query
import { useQuery } from "../../scripts/hooks";

// axios
import axios from "axios";

import moment from "moment";

// my context
import { useContext } from "react";
import { Context } from "../Screen";

export default function AddEventForm() {
  // context
  const { classroomListComplete, userId } = useContext(Context);

  // useQuery
  const query = useQuery();
  const classroomId = query.get("classroomId")
    ? query.get("classroomId")
    : null;
  const selectedDate = query.get("selectedDate")
    ? query.get("selectedDate")
    : null;

  // my states
  const [selectedTitle, setSelectedTitle] = useState("");
  const [location, setLocation] = useState("");
  const [selectedClassroomId, setSelectedClassroomId] = useState(
    classroomId ? classroomId : ""
  );
  const [selectedTimeFrom, setSelectedTimeFrom] = useState(null);
  const [selectedTimeTo, setSelectedTimeTo] = useState(null);
  const [recurring, setRecurring] = useState("not-recurring");

  function uploadEvent(e) {
    e.preventDefault();
    let body = {
      teacher_id: userId,
      title: selectedTitle,
      classroom_id: selectedClassroomId,
      from_time: selectedTimeFrom,
      to_time: selectedTimeTo,
      recurring: recurring,
      location: location,
    };
    axios
      .post(`http://localhost:3001/uploadEvent`, body)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  useEffect(() => {
    let selectedDateMomentTo = moment(selectedDate)
      .set("hour", 12)
      .set("minute", 0);
    let selectedDateMomentFrom = moment(selectedDate)
      .set("hour", 10)
      .set("minute", 0);
    setSelectedTimeTo(selectedDateMomentTo);
    setSelectedTimeFrom(selectedDateMomentFrom);
  }, []);

  return (
    <>
      <h1 style={{ margin: "2rem 0" }}>Programeaza un curs</h1>
      <form className="popup-form" onSubmit={uploadEvent}>
        <div className="row">
          <TextField
            id="title"
            label="Titlu"
            variant="outlined"
            fullWidth
            required
            multiline
            onChange={(event) => {
              setSelectedTitle(event.target.value);
            }}
          />
        </div>
        <div className="row">
          <TextField
            id="title"
            label="Locatie"
            variant="outlined"
            fullWidth
            required
            multiline
            onChange={(event) => {
              setLocation(event.target.value);
            }}
          />
        </div>
        <div className="row">
          <div className="col-50" style={{ paddingRight: "0.5rem" }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                label="De la"
                value={selectedTimeFrom}
                onChange={(event) => {
                  let eventTimeFrom = moment(event);
                  let eventTimeTo = moment(event).add(2, "hours");
                  setSelectedTimeFrom(eventTimeFrom);
                  setSelectedTimeTo(eventTimeTo);
                }}
                fullWidth
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
          <div className="col-50" style={{ paddingLeft: "0.5rem" }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                label="Pana la"
                value={selectedTimeTo}
                onChange={(event) => {
                  setSelectedTimeTo(event);
                }}
                fullWidth
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
        </div>
        <div className="row">
          <div className="col-50" style={{ paddingRight: "0.5rem" }}>
            <FormControl>
              <InputLabel id="classroom-id-label">Clasa</InputLabel>
              <Select
                labelId="classroom-id-label"
                id="classroom-id"
                label="Clasa"
                value={selectedClassroomId}
                onChange={(event) => {
                  setSelectedClassroomId(event.target.value);
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
          <div className="col-50" style={{ paddingLeft: "0.5rem" }}>
            <FormControl>
              <InputLabel id="recurring-label">Recurent</InputLabel>
              <Select
                labelId="recurring-label"
                id="recurring"
                label="Recurent"
                value={recurring}
                onChange={(event) => {
                  setRecurring(event.target.value);
                }}
              >
                <MenuItem value="not-recurring" key="not-recurring">
                  Nu se repeta
                </MenuItem>
                <MenuItem value="weekly" key="weekly">
                  Saptamanal
                </MenuItem>
                <MenuItem value="monthly" key="monthly">
                  Lunar
                </MenuItem>
                <MenuItem value="biweekly" key="biweekly">
                  Odata la doua saptamani
                </MenuItem>
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
