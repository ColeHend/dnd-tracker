import { all } from "axios";
import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../App";
import Projects from "../projects/projects";
import  Table  from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import './viewProject.scss'
import { Button } from "@mui/material";
import { removeObjectInArray } from "../../utilities/utilities";


function ViewProject(props) {
    const { userInfo, apiService } = useContext(UserContext);
    const [allData, setAllData] = useState([]);
    const [active,setActive] = useState(true)
    
    const deleteProject = async (project_id) =>{
        console.log("project_id: ", project_id);
        if (project_id > 0) {
            await apiService.deleteProject(project_id)
            console.log('deleted');
            setAllData(removeObjectInArray(allData,"project_id",project_id))
        }   
    }
    useEffect(() => {
        const theProject = async () => {
            const theProjects = await apiService.getProjects(userInfo.user_id);
            if (active === true) {
                setAllData(theProjects)
            }
        }
        theProject();
        return () => setActive(false)
    },[apiService, userInfo, allData])

    

return (
    <div>
        <TableContainer id='viewProjectTable' component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Project Name</TableCell>
                        <TableCell>Project Short Desc</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        allData.length > 0 ? allData.map(project =>
                           <TableRow key={project.project_id}>
                                <TableCell component="th" scope="row">
                                    {project.project_name}
                                </TableCell>
                                <TableCell>
                                    {project.project_desc}
                                </TableCell>
                                <TableCell>
                                    <Button
                                     onClick={()=>deleteProject(project.project_id)}
                                    > 
                                        x
                                    </Button>
                                </TableCell>
                           </TableRow>
                        ) : "No Projects"
                    }

                </TableBody>
            </Table>
        </TableContainer>
    </div>
)
    }
export default ViewProject