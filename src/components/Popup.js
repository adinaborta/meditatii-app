import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/add_item_form.css";

export default function Popup(props) {
  const navigate = useNavigate();
  return (
    <>
      {props.isOpen && (
        <div
          className="popup-form-exterior"
          id="popup-form-exterior"
          onClick={(e) => {
            if (e.target.id === "popup-form-exterior") {
              navigate(-1);
            }
          }}
        >
          <div className="popup-form-container">{props.children}</div>
        </div>
      )}
    </>
  );
}
