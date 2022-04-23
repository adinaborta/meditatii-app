import React, { useState, useEffect } from "react";
import { FormControl, TextField, Box } from "@mui/material";
import { Icon } from "@iconify/react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {
  filterListByProps,
  filterListByDateInterval,
  compareByTitle,
  compareByTitleDesc,
  compareByDeadline,
  compareByDeadlineDesc,
} from "../scripts/helpers.js";

export default function HomeworkFilters({
  classroomListComplete,
  setList,
  homeworkListComplete,
  homeworkList,
}) {
  const [fromDeadline, setFromDeadline] = useState(null);
  const [toDeadline, setToDeadline] = useState(null);
  const [filterDate, setFilterDate] = useState(false);
  const [filterClassroom, setFilterClassroom] = useState(false);
  const [sortByName, setSortByName] = useState(false);
  const [sortByDeadline, setSortByDeadline] = useState(false);
  function setActiveFilter(e) {
    let container = document.querySelector(
      `.filter-by-${e.currentTarget.id}-container`
    );
    let button = document.querySelector(
      `.filter-by-${e.currentTarget.id}-button`
    );
    let currentActiveContainer = document.querySelector(".active-filter-by");
    let currentActiveButton = document.querySelector(
      ".list-action-button.selected"
    );
    if (currentActiveContainer) {
      if (currentActiveContainer === container) {
        container.classList.remove("active-filter-by");
        button.classList.remove("selected");
      } else {
        currentActiveContainer.classList.remove("active-filter-by");
        currentActiveButton.classList.remove("selected");
        container.classList.add("active-filter-by");
        button.classList.add("selected");
      }
    } else {
      container.classList.add("active-filter-by");
      button.classList.add("selected");
    }
  }

  function filter() {
    let values = [];
    let listTemp = [...homeworkList];
    if (filterClassroom || filterDate) {
      document
        .querySelectorAll(".filter-by-classroom-tag.selected")
        .forEach((tag) => {
          values.push(parseInt(tag.id));
        });
      console.log(values);
      if (values.length)
        listTemp = filterListByProps("classroom_id", values, homeworkList);

      if (filterDate) {
        listTemp = filterListByDateInterval(
          "deadline",
          fromDeadline,
          toDeadline,
          listTemp
        );
      }
      setList(listTemp);
    }
  }

  function sort(e) {
    if (e.currentTarget.id === "sort-by-deadline-button") {
      setSortByName(false);
      if (sortByDeadline === false || sortByDeadline === "-") {
        setSortByDeadline("+");
      } else if (sortByDeadline === "+") {
        setSortByDeadline("-");
      }
    } else if (e.currentTarget.id === "sort-by-name-button") {
      setSortByDeadline(false);
      if (sortByName === false || sortByName === "-") {
        setSortByName("+");
      } else if (sortByName === "+") {
        setSortByName("-");
      }
    }
  }

  useEffect(() => {
    if (fromDeadline && toDeadline) {
      setFilterDate(true);
    } else {
      setFilterDate(false);
    }
  }, [fromDeadline, toDeadline]);

  function resetActions() {
    document
      .querySelectorAll("#filter-action .selected")
      .forEach((selected) => {
        selected.classList.remove("selected");
      });
    document.querySelectorAll(".active-filter-by").forEach((selected) => {
      selected.classList.remove("active-filter-by");
    });
    setFilterClassroom(false);
    setFilterDate(false);
    setToDeadline(null);
    setFromDeadline(null);
    setSortByName(false);
    setSortByDeadline(false);
    setList([...homeworkListComplete]);
  }

  useEffect(() => {
    if (sortByName === "+") {
      setList([...homeworkList.sort(compareByTitle)]);
    } else if (sortByName === "-") {
      setList([...homeworkList.sort(compareByTitleDesc)]);
    } else if (sortByDeadline === "+") {
      setList([...homeworkList.sort(compareByDeadline)]);
    } else if (sortByDeadline === "-") {
      setList([...homeworkList.sort(compareByDeadlineDesc)]);
    }
  }, [sortByName, sortByDeadline]);

  useEffect(() => {
    document
      .querySelector(".refresh-button")
      .addEventListener("click", resetActions);
    return () => {
      if (document.querySelector(".refresh-button"))
        document
          .querySelector(".refresh-button")
          .removeEventListener("click", resetActions);
    };
  }, []);

  useEffect(() => {
    if (sortByName || sortByDeadline || filterDate || filterClassroom) {
      document
        .querySelector(".refresh-button")
        .classList.add("refresh-button-visible");
    } else {
      document
        .querySelector(".refresh-button")
        .classList.remove("refresh-button-visible");
    }
  }, [sortByName, sortByDeadline, filterDate, filterClassroom]);

  return (
    <>
      <div id="filter-action" className="list-action">
        <div className="row filter-buttons list-action-buttons">
          <div
            className="filter-by-classroom-button list-action-button outline-to-fill"
            id="classroom"
            onClick={setActiveFilter}
          >
            <h5>Clasa</h5>
          </div>
          <div
            className="filter-by-deadline-button list-action-button outline-to-fill"
            id="deadline"
            onClick={setActiveFilter}
          >
            <h5>Deadline</h5>
          </div>

          <div className="save-filters-button list-action-button">
            <h5 className="text-to-fill" onClick={filter}>
              Filtreaza
            </h5>
          </div>
        </div>
        <div className="row filters-row">
          <div className="filter-by-classroom-container filter-by-container">
            {classroomListComplete.map(({ classroom_id, name }) => {
              return (
                <div
                  className="outline-to-fill tag filter-by-classroom-tag"
                  id={classroom_id}
                  onClick={(e) => {
                    e.target.classList.toggle("selected");
                    setFilterClassroom(
                      document.querySelectorAll(
                        ".filter-by-classroom-tag.selected"
                      ).length > 0
                    );
                  }}
                  key={classroom_id}
                >
                  #{classroom_id} {name}
                </div>
              );
            })}
          </div>
          <div className="filter-by-deadline-container filter-by-container row">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="De la"
                value={fromDeadline}
                onChange={(e) => {
                  setFromDeadline(e);
                }}
                minDateTime={new Date().getTime() + 3500000}
                renderInput={(params) => <TextField {...params} />}
              />
              <div style={{ width: "1rem" }}></div>
              <DatePicker
                label="Pana la"
                value={toDeadline}
                minDate={fromDeadline}
                onChange={(e) => {
                  setToDeadline(e);
                }}
                minDateTime={new Date().getTime() + 3500000}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
        </div>
        <div className="divider" style={{ marginTop: "1rem" }}></div>
      </div>
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
            className={`list-action-button outline-to-fill sort-by-deadline-button ${
              sortByDeadline && "selected"
            } ${sortByDeadline === "-" && "desc"}`}
            id="sort-by-deadline-button"
            onClick={sort}
          >
            <h5>Deadline</h5>
            <div className="icon-container-small deadline-sort-icon sort-icon">
              <Icon icon="akar-icons:chevron-right" />
            </div>
          </div>
        </div>
        <div className="divider" style={{ marginTop: "1rem" }}></div>
      </div>
      {/* <div id="group-action" className="list-action"></div> */}
    </>
  );
}
