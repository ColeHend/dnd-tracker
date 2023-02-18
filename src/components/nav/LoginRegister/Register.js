import React from "react";
import axios from "axios";
import { useFormik } from "formik";
export default function Register(props) {
  const { userInfo, setUserInfo } = props.user;
  const setIsLoggedIn = props.setIsLoggedIn;
  const initialValues = {
    username: "",
    password: "",
    passwordConf: "",
  };
  const { SERVER_URL } = props;
  const onSubmit = (values) => {
    const { username, password } = formik.values;
    console.log(SERVER_URL);
    axios.post(SERVER_URL + "/register", values);
    axios.post(SERVER_URL + "/login", { username, password }).then((res) => {
      setIsLoggedIn(true);
      window.localStorage.setItem("user_id", res.data.user_id);
      window.localStorage.setItem("username", res.data.username);
      setUserInfo({ ...res.data });
      console.log(userInfo);
      props.close();
    });
    console.log("Submitted!", values);
    props.close();
  };
  const validate = (values) => {
    // console.log("validated", values);
  };
  const formik = useFormik({ initialValues, onSubmit, validate });
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
