import React from "react";
import axios from "axios";
import { useFormik } from "formik";
import { setLocalInfo } from "../../../utilities/utilities";
export default function Login(props) {
  const setIsLoggedIn = props.setIsLoggedIn;
  const { userInfo, setUserInfo } = props.user;
  const { SERVER_URL } = props;
  const initialValues = {
    username: "",
    password: "",
  };
  const onSubmit = (values) => {
    console.log("Submitted!", values);
    axios.post(SERVER_URL + "/login", values).then((res) => {
      setIsLoggedIn(true);
      setLocalInfo(res.data.user_id, res.data.username, res.data.user_password);
      setUserInfo({ ...res.data });
      console.log(userInfo, res.data);
      props.close();
    });
  };
  const validate = (values) => {
    // console.log("validated", values);
  };
  const formik = useFormik({ initialValues, onSubmit, validate });
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
