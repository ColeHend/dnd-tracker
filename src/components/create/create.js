// @ts-nocheck
import Button from "@mui/material/Button";
import React, { useContext, useState } from "react";
import { UserContext } from "../../App";
import axios from "axios";
function Create(props) {
  const { userInfo } = useContext(UserContext);
  const [newProjectRes, setProjectRes] = useState("");
  const createProject = () => {
    if (userInfo.user_id > 0) {
      console.log(userInfo);
      axios
        .post("http://localhost:4000/api/projects", {
          project_owner: userInfo.user_id,
          project_group_access: [userInfo.user_id],
          project_name: `project_${userInfo.username}`,
          project_desc: `description ${userInfo.username}`,
        })
        .then((res) => {
          setProjectRes({ ...res.data, ...newProjectRes });
        });
    } else {
      console.log("relogin");
    }
  };
  return (
    <div>
      <div>
        Hello Create
        <Button sx={{ color: "white" }} onClick={createProject}>
          Create A Project!
        </Button>
        <div>{JSON.stringify(newProjectRes)}</div>
      </div>
    </div>
  );
}
export default Create;
