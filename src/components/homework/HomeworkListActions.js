// react
import React, { useState, useEffect } from "react";

// frontend
import { TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Popconfirm, message } from "antd";
import { Icon } from "@iconify/react";

// helpers
import {
  filterListByProps,
  filterListByDateInterval,
  compareByTitle,
  compareByTitleDesc,
  compareByDeadline,
  compareByDeadlineDesc,
} from "../../scripts/helpers.js";

// api
import { deleteItem, getHomeworkList } from "../../scripts/api";

// router
import { useNavigate } from "react-router-dom";

// query
import { useQuery } from "../../scripts/hooks";

// my context
import { Context } from "../../components/Screen";
import { useContext } from "react";

export default function HomeworkListActions({
  homeworkList,
  setList,
  selectedHomeworks,
}) {
  // useQuery
  const query = useQuery();
  const sortByDeadline = query.get("sortByDeadline")
    ? query.get("sortByDeadline")
    : false;
  const sortByName = query.get("sortByName") ? query.get("sortByName") : false;
  const fromDeadline = query.get("fromDeadline")
    ? query.get("fromDeadline")
    : null;
  const toDeadline = query.get("toDeadline") ? query.get("toDeadline") : null;
  const classes = query.get("classes") ? query.get("classes") : null;

  // context
  const { classroomListComplete, homeworkListComplete, userId } =
    useContext(Context);

  // useNavigate
  const navigate = useNavigate();

  // my states
  const [fromDeadlineLocal, setFromDeadlineLocal] = useState(fromDeadline);
  const [toDeadlineLocal, setToDeadlineLocal] = useState(toDeadline);

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
    let classes = [];
    let link = "/teme?";
    if (sortByName) {
      link += "sortByName=" + sortByName;
    } else if (sortByDeadline) {
      link += "sortByDeadline=" + sortByDeadline;
    }
    if (fromDeadlineLocal || toDeadlineLocal || classes) {
      document
        .querySelectorAll(".filter-by-classroom-tag.selected")
        .forEach((tag) => {
          classes.push(parseInt(tag.id));
        });
      if (classes.length) {
        link += "&classes=";
        classes.forEach((value, i) => {
          if (i === 0) link += value;
          else link += "," + value;
        });
      }
      if (fromDeadlineLocal && toDeadlineLocal) {
        link += `&fromDeadline=${fromDeadlineLocal}&toDeadline=${toDeadlineLocal}`;
      }
      navigate(link);
    }
  }

  function sort(e) {
    let link = `/teme?`;
    if (classes) {
      link += "classes=" + classes;
    }
    if (fromDeadline) {
      link += "&fromDeadline=" + fromDeadline;
    }
    if (toDeadline) {
      link += "&toDeadline=" + toDeadline;
    }
    if (e.currentTarget.id === "sort-by-deadline-button") {
      if (sortByDeadline === "asc") navigate(`${link}&sortByDeadline=des`);
      else navigate(`${link}&sortByDeadline=asc`);
    } else if (e.currentTarget.id === "sort-by-name-button") {
      if (sortByName === "asc") navigate(`${link}&sortByName=des`);
      else navigate(`${link}&sortByName=asc`);
    }
  }

  function deleteSelected() {
    if (selectedHomeworks.length) {
      selectedHomeworks.forEach((homeworkId) => {
        deleteItem(
          `deleteHomework?user_id=${userId}&homework_id=${homeworkId}`
        );
      });
    } else {
      message.error("Nu ati selectat nicio tema.");
    }
  }

  function archiveSelected() {
    if (selectedHomeworks.length) {
    } else {
      message.error("Nu ati selectat nicio tema.");
    }
  }

  useEffect(() => {
    let listTemp = [...homeworkListComplete];
    if (fromDeadline && toDeadline) {
      listTemp = [
        ...filterListByDateInterval(
          "deadline",
          fromDeadline,
          toDeadline,
          listTemp
        ),
      ];
    }
    if (classes) {
      let classesTemp = classes.split(",").map((c) => {
        return parseInt(c);
      });
      listTemp = [...filterListByProps("classroom_id", classes, listTemp)];
    }
    if (sortByName === "asc") {
      console.log([...homeworkList]);
      listTemp = [...listTemp.sort(compareByTitle)];
    } else if (sortByName === "des") {
      listTemp = [...listTemp.sort(compareByTitleDesc)];
    } else if (sortByDeadline === "asc") {
      listTemp = [...listTemp.sort(compareByDeadline)];
    } else if (sortByDeadline === "des") {
      listTemp = [...listTemp.sort(compareByDeadlineDesc)];
    }
    setList(listTemp);
  }, [
    sortByName,
    sortByDeadline,
    fromDeadline,
    toDeadline,
    classes,
    homeworkListComplete,
  ]);

  return (
    <>
      <div id="filter-action" className="list-action">
        <div
          className="row filter-buttons list-action-buttons"
          style={{ alignItems: "center" }}
        >
          <h4 style={{ marginRight: "1rem" }}>Filtreaza dupa: </h4>
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
            <h5 className="fill" onClick={filter}>
              Salveaza
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
                value={fromDeadlineLocal}
                onChange={(e) => {
                  setFromDeadlineLocal(e);
                }}
                minDateTime={new Date().getTime() + 3500000}
                renderInput={(params) => <TextField {...params} />}
              />
              <div style={{ width: "1rem" }}></div>
              <DatePicker
                label="Pana la"
                value={toDeadlineLocal}
                minDate={fromDeadlineLocal}
                onChange={(e) => {
                  setToDeadlineLocal(e);
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
        <div
          className="row sort-buttons list-action-buttons"
          style={{ alignItems: "center" }}
        >
          <h4 style={{ marginRight: "1rem" }}>Sorteaza dupa: </h4>
          <div
            className={`list-action-button outline-to-fill sort-by-name-button ${
              sortByName && "selected"
            } ${sortByName === "des" && "des"}`}
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
            } ${sortByDeadline === "des" && "des"}`}
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

      <div id="select-action" className="list-action">
        <div
          className="row sort-buttons list-action-buttons"
          style={{ alignItems: "center" }}
        >
          <h4 style={{ marginRight: "1rem" }}>Actiuni: </h4>{" "}
          <Popconfirm
            title={`Esti sigur ca vrei sa stergi ${selectedHomeworks.length} teme?`}
            okText="Da"
            cancelText="Nu"
            onConfirm={deleteSelected}
          >
            <div className="list-action-button outline-to-fill">
              <h5>Sterge</h5>
            </div>
          </Popconfirm>
          {/* <Popconfirm
            title={`Esti sigur ca vrei sa arhivezi ${selectedHomeworks.length} teme?`}
            okText="Da"
            cancelText="Nu"
            onConfirm={archiveSelected}
          >
            <div className="list-action-button outline-to-fill">
              <h5>Arhiveaza</h5>
            </div>
          </Popconfirm> */}
        </div>
        <div className="divider" style={{ marginTop: "1rem" }}></div>
      </div>
      {/* <div id="group-action" className="list-action"></div> */}
    </>
  );
}
