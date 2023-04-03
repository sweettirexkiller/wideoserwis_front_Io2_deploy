import React from 'react';
import {
  AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay,
  Avatar,
  AvatarBadge,
  Button,
  Center, Flex,
  FormControl,
  FormLabel,
  Heading,
  IconButton, Input,
  Stack, useDisclosure,
} from '@chakra-ui/react';
import { SmallCloseIcon } from '@chakra-ui/icons';

const EditProfile = ({setIsEdit}) => {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef();
  const handleClick = (e) => {
    e.preventDefault();
    setIsEdit(false);
  }

  return (
    <>
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
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
          User Profile Edit
        </Heading>
        <FormControl id="userName">
          <FormLabel>User Icon</FormLabel>
          <Stack direction={['column', 'row']} spacing={6}>
            <Center>
              <Avatar size="xl" src="https://bit.ly/sage-adebayo">
                <AvatarBadge
                  as={IconButton}
                  size="sm"
                  rounded="full"
                  top="-10px"
                  colorScheme="red"
                  aria-label="remove Image"
                  icon={<SmallCloseIcon />}
                />
              </Avatar>
            </Center>
            <Center w="full">
              <Button w="full">Change Icon</Button>
            </Center>
          </Stack>
        </FormControl>
        <FormControl id="userName" isRequired>
          <FormLabel>User name</FormLabel>
          <Input
            placeholder="UserName"
            _placeholder={{ color: 'gray.500' }}
            type="text"
          />
        </FormControl>
        <FormControl id="email" isRequired>
          <FormLabel>Email address</FormLabel>
          <Input
            placeholder="your-email@example.com"
            _placeholder={{ color: 'gray.500' }}
            type="email"
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            placeholder="password"
            _placeholder={{ color: 'gray.500' }}
            type="password"
          />
        </FormControl>
        <Stack spacing={6} direction={['column', 'row']}>
          <Button
            bg={'red.400'}
            color={'white'}
            w="full"
            _hover={{
              bg: 'red.500',
            }}
            onClick={handleClick}
          >
            Cancel
          </Button>
          <Button
            bg={'blue.400'}
            color={'white'}
            w="full"
            _hover={{
              bg: 'blue.500',
            }}>
            Submit
          </Button>
        </Stack>
        <Stack spacing={6} direction={['column', 'row']}>
          <Button
            bg={'gray.400'}
            color={'gray.900'}
            w="full"
            _hover={{
              bg: 'gray.500',
            }}
            onClick={onOpen}
          >
            Delete Account

          </Button>
        </Stack>
      </Stack>
    </Flex>


      <AlertDeleteAccount isOpen={isOpen} cancelRef={cancelRef} onClose={onClose}/>
    </>
  );
};


const AlertDeleteAccount = ({isOpen, cancelRef, onClose}) => {
  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete Account
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={onClose} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}


export default EditProfile;