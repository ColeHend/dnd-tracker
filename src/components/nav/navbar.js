import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
function Navbar(props) {
  let loggedIn = props.isLoggedIn ? props.isLoggedIn : false;
  const MySwal = withReactContent(Swal);
  const theLogin = () =>
    MySwal.fire({
      title: <p>Welcome!</p>,
      footer: "Copyright",
      html: (
        //   <Login/>
        <div className="login">Login Stuff Here</div>
      ),
      showConfirmButton: false,
    });
  const theRegister = () =>
    MySwal.fire({
      title: <p>Welcome</p>,
      footer: "Copyright",
      html: (
        //   <Register/>
        <div className="login">Register Stuff Here</div>
      ),
      showConfirmButton: false,
    });
  return (
    <div className="navBar">
      <Link to="/">
        <button>Home</button>
      </Link>
      {loggedIn ? (
        <Link to="/profile">
          <button>Profile</button>
        </Link>
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
