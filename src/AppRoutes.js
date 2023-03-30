import React from 'react';
import { Home } from "./components/Home";
import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import Settings from "./features/settings/Settings";
import ForgotPassword from "./features/auth/ForgotPassword";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/settings',
    element: <Settings/>
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
  }
];

export default AppRoutes;
