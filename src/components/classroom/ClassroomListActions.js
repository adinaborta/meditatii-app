//react
import React, { useState, useEffect } from "react";

// helpers
import {
  compareByClassroomId,
  compareByClassroomIdDesc,
  compareByName,
  compareByNameDesc,
} from "../../scripts/helpers.js";

// api
import { deleteItem } from "../../scripts/api";

// front end libraries
import { Icon } from "@iconify/react";
import { Popconfirm, message } from "antd";

// router
import { useNavigate } from "react-router-dom";

// my context
import { Context } from "../../components/Screen";
import { useContext } from "react";

// useQuery
import { useQuery } from "../../scripts/hooks";

export default function ClassroomListActions({ setList, selectedClassrooms }) {
  // useNavigate
  const navigate = useNavigate();

  // context
  const { classroomListComplete, userId } = useContext(Context);

  // useQuery
  const query = useQuery();
  const sortById = query.get("sortById") ? query.get("sortById") : false;
  const sortByName = query.get("sortByName") ? query.get("sortByName") : false;

  function sort(e) {
    if (e.currentTarget.id === "sort-by-id-button") {
      if (sortById === "asc") navigate(`/clase?sortById=des`);
      else navigate(`/clase?sortById=asc`);
    } else if (e.currentTarget.id === "sort-by-name-button") {
      if (sortByName === "asc") navigate(`/clase?sortByName=des`);
      else navigate(`/clase?sortByName=asc`);
    }
  }

  function deleteSelected() {
    if (selectedClassrooms.length) {
      selectedClassrooms.forEach((classroomId) => {
        deleteItem(
          `deleteClassroom?user_id=${userId}&classroom_id=${classroomId}`
        );
      });
    } else {
      message.error("Nu ati selectat nicio clasa.");
    }
  }

  function archiveSelected() {
    if (selectedClassrooms.length) {
    } else {
      message.error("Nu ati selectat nicio tema.");
    }
  }

  useEffect(() => {
    if (sortByName === "asc") {
      setList([...classroomListComplete.sort(compareByName)]);
    } else if (sortByName === "des") {
      setList([...classroomListComplete.sort(compareByNameDesc)]);
    } else if (sortById === "asc") {
      setList([...classroomListComplete.sort(compareByClassroomId)]);
    } else if (sortById === "des") {
      setList([...classroomListComplete.sort(compareByClassroomIdDesc)]);
    }
  }, [sortByName, sortById, classroomListComplete]);

  return (
    <>
      <div id="sort-action" className="list-action">
        <div className="row sort-buttons list-action-buttons">
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
            className={`list-action-button outline-to-fill sort-by-id-button ${
              sortById && "selected"
            } ${sortById === "des" && "des"}`}
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

      <div id="select-action" className="list-action">
        <div
          className="row sort-buttons list-action-buttons"
          style={{ alignItems: "center" }}
        >
          <h4 style={{ marginRight: "1rem" }}>Actiuni: </h4>{" "}
          <Popconfirm
            title={`Esti sigur ca vrei sa stergi ${selectedClassrooms.length} teme?`}
            okText="Da"
            cancelText="Nu"
            onConfirm={deleteSelected}
          >
            <div className="list-action-button outline-to-fill">
              <h5>Sterge</h5>
            </div>
          </Popconfirm>
          {/* <Popconfirm
            title={`Esti sigur ca vrei sa arhivezi ${selectedClassrooms.length} teme?`}
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
    </>
  );
}
