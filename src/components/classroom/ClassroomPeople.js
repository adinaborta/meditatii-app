// react
import React, { useState, useEffect } from "react";

// helpers
import { getClassroomUsers } from "../../scripts/api";

// iconify
import { Icon } from "@iconify/react";

// context
import { useContext } from "react";
import { Context } from "../../components/Screen";

export default function ClassroomPeople({
  classroomId,
  onClick,
  studentsOnly,
}) {
  // my states
  const [users, setUsers] = useState([]);

  // context
  const { userId } = useContext(Context);

  useEffect(() => {
    getClassroomUsers(userId, classroomId, setUsers, studentsOnly);
  }, []);

  return (
    <div className="container">
      {users.map((user, i) => {
        return (
          <div
            className="list-item-preview-container"
            key={i}
            onClick={(e) => {
              if (onClick) onClick(user.user_id);
            }}
          >
            <div className={`list-item-preview `}>
              <div className="list-item-content">
                <div
                  className="row"
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <div className="icon-container-bigger">
                    <Icon icon="bi:person-circle" />
                  </div>
                  <h3>
                    {user.name} {user.surname}
                  </h3>
                  <h3 style={{ marginLeft: "auto" }} className="color-light">
                    {user.role === "student" ? "Elev" : "Profesor"}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
