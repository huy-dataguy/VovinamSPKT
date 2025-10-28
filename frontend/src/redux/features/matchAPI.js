import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import getBaseUrl from '../../utils/getBaseUrl';

const baseQuery = fetchBaseQuery({
  baseUrl: `${getBaseUrl()}/api/matches`,
  credentials: 'include',
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('token');
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const matchAPI = createApi({
  reducerPath: 'matchAPI',
  baseQuery,
  tagTypes: ['Match'],
  endpoints: (builder) => ({
    fetchAllMatches: builder.query({
      query: () => '',
      providesTags: ['Match'],
    }),
    addMatch: builder.mutation({
      query: (newMatch) => ({
        url: '/create',
        method: 'POST',
        body: newMatch,
      }),
      invalidatesTags: ['Match'],
    }),
    deleteMatch: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Match'],
    }),
  }),
});

export const {
  useFetchAllMatchesQuery,
  useAddMatchMutation,
  useDeleteMatchMutation,
} = matchAPI;

export default matchAPI;
