import React from 'react';
import { Home } from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register/Register";
import ForgotPassword from "./components/ForgotPassword";
import SuccessRegister from './components/SuccessRegister';
import Videos from './components/Videos/Videos';
import SuccessDeleting from './components/UserProfile/SuccessDeleting';
import ProfileNavigate from './components/UserProfile/ProfileNavigate';
import SingleVideoPage from './components/Videos/SingleVideoPage';
import SingleVideoEditPage from './components/Videos/SingleVideoEditPage';

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
    element: <ProfileNavigate/>
  },{
    path: '/success-register',
    element: <SuccessRegister/>
  },{
    path: '/success-deleting',
    element: <SuccessDeleting/>
  },
  {
    path: '/videos/:id',
    element: <SingleVideoPage/>
  },
  {
    path: '/videos/edit/:id',
    element: <SingleVideoEditPage/>
  }
];

export default AppRoutes;
