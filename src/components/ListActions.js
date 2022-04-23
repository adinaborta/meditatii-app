import React from "react";
import { Icon } from "@iconify/react";
import { filterListBySearch } from "../scripts/helpers.js";

export default function ListActions(props) {
  const { listComplete, setList, listClass, setInputValue, setOpen, addItem } =
    { ...props };
  function openInput() {
    let input = document.querySelector("#search-input");
    input.classList.toggle("active-search-input");
    setTimeout(() => {
      if (input) input.focus();
    }, 200);
  }
  function openListActions(e) {
    document
      .querySelector(`#${e.target.id}-action`)
      .classList.toggle("active-list-action");
  }

  function toggleListView() {
    document.querySelector(listClass).classList.toggle("details-view");
  }

  return (
    <>
      <div className="list-header">
        <div className="inline-container"></div>
        <div className="list-options-bar">
          <div
            className="icon-container-small search-icon black-to-green"
            onClick={openInput}
          >
            <Icon icon="bi:search" />
          </div>
          <input
            id="search-input"
            autoComplete="off"
            placeholder="Cauta..."
            onChange={(event) => {
              let substring = event.currentTarget.value.toLowerCase();
              setInputValue(substring);
              setList(filterListBySearch(substring, listComplete));
            }}
          />

          <h5 onClick={openListActions} id="filter" className="text-to-outline">
            Filtrare
          </h5>
          <h5 onClick={openListActions} id="sort" className="text-to-outline">
            Sortare
          </h5>
          <div className="icon-container-small black-to-green refresh-button">
            <Icon icon="iconoir:refresh" />
          </div>
          {/* <h5 onClick={openListActions} id="group" className="text-to-outline">
            Grupare
          </h5> */}
          {/* <h5 onClick={toggleListView} className="text-to-outline">
            Vizualizare
          </h5> */}
          {addItem !== "hide" && (
            <h5 onClick={() => setOpen(true)} className="fill">
              Adauga
            </h5>
          )}
        </div>
      </div>
      <div className="divider"></div>
      <div className="list-actions">{props.children}</div>
    </>
  );
}
