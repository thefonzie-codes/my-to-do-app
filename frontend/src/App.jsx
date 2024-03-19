import './App.css';
import useAppData from './hooks/useAppData';

import EditItem from './components/EditItem';
import AddItem from './components/AddItem';
import { useState, useEffect } from 'react';
import Home from './views/Home';
import LogIn from './components/LogIn';

function App() {

  const { state, setState } = useAppData();

  useEffect(() => {
    if (state.user) {
      console.log("user", state.user);
      setState({ ...state, view: "home" });
    }
  }, [state.user]);

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