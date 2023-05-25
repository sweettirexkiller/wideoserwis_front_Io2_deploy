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
  const {data : video, isLoading, isSuccess, isError, error} = useGetVideoMetadataQuery(id);


  let content;
  if (isLoading) {
    content = <Spinner text="Loading..." />
  } else if (isSuccess) {
    content = (<Box h={'calc(100vh)'} paddingY={10} background={'gray.100'}>
      <VStack width={'80%'} alignSelf={'flex-start'} marginLeft={5}>
        <VideoPlayer id={id}/>
        <VideoTitle title={video.title} tags={video.tags}/>
        <VideoInfoAndActions video={video}/>
        <Description description={video.description}/>
        <CommentSection/>
      </VStack>
    </Box>);
  } else if (isError) {
    content = <div>Some error occurred. You probably need to log out and log in again. {error.toString()}</div>
  }

  return content;
};

export default SingleVideoElement;