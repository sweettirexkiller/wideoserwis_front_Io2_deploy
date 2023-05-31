import React from 'react';
import { useParams } from 'react-router';
import { Box, Button, Spinner, Text, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useDeleteVideoMutation, useGetUserVideosQuery } from '../../services/authAPI';

const SingleVideoEditPage = () => {

  const [deleteVideo, {isLoading}] = useDeleteVideoMutation();
  const navigate = useNavigate();
  const {refetch} = useGetUserVideosQuery();

  const { id } = useParams();

  const handleRemoveVideoClick = () => {
    deleteVideo(id)
      .then(()=>{
        refetch();
        navigate('/profile');
      })
      .catch(()=>{});
  }
  return (
    <Box h={'full'} minHeight={'calc(80vh)'} paddingY={10} background={'gray.100'}>
      <VStack width={'80%'} alignSelf={'flex-start'} marginLeft={5}>
        <Text>EDIT FORM SHOULD BE HERE</Text>

        <Button colorScheme={'red'} onClick={handleRemoveVideoClick}>
          Remove This Video from platform {isLoading && <Spinner size={'sm'}/>}
        </Button>
      </VStack>
    </Box>
  );
}

export default SingleVideoEditPage;