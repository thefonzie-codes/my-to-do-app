import './App.css'
import useAppData from './hooks/useAppData'

import ToDoItem from './components/ToDoItem'

function App() {

  const todo = useAppData();

  const items = todo.list.map(item => {
    return <ToDoItem key={item.id} name={item.name} completed={item.completed} />
  })
  
  return (
    <>
      <h1>Is it done yet?</h1>
      {items}
      <div className="card">
      </div>
    </>
  )  
}

export default App;
