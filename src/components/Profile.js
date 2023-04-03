import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import {
  Avatar,
  AvatarBadge, Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading, IconButton, Input,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import { SmallCloseIcon } from '@chakra-ui/icons';
import EditProfile from './UserProfile/EditProfile';
import ShowProfile from './UserProfile/ShowProfile';

const Profile = () => {
  // const { user: currentUser } = useSelector((state) => state.auth);

  const [isEdit, setIsEdit] = useState(false);

  // if (!currentUser) {
  //   return <Navigate to="/log-in" />;
  // }


  return !isEdit ? <ShowProfile setIsEdit={setIsEdit}/> : <EditProfile setIsEdit={setIsEdit}/>;

};

export default Profile;