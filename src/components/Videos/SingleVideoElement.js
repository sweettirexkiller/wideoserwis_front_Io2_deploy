import React from 'react';
import { useParams } from 'react-router';
import {
  Box,
  VStack,
} from '@chakra-ui/react';
import { useGetVideoMetadataQuery } from '../../services/authAPI';
import VideoTitle from './Components/VideoTitle';
import VideoPlayer from './Components/VideoPlayer';
import VideoBasicInfo from './Components/VideoBasicInfo';
import Description from './Components/Description';
import CommentSection from './Components/CommentSection/CommentSection';

const SingleVideoElement = () => {

  const { id } = useParams();
  const {data, error, isLoading} = useGetVideoMetadataQuery(id);

  return (
    <Box h={'calc(100vh)'} paddingY={10} background={'gray.100'}>
      <VStack width={'80%'} alignSelf={'flex-start'} marginLeft={5}>
        <VideoPlayer id={id}/>
        <VideoTitle title={'Title title'}/>
        <VideoBasicInfo/>
        <Description description={"description"}/>
        <CommentSection/>
      </VStack>
    </Box>
  );
};

export default SingleVideoElement;