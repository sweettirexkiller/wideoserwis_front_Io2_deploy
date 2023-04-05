import React from 'react';
import {
  AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay,
  Avatar,
  AvatarBadge,
  Button,
  Center, Flex,
  FormControl, FormErrorMessage,
  FormLabel,
  Heading,
  IconButton, Input, Select,
  Stack, useDisclosure, VStack,
} from '@chakra-ui/react';
import { SmallCloseIcon } from '@chakra-ui/icons';
import { useGetUserByIdQuery, useDeleteUserMutation } from '../../services/authAPI';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../slices/auth';

const EditProfile = ({setIsEdit}) => {
  const { token } = useSelector((state) => state.auth);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {data, error, isLoading} = useGetUserByIdQuery(token);
  const cancelRef = React.useRef();
  const handleClick = (e) => {
    e.preventDefault();
    setIsEdit(false);
  }

  const initialValues = {
    nickName: data ? data.nickName : null,
    email: data ? data.email : null,
    firstname:data ? data.name : null,
    surname: data ? data.surname : null,
    userType: data ? data.userType : null
  };

  const validationSchema = Yup.object().shape({
    nickName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    firstname: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    surname: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
  });


  const handleUpdate = (formValue) => {
    const { nickName: nickname, firstname: name, surname: lastname, userType, email } = formValue;

    console.log("Perform UPDATE query!");
  };

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
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);
            handleUpdate(values);
          }}
        >
          {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              /* and other goodies */
            }) => (
            <Form onSubmit={handleSubmit}>
              <VStack justifyContent={"space-evenly"} w={'100%'} h={'100%'}>
                <FormControl isRequired
                             isInvalid={(errors.nickName && touched.nickName)}
                >
                  <FormLabel>Nick name</FormLabel>
                  <Input placeholder='First name'
                         type="text"
                         name="nickName"
                         onChange={handleChange}
                         onBlur={handleBlur}
                         value={values.nickName}
                  />
                  {errors.nickName && touched.nickName && <FormErrorMessage>Nick name is required.</FormErrorMessage>}
                </FormControl>
                <FormControl isRequired
                             isInvalid={(errors.firstname && touched.firstname)}
                >
                  <FormLabel>First name</FormLabel>
                  <Input placeholder='First name'
                         type="text"
                         name="firstname"
                         onChange={handleChange}
                         onBlur={handleBlur}
                         value={values.firstname}
                  />
                  {errors.firstname && touched.firstname && <FormErrorMessage>First Name is required.</FormErrorMessage>}
                </FormControl>
                <FormControl isRequired
                             isInvalid={(errors.surname && touched.surname)}
                >
                  <FormLabel>Surname</FormLabel>
                  <Input placeholder='Last name'
                         type="text"
                         name="surname"
                         onChange={handleChange}
                         onBlur={handleBlur}
                         value={values.surname}
                  />
                  {errors.surname && touched.surname && <FormErrorMessage>Last Name is required.</FormErrorMessage>}
                </FormControl>
                <FormControl isRequired
                             isInvalid={(errors.userType && touched.userType)}
                >
                  <FormLabel>User Type</FormLabel>
                  <Select placeholder='User type'
                          name="userType"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.userType === 0 ? "viewer" : "creator" }>
                    <option value='creator'>Creator</option>
                    <option value='viewer'>Viewer</option>
                  </Select>

                  {errors.userType && touched.userType && <FormErrorMessage>User type is required.</FormErrorMessage>}
                </FormControl>
                <FormControl isRequired
                             isInvalid={(errors.email && touched.email)}
                >
                  <FormLabel>E-mail</FormLabel>
                  <Input  type="email"
                          name="email"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.email}
                          placeholder='E-mail'/>
                  {errors.email && touched.email && <FormErrorMessage>Invalid email address</FormErrorMessage>}
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
                    onClick={(e)=>{handleSubmit()}}
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
              </VStack>
            </Form>
          )}
        </Formik>



      </Stack>
    </Flex>


      <AlertDeleteAccount isOpen={isOpen} cancelRef={cancelRef} onClose={onClose} id={data.id}/>
    </>
  );
};


const AlertDeleteAccount = ({isOpen, cancelRef, onClose, id}) => {
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation()
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleDeleteAccountClick=(e)=>{
    e.preventDefault();

    deleteUser(id)
      .then(() =>{
        // dispatch(logout());
        navigate('/success-deleting');
      })
      .catch(()=>{onClose();});
  }
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
              <Button colorScheme='red' ml={3} onClick={handleDeleteAccountClick}>
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