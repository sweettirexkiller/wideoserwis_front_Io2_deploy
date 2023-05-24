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

const desc = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eu ultricies mi. Nunc metus lectus, consequat vitae porta at, finibus id orci. Donec rhoncus vestibulum nisl vehicula feugiat. Cras id placerat ligula, in vehicula ipsum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec placerat libero lacus, at convallis velit interdum aliquam. Sed quis tempor quam. In hac habitasse platea dictumst.\n" +
  "\n" +
  "Nam maximus tristique pharetra. Donec mattis pulvinar efficitur. In hac habitasse platea dictumst. Aliquam rhoncus ultrices lorem et euismod. Etiam finibus sagittis accumsan. Duis eget lorem porttitor, porta nunc eget, luctus ligula. Fusce tempor felis ante, at scelerisque lorem efficitur non. Donec vitae tincidunt lacus. Quisque gravida erat ligula, eget iaculis enim fringilla vel.";


const SingleVideoElement = () => {

  const { id } = useParams();
  const {data, error, isLoading} = useGetVideoMetadataQuery(id);

  return (
    <Box h={'calc(100vh)'} paddingY={10} background={'gray.100'}>
      <VStack width={'80%'} alignSelf={'flex-start'} marginLeft={5}>
        <VideoPlayer id={id}/>
        <VideoTitle title={'Title title'}/>
        <VideoBasicInfo/>
        <Description description={desc}/>
        <CommentSection/>
      </VStack>
    </Box>
  );
};

export default SingleVideoElement;