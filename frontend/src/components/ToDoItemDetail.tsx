import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

import { CHANGE_STATUS, daysUntilDueText, GET_ITEMS_BY_USER } from "../hooks/helpers.ts";
import { ToDoItemProps } from "../../types";
import { useNavigate } from "react-router-dom";
import { useAppData } from "../App";

export default function ToDoItemDetail({ 
  name, 
  completed, 
  id, 
  due_date, 
  description 
}: ToDoItemProps) {

  const navigate = useNavigate();

  const { setToDoList } = useAppData();

  const [done, setDone] = useState(completed);

  const HANDLE_CHANGE = async () => {
    try {
      await CHANGE_STATUS(name, id, done);
      const updatedList = await GET_ITEMS_BY_USER();
      setToDoList(updatedList);
      navigate('/dashboard');
      setDone(!done);
    }
    catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card">
      <h3>{name}
        <span className="edit" onClick={() => navigate(`/edit/${id}`)}>
          <FontAwesomeIcon icon={faPenToSquare} />
        </span>
      </h3>
      <h4>{daysUntilDueText(due_date)}</h4>
      <p>{description}</p>
      <div className="options">
        <button className={done ? 'completed' : undefined} onClick={() => HANDLE_CHANGE()}>{done ? "Completed" : "Mark Complete"}</button>
      </div>
    </div>
  );
}