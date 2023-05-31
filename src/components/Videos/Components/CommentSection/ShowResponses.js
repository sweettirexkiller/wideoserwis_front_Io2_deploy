import React from 'react';
import { Avatar, Box, Heading, HStack, List, ListIcon, ListItem, Text } from '@chakra-ui/react';
import { useGetResponseOnCommentQuery } from '../../../../services/authAPI';

const ShowResponses = ({comment}) => {

  const {data: responses, isLoading, isSuccess, isError, error} = useGetResponseOnCommentQuery(comment.id);

  console.log(responses);

  return (
    <List spacing={5}>
      {!isLoading && isSuccess && responses.comments && responses.comments.map((response) => (
        <ListItem width={"100%"} key={response.id} >
          <HStack width={'full'} justifyContent={'flex-end'}>
            <Avatar
              size={'xs'}
              src={response.avatarImage}
              alt={'Avatar Alt'}
              mb={4}
              pos={'relative'}/>
            <Box backgroundColor={'gray.200'} borderRadius={10} width={'80%'} paddingY={3} paddingX={4} display={'flex'}>
              <Heading size={'xs'} paddingRight={3}>{response.nickname}:</Heading>
              <Text fontSize={'xs'}>{response.content}</Text>
            </Box>
          </HStack>
        </ListItem>
      ))}
    </List>
  );
};

export default ShowResponses;