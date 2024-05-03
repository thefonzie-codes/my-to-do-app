import axios from "../api/axios";
import Cookies from 'js-cookie';

const AUTHENTICATE = async () => {
  try {
    const response = await axios.get("authenticate/");
    return response.data;
  }
  catch (error) {
    console.log(error);
    return null
  }
};

const GET_ALL_ITEMS = async () => {
  try {
    axios.get("list_items.json");
  }
  catch (error) {
    console.log(error);
  }
};

const GET_ITEMS_BY_USER = async () => {
  try {
    const items = await axios.get("my_list_items.json");
    return items.data;
  }
  catch (error) {
    console.log(error);
  }
};

const DELETE_ITEM = async (id) => {
  try {
    const DELETE_API = await axios.delete('list_items/' + id);
    console.log('Successfully deleted item');
  } catch (error) {
    console.log(error);
  }
};

const ADD_ITEM = async (name, state, setState) => {
  try {
    let item = {
      name: name,
      completed: false,
      user_id: state.user.id,
    };
    console.log(item);
    await axios.post(`list_items/`, item);
    console.log('Successfully added item');
  } catch (error) {
    console.log(error);
  };
};

const EDIT_ITEM = async(id, item) => {
  try {
    axios.put(`list_items/${id}`, item);
    console.log('Successfully edited item');
  }
  catch (error) {
    console.log(error);
  }
};

const CHANGE_STATUS = async (name, id, done, userId) => {
  try {
    await axios.put(`list_items/${id}`, {
      name: name,
      completed: !done,
      user_id: userId
    });
    console.log('Successfully changed status');
  }
  catch (error){
    console.log(error);
  }
};

const LOGOUT = (state, setState) => {
  Cookies.remove("token");
  setState({ ...state, user: null, view: "login", list: [] });
};

export { AUTHENTICATE, LOGOUT, GET_ALL_ITEMS, GET_ITEMS_BY_USER, CHANGE_STATUS, EDIT_ITEM, ADD_ITEM, DELETE_ITEM};