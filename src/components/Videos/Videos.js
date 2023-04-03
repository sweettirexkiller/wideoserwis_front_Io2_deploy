import React from 'react';
import { Button, Card, CardBody, CardFooter, Heading, HStack, Image, Stack, Text, VStack } from '@chakra-ui/react';

const Videos = () => {
  return (
    <VStack spacing={3} paddingY={5}>
      <Heading>Search results</Heading>
       <VideoCard title={"Video 1"}/>
       <VideoCard title={"Video 2"}/>
       <VideoCard  title={"Video 3"}/>
       <VideoCard  title={"Video 4"}/>
    </VStack>
  )
}

const VideoCard = ({title}) =>{
  return (
    <Card
      direction={{ base: 'column', sm: 'row' }}
      overflow='hidden'
      variant='outline'
    >
      <Image
        objectFit='cover'
        maxW={{ base: '100%', sm: '200px' }}
        src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
        alt='Caffe Latte'
      />

      <Stack>
        <CardBody>
          <Heading size='md'>{title}</Heading>

          <Text py='2'>
            Caffè latte is a coffee beverage of Italian origin made with espresso
            and steamed milk.
          </Text>
        </CardBody>

        <CardFooter justifyContent={'flex-end'}>
            <Button variant='solid' colorScheme='blue'>
              Watch
            </Button>
        </CardFooter>
      </Stack>
    </Card>
  );
}

export default Videos;