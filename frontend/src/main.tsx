import React from 'react';
import ReactDOM from 'react-dom/client';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import App from './App.tsx';
import Home from './routes/Home';
import EditItem from './components/EditItem.tsx';
import AddItem from './components/AddItem.tsx';
import LogIn from './routes/LogIn';
import SignUp from './routes/SignUp';
import Dashboard from './routes/Dashboard';
import ErrorPage from './error-page';
import './styles/index.scss';
import Logout from './components/Logout.tsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "login",
        element: <LogIn />,
      },
      {
        path: "register",
        element: <SignUp />,
      },
      {
        path: "/logout",
        element: <Logout />,
      },
      {
        path: "add",
        element: <AddItem />,
      },
      {
        path: "edit/:itemId",
        element: <EditItem />,
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
