import React from 'react';
import { useGetUserVideosQuery } from '../../../services/authAPI';
import { IconButton, Spinner, VStack } from '@chakra-ui/react';
import VideoElement from './VideoElement';
import { AddIcon } from '@chakra-ui/icons';


const YourVideos = ({token}) => {
  const decode = JSON.parse(atob(token.token.split('.')[1]));
  const { data = [], isLoading: vidoesLoading } = useGetUserVideosQuery(decode.oid);
  return(
    <>
      {vidoesLoading && <Spinner size={'xl'}/>}
      <VStack>
      {!vidoesLoading && data && data.videos.map((video) => {
        console.log(video);
        return(
          <VideoElement video={video}/>
        );
      })}
      </VStack>
    </>
  );
};

export default YourVideos;
