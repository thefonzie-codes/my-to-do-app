import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faAlignJustify, faIndent } from '@fortawesome/free-solid-svg-icons';

import { EDIT_ITEM, daysUntilDueCount, DELETE_ITEM, GET_ITEM_BY_ID } from "../hooks/helpers";
import { useAppData } from "../App";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditItem() {

  const params = useParams();

  const navigate = useNavigate();

  const formattedDate = (date: any) => Intl.DateTimeFormat("fr-CA", { year: "numeric", month: "2-digit", day: "2-digit" }).format(date);
  
  const { toDoList } = useAppData();

  const [taskData, setTaskData] = useState({
    name: "",
    description: "",
    completed: false,
    due_date: new Date(),
    selectedDate: new Date(),
    id: undefined
  });

  useEffect(() => {
    const itemId = (params.ItemId ?? parseInt(params.itemId ?? ''));
    const task = itemId ?? GET_ITEM_BY_ID(itemId);
    setTaskData(task);
  }, []);

  const HANDLE_EDIT = async () => {
    try {
      await EDIT_ITEM(taskData);
      navigate('/');
    }
    catch (error) {
      console.log(error);
    }
  };

  const HANDLE_DELETE = async () => {
    try {
      await DELETE_ITEM(taskData.id);
      navigate('/');
    }
    catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg">
      <div className="modal">
        <form
          onSubmit={() => {
            if (taskData.name === "" || taskData.name === undefined || taskData.name === null) {
              alert("Please enter a title for the task");
              return;
            }
            if (daysUntilDueCount(taskData.due_date) < 0) {
              alert("Please enter a due date of today or in the future");
              return;
            }
            HANDLE_EDIT();
          }}>
          <label><FontAwesomeIcon icon={faAlignJustify} />  Title:</label>
          <input
            value={taskData.name}
            id="taskName"
            type='text'
            maxLength={100}
            onChange={(evt) => setTaskData({ ...taskData, name: evt.target.value })}>
          </input>
          <label><FontAwesomeIcon icon={faIndent} />  Description:</label>
          <input
            value={taskData.description}
            id="taskDescription"
            type="text"
            onChange={(evt) => setTaskData({ ...taskData, description: evt.target.value })}
          >
          </input>
          <label><FontAwesomeIcon icon={faCalendar} />  Due Date:</label>
          <DatePicker
            selected={taskData.selectedDate}
            onChange={(date) => {
              if (date) {
                setTaskData({ ...taskData, due_date: formattedDate(date), selectedDate: date });
              }
            }}
            onSelect={(date) => {
              if (date) {
                setTaskData({ ...taskData, due_date: formattedDate(date), selectedDate: date });
              }
            }}
          />
          <div className="options">
            <button type='submit'>Save</button>
            <button type='button' className="delete" onClick={() => HANDLE_DELETE()}>Delete</button>
            <button onClick={() => navigate('/')}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}