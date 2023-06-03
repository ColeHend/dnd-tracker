import * as React from 'react';
import Box from '@mui/material/Box';
import { Link, Route, Routes } from "react-router-dom";
import './muiprofile.scss'
import { Button } from '@mui/material';
import CreatePro from './createProject/CreateProject';
import ViewProject from './viewProject/viewProject';
import { UserContext } from '../../App';

 function ProjectViewCreate() {
  let linkstyles = { minWidth: 100, color:'white'}

  const {userInfo} = React.useContext(UserContext);
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center',background:' #719ac4' }}>
        <Link to='view'><Button  sx={linkstyles}>view</Button></Link>
        <Link to='create'><Button sx={linkstyles}>Create</Button></Link>

      </Box>
      <Routes>
        <Route path="/view" element={(<ViewProject/>)}></Route>
        <Route path="/create" element={<CreatePro />}></Route>
      </Routes>
    </React.Fragment>
  );
}

export default ProjectViewCreate