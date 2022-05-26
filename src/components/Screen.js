import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSessionContext } from "supertokens-auth-react/recipe/session";
import Popup from "../components/Popup";
import PopupContent from "../components/PopupContent";
import { getHomeworkList, getClassroomList } from "../scripts/api";

// query
import { useQuery } from "../scripts/hooks";

export const Context = React.createContext();
export default function Screen(props) {
  const [path, setPath] = useState([]);
  const [role, setRole] = useState("");
  const [homeworkListComplete, setHomeworkListComplete] = useState([]);
  const [classroomListComplete, setClassroomListComplete] = useState([]);
  const [userId, setUserId] = useState(useSessionContext().userId);
  const navigate = useNavigate();

  // useQuery
  const query = useQuery();
  const openPopup = query.get("openPopup") ? query.get("openPopup") : false;

  function roleSetup() {
    let roleTemp = Cookies.get(`role_${userId}`);
    if (!roleTemp) {
      console.log("axios.getRole");
      axios
        .get(`http://localhost:3001/getRole?user_id=${userId}`)
        .then(function (response) {
          let roleTemp = response.data.responseData.role;
          if (roleTemp) {
            Cookies.set(`role_${userId}`, roleTemp);
            console.log("setRole: ", roleTemp);
            setRole(roleTemp);
          } else {
            navigate("/edit-profile-informations");
          }
        })
        .catch(() => {
          navigate("/edit-profile-informations");
        });
    } else {
      console.log("Cookies: ", roleTemp);
      console.log("setRole: ", roleTemp);
      setRole(roleTemp);
    }

    console.log("setListsComplete");
    getHomeworkList(userId, setHomeworkListComplete);
    getClassroomList(userId, setClassroomListComplete);
  }

  useEffect(() => {
    roleSetup();
  }, []);

  return (
    <Context.Provider
      value={{
        path,
        setPath,
        role,
        setRole,
        homeworkListComplete,
        setHomeworkListComplete,
        classroomListComplete,
        setClassroomListComplete,
        userId,
        setUserId,
      }}
    >
      <div className="screen">
        <Sidebar />
        <div className="main-container">
          <Navbar path="Teme" />{" "}
          <h5 style={{ position: "fixed", bottom: "1rem", right: "1rem" }}>
            {role} {userId}
          </h5>
          {props.children}
        </div>
      </div>
      <Popup isOpen={openPopup}>
        <PopupContent openPopup={openPopup} />
      </Popup>
    </Context.Provider>
  );
}
