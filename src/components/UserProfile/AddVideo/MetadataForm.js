import React, { useState } from 'react';
import {
  Avatar, Button,
  Center,
  Flex,
  FormControl, FormErrorMessage,
  FormLabel,
  Heading, HStack, IconButton, Image,
  Input, Select, Spinner,
  Stack, Textarea,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useAddVideoMetadataMutation } from '../../../services/authAPI';
import { convertToBase64 } from '../../../common/utils';
import * as Yup from 'yup';
import { Field, FieldArray, Form, Formik } from 'formik';
import FilePicker from 'chakra-ui-file-picker';
import { AddIcon, Icon, MinusIcon } from '@chakra-ui/icons';


const SingleTagInput = ({ field, form, ...props }) => {
  return <Input width={'60%'} {...field} {...props} marginRight={4}/>;
};

const MetadataForm = ({setVideoId, step, setStep, handles}) => {
  const toast = useToast();
  const [show, setShow] = React.useState(false);
  const [currentThumbnailImage, setCurrentThumbnailImage] = useState(null);
  const [addVideoMetadata, {isLoading, isError}] = useAddVideoMetadataMutation()


  const initialValues = {
    title: "",
    description: "",
    tags: [],
    visibility: "public",
    thumbnail: null
  };

  const handleAddMetadata = (formValue) => {
    addVideoMetadata(formValue)
      .then((res) =>{
        setVideoId(res.data.id);
        handles.handleNextButton()
      })
      .catch(()=>{});
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .min(5, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    description: Yup.string()
      .min(5, 'Too Short!')
      .required('Required'),
    visibility: Yup.string()
      .required('Required'),
    tags:  Yup.array()
      .of(
        Yup.string()
      )
      .required('Must add tags')
      .min(3, 'Minimum of 3 tags.'),
  });

  const handleThumbnail = async (e, setFieldValue) => {
    const file = e[0];
    //check the size of image
    if (file?.size/1024/1024 < 2) {
      const base64 = await convertToBase64(file);
      setFieldValue('thumbnail', `${base64}`);
      setCurrentThumbnailImage(base64);
    }
    else {
      setCurrentThumbnailImage(null);
      setFieldValue('thumbnail', null);
      toast({
        title: 'Error',
        description: "Thumbnail image isn't necessary but recommended. Image size must be of 2MB or less. Accepted img, jpeg format only.",
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };
  return (
    <>
      <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
        Video Addition
      </Heading>
      <Flex>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);
            handleAddMetadata(values);
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
                <FormControl id="userName">
                  <FormLabel>Video Thumbnail</FormLabel>
                  <Stack direction={['column', 'row']} spacing={6}>
                    <Center>
                      <Image height={'150px'} src={`${currentThumbnailImage}`} fallbackSrc='https://via.placeholder.com/150' />
                    </Center>
                    <Center w="full">
                      <Field name='thumbnail'>
                        {({ form, field }) => {
                          const { setFieldValue } = form
                          return (
                            <FilePicker
                              onFileChange={(e) => handleThumbnail(e, setFieldValue)}
                              placeholder="Choose thumbnail Image File"
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
                             isInvalid={(errors.title && touched.title)}
                >
                  <FormLabel>Title</FormLabel>
                  <Input placeholder='Title'
                         type="text"
                         name="title"
                         onChange={handleChange}
                         onBlur={handleBlur}
                         id={'metadataVideoTitleInput'}
                         value={values.title}
                  />
                  {errors.title && touched.title && <FormErrorMessage id={'nickNameErrorMessage'}> Title is required.</FormErrorMessage>}
                </FormControl>
                <FormControl isRequired
                             isInvalid={(errors.description && touched.description)}
                >
                  <FormLabel>Description</FormLabel>
                  <Textarea placeholder='Description'
                         type="textarea"
                         name="description"
                         onChange={handleChange}
                         id={'metadataDescriptionInput'}
                         onBlur={handleBlur}
                         value={values.description}
                  />
                  {errors.description && touched.description && <FormErrorMessage>Description is required.</FormErrorMessage>}
                </FormControl>
                <FormControl isRequired
                             isInvalid={(errors.description && touched.description)}
                >
                  <FormLabel>Tags</FormLabel>
                  <FieldArray
                    name="tags"
                    render={arrayHelpers => (
                      <>
                        <Stack marginY={4}>
                          {values.tags.map((tag, index) => (
                            <div key={index}>
                              {/** both these conventions do the same */}
                              <Field name={`tags[${index}]`} component={SingleTagInput}/>
                              <IconButton type="button"
                                          icon={<MinusIcon />}
                                          size={'sm'}
                                          onClick={() => arrayHelpers.remove(index)}
                                          aria-label={'Remove tag'}/>
                            </div>
                          ))}
                        </Stack>
                        <IconButton aria-label='Add Tag'  size={'sm'} type="button" icon={<AddIcon />}  onClick={() => arrayHelpers.push("")} />
                      </>
                    )}
                  />
                  {errors.tags && touched.tags && <FormErrorMessage>Tags are required.</FormErrorMessage>}
                </FormControl>
                <FormControl isRequired
                             isInvalid={(errors.visibility && touched.visibility)}
                >
                  <FormLabel>Visibility</FormLabel>
                  <Select placeholder='Visibility'
                          name="visibility"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          id={'metadataVisibilityInput'}
                          value={values.visibility}>
                    <option value='private' id={'userTypeCreator'}>Private</option>
                    <option value='public' id={'userTypeSimple'}>Public</option>
                  </Select>

                  {errors.visibility && touched.visibility && <FormErrorMessage>Visibility is required.</FormErrorMessage>}
                </FormControl>
                <HStack w={'100%'} justifyContent={"space-evenly"}>
                  <Button disabled={isSubmitting}
                          id={'registerSubmitButton'}
                          onClick={(e)=>{handleSubmit()}}
                  >
                    Next
                    {isLoading && <Spinner size={'sm'}/>}
                  </Button>
                </HStack>
              </VStack>
            </Form>
          )}
        </Formik>
      </Flex>
    </>
  );
};

export default MetadataForm;