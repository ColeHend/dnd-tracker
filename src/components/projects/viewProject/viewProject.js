import React, { useContext, useState, useEffect } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { UserContext } from "../../../App";
import BetterOptionsMenu from "./BetterOptionsMenu/BetterOptionsMenu";
import withReactContent from 'sweetalert2-react-content';
import GenerateTable from "../../../utilities/generateTable/generateTable";
import GenerateRow from "../../../utilities/generateTable/generateRow";
import Searchbar from "../../searchbar/searchbar";
import TableCell from "@mui/material/TableCell";
import Swal from 'sweetalert2';
import './viewProject.scss'

function ViewProject(props) {
    const MySwal = withReactContent(Swal)
    const { userInfo, apiService } = useContext(UserContext);
    const [allData, setAllData] = useState([]);
    const [active, setActive] = useState(true)
    const [titleNames, setTitleNames] = React.useState(['Name', 'Short Desc', 'options']);
    const [paginatedProjects, setPaginatedProjects] = React.useState(allData ?? [])
    const [filteredProjects, setFilteredProjects] = React.useState(allData ?? [])
    const generateColumnInfo = { name: 'Project ID', key: 'project_id' }

    useEffect(() => {
        const theProject = async () => {
            if (active === true || allData.length === 0) {
                const theProjects = await apiService.getProjects(+userInfo.user_id);
                setAllData(theProjects)
                setTitleNames([...titleNames, generateColumnInfo.name])
            }
        }
        theProject();
        return () => setActive(false)
    }, [apiService, userInfo, allData, active])

    const generateColumn = ({ source, key }) => {
        return (<TableCell>
            {source[key]}
        </TableCell>)
    }

    const config = {
        tableContainerID: "viewProjectTableContainer",
        tableID: "viewProjectTable",
        header: "Projects",
        pagination: {
            itemData: filteredProjects,
            setItemData: setPaginatedProjects,
        },
        tableContainerSx: {
            minWidth: "50%",
            maxWidth: "50%",
            marginLeft: "20%",
            marginTop: "5%",
            height:'90%'
        }
    };

    return (
            <div id="projectTableWrapper">
                <GenerateTable isCollapsible={false} config={config} headerNames={titleNames}>
                    <Searchbar data={allData} searchkeys={['project_name', 'project_desc']} setFilteredData={setFilteredProjects}/>
                    {
                        paginatedProjects.map((project) => (
                            <GenerateRow key={JSON.stringify(project)} headerNames={titleNames}>
                                <TableCell ><Link style={{ width: "100%", height: '100%' }} to={`ProjectPage/${project.project_id}`}>{project.project_name}</Link></TableCell>
                                <TableCell ><span>{project.project_desc}</span></TableCell>
                                <TableCell >
                                    <BetterOptionsMenu allData={allData} setAllData={setAllData} MySwal={MySwal} apiService={apiService} projectid={project.project_id} />
                                </TableCell>
                                {generateColumn({ ...generateColumnInfo, source: project })}
                            </GenerateRow>
                        ))
                    }
                </GenerateTable>
            </div>
    )
}
export default ViewProject