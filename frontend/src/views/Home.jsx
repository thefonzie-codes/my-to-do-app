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

  useEffect(() => {
    axios.get(
      "http://localhost:8000/list_items.json", {
      headers: {
        'Authorization': `Token ${state.user}`,
      }
    }).then((response) => {
      console.log(response);
      setState({ ...state, list: response.data });
    });
  }, [state.user]);

  const openAdd = () => {
    setState({ ...state, view: "add" });
  };

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