import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import EditProfile from './UserProfile/EditProfile/EditProfile';
import ShowProfile from './UserProfile/ShowProfile';

const Profile = () => {
  const { token } = useSelector((state) => state.auth);

  const [isEdit, setIsEdit] = useState(false);

  if (!token) {
    return <Navigate to="/log-in" />;
  }

  return !isEdit ? <ShowProfile setIsEdit={setIsEdit}/> : <EditProfile setIsEdit={setIsEdit}/>;

};

export default Profile;