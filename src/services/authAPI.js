import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {API_URL} from './auth.service';
// Define a service using a base URL and expected endpoints

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token.token;

    // If we have a token set in state, let's assume that we should be passing it.
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }

    return headers
  },
})

export const authAPI = createApi({
    reducerPath: 'authAPI',
    baseQuery: baseQuery,
    endpoints: (builder) => ({
      getUserById: builder.query({
        query: (id) => `/api/user`,
      }),
      updateUser: builder.mutation({
        query: ({ id, nickname, name, surname, userType, avatarImage }) => ({
          url: `/api/user/`,
          method: 'PUT',
          params: { id },
          body: {
            "nickname": nickname,
            "name": name,
            "surname": surname,
            "userType": userType,
            "avatarImage": avatarImage
          }
        }),
      }),

      getUserVideos: builder.query({
        query: (id ) => `/api/user/videos?id=${id}`,
      }),
      deleteUser: builder.mutation({
        query(id) {
          return {
            url: `/api/user`,
            method: 'DELETE',
            params: { id },
          }
        },
      }),
      addVideoMetadata: builder.mutation({
        query(data) {
          return {
            url: `/api/video-metadata`,
            method: 'POST',
            body: {
              "title": data.title,
              "description": data.description,
              "thumbnail": data.thumbnail,
              "tags": data.tags,
              "visibility": data.visibility
            },
          }
        },
      }),
      getVideoMetadata: builder.query({
        query: (id ) => `/api/video-metadata?id=${id}`,
      }),

      addVideoFile: builder.mutation({
        query(data) {
          const formData = new FormData();
          formData.append('videoFile', data.file);
          return {
            url: `/api/video/${data.id}`,
            method: 'POST',
            body: formData,
            formData: true,
            headers: {
              "Content-Type": undefined,
            },
          }
        },
      }),

      deleteVideo: builder.mutation({
        query(videoId) {
          return {
            url: `/api/video?id=${videoId}`,
            method: 'DELETE',
          }
        },
      }),

      // SUBSCRIPTIONS
      getSubscriptions:builder.query({
        query: (id ) => `/api/subscriptions?id=${id}`,
      }),
      addSubscription: builder.mutation({
        query(id) {
          return {
            url: `/api/subscriptions?creatorId=${id}`,
            method: 'POST'
          }
        },
      }),
      deleteSubscription: builder.mutation({
        query(subscriptionId) {
          return {
            url: `/api/subscriptions?subId=${subscriptionId}`,
            method: 'DELETE',
          }
        },
      }),

      //PLAYLISTS
      getUserPlaylists:builder.query({
        query: (id ) => `/api/playlist/user?id=${id}`,
      }),

      getPlaylists:builder.query({
        query: (id ) => `/api/playlist/user?id=${id}`,
      }),

      getVideosInPlaylist: builder.query({
          query: (id ) => `/api/playlist/video?id=${id}`,
        }),

      addPlaylist: builder.mutation({
        query({name, visibility}) {
          return {
            url: `/api/playlist/details`,
            method: 'POST',
            body:{
              name: name,
              visibility: visibility
            }
          }
        },
      }),

      addVideoToPlaylist: builder.mutation({
        query({playlistId, videoId}) {
          return {
            url: `/api/playlist/${playlistId}/${videoId}`,
            method: 'POST'
          }
        },
      }),

      removeVideoFromPlaylist: builder.mutation({
        query({playlistId, videoId}) {
          return {
            url: `/api/playlist/${playlistId}/${videoId}`,
            method: 'DELETE',
          }
        },
      }),

      // COMMENTS
      getAllCommentsOfVideo:builder.query({
        query: (videoId ) => `/api/comment?id=${videoId}`,
      }),
      removeComment: builder.mutation({
        query(commentId) {
          return {
            url: `/api/comment?id=${commentId}`,
            method: 'DELETE',
          }
        },
      }),
      addCommentToVideo: builder.mutation({
        query(data) {
          return {
            url: `/api/comment?id=${data.videoId}`,
            method: 'POST',
            body: data.comment
          }
        },
      }),
      getResponseOnComment:builder.query({
        query: (commentId ) => `/api/comment/response?id=${commentId}`,
      }),
      addResponseToComment: builder.mutation({
          query(data) {
            return {
              url: `/api/comment/response?id=${data.commentId}`,
              method: 'POST',
              body: data.response
            }
          },
        }),

      // REACTIONS

      getVideoReactions:builder.query({
        query: (videoId ) => `/api/video-reaction?id=${videoId}`,
      }),
      addReactionToVideo: builder.mutation({
        query(data) {
          return {
            url: `/api/video-reaction?id=${data.videoId}`,
            method: 'POST',
            body: {
              value: data.value // Positive or Negative
            }
          }
        },
      }),





    }),
  })

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {

  //user
  useGetUserByIdQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useGetUserVideosQuery,

  //video
  useAddVideoMetadataMutation,
  useAddVideoFileMutation,
  useGetVideoMetadataQuery,
  useDeleteVideoMutation,

  //subscriptions
  useGetSubscriptionsQuery,
  useAddSubscriptionMutation,
  useDeleteSubscriptionMutation,

  //playlists
  useGetUserPlaylistsQuery,
  useAddPlaylistMutation,
  useGetVideosInPlaylistQuery,
  useAddVideoToPlaylistMutation,
  useRemoveVideoFromPlaylistMutation,

  //comments
  useGetAllCommentsOfVideoQuery,
  useRemoveCommentMutation,
  useAddCommentToVideoMutation,
  useGetResponseOnCommentQuery,
  useAddResponseToCommentMutation,

  //reactions
  useGetVideoReactionsQuery,
  useAddReactionToVideoMutation
} = authAPI;