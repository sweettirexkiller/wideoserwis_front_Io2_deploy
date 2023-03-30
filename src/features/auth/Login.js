import {
    Flex,
    VStack, Center, Text, FormControl, FormLabel, Input, FormErrorMessage, HStack,Button
} from '@chakra-ui/react';

import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useLoginMutation} from "../../api/authApiSlice";
import {Form, Formik} from "formik";
import * as Yup from 'yup';

export default function Login() {

    const navigate = useNavigate();

    const [login, {isLoading}] = useLoginMutation();
    const dispatch = useDispatch();
    const validateEmail = (email) => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };


  const FormSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup
      .string()
      .min(8, 'Password must be 8 characters long')
      .matches(/[0-9]/, 'Password requires a number')
      .matches(/[a-z]/, 'Password requires a lowercase letter')
      .matches(/[A-Z]/, 'Password requires an uppercase letter')
      .matches(/[^\w]/, 'Password requires a symbol')
  });

  return(
        <Center>
            <Flex>
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={FormSchema}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                    }, 400);
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
                        <Center><Text>Log In</Text></Center>
                        <FormControl isRequired isInvalid={(errors.email && touched.email)}>
                            <FormLabel>Email</FormLabel>
                            <Input
                                   type="text"
                                   name="email"
                                   onChange={handleChange}
                                   onBlur={handleBlur}
                                   value={values.email}/>
                            {errors.email && touched.email && <FormErrorMessage>Invalid email address.</FormErrorMessage>}
                        </FormControl>
                        <FormControl isRequired isInvalid={(errors.password && touched.password)}>
                            <FormLabel>Password</FormLabel>
                            <Input
                                   type="password"
                                   name="password"
                                   onChange={handleChange}
                                   onBlur={handleBlur}
                                   value={values.password}/>
                            {errors.password && touched.password && <FormErrorMessage>Required.</FormErrorMessage>}
                        </FormControl>
                        <HStack w={'100%'} justifyContent={"space-evenly"}>
                            <Button onClick={(e)=>{handleSubmit()}} variant="solid" colorScheme='teal'>
                                Log in
                            </Button>
                        </HStack>
                    </VStack>
                </Form>
                )}
                </Formik>
            </Flex>
        </Center>);
}