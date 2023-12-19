import { formatCurrency } from '../utils/helpers';

export const updateCart = state => {
  // Calculate items price
  state.itemsPrice = Number(
    formatCurrency(
      state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    )
  );

  // Calculate shipping price (free for order $100, else $10 shipping price)
  state.shippingPrice = Number(formatCurrency(state.itemsPrice > 100 ? 0 : 10));

  // Calculate tax price (15% tax)
  state.taxPrice = Number(formatCurrency(state.itemsPrice * 0.15));

  // Calculate total price
  state.totalPrice = Number(
    formatCurrency(state.itemsPrice + state.shippingPrice + state.taxPrice)
  );

  // save to localStorage
  localStorage.setItem('cart', JSON.stringify(state));

  return state;
};
