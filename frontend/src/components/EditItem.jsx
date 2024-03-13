import axios from "axios";

import { useState, useEffect } from "react";

export default function EditItem({ id }) {

  const handleEdit = (item) => {
    axios.put(`http://localhost:8000/list_items/${id}.json`, item).then((response) => {
      console.log(response);
    });
  };

  const [state, setState] = useState({});

  useEffect(() => {

    axios.get(
      `http://localhost:8000/list_items/${id}.json`).then((response) => {
        console.log(response);
        setState(response.data);
      });

  }, []);

  return (
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
        onChange={(evt) => setState({ name: evt.target.value })}>
      </input>
      <button type='submit'>Save</button>
    </form>
  );
}