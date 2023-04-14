import React from 'react';
import { Home } from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register/Register";
import ForgotPassword from "./components/ForgotPassword";
import Profile from './components/Profile';
import SuccessRegister from './components/SuccessRegister';
import Videos from './components/Videos/Videos';
import SuccessDeleting from './components/UserProfile/SuccessDeleting';

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
  },{
    path: '/success-deleting',
    element: <SuccessDeleting/>
  }
];

export default AppRoutes;
