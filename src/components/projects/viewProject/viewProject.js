import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../../App";
import  Table  from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import './viewProject.scss'


function ViewProject(props) {
    const { userInfo, apiService } = useContext(UserContext);
    const [allData, setAllData] = useState([]);
    const [active,setActive] = useState(true)
    useEffect(() => {
        const theProject = async () => {
            const theProjects = await apiService.getProjects(userInfo.user_id);
            if (active === true) {
                setAllData(theProjects)
            }
        }
        theProject();
        return () => setActive(false)
    },[apiService, userInfo, allData, active])

return (
    <div>
        <TableContainer id='viewProjectTable' component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Project Name</TableCell>
                        <TableCell>Project Short Desc</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        Array.isArray(allData) && allData.length > 0 ? allData.map(project =>
                           <TableRow key={project.project_id}>
                                <TableCell component="th" scope="row">
                                    {project.project_name}
                                </TableCell>
                                <TableCell>
                                    {project.project_desc}
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