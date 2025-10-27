import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import getBaseUrl from '../../utils/getBaseUrl'

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
    tagTypes: [''],
    endpoints: (builder) => ({
        fetchAllFighter: builder.query({
            query: () => '/fighters',
            providesTags: ['Match'],
        }),
        addFighter: builder.mutation({
            query: (newFighter) => ({
                url: '/register',
                method: 'POST',
                body: newFighter,
            }),
            invalidatesTags: ['Match'],
        }),
        // updateFighterInfo: builder.mutation({
        //     query: ({ id, ...rest }) => ({
        //         url: `/edit/${id}`,
        //         method: 'PUT',
        //         body: rest,
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //     }),
        //     invalidatesTags: ['Match'],
        // }),
        deleteFighter: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Match'],
        }),

    })
});

export const {
    useFetchAllFighterQuery,
    useAddFighterMutation,
    useDeleteFighterMutation,
} = fighterAPI;
export default fighterAPI;