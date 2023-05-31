import React from 'react';
import {
  Button,
  Checkbox,
  FormControl, FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton, ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Portal, Select, Spinner,
  Text, Textarea,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import {
  useGetUserPlaylistsQuery,
  useGetUserByIdQuery,
  useAddPlaylistMutation,
  useAddVideoToPlaylistMutation,
} from '../../../../services/authAPI';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import { ErrorMessage, Form, Formik } from 'formik';
import PlaylistListElement from './PlaylistListElement';

const AddToPlaylist = ({videoId}) => {


  const { token } = useSelector((state) => state.auth);
  const {data: user, isLoading: isUserLoading} = useGetUserByIdQuery(token);
  const {data : playlists, isLoading, isSuccess, refetch: refetchPlaylists} = useGetUserPlaylistsQuery(!isUserLoading && user.id);
  const [addPlaylist, {isLoading: isAddPlaylistLoading, isSuccess: isAddingPlaylistSuccess}] = useAddPlaylistMutation();
  const [addVideoToPlaylist, {isLoading: isAddVideoToPlaylistLoading}] = useAddVideoToPlaylistMutation();
  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialValues = {
    name: '',
    visibility: 'Private',
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Too Short!')
      .max(500, 'Too Long!')
      .required('Required.'),
    visibility: Yup.string()
      .required('Required.')
  });

  const handleAddPlaylist = (values)  => {
    addPlaylist(values)
      .then((res)=>{

        addVideoToPlaylist({ playlistId: res.data.id, videoId: videoId})
          .then(()=>{
            refetchPlaylists();
            onClose();
          })
          .catch(()=>{});

        refetchPlaylists();
        onClose();

      })
      .catch(()=>{});
  };


  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  return (
    <>
    <Popover>
      <PopoverTrigger>
        <Button
          colorScheme='blue'
          minWidth={100}
          paddingX={5}
          height={8}
          borderRadius={15}
          aria-label='add-to-playlist'
          size='l'
          justifyContent={'space-around'}
        >Add to playlist
          <AddIcon marginLeft={5}/>
        </Button>
      </PopoverTrigger>
      <Portal>
        <PopoverContent>
          <PopoverArrow />
          <PopoverHeader>Choose playlist:</PopoverHeader>
          <PopoverCloseButton />
          <PopoverBody>
            <VStack alignItems={'flex-start'}>
              {isLoading && <Spinner size={'xs'}/>}
              {isSuccess && playlists.map((playlist) => {
                return (
                  <PlaylistListElement playlist={playlist}/>
                );
              })}
            </VStack>

          </PopoverBody>
          <PopoverFooter justifyContent={'flex-end'} display={'flex'} flexDirection={'row'}>
            <Button colorScheme='teal' size={'sm'} onClick={onOpen}>
              <Text fontSize={'xs'}>New PLaylist</Text>
              <AddIcon marginLeft={3}/>
            </Button>
          </PopoverFooter>
        </PopoverContent>
      </Portal>
    </Popover>


      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create new playlist</ModalHeader>
          <ModalCloseButton />

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(true);
              handleAddPlaylist(values);
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
              }) => (

              <Form width={'full'} display={'flex'} flexDirection={'row'}>

                <ModalBody pb={6}>

                    <FormControl isRequired
                                 isInvalid={(errors.name && touched.name)}
                                 width={'full'}
                                 mt={4}
                    >

                      <FormLabel>Name</FormLabel>
                      <Input placeholder='Playlist 1' name="name"  onChange={handleChange} width={520}
                             onBlur={handleBlur}
                             value={values.name}  />

                      {errors.name && touched.name && <Text fontSize={'xs'} color={'red'}><ErrorMessage name="name" /></Text>}

                    </FormControl>

                    <FormControl isRequired
                                 isInvalid={(errors.visibility && touched.visibility)}
                    >
                      <FormLabel>Visibility</FormLabel>

                      <Select placeholder='visibility'
                              name="visibility"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.visibility}>
                        <option value='Private'>Private</option>
                        <option value='Public'>Public</option>
                      </Select>

                      {errors.visibility && touched.visibility && <Text fontSize={'xs'} color={'red'}><ErrorMessage name="visibility" /></Text>}
                    </FormControl>


                </ModalBody>

                <ModalFooter>
                  <Button colorScheme='blue' mr={3}
                          onClick={(e)=>{handleSubmit()}}>
                    Create {(isAddPlaylistLoading  || isAddVideoToPlaylistLoading)&&  <Spinner size='sm' />}
                  </Button>
                  <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>

              </Form>
            )}
          </Formik>
        </ModalContent>
      </Modal>

    </>

  );
}



export default AddToPlaylist;