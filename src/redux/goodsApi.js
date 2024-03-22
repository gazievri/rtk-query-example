import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const goodsApi = createApi({
    // Как будет отображаться в общем store
    reducerPath: 'goodsApi',
    tagTypes: ['Products'],
    // Базовый запрос
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3001/'}),
    // Эндпоинты разные
    endpoints: (build) => ({
        getGoods: build.query({
            // Дополнение к базовому запросу с указанием конкретного эндпоинта
            query: (limit = '') => `goods?${limit && `_limit=${limit}`}`,
            providesTags: (result) =>
            result
              ? [
                  ...result.map(({ id }) => ({ type: 'Products', id })),
                  { type: 'Products', id: 'LIST' },
                ]
              : [{ type: 'Products', id: 'LIST' }],
        }),
        addProduct: build.mutation({
            query: (body) => ({
                url: 'goods',
                method: 'POST',
                body
            }),
            invalidatesTags: [{type: 'Products', id: 'LIST'}]
        }),
        deleteProduct: build.mutation({
            query: (id) => ({
                url: `goods/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [{type: 'Products', id: 'LIST'}]
        })
    })
})

export const {useGetGoodsQuery, useAddProductMutation, useDeleteProductMutation} = goodsApi