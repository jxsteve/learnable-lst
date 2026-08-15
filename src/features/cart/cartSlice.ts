import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CartState, ProductSummary } from '../../types';

const initialState: CartState = {
  items: [],
  lastAdded: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<ProductSummary>) {
      const existing = state.items.find((i) => i.product.id === action.payload.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ product: action.payload, quantity: 1 });
      }
      state.lastAdded = action.payload;
    },
    dismissAddedNotification(state) {
      state.lastAdded = null;
    },
    removeFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter((i) => i.product.id !== action.payload);
    },
    incrementQuantity(state, action: PayloadAction<number>) {
      const item = state.items.find((i) => i.product.id === action.payload);
      if (item) item.quantity += 1;
    },
    decrementQuantity(state, action: PayloadAction<number>) {
      const item = state.items.find((i) => i.product.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.items = state.items.filter((i) => i.product.id !== action.payload);
      }
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
  dismissAddedNotification,
} = cartSlice.actions;

export default cartSlice.reducer;
