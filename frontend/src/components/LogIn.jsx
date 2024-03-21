import axios from "axios";
import { useState } from "react";
import { URL } from "../hooks/helpers";

export default function LogIn({ state, setState }) {

  const [loginData, setLoginData] = useState({
    username: null,
    password: null,
  });

  const handleLogin = () => {
    console.log(loginData);
    axios.post(URL + 'login/', loginData)
      .then((response) => {
        console.log(response);
        setState({ ...state, user: response.data.token, view: "home" });
        return response.data.token;
      })
      .then((token) => {
        window.sessionStorage.setItem("token", `${token}`)
        return token;
      })
      .then((token) => axios.get('http://localhost:8000/list_items.json', {
        headers: {
          'Authorization': `Token ${token}`,
        }
      }))
      .then((response) => setState({ ...state, list: response.data }))
      .catch((error) => console.log(error));
  };

  return (
    <div className="modal-bg">
      <div className="LogIn modal">
        <form
          onSubmit={(evt) => {
            evt.preventDefault();
            handleLogin(loginData);
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