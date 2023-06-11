import React, { useState, useEffect, useContext } from "react";
import { Link, Route, Routes, useParams } from "react-router-dom";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import { UserContext } from "../../App";


function ProjectPage({project}) {


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
                apiService.getSpells(userInfo.user_id),
                apiService.getFeats(userInfo.user_id),
                apiService.getClasses(userInfo.user_id),
                apiService.getSubclasses(userInfo.user_id),
                apiService.getAbilities(userInfo.user_id)
            ])
            if (active === true) {
                console.log('apiDataunfliterd', apiData);

                apiData.forEach((apiValue)=>{
                    if (apiValue && Array.isArray(apiValue) && apiValue.length > 0) {
                        const keys = Object.keys(apiValue[0]);
                        const id_keys = ["feat_owner","spell_owner","ability_owner","subclass_owner","class_owner"];
                        console.log('apiValue', apiValue);

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
        console.log('filteredata',userInfo.user_id);
        return () => setActive(false)
    },[active,apiService,userInfo])
    
    


    return (
         <div>
     
             aksxhjbcdxfgouijasdfghuiosadgo
             {JSON.stringify({feats,spells,classes,subclasses,abilities})}
        
        
        
        
       
         </div>
    )
}

export default ProjectPage;