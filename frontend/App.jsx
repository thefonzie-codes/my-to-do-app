import './App.scss';
import useAppData from './src/hooks/useAppData';

import EditItem from './src/components/EditItem';
import AddItem from './src/components/AddItem';
import Home from './src/views/Home';
import LogIn from './src/components/LogIn';
import SignUp from './src/components/SignUp';

function App() {

  const { state, setState } = useAppData();

  return (
    <>
      {state.view === "home" && <Home state={state} setState={setState} />}
      {state.view === "login" && <LogIn state={state} setState={setState} />}
      {state.view === "add" && <AddItem state={state} setState={setState} />}
      {state.view === "edit" && <EditItem id={state.itemToEdit} state={state} setState={setState}/>}
      {state.view === "signup" && <SignUp state={state} setState={setState} />}
    </>
  );
}

export default App;