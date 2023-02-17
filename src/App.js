import "./App.css";
import React from "react";
import Home from "./components/home/home";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/nav/navbar";
import Profile from "./components/profile/profile";

function App() {
  return (
    <div>
      <div className="header"> Header </div>
      <div className="navBar">
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
      </Routes>
    </div>
  );
}

export default App;
