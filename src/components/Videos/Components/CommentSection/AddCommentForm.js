import React from 'react';
import {
  Box,
  Button, FormControl, FormErrorMessage,
  HStack, Spinner,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { useAddCommentToVideoMutation, useGetAllCommentsOfVideoQuery } from '../../../../services/authAPI';
import { ErrorMessage, Form, Formik } from 'formik';
import * as Yup from 'yup';

const AddCommentForm = ({videoId}) => {
  const [addCommentToVideo, {isLoading: addCommentLoading}] = useAddCommentToVideoMutation();
  const {refetch: refetchComments} = useGetAllCommentsOfVideoQuery(videoId);

  const initialValues = {
    comment: '',
  };

  const validationSchema = Yup.object().shape({
    comment: Yup.string()
      .min(2, 'Too Short!')
      .max(500, 'Too Long!')
      .required('Required.'),
  });

  const handleAddComment = (values)  => {

    addCommentToVideo({videoId: videoId, comment: values.comment})
      .then(() =>{
        refetchComments();
      })
      .catch(()=>{});
  };

  return (
    <Box width={'full'} alignSelf={'flex-start'}>
      <HStack width={'full'} marginY={2}>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);
            handleAddComment(values);
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
                                 isInvalid={(errors.comment && touched.comment)}
                                 width={'full'}
                    >

                      <Textarea placeholder='Tell us what you think!'
                             name="comment"
                             onChange={handleChange} width={520}
                             onBlur={handleBlur}
                             value={values.comment} backgroundColor={'white'} borderRadius={0}
                      />

                      <Button
                        backgroundColor={'gray.800'}
                        onClick={(e)=>{handleSubmit()}}
                        borderRadius={0}
                        marginLeft={5}
                        size={'sm'}>
                        <Text fontSize='sm' color={'white'}>Comment  {addCommentLoading &&  <Spinner size='sm' />}</Text>
                      </Button>

                    </FormControl>

                    {errors.comment && touched.comment && <Text fontSize={'xs'} color={'red'}><ErrorMessage name="comment" /></Text>}

                </Form>
          )}
        </Formik>


      </HStack>
    </Box>

  );
};

export default AddCommentForm;