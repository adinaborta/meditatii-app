import React, { useState, useEffect } from "react";
import { FormControl, TextField, Box } from "@mui/material";
import { Icon } from "@iconify/react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {
  compareByClassroomId,
  compareByClassroomIdDesc,
  compareByName,
  compareByNameDesc,
} from "../scripts/helpers.js";

export default function ClassroomFilters({ classroomListComplete, setList }) {
  const [sortByName, setSortByName] = useState(false);
  const [sortById, setSortById] = useState(false);

  function sort(e) {
    if (e.currentTarget.id === "sort-by-id-button") {
      setSortByName(false);
      if (sortById === false || sortById === "-") {
        setSortById("+");
      } else if (sortById === "+") {
        setSortById("-");
      }
    } else if (e.currentTarget.id === "sort-by-name-button") {
      setSortById(false);
      if (sortByName === false || sortByName === "-") {
        setSortByName("+");
      } else if (sortByName === "+") {
        setSortByName("-");
      }
    }
  }

  function resetActions() {
    document
      .querySelectorAll("#filter-action .selected")
      .forEach((selected) => {
        selected.classList.remove("selected");
      });
    document.querySelectorAll(".active-filter-by").forEach((selected) => {
      selected.classList.remove("active-filter-by");
    });
    setSortByName(false);
    setSortById(false);
    setList([...classroomListComplete]);
  }

  useEffect(() => {
    if (sortByName === "+") {
      setList([...classroomListComplete.sort(compareByName)]);
    } else if (sortByName === "-") {
      setList([...classroomListComplete.sort(compareByNameDesc)]);
    } else if (sortById === "+") {
      setList([...classroomListComplete.sort(compareByClassroomId)]);
    } else if (sortById === "-") {
      setList([...classroomListComplete.sort(compareByClassroomIdDesc)]);
    }
  }, [sortByName, sortById]);

  useEffect(() => {
    document
      .querySelector(".refresh-button")
      .addEventListener("click", resetActions);
    document.querySelector("#filter").style.display = "none";
    return () => {
      if (document.querySelector(".refresh-button"))
        document
          .querySelector(".refresh-button")
          .removeEventListener("click", resetActions);
    };
  }, []);

  useEffect(() => {
    if (sortByName || sortById) {
      document
        .querySelector(".refresh-button")
        .classList.add("refresh-button-visible");
    } else {
      document
        .querySelector(".refresh-button")
        .classList.remove("refresh-button-visible");
    }
  }, [sortByName, sortById]);

  return (
    <>
      <div id="sort-action" className="list-action">
        <div className="row sort-buttons list-action-buttons">
          <div
            className={`list-action-button outline-to-fill sort-by-name-button ${
              sortByName && "selected"
            } ${sortByName === "-" && "desc"}`}
            id="sort-by-name-button"
            onClick={sort}
          >
            <h5>Nume</h5>
            <div className="icon-container-small name-sort-icon sort-icon">
              <Icon icon="akar-icons:chevron-right" />
            </div>
          </div>
          <div
            className={`list-action-button outline-to-fill sort-by-id-button ${
              sortById && "selected"
            } ${sortById === "-" && "desc"}`}
            id="sort-by-id-button"
            onClick={sort}
          >
            <h5>Id clasa</h5>
            <div className="icon-container-small id-sort-icon sort-icon">
              <Icon icon="akar-icons:chevron-right" />
            </div>
          </div>
        </div>
        <div className="divider" style={{ marginTop: "1rem" }}></div>
      </div>
    </>
  );
}
