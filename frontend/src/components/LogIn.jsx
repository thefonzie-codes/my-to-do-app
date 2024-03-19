import axios from "axios";
import { useState } from "react";

export default function LogIn() {

const [loginData, setLoginData] = useState({
  username: null,
  password: null,
})

const handleLogin = () => {
  console.log(loginData)
  axios.post('http://localhost:8000/login/', loginData)
  .then((response) => {console.log(response)})
}

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
            onChange={(evt) => setLoginData({...loginData, username:evt.target.value})}>
          </input>
          <input
            type='password'
            label='password'
            placeholder="Password"
            maxLength="100"
            onChange={(evt) => setLoginData({...loginData, password: evt.target.value})}>
          </input>
          <button type='submit'>Log In</button>
        </form>
        <button>Cancel</button>
      </div>
    </div>
  );
}