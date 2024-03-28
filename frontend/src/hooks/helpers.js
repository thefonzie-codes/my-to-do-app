import axios from "axios";

const URL = "http://localhost:8000/";
const TOKEN = window.sessionStorage.getItem("token");
const HEADERS = {
  headers: {
    'Authorization': `Token ${TOKEN}`
  },
};

const GET_ALL_ITEMS = () => axios.get(URL + "list_items.json", HEADERS);

const GET_ITEMS_BY_USER = (state, setState) => {
  axios.get(URL + "my_list_items.json", HEADERS)
    .then((response) => {
      setState({ ...state, list: response.data });
    })
    .catch((error) => console.log(error));
};

const DELETE_ITEM = (id, state, setState) => {
  axios.delete(URL + 'list_items/' + id, HEADERS)
    .then(() => axios.get(URL + "my_list_items.json", HEADERS))
    .then((response) => {
      console.log(response);
      setState({ ...state, list: response.data });
    })
    .catch((error) => console.log(error));
};

const ADD_ITEM = (name, state, setState) => {
  let item = {
    name: name,
    completed: false,
    user_id: null,
  };

  axios.get(URL + "authenticate/", HEADERS)
    .then((response) => {
      item = { ...item, user_id: response.data.id };
      axios.post(URL + "list_items/", item, HEADERS);
    })
    .then(() => axios.get(URL + "my_list_items.json", HEADERS))
    .then((response) => {
      setState({ ...state, list: response.data, view: "home" });
    })
    .catch((error) => console.log(error));
};

const EDIT_ITEM = (id, item, state, setState) => {
  axios.get(URL + "authenticate/", HEADERS)
    .then((response) => {
      item = { ...item, user_id: response.data.id };
      axios.put(`${URL}list_items/${id}`, item, HEADERS);
    })
    .then(() => axios.get(URL + "my_list_items.json", HEADERS))
    .then((response) => {
      setState({ ...state, list: response.data, view: "home" });
    })
    .catch((error) => console.log(error));
};

const CHANGE_STATUS = (name, id, done, setDone, state, setState) => {

  setDone(!done);

  axios.put(`${URL}list_items/${id}`, {
    name: name,
    completed: !done
  }, HEADERS)
    .then(() => axios.get(`${URL}list_items.json`, HEADERS))
    .then((response) => {
      setState({ ...state, list: response.data });
    })
    .catch((error) => console.log(error));
};

const GET_USER = (state, setState) => {
  axios.get(URL + 'authenticate/', HEADERS)
    .then((response) => {
      console.log(response.data);
      setState({ ...state, user: response.data });
      return response.data;
    })
    .catch((error) => console.log(error));
};

const LOGIN = (loginData, state, setState) => {
  axios.post(URL + 'login/', loginData)
    .then((response) => {
      setState({ ...state, user: response.data });
      return response;
    })
    .then((response) => {

      window.sessionStorage.setItem("token", `${response.data.token}`);

      const items = axios.get(`${URL}my_list_items`, {
        headers: {
          'Authorization': `Token ${response.data.token}`,
        }
      });

      return items;
    })
    .then((response) => setState({ ...state, list: response.data, view: "home" }))
    .catch((error) => console.log(error));
};

const LOGOUT = (state, setState) => {
  window.sessionStorage.removeItem("token");
  setState({ ...state, user: null, view: "login" });
};

const getUtcOffset = () => {
  const offset = new Date().getTimezoneOffset();
  return offset / 60;
};

export { LOGOUT, GET_USER, LOGIN, GET_ALL_ITEMS, GET_ITEMS_BY_USER, CHANGE_STATUS, EDIT_ITEM, ADD_ITEM, DELETE_ITEM, URL, HEADERS, TOKEN };