import React from 'react';
import { Button, HStack, Text, Tooltip } from '@chakra-ui/react';
import { AddIcon, BellIcon, Icon, ViewIcon } from '@chakra-ui/icons';
import { FaRegThumbsUp } from 'react-icons/all';

const VideoBasicInfo = () => {
  return (
    <HStack justifyContent={'space-between'} width={'full'} marginY={4}>

      <Tooltip label={`Subscribe`} aria-label='A tooltip'>
        <Button colorScheme='red' borderRadius={15} hoover={'Subscribe'}>
          <HStack>
            <Text>Authors nickname</Text>
            <BellIcon/>
          </HStack>
        </Button>
      </Tooltip>


      <HStack spacing={10}>

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

        <Text> 1500 100 900 <ViewIcon paddingBottom={1} color={'grey.500'}/></Text>

      </HStack>


    </HStack>
  )
}

export default VideoBasicInfo;