import { Link, useNavigate } from 'react-router-dom';
import { User } from '../../types';


export default function Nav({ user }: { user: User })  {

  const navigate = useNavigate();

  return (
    <nav>
      <button className="logo" onClick={() => navigate('home')}>
        <h2>Is It Done Yet?</h2>
      </button>
      <div className="nav-links">
        <Link to='/home'>Home</Link>
        {user && <Link to='/dashboard'>Dashboard</Link>}
        {!user && <Link to='/login'>Login</Link>}
        {!user && <Link to='/register'>Register</Link>}
        {user && <Link to='/logout'>Logout</Link>}
      </div>
    </nav>
  );
}