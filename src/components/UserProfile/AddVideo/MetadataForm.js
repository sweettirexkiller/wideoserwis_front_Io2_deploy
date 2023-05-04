import React from 'react';
import { Flex, FormControl, FormLabel, Heading, Input } from '@chakra-ui/react';

import {useAddVideoMetadataMutation} from '../../../services/authAPI';

const MetadataForm = () => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  return (
    <>
      <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
        Video Addition
      </Heading>
      <Flex>
        <FormControl mr="5%">
          <FormLabel htmlFor="title" fontWeight={'normal'}>
            Title
          </FormLabel>
          <Input id="title" placeholder="Title" />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="description" fontWeight={'normal'}>
            Description
          </FormLabel>
          <Input id="description" placeholder="First name" />
        </FormControl>
      </Flex>
    </>
  );
};

export default MetadataForm;