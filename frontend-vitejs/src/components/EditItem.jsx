import axios from "axios";

import { useState, useEffect } from "react";

export default function EditItem({ id, state, setState }) {

  const handleEdit = (item) => {
    axios.put(`http://localhost:8000/list_items/${id}.json`, item).then((response) => {
      console.log(response);
    });
  };

  useEffect(() => {

    axios.get(
      `http://localhost:8000/list_items/${id}.json`).then((response) => {
        console.log(response);
        setState(response.data);
      });

  }, []);

  return (
    <form
      className="flex-col space-x-4 space-y-4"
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
      <div className="space-x-4">
        <p>Completed:</p>
        <input
          label='completed'
          type="checkbox"
          checked={state.completed}
          onChange={(evt) => setState({ ...state, completed: evt.target.checked })}>
        </input>
      </div>
      <br></br>
      <button type='submit'>Save</button>
    </form>
  );
}