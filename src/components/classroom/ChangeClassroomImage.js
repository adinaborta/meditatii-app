import React, { useState } from "react";
import UploadFile from "../../components/UploadFile";

// context
import { useContext } from "react";
import { Context } from "../../components/Screen";

// helpers
import { getClassroomList } from "../../scripts/api";

// useQuery
import { useQuery } from "../../scripts/hooks";

export default function ChangeClassroomImage() {
  const [endpoint, setEndpoint] = useState(null);

  // context
  const { setClassroomListComplete, userId } = useContext(Context);

  // useQuery
  const query = useQuery();
  const classroomId = query.get("classroomId") ? query.get("classroomId") : -1;

  function addClassroomImage(e) {
    e.preventDefault();
    setEndpoint(`uploadClassroomLink?classroom_id=${classroomId}`);
  }

  return (
    <form className="popup-form" onSubmit={addClassroomImage}>
      <h1 style={{ margin: "2rem 0" }}>Schimba imaginea clasei</h1>
      <UploadFile
        acceptedFormatString="png, jpg, jpeg"
        acceptedFormatList="image/*"
        endpoint={endpoint}
        setEndpoint={setEndpoint}
        multiple={false}
        then={() => {
          getClassroomList(userId, setClassroomListComplete);
        }}
      />
      <button
        type="submit"
        className="fill"
        style={{ padding: "1rem", marginTop: "1rem" }}
      >
        Salveaza
      </button>
    </form>
  );
}
