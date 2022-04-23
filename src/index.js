// React
import React from "react";
import ReactDOM from "react-dom/client";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

// css
import "./index.css";
import "./styles/antd.css";
import "antd/dist/antd.less";

// My components
import Screen from "./components/Screen";
import HomeworkList from "./views/HomeworkList";
import HomeworkSlide from "./views/HomeworkSlide";
import ClassroomList from "./views/ClassroomList";
import Upload from "./components/Upload";
import EditProfileInformation from "./components/EditProfileInformation";

// Supertokens
import SuperTokens, {
  getSuperTokensRoutesForReactRouterDom,
} from "supertokens-auth-react";
import ThirdPartyEmailPassword, {
  ThirdPartyEmailPasswordAuth,
  Google,
} from "supertokens-auth-react/recipe/thirdpartyemailpassword";
import Session from "supertokens-auth-react/recipe/session";
import CalendarView from "./views/CalendarView";
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
          path="/teme/vizualizare/:homeworkId"
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
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
