import axios from "../api/axios";
import { useState } from "react";
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom'

export default function Registration() {

  interface RegistrationData {
    username: string,
    email: string,
    password: string,
  }

  const [registrationData, setRegistrationData] = useState<RegistrationData>({
    username: "",
    email: "",
    password: "",
  });
  const handleRegistration = async (registrationData:RegistrationData) => {
    const { username, email, password } = registrationData;
    console.log(registrationData);
    if (!username || !email || !password || username === "" || email === "" || password === "" ) {
      alert('Please fill in all fields');
      return;
    }
    if (!email.includes('@')){
      alert('please enter valid email')
      return;
    }
    try {
      const response = await axios.post('signup/', registrationData);
      Cookies.set('token', response.data.token, { expires: 1, secure: true, sameSite: 'Strict' });
      window.location.reload();
    }
    catch (error) {
      alert('Invalid credentials');
      console.log(error);
    };
  };

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
            placeholder="Email"
            maxLength={100}
            onChange={(evt) => setRegistrationData({ ...registrationData, email: evt.target.value })}>
          </input>
          <input
            type='text'
            placeholder="Username"
            maxLength={100}
            onChange={(evt) => setRegistrationData({ ...registrationData, username: evt.target.value })}>
          </input>
          <input
            type='text'
            placeholder="Password"
            maxLength={100}
            onChange={(evt) => setRegistrationData({ ...registrationData, password: evt.target.value })}>
          </input>
          <button type='submit'>Register</button>
        </form>
        <Link to='/login'>
        <button>Log In</button>
        </Link>
      </div>
    </div>
  );
}