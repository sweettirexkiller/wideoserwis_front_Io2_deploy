import { Box, Button, Heading, Text } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import React from 'react';

const SuccessAddition = () => {
  return (
    <>
      <Box textAlign="center" paddingTop={5} px={6} id={'videoAdditionConfirmationBox'}>
        <CheckCircleIcon boxSize={'50px'} color={'green.500'} />
        <Heading as="h2" size="xl" mt={6} mb={2} id={'successRegisterHeading'}>
          Video Poprawnie dodane.
        </Heading>
        <Text color={'gray.500'}>
          Możesz obejrzeć film na naszej platformie.
        </Text>
        <Button
          colorScheme="green"
          variant="solid"
          marginTop={10}
        >
          Obejrz
        </Button>
      </Box>
    </>
  );
};

export default SuccessAddition;