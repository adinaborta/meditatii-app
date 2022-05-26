import React from "react";
import AddHomeworkForm from "./homework/AddHomeworkForm";
import AddClassFormTeacher from "../components/classroom/AddClassFormTeacher";
import AddClassFormStudent from "../components/classroom/AddClassFormStudent";
import ChangeClassroomImage from "../components/classroom/ChangeClassroomImage";
import UploadHomeworkResponse from "../components/homework/UploadHomeworkResponse";
import GradeHomework from "./homework/GradeHomework";
import AddEventForm from "../components/calendar/AddEventForm";

// my context
import { Context } from "../components/Screen";
import { useContext } from "react";

export default function PopupContent({ openPopup }) {
  // context
  const { role } = useContext(Context);

  if (openPopup === "addHomeworkOpen" && role === "teacher") {
    return <AddHomeworkForm />;
  }
  if (openPopup === "addEventOpen") {
    return <AddEventForm />;
  }
  if (openPopup === "addClassroomOpen" && role === "teacher") {
    return <AddClassFormTeacher />;
  }
  if (openPopup === "addClassroomOpen" && role === "student") {
    return <AddClassFormStudent />;
  }
  if (openPopup === "addClassroomImageOpen" && role === "teacher") {
    return <ChangeClassroomImage />;
  }
  if (openPopup === "uploadHomeworkOpen") {
    return <UploadHomeworkResponse />;
  }
  if (openPopup === "noteHomework") {
    return <GradeHomework />;
  }

  return <></>;
}
