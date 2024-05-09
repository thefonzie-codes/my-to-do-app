import ToDoItem from '../components/ToDoItem';
import '../styles/Home.scss';
import { LOGOUT } from '../hooks/helpers';

export default function UserHome({ state, setState }) {

  const items = state.list.map(item => {
    return <ToDoItem
      key={item.id}
      id={item.id}
      state={state}
      setState={setState}
      name={item.name}
      description={item.description}
      completed={item.completed}
      dueDate={item.due_date} />;
  });

  const openAdd = () => {
    setState({ ...state, view: "add" });
  };

  const user = state.user.username;

  return (
    <>
      <div className='Home'>
        <nav>
          <h2>Hi {user}! Are these done yet?</h2>
        </nav>
        {items}
      </div>
      <button className="add" type="button" onClick={() => openAdd()}>Add</button>
      <button type="button" onClick={() => LOGOUT(state, setState)}>Log Out</button>
    </>
  );
};