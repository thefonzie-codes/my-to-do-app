import { useState } from "react";
import { ADD_ITEM } from "../hooks/helpers";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faAlignJustify, faIndent } from '@fortawesome/free-solid-svg-icons';
import { daysUntilDueCount } from "../hooks/helpers";
import { useNavigate } from "react-router-dom";
import { useAppData } from "../App";

export default function AddItem() {

  const formattedDate = (date: Date) => Intl.DateTimeFormat("fr-CA", { year: "numeric", month: "2-digit", day: "2-digit" }).format(date);

  const { user } = useAppData();

  const [taskData, setTaskData] = useState({
    name: "",
    description: "",
    due_date: formattedDate(new Date()),
    selectedDate: new Date(),
    completed: false
  });

  const navigate = useNavigate();

  const HANDLE_ADD = async () => {
    await ADD_ITEM(taskData);
    navigate(`/${user?.id}`);
  };

  return (
    <div className="bg">
      <div className="modal">
        <form
          onSubmit={(evt) => {
            evt.preventDefault();
            if (taskData.name === "" || taskData.name === undefined || taskData.name === null) {
              alert("Please enter a title for the task");
              return;
            }
            if (daysUntilDueCount(taskData.due_date) < 0) {
              alert("Please enter a due date of today or in the future");
              return;
            }
            HANDLE_ADD();
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
            <button className='add' type='submit'>Save</button>
            <button onClick={() => navigate(`/${user?.id}`)}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
