import React from 'react';
import { Button } from '@chakra-ui/react';
import { Icon } from '@chakra-ui/icons';
import { FaRegThumbsUp } from 'react-icons/all';


const LikeOrDis = () => {
  return (
    <Button
      colorScheme='green'
      width={100}
      height={8}
      borderRadius={15}
      aria-label='Like'
      size='l'
      justifyContent={'space-around'}
    >Like
      <Icon maringLeft={5} as={FaRegThumbsUp}/>
    </Button>
  );
}

export default LikeOrDis;