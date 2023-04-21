import React from 'react';
import { useParams } from 'react-router';
import { Box, Center } from '@chakra-ui/react';


const SingleVideoElement = () => {
  const { id } = useParams();

  const token = JSON.parse(localStorage.getItem('token'));
  return (
    <Box h={'calc(100vh)'} marginY={10}>
      <Center>
        <video width="50%" height="50%" autoPlay={false} controls="true">
          <source
            src={`https://localhost:7180/api/video/${id}?access_token=${token.token}`}
            type="video/mp4"
          />
        </video>
      </Center>
  </Box>
  );
};

export default SingleVideoElement;