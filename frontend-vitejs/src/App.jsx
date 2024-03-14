import './App.css';
import useAppData from './hooks/useAppData';

import ToDoItem from './components/ToDoItem';
import AddItem from './components/AddItem';
import EditItem from './components/EditItem';

export default function App() {

  const { state, setState } = useAppData();

  // const items = state.list.map(item => {
  //   return <ToDoItem key={item.id} id={item.id} name={item.name} completed={item.completed} setState={setState} />;
  // });

  return (
    // <>
    //   <div className='flex-auto bg-#242424 text-white h-full space-y-4'>
    //     <h1 className='text-3xl font-bold underline'>Is it done yet?</h1>
    //     {/* {items}
    //   <AddItem setState={setState} state={state}/> */}
    //     <EditItem id={3} state={state} setState={setState} />
    //   </div>
    // </>
  );
}