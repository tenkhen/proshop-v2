import { createSlice } from '@reduxjs/toolkit';
import { formatCurrency } from '../utils/helpers';

// check if there is cart in localStorage. If yes return it or return cartItems which is empty array
const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : { cartItems: [] };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      const existItem = state.cartItems.find(x => x._id === item._id);

      if (existItem) {
        state.cartItems = state.cartItems.map(x =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      // Calculate items price
      state.itemsPrice = Number(
        formatCurrency(
          state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
        )
      );

      // Calculate shipping price (free for order $100, else $10 shipping price)
      state.shippingPrice = Number(
        formatCurrency(state.itemsPrice > 100 ? 0 : 10)
      );

      // Calculate tax price (15% tax)
      state.taxPrice = Number(formatCurrency(state.itemsPrice * 0.15));

      // Calculate total price
      state.totalPrice = Number(
        formatCurrency(state.itemsPrice + state.shippingPrice + state.taxPrice)
      );

      // save to localStorage
      localStorage.setItem('cart', JSON.stringify(state));
    },
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
