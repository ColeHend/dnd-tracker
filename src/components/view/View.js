import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
function View(props) {
  const { userInfo } = useContext(UserContext);
  const [allProjects, setAllProjects] = useState([]);
  useEffect(() => {
    console.log(userInfo.user_id);
    axios
      .get(`http://localhost:4000/projects/${userInfo.user_id}`)
      .then((res) => {
        setAllProjects(res.data);
        console.table(allProjects);
        console.log(allProjects);
      });
  }, [userInfo]);
  return (
    <div>
      <div>Hello View</div>
      {allProjects.length > 0
        ? allProjects.map((project) => {
            return <div key={project}>{JSON.stringify(project)}</div>;
          })
        : ""}
    </div>
  );
}
export default View;
