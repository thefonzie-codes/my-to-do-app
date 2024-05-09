import React from 'react';
import ReactDOM from 'react-dom/client';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import App from './App.jsx';
import UserHome from './views/UserHome.jsx';
import EditItem from './components/EditItem';
import AddItem from './components/AddItem';
import Home from './views/Home';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import ErrorPage from './error-page.jsx';
import './index.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "UserHome",
        element: <UserHome />,
      },
      {
        path: "add",
        element: <AddItem />,
      },
      {
        path: "edit/:id",
        element: <EditItem />,
      },
    ]
  },
  {
    path: "login",
    element: <LogIn />,
  },
  {
    path: "signup",
    element: <SignUp />,
  },
  {
    path: "home",
    element: <Home />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
