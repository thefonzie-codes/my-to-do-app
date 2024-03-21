import { useState } from "react";
import axios from "axios";
import { ADD_ITEM } from "../hooks/helpers";

export default function AddItem({ setState, state }) {

  const [newItem, setNewItem] = useState("");

  return (
    <div className="modal-bg">
      <div className="AddItem modal">
        <form
          onSubmit={(evt) => {
            evt.preventDefault();
            ADD_ITEM(newItem, state, setState);
          }}>
          <input
            id="newItem"
            type='text'
            label='name'
            placeholder="Add new To-do"
            maxLength="100"
            onChange={(evt) => setNewItem(evt.target.value)}>
          </input>
          <button type='submit'>Add</button>
        </form>
        <button onClick={() => setState({ ...state, view: "home" })}>Cancel</button>
      </div>
    </div>
  );
}
