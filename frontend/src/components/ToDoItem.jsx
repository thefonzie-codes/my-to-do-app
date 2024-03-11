import { useState } from "react";

export default function ToDoItem({ name, completed }) {

  const [done, setDone] = useState(completed)

  return (
    <div>
      <p>{ name }</p>
      <button onClick={() => setDone(!done)}>{done ? "Done" : "Not Yet"}</button>
    </div>
  );
}