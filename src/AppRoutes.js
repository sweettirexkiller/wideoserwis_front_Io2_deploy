import React from 'react';
import { Home } from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword";
import Profile from './components/Profile';

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/videos',
    element: "Videos will be here."
  },
  {
    path: '/log-in',
    element: <Login/>
  },
  {
    path: '/register',
    element: <Register/>
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword/>
  },
  {
    path: '/profile',
    element: <Profile/>
  },{
    path: '/success-register',
    element: <Profile/>
  }
];

export default AppRoutes;
