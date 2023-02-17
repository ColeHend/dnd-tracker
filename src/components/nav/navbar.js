// @ts-nocheck
import Login from "./LoginRegister/Login";
import Register from "./LoginRegister/Register";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
function Navbar(props) {
  // let loggedIn = ;
  const [isLoggedIn, setIsLoggedIn] = useState(
    props.isLoggedIn ? props.isLoggedIn : false
  );
  console.log(isLoggedIn);
  const MySwal = withReactContent(Swal);
  const theLogin = () =>
    MySwal.fire({
      title: <p>Welcome!</p>,
      footer: "Copyright",
      html: <Login close={MySwal.close} setIsLoggedIn={setIsLoggedIn} />,
      showConfirmButton: false,
    });
  const theRegister = () =>
    MySwal.fire({
      title: <p>Welcome</p>,
      footer: "Copyright",
      html: <Register close={MySwal.close} />,
      showConfirmButton: false,
    });
  const logout = () => {
    setIsLoggedIn(false);
  };
  return (
    <div className="navBar">
      <Link to="/">
        <button>Home {isLoggedIn}</button>
      </Link>
      {isLoggedIn ? (
        <>
          <Link to="/profile/view">
            <button>Profile</button>
          </Link>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <button onClick={theLogin}>Login</button>
          <button onClick={theRegister}>Register</button>
        </>
      )}
    </div>
  );
}
export default Navbar;
