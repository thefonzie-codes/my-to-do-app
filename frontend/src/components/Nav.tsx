import { Link, useNavigate } from 'react-router-dom';
import { User } from '../../types';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../styles/index.scss';


export default function Nav({ user }: { user: User; }) {

  const navigate = useNavigate();

  return (
    <nav>
      <button className="logo" onClick={() => navigate('home')}>
        <h2>Done?</h2>
      </button>
      <div className="nav-links">
        <Link to='/home'>Home</Link>
        {user && <Link to='/dashboard'>Dashboard</Link>}
        {!user && <Link to='/login'>Login</Link>}
        {!user && <Link to='/register'>Register</Link>}
        {user && <Link to='/logout'>Logout</Link>}
        {user && <Link to='/user_settings'><FontAwesomeIcon icon={faGear} /></Link>}
      </div>
    </nav>
  );
}