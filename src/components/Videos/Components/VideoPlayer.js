import React from  'react';
import { Box } from '@chakra-ui/react';

const VideoPlayer = ({id}) => {
  const token = JSON.parse(localStorage.getItem('token'));
  return (
    <Box width={'full'}>
      <video autoPlay={false} controls="true"   width={'100%'} height={'100%'}>
        <source
          src={`https://localhost:7180/api/video/${id}?access_token=${token.token}`}
          type="video/mp4"
        />
      </video>
    </Box>
  );
}

export default VideoPlayer;