import ToDoItem from '../components/ToDoItem';
import '../styles/Home.css';
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

  const handleEmailSend = () => {
    axios.get('http://localhost:8000/reminder/', state.user)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => { console.log(error); });
  };

  return (
    <>
      <div className='Home'>
        <h1>Is it done yet?</h1>
        {items}
      </div>
      <button type="button" onClick={() => openAdd()}>Add</button>
      <button onClick={() => handleEmailSend()}>Send Reminder</button>
    </>
  );
};