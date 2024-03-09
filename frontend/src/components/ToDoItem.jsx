import { useState } from "react";

export default function ToDoItem({ name, done }) {

  const [isDone, setDone] = useState(done)

  return (
    <div>
      <p>{name}</p>
      <button onClick={() => setDone(!isDone)}>{isDone ? "Done" : "Not Yet"}</button>
    </div>
  );
}