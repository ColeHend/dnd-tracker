import React from "react";
import axios from "axios";
import { useFormik } from "formik";
import { setLocalInfo } from "../../../utilities/utilities";
export default function Register(props) {
  const { userInfo, setUserInfo, loginService } = props.user;
  const setIsLoggedIn = props.setIsLoggedIn;

  const onSubmit = (values) => {
    const { username, password } = formik.values;
    loginService.register(username, password, undefined, (res) => {
      loginService.login(username, password, undefined, (res2) => {
        setIsLoggedIn(true);
        console.log(userInfo);
        props.close();
        console.log("Submitted! res: ", res);
      });
    });
  };
  const formik = useFormik({
    initialValues: { ...loginService.registerDefault },
    validate: loginService.registerValidate,
    onSubmit,
  });
  
  return (
    <form onSubmit={formik.handleSubmit} method="post" action="/register">
      <p>
        <label htmlFor="username">Username</label>
        <input
          onChange={formik.handleChange}
          value={formik.values.username}
          placeholder="Please enter username.."
          type="text"
          name="username"
        />
      </p>
      <p>
        <label htmlFor="password">password</label>
        <input
          onChange={formik.handleChange}
          value={formik.values.password}
          placeholder="Please enter password.."
          type="password"
          name="password"
        />
      </p>
      <p>
        <label htmlFor="passwordConf">password</label>
        <input
          onChange={formik.handleChange}
          value={formik.values.passwordConf}
          placeholder="Please enter password again.."
          type="password"
          name="passwordConf"
        />
      </p>
      <button style={{ color: "#393E46" }} type="submit">
        Submit
      </button>
    </form>
  );
}
