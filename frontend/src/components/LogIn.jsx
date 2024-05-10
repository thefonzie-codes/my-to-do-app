import axios from "../api/axios";
import { useState } from "react";
import Cookies from 'js-cookie'; // Import js-cookie
import { Form, Link, useNavigate } from "react-router-dom"

export async function LOGIN (loginData) {
  const navigate = useNavigate();
  try {
    const userData = await axios.post('login/', loginData);
    Cookies.set('token', userData.data.token, { expires: 1, secure: true, sameSite: 'Strict' }); // Set cookie to expire in 1 day
    const listData = await axios.get(`my_list_items`);
    console.log(userData)
    navigate('/home');
    return [listData.data];
  }
  catch (error) {
    console.log(error);
  }
};

export default function LogIn({ state, setState }) {

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const setSignUp = () => {
    setState({ ...state, view: "signup" });
  };

  return (
    <div className="bg">
      <div className="modal">
        <Form
          onSubmit={(evt) => {
            evt.preventDefault();
            LOGIN(loginData, state, setState);
          }}>
          <input
            type='text'
            label='username'
            placeholder="Username"
            maxLength="100"
            onChange={(evt) => setLoginData({ ...loginData, username: evt.target.value })}>
          </input>
          <input
            type='password'
            label='password'
            placeholder="Password"
            maxLength="100"
            onChange={(evt) => setLoginData({ ...loginData, password: evt.target.value })}>
          </input>
          <button type='submit'>Log In</button>
        </Form>
        <Link to="/signup">
          <button>Register</button>
        </Link>
      </div>
    </div>
  );
}
