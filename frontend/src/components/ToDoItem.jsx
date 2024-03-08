import { useState } from "react";

export default function ToDoItem() {

  const [done, setDone] = useState(true)

  return (
    <div>
      <p>Placeholder text here</p>
      <button onClick={() => setDone(!done)}>{done ? "Done" : "Not Yet"}</button>
    </div>
  );
}