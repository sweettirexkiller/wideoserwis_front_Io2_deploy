import React from 'react';
import { Box, Button, Center, Heading, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { InfoIcon } from '@chakra-ui/icons';

const SuccessDeleting = ()=> {
  const navigate = useNavigate();
  return(
    <Box textAlign="center" py={50} px={6}  h='calc(90vh)'>
      <InfoIcon boxSize={'50px'} color={'blue.500'} />
      <Heading as="h2" size="xl" mt={6} mb={2}>
        Konto prawidłowo usunięte z naszej platformy.
      </Heading>
      <Text color={'gray.500'}>
        Jeśli chesz korzystać z naszej platformy i odtwarzać dostepne filmy, musisz się ponownie zarejestrować.
      </Text>

      <Center marginY={10} paddingX={50}>
        <Button
          colorScheme="green"
          variant="solid"
          onClick={()=> {navigate('/register')}}
        >
          Register
      </Button>
      </Center>
    </Box>
  );
}

export default SuccessDeleting;