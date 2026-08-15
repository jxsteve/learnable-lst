import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

const selectCartItems = (state: RootState) => state.cart.items;

/** Total units in the basket, counting quantities rather than line items. */
export const selectCartCount = createSelector([selectCartItems], (items) =>
  items.reduce((sum, item) => sum + item.quantity, 0)
);
