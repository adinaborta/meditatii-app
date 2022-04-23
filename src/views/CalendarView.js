import React, { useState, useEffect, useContext } from "react";
import { Calendar, Popover } from "antd";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { Context } from "../components/Screen";
import { getObjectByDate, getObjectByMonth } from "../scripts/helpers";

export default function CalendarView() {
  // context
  const { setPath, homeworkListComplete } = useContext(Context);
  const deadlineColor = "pink";
  function getListData(value) {
    let homeworks = getObjectByDate(value._d, homeworkListComplete, "deadline");
    let listData = [];
    homeworks.forEach((homework) => {
      let homeworkDeadline = new Date(homework.deadline);
      let color;
      if (homeworkDeadline.getTime() < new Date().getTime()) color = "red";
      else color = deadlineColor;
      listData.push({ ...homework, type: color });
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

    return listData || [];
  }

  function dateCellRender(value) {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => {
          return (
            <Popover
              content={
                <Link to={`/teme/vizualizare/${item.homework_id}`}>
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

  function monthCellRender(value) {
    const listData = getListDataMonth(value);
    return (
      <ul className="events">
        {listData.map((item) => {
          return (
            <Popover
              content={
                <Link to={`/teme/vizualizare/${item.homework_id}`}>
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

  useEffect(() => {
    setPath([{ route: "/calendar", header: "Calendar" }]);
  }, []);

  return (
    <div className="container scrollable-container">
      <Calendar
        dateCellRender={dateCellRender}
        monthCellRender={monthCellRender}
      />
    </div>
  );
}
