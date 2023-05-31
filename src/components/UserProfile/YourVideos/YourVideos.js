import React from 'react';
import { useGetUserVideosQuery } from '../../../services/authAPI';
import { IconButton, Spinner, Text, VStack } from '@chakra-ui/react';
import VideoElement from './VideoElement';
import { AddIcon } from '@chakra-ui/icons';


const YourVideos = ({token}) => {
  const decode = JSON.parse(atob(token.token.split('.')[1]));
  const { data = [], isLoading: vidoesLoading } = useGetUserVideosQuery(decode.oid);


  return(

      <VStack minHeight={'calc(80vh)'} h={'full'}>
        {vidoesLoading && <Spinner size={'xl'}/>}
      {!vidoesLoading && data && (data.videos?.length !== 0 ? data.videos.map((video) => {
        return(
          <VideoElement video={video}/>
        );
      }) : <Text>You don't have any videos yet. Go to video addition tab.</Text>)}
      </VStack>

  );
};

export default YourVideos;
