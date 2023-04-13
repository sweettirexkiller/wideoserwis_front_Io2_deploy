import React from 'react';
import {
  Flex,
  Heading,
  Stack, useDisclosure,
} from '@chakra-ui/react';
import EditProfileData from './EditProfileData';
import AlertDeleteAccount from './AlertDeleteAccount';
import { useSelector } from 'react-redux';
import { useGetUserByIdQuery } from '../../../services/authAPI';

const EditProfile = ({setIsEdit}) => {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { token } = useSelector((state) => state.auth);
  const {data, error, isLoading} = useGetUserByIdQuery(token);
  const cancelRef = React.useRef();


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
          <EditProfileData setIsEdit={setIsEdit} onDeleteAccountDialog={onOpen} data={data}/>
        </Stack>
      </Flex>
      <AlertDeleteAccount isOpen={isOpen} cancelRef={cancelRef} onClose={onClose} id={data.id}/>
    </>
  );
};



export default EditProfile;