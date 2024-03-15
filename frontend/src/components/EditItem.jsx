import axios from "axios";
import '../styles/EditItem.css';

import { useState, useEffect } from "react";

export default function EditItem({ id }) {

  const handleEdit = (item) => {
    axios.put(`http://localhost:8000/list_items/${id}.json`, item).then((response) => {
      console.log(response);
    });
  };

  const [state, setState] = useState({ name: "", completed: false });

  useEffect(() => {

    axios.get(
      `http://localhost:8000/list_items/${id}.json`).then((response) => {
        console.log(response);
        setState(response.data);
      });

  }, []);

  return (
    <div className="EditItem modal">
      <h1>Edit Item</h1>
      <form
        onSubmit={(evt) => {
          evt.preventDefault();
          handleEdit(state);
        }}>
        <input
          id="editItem"
          type='text'
          label='editItem'
          placeholder={state.name}
          maxLength="100"
          onChange={(evt) => setState({ ...state, name: evt.target.value })}>
        </input>
        <p>Completed:
          <input
            label='completed'
            type="checkbox"
            checked={state.completed}
            onChange={(evt) => setState({ ...state, completed: evt.target.checked })}>
          </input>
        </p>
        <br></br>
        <button type='submit'>Save</button>
      </form>
    </div>
  );
}