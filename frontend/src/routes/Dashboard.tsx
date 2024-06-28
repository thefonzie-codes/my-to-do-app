import ToDoItemDetail from '../components/ToDoItemDetail';
import '../styles/Home.scss';
import { useAppData } from '../App';
import type { ToDoItemProps } from '../../types';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {

  const navigate = useNavigate();

  const { user, toDoList } = useAppData();

  if (!user) {
    navigate('/login');
  }

  let items: any[] = [];

  if (toDoList) {
    items = toDoList.map((each: ToDoItemProps) => {
      return <ToDoItemDetail
        key={each.id}
        id={each.id}
        name={each.name}
        description={each.description}
        completed={each.completed}
        due_date={each.due_date} />;
    });
  }

  items.sort((a, b) => a - b);

  return (
    <>
      <div className='Home'>
        <h2>Hi {user?.username}! Are these done yet?</h2>
        {items}
        <button className="add" type="button" onClick={() => navigate('/add')}>Add</button>
      </div>
    </>
  );
};