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
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const SingleVideoElement = () => {
  const navigate = useNavigate()
  const { isLoggedIn } = useSelector((state) => state.auth);

  if(!isLoggedIn) {
    navigate('/log-in');
  }
  const { id } = useParams();
  const {data : video, isLoading, isSuccess, isError, error} = useGetVideoMetadataQuery(id);

  let content;
  if (isLoading) {
    content = <Spinner text="Loading..." />
  } else if (isSuccess) {
    content = (<Box h={'full'} paddingY={10} background={'gray.100'}>
      <VStack width={'80%'} alignSelf={'flex-start'} marginLeft={5}>
        <VideoPlayer id={id}/>
        <VideoTitle title={video.title} tags={video.tags}/>
        <VideoInfoAndActions video={video}/>
        <Description description={video.description}/>
        <CommentSection videoId={video.id}/>
      </VStack>
    </Box>);
  } else if (isError) {
    content = <div>Some error occurred. You probably need to log out and log in again. {error.toString()}</div>
  }

  return content;
};

export default SingleVideoElement;