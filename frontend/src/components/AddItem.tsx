import { useState } from "react";
import { ADD_ITEM, daysUntilDueCount, GET_ITEMS_BY_USER } from "../hooks/helpers";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faAlignJustify, faIndent } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import { useAppData } from "../App";

export default function AddItem() {

  const { setToDoList } = useAppData();

  const formattedDate = (date: Date) => Intl.DateTimeFormat("fr-CA", { year: "numeric", month: "2-digit", day: "2-digit" }).format(date);

  const [taskData, setTaskData] = useState({
    name: "",
    description: "",
    due_date: new Date(),
    selectedDate: new Date(),
    completed: false
  });

  const navigate = useNavigate();

  const HANDLE_ADD = async () => {
    await ADD_ITEM({ ...taskData, due_date: formattedDate(taskData.selectedDate) });
    const updatedList = await GET_ITEMS_BY_USER();
    setToDoList(updatedList);
    navigate('/dashboard');
  }

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
                setTaskData({ ...taskData, selectedDate: date });
              }
            }}
            onSelect={(date) => {
              if (date) {
                setTaskData({ ...taskData, selectedDate: date });
              }
            }}
          />
          <div className="options">
            <button className='add' type='submit'>Save</button>
            <button onClick={() => navigate(`/dashboard`)}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
