import React from "react";
import { Icon } from "@iconify/react";
import { keepOneActive } from "../scripts/helpers.js";
import { ListSearch } from "./listActions/ListSearch";

// router
import { useNavigate } from "react-router-dom";

// useBasePath
import { useBasePath } from "../scripts/hooks";

export default function ListActions(props) {
  const {
    listComplete,
    setList,
    setInputValue,
    openPopup,
    setSelectMode,
    listActions,
    title,
  } = { ...props };

  let path = useBasePath();

  // useNavigate
  const navigate = useNavigate();

  function openListActions(e) {
    let activeAction = document.querySelector(".active-list-action");
    let currentAction = document.querySelector(`#${e.currentTarget.id}-action`);
    console.log(e.currentTarget.id);

    let activeButton = document.querySelector(".list-options-bar .color-green");
    let currentButton = e.currentTarget;

    if (listActions.includes("select"))
      if (
        currentButton.id === "select" &&
        ![...currentButton.classList].includes("color-green")
      ) {
        setSelectMode(true);
      } else {
        setSelectMode(false);
      }

    keepOneActive(activeAction, currentAction, "active-list-action");
    keepOneActive(activeButton, currentButton, "color-green");
  }

  function toggleListView() {
    document.querySelector("list-container").classList.toggle("details-view");
  }

  function resetActions() {
    navigate(path);
  }

  return (
    <>
      <div className="list-header">
        <div className="inline-container">
          <h5>{title}</h5>
        </div>
        <div className="list-options-bar">
          {listActions.includes("search") && (
            <ListSearch
              listComplete={listComplete}
              setList={setList}
              setInputValue={setInputValue}
            />
          )}

          {listActions.includes("filter") && (
            <h5
              onClick={openListActions}
              id="filter"
              className="text-to-outline"
            >
              Filtrare
            </h5>
          )}

          {listActions.includes("sort") && (
            <h5 onClick={openListActions} id="sort" className="text-to-outline">
              Sortare
            </h5>
          )}

          {listActions.includes("select") && (
            <h5
              onClick={openListActions}
              id="select"
              className="text-to-outline"
            >
              Selectare
            </h5>
          )}

          {listActions.includes("group") && (
            <h5
              onClick={openListActions}
              id="group"
              className="text-to-outline"
            >
              Grupare
            </h5>
          )}

          {listActions.includes("view") && (
            <h5 onClick={toggleListView} className="text-to-outline">
              Vizualizare
            </h5>
          )}

          {/* <div
            className="icon-container-small black-to-green refresh-button refresh-button-visible"
            onClick={resetActions}
          >
            <Icon icon="iconoir:refresh" />
          </div> */}

          {listActions.includes("add") && (
            <h5 onClick={openPopup} className="fill">
              Adauga
            </h5>
          )}
        </div>
      </div>
      <div className="divider"></div>
      <div className="list-actions">{props.children ? props.children : ""}</div>
    </>
  );
}
