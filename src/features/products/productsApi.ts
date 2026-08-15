import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Product, ProductsResponse } from '../../types';
import { PRODUCT_SUMMARY_FIELDS } from '../../types';

const SELECT = PRODUCT_SUMMARY_FIELDS.join(',');

interface ProductsArgs {
  limit?: number;
  skip?: number;
}

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
  // The catalogue is static; hold pages for 5 minutes instead of the 60s default.
  keepUnusedDataFor: 300,
  // Recover automatically if the first load happened while offline.
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    /**
     * Paged product list. Successive pages are appended to a single cache entry
     * so "load more" fetches only the next slice rather than re-requesting
     * everything from the start.
     */
    getProducts: builder.query<ProductsResponse, ProductsArgs>({
      query: ({ limit = 10, skip = 0 } = {}) =>
        `products?limit=${limit}&skip=${skip}&select=${SELECT}`,

      // Collapse every page into one cache entry keyed by the endpoint alone.
      serializeQueryArgs: ({ endpointName }) => endpointName,

      merge: (cache, incoming, { arg }) => {
        // skip=0 is a fresh start (initial load or refetch), so replace.
        if (!arg.skip) return incoming;

        // Guard against double-invocation (StrictMode) appending a page twice.
        const seen = new Set(cache.products.map((product) => product.id));
        cache.products.push(...incoming.products.filter((p) => !seen.has(p.id)));
        cache.total = incoming.total;
        cache.skip = incoming.skip;
        cache.limit = incoming.limit;
      },

      // Without this the collapsed cache key would suppress the next page.
      forceRefetch: ({ currentArg, previousArg }) => currentArg?.skip !== previousArg?.skip,
    }),

    /** Single product, returning every field rather than the list subset. */
    getProductById: builder.query<Product, number>({
      query: (id) => `products/${id}`,
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productsApi;
