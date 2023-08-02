import React, { useState, useEffect, useContext } from "react";
import { Link, Route, Routes, useParams } from "react-router-dom";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import { UserContext } from "../../App";
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade'
import './projectPage.scss'
import ClassesHomebrew from "./ClassesHomebrew/ClassesHomebrew";
import FeatsTable from "./FeatsTable/FeatsTable";
import SpellsTable from "./SpellsTable/SpellsTable";



function ProjectPage({project}) {
    const {apiService,userInfo } = useContext(UserContext)
    
    const [anchorEl, setAnchorEl] = useState(null);
    const [spells, setSpells] = useState([])
    const [feats, setFeats] = useState([])
    const [classes, setClasses] = useState([])
    const [subclasses, setSubclasses] = useState([])
    const [abilities, setAbilties] = useState([])
    const [active, setActive] = useState(true)
    const { id } = useParams();
    
    const open = Boolean(anchorEl);
    
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
      setAnchorEl(null);
    };

    const dataCheck = (data, setState, id_key)=>{
        if (data && Array.isArray(data) && data.length > 0) {
            if (Object.keys(data[0]).includes(id_key)) {
                setState(data)
            }
        }
    }

    useEffect(() => {
        const theApiData = async () =>{
            const apiData = await Promise.all([
                apiService.getProjectSpells(userInfo.user_id,id),
                apiService.getFeats(userInfo.user_id,id),
                apiService.getClasses(userInfo.user_id,id),
                apiService.getSubclasses(userInfo.user_id,id),
                apiService.getAbilities(userInfo.user_id,id)
            ])
            if (active === true) {
                dataCheck(apiData[0] ?? [], setSpells, "spell_owner");
                dataCheck(apiData[1] ?? [], setFeats, "feat_owner");
                dataCheck(apiData[2] ?? [], setClasses, "class_owner");
                dataCheck(apiData[3] ?? [], setSubclasses, "subclass_owner");
                dataCheck(apiData[4] ?? [], setAbilties, "ability_owner");
            }
        }
        theApiData()
        return () => setActive(false)
    },[active,apiService,userInfo])
    
    
    

    return (
         <div>
            <>
                <Button
                    sx={{color:'white',}}
                    id="fade-button"
                    aria-controls={open ? 'fade-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >
                    homebrew options
                </Button>
                <Menu
                    id="fade-menu"
                    MenuListProps={{
                        'aria-labelledby': 'fade-button',
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    TransitionComponent={Fade}
                >
                  <Link to="ClassesHomebrew"><MenuItem onClick={handleClose}>Classes homebrew</MenuItem></Link>
                  <Link to="FeatsTable"><MenuItem onClick={handleClose}>Feats Table</MenuItem></Link>  
                  <Link to="SpellsTable"><MenuItem onClick={handleClose}>Spells Table</MenuItem></Link>  
                </Menu>
                <Routes>
                    <Route path="/ClassesHomebrew" element={<ClassesHomebrew projectID={id} classes={classes} subclasses={subclasses} abilities={abilities} spells={spells} />}></Route>
                    <Route path="/FeatsTable" element={<FeatsTable projectID={id} feats={{get:feats, set:setFeats}}/>}></Route>
                    <Route path="/SpellsTable" element={<SpellsTable projectID={id} spells={{get:spells, set:setSpells}}/>}></Route>
                </Routes>
            </>
            
        
        
            
        
       
         </div>
    )
}

export default ProjectPage;