import axios from "axios";
import '../styles/EditItem.css';
import DatePicker from "react-datepicker";

import { EDIT_ITEM } from "../hooks/helpers";

import { useState } from "react";

export default function EditItem({ id, state, setState }) {


  const task = state.list.find((task) => task.id === id);

  const [taskData, setTaskData] = useState({ name: task.name, completed: false, due_date: task.due_date });

  console.log(state);

  return (
    <div className="modal-bg">
      <div className="EditItem modal">
        <h1>Edit Item</h1>
        <form
          onSubmit={(evt) => {
            evt.preventDefault();
            console.log('taskdata', taskData);
            EDIT_ITEM(id, taskData, state, setState);
          }}>
          <input
            id="editItem"
            type='text'
            label='editItem'
            placeholder={taskData.name}
            maxLength="100"
            onChange={(evt) => setTaskData({ ...taskData, name: evt.target.value })}>
          </input>
          <DatePicker
            selected={taskData.due_date}
            onChange={(date) => setTaskData({ ...taskData, due_date: date })}
            onSelect={(date) => {
              const formattedDate = Intl.DateTimeFormat("fr-CA", {year: "numeric", month: "2-digit", day: "2-digit"}).format(date);
              console.log(formattedDate);
              setTaskData({ ...taskData, due_date: formattedDate });
            }} />
          <p>Completed:
            <input
              label='completed'
              type="checkbox"
              checked={taskData.completed}
              onChange={(evt) => setTaskData({ ...taskData, completed: evt.target.checked })}>
            </input>
          </p>
          <br></br>
          <button type='submit'>Save</button>
        </form>
        <button onClick={() => setState({ ...state, view: "home" })}>Cancel</button>
      </div>
    </div>
  );
}