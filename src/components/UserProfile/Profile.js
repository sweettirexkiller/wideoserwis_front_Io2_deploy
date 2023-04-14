import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import EditProfile from './EditProfile/EditProfile';

const Profile = () => {
  const { token } = useSelector((state) => state.auth);

  if (!token) {
    return <Navigate to="/log-in" />;
  }

  return <EditProfile />;
};

export default Profile;