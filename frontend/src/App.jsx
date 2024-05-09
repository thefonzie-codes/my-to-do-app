import './App.scss';
import useAppData from './hooks/useAppData';

import EditItem from './components/EditItem';
import AddItem from './components/AddItem';
import Home from './views/UserHome';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';

function App() {

  const { state, setState } = useAppData();

  return (
    <>
      {state.view === "home" && <UserHome state={state} setState={setState} />}
      {state.view === "login" && <LogIn state={state} setState={setState} />}
      {state.view === "add" && <AddItem state={state} setState={setState} />}
      {state.view === "edit" && <EditItem id={state.itemToEdit} state={state} setState={setState}/>}
      {state.view === "signup" && <SignUp state={state} setState={setState} />}
    </>
  );
}

export default App;