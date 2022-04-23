import React, { useState, useEffect, useContext } from "react";
import { Context } from "../components/Screen";
import { Icon } from "@iconify/react";
import { useParams } from "react-router-dom";
import { getIdxOfHomeworkById } from "../scripts/helpers.js";
import { Link } from "react-router-dom";

export default function HomeworkSlide(props) {
  const { homeworkId } = useParams();
  const [homework, setHomework] = useState([]);
  const { homeworkListComplete, setPath } = useContext(Context);

  useEffect(() => {
    let homeworkIdx = getIdxOfHomeworkById(homeworkId, homeworkListComplete);
    setHomework(homeworkListComplete[homeworkIdx]);
  }, [homeworkListComplete]);

  useEffect(() => {
    if (homework)
      setPath([
        { route: "/teme", header: "Teme" },
        {
          route: `/teme/vizualizare/${homeworkId}`,
          header: homework.title,
        },
      ]);
  }, [homework]);

  return (
    <div className="container scrollable-container">
      {homework && (
        <div
          className={`homework-details ${
            new Date(homework.deadline) < new Date() ? "overdue" : ""
          } homework-preview-slide`}
        >
          <h1>
            {homework.title} - {homework.name}
          </h1>
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
          <h3 className="instructions">Instructiuni: </h3>
          <p style={{ margin: "0" }}>{homework.description}</p>
        </div>
      )}

      {/* <Link
        to={
          parseInt(homeworkIdx) === homeworkListComplete.length - 1
            ? `/teme/vizualizare/0`
            : `/teme/vizualizare/${parseInt(homeworkIdx) + 1}`
        }
      >
        <div
          className="icon-container-big outline-to-fill next-button"
          id="next-button"
        >
          <Icon icon="akar-icons:chevron-right" />
        </div>
      </Link>
      <Link
        to={
          parseInt(homeworkIdx) === 0
            ? `/teme/vizualizare/${homeworkListComplete.length - 1}`
            : `/teme/vizualizare/${parseInt(homeworkIdx) - 1}`
        }
      >
        <div
          className="icon-container-big outline-to-fill prev-button"
          id="prev-button"
        >
          <Icon icon="akar-icons:chevron-right" />
        </div>
      </Link> */}
    </div>
  );
}
