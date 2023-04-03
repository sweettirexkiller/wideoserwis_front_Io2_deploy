import React from 'react';
import {
  Avatar,
  AvatarBadge, Box, Button,
  Center,
  Flex,
  Heading, ListItem,
  Stack, UnorderedList,
} from '@chakra-ui/react';

const ShowProfile = ({setIsEdit}) => {
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
            <ListItem><b>Nickname:</b> Lorem ipsum dolor sit amet</ListItem>
            <ListItem><b>Name:</b>Consectetur adipiscing elit</ListItem>
            <ListItem><b>Surname:</b>Integer molestie lorem at massa</ListItem>
            <ListItem><b>Email:</b>Facilisis in pretium nisl aliquet</ListItem>
            <ListItem><b>User Type:</b>Viewer</ListItem>
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
      </Stack>
    </Flex>
  );
};

export default ShowProfile;