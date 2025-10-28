import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import getBaseUrl from '../../utils/getBaseUrl';
import matchAPI from './matchAPI';
const baseQuery = fetchBaseQuery({
  baseUrl: `${getBaseUrl()}/api/fighters`,
  credentials: 'include',
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('token');
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const fighterAPI = createApi({
  reducerPath: 'fighterAPI',
  baseQuery,
  tagTypes: ['Fighter'],
  endpoints: (builder) => ({
    fetchAllFighter: builder.query({
      query: () => '/',
      providesTags: ['Fighter'],
    }),
    addFighter: builder.mutation({
      query: (newFighter) => ({
        url: '/register', 
        method: 'POST',
        body: newFighter,
      }),
      invalidatesTags: ['Fighter'],
    }),
    updateFighter: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/${id}`,
        method: 'PUT',
        body: rest,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: ['Fighter'],
      async onQueryStarted({ id, ...rest }, { dispatch, queryFulfilled }) {
        try {
          const { data: updatedFighter } = await queryFulfilled;

          dispatch(
            matchAPI.util.updateQueryData('fetchAllMatches', undefined, draft => {
              draft.forEach(match => {
                match.fighters = match.fighters.map(f => 
                  f._id === id ? { ...f, ...updatedFighter } : f
                );
              });
            })
          );
        } catch (err) {
          console.error('Cập nhật cache match thất bại', err);
        }
      }
    }),

  deleteFighter: builder.mutation({
    query: (id) => ({
      url: `/${id}`,
      method: 'DELETE',
    }),
    invalidatesTags: ['Fighter'],
    async onQueryStarted(id, { dispatch, queryFulfilled }) {
      try {
        await queryFulfilled;
        dispatch(
          matchAPI.util.updateQueryData('fetchAllMatches', undefined, draft => {
            draft.forEach(match => {
              match.fighters = match.fighters.filter(f => f._id !== id);
            });
          })
        );
      } catch (err) {
        console.error('Cập nhật cache match thất bại', err);
      }
    }
  }),

  }),
});

export const {
  useFetchAllFighterQuery,
  useAddFighterMutation,
  useUpdateFighterMutation,
  useDeleteFighterMutation,
} = fighterAPI;

export default fighterAPI;
