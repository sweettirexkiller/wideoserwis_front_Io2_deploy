import React from 'react';
import { Avatar, AvatarBadge, Button, Center, FormControl, FormLabel, IconButton, Stack } from '@chakra-ui/react';
import { SmallCloseIcon } from '@chakra-ui/icons';

const EditProfilePhoto = () => {
  return (
    <FormControl id="userName">
      <FormLabel>User Icon</FormLabel>
      <Stack direction={['column', 'row']} spacing={6}>
        <Center>
          <Avatar size="xl" src="https://bit.ly/sage-adebayo">
            <AvatarBadge
              as={IconButton}
              size="sm"
              rounded="full"
              top="-10px"
              colorScheme="red"
              aria-label="remove Image"
              icon={<SmallCloseIcon />}
            />
          </Avatar>
        </Center>
        <Center w="full">
          <Button w="full">Change Icon</Button>
        </Center>
      </Stack>
    </FormControl>
  );
}

export default EditProfilePhoto;