import React from 'react';
import {
  Button,
  Checkbox,
  FormControl,
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
  Portal,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useGetUserPlaylistsQuery, useGetUserByIdQuery, useAddVideoToPlaylistMutation, useRemoveVideoFromPlaylistMutation } from '../../../../services/authAPI';
import { useSelector } from 'react-redux';

const AddToPlaylist = () => {


  const { token } = useSelector((state) => state.auth);
  const {data: user, isLoading: isUserLoading} = useGetUserByIdQuery(token);
  const {data : playlists, isLoading, isSuccess, isError, error} = useGetUserPlaylistsQuery(!isUserLoading && user.id);


  console.log(playlists);

  const { isOpen, onOpen, onClose } = useDisclosure()

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
              <Checkbox size='md' colorScheme='pink' defaultChecked={false}>
                Playlist 1
              </Checkbox>
              <Checkbox size='md' colorScheme='pink'>
                Playlist 2
              </Checkbox>
              <Checkbox size='md' colorScheme='pink'>
                Playlist 3
              </Checkbox>
            </VStack>

          </PopoverBody>
          <PopoverFooter justifyContent={'flex-end'} display={'flex'} flexDirection={'row'}>
            <Button colorScheme='teal' size={'sm'} onClick={onOpen}>
              <Text fontSize={'xs'}> New PLaylist</Text>
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
          <ModalBody pb={6}>
            <FormControl mt={4}>
              <FormLabel>Name</FormLabel>
              <Input placeholder='Playlist 1' />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3}>
              Create
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

    </>

  );
}



export default AddToPlaylist;