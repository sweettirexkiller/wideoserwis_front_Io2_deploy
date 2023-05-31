import React from 'react';
import {
  Alert, AlertIcon, AlertTitle,
  Flex,
  Heading, Spinner,
  Stack, useDisclosure,
} from '@chakra-ui/react';
import EditProfileData from './EditProfileData';
import AlertDeleteAccount from './AlertDeleteAccount';
import { useSelector } from 'react-redux';
import { useGetUserByIdQuery } from '../../../services/authAPI';

const EditProfile = () => {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { token } = useSelector((state) => state.auth);
  const {data, error, isLoading} = useGetUserByIdQuery(token);
  const cancelRef = React.useRef();

  if(isLoading){
    return <Spinner/>
  } else if(!error){
   return <EditForm isOpen={isOpen} onOpen={onOpen} onClose={onClose} cancelRef={cancelRef} data={data}/>;
  } else {
    return <ErrorFetching/>;
  }

};

const EditForm = ({isOpen,onOpen, onClose, cancelRef, data}) => {
  return (
    <>
      <Flex
        minH={'80vh'}
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
        >
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
            Edit Your Profile
          </Heading>
          <EditProfileData  onDeleteAccountDialog={onOpen} data={data}/>
        </Stack>
      </Flex>
      <AlertDeleteAccount isOpen={isOpen} cancelRef={cancelRef} onClose={onClose} id={data.id}/>
    </>
  )
}
const ErrorFetching = () => {
  return (
    <Alert status='error'>
      <AlertIcon />
      <AlertTitle>Error Fetching Data!</AlertTitle>
    </Alert>
  );
};

export default EditProfile;