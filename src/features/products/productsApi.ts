import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Product, ProductsResponse } from '../../types';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
  endpoints: (builder) => ({
    getProducts: builder.query<ProductsResponse, { limit?: number; skip?: number }>({
      query: ({ limit = 8, skip = 0 } = {}) =>
        `products?limit=${limit}&skip=${skip}`,
    }),
    getProductById: builder.query<Product, number>({
      query: (id) => `products/${id}`,
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productsApi;
