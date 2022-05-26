import React, { useState, useEffect, useContext } from "react";
import { Context } from "../components/Screen";
import { useNavigate } from "react-router-dom";
import UploadHomeworkResponse from "../components/homework/UploadHomeworkResponse";
import HomeworkDetails from "../components/homework/HomeworkDetails";
import ClassroomPeople from "../components/classroom/ClassroomPeople";
import { getIdxOfHomeworkById } from "../scripts/helpers.js";
import { useQuery } from "../scripts/hooks";
import axios from "axios";

// helpers
import { getClassroomUsers } from "../scripts/api";

// router
import { Link, useLocation } from "react-router-dom";

// useBasePath
import { useBasePath } from "../scripts/hooks";
import HomeworkResponse from "../components/homework/HomeworkResponse";

export default function HomeworkSlide(props) {
  // useNavigate
  const navigate = useNavigate();
  const location = useLocation();

  // useQuery
  const query = useQuery();
  const homeworkId = query.get("homeworkId") ? query.get("homeworkId") : -1;
  const activeView = query.get("activeView") ? query.get("activeView") : "1";
  const studentId = query.get("studentId") ? query.get("studentId") : null;

  // context
  const { homeworkListComplete, role, userId } = useContext(Context);

  // my states
  const [homework, setHomework] = useState([]);
  const [homeworkResponse, setHomeworkResponse] = useState(null);

  // useBasePath
  const path = useBasePath();

  function openHomeworkResponse(studentId) {
    navigate(location.pathname + location.search + "&studentId=" + studentId);
  }

  async function getHomeworkResponse(id) {
    await axios
      .get(
        `http://localhost:3001/getHomeworkResponses?user_id=${id}&homework_id=${homeworkId}`
      )
      .then(function (response) {
        let documents = response.data.documents.responseData;
        let markup = response.data.markup.responseData;
        setHomeworkResponse({ documents, markup });
      });
  }

  useEffect(() => {
    if (role === "student") {
      getHomeworkResponse(userId);
    }
    if (studentId && role === "teacher") {
      getHomeworkResponse(studentId);
    }
  }, [role, studentId]);

  useEffect(() => {
    let homeworkIdx = getIdxOfHomeworkById(homeworkId, homeworkListComplete);
    setHomework(homeworkListComplete[homeworkIdx]);
  }, [homeworkListComplete]);

  return (
    <div className="container scrollable-container">
      <div className="list-header">
        <div className="inline-container"></div>
        <div className="list-options-bar">
          <Link to={`${path}?homeworkId=${homeworkId}&activeView=1`}>
            <h5 className="text-to-outline">Informatii</h5>
          </Link>
          <Link to={`${path}?homeworkId=${homeworkId}&activeView=2`}>
            <h5 className="text-to-outline">Submisii</h5>
          </Link>
        </div>
      </div>
      <div className="divider"></div>
      {homework && (
        <>
          {activeView === "1" && <HomeworkDetails homework={homework} />}
          {activeView === "2" && (
            <>
              {!studentId && role === "teacher" && (
                <ClassroomPeople
                  classroomId={homework.classroom_id}
                  onClick={openHomeworkResponse}
                  studentsOnly={true}
                />
              )}
              {homeworkResponse && (studentId || role === "student") && (
                <>
                  <HomeworkDetails
                    homework={homework}
                    homeworkResponse={homeworkResponse}
                    activeView={2}
                  />
                  <HomeworkResponse homeworkResponse={homeworkResponse} />
                </>
              )}
            </>
          )}
        </>
      )}

      {/* <Link
        to={
          parseInt(homeworkIdx) === homeworkListComplete.length - 1
            ? `/teme/vizualizare/0/false`
            : `/teme/vizualizare/${parseInt(homeworkIdx) + 1}/false`
        }
      >
        <div
          className="icon-container-medium outline-to-fill next-button"
          id="next-button"
        >
          <Icon icon="akar-icons:chevron-right" />
        </div>
      </Link>
      <Link
        to={
          parseInt(homeworkIdx) === 0
            ? `/teme/vizualizare/${homeworkListComplete.length - 1}/false`
            : `/teme/vizualizare/${parseInt(homeworkIdx) - 1}/false`
        }
      >
        <div
          className="icon-container-medium outline-to-fill prev-button"
          id="prev-button"
        >
          <Icon icon="akar-icons:chevron-right" />
        </div>
      </Link> */}
    </div>
  );
}
