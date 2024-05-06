import { useState } from "react";

import { CHANGE_STATUS, DELETE_ITEM, GET_ITEMS_BY_USER } from "../hooks/helpers";

export default function ToDoItem({ name, completed, id, setState, state, dueDate }) {

  const HANDLE_CHANGE = async () => {
    try {
      await CHANGE_STATUS(name, id, done, state.user.id);
      setDone(!done);
    }
    catch (error) {
      console.log(error);
    }
  };

  const [done, setDone] = useState(completed);

  return (
    <div className="card">
      <h3>{name}</h3>
      <p>{dueDate}</p>
      <div className="options">
        <button onClick={() => HANDLE_CHANGE()}>{done ? "Done" : "Not Yet"}</button>
        <button onClick={() => setState({ ...state, view: "edit", itemToEdit: id })}>Edit</button>
      </div>
    </div>
  );
}