import React from 'react';
import {  Tab, TabList, TabPanel, TabPanels, Tabs, Text, VStack } from '@chakra-ui/react';
import Profile from './Profile';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileAvatarTop from './ProfileAvatarTop';

const ProfileNavigate = () => {
  const { token } = useSelector((state) => state.auth);
  if (!token) {
    return <Navigate to="/log-in" />;
  }

  const decode = JSON.parse(atob(token.token.split('.')[1]));
  if (decode.exp * 1000 < new Date().getTime()) {
    return <Navigate to="/log-in" />;
  }

  return (
    <VStack
      direction={'row'}
      display={'flex'}
      width={'full'}
      padding={0}
      margin={0}
    >
      <ProfileAvatarTop/>

      <Tabs marginX={0} paddingX={0}>
        <TabList width={'calc(100vw)'} display={'flex'} marginX={0}>
          <Tab>Your Videos</Tab>
          <Tab>Your Playlist</Tab>
          <Tab>Edit Profile</Tab>
        </TabList>

        <TabPanels width={'100vh'}>
          <TabPanel h={'calc(100vh)'} bg={'gray.50'}>
            <p>Your videos will be here.</p>
          </TabPanel>
          <TabPanel h={'calc(100vh)'} bg={'gray.50'}>
            <p>Your "Watch later" playlist should be here.</p>
          </TabPanel>
          <TabPanel h={'calc(100vh)'} padding={0}>
            <Profile />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </VStack>
  );
};

export default ProfileNavigate;