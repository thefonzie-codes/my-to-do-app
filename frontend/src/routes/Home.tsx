import '../styles/Home.scss';
import { Link } from 'react-router-dom';
import { useAppData } from '../App';

export default function Home () {

  const { user } = useAppData();

  return (
    <>
      <div className='Home'>
        <h1>Done?</h1>
        <h2>An accountability tool for chronic procrastinators.</h2>
        <h3>
          This app's goals are to help keep chronic procrastinators accountable by allowing them to create a live to-do list that reminds you of your tasks at the beinning of the day and asks you if you've completed them at the end of the day.
        </h3>
        {!user && <p>Have an account? <Link to="/login">Log In</Link></p>}
        {!user && <p>Create an account <Link to="/register">Sign Up</Link></p>}
      </div>
    </>
  );
};