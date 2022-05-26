import React, { useState, useEffect } from "react";

import { TextField } from "@mui/material";
import Rating from "@mui/material/Rating";
import { styled } from "@mui/material/styles";

// useQuery
import { useQuery } from "../../scripts/hooks";

import Picker from "emoji-picker-react";

import axios from "axios";

export default function NoteHomework() {
  const [homeworkResponse, setHomeworkResponse] = useState(null);

  const onEmojiClick = (event, emojiObject) => {
    if (event.target.currentSrc) setChosenEmoji(event.target.currentSrc);
  };

  // useQuery
  const query = useQuery();
  const homeworkId = query.get("homeworkId") ? query.get("homeworkId") : -1;
  const studentId = query.get("studentId") ? query.get("studentId") : null;

  const [starValue, setStarValue] = useState(0);
  const [chosenEmoji, setChosenEmoji] = useState(
    "https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f31f.png"
  );

  async function addHomeworkGrade(e) {
    e.preventDefault();

    let body = {
      student_id: studentId,
      homework_id: homeworkId,
      grade: starValue,
      comment: e.target["comments"].value,
      emoji_src: chosenEmoji,
    };

    await axios
      .post(`http://localhost:3001/gradeHomework`, body)
      .then((response) => {
        console.log(response);
      });
  }

  const StyledRating = styled(Rating)({
    "& .MuiRating-icon": {
      opacity: 0.5,
    },
    "& .MuiRating-iconFilled": {
      opacity: 1,
    },
    "& .MuiRating-iconHover": {
      opacity: 1,
    },
  });

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
    if (studentId) {
      getHomeworkResponse(studentId);
    }
  }, [studentId]);

  useEffect(() => {
    if (homeworkResponse) {
      setStarValue(homeworkResponse.markup[0].grade);
      if (homeworkResponse.markup[0].emoji_src)
        setChosenEmoji(homeworkResponse.markup[0].emoji_src);
    }
  }, [homeworkResponse]);

  return (
    <>
      <h1 style={{ margin: "2rem 0" }}>Noteaza tema</h1>
      <form className="popup-form" onSubmit={addHomeworkGrade}>
        {/* <div className="row">
          <TextField
            id="grade"
            label="Nota"
            variant="outlined"
            required
            type={"number"}
          />
        </div> */}
        <div className="row emoji-rating">
          <h2>Nota: </h2>
          <StyledRating
            name="customized-color"
            getLabelText={(value) => `${value} Heart${value !== 1 ? "s" : ""}`}
            precision={1}
            icon={<img src={chosenEmoji} />}
            emptyIcon={<img src={chosenEmoji} />}
            max={10}
            value={starValue}
            onChange={(event, newValue) => {
              setStarValue(newValue);
            }}
          />
        </div>
        <div className="row">
          <div>
            <Picker onEmojiClick={onEmojiClick} />
          </div>
        </div>
        <div className="row">
          <TextField id="comments" label="Comentarii" variant="outlined" />
        </div>
        <button
          type="submit"
          className="fill"
          style={{ padding: "1rem", marginTop: "1rem" }}
        >
          Noteaza
        </button>
      </form>
    </>
  );
}
