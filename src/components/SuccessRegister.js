import React from 'react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import { Box, Button, Heading, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const SuccessRegister = ()=> {
  const navigate = useNavigate();
  return (
    <Box textAlign="center" py={10} px={6} h='calc(90vh)' id={'registerConfirmationBox'}>
      <CheckCircleIcon boxSize={'50px'} color={'green.500'} />
      <Heading as="h2" size="xl" mt={6} mb={2} id={'successRegisterHeading'}>
        Konto poprawnie utworzone.
      </Heading>
      <Text color={'gray.500'}>
        Aby korzystać z naszej platformy zaloguj się na swoje nowo uworzone konto.
      </Text>

      <Button
        colorScheme="green"
        variant="solid"
        onClick={()=> {navigate('/log-in')}}
      >
        Log in
      </Button>
    </Box>
  );
}

export default SuccessRegister;