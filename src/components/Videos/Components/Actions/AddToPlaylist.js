import React from 'react';
import { Button } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

const AddToPlaylist = () => {
  return (
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
  );
}

export default AddToPlaylist;