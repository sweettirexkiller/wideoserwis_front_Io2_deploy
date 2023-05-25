import React from 'react';
import { Badge, Heading, HStack, Text } from '@chakra-ui/react';

const VideoTitle = ({title, tags}) => {
  return(
  <HStack  justifyContent={'space-between'} width={'full'} paddingLeft={3} marginY={4}>
    <Heading><Text size='xl' fontWeight='bold'>{title}</Text></Heading>
    <HStack>

        {tags.map((tag, index) => {
          return(
            <Badge key={index} colorScheme={'purple'}>
              {tag}
            </Badge>
          );
        })}

    </HStack>
  </HStack>

);
}
export default VideoTitle;