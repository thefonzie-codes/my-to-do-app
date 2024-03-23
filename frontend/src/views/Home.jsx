import ToDoItem from '../components/ToDoItem';
import '../styles/Home.css';
import { useEffect } from 'react';
import { GET_ITEMS_BY_USER, GET_USER, LOGOUT } from '../hooks/helpers';

export default function Home({ state, setState }) {

  const items = state.list.map(item => {
    return <ToDoItem
      key={item.id}
      id={item.id}
      state={state}
      setState={setState}
      name={item.name}
      completed={item.completed}
      dueDate={item.due_date} />;
  });

  const openAdd = () => {
    setState({ ...state, view: "add" });
  };

  // useEffect(() => {
  //   GET_ITEMS_BY_USER();
  // }, []);

  return (
    <>
      <div className='Home'>
        <h1>Is it done yet?</h1>
        {items}
      </div>
      <button type="button" onClick={() => openAdd()}>Add</button>
      <button type="button" onClick={() => LOGOUT(state, setState)}>Log Out</button>
    </>
  );
};