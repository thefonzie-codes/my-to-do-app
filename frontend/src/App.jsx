import './App.css'
import useAppData from './hooks/useAppData'

import ToDoItem from './components/ToDoItem'
import AddItem from './components/AddItem';

function App() {

  const { state, setState } = useAppData();

  const items = state.list.map(item => {
    return <ToDoItem key={item.id} id={item.id} name={item.name} completed={item.completed} setState={setState}/>
  })
  
  return (
    <>
      <h1>Is it done yet?</h1>
      {items}
      <AddItem setState={setState} state={state}/>
      <div className="card">
      </div>
    </>
  )  
}

export default App;
