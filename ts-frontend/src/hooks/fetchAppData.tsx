import { useState, useEffect } from "react";

const { GET_ITEMS_BY_USER, AUTHENTICATE } = require('./helpers.js');

import type { User, ToDoList } from '../../types';
import { Outlet } from 'react-router-dom';

// const UserDataContext = createContext<User | undefined>(undefined);
// const ItemDataContext = createContext<ToDoList | undefined>(undefined);

export const AppDataProvider = () => {
  const [user, setUser] = useState<User | null>(null);
  const [toDoList, setToDoList] = useState<ToDoList | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedUser = await AUTHENTICATE();
      const fetchedItems = await GET_ITEMS_BY_USER();
      setUser(fetchedUser);
      setToDoList({ items: fetchedItems });
    };

    fetchData();
  }, []);

  return <Outlet context={[user, setUser, toDoList, setToDoList]} />
};