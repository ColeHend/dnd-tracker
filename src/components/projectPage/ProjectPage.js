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
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };



    const { id } = useParams();
    const {apiService,userInfo } = useContext(UserContext)

    

    const [spells, setSpells] = useState([])
    const [feats, setFeats] = useState([])
    const [classes, setClasses] = useState([])
    const [subclasses, setSubclasses] = useState([])
    const [abilities, setAbilties] = useState([])
    const [active, setActive] = useState(true)
    
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
                

                apiData.forEach((apiValue)=>{
                    if (apiValue && Array.isArray(apiValue) && apiValue.length > 0) {
                        const keys = Object.keys(apiValue[0]);
                        const id_keys = ["feat_owner","spell_owner","ability_owner","subclass_owner","class_owner"];
                        

                        if (keys.includes(id_keys[0])) {
                            setFeats(apiValue)
                        } else if (keys.includes(id_keys[1])) {
                            setSpells(apiValue)
                        }  else if (keys.includes(id_keys[2])) {
                            setAbilties(apiValue)
                        }   else if (keys.includes(id_keys[3])) {
                            setSubclasses(apiValue)
                        }  else if (keys.includes(id_keys[4])) {
                            setClasses(apiValue)

                        }
                    }
                })
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