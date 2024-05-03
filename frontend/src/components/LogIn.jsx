import axios from "../api/axios";
import { useState } from "react";
import Cookies from 'js-cookie'; // Import js-cookie

export default function LogIn({ state, setState }) {

  const [loginData, setLoginData] = useState({
    username: null,
    password: null,
  });

  const LOGIN = async (loginData, state, setState) => {
    try {
      const userData = await axios.post('login/', loginData);
      Cookies.set('token', userData.data.token, { expires: 1, secure: true, sameSite: 'Strict' }); // Set cookie to expire in 1 day
      const listData = await axios.get(`my_list_items`);
      // Set token in cookies instead of sessionStorage
      setState({ ...state, user: userData.data.user, list: listData.data, view: "home" });
      return [listData.data];
    }
    catch (error) {
      console.log(error);
    }
  };

  const setSignUp = () => {
    setState({ ...state, view: "signup" });
  };

  return (
    <div className="modal-bg">
      <div className="LogIn modal">
        <form
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
        </form>
        <button onClick={setSignUp}>Register</button>
      </div>
    </div>
  );
}
