import React from "react";
import axios from "axios";
import { useFormik } from "formik";
import { setLocalInfo } from "../../../utilities/utilities";
export default function Login(props) {
  const setIsLoggedIn = props.setIsLoggedIn;
  const { userInfo, setUserInfo, loginService } = props.user;

  const onSubmit = (values) => {
    console.log("Submitted!", values);
    loginService.login(values.username, values.password, undefined,
      (res) => {
        setIsLoggedIn(true);
        setUserInfo({ ...res.data });
        console.log(userInfo, res.data);
        props.close();
      })
      .catch((err) => console.error(err));
  };
  const formik = useFormik({
    initialValues: { ...loginService.loginDefault },
    validate: loginService.loginValidate,
    onSubmit,
  });
  return (
    <form action="/api/login" method="post" onSubmit={formik.handleSubmit}>
      <p>
        <label htmlFor="username">username</label>
        <input
          onChange={formik.handleChange}
          value={formik.values.username}
          placeholder="Please enter your username.."
          type="text"
          name="username"
        />
      </p>
      <p>
        <label htmlFor="username">password</label>
        <input
          onChange={formik.handleChange}
          value={formik.values.password}
          placeholder="Please enter password.."
          type="password"
          name="password"
        />
      </p>
      <button
        style={{ color: "#393E46" }}
        type="submit"
        disabled={!formik.isValid}
      >
        Submit
      </button>
    </form>
  );
}
