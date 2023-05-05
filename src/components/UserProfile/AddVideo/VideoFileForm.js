import { Button, Center, FormControl, Heading, Spinner } from '@chakra-ui/react';
import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import FilePicker from 'chakra-ui-file-picker';
import { useAddVideoFileMutation } from '../../../services/authAPI';

const VideoFileForm = ({setStep, step, videoId, handles}) => {

  const handleFileChange = async (e, setFieldValue) => {
    const file = e[0];
    setFieldValue('file', file);
  };

  const [addVideoFile, {isLoading, isError}] = useAddVideoFileMutation();

  const handleFileFormSubmit = (values) => {
    const data = {
      id: videoId,
      file: values.file
    };

    addVideoFile(data)
      .then((res) =>{
        handles.handleSubmitButton();
      })
      .catch(()=>{});
  };

  return (
    <>
      <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
        Video File
      </Heading>
      <Formik
        initialValues={{
          file: null,
        }}
        validationSchema={Yup.object().shape({
          file: Yup.mixed().required(),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          handleFileFormSubmit(values);
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
          }) => {
          return (
            <>
              <FormControl>
                <Form>
                  <Center w="full" marginY={5}>
                    <Field name='thumbnail'>
                      {({ form, field }) => {
                        const { setFieldValue } = form
                        return (
                          <FilePicker
                            onFileChange={(e) => handleFileChange(e, setFieldValue)}
                            id="file"
                            name="file"
                            placeholder="Choose Video File"
                            clearButtonLabel="Clear"
                            multipleFiles={false}
                            accept="video/mp4"
                            hideClearButton={false}
                            required={false}
                          />
                        )
                      }}
                    </Field>
                  </Center>
                  <ErrorMessage name="file"/>
                  <Button type="submit" disabled={isSubmitting} onClick={(e)=>{handleSubmit()}}>
                    Submit
                    {isLoading && <Spinner size={'sm'}/>}
                  </Button>
                </Form>
              </FormControl>
            </>
          );
        }}
      </Formik>




    </>
  );
};

export default VideoFileForm;