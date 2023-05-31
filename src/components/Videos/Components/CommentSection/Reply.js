import React from 'react';
import { Button, FormControl, HStack, Input, Spinner, Text, Textarea } from '@chakra-ui/react';
import { ArrowRightIcon } from '@chakra-ui/icons';
import {
  useAddCommentToVideoMutation,
  useAddResponseToCommentMutation,
  useGetAllCommentsOfVideoQuery, useGetResponseOnCommentQuery,
} from '../../../../services/authAPI';
import * as Yup from 'yup';
import { ErrorMessage, Form, Formik } from 'formik';

const Reply = ({comment,videoId, setIsShowResponses}) => {

  const [addResponseToComment, {isLoading: addResponseLoading}] = useAddResponseToCommentMutation();
  const {refetch: refetchResponses} = useGetResponseOnCommentQuery(comment.id);

  const {refetch: refetchComments} = useGetAllCommentsOfVideoQuery(videoId);

  const initialValues = {
    response: '',
  };

  const validationSchema = Yup.object().shape({
    response: Yup.string()
      .min(2, 'Too Short!')
      .max(500, 'Too Long!')
      .required('Required.'),
  });

  const handleAddResponse = (values)  => {

    addResponseToComment({commentId: comment.id, response: values.response})
      .then(() =>{
        refetchComments();
        refetchResponses();
        setIsShowResponses(true);
      })
      .catch(()=>{});
  };

  return (
    <HStack width={'full'} justifyContent={'flex-end'} marginY={2}>
      <ArrowRightIcon/>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          handleAddResponse(values);
        }}
        width={'full'}
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
          <Form width={'full'} display={'flex'} flexDirection={'row'}>

            <FormControl isRequired
                         isInvalid={(errors.response && touched.response)}
                         width={'full'}
                         display={'flex'}
                         minWidth={'calc(50vw)'}
                         spacing={5}
            >
              <Input
                type={'text'}
                name={'response'}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.response} width={'80%'}
                minWidth={'calc(20vw)'}
                borderRadius={0}
                height={8}/>
              <Button
                backgroundColor={'gray.800'}
                borderRadius={0} size={'sm'}
                marginLeft={7}
                onClick={(e)=>{handleSubmit()}}
              >
                <Text fontSize='sm' color={'white'}>Reply {addResponseLoading &&  <Spinner size='sm' />}</Text>
              </Button>

            </FormControl>

            {errors.reponse && touched.response && <Text fontSize={'xs'} color={'red'}><ErrorMessage name="response" /></Text>}

          </Form>
        )}
      </Formik>

    </HStack>
  )
};

export default Reply;