# SLICES GUIDE - A collection of reducers and actions that related to each 

## Create folder called slices in src (frontend) create slice file (e.g. apiSlice.js)

### Add following code in it
```js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery();

<!-- here we use createApi in order to deal with asynchronous request for endpoints -->
export const apiSlice = createApi({
  baseQuery,
  <!-- types of data that we fetch from server -->
  tagTypes: ['Product', 'Order', 'User'],
  <!-- we leave it empty object as we will create endpoint individually and inject  -->
  endpoints: builder => ({}),
});
```

---

## Add this slice in store.js. Check redux.md - store

---

## Inject endpoints to above apiSlice (parent) which we left empty object

### Create endpoint file (e.g. productsApiSlice.js) in slices folder and inject endpoints as follows

#### All API slices are dealing with the server
```js
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
  }),
});

// export getProducts with this convention. 'use' in front and 'Query' at the end
export const { useGetProductsQuery } = productsApiSlice;

```

### For single product add following right after getProducts as follows and export as convention
```js
getSingleProduct: builder.query({
  query: (productId) => ({
    url: `/api/products/${productId}`,
  }),
  keepUnusedDataFor: 5,
}),
```

## usersApiSlice
```js
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
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: 'POST',
      }),
    }),
  }),
});

// export login with this convention. 'use' in front and 'mutation' at the end as it's mutation
export const { useLoginMutation, useLogoutMutation } = usersApiSlice;

```

---

## Using slices - Use in e.g. HomeScreen.jsx as follows

### DON'T FORGET TO ADD THIS LINE OF CODE WHEN USE IT BECAUSE FETCHING TAKES TIME
```js
if(!products) return;
```

```js
import { Row, Col } from 'react-bootstrap';
import Product from '../ui/Product';

// import
import { useGetProductsQuery } from '../slices/productApiSlice';

const HomePage = () => {
  // destructure
  const { data: products, isLoading, error } = useGetProductsQuery();

  if(!product) return;

  return (
    <>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <div>{error?.data?.message || error?.error}</div>
      ) : (
        <>
          <h1>Latest Products</h1>
          <Row>
            {products.map(product => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default HomePage;
```

## Creating cartSlice.js for adding and removing items from the cart
```js
import { createSlice } from '@reduxjs/toolkit';
// utility - here just update cart with prices etc
import { updateCart } from '../utils/cartUtils';

// check if there is cart in localStorage. If yes return it or return cartItems which is empty array
const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : { cartItems: [] };

// here we use createSlice instead createApi, because here we don't need async/await etc
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // state is current value and action is the value it receives
    addToCart: (state, action) => {
      // in ProductPage.jsx we dispatch the payload by using redux useDispatch
      const item = action.payload;

      const existItem = state.cartItems.find(x => x._id === item._id);

      if (existItem) {
        state.cartItems = state.cartItems.map(x =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      return updateCart(state);
    },
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;

```

### Authentication slice
#### This is for local (frontend)
```js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      // we are setting two things, state and localStorage
      // state is from redux which can be accessed globally
      state.userInfo = action.payload;
      // this is dealing with localStorage
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
      console.log(state);
    },
    logout: state => {
      // for logging out, we need to first set userInfo in state to null and then remove userInfo from localStorage
      state.userInfo = null;
      localStorage.removeItem('userInfo');
    },
  },
});

export const { setCredentials } = authSlice.actions;

export default authSlice.reducer;
```