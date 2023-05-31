import React from  'react';
import { Box } from '@chakra-ui/react';
import { API_URL } from '../../../services/auth.service';

const VideoPlayer = ({id}) => {
  const token = JSON.parse(localStorage.getItem('token'));

  return (
    <Box width={'full'}>
      <video autoPlay={false} controls="true"   width={'100%'} height={'100%'}>
        <source
          src={`${API_URL}/api/video/${id}?access_token=${token.token}`}
          type="video/mp4"
        />
      </video>
    </Box>
  );
}

export default VideoPlayer;