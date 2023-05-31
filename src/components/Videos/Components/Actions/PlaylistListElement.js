import React, { useEffect, useState } from 'react';
import { Checkbox, Spinner } from '@chakra-ui/react';
import { useParams } from 'react-router';
import {
  useAddVideoToPlaylistMutation,
  useGetVideosInPlaylistQuery,
  useRemoveVideoFromPlaylistMutation,
} from '../../../../services/authAPI';

const PlaylistListElement = ({playlist}) => {

  const [isVideoInPlaylist, setIsVideoInPlaylist] = useState(false);
  const { id:videoId } = useParams();

  const {data: videosInPlaylist, isLoading: videosInPlaylistLoading, isSuccess, refetch} = useGetVideosInPlaylistQuery(playlist.id);
  const [addVideoToPlaylist, {isLoading: isAddingVideoToPlaylist}] = useAddVideoToPlaylistMutation();
  const [removeVideoFromPlaylist, {isLoading: isRemovingVideoFromPlaylist}] = useRemoveVideoFromPlaylistMutation();

  const handleChangeInPlaylist = () => {

    if(isVideoInPlaylist) {
      removeVideoFromPlaylist({playlistId: playlist.id, videoId: videoId})
        .then(()=>{
          refetch();
        })
        .catch(()=>{});

    } else {
      addVideoToPlaylist({playlistId: playlist.id, videoId: videoId})
        .then(()=>{
          refetch();
        })
        .catch(()=>{});
    }

  };


  useEffect(() => {
      setIsVideoInPlaylist(videosInPlaylist?.videos?.some((video) => video.id === videoId))
  }, [videosInPlaylist, videosInPlaylistLoading, isSuccess]);


  return (
    <Checkbox size='md' key={playlist.id} colorScheme='pink' onChange={handleChangeInPlaylist} isChecked={isVideoInPlaylist}>
      {playlist.name} {(isAddingVideoToPlaylist || isRemovingVideoFromPlaylist) && <Spinner size={'xs'}/>}
    </Checkbox>
  )
}

export default PlaylistListElement;