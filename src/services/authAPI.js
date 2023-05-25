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


    }),
  })

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetUserByIdQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useGetUserVideosQuery,
  useAddVideoMetadataMutation,
  useAddVideoFileMutation,
  useGetVideoMetadataQuery,
  useGetSubscriptionsQuery,
  useAddSubscriptionMutation,
  useDeleteSubscriptionMutation,
} = authAPI;