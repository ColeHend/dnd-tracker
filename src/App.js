import "./App.scss";
import React, { createContext, useState } from "react";
import Home from "./components/home/home";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/nav/navbar";
import Profile from "./components/profile/profile";
import Projects from "./components/projects/projects";


// @ts-ignore
export const UserContext = createContext();

function App() {
  const [userInfo, setUserInfo] = useState({
    user_id: 0,
    username: "",
    user_password: "", //will be encrypted
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  return (
    <UserContext.Provider
      value={{ userInfo, setUserInfo, isLoggedIn, setIsLoggedIn }}
    >
      <div className="bg_1">

        <Navbar isLoggedIn={false} />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/profile/*" element={<Profile />}></Route>
          <Route path="/Projects/*" element={<Projects/>}></Route>
        </Routes>
      </div>
    </UserContext.Provider>
  );
}

export default App;
