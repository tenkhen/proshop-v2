# REDUX GUITE - A state management

#### There are two level of states, component level (e.g. useState) and app level which is global

## Install React-Redux and Redux ToolKit (RTK) in FRONTEND FOLDER
`npm i @reduxjs/toolkit react-redux`

---

## Set up Redux Store

### Create a file called store.js in src folder and add following codes

#### We add slice here - check slices.md
```
import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './slices/apiSlice';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  // Add devtools
  devTools: true,
});

export default store;
```

### Import Provider in main.jsx wrap the router as follows
```
import { Provider } from 'react-redux';
import store from './store.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
```

---

## Usage - Check slices.md

---

## React useSelector function usage
```
// we can access state.cart globally, because we defined it in store.js
const { cartItems } = useSelector(state => state.cart);
```