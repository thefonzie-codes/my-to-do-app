import ToDoItemDetail from '../components/ToDoItemDetail';
import '../styles/Home.scss';
import { useAppData } from '../App';
import type { ToDoItemProps } from '../../types';
import { useNavigate } from 'react-router-dom';
import { daysUntilDueCount } from '../hooks/helpers';

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
      <div className='Dashboard'>
        <div className='to_do'>
          <h2>Today</h2>
          {items.filter((item) => !item.props.completed && daysUntilDueCount(item.props.due_date) <= 0)}
        </div>
        <div className='to_do'>
          <h2>Completed Today</h2>
          {items.filter((item) => item.props.completed && daysUntilDueCount(item.props.due_date) === 0)}
        </div>
        <div className='to_do'>
          <h2>Upcoming tasks</h2>
          {items.filter((item) => !item.props.completed && daysUntilDueCount(item.props.due_date) > 0)}
        </div>
      </div>
        <button className="add" type="button" onClick={() => navigate('/add')}>Add</button>
    </>
  );
};