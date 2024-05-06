import axios from "../api/axios";
import { useState } from "react";
import Cookies from 'js-cookie';

export default function Registration({ state, setState }) {

  const [registrationData, setRegistrationData] = useState({
    username: null,
    email: null,
    password: null,
  });

  const handleRegistration = async () => {
    console.log(registrationData);
    if (!registrationData.username || !registrationData.email || !registrationData.password) {
      alert('Please fill in all fields');
      return;
    }
    try {
      const response = await axios.post('signup/', registrationData);
      const user = response.data.user;
      Cookies.set('token', response.data.token, { expires: 1, secure: true, sameSite: 'Strict' });
      setState({ ...state, user: user, view: "home" });
    }
    catch (error) {
      alert('Invalid credentials');
      console.log(error);
    };
  };

  const setLogin = () => {
    setState({ ...state, view: "login" });
  }

  return (
    <div className="bg">
      <div className="LogIn modal">
        <form
          onSubmit={(evt) => {
            evt.preventDefault();
            handleRegistration(registrationData);
          }}>
          <input
            type='text'
            label='email'
            placeholder="Email"
            maxLength="100"
            onChange={(evt) => setRegistrationData({ ...registrationData, email: evt.target.value })}>
          </input>
          <input
            type='text'
            label='username'
            placeholder="Username"
            maxLength="100"
            onChange={(evt) => setRegistrationData({ ...registrationData, username: evt.target.value })}>
          </input>
          <input
            type='text'
            label='password'
            placeholder="Password"
            maxLength="100"
            onChange={(evt) => setRegistrationData({ ...registrationData, password: evt.target.value })}>
          </input>
          <button type='submit'>Register</button>
        </form>
        <button onClick={setLogin}>Log In</button>
      </div>
    </div>
  );
}