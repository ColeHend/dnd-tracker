import * as React from 'react';
import Box from '@mui/material/Box';
import { Link, Route, Routes } from "react-router-dom";
import Create from "../create/create";
import View from "../view/View";
import './muiprofile.scss'
import { Button } from '@mui/material';
import CreatePro from '../createProject/CreateProject';
import ViewProject from '../viewProject/viewProject';
import { redirect } from 'react-router-dom';
import { UserContext } from '../../App';

 function AccountMenu() {
    let linkstyles = { minWidth: 100, color:'white'}

  const [anchorEl, setAnchorEl] = React.useState(null);
  const {userInfo} = React.useContext(UserContext);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
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

export default AccountMenu