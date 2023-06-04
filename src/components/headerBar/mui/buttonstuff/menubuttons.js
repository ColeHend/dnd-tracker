// @ts-nocheck
import React, { useContext } from "react";
import { UserContext} from "../../../../App"
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Login from "../../LoginRegister/Login";
import Register from "../../LoginRegister/Register";

function Menubutton(props) {
  const { page } = props;

  const { userInfo, setUserInfo, isLoggedIn, setIsLoggedIn, loginService } =
    useContext(UserContext);
  const SERVER_URL = process.env.SERVER_URL || "http://localhost:4000";
  const MySwal = withReactContent(Swal);
  const theLogin = () =>
    MySwal.fire({
      title: <p>Welcome!</p>,
      footer: "Copyright",
      html: (
        <Login
          user={{ userInfo, setUserInfo, loginService }}
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
          user={{ userInfo, setUserInfo, loginService }}
          close={MySwal.close}
          SERVER_URL={SERVER_URL}
        />
      ),
      showConfirmButton: false,
    });

  return (
    <>
      {page === "Home" ? (
        <Link to="/" key={page}>
          <Button sx={{ my: 2, color: "white", display: "block" }}>
            {page}
          </Button>
        </Link>
      ) : (
        ""
      )}
      {!isLoggedIn ? (
        page === "Login" ? (
          <Button
            onClick={theLogin}
            sx={{ my: 2, color: "white", display: "block" }}
          >
            {page}
          </Button>
        ) : (
          ""
        )
      ) : (
        ""
      )}
      {!isLoggedIn ? (
        page === "Register" ? (
          <Button
            onClick={theRegister}
            sx={{ my: 2, color: "white", display: "block" }}
          >
            {page}
          </Button>
        ) : (
          ""
        )
      ) : (
        ""
      )}
    </>
  );
}

export default Menubutton;
