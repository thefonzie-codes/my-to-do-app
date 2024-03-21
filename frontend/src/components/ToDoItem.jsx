import { useState } from "react";
import axios from "axios";

import { CHANGE_STATUS, DELETE_ITEM } from "../hooks/helpers";

export default function ToDoItem({ name, completed, id, setState, state, dueDate }) {

  const [done, setDone] = useState(completed);

  // const handleDelete = (id) => {
  //   axios.delete(`http://localhost:8000/list_items/${id}`, {
  //     headers: {
  //       'Authorization': `Token ${state.user}`,
  //     }
  //   }).then((response) => {
  //     console.log(response);
  //   })
  //     .then(() => {
  //       axios.get(
  //         "http://localhost:8000/list_items.json", {
  //           headers: {
  //             'Authorization': `Token ${state.user}`,
  //           }
  //       }).then((response) => {
  //         console.log(response);
  //         setState({...state, list: response.data });
  //       });
  //     });
  // };

  // const DELETE_ITEM = (id, state, setState) => {
  //   axios.delete(URL + 'list_items/' + id, HEADERS)
  //     .then(() => axios.get(URL + "list_items.json", HEADERS))
  //     .then((response) => {
  //       console.log(response);
  //       setState({ ...state, list: response.data });
  //     });
  // };

  // const handleStatusChange = (id) => {

  //   setDone(!done);

  //   axios.put(`http://localhost:8000/list_items/${id}`, {
  //     name: name,
  //     completed: !done
  //   }, {
  //     headers: {
  //       'Authorization': `Token ${state.user}`,
  //     }
  //   }).then((response) => {
  //     console.log(response);
  //   })
  //     .then(() => {
  //       axios.get(
  //         "http://localhost:8000/list_items.json", {
  //         headers: {
  //           'Authorization': `Token ${state.user}`,
  //         }
  //       }).then((response) => {
  //         console.log(response);
  //         setState({ ...state, list: response.data });
  //       });
  //     });
  // };

  return (
    <div className="card">
      <p>{name}</p>
      <p>{dueDate}</p>
      <button onClick={() => CHANGE_STATUS(name, id, done, setDone, state, setState)}>{done ? "Done" : "Not Yet"}</button>
      <button onClick={() => DELETE_ITEM(id, state, setState)}>Delete</button>
      <button onClick={() => setState({ ...state, view: "edit", itemToEdit: id })}>Edit</button>
    </div>
  );
}