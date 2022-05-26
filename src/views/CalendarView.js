import React, { useState, useEffect } from "react";
import { Calendar, Popover } from "antd";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

import { useContext } from "react";
import { Context } from "../components/Screen";

import {
  getLocation,
  getObjectByDate,
  getObjectByMonth,
} from "../scripts/helpers";
import moment from "moment";
import axios from "axios";

// router
import { useNavigate, useLocation } from "react-router-dom";

export default function CalendarView() {
  // context
  const { homeworkListComplete, userId, role } = useContext(Context);

  const deadlineColor = "pink";
  const courseColor = "blue";
  // my states
  const [selectedDate, setSelectedDate] = useState(moment);
  const [selectedCourseColor, setSelectedCourseColor] = useState(courseColor);
  const [eventsListComplete, setEventsListComplete] = useState(null);

  // useNavigate
  const navigate = useNavigate();
  const location = useLocation();

  function getListData(value) {
    let homeworks = getObjectByDate(value._d, homeworkListComplete, "deadline");
    let listData = { homeworks: [], events: [] };
    homeworks.forEach((homework) => {
      let homeworkDeadline = new Date(homework.deadline);
      let color;
      if (homeworkDeadline.getTime() < new Date().getTime()) color = "red";
      else color = deadlineColor;
      listData.homeworks.push({ ...homework, type: color });
    });

    let events = getObjectByDate(value._d, eventsListComplete, "from_time");
    events.forEach((event) => {
      listData.events.push({ ...event, type: courseColor });
    });

    return listData || [];
  }

  function getListDataMonth(value) {
    let homeworks = getObjectByMonth(
      value._d,
      homeworkListComplete,
      "deadline"
    );

    let listData = [];
    homeworks.forEach((homework) => {
      let homeworkDeadline = new Date(homework.deadline);
      let color;
      if (homeworkDeadline.getTime() < new Date().getTime()) color = "red";
      else color = deadlineColor;
      listData.push({ ...homework, type: color });
    });

    let events = getObjectByDate(value._d, eventsListComplete, "from_time");
    events.forEach((event) => {
      listData.push({ ...event, type: courseColor });
    });

    return listData || [];
  }

  function dateCellRender(value) {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.homeworks.map((item) => {
          return (
            <Popover
              content={
                <Link to={`/teme/vizualizare?homeworkId=${item.homework_id}`}>
                  <div className="inline-container">
                    <h5> Mergi la tema {item.title}</h5>
                    <div
                      className="icon-container-small"
                      style={{
                        marginLeft: "0.3rem",
                      }}
                    >
                      <Icon icon="akar-icons:chevron-right" />
                    </div>
                  </div>
                </Link>
              }
            >
              <div
                key={item.content}
                className={`calendar-tag ant-badge-status-${item.type}`}
              >
                <div
                  className="inline-container"
                  style={{
                    color: "#0B001480",
                  }}
                >
                  <div
                    className="icon-container-small"
                    style={{
                      marginRight: "0.3rem",
                    }}
                  >
                    <Icon icon="bi:clock" />
                  </div>
                  <h5>{item.title} </h5>
                </div>
              </div>
            </Popover>
          );
        })}
        {listData.events.map((item) => {
          return (
            <Popover
              content={
                <div>
                  <h3>{item.title}</h3>
                  <div
                    className="inline-container"
                    style={{
                      color: "#0B001480",
                      margin: "0.5rem 0",
                    }}
                  >
                    <h5 style={{ width: "50px" }}> De la: </h5>
                    <div
                      className="icon-container-small"
                      style={{ marginRight: "0.5rem" }}
                    >
                      <Icon icon="bi:clock" />
                    </div>
                    <h5 className="due-time">{item.from_time}</h5>
                  </div>
                  <div
                    className="inline-container"
                    style={{
                      color: "#0B001480",
                      margin: "0.5rem 0",
                    }}
                  >
                    <h5 style={{ width: "50px" }}> Pana la: </h5>
                    <div
                      className="icon-container-small"
                      style={{ marginRight: "0.5rem" }}
                    >
                      <Icon icon="bi:clock" />
                    </div>
                    <h5 className="due-time">{item.to_time} </h5>
                  </div>
                  <div
                    className="inline-container"
                    style={{
                      color: "#0B001480",
                      margin: "0.5rem 0",
                    }}
                  >
                    <h5 style={{ width: "50px" }}> Pana la: </h5>
                    <div
                      className="icon-container-small"
                      style={{ marginRight: "0.5rem" }}
                    >
                      <Icon icon="carbon:location-filled" />
                    </div>
                    <h5 className="due-time">
                      <a href={item.location}>Locatie</a>{" "}
                    </h5>
                  </div>
                </div>
              }
            >
              <div
                key={item.content}
                className={`calendar-tag ant-badge-status-${item.type}`}
              >
                <div
                  className="inline-container"
                  style={{
                    color: "#0B001480",
                  }}
                >
                  <div
                    className="icon-container-small"
                    style={{
                      marginRight: "0.3rem",
                    }}
                  >
                    <Icon icon="bxs:video" />
                  </div>
                  <h5>{item.title} </h5>
                </div>
              </div>
            </Popover>
          );
        })}
      </ul>
    );
  }

  function monthCellRender(value) {
    const listData = getListDataMonth(value);
    return (
      <ul className="events">
        {listData.map((item) => {
          return (
            <Popover
              content={
                <Link to={`/teme/vizualizare?homeworkId=${item.homework_id}`}>
                  <div className="inline-container">
                    <h5> Mergi la tema {item.title}</h5>
                    <div
                      className="icon-container-small"
                      style={{
                        marginLeft: "0.3rem",
                      }}
                    >
                      <Icon icon="akar-icons:chevron-right" />
                    </div>
                  </div>
                </Link>
              }
            >
              <div
                key={item.content}
                className={`calendar-tag ant-badge-status-${item.type}`}
              >
                <div
                  className="inline-container"
                  style={{
                    color: "#0B001480",
                  }}
                >
                  <div
                    className="icon-container-small"
                    style={{
                      marginRight: "0.3rem",
                    }}
                  >
                    <Icon icon="bi:clock" />
                  </div>
                  <h5>{item.title} </h5>
                </div>
              </div>
            </Popover>
          );
        })}
      </ul>
    );
  }

  async function getEvents() {
    await axios
      .get(`http://localhost:3001/getEventsForUser?user_id=${userId}`)
      .then(function (response) {
        setEventsListComplete(response.data.responseData);
      });
  }

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <>
      <div
        className="container scrollable-container"
        style={{ position: "relative" }}
      >
        {role === "teacher" ? (
          <div
            className="icon-container-big outline-to-fill"
            style={{ position: "absolute", top: "2rem", left: "2rem" }}
            onClick={() =>
              navigate(
                getLocation(location, {
                  openPopup: "addEventOpen",
                  selectedDate: selectedDate._d,
                })
              )
            }
          >
            <Icon icon="akar-icons:plus" />
          </div>
        ) : (
          ""
        )}
        {eventsListComplete && (
          <Calendar
            value={selectedDate}
            onSelect={(value) => {
              setSelectedDate(value);
            }}
            dateCellRender={dateCellRender}
            monthCellRender={monthCellRender}
          />
        )}
      </div>
    </>
  );
}
