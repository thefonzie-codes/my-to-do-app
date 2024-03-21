import axios from "axios";

const URL = "http://localhost:8000/";
const TOKEN = window.sessionStorage.getItem("token");
const HEADERS = {
  headers: {
    'Authorization': `Token ${TOKEN}`
  },
};

const GET_ALL_ITEMS = () => axios.get(URL + "list_items.json", HEADERS);

const DELETE_ITEM = (id, state, setState) => {
  axios.delete(URL + 'list_items/' + id, HEADERS)
    .then(() => axios.get(URL + "list_items.json", HEADERS))
    .then((response) => {
      console.log(response);
      setState({ ...state, list: response.data });
    });
};

const ADD_ITEM = (name, state, setState) => {
  const item = {
    name: name,
    completed: false
  };

  axios.post(URL + "list_items/", item, HEADERS)
    .then(() => axios.get(URL + "list_items.json", HEADERS))
    .then((response) => setState({ ...state, list: response.data, view: "home" }));
};

const EDIT_ITEM = (id, item, state, setState) => {
  axios.put(`${URL}list_items/${id}`, item, HEADERS)
    .then(setState({ ...state, view: "home" }));
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
    });
};

export { CHANGE_STATUS, EDIT_ITEM, ADD_ITEM, DELETE_ITEM, URL, HEADERS, TOKEN };