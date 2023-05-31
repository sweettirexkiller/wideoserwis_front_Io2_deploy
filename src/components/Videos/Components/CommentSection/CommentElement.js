import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  Heading,
  HStack,
  IconButton,
  Spinner,
  Text,

} from '@chakra-ui/react';
import { ChevronUpIcon, DeleteIcon } from '@chakra-ui/icons';
import Responses from './Responses';
import {
  useGetAllCommentsOfVideoQuery,
  useGetUserByIdQuery,
  useRemoveCommentMutation,
} from '../../../../services/authAPI';
import { useSelector } from 'react-redux';
import Reply from './Reply';
import ShowResponses from './ShowResponses';

const CommentElement = ({comment, videoId}) => {
  // console.log(comment);
  const [isShowResponses, setIsShowResponses] = useState(false);
  const [removeComment, {isLoading}] = useRemoveCommentMutation();
  const { token } = useSelector((state) => state.auth);
  const {data:user, isLoading: isUserLoading} = useGetUserByIdQuery(token);
  const {refetch: refetchComments} = useGetAllCommentsOfVideoQuery(videoId);

  const handleDeleteCommentClick = (e) => {

    console.log('delete comment');
      removeComment(comment.id)
      .then(()=>{
        console.log('comment deleted');
        refetchComments();

       })
      .catch(()=>{});
  }

  if(isUserLoading) {
    return <Spinner/>;
  } else {
    return (
      <Card variant={'outline'} alignSelf={'flex-start'} width={'80%'}>
        <CardBody>

          <HStack justifyContent={'space-between'}>
            <HStack>
              <Avatar
                size={'sm'}
                src={comment.avatarImage}
                alt={'Avatar Alt'}
                mb={4}
                pos={'relative'}/>
              <Heading size={'sm'} marginBottom={3}>{comment.nickname}</Heading>
            </HStack>

            {
              user.id === comment.authorId &&<IconButton padding={1} as={isLoading ? Spinner : DeleteIcon} onClick={handleDeleteCommentClick} aria-label={'Delete Icon'} size={'xs'} colorScheme={'red'}/>
            }

          </HStack>


          <Box backgroundColor={'gray.200'} borderRadius={10} paddingY={3} paddingX={4}>
            <Text>{comment.content}</Text>
          </Box>

          {comment.hasResponses && !isShowResponses && <Responses setIsShowResponses={setIsShowResponses} comment={comment}/>}
          {isShowResponses && <Button onClick={()=>setIsShowResponses(false)} size={'xs'} variant={'link'}>Hide responses <ChevronUpIcon paddingTop={1}/></Button>}
          {isShowResponses && <ShowResponses comment={comment}/>}
          <Reply comment={comment} videoId={videoId} setIsShowResponses={setIsShowResponses}/>

        </CardBody>
      </Card>
    );
  }
}

export default CommentElement;