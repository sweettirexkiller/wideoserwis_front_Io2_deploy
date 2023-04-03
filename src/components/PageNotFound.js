import React from 'react';
import { Box, Button, Heading, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';



const PageNotFound = () =>{
  const navigate = useNavigate();
  return (
    <Box textAlign="center" py={50} px={6} hy={'500px'}>
      <Heading
        display="inline-block"
        as="h2"
        size="2xl"
        backgroundClip="text">
        404
      </Heading>
      <Text fontSize="18px" mt={3} mb={2}>
        Page Not Found
      </Text>
      <Text color={'gray.500'} mb={6}>
        The page you're looking for does not seem to exist
      </Text>

      <Button
        colorScheme="teal"
        variant="solid"
        onClick={()=> {navigate('/')}}
      >
        Go to Home
      </Button>
    </Box>
  );
}


export  default PageNotFound;