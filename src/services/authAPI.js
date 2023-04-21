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

    }),
  })

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetUserByIdQuery, useDeleteUserMutation, useUpdateUserMutation, useGetUserVideosQuery } = authAPI;