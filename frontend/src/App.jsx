import './App.scss';
import useAppData from './hooks/useAppData';

// import EditItem from './components/EditItem';
// import AddItem from './components/AddItem';
// import Home from './views/UserHome';
// import LogIn from './components/LogIn';
// import SignUp from './components/SignUp';

export default function Root () {

  const { user, items } = useAppData();

  return (
    <>

    </>
  );
}