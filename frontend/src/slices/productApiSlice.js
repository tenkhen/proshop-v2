// import { PRODUCTS_URL } from '../constants'; // we hard-code until we fixed the .env issue
import { apiSlice } from './apiSlice';

// we are injecting individual endpoints instead adding all endpoints in apiSlice.js
export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getProducts: builder.query({
      query: () => ({
        url: '/api/products',
      }),
      // keep query in cache for reuse. In seconds
      keepUnusedDataFor: 5,
    }),
    getProductDetails: builder.query({
      query: productId => ({
        url: `/api/products/${productId}`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

// export getProducts with this convention. 'use' in front and 'Query' at the end
export const { useGetProductsQuery, useGetProductDetailsQuery } =
  productsApiSlice;
