import './App.css';
import useAppData from './src/hooks/useAppData';

import EditItem from './src/components/EditItem';
import AddItem from './src/components/AddItem';
import Home from './src/views/Home';
import LogIn from './src/components/LogIn';

function App() {

  const { state, setState } = useAppData();

  return (
    <>
      {state.view === "home" && <Home state={state} setState={setState} />}
      {state.view === "login" && <LogIn state={state} setState={setState} />}
      {state.view === "add" && <AddItem state={state} setState={setState} />}
      {state.view === "edit" && <EditItem id={state.itemToEdit} state={state} setState={setState}/>}
    </>
  );
}

export default App;