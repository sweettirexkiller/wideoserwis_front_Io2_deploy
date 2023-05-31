import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";
import { clearMessage } from '../../slices/messege';
import { register } from '../../slices/auth';
import {
  Alert, AlertIcon, AlertTitle,
  Avatar,
  Button,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input, Select, Stack, Text, useToast,
  VStack,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import FilePicker from 'chakra-ui-file-picker';
import { convertToBase64 } from '../../common/utils';


const Register = () => {
  const [successful, setSuccessful] = useState(false);
  const [currentAvatarImage, setCurrentAvatarImage] = useState(null);
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const initialValues = {
    nickName: "",
    email: "",
    firstname:"",
    surname: "",
    userType: "",
    password: "",
    confirm: "",
    avatarImage: null
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
    password: Yup
      .string()
      .min(8, 'Password must be 8 characters long')
      .matches(/[0-9]/, 'Password requires a number')
      .matches(/[a-z]/, 'Password requires a lowercase letter')
      .matches(/[A-Z]/, 'Password requires an uppercase letter')
      .matches(/[^\w]/, 'Password requires a symbol'),
    confirm: Yup
      .string()
      .oneOf([Yup.ref('password'), null], 'Must match "password" field value'),
  });

  const handleRegister = (formValue) => {
    const { nickName: nickname, firstname, surname: lastname, userType, email, password, avatarImage } = formValue;

    setSuccessful(false);

    dispatch(register({ nickname, firstname, lastname,userType, email, password, avatarImage }))
      .unwrap()
      .then(() => {
        setSuccessful(true);
        navigate("/success-register");
      })
      .catch(() => {
        setSuccessful(false);
      });
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
    <VStack minHeight={'calc(80vh)'} h={'full'}>
    <Center paddingY={10}>
      <Flex>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);
            handleRegister(values);
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
              <VStack justifyContent={"space-evenly"} w={'100%'} h={'100%'} id={'registerForm'}>
                <Center><Text id={'registerTitleText'}>Register</Text></Center>
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
                <FormControl isRequired
                             isInvalid={(errors.nickName && touched.nickName)}
                >
                  <FormLabel>Nick name</FormLabel>
                  <Input placeholder='First name'
                         type="text"
                         name="nickName"
                         onChange={handleChange}
                         onBlur={handleBlur}
                         id={'registerNicknameInput'}
                         value={values.nickName}
                  />
                  {errors.nickName && touched.nickName && <Text fontSize={'sm'} color={'red'}><ErrorMessage name="nickName" /></Text>}
                </FormControl>
                <FormControl isRequired
                             isInvalid={(errors.firstname && touched.firstname)}
                >
                  <FormLabel>First name</FormLabel>
                  <Input placeholder='First name'
                         type="text"
                         name="firstname"
                         onChange={handleChange}
                         id={'registerNameInput'}
                         onBlur={handleBlur}
                         value={values.firstname}
                  />
                  {errors.firstname && touched.firstname && <Text fontSize={'sm'} color={'red'}><ErrorMessage name="firstname" /></Text>}

                </FormControl>
                <FormControl isRequired
                             isInvalid={(errors.surname && touched.surname)}
                >
                  <FormLabel>Surname</FormLabel>
                  <Input placeholder='Last name'
                         type="text"
                         id={'registerSurnameInput'}
                         name="surname"
                         onChange={handleChange}
                         onBlur={handleBlur}
                         value={values.lastName}
                  />

                  {errors.surname && touched.surname && <Text fontSize={'sm'} color={'red'}><ErrorMessage name="surname" /></Text>}

                </FormControl>
                <FormControl isRequired
                             isInvalid={(errors.userType && touched.userType)}
                >
                  <FormLabel>User Type</FormLabel>
                  <Select placeholder='User type'
                          name="userType"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          id={'registerUserTypeInput'}
                          value={values.userType}>
                    <option value='creator' id={'userTypeCreator'}>Creator</option>
                    <option value='simple' id={'userTypeSimple'}>Simple</option>
                  </Select>

                  {errors.userType && touched.userType && <Text fontSize={'sm'} color={'red'}><ErrorMessage name="userType" /></Text>}

                </FormControl>
                <FormControl isRequired
                             isInvalid={(errors.email && touched.email)}
                >
                  <FormLabel>E-mail</FormLabel>
                  <Input  type="email"
                          name="email"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          id={'registerEmailInput'}
                          value={values.email}
                          placeholder='E-mail'/>
                  {errors.email && touched.email && <Text fontSize={'sm'} color={'red'}><ErrorMessage name="email" /></Text>}
                </FormControl>
                <FormControl isRequired
                             isInvalid={(errors.password && touched.password)}
                >
                  <FormLabel>Password</FormLabel>
                  <Input placeholder='Password'
                         type="password"
                         name="password"
                         id={'registerPasswordInput'}
                         onChange={handleChange}
                         onBlur={handleBlur}
                         value={values.password}
                  />

                  {errors.password && touched.password && <Text fontSize={'sm'} color={'red'}><ErrorMessage name="password" /></Text>}

                </FormControl>
                <FormControl isRequired
                             isInvalid={(errors.confirm && touched.confirm)}
                >
                  <FormLabel>Confirm Password</FormLabel>
                  <Input placeholder='Password'
                         type="password"
                         name="confirm"
                         id={'registerConfirmPasswordInput'}
                         onChange={handleChange}
                         onBlur={handleBlur}
                         value={values.confirm}
                  />
                  {errors.confirm && touched.confirm && <Text fontSize={'sm'} color={'red'}><ErrorMessage name="confirm" /></Text>}

                </FormControl>
                <HStack w={'100%'} justifyContent={"space-evenly"}>
                  <Button disabled={isSubmitting}
                          id={'registerSubmitButton'}
                          onClick={(e)=>{handleSubmit()}}
                  >
                    Submit
                  </Button>
                </HStack>
              </VStack>
            </Form>
          )}
        </Formik>
      </Flex>
    </Center>

      <Center>
      {message && (
        <Alert status='error' id={'registerErrorDiv'}>
          <AlertIcon />
          <AlertTitle id={'loginErrorMessage'}>{message}</AlertTitle>
        </Alert>
      )}
      </Center>
    </VStack>
  );
};

export default Register;
