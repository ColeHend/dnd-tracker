import React, { useContext } from "react";
import { UserContext } from "../../App";
function Header(props) {
  const { userInfo } = useContext(UserContext);
  return (
    <div className="header">
      Hello {userInfo.username ? userInfo.username : "please login!"}{" "}
    </div>
  );
}
export default Header;
