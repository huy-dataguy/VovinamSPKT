import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import getBaseUrl from '../../utils/getBaseUrl';

const baseQuery = fetchBaseQuery({
  baseUrl: `${getBaseUrl()}/api/tournaments`,
  credentials: 'include',
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('token');
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const tournamentAPI = createApi({
  reducerPath: 'tournamentAPI',
  baseQuery,
  tagTypes: ['Tournament'],
  endpoints: (builder) => ({
    fetchAllTournaments: builder.query({
      query: () => '',
      providesTags: ['Tournament'],
    }),
    addTournament: builder.mutation({
      query: (newTournament) => ({
        url: '',
        method: 'POST',
        body: newTournament,
      }),
      invalidatesTags: ['Tournament'],
    }),
    deleteTournament: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Tournament'],
    }),
  }),
});

export const {
  useFetchAllTournamentsQuery,
  useAddTournamentMutation,
  useDeleteTournamentMutation,
} = tournamentAPI;

export default tournamentAPI;
