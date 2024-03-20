import { useState } from "react";
import axios from "axios";

export default function AddItem({ setState, state }) {

  const [newItem, setNewItem] = useState("");

  const handleAdd = (name) => {
    const item = {
      name: name,
      completed: false
    };

    axios.post("http://localhost:8000/list_items/", item, {
      headers: {
        'Authorization': `Token ${state.user}`,
      }
    })
      .then(() => {
        axios.get(
          "http://localhost:8000/list_items.json", {
          headers: {
            'Authorization': `Token ${state.user}`,
          }
        }).then((response) => {
          console.log(response);
          setState({ ...state, list: response.data, view: "home" });
        });
      });

    setNewItem("");
  };

  return (
    <div className="modal-bg">
      <div className="AddItem modal">
        <form
          onSubmit={(evt) => {
            evt.preventDefault();
            handleAdd(newItem);
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
