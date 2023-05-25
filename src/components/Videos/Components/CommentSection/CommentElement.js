import React from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  Heading,
  HStack,
  IconButton,
  Input, Spinner,
  Text,

} from '@chakra-ui/react';
import { ArrowRightIcon, DeleteIcon } from '@chakra-ui/icons';
import Responses from './Responses';
import {
  useGetAllCommentsOfVideoQuery,
  useGetUserByIdQuery,
  useRemoveCommentMutation,
} from '../../../../services/authAPI';
import { useSelector } from 'react-redux';

const CommentElement = ({comment, videoId}) => {
  console.log(comment);
  const [removeComment, {isSuccess,isLoading}] = useRemoveCommentMutation();
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

          {comment.hasResponses && <Responses comment={comment}/>}

            <HStack width={'full'} justifyContent={'flex-end'} marginY={2}>
              <ArrowRightIcon/>
              <Input type={'text'} width={'80%'} borderRadius={0} height={8}/>
              <Button backgroundColor={'gray.800'} borderRadius={0} size={'sm'}><Text fontSize='sm' color={'white'}>Reply</Text></Button>
            </HStack>

        </CardBody>
      </Card>
    );
  }
}

export default CommentElement;