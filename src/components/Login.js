import {
  Flex,
  VStack, Center, Text, FormControl, FormLabel, Input, FormErrorMessage, HStack, Button, Spinner,
} from '@chakra-ui/react';


import { useDispatch, useSelector } from 'react-redux';

import {Form, Formik} from "formik";
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { clearMessage } from '../slices/messege';
import { login } from '../slices/auth';
import Profile from './Profile';

export default function Login() {

    const dispatch = useDispatch();
    let navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const FormSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup
      .string()
      .min(8, 'Password must be 8 characters long')
      .matches(/[0-9]/, 'Password requires a number')
      // .matches(/[a-z]/, 'Password requires a lowercase letter')
      .matches(/[A-Z]/, 'Password requires an uppercase letter')
      .matches(/[^\w]/, 'Password requires a symbol')
  });

  const handleLogin = (formValue) => {
    const { email, password } = formValue;
    setLoading(true);

    dispatch(login({ email, password }))
      .unwrap()
      .then(() => {
        navigate("/profile");
        // window.location.reload();
      })
      .catch(() => {
        setLoading(false);
      });
  };

  if (isLoggedIn) {
    return <Navigate to="/profile" />;
  }

  return (
    <Center>
      <Profile/>
    </Center>
  );
  // return(
  //       <Center>
  //           <Flex>
  //           <Formik
  //               initialValues={{ email: '', password: '' }}
  //               validationSchema={FormSchema}
  //               onSubmit={handleLogin}
  //       >
  //           {({
  //                 values,
  //                 errors,
  //                 touched,
  //                 handleChange,
  //                 handleBlur,
  //                 handleSubmit,
  //                 isSubmitting,
  //                 /* and other goodies */
  //             }) => (
  //               <Form onSubmit={handleSubmit}>
  //                   <VStack justifyContent={"space-evenly"} w={'100%'} h={'100%'}>
  //                       <Center><Text>Log In</Text></Center>
  //                       <FormControl isRequired isInvalid={(errors.email && touched.email)}>
  //                           <FormLabel>Email</FormLabel>
  //                           <Input
  //                                  type="text"
  //                                  name="email"
  //                                  onChange={handleChange}
  //                                  onBlur={handleBlur}
  //                                  value={values.email}/>
  //                           {errors.email && touched.email && <FormErrorMessage>Invalid email address.</FormErrorMessage>}
  //                       </FormControl>
  //                       <FormControl isRequired isInvalid={(errors.password && touched.password)}>
  //                           <FormLabel>Password</FormLabel>
  //                           <Input
  //                                  type="password"
  //                                  name="password"
  //                                  onChange={handleChange}
  //                                  onBlur={handleBlur}
  //                                  value={values.password}/>
  //                           {errors.password && touched.password && <FormErrorMessage>Required.</FormErrorMessage>}
  //                       </FormControl>
  //                       <HStack w={'100%'} justifyContent={"space-evenly"}>
  //                           <Button onClick={(e)=>{handleSubmit()}} variant="solid" colorScheme='teal'>
  //                             {loading && (
  //                              <Spinner/>
  //                             )}
  //                               Log in
  //                           </Button>
  //                       </HStack>
  //                   </VStack>
  //               </Form>
  //               )}
  //               </Formik>
  //           </Flex>
  //         {message && (
  //           <div className="form-group">
  //             <div className="alert alert-danger" role="alert">
  //               {message}
  //             </div>
  //           </div>
  //         )}
  //       </Center>);
}