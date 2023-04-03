import React from "react";
import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";

const Profile = () => {
  const { user: currentUser } = useSelector((state) => state.auth);


  if (!currentUser) {
    return <Navigate to="/log-in" />;
  }

  return (
    <div>
      <p>
        <strong>Token:</strong> {currentUser.token.substring(0, 20)} ...{" "}
      </p>
    </div>
  );
};

export default Profile;
