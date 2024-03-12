import { useState } from "react";
import axios from "axios";

export default function ToDoItem({ name, completed, id, setState }) {

  const [done, setDone] = useState(completed)

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8000/list_items/${id}`).then((response) => {
      console.log(response);
    })
    .then(() => {
      axios.get(
        "http://localhost:8000/list_items.json").then((response) => {
        console.log(response);
        setState({ list: response.data });
      });
    });
  }

  const handleStatusChange = (id) => {
    
    setDone(!done);

    axios.put(`http://localhost:8000/list_items/${id}`, {
    name: name,  
    completed: !done
    }).then((response) => {
      console.log(response);
    })
    .then(() => {
      axios.get(
        "http://localhost:8000/list_items.json").then((response) => {
        console.log(response);
        setState({ list: response.data });
      });
    });
  }

  return (
    <div>
      <p>{ name }</p>
      <button onClick={() => handleStatusChange(id)}>{done ? "Done" : "Not Yet"}</button>
      <button onClick={() => handleDelete(id)}>Delete</button>
    </div>
  );
}