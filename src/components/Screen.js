import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSessionContext } from "supertokens-auth-react/recipe/session";
import { getHomeworkList, getClassroomList } from "../scripts/helpers";

export const Context = React.createContext();
export default function Screen(props) {
  const [path, setPath] = useState([]);
  const [role, setRole] = useState("");
  const [homeworkListComplete, setHomeworkListComplete] = useState([]);
  const [classroomListComplete, setClassroomListComplete] = useState([]);
  const user_id = useSessionContext().userId;
  const navigate = useNavigate();

  useEffect(() => {
    let roleTemp = Cookies.get(`role_${user_id}`);
    if (!roleTemp) {
      console.log("axios.getRole");
      axios
        .get(`http://localhost:3001/getRole?user_id=${user_id}`)
        .then(function (response) {
          let roleTemp = response.data.role;
          if (roleTemp) {
            Cookies.set(`role_${user_id}`, roleTemp);
          } else {
            navigate("/edit-profile-informations");
          }
        });
    } else {
      console.log("Cookies: ", roleTemp);
    }
    if (!role) {
      console.log("setRole: ", roleTemp);
      setRole(roleTemp);
    }

    console.log("setListsComplete");
    getHomeworkList(user_id, setHomeworkListComplete);
    getClassroomList(user_id, setClassroomListComplete);
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
      }}
    >
      <div className="screen">
        <Sidebar />
        <div className="main-container">
          <Navbar path="Teme" />
          {props.children}
        </div>
      </div>
    </Context.Provider>
  );
}
