import React from 'react';
import { Home } from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword";
import Profile from './components/Profile';
import SuccessRegister from './components/SuccessRegister';
import Videos from './components/Videos/Videos';

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/videos',
    element: <Videos/>
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
    element: <SuccessRegister/>
  }
];

export default AppRoutes;
