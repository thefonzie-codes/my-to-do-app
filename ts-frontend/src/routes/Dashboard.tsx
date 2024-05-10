import  ToDoItemDetail from './components/ToDoItemDetail';
import '../styles/Home.scss';
import { useAppData } from '../App';
import type { ToDoItem } from '../../types';

export default function Dashboard() {

  const { user, toDoList } = useAppData();
  console.log(user, toDoList);

  let items;

  if (toDoList) {
    items = toDoList.map((each: ToDoItem) => {
      return <ToDoItemDetail
        key={each.id}
        id={each.id}
        name={each.name}
        description={each.description}
        completed={each.completed}
        dueDate={each.dueDate} />;
    });
  }

  // const openAdd = () => {
  //   setState({ ...state, view: "add" });
  // };

  return (
    <>
      <>{user?.username}</>
      <div className='Home'>
        <nav>
          <h2>Hi {user?.username}! Are these done yet?</h2>
        </nav>
        {items}
      </div>
      {/* <button className="add" type="button" onClick={() => openAdd()}>Add</button>
      <button type="button" onClick={() => LOGOUT(state, setState)}>Log Out</button> */}
    </>
  );
};