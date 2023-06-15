import "./App.scss";
import React, { createContext, useMemo, useState, useEffect } from "react";
import Home from "./components/home/home";
import { Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "./components/headerBar/mui/headerBar";
import Profile from "./components/profile/profile";
import ProjectViewCreate from "./components/projects/projectViewCreate";
import ApiService from "./utilities/apiService";
import axios from "axios";
import { getLocalInfo } from "./utilities/utilities";
import LoginService from "./utilities/loginService";
import SearchService from "./utilities/searchService";

export const UserContext = createContext();
function App() {
  const navigate = useNavigate();
  const localInfo = getLocalInfo();
  const [userInfo, setUserInfo] = useState({
    user_id: localInfo.user_id !== null ? localInfo.user_id : 0,
    username: localInfo.username !== null ? localInfo.username : "",
    user_password:
      localInfo.user_password !== null ? localInfo.user_password : "", //will be encrypted
  });
  console.log(userInfo);
  const loginCheck = userInfo && userInfo.user_id !== 0 && userInfo.username.length > 1;
  const [isLoggedIn, setIsLoggedIn] = useState(loginCheck);
  const apiService = useMemo(() => new ApiService(axios), []);
  const loginService = useMemo(() => new LoginService(axios), []);
  // const tableService = useMemo(() => new TableService(), []);
  const searchService = useMemo(() => new SearchService(axios), []);
  useEffect(() => {
    if (!loginCheck) {
      navigate("/");
    }
  }, [navigate, loginCheck]);

  return (
    <UserContext.Provider
      value={{
        userInfo,
        setUserInfo,
        isLoggedIn,
        setIsLoggedIn,
        apiService,
        loginService,
        searchService,
      }}
    >
      <div className="bg_1">
        <Navbar isLoggedIn={isLoggedIn} />
        <Routes>
          <Route path="/" element={(<Home />)}></Route>
          <Route path="/profile/*" element={<Profile />}></Route>
          <Route path="/Projects/*" element={<ProjectViewCreate />}></Route>
        </Routes>
      </div>
    </UserContext.Provider>
  );
}

export default App;
