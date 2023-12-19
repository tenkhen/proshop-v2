import { PRODUCTS_URL } from '../constants';
import { apiSlice } from './apiSlice';

// we are injecting individual endpoints instead adding all endpoints in apiSlice.js
export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getProducts: builder.query({
      query: () => ({
        url: `${PRODUCTS_URL}`,
      }),
      // keep query in cache for reuse. In seconds
      keepUnusedDataFor: 5,
    }),
    getProductDetails: builder.query({
      query: productId => ({
        url: `${PRODUCTS_URL}/${productId}`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

// export getProducts with this convention. 'use' in front and 'Query' at the end
export const { useGetProductsQuery, useGetProductDetailsQuery } =
  productsApiSlice;
