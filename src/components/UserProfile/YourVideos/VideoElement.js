import React from 'react';
import { Badge, Box, Button, Card, CardBody, CardFooter, Heading, HStack, Image, Stack, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const VideoElement = ({video}) => {
  const navigate = useNavigate();
  return (
    <Card
      direction={{ base: 'column', sm: 'row' }}
      overflow='hidden'
      variant='outline'
      width={'100%'}
    >
      <Box width={200} padding={2}>
        <Image
          objectFit='cover'
          maxW={{ base: '100%', sm: '200px' }}
          src={video.thumbnail}
          alt='Video Thumbnail'
        />
      </Box>

      <Stack width={'full'}>
        <CardBody>
          <Heading size='md'>{video.title}</Heading>

          <Text py='2'>
            {video.description}
          </Text>
          <Text py='2'>
            {video.authorNickname}
          </Text>
        </CardBody>

        <CardFooter width={'full'} display={'flex'}  flexDirection={'row'} justifyContent={'space-between'}>

            <HStack>
              {video.tags.map((tag, index) => {
                return(
                  <Badge key={index} colorScheme={'purple'}>
                    {tag}
                  </Badge>
                );
              })}
            </HStack>

            <HStack>
              <Button variant='solid' colorScheme='blue' onClick={()=>{
                //redirect to video page
                navigate(`/videos/${video.id}`);
              }}>
                Watch video
              </Button>
              <Button
                onClick={()=>{
                  //redirect to video page
                  navigate(`/videos/edit/${video.id}`);
                }}>Edit</Button>
            </HStack>

        </CardFooter>
      </Stack>
    </Card>
  );
}

export default VideoElement;



// <video width="50%" height="50%" autoPlay="" controls="true">
//   <source
//     src="https://localhost:7180/api/video/a15e75dc-38f0-4082-153b-08db41d2c3e5?access_token=eyJhbGciOiJSUzI1NiIsImtpZCI6Ilg1ZVhrNHh5b2pORnVtMWtsMll0djhkbE5QNC1jNTdkTzZRR1RWQndhTmsiLCJ0eXAiOiJKV1QifQ.eyJpZHAiOiJMb2NhbEFjY291bnQiLCJvaWQiOiJjYjk1NDIyNy0zMDEzLTRjNDAtOWZiZS1kYjY1ZjNmNDZiMjIiLCJzdWIiOiJjYjk1NDIyNy0zMDEzLTRjNDAtOWZiZS1kYjY1ZjNmNDZiMjIiLCJuYW1lIjoicGlvdHJ1bEBwaW90ci5wbCIsImVtYWlscyI6WyJwaW90cnVsQHBpb3RyLnBsIl0sInRmcCI6IkIyQ18xX3JvcGMiLCJzY3AiOiJ2aWRlb3MucmVhZCB2aWRlb3MudXBsb2FkIHVzZXJzLnJlYWQgdXNlcnMud3JpdGUiLCJhenAiOiJlYjRiOWQ2Ni0xYzAyLTRlMTctOTNmNS0xOGY3YjU4ZGI1MTkiLCJ2ZXIiOiIxLjAiLCJpYXQiOjE2ODIwMTgyNDEsImF1ZCI6ImNmZWQ1OTM0LTM3ZDUtNDQxNS04NmI2LTQ1YzA0ZWQzYWE2YSIsImV4cCI6MTY4MjAyMTg0MSwiaXNzIjoiaHR0cHM6Ly92aWRlb3NlcnZpY2Vpby5iMmNsb2dpbi5jb20vMDU1NDdlZjctNWY5ZC00NDc0LWFlNTAtZDFkYjk1ZGJmMzQ2L3YyLjAvIiwibmJmIjoxNjgyMDE4MjQxfQ.iwJzJBL2JJyRDGgyKRKgBAgT3AwcVbdOfPFKVyhMe5m9XFl3NXINiDjJ859ObU9pAU8LCr3lCB3E5a8ajv-XHP52pQhkkea8ST7BaMUg4_2qDqvmeHBEUWXI5XImnEtTNwU-5Ru6zbKhmXOszKRSizMoTHsdtROVyLvNgnwgCeKyBXFlLkq4KbEC2xKo3yPtpkhNE9Q4XpxWYPasHfszW600T-9ZRJc4OkPwd9j_A0vMmP2UCmmNk2m5pap6Y7sbCXRxRz1v54TdUsmPOImyaeqvaACu6o72FIJ269CIGaOJQ-V1TLDUr_rpW5JZGbkxxZl5cJdAQVh3ky8OZNbk_w"
//     type="video/mp4"/>
// </video>