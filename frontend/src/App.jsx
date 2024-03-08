import './App.css'
import useAppData from './hooks/useAppData'

import ToDoItem from './components/ToDoItem'

function App() {

  const todo = useAppData();
  
  return (
    <>
      <h1>Is it done yet?</h1>
      {/* <ToDoItem /> */}
      {/* <ToDoItem /> */}
      { JSON.stringify(todo) }
      <div className="card">
      </div>
    </>
  )  
}

export default App
