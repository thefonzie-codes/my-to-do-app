import  ToDoItemDetail from '../components/ToDoItemDetail';
import '../styles/Home.scss';
import { useAppData } from '../App';
import type { ToDoItemProps } from '../../types';
import { useNavigate } from 'react-router-dom';
import { LOGOUT } from '../hooks/helpers';

export default function Dashboard() {

  const { user, toDoList } = useAppData();
  console.log(user, toDoList);

  let items;

  if (toDoList) {
    items = toDoList.map((each: ToDoItemProps) => {
      return <ToDoItemDetail
        key={each.id}
        id={each.id}
        name={each.name}
        description={each.description}
        completed={each.completed}
        dueDate={each.dueDate} />;
    });
  }

  const navigate = useNavigate();

  const handleLogOut = () => {
    LOGOUT();
    navigate('/login');
  }

  return (
    <>
      <div className='Home'>
        <nav>
          <h2>Hi {user?.username}! Are these done yet?</h2>
        </nav>
        {items}
      </div>
      <button className="add" type="button" onClick={() => navigate('/add')}>Add</button>
      <button type="button" onClick={() => handleLogOut}>Log Out</button>
    </>
  );
};