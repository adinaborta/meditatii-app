import React, { useContext, useEffect } from "react";
import "../styles/navbar.css";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { signOut } from "supertokens-auth-react/recipe/thirdpartyemailpassword";
import { Context } from "../components/Screen";
const axios = require("axios").default;

export default function Navbar() {
  const navigate = useNavigate();

  async function logoutClicked() {
    await signOut();
    navigate("/auth");
  }

  const { path } = useContext(Context);

  return (
    <div className="navbar">
      <div className="path">
        {path.map(({ route, header }, i) => {
          return (
            <Link to={route} key={i}>
              <h5
                className="text-to-underline"
                style={{ display: "inline-block" }}
              >
                {header}
              </h5>
              {i < path.length - 1 && (
                <h5
                  style={{
                    display: "inline-block",
                  }}
                  className="slash"
                >
                  /
                </h5>
              )}
            </Link>
          );
        })}
      </div>
      <div className="navbar-icons">
        <div className="logout-button" onClick={logoutClicked}>
          <div className="icon-container-big text-to-outline">
            <Icon icon="clarity:logout-line" />
          </div>
        </div>
        <div className="message-button">
          <div className="icon-container-big text-to-outline">
            <Icon icon="bytesize:message" />
          </div>
        </div>
        <div className="notification-button">
          <div className="icon-container-big text-to-outline">
            <Icon icon="clarity:notification-outline-badged" />
          </div>
        </div>
      </div>
    </div>
  );
}
