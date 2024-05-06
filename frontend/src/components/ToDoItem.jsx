import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

import { CHANGE_STATUS, daysUntilDueText } from "../hooks/helpers";

export default function ToDoItem({ name, completed, id, setState, state, dueDate, description }) {

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
      <h2>{name}
        <span className="edit" onClick={() => setState({ ...state, view: "edit", itemToEdit: id })}>
          <FontAwesomeIcon icon={faPenToSquare} />
        </span>
      </h2>
      <h4>{daysUntilDueText(dueDate)}</h4>
      <p>{description}</p>
      <div className="options">
        <button onClick={() => HANDLE_CHANGE()}>{done ? "Mark Incomplete" : "Mark Complete"}</button>
      </div>
    </div>
  );
}