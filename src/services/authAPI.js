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
        query: ({ id }) => ({
          url: `/api/user/${id}`,
          method: 'PATCH',
          body: { data:"Asdasd" },
        }),
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
export const { useGetUserByIdQuery, useDeleteUserMutation } = authAPI;