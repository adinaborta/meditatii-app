import React from "react";
import { Icon } from "@iconify/react";
import { filterListBySearch } from "../../scripts/helpers.js";

export function ListSearch({ listComplete, setInputValue, setList }) {
  function openInput() {
    let input = document.querySelector("#search-input");
    input.classList.toggle("active-search-input");
    setTimeout(() => {
      if (input) input.focus();
    }, 200);
  }

  return (
    <>
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
    </>
  );
}
