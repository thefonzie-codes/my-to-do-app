import { useState } from "react";
import { deleteListItem } from "../hooks/helpers";

export default function ToDoItem({ name, completed, id }) {

  const [done, setDone] = useState(completed)

  return (
    <div>
      <p>{ name }</p>
      <button onClick={() => setDone(!done)}>{done ? "Done" : "Not Yet"}</button>
      <button onClick={() => deleteListItem(id)}>Delete</button>
    </div>
  );
}