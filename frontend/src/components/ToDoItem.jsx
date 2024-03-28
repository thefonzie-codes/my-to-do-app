import { useState } from "react";
import axios from "axios";

import { CHANGE_STATUS, DELETE_ITEM } from "../hooks/helpers";

export default function ToDoItem({ name, completed, id, setState, state, dueDate }) {

  const formatDate = (date) => {
    let newDate = new Date(date);
    return newDate;
  };

  const [done, setDone] = useState(completed);

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