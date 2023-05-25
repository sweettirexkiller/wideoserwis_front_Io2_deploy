import React, { useEffect, useState } from 'react';
import { Button, HStack, Spinner } from '@chakra-ui/react';
import { Icon } from '@chakra-ui/icons';
import { FaRegThumbsDown, FaRegThumbsUp } from 'react-icons/all';
import {
  useAddReactionToVideoMutation,
  useGetVideoReactionsQuery,
} from '../../../../services/authAPI';


const LikeOrDis = ({videoId}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [addReactionToVideo, {isLoading :isLoadingReactToVideo, isSuccess:isAddingReactionSuccess}]  =  useAddReactionToVideoMutation()
  const {data, error, isLoading, isSuccess, refetch} = useGetVideoReactionsQuery(videoId);

  console.log(data);
  console.log(isLiked);


  useEffect(() => {
    if(isAddingReactionSuccess && !isLoadingReactToVideo) {
      refetch();
    }
    if(isSuccess && !isLoading){
        setIsLiked(data.currentUserReaction === "Positive");
    }
  }, [isLoading, isSuccess, isAddingReactionSuccess, isLoadingReactToVideo]);

  const handleReactionClick = () => {
    addReactionToVideo({videoId, value: !isLiked ? "Positive" : "Negative"})
      .then((res) => {
        setIsLiked(!isLiked);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <HStack>
      <Button
        colorScheme={isLiked ? 'red' :'green'}
        width={100}
        height={8}
        borderRadius={15}
        aria-label='Like'
        size='l'
        justifyContent={'space-around'}
        onClick={handleReactionClick}
      > {isLiked ? "Dislike" : "Like"}
        {isLoadingReactToVideo && <Spinner size={'xs'}/>}
        <Icon marignLeft={5} as={ isLiked ? FaRegThumbsDown :FaRegThumbsUp}/>
      </Button>

      {isLoading ? <Spinner size={'xs'}/> : data && <div>{data.positiveCount} <Icon as={FaRegThumbsUp}/>  {data.negativeCount} <Icon as={FaRegThumbsDown}/></div>}

    </HStack>
  );
}

export default LikeOrDis;