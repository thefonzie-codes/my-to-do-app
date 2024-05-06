import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { EDIT_ITEM, GET_ITEMS_BY_USER } from "../hooks/helpers";

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
    completed: false,
    due_date: task.due_date,
    selectedDate: new Date(task.due_date),
    user_id: state.user.id
  });

  console.log(state);

  return (
    <div className="bg">
      <div className="modal">
        <form
          onSubmit={(evt) => {
            evt.preventDefault();
            console.log('taskdata', taskData);
            HANDLE_EDIT();
          }}>
          <input
            value={taskData.name}
            id="editItem"
            type='text'
            label='editItem'
            maxLength="100"
            onChange={(evt) => setTaskData({ ...taskData, name: evt.target.value })}>
          </input>
          <DatePicker
            selected={taskData.selectedDate}
            onChange={(date) => setTaskData({ ...taskData, due_date: date })}
            onSelect={(date) => {
              console.log(date.toUTCString());
              const formattedDate = Intl.DateTimeFormat("fr-CA", { year: "numeric", month: "2-digit", day: "2-digit" }).format(date);
              console.log(formattedDate);
              setTaskData({ ...taskData, due_date: formattedDate, selectedDate: date });
            }} />
          <p>Completed:
            <input
              label='completed'
              type="checkbox"
              checked={taskData.completed}
              onChange={(evt) => setTaskData({ ...taskData, completed: evt.target.checked })}>
            </input>
          </p>
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