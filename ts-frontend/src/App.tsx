import './App.css'
import React, { useState, useEffect } from 'react';
import type { ToDoList, User } from "../types";
import { useOutletContext, Outlet, useNavigate } from 'react-router-dom';
import { AUTHENTICATE, GET_ITEMS_BY_USER } from './hooks/helpers';

type AppDataContextType = { user: User | null, toDoList: ToDoList | null, setToDoList: React.Dispatch<React.SetStateAction<ToDoList | null>> };

export default function App () {

  const [ user, setUser ] = React.useState<User | null>(null)
  const [ toDoList, setToDoList ] = useState<ToDoList | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const fetchedUser = await AUTHENTICATE();
      const fetchedItems = await GET_ITEMS_BY_USER();
      setUser(fetchedUser)
      setToDoList(fetchedItems)
      return fetchedUser;
    };
    fetchData();

    if (!user) {
      navigate('/login')
    }
  
    navigate(`/${user?.id}`)
  }, []);


  return (
    <div className='App'>
      <Outlet context={{ user, toDoList, setToDoList } satisfies AppDataContextType}/>
    </div>
  )
}

export function useAppData() {
  return useOutletContext<AppDataContextType>();
}