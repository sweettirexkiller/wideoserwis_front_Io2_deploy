import React from 'react';
import { Heading, HStack, Text } from '@chakra-ui/react';

const VideoTitle = ({title}) => {
  return(
  <HStack  justifyContent={'flex-start'} width={'full'} paddingLeft={3} marginY={4}>
    <Heading><Text size='xl' fontWeight='bold'>{title}</Text></Heading>
  </HStack>

);
}
export default VideoTitle;