import React from 'react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { Button } from '@chakra-ui/react';

const Responses = ({comment}) => {
  return (
    <Button marginLeft={2} size={'xs'} variant={'link'}>Show Responses <ChevronDownIcon  paddingTop={1}/></Button>
  );
}

export default Responses;