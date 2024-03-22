import axios from "axios";
import { useState } from "react";
import { LOGIN } from "../hooks/helpers";

export default function LogIn({ state, setState }) {

  const [loginData, setLoginData] = useState({
    username: null,
    password: null,
  });

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
        <button>Cancel</button>
      </div>
    </div>
  );
}