import React from 'react';
import {
  Box,
  Heading,
  Spinner,
  VStack,
} from '@chakra-ui/react';
import {  useGetAllCommentsOfVideoQuery } from '../../../../services/authAPI';
import AddCommentForm from './AddCommentForm';
import CommentElement from './CommentElement';

const CommentSection = ({videoId}) => {


  const {data, isLoading, isSuccess, isError, error} = useGetAllCommentsOfVideoQuery(videoId);

  let comments =  isSuccess ? data.comments : [];


  return (
    <Box width={'full'} marginTop={5} marginLeft={8}>

      <Heading size={'m'} marginLeft={2}>Comments: </Heading>
      {isLoading && <Spinner size={'md'}/>}


      <VStack width={'full'} justifyContent={'flex-start'} spacing={3} marginY={4}>

        {isSuccess && comments.map((comment) => (<CommentElement key={comment.id} comment={comment} videoId={videoId}/>) ) }
        <AddCommentForm videoId={videoId}/>

      </VStack>
    </Box>
  );
}

export default CommentSection;