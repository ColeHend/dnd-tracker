import React,{useContext} from "react";
import { UserContext } from "../../../App";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

function Settingsbutton(props) {

    const {setting} = props
    const { userInfo, isLoggedIn, setIsLoggedIn } = useContext(UserContext);
    const logout = () => {
        setIsLoggedIn(false);
    };
    return(
        <>
                {setting === 'Profile'? <Link to='/profile' key={setting} ><Typography 
                 >
                {setting}
              </Typography></Link>:''}
              {setting === 'Projects'? <Link to='/Projects' key={setting} ><Typography 
                 >
                {setting}
              </Typography></Link>:''}
              {setting === 'Dashboard'? <Link to='/profile' key={setting} ><Typography
                 >
                {setting}
              </Typography></Link>:''}
              {isLoggedIn?setting === 'Logout'? <Link to='/' key={setting} ><Typography
              onClick={logout} >
                {setting}
              </Typography></Link>:'':''}
        </>
    )
}

export default Settingsbutton