import React from 'react'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import DeleteAproject from '../deleteAproject/deleteAproject';
import  Button  from '@mui/material/Button';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { createTheme,ThemeProvider } from '@mui/material/styles';
import { grey,red } from '@mui/material/colors';
import { removeObjectInArray } from '../../../../utilities/utilities';
import UpdatingAProject from '../updatingAProject/updatingAProject';

const theme = createTheme({
    palette: {
        primary: grey,
        secondary: red,
    },
});
function BetterOptionsMenu({ setAllData,allData,MySwal, apiService, projectid}) {
    const projectDeleteConferm = async (projectid) => {
        console.log('projectid',projectid);
        MySwal.fire({
            title: <p>Deleting a Project</p>,
            footer: "copyright",
            showConfirmButton: false,
            showCancelButton: true,
            html: (
                <DeleteAproject
                    MySwal={MySwal}
                    projectID={projectid}
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
    const [heightmenuOptions] = React.useState([
        { name: 'Edit A Project', id: 'edit' },
        { name: 'Delete A Project', id: 'delete' }
    ]);
    const handleClick = (PopupState)=> (projectid) => (option) => {
        checkOptionClick(projectid)(option)
        let close = ()=> PopupState.close()
        close()
    };
    const checkOptionClick = (projectid) => (option) => {
        switch (option.id) {
            case 'edit':
                projectTheUpdate()
                break
            case 'delete':

                projectDeleteConferm(projectid)
                break
            default:
                break;
        }
    }
    return (
        <PopupState variant='popover' popupId='project-popup-menu'>
            {
                (PopupState) => (
                    <>
                    <ThemeProvider theme={theme}>
                        <Button
                            {...bindTrigger(PopupState)}
                        >
                            <MoreVertIcon />
                        </Button>
                    </ThemeProvider>
                    <Menu
                        {...bindMenu(PopupState)}
                    >
                        {heightmenuOptions.map((projectOption) => (
                            <MenuItem key={`${projectOption.id} ${projectid}`} onClick={() => handleClick(PopupState)(projectid)(projectOption)}>
                                <span>{projectOption.name}</span>
                            </MenuItem>
                        ))}
                    </Menu>
                    </>)
            }
        </PopupState>
    )
}

export default BetterOptionsMenu