import { useState } from "react";
import { ADD_ITEM, GET_ITEMS_BY_USER } from "../hooks/helpers";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faAlignJustify, faIndent } from '@fortawesome/free-solid-svg-icons';
import { daysUntilDueCount } from "../hooks/helpers";

export default function AddItem({ setState, state }) {

  const [taskData, setTaskData] = useState({
    name: "",
    description: "",
    due_date: "",
    selectedDate: new Date(),
    completed: false
  });

  const HANDLE_ADD = async () => {
    await ADD_ITEM(taskData, state);
    const items = await GET_ITEMS_BY_USER(state, setState);
    setState({ ...state, view: "home", list: items });
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
            label='editItem'
            maxLength="100"
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
            onSelect={(date) => {
              console.log('select' + date);
              const formattedDate = Intl.DateTimeFormat("fr-CA", { year: "numeric", month: "2-digit", day: "2-digit" }).format(date);
              console.log(formattedDate);
              setTaskData({ ...taskData, due_date: formattedDate, selectedDate: date });
            }} />
          <div className="options">
            <button className='add' type='submit'>Save</button>
            <button onClick={() => setState({ ...state, view: "home" })}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
