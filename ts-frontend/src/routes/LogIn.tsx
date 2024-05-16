import axios from "../api/axios";
import { useState, useEffect } from "react";
import { Form, Link, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { useAppData } from "../App";

export default function LogIn() {

  interface LoginData {
    username: string,
    password: string,
  }

  const { user, toDoList, setUser, setToDoList } = useAppData();

  const [loginData, setLoginData] = useState<LoginData>({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(`/dashboard`);
    }
  }, [user, toDoList]);

  async function LOGIN(data: LoginData) {
    try {
      const userData = await axios.post('login/', data);
      Cookies.set('token', userData.data.token, { expires: 1, secure: true, sameSite: 'Strict' }); // Set cookie to expire in 1 day
      setUser(userData.data.user);

      const listData = await axios.get(`my_list_items`);
      setToDoList(listData.data);
    }
    catch (error) {
      alert('Invalid username or password');
      console.log(error);
    }
  };

  return (
    <div className="bg">
      <div className="modal">
        <Form
          onSubmit={(evt) => {
            evt.preventDefault();
            LOGIN(loginData);
          }}>
          <input
            type='text'
            placeholder="Username"
            maxLength={50}
            onChange={(evt) => setLoginData({ ...loginData, username: evt.target.value })}>
          </input>
          <input
            type='password'
            placeholder="Password"
            maxLength={50}
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