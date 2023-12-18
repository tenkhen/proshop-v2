import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery();

// here we use createApi in order to deal with asynchronous request for endpoints
export const apiSlice = createApi({
  baseQuery,
  // types of data fetching from server
  tagTypes: ['Product', 'Order', 'User'],
  endpoints: () => ({}),
});
