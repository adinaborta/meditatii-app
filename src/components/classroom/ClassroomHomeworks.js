import React from "react";
import HomeworkListComponent from "../../components/homework/HomeworkListComponent";

// my context
import { Context } from "../../components/Screen";
import { useContext } from "react";

// router
import { useNavigate } from "react-router-dom";

export default function ClassroomHomework({ classroom }) {
  // context
  const { homeworkListComplete } = useContext(Context);
  const homeworkList = homeworkListComplete.filter(({ classroom_id }) => {
    return classroom_id === classroom.classroom_id;
  });

  // router
  const navigate = useNavigate();

  return (
    <div className="container scrollable-container">
      <HomeworkListComponent
        homeworkList={homeworkList}
        handleClick={(e) =>
          navigate(`/teme/vizualizare?homeworkId=${e.currentTarget.id}`)
        }
      />
      {homeworkList.length === 0 && (
        <div className="not-found-container">
          <div className="not-found">
            <h1>Nu a fost gasita nicio tema...</h1>
          </div>
        </div>
      )}
    </div>
  );
}
