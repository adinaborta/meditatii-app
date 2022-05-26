import React, { useState, useEffect } from "react";
// iconify
import { Icon } from "@iconify/react";

// router
import { useNavigate } from "react-router-dom";

// my context
import { Context } from "../../components/Screen";
import { useContext } from "react";

export default function HomeworkListComponent({
  homeworkList,
  selectMode,
  handleClick,
}) {
  console.log(homeworkList);
  // router
  const navigate = useNavigate();

  const [homeworkListDone, setHomeworkListDone] = useState([]);
  const [homeworkListNotDone, setHomeworkListNotDone] = useState([]);

  // context
  const { role, classroomListComplete, homeworkListComplete } =
    useContext(Context);

  useEffect(() => {
    let homeworkListDoneTemp = [];
    let homeworkListNotDoneTemp = [];
    homeworkList.forEach((homework) => {
      if (homework.nr_of_responses > 0) {
        homeworkListDoneTemp.push(homework);
      } else {
        homeworkListNotDoneTemp.push(homework);
      }
    });
    setHomeworkListDone(homeworkListDoneTemp);
    setHomeworkListNotDone(homeworkListNotDoneTemp);
  }, [homeworkList]);

  return (
    <>
      {role === "student" && homeworkListNotDone.length ? (
        <div className="list-container details-view">
          <h2>De facut: </h2>
          {homeworkListNotDone.map(
            (
              {
                title,
                description,
                deadline,
                subject,
                name,
                homework_id,
                classroom_id,
                nr_of_responses,
              },
              i
            ) => {
              return (
                <div className="list-item-preview-container" key={i}>
                  {/* <div className="pin" onClick={pinHomework}>
                <div className="icon-container">
                  <Icon icon="bi:pin-angle" />
                </div>
              </div> */}
                  <div
                    className={`list-item-preview 
                ${
                  new Date(deadline).getTime() < new Date().getTime()
                    ? "overdue-preview"
                    : ""
                } 
                ${selectMode ? "not-selected-list-item" : ""}`}
                    id={homework_id}
                    onClick={handleClick}
                  >
                    <div className="list-item-content">
                      <div className="row homework-row-main-info">
                        <h3>{title}</h3>
                        <div
                          className="inline-container due-time"
                          style={{
                            color: "#0B001480",
                          }}
                        >
                          <div className="icon-container-small">
                            <Icon icon="bi:clock" />
                          </div>
                          <h5 className="due-time">{deadline}</h5>
                        </div>
                      </div>
                      <div className="row homework-row-description">
                        <h4 className="color-light">
                          In #{classroom_id} / {name}
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
          )}
        </div>
      ) : (
        ""
      )}

      {role === "student" &&
      homeworkListNotDone.length &&
      homeworkListDone.length ? (
        <div className="divider"></div>
      ) : (
        ""
      )}

      {role === "student" && homeworkListDone.length ? (
        <div className="list-container details-view">
          <h2>Finalizate: </h2>
          {homeworkListDone.map(
            (
              {
                title,
                description,
                deadline,
                subject,
                name,
                homework_id,
                classroom_id,
                nr_of_responses,
              },
              i
            ) => {
              return (
                <div className="list-item-preview-container" key={i}>
                  <div
                    className={`list-item-preview 
                ${selectMode ? "not-selected-list-item" : ""}`}
                    id={homework_id}
                    onClick={handleClick}
                  >
                    <div className="list-item-content">
                      <div className="row homework-row-main-info">
                        <h3>{title}</h3>
                        <div
                          className="inline-container due-time"
                          style={{
                            color: "#0B001480",
                          }}
                        >
                          <div className="icon-container-small">
                            <Icon icon="bi:clock" />
                          </div>
                          <h5 className="due-time">{deadline}</h5>
                        </div>
                      </div>
                      <div className="row homework-row-description">
                        <h4 className="color-light">
                          In #{classroom_id} / {name}
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
          )}
        </div>
      ) : (
        ""
      )}
      {role === "teacher" && homeworkList.length ? (
        <div className="list-container details-view">
          {homeworkList.map(
            (
              {
                title,
                description,
                deadline,
                subject,
                name,
                homework_id,
                classroom_id,
                nr_of_responses,
              },
              i
            ) => {
              return (
                <div className="list-item-preview-container" key={i}>
                  <div
                    className={`list-item-preview 
                    ${selectMode ? "not-selected-list-item" : ""}`}
                    id={homework_id}
                    onClick={handleClick}
                  >
                    <div className="list-item-content">
                      <div className="row homework-row-main-info">
                        <h3>{title}</h3>
                        <div
                          className="inline-container due-time"
                          style={{
                            color: "#0B001480",
                          }}
                        >
                          <div className="icon-container-small">
                            <Icon icon="bi:clock" />
                          </div>
                          <h5 className="due-time">{deadline}</h5>
                        </div>
                      </div>
                      <div className="row homework-row-description">
                        <h4 className="color-light">
                          In #{classroom_id} / {name}
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
          )}
        </div>
      ) : (
        ""
      )}
    </>
  );
}
