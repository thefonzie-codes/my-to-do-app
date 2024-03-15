import './App.css';
import useAppData from './hooks/useAppData';

import EditItem from './components/EditItem';
import { useState } from 'react';
import Home from './views/Home';

function App() {

  const { state, setState } = useAppData();

  return (
    <>
      <Home state={state} setState={setState} />
      {state.view === "edit" && <EditItem id={state.itemToEdit} state={state} setState={setState}/>}
    </>
  );
}

export default App;