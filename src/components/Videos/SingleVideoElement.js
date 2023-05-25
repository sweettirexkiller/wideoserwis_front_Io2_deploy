import React from 'react';
import { useParams } from 'react-router';
import {
  Box, Spinner,
  VStack,
} from '@chakra-ui/react';
import { useGetVideoMetadataQuery } from '../../services/authAPI';
import VideoTitle from './Components/VideoTitle';
import VideoPlayer from './Components/VideoPlayer';
import VideoInfoAndActions from './Components/VideoInfoAndActions';
import Description from './Components/Description';
import CommentSection from './Components/CommentSection/CommentSection';

const SingleVideoElement = () => {

  const { id } = useParams();
  const {data : video, isLoading} = useGetVideoMetadataQuery(id);

  return isLoading ? <Spinner/> : (
    <Box h={'calc(100vh)'} paddingY={10} background={'gray.100'}>
      <VStack width={'80%'} alignSelf={'flex-start'} marginLeft={5}>
        <VideoPlayer id={id}/>
        <VideoTitle title={video.title} tags={video.tags}/>
        <VideoInfoAndActions video={video}/>
        <Description description={video.description}/>
        <CommentSection/>
      </VStack>
    </Box>
  );
};

export default SingleVideoElement;