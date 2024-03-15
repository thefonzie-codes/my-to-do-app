import AddItem from '../components/AddItem';
import ToDoItem from '../components/ToDoItem';
import '../styles/Home.css';

export default function Home({ state, setState }) {

  const items = state.list.map(item => {
    return <ToDoItem
      state={state}
      setState={setState}
      key={item.id}
      id={item.id}
      name={item.name}
      completed={item.completed} />;
  });

  console.log('home state', state);

  return (
    <div className='Home'>
      <h1>Is it done yet?</h1>
      {items}
      <AddItem setState={setState} state={state} />
    </div>
  );
};