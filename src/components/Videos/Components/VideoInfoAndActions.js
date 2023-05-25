import React from 'react';
import { HStack, Text } from '@chakra-ui/react';
import { ViewIcon } from '@chakra-ui/icons';
import AddToPlaylist from './Actions/AddToPlaylist';
import LikeOrDis from './Actions/LikeOrDis';
import Subscribe from './Actions/Subscribe';

const VideoInfoAndActions = ({video}) => {
  return (
    <HStack justifyContent={'space-between'} width={'full'} marginY={4}>

      <Subscribe authorNickname={video.authorNickname} authorId={video.authorId}/>

      <HStack spacing={10}>

        <AddToPlaylist/>
        <LikeOrDis/>

        <Text> {video.viewCount} <ViewIcon paddingBottom={1} color={'grey.500'}/></Text>

      </HStack>


    </HStack>
  )
}

export default VideoInfoAndActions;