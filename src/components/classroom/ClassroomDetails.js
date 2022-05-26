import React from "react";

// frontend libraries
import { Menu, Dropdown } from "antd";
import { Icon } from "@iconify/react";

// router
import { useNavigate } from "react-router-dom";

export default function ClassroomDetails({ classroom }) {
  // useNavigate
  const navigate = useNavigate();

  return (
    <div className={`classroom-details item-details`}>
      <div
        className="inline-container"
        style={{ justifyContent: "space-between" }}
      >
        <h1>{classroom.name}</h1>
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item
                key="1"
                onClick={() =>
                  navigate(
                    `/calendar?openPopup=addEventOpen&classroomId=${classroom.classroom_id}`
                  )
                }
              >
                Adauga in calendar
              </Menu.Item>
              <Menu.Item key="2">Editeaza</Menu.Item>
            </Menu>
          }
          placement="bottomRight"
          trigger="click"
        >
          <div className="icon-container-medium outline-to-fill">
            <Icon icon="bi:three-dots" />
          </div>
        </Dropdown>
      </div>
      <h1>#{classroom.classroom_id}</h1>
      <h4>{classroom.subject}</h4>
      <h4>
        {classroom.teacher_name} {classroom.teacher_surname}
      </h4>

      <div
        className="inline-container"
        style={{
          color: "#0B001480",
          margin: "0.5rem 0",
        }}
      ></div>
    </div>
  );
}
