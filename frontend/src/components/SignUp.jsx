import axios from "../api/axios";
import { useState } from "react";

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
      const userData = await axios.post('signup/', registrationData);
      setState({ ...state, user: response.data.token, view: "home" });
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
    <div className="modal-bg">
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