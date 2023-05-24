import React from 'react';
import { Box, Text } from '@chakra-ui/react';

const Description = ({description}) => {
  return(
    <Box width={'full'} paddingX={3} marginY={4}>
      <Text size={'s'}>
        {description}
      </Text>
    </Box>
  );
}

export default Description;