import React, { useState, useEffect, useContext } from "react";
import { Context } from "../Screen";
import { Icon } from "@iconify/react";
import { Menu, Dropdown } from "antd";
import { getLocation } from "../../scripts/helpers";
import { Comment, Tooltip, Avatar } from "antd";

// router
import { useNavigate, useLocation } from "react-router-dom";

export default function HomeworkDetails({
  homework,
  homeworkResponse,
  activeView,
}) {
  // useNavigate
  const navigate = useNavigate();
  const location = useLocation();

  // context
  const { role } = useContext(Context);

  return (
    <div
      className={`homework-details ${
        new Date(homework.deadline) < new Date() ? "overdue" : ""
      } homework-preview-slide`}
    >
      <div style={{ justifyContent: "space-between", position: "relative" }}>
        <div className="section">
          <h1>{homework.title}</h1>
          <div
            className="inline-container"
            style={{
              color: "#0B001480",
              margin: "0.5rem 0",
            }}
          >
            <div
              className="icon-container-small"
              style={{ marginRight: "0.5rem" }}
            >
              <Icon icon="simple-icons:googleclassroom" />
            </div>
            <h5
              style={{
                color: "#0B001480",
              }}
            >
              {homework.name}
            </h5>
          </div>

          <div style={{ position: "absolute", top: "0", right: "0" }}>
            {role === "student" && (
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item
                      key="1"
                      onClick={() =>
                        navigate(
                          getLocation(location, {
                            openPopup: "uploadHomeworkOpen",
                            homework_student_id: homework.homework_student_id,
                          })
                        )
                      }
                    >
                      Adauga un raspuns
                    </Menu.Item>
                    {/* <Menu.Item key="2">Marcheaza tema ca finalizata</Menu.Item> */}
                  </Menu>
                }
                placement="bottomRight"
                trigger="click"
              >
                <div className="icon-container-medium outline-to-fill">
                  <Icon icon="bi:three-dots" />
                </div>
              </Dropdown>
            )}
            {role === "teacher" && (
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item key="1">Sterge tema</Menu.Item>
                    <Menu.Item key="2">Editeaza tema</Menu.Item>
                    {
                      <Menu.Item
                        key="3"
                        onClick={() => {
                          navigate(
                            getLocation(location, {
                              openPopup: "noteHomework",
                            })
                          );
                        }}
                      >
                        Noteaza
                      </Menu.Item>
                    }
                  </Menu>
                }
                placement="bottomRight"
                trigger="click"
              >
                <div className="icon-container-medium outline-to-fill">
                  <Icon icon="bi:three-dots" />
                </div>
              </Dropdown>
            )}
          </div>

          <div
            className="inline-container"
            style={{
              color: "#0B001480",
              margin: "0.5rem 0",
            }}
          >
            <div
              className="icon-container-small"
              style={{ marginRight: "0.5rem" }}
            >
              <Icon icon="bi:clock" />
            </div>
            <h5 className="due-time">{homework.deadline}</h5>
          </div>
        </div>
      </div>
      {activeView === 2 &&
      (homeworkResponse.markup.length > 0 ||
        homeworkResponse.documents.length > 0) ? (
        <div className="section">
          {homeworkResponse && homeworkResponse.markup[0].emoji_src ? (
            <div>
              <h3 style={{ margin: "auto 0", marginRight: "1rem" }}>Nota:</h3>
              <div className="emoji-rating" style={{ margin: "1rem 0" }}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((val, i) => {
                  return (
                    <img
                      src={homeworkResponse.markup[0].emoji_src}
                      style={{
                        opacity:
                          val > homeworkResponse.markup[0].grade ? 0.5 : 1,
                      }}
                    />
                  );
                })}
              </div>
            </div>
          ) : (
            <h3 className="color-light">Nu a fost inca notata.</h3>
          )}
          {homeworkResponse &&
          homeworkResponse.markup[0].emoji_src &&
          homeworkResponse.markup[0].comment ? (
            <>
              <Comment
                author={<a>Profesor</a>}
                avatar={
                  <Avatar
                    src="https://joeschmoe.io/api/v1/random"
                    alt="Han Solo"
                  />
                }
                content={<p>{homeworkResponse.markup[0].comment}</p>}
              />
            </>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
      <div className="section">
        <h3 className="instructions">Instructiuni: </h3>
        <p style={{ margin: "0" }}>{homework.description}</p>
      </div>
    </div>
  );
}
