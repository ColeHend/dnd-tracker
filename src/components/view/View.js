// @ts-nocheck
import React, { useContext, useState } from "react";
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
    console.log(theProjects);
    
    setAllData({ ...allData, theProjects });
  };
  const theAbilities = async () => {
    let theAbilities = await apiService.getAbilities(userInfo.user_id);
    setAllData({ ...allData, theAbilities });
  };
  const updateAbility = async () => {
    let theAbilities = await apiService.updateAbility(
      1,
      "Toughness",
      "ability_subhead",
      "Increase your hit points by 1 per level"
    );
    setAllData({ ...allData, theAbilities });
  };
  const updateProject = async () => {
    let theProjects = await apiService.updateProject(
      4,
      "project_name",
      "project_desc"
    );
    setAllData({ ...allData, theProjects });
  };
  const updateFeat = async () => {
    let theFeats = await apiService.updateFeat(
      1,
      "feat Name",
      "featDesc",
      "feat Subhead"
    );
    setAllData({ ...allData, theFeats });
  };
  const updateSpell = async () => {
    let theSpells = await apiService.updateSpell(
      1,
      "Spell Name",
      "Spell Subhead",
      "Spell Description"
    );
    setAllData({ ...allData, theSpells });
  };
  const updateClass = async () => {
    let theClasses = await apiService.updateClass(
      1,
      "Soldier",
      "1D8",
      ["simple"],
      ["light"],
      ["perception"],
      ["Thief Tools"]
    );
    setAllData({ ...allData, theClasses });
  };
  const updateSubclass = async () => {
    let theSubclasses = await apiService.updateSubclass(
      1,
      "evoker",
      "blaster wizard",
      "wizard",
      []
    );
    setAllData({ ...allData, theSubclasses });
  };

  return (
    <div>
      <h3 style={{ color: "white", paddingLeft: "5vw" }}>
        apiService View and Update Example
      </h3>
      <div>
        <Button sx={{ color: "white" }} onClick={theClass}>
          Load Class
        </Button>
        <Button sx={{ color: "white" }} onClick={theSubclass}>
          Load Subclass
        </Button>
        <Button sx={{ color: "white" }} onClick={theSpell}>
          Load Spells
        </Button>
        <Button sx={{ color: "white" }} onClick={theFeat}>
          Load Feats
        </Button>
        <Button sx={{ color: "white" }} onClick={theProject}>
          Load Projects
        </Button>
        <Button sx={{ color: "white" }} onClick={theAbilities}>
          Load Abilities
        </Button>
      </div>
      <div>
        <Button sx={{ color: "white" }} onClick={updateClass}>
          Update Class
        </Button>
        <Button sx={{ color: "white" }} onClick={updateSubclass}>
          Update Subclass
        </Button>
        <Button sx={{ color: "white" }} onClick={updateSpell}>
          Update Spell
        </Button>
        <Button sx={{ color: "white" }} onClick={updateFeat}>
          Update Feat
        </Button>
        <Button sx={{ color: "white" }} onClick={updateProject}>
          Update Project
        </Button>
        <Button sx={{ color: "white" }} onClick={updateAbility}>
          Update Ability
        </Button>
      </div>
      <div style={{ color: "white", textAlign: "center" }}>
        {JSON.stringify(allData)}
      </div>
    </div>
  );
}
export default View;
