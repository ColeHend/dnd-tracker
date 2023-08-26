import React, { useState, useEffect, useContext } from "react";
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { Link, Route, Routes, useParams } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { createTheme,ThemeProvider } from '@mui/material/styles';
import { UserContext } from "../../App";
import { red } from '@mui/material/colors';
import ClassesHomebrew from "./ClassesHomebrew/ClassesHomebrew";
import FeatsTable from "./FeatsTable/FeatsTable";
import SpellsTable from "./SpellsTable/SpellsTable";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import 'react-tabs/style/react-tabs.scss'
import './projectPage.scss'

function ProjectPage({project}) {
    const {apiService,userInfo } = useContext(UserContext)
    const [spells, setSpells] = useState([])
    const [feats, setFeats] = useState([])
    const [classes, setClasses] = useState([])
    const [subclasses, setSubclasses] = useState([])
    const [abilities, setAbilties] = useState([])
    const [active, setActive] = useState(true)
    const { id } = useParams();
    
    const dataCheck = (data, setState, id_key)=>{
        if (data && Array.isArray(data) && data.length > 0) {
            if (Object.keys(data[0]).includes(id_key)) {
                setState(data)
            }
        }
    };
    const fiftyShadesOfRed = createTheme({
        palette: {
            primary: {
                main: red[400]
            },
            secondary: {
                main: red[900]
            },
        },
    });
    
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
         <div style={{
            marginLeft:'5vw',
            marginTop:'5vw'
         }}>
            <PopupState variant="popover" popupId="project-page-popup-menu">
                {(PopupState) => ( <>
                        <Tabs defaultIndex={2} {...bindMenu(PopupState)}>
                            <TabList>
                                <ThemeProvider theme={fiftyShadesOfRed}>
                                <Stack direction='row' spacing={3}>
                                <Tab><Link {...bindTrigger(PopupState)} onClick={PopupState.close} to="ClassesHomebrew"><Button>Classes Homebrew</Button></Link></Tab>
                                <Tab><Link {...bindTrigger(PopupState)} onClick={PopupState.close} to="FeatsTable"><Button>Feats Table</Button></Link></Tab>
                                <Tab><Link {...bindTrigger(PopupState)} onClick={PopupState.close} to="SpellsTable"><Button>Spell Table</Button></Link></Tab>
                                </Stack>
                                </ThemeProvider>
                            </TabList>
                            <TabPanel></TabPanel>
                            <TabPanel></TabPanel>
                            <TabPanel></TabPanel>
                            <Routes >
                                <Route path="/ClassesHomebrew" element={<ClassesHomebrew projectID={id} classes={classes} subclasses={subclasses} abilities={abilities} spells={spells} />}></Route>
                                <Route path="/FeatsTable" element={<FeatsTable projectID={id} feats={{get:feats, set:setFeats}}/>}></Route>
                                <Route path="/SpellsTable" element={<SpellsTable projectID={id} classes={{get:classes,set:setClasses}} spells={{get:spells, set:setSpells}}/>}></Route>
                            </Routes>
                        </Tabs> 
                    </>         
                )}   
            </PopupState>
        </div>
    )
}

export default ProjectPage;