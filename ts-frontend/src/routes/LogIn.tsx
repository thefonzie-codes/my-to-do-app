import axios from "../api/axios";
import { useState } from "react";
import { Form, Link, useNavigate, useOutletContext, Outlet } from "react-router-dom"
import Cookies from 'js-cookie'; // Import js-cookie
import type { ToDoList, User } from "../../types";

type ContextType = { user: User | null, toDoList: ToDoList | null  };

export default function LogIn() {

  interface LoginData {
    username: string,
    password: string,
  }

  const [ user, setUser ] = useState<User | null>(null)
  const [ toDoList, setToDoList ] = useState<ToDoList | null>(null)

  const [loginData, setLoginData] = useState<LoginData>({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  async function LOGIN (data:LoginData) {
    try {
      const userData = await axios.post('login/', data);
      Cookies.set('token', userData.data.token, { expires: 1, secure: true, sameSite: 'Strict' }); // Set cookie to expire in 1 day
      const listData = await axios.get(`my_list_items`);
      setUser(userData.data.user);
      setToDoList(listData.data)
      console.log(user, toDoList)
      console.log(listData, userData)
      navigate(`/${user?.id}`);
      return;
    }
    catch (error) {
      alert('Invalid username or password');
      console.log(error);
    }
  };

  return (
    <div className="bg">
      <Outlet context={{user, toDoList} satisfies ContextType} />
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

export function useUser() {
  return useOutletContext<ContextType>();
}
