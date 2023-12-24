import { USERS_URL } from '../constants';
import { apiSlice } from './apiSlice';

// we are injecting individual endpoints instead adding all endpoints in apiSlice.js
export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    // as we are using post request to server, we use mutation. For get, we can use query
    login: builder.mutation({
      // we sent data (email and password)
      query: data => ({
        url: `${USERS_URL}/auth`,
        method: 'POST',
        body: data,
      }),
    }),
    register: builder.mutation({
      query: data => ({
        url: `${USERS_URL}`,
        method: 'POST',
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: 'POST',
      }),
    }),
    profile: builder.mutation({
      query: data => ({
        url: `${USERS_URL}/profile`,
        method: 'PUT',
        body: data,
      }),
    }),
  }),
});

// export login with this convention. 'use' in front and 'mutation' at the end as it's mutation
export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useProfileMutation,
} = usersApiSlice;
