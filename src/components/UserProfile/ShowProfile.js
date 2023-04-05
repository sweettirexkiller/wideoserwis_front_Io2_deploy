import React from 'react';
import {
  Alert,
  AlertIcon, AlertTitle,
  Avatar,
  AvatarBadge, Button,
  Center,
  Flex,
  Heading, ListItem, Spinner,
  Stack, UnorderedList,
} from '@chakra-ui/react';
import {useGetUserByIdQuery} from '../../services/authAPI';
import { useSelector } from 'react-redux';

const UserInfo = ({user, handleClick}) => {
  return (
      <>
        <Center>
            <Stack direction={['column', 'row']} spacing={6}>
              <Center>
                <Avatar size="xl" src="https://bit.ly/sage-adebayo">
                  <AvatarBadge
                    size="sm"
                    rounded="full"
                    top="-10px"
                    colorScheme="red"
                    aria-label="remove Image"
                  />
                </Avatar>
              </Center>
            </Stack>
          </Center>
        <Center>
          <UnorderedList>
            <ListItem><b>Nickname:</b>{user.nickName}</ListItem>
            <ListItem><b>Name:</b>{user.name}</ListItem>
            <ListItem><b>Surname:</b>{user.surname}</ListItem>
            <ListItem><b>Email:</b>{user.email}</ListItem>
            <ListItem><b>User Type:</b>{user.type === 0 ? "Viewer" :"Creator"}</ListItem>
          </UnorderedList>
        </Center>
        <Stack spacing={6} direction={['column', 'row']}>
          <Button
            bg={'blue.400'}
            color={'white'}
            w="full"
            _hover={{
              bg: 'blue.500',
            }}
            onClick={handleClick}
          >
            Edit
          </Button>
        </Stack>

      </>

  );
};

const ShowProfile = ({setIsEdit}) => {
  const { token } = useSelector((state) => state.auth);
  const {data, error, isLoading} = useGetUserByIdQuery(token);
  const handleClick = (e) => {
    e.preventDefault();
    setIsEdit(true);
  }

  return (
    <Flex
      minH={'100vh'}
      width={'100%'}
      align={'center'}
      justify={'center'}
      bg={'gray.50'}>
      <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={'white'}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}>
        <Center>
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
            Your Profile
          </Heading>
        </Center>

        {isLoading ?
          <Spinner/> :
          (!error ? <UserInfo user={data} handleClick={handleClick}/> :
              <Alert status='error'>
                <AlertIcon />
                <AlertTitle>Error Fetching Data!</AlertTitle>
              </Alert>
          )}
      </Stack>
    </Flex>
  );
};

export default ShowProfile;