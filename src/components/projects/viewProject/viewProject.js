import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../../App";
import TableCell from "@mui/material/TableCell";
import './viewProject.scss'
import { removeObjectInArray } from "../../../utilities/utilities";
import { Link, Route, Routes } from "react-router-dom";
import GenerateTable from "../../../utilities/generateTable/generateTable";
import GenerateRow from "../../../utilities/generateTable/generateRow";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import IconButton from '@mui/material/IconButton';
import DeleteAproject from "./deleteAproject/deleteAproject";
import UpdatingAProject from "./updatingAProject/updatingAProject";

function ViewProject(props) {
    
    let linkstyles = { minWidth: 100, color:'blue'}
    const MySwal = withReactContent(Swal)
    const { userInfo, apiService } = useContext(UserContext);
    const [allData, setAllData] = useState([]);
    const [active,setActive] = useState(true)
    const [selectedProject, setSelectedProject] = useState(null)
    const [titleNames, setTitleNames] = React.useState(['Name', 'Short Desc', 'options']);

    const [heightmenuOptions] = React.useState([
        {name:'Edit A Project',id:'edit'},
        {name:'Delete A Project',id:'delete'}
      ]);
      const ITEM_HEIGHT = 35;
      const [anchorEl, setAnchorEl] = React.useState(null)
      const open = Boolean(anchorEl);
      const handleClick = (event,project) => {
        setSelectedProject(project)
        setAnchorEl(event.currentTarget);
      };    
      const handleClose = (option) => {
        checkOptionClick(option)
        setAnchorEl(null);
      };
      const checkOptionClick = (option)=>{
        switch (option.id) {
          case 'edit':
            console.log('clicked');
            projectTheUpdate()
            break
          case 'delete':
            
            projectDeleteConferm(allData.project_id)
            break
          default:
            break;
        }
      }

    const deleteProject = async (project_id) =>{
        
        if (project_id > 0) {
            await apiService.deleteProject(project_id)
            console.log('deleted');
            setAllData(removeObjectInArray(allData,"project_id",project_id))
        }   
    }
    
    const projectDeleteConferm = async (project_id)=>{
        MySwal.fire({
            title:<p>Deleting a Project</p>,
            footer:"copyright",
            showConfirmButton:false,
            showCancelButton:true,
            html:(
              <DeleteAproject 
                    projectID={project_id}
                    apiService={apiService}
                    allData={allData}
                    removeObjectInArray={removeObjectInArray}
                    setAllData={setAllData}
              />
            )
        })
    }
    const projectTheUpdate = async () =>{
        MySwal.fire({
            title:<p>Updating a project</p>,
            footer:'copyright',
            showConfirmButton:false,
            showCancelButton:true,
            html: (
                <UpdatingAProject />
            )
        })
    }
    const generateColumnInfo = {name:'Project ID', key:'project_id'}
    useEffect(() => {
        const theProject = async () => {
            const theProjects = await apiService.getProjects(userInfo.user_id);
            if (active === true) {
                setAllData(theProjects)
                setTitleNames([...titleNames,generateColumnInfo.name])

            }
        }
        theProject();
        return () => setActive(false)
    },[apiService, userInfo, allData, active])
    const generateColumn = ({source, key})=>{
        return (<TableCell>
            {source[key]}
        </TableCell>)
    }
    const config = {
        tableContainerID: "viewProjectTable",
        tableID: "table",
        header: "Projects",
        tableContainerSx: {
            minWidth: "50%",
            maxWidth: "50%",
            marginLeft: "20%",
            marginTop: "5%"
          }
      };
    

return (
    <>
       <GenerateTable isCollapsible={false} config={config} headerNames={titleNames}>
            {
                Array.isArray(allData) && allData.length > 0 ? allData.map((project, index)=> (
                    <GenerateRow key={project.project_id} headerNames={titleNames}>
                         <Link style={{width:"100%",height:'100%'}} to={`ProjectPage/${project.project_id}`}><TableCell key={project.project_id}>{project.project_name}</TableCell></Link>
                        <TableCell key={project.project_id}>{project.project_desc}</TableCell>
                        
                        <TableCell key={project.project_id}>
                            <IconButton
                                aria-label="more"
                                id='project-long-button'
                                aria-controls={open?'long-menu': undefined}
                                aria-expanded={open?'true':undefined}
                                aria-haspopup='true'
                                onClick={(e)=>handleClick(e,project)}
                            >
                                <MoreVertIcon/>
                            </IconButton>
                            <Menu
                                id="project-long-menu"
                                MenuListProps={{
                                    'aria-labelledby': 'long-button',
                                }}
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                PaperProps={{
                                    style: {
                                        maxHeight: ITEM_HEIGHT * 4.5,
                                        width: '20ch'
                                    },
                                }}
                            >
                                {heightmenuOptions.map((projectOption)=>(
                                    <MenuItem key={projectOption.id} onClick={()=>handleClose(projectOption)}>
                                        {projectOption.name}
                                    </MenuItem>
                                ))}
                            </Menu>
                        </TableCell>
                        {generateColumn({...generateColumnInfo, source:project})}
                    </GenerateRow>
                )): "no Projects"
            }
       </GenerateTable>

    </>
)
    }
export default ViewProject