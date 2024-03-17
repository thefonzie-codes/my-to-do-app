import axios from "axios";
import '../styles/EditItem.css';

import { useState } from "react";

export default function EditItem({ id, state, setState }) {

  const handleEdit = (item) => {
    axios.put(`http://localhost:8000/list_items/${id}.json`, item).then((response) => {
      console.log(response);
    });
  };

  const task = state.list.find((task) => task.id === id);

  const [taskData, setTaskData] = useState({ name: task.name, completed: false });

  console.log(state);

  return (
    <div className="modal-bg">
      <div className="EditItem modal">
        <h1>Edit Item</h1>
        <form
          onSubmit={(evt) => {
            evt.preventDefault();
            handleEdit(taskData);
          }}>
          <input
            id="editItem"
            type='text'
            label='editItem'
            placeholder={taskData.name}
            maxLength="100"
            onChange={(evt) => setTaskData({ ...taskData, name: evt.target.value })}>
          </input>
          <p>Completed:
            <input
              label='completed'
              type="checkbox"
              checked={taskData.completed}
              onChange={(evt) => setTaskData({ ...taskData, completed: evt.target.checked })}>
            </input>
          </p>
          <p>{taskData.due_date}</p>
          <br></br>
          <button type='submit'>Save</button>
        </form>
          <button onClick={() => setState({ ...state, view: "home" })}>Cancel</button>
      </div>
    </div>
  );
}