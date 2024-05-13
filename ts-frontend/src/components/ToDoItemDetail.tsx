import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

import { CHANGE_STATUS, daysUntilDueText } from "../hooks/helpers.ts";
import { ToDoItemProps } from "../../types";
import { useNavigate } from "react-router-dom";

export default function ToDoItemDetail({ 
  name, 
  completed, 
  id, 
  dueDate, 
  description }: ToDoItemProps) {

  const navigate = useNavigate();

  const [done, setDone] = useState(completed);

  const HANDLE_CHANGE = async () => {
    try {
      await CHANGE_STATUS(name, id, done);
      setDone(!done);
    }
    catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card">
      <h3>{name}
        <span className="edit" onClick={() => navigate(`${id}`)}>
          <FontAwesomeIcon icon={faPenToSquare} />
        </span>
      </h3>
      <h4>{daysUntilDueText(dueDate)}</h4>
      <p>{description}</p>
      <div className="options">
        <button className={done ? 'completed' : undefined} onClick={() => HANDLE_CHANGE()}>{done ? "Completed" : "Mark Complete"}</button>
      </div>
    </div>
  );
}