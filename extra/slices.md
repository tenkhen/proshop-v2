# SLICES GUIDE - A collection of reducers and actions that related to each 

## Create folder called slices in src (frontend) create slice file (e.g. apiSlice.js)

### Add following code in it
```
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants';

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

export const apiSlice = createApi({
  baseQuery,
  // types of data fetching from server
  tagTypes: ['Product', 'Order', 'User'],
  endpoints: builder => ({}),
});
```

---

## Add this slice in store.js. Check redux.md - store