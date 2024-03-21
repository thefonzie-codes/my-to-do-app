import ToDoItem from '../components/ToDoItem';
import '../styles/Home.css';
import { useEffect } from 'react';
import axios from 'axios';

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

  useEffect(() => {
    axios.get(
      "http://localhost:8000/list_items.json", {
      headers: {
        'Authorization': `Token ${state.user}`,
      }
    }).then((response) => {
      setState({ ...state, list: response.data });
    });
  }, []);

  return (
    <>
      <div className='Home'>
        <h1>Is it done yet?</h1>
        {items}
      </div>
      <button type="button" onClick={() => openAdd()}>Add</button>
    </>
  );
};