import './styles/App.scss';
import './styles/index.scss';
import type { ToDoList, User } from "../types";

import React, { useState, useEffect } from 'react';
import { useOutletContext, Outlet, useNavigate } from 'react-router-dom';
import { AUTHENTICATE, GET_ITEMS_BY_USER } from './hooks/helpers';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import Nav from './components/Nav';

type AppDataContextType = {
  user: User,
  setUser: React.Dispatch<React.SetStateAction<User>>;
  toDoList: ToDoList,
  setToDoList: React.Dispatch<React.SetStateAction<ToDoList>>,
};

export default function App() {

  const [user, setUser] = useState<User>({
    id: "",
    username: "",
    email: "",
  });
  const [toDoList, setToDoList] = useState<ToDoList>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const fetchedUser = await AUTHENTICATE();
      const fetchedItems = await GET_ITEMS_BY_USER();
      setUser(fetchedUser);
      setToDoList(fetchedItems);
      return fetchedUser;
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (user) {
      console.log(user);
      navigate(`dashboard`);
    } else {
      navigate('home');
    }
  }, [user]);


  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className='App'>
        <Nav user={user} />
        <Outlet context={{ user, toDoList, setToDoList, setUser } satisfies AppDataContextType} />
      </div>
    </LocalizationProvider>
  );
}

export function useAppData() {
  return useOutletContext<AppDataContextType>();
}