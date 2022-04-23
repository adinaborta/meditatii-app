import React from "react";
import "../styles/add_item_form.css";

export default function AddItem(props) {
  return (
    <>
      {props.open && (
        <div
          className="popup-form-exterior"
          id="popup-form-exterior"
          onClick={(e) => {
            if (e.target.id === "popup-form-exterior") {
              props.setOpen(false);
            }
          }}
        >
          <div className="popup-form-container">{props.children}</div>
        </div>
      )}
    </>
  );
}
