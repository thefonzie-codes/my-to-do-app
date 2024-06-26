import '../styles/Home.scss';
import { Link } from 'react-router-dom';

export default function Home () {

  return (
    <>
      <div className='Home'>
        <h1>Is It Done Yet?</h1>
        <h2>An accountability tool for chronic procrastinators.</h2>
        <h3>
          This app's goals are to help keep chronic procrastinators accountable by allowing them to create a live to-do list that reminds you of your tasks at the beinning of the day and asks you if you've completed them at the end of the day.
        </h3>
        <p>Have an account? <Link to="/login">Log In</Link></p>
        <p>Create an account <Link to="/register">Sign Up</Link></p>
      </div>
    </>
  );
};