import React from 'react';
import { Avatar, Box, HStack, Text, VStack } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { useGetUserByIdQuery } from '../../services/authAPI';

const ProfileAvatarTop = () => {
  const { token } = useSelector((state) => state.auth);
  const {data, error, isLoading} = useGetUserByIdQuery(token);
  return (
    <HStack
      display={'flex'}
      justifyContent={'flex-start'}
      width={'calc(95vw)'}
      margin={3}
      spacing={5}
    >
      <Box>
        <Avatar size='lg' src={data && data.avatarImage} />
      </Box>
      <Box id={'profileDataDiv'}>
        <VStack display={'flex'} flexDirection={'column'} justifyContent={'flex-start'} alignItems={'flex-start'}>
          <Text fontSize='2xl' as='b' id={'profilePageDataNickname'}>{data && data.nickName}</Text>
          <Text as='i' id={'profilePageDataSurname'}>{data && data.name} {data && data.surname}</Text>
          <Text as='kbd' id={'profilePageDataEmail'}>{data && data.email}</Text>
        </VStack>
      </Box>
    </HStack>
  );
}

export default ProfileAvatarTop;