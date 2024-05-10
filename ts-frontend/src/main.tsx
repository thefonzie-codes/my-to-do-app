import React from 'react';
import ReactDOM from 'react-dom/client';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// import { useAppData as rootLoader } from './hooks/useAppData';

import App from './App.tsx';
// import UserHome from './views/UserHome.jsx';
// import EditItem from './components/EditItem';
// import AddItem from './components/AddItem';
// import Home from './routes/Home';
import LogIn from './routes/LogIn';
import SignUp from './routes/SignUp';
import Dashboard from './routes/Dashboard';
import ErrorPage from './error-page';
import './index.css';

// import { LOGIN } from './components/LogIn.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: ":userId",
        element: <Dashboard />,
      }
    ]
  },
  //   children: [
  //     {
  //       path: "UserHome",
  //       element: <UserHome />,
  //     },
  //     {
  //       path: "add",
  //       element: <AddItem />,
  //     },
  //     {
  //       path: "edit/:id",
  //       element: <EditItem />,
  //     },
  //   ]
  // },
  {
    path: "login",
    element: <LogIn />,
  },
  {
    path: "signup",
    element: <SignUp />,
  },
  // {
  //   path: "/",
  //   element: <App />,
  // },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
