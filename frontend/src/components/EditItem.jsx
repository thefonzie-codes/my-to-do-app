import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faAlignJustify, faIndent } from '@fortawesome/free-solid-svg-icons';

import { EDIT_ITEM, GET_ITEMS_BY_USER, daysUntilDueCount, DELETE_ITEM } from "../hooks/helpers";

import { useState } from "react";

export default function EditItem({ id, state, setState }) {

  const task = state.list.find((task) => task.id === id);

  const HANDLE_EDIT = async () => {
    try {
      await EDIT_ITEM(id, taskData);
      const items = await GET_ITEMS_BY_USER();
      setState({ ...state, view: "home", list: items });
    }
    catch (error) {
      console.log(error);
    }
  };

  const HANDLE_DELETE = async () => {
    try {
      await DELETE_ITEM(id);
      const items = await GET_ITEMS_BY_USER(state, setState);
      setState({ ...state, view: "home", list: items });
    }
    catch (error) {
      console.log(error);
    }
  };

  const [taskData, setTaskData] = useState({
    name: task.name,
    description: task.description,
    completed: false,
    due_date: task.due_date,
    selectedDate: new Date(task.due_date + "T00:00:00"),
    user_id: state.user.id
  });

  console.log(state);

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
            HANDLE_EDIT();
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
            <button type='submit'>Save</button>
            <button className="delete" onClick={() => HANDLE_DELETE()}>Delete</button>
            <button onClick={() => setState({ ...state, view: "home" })}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}