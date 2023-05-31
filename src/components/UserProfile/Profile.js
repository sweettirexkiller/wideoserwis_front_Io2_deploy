import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import EditProfile from './EditProfile/EditProfile';
import { logout } from '../../slices/auth';

const Profile = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  if (!isLoggedIn) {
    logout();
    return <Navigate to="/log-in" />;
  }

  return <EditProfile />;
};

export default Profile;