// @ts-nocheck
import React, { useContext, useState, useMemo, useEffect } from "react";
import { UserContext } from "../../App";
import { Button } from "@mui/material";
function View(props) {
  const { userInfo, apiService } = useContext(UserContext);
  const [allData, setAllData] = useState({});

  // useEffect(() => {
  //   let active = true;
  //   const theSubclass = async () => {
  //     let theSubclasses = await apiService.getSubclasses(userInfo.user_id);
  //     if (!active) {
  //       return;
  //     }
  //     setAllData({ ...allData, theSubclasses });
  //   };
  //   theSubclass();
  //   return () => {
  //     active = false;
  //   };
  // }, [apiService, userInfo, allData]);
  const theClass = async () => {
    let theClasses = await apiService.getClasses(userInfo.user_id);
    setAllData({ ...allData, theClasses });
  };
  const theSubclass = async () => {
    let theSubclasses = await apiService.getSubclasses(userInfo.user_id);
    setAllData({ ...allData, theSubclasses });
  };
  const theSpell = async () => {
    let theSpells = await apiService.getSpells(userInfo.user_id);
    setAllData({ ...allData, theSpells });
  };
  const theFeat = async () => {
    let theFeats = await apiService.getFeats(userInfo.user_id);
    setAllData({ ...allData, theFeats });
  };
  const theProject = async () => {
    let theProjects = await apiService.getProjects(userInfo.user_id);
    setAllData({ ...allData, theProjects });
  };

  // console.log("theClasses", theClasses);
  // console.log("theSubclasses", theSubclasses);
  // console.log("theSpells", theSpells);
  // console.log("theFeats", theFeats);
  // console.log("theProjects", theProjects);
  return (
    <div>
      <div>Hello View</div>
      <div>
        <Button sx={{ color: "white" }} onClick={theClass}>
          Load Class
        </Button>
      </div>
      <div>
        <Button sx={{ color: "white" }} onClick={theSubclass}>
          Load Subclass
        </Button>
      </div>
      <div>
        <Button sx={{ color: "white" }} onClick={theSpell}>
          Load Spells
        </Button>
      </div>
      <div>
        <Button sx={{ color: "white" }} onClick={theFeat}>
          Load Feats
        </Button>
      </div>
      <div>
        <Button sx={{ color: "white" }} onClick={theProject}>
          Load Projects
        </Button>
      </div>
      <div>{JSON.stringify(allData)}</div>
    </div>
  );
}
export default View;
