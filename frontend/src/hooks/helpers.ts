import type { TaskData } from "../../types";
import axios from "../api/axios";
import Cookies from 'js-cookie';

export const AUTHENTICATE = async () => {
  try {
    const response = await axios.get("authenticate/");
    return response.data;
  }
  catch (error) {
    console.log(error);
    return null;
  }
};

export const GET_ITEM_BY_ID = async (id: string | undefined) => {
  try {
    const item = await axios.get(`list_items/${id}`);
    return item.data;
  }
  catch (error) {
    console.log(error);
  }
}

export const GET_ITEMS_BY_USER = async () => {
  try {
    const items = await axios.get("my_list_items.json");
    return items.data;
  }
  catch (error) {
    console.log(error);
  }
};

export const DELETE_ITEM = async (id: string | undefined) => {
  try {
    await axios.delete('list_items/' + id);
    console.log('Successfully deleted item');
    return GET_ITEMS_BY_USER();
  } catch (error) {
    console.log(error);
  }
};

export const ADD_ITEM = async (item: TaskData) => {
  try {
    await axios.post(`list_items/`, item);
    console.log('Successfully added item');
    return GET_ITEMS_BY_USER();
  } catch (error) {
    console.log(error);
  };
};

export const EDIT_ITEM = async(item: TaskData) => {
  try {
    await axios.put(`list_items/${item.id}`, item);
    console.log('Successfully edited item');
    return GET_ITEMS_BY_USER();
  }
  catch (error) {
    console.log(error);
  }
};

export const CHANGE_STATUS = async (
  name: string,
  id: string,
  done: boolean) => {
  try {
    await axios.put(`list_items/${id}`, {
      name: name,
      completed: !done,
    });
    console.log('Successfully changed status');
  }
  catch (error) {
    console.log(error);
  }
};

export const LOGOUT = () => {
  Cookies.remove("token");
};

export const daysUntilDueCount = (dueDate: string | undefined | Date) => {
  let today = new Date();
  today.setHours(0, 0, 0, 0);
  let due = new Date(dueDate + "T00:00:00");
  due.setHours(0, 0, 0, 0);
  let timeDiff = due.getTime() - today.getTime();
  let daysDiff = timeDiff / (1000 * 3600 * 24);
  return Math.floor(daysDiff);
};

export const daysUntilDueText = (dueDate: string) => {
  let days = daysUntilDueCount(dueDate);
  if (days < 0) {
    return "Overdue";
  }
  else if (days === 0) {
    return "Due Today";
  }
  else if (days === 1) {
    return "Due Tomorrow";
  }
  else {
    return `Due in ${days} days`;
  }
};