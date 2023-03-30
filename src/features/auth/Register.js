import React  from 'react';
import {
    Button, Center, Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    HStack,
    Input,
    VStack
} from "@chakra-ui/react";
import {Form, Formik} from "formik";
import * as Yup from 'yup';


const FormSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    lastName: Yup.string()
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


const Register = () => {
    return(
        <Center>
            <Flex>
        <Formik
            initialValues={{firstName: '', lastName: '',email: '', confirm: '', password:''}}
            validationSchema={FormSchema}
            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(false);
                console.log(values);
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
                                     isInvalid={(errors.firstName && touched.firstName)}
                        >
                            <FormLabel>First name</FormLabel>
                            <Input placeholder='First name'
                                   type="text"
                                   name="firstName"
                                   onChange={handleChange}
                                   onBlur={handleBlur}
                                   value={values.firstName}
                            />
                            {errors.firstName && touched.firstName && <FormErrorMessage>First Name is required.</FormErrorMessage>}
                        </FormControl>
                        <FormControl isRequired
                                     isInvalid={(errors.lastName && touched.lastName)}
                        >
                            <FormLabel>Last Name</FormLabel>
                            <Input placeholder='Last name'
                                   type="text"
                                   name="lastName"
                                   onChange={handleChange}
                                   onBlur={handleBlur}
                                   value={values.lastName}
                            />
                            {errors.lastName && touched.lastName && <FormErrorMessage>Last Name is required.</FormErrorMessage>}
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

    );

};

export default Register;