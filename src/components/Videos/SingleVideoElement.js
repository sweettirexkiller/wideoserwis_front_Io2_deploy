import React from 'react';
import { useParams } from 'react-router';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  HStack, Input,
  Text, Textarea,
  Tooltip,
  VStack,
} from '@chakra-ui/react';
import { AddIcon, ArrowRightIcon, BellIcon, Icon, ViewIcon } from '@chakra-ui/icons';
import { FaRegThumbsUp } from 'react-icons/all';

const SingleVideoElement = () => {

  // TODO: fetch video metadata
  const { id } = useParams();

  const token = JSON.parse(localStorage.getItem('token'));
  return (
    <Box h={'calc(100vh)'} paddingY={10} background={'gray.100'}>
      <VStack width={'80%'} alignSelf={'flex-start'} marginLeft={5}>

        {/*// Video title element*/}
        <HStack  justifyContent={'flex-start'} width={'full'} paddingLeft={3} marginY={4}>
          <Heading><Text size='xl' fontWeight='bold'>Title should be here</Text></Heading>
        </HStack>

        {/*// Video element*/}
        <Box width={'full'}>
          <video autoPlay={false} controls="true"   width={'100%'} height={'100%'}>
            <source
              src={`https://localhost:7180/api/video/${id}?access_token=${token.token}`}
              type="video/mp4"
            />
          </video>
        </Box>

        {/*// Video Meta data element*/}
        <HStack justifyContent={'space-between'} width={'full'} marginY={4}>

          <Tooltip label={`Subscribe`} aria-label='A tooltip'>
            <Button colorScheme='red' borderRadius={15} hoover={'Subscribe'}>
              <HStack>
                <Text>Authors nickname</Text>
                <BellIcon/>
              </HStack>
            </Button>
          </Tooltip>


          <HStack spacing={10}>

            <Button
              colorScheme='blue'
              minWidth={100}
              paddingX={5}
              height={8}
              borderRadius={15}
              aria-label='add-to-playlist'
              size='l'
              justifyContent={'space-around'}
            >Add to playlist
              <AddIcon marginLeft={5}/>
            </Button>

            <Button
              colorScheme='green'
              width={100}
              height={8}
              borderRadius={15}
              aria-label='Like'
              size='l'
              justifyContent={'space-around'}
            >Like
              <Icon maringLeft={5} as={FaRegThumbsUp}/>
            </Button>

            <Text> 1500 100 900 <ViewIcon paddingBottom={1} color={'grey.500'}/></Text>

          </HStack>


        </HStack>

        {/*// description element*/}

        <Box width={'full'} paddingX={3} marginY={4}>
          <Text size={'s'}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry'. Generate lorem ipsum 3 times.
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry'. Generate lorem ipsum 3 times.
          </Text>
        </Box>

        {/*// Comments element*/}

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
      </VStack>
  </Box>
  );
};

export default SingleVideoElement;