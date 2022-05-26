import React from "react";
import { Icon } from "@iconify/react";
import "../styles/sidebar.css";
import { Link } from "react-router-dom";
export default function Sidebar() {
  function toggleSidebar() {
    document
      .querySelector(".sidebar-container")
      .classList.toggle("sidebar-container-closed");
  }
  return (
    <div className="sidebar-container">
      <div className="toggle-sidebar" onClick={toggleSidebar}>
        <div className="icon-container">
          <Icon icon="ic:baseline-keyboard-arrow-right" />
        </div>
      </div>
      <div className="sidebar-tab" style={{ marginBottom: "1rem" }}>
        <div className="icon-container">
          <Icon icon="bi:person-circle" />
        </div>
        <h5>Profil</h5>
      </div>
      <Link to="/teme">
        <div className="sidebar-tab">
          <div className="icon-container">
            <Icon icon="fa-solid:clipboard-list" />
          </div>
          <h5>Teme</h5>
        </div>
      </Link>
      {/* <div className="sidebar-tab">
        <div className="icon-container">
          <Icon icon="fluent:clipboard-task-list-rtl-24-filled" />
        </div>
        <h5>Teste</h5>
      </div> */}
      <Link to="/clase">
        <div className="sidebar-tab">
          <div className="icon-container">
            <Icon icon="simple-icons:googleclassroom" />
          </div>
          <h5>Clase</h5>
        </div>
      </Link>
      {/* <div className="sidebar-tab">
        <div className="icon-container">
          <Icon icon="bxs:book-bookmark" />
        </div>
        <h5>Materiale</h5>
      </div> */}
      <Link to="/calendar">
        <div className="sidebar-tab">
          <div className="icon-container">
            <Icon icon="fa6-solid:calendar-days" />
          </div>
          <h5>Calendar</h5>
        </div>
      </Link>
    </div>
  );
}
