import React, { useState } from 'react';
import { Field, Form, Formik } from 'formik';
import {
  Avatar,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select, Spinner,
  Stack, useToast,
  VStack,
} from '@chakra-ui/react';
import * as Yup from 'yup';
import FilePicker from 'chakra-ui-file-picker';
import {  useUpdateUserMutation } from '../../../services/authAPI';
import { convertToBase64 } from '../../../common/utils';

const EditProfileData = ({ onDeleteAccountDialog, data})=> {

  const toast = useToast()
  const [currentAvatarImage, setCurrentAvatarImage] = useState(data.avatarImage);
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation()

  const handleClick = (e) => {
    e.preventDefault();
  }
  const initialValues = {
    nickName: data ? data.nickName : null,
    email: data ? data.email : null,
    firstname:data ? data.name : null,
    surname: data ? data.surname : null,
    userType: data ? data.userType : null,
    avatarImage: data ? data.avatarImage : null
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
      .required('Required')
  });

  const handleUpdate = (formValue) => {
    const { nickName: nickname, firstname: name, surname, avatarImage } = formValue;
    // console.log(`${nickname}, ${name}, ${surname}, ${avatarImage}`);
    const id = data.id;
    updateUser({
      nickname, name, surname, avatarImage, userType: data.userType, id
    })
      .then(() =>{

      })
      .catch(()=>{});
  };

  const handleIcon = async (e, setFieldValue) => {
    const file = e[0];
    //check the size of image
    if (file?.size/1024/1024 < 2) {
      const base64 = await convertToBase64(file);
      setFieldValue('avatarImage', `${base64}`);
      setCurrentAvatarImage(base64);
    }
    else {
      setCurrentAvatarImage(null);
      setFieldValue('avatarImage', null);
      toast({
        title: 'Error',
        description: "Avatar image isn't necessary but recommended. Image size must be of 2MB or less. Accepted img, jpeg format only.",
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };


  return (
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
          <FormControl id="userName">
            <FormLabel>User Icon</FormLabel>
            <Stack direction={['column', 'row']} spacing={6}>
              <Center>
                <Avatar size="xl" src={`${currentAvatarImage}`}>
                </Avatar>
              </Center>
              <Center w="full">
              <Field name='avatarImage'>
                {({ form, field }) => {
                  const { setFieldValue } = form
                  // setFieldValue('nickName', 'asdasd');
                  return (
                    <FilePicker
                      onFileChange={(e) => handleIcon(e, setFieldValue)}
                        placeholder="Choose Avatar Image File"
                        clearButtonLabel="Clear"
                        multipleFiles={false}
                        accept="image/png, image/jpeg"
                        hideClearButton={false}
                        required={false}
                        />
                  )
                }}
              </Field>
              </Center>
            </Stack>
          </FormControl>
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
                      value={values.userType === 0 ? "viewer" : "creator" }
              disabled={true}>
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
                      placeholder='E-mail'
                      disabled={true}
              />
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
                Update {isUpdating &&  <Spinner size='sm' />}
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
                onClick={onDeleteAccountDialog}
              >
                Delete Account
              </Button>
            </Stack>
          </VStack>
        </Form>
      )}
    </Formik>
  );
}

export default EditProfileData;