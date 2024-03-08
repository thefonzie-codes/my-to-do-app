import './App.css'

import ToDoItem from './components/ToDoItem'

function App() {
  
  return (
    <>
      <h1>Is it done yet?</h1>
      <ToDoItem />
      <ToDoItem />
      <div className="card">
      </div>
    </>
  )  
}

export default App
