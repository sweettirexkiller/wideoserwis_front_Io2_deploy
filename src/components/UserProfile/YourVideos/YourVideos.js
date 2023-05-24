import React from 'react';
import { useGetUserVideosQuery } from '../../../services/authAPI';
import { IconButton, Spinner, Text, VStack } from '@chakra-ui/react';
import VideoElement from './VideoElement';
import { AddIcon } from '@chakra-ui/icons';


const YourVideos = ({token}) => {
  const decode = JSON.parse(atob(token.token.split('.')[1]));
  const { data = [], isLoading: vidoesLoading } = useGetUserVideosQuery(decode.oid);
  return(
    <>
      {vidoesLoading && <Spinner size={'xl'}/>}
      <VStack>
      {!vidoesLoading && data && (data.videos ? data.videos.map((video) => {
        return(
          <VideoElement video={video}/>
        );
      }) : <Text>You don't have any videos yet. Go to video addition tab.</Text>)}
      </VStack>
    </>
  );
};

export default YourVideos;
