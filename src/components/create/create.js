// @ts-nocheck
import Button from "@mui/material/Button";
import React, { useContext, useState } from "react";
import { UserContext } from "../../App";
function Create(props) {
  const { userInfo, apiService } = useContext(UserContext);
  const [newProjectRes, setProjectRes] = useState("");
  return (
    <div>
      <div>
        Hello Create
        <Button
          sx={{ color: "white" }}
          onClick={() => {
            apiService.createProject(
              1,
              [1],
              "Test Project",
              "Test Project Description"
            );
          }}
        >
          Create Project
        </Button>
        <Button
          sx={{ color: "white" }}
          onClick={() => {
            apiService.createSpell(
              4,
              1,
              "Test Spell",
              "Test Spell Description",
              "Test Spell Subhead"
            );
          }}
        >
          Create Spell
        </Button>
        <Button
          sx={{ color: "white" }}
          onClick={() => {
            apiService.createFeat(
              4,
              1,
              "Test Feat",
              "Test Feat Description",
              "Test Feat Subhead"
            );
          }}
        >
          Create Feat
        </Button>
        <Button
          sx={{ color: "white" }}
          onClick={() => {
            console.log("create class");
            apiService.createClass(
              4,
              1,
              "Test Class",
              "1D6",
              ["Armor"],
              ["Weapon"],
              ["Tool"],
              ["Skill"],
              []
            );
          }}
        >
          Create Class
        </Button>
        <Button
          sx={{ color: "white" }}
          onClick={() => {
            apiService.createSubclass(
              4,
              userInfo.user_id,
              "Test Subclass",
              "Test Description",
              "fighter",
              []
            );
          }}
        >
          Create Subclass
        </Button>
      </div>
    </div>
  );
}
export default Create;
