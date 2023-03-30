import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { clearMessage } from '../slices/messege';
import { register } from '../slices/auth';
import {
  Button,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input, Select,
  VStack,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';


const Register = () => {
  const [successful, setSuccessful] = useState(false);

  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();
  let navigate = useNavigate();

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
    confirm: ""
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
    const { nickName: nickname, firstname: name, surname: lastname, userType, email, password } = formValue;

    setSuccessful(false);

    dispatch(register({ nickname, name, lastname,userType, email, password }))
      .unwrap()
      .then(() => {
        setSuccessful(true);
        navigate("/success-register");
      })
      .catch(() => {
        setSuccessful(false);
      });
  };

  return (
    <div>
    <Center>
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
                         value={values.lastName}
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
                          value={values.userType}>
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
                <FormControl isRequired
                             isInvalid={(errors.password && touched.password)}
                >
                  <FormLabel>Password</FormLabel>
                  <Input placeholder='Password'
                         type="password"
                         name="password"
                         onChange={handleChange}
                         onBlur={handleBlur}
                         value={values.password}
                  />
                  {errors.password && touched.password && <FormErrorMessage>Password is required.{errors.password}</FormErrorMessage>}
                </FormControl>
                <FormControl isRequired
                             isInvalid={(errors.confirm && touched.confirm)}
                >
                  <FormLabel>Confirm Password</FormLabel>
                  <Input placeholder='Password'
                         type="password"
                         name="confirm"
                         onChange={handleChange}
                         onBlur={handleBlur}
                         value={values.confirm}
                  />
                  {errors.confirm && touched.confirm && <FormErrorMessage>{errors.confirm}</FormErrorMessage>}
                </FormControl>
                <HStack w={'100%'} justifyContent={"space-evenly"}>
                  <Button disabled={isSubmitting}
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

      {message && (
        <div className="form-group">
          <div
            className={successful ? "alert alert-success" : "alert alert-danger"}
            role="alert"
          >
            {message}
          </div>
        </div>
      )}

    </div>
  );
};

export default Register;
