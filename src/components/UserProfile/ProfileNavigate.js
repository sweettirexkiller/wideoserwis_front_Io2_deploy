import React from 'react';
import { Button, Center, IconButton, Tab, TabList, TabPanel, TabPanels, Tabs, Text, VStack } from '@chakra-ui/react';
import Profile from './Profile';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileAvatarTop from './ProfileAvatarTop';
import { useGetUserByIdQuery } from '../../services/authAPI';
import YourVideos from './YourVideos/YourVideos';
import { AddIcon } from '@chakra-ui/icons';
import AddVideo from './AddVideo/AddVideo';
import { logout } from '../../slices/auth';

const ProfileNavigate = () => {

  const { isLoggedIn, token } = useSelector((state) => state.auth);
  const {data:user, refetch} = useGetUserByIdQuery(token);
  console.log(user);

  if (!isLoggedIn) {
    logout();
    return <Navigate to="/log-in" />;
  }

  if (!token) {
    return <Navigate to="/log-in" />;
  } else if (token.token) {
    const decode = JSON.parse(atob(token.token.split('.')[1]));
    if (decode.exp * 1000 < new Date().getTime()) {
      logout();
      return <Navigate to="/log-in" />;
    }
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
          {/*{user && user.role === 'admin' && <Tab>Admin Panel</Tab>}*/}
          {user && user.userType === 'Creator' &&  <Tab>Your Videos</Tab>}
          <Tab>Your Playlist</Tab>
          <Tab><div id={'EditProfileNavTab'}>Edit Profile</div></Tab>
          {user && user.userType === 'Creator' &&
            <Tab>
              <Button>Add Video<IconButton
                colorScheme='green'
                aria-label='Search database'
                size={'xs'}
                marginLeft={2}
                icon={<AddIcon />}
              /></Button>
            </Tab>
          }
        </TabList>

        <TabPanels width={'full'}>
          {user && user.userType === 'Creator' &&
            <TabPanel h={'full'} bg={'gray.50'}>
              <YourVideos token={token} />
            </TabPanel>
          }
          <TabPanel h={'full'} bg={'gray.50'} minH={'calc(80vh)'}>
            <Center minHeight={'calc(70vh)'}>
              <Text>Your playlists will be here.</Text>
            </Center>
          </TabPanel>
          <TabPanel h={'full'} padding={0}>
            <Profile />
          </TabPanel>
          {
            user && user.userType === 'Creator' &&
            <TabPanel h={'full'} bg={'gray.50'} paddingY={5} minH={'calc(80vh)'}>
              <AddVideo />
            </TabPanel>
          }
        </TabPanels>
      </Tabs>
    </VStack>
  );
};

export default ProfileNavigate;