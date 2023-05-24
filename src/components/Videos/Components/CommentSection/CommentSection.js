import React from 'react';
import { Avatar, Box, Button, Card, CardBody, Heading, HStack, Input, Text, Textarea, VStack } from '@chakra-ui/react';
import { ArrowRightIcon } from '@chakra-ui/icons';

const CommentSection = () => {
  return (
    <Box width={'full'} marginTop={5} marginLeft={8}>

      <Heading size={'m'} marginLeft={2}>Comments: </Heading>

      <VStack width={'full'} justifyContent={'flex-start'} spacing={3} marginY={4}>

        <Card variant={'outline'} alignSelf={'flex-start'} width={'80%'}>

          <CardBody>

            <HStack>
              <Avatar
                size={'sm'}
                src={
                  'https://images.unsplash.com/photo-1520810627419-35e362c5dc07?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ'
                }
                alt={'Avatar Alt'}
                mb={4}
                pos={'relative'}/>
              <Heading size={'sm'} marginBottom={2}>Janina Kowalska</Heading>
            </HStack>


            <Box backgroundColor={'gray.200'} borderRadius={10} paddingY={3} paddingX={4}>
              <Text>I think this video is amazing!</Text>
            </Box>

            <HStack width={'full'} justifyContent={'flex-end'} marginY={2}>
              <ArrowRightIcon/>
              <Input type={'text'} width={'80%'} borderRadius={0} height={8}/>
              <Button backgroundColor={'gray.800'} borderRadius={0} size={'sm'}><Text fontSize='sm' color={'white'}>Reply</Text></Button>
            </HStack>

          </CardBody>
        </Card>

        <Box width={'80%'} alignSelf={'flex-start'}>
          <HStack width={'full'} justifyContent={'flex-end'} marginY={2} alignItems={'flex-start'}>
            <Textarea backgroundColor={'white'} borderRadius={0}/>
            <Button backgroundColor={'gray.800'} borderRadius={0} size={'sm'}><Text fontSize='sm' color={'white'}>Comment</Text></Button>
          </HStack>
        </Box>

      </VStack>
    </Box>
  );
}

export default CommentSection;