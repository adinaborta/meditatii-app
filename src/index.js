// React
import React from "react";
import ReactDOM from "react-dom/client";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import axios from "axios";
import { message } from "antd";

// css
import "./index.css";
import "./styles/antd.css";
import "antd/dist/antd.less";

// My components
import Screen from "./components/Screen";
import HomeworkList from "./views/HomeworkList";
import HomeworkSlide from "./views/HomeworkSlide";
import ClassroomList from "./views/ClassroomList";
import ClassroomSlide from "./views/ClassroomSlide";
import UploadFile from "./components/UploadFile";
import EditProfileInformation from "./components/EditProfileInformation";
import CalendarView from "./views/CalendarView";
import EventView from "./views/EventView";

// Supertokens
import SuperTokens, {
  getSuperTokensRoutesForReactRouterDom,
} from "supertokens-auth-react";
import ThirdPartyEmailPassword, {
  ThirdPartyEmailPasswordAuth,
  Google,
} from "supertokens-auth-react/recipe/thirdpartyemailpassword";
import Session from "supertokens-auth-react/recipe/session";
SuperTokens.init({
  appInfo: {
    appName: "My Demo App",
    apiDomain: "http://localhost:3001",
    websiteDomain: "http://localhost:3000",
  },
  recipeList: [
    ThirdPartyEmailPassword.init({
      signInAndUpFeature: {
        providers: [Google.init()],
      },
      getRedirectionURL: async (context) => {
        if (context.action === "SUCCESS") {
          if (context.redirectToPath !== undefined) {
            return context.redirectToPath;
          }
          if (context.isNewUser) {
            return "/edit-profile-informations";
          } else {
            return "/teme";
          }
        }
        return undefined;
      },
      onHandleEvent: async (context) => {
        if (context.action === "SUCCESS") {
          let { id, email } = context.user;
          if (context.isNewUser) {
            // TODO: Sign up
          } else {
            console.log("logged");
          }
        }
      },
    }),
    Session.init(),
  ],
});

axios.interceptors.request.use(
  (req) => {
    return req;
  },
  (err) => {
    message.error(err.response.data.message);
    return Promise.reject(err);
  }
);

// For POST requests
axios.interceptors.response.use(
  (res) => {
    if (res.status === 201 || res.status === 202) {
      message.success(res.data.message);
    }
    return res;
  },
  (err) => {
    message.error(err.response.data.message);
    return Promise.reject(err);
  }
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {getSuperTokensRoutesForReactRouterDom(require("react-router-dom"))}
        <Route
          exact
          path="/edit-profile-informations"
          element={
            <ThirdPartyEmailPasswordAuth>
              <EditProfileInformation />
            </ThirdPartyEmailPasswordAuth>
          }
        />
        <Route
          exact
          path="/clase"
          element={
            <ThirdPartyEmailPasswordAuth>
              <Screen>
                <ClassroomList />
              </Screen>
            </ThirdPartyEmailPasswordAuth>
          }
        />
        <Route
          path="/clase/vizualizare"
          element={
            <ThirdPartyEmailPasswordAuth>
              <Screen>
                <ClassroomSlide />
              </Screen>
            </ThirdPartyEmailPasswordAuth>
          }
        />
        <Route
          exact
          path="/teme"
          element={
            <ThirdPartyEmailPasswordAuth>
              <Screen>
                <HomeworkList />
              </Screen>
            </ThirdPartyEmailPasswordAuth>
          }
        />
        <Route
          exact
          path="/teme/vizualizare"
          element={
            <ThirdPartyEmailPasswordAuth>
              <Screen>
                <HomeworkSlide />
              </Screen>
            </ThirdPartyEmailPasswordAuth>
          }
        />
        <Route
          path="/calendar"
          element={
            <ThirdPartyEmailPasswordAuth>
              <Screen>
                <CalendarView />
              </Screen>
            </ThirdPartyEmailPasswordAuth>
          }
        />
        <Route
          path="/calendar/vizualizare"
          element={
            <ThirdPartyEmailPasswordAuth>
              <Screen>
                <EventView />
              </Screen>
            </ThirdPartyEmailPasswordAuth>
          }
        />
        <Route
          exact
          path="/upload"
          element={
            <ThirdPartyEmailPasswordAuth>
              <UploadFile />
            </ThirdPartyEmailPasswordAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
