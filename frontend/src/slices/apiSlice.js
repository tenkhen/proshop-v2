import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants';

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

export const apiSlice = createApi({
  baseQuery,
  // types of data fetching from server
  tagTypes: ['Product', 'Order', 'User'],
  endpoints: builder => ({}),
});
