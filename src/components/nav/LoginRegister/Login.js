import React from "react";
export default function Login(props) {
  const setIsLoggedIn = props.setIsLoggedIn;
  const login = () => {
    setIsLoggedIn(true);
    props.close();
  };
  return (
    <div className="login">
      Login Stuff Here <button onClick={login}>Click to Login!</button>
    </div>
  );
}
