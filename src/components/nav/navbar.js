// @ts-nocheck
import Login from "./LoginRegister/Login";
import Register from "./LoginRegister/Register";
import React, { useContext } from "react";
import { UserContext } from "../../App";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
function Navbar(props) {
  // let loggedIn = ;
  const { userInfo, setUserInfo, isLoggedIn, setIsLoggedIn } =
    useContext(UserContext);
  const SERVER_URL = process.env.SERVER_URL || "http://localhost:4000";
  const MySwal = withReactContent(Swal);
  const theLogin = () =>
    MySwal.fire({
      title: <p>Welcome!</p>,
      footer: "Copyright",
      html: (
        <Login
          user={{ userInfo, setUserInfo }}
          close={MySwal.close}
          setIsLoggedIn={setIsLoggedIn}
          SERVER_URL={SERVER_URL}
        />
      ),
      showConfirmButton: false,
    });
  const theRegister = () =>
    MySwal.fire({
      title: <p>Welcome</p>,
      footer: "Copyright",
      html: (
        <Register
          setIsLoggedIn={setIsLoggedIn}
          user={{ userInfo, setUserInfo }}
          close={MySwal.close}
          SERVER_URL={SERVER_URL}
        />
      ),
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
