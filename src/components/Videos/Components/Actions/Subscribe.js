import React, { useEffect } from 'react';
import { Button, HStack, Text, Tooltip } from '@chakra-ui/react';
import { BellIcon } from '@chakra-ui/icons';
import {
  useAddSubscriptionMutation, useDeleteSubscriptionMutation,
  useGetSubscriptionsQuery,
  useGetUserByIdQuery,
} from '../../../../services/authAPI';
import { useSelector } from 'react-redux';


const Subscribe = ({authorNickname, authorId}) => {
  const [isSubscribed, setIsSubscribed] = React.useState(false);
  const { token } = useSelector((state) => state.auth);
  const {data, isLoading: isUserLoading} = useGetUserByIdQuery(token);
  const {data: subscriptions, isLoading: isLoadingSubs} = useGetSubscriptionsQuery( !isUserLoading && data.id);
  const [addSubscription, {isLoading :isLoadingAddSub}]  =  useAddSubscriptionMutation();
  const [deleteSubscription, {isLoading: isLoadingDelSub}]  =  useDeleteSubscriptionMutation();

  useEffect(() => {
    if(!isLoadingSubs && subscriptions) {
      subscriptions.subscriptions.map((sub) => {
        if(sub.id === authorId) {
          setIsSubscribed(true);
        }
      })
    }
  }, [isLoadingSubs, isLoadingAddSub, isLoadingDelSub]);


  const handleSubscribeButton = () => {
    if(!isSubscribed) {
      addSubscription(authorId)
        .then((res) => {
          setIsSubscribed(true);
        })
        .catch(() => {
        });
    } else {
      deleteSubscription(authorId)
        .then((res) => {
          setIsSubscribed(false);
        })
        .catch(() => {
        });
    }
  }

  return (
    <Tooltip label={ isSubscribed ? `Unsubscribe` : `Subscribe`} aria-label='A tooltip'>
      <Button colorScheme='red' borderRadius={15} hoover={'Subscribe'}
      onClick={handleSubscribeButton}>
        <HStack>
          <Text>{authorNickname}</Text>
          <BellIcon/>
        </HStack>
      </Button>
    </Tooltip>
  );
}

export default Subscribe;