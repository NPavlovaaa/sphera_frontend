import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';


export const apiSlice = createApi({
    reducerPath: '',
    baseQuery: fetchBaseQuery({baseUrl: 'http://127.0.0.1:8000'}),
    tagTypes: ['Users', 'Clients', 'Products'],
    endpoints: builder => ({
        registration: builder.mutation({
            query: client => ({
                url: '/registration/',
                method: 'POST',
                body: client
            }),
            invalidatesTags: ['Users', 'Clients']
        }),
        getUsers: builder.query({
            query: () => '/users/',
            providesTags: ['Users']
        }),
        getProducts: builder.query({
            query: () => '/products/',
            providesTags: ['Products']
        }),
        getRoastingMethods: builder.query({
            query: () => '/roasting/',
            providesTags: ['Products']
        }),
        getProcessingMethods: builder.query({
            query: () => '/processing/',
            providesTags: ['Products']
        }),
        getWeights: builder.query({
            query: () => '/weight/',
            providesTags: ['Products']
        }),
        getWeightSelection: builder.query({
            query: () => '/weight_selection/',
            providesTags: ['Products']
        }),
        getVariety: builder.query({
            query: () => '/variety/',
            providesTags: ['Products']
        }),
        getProductsItem: builder.query({
            query: (id) => `products/${id}/`,
            providesTags: ['Products']
        }),
        getWeightSelectionItem: builder.query({
            query: (id) => `/weight_selection/${id}/`,
            providesTags: ['Products']
        }),
    })
})

export const {  useGetUsersQuery,
                useRegistrationMutation,
                useGetProductsQuery,
                useGetRoastingMethodsQuery,
                useGetProcessingMethodsQuery,
                useGetWeightsQuery,
                useGetWeightSelectionQuery,
                useGetVarietyQuery,
                useGetProductsItemQuery,
                useGetWeightSelectionItemQuery,
} = apiSlice;