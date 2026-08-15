import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import { getSalePrice } from '../../utils/format';

const selectCartItems = (state: RootState) => state.cart.items;

export const selectCartIsOpen = (state: RootState) => state.cart.isOpen;

/** Total units in the basket, counting quantities rather than line items. */
export const selectCartCount = createSelector([selectCartItems], (items) =>
  items.reduce((sum, item) => sum + item.quantity, 0)
);

/** Sum of discounted unit prices times quantity. */
export const selectCartSubtotal = createSelector([selectCartItems], (items) =>
  items.reduce((sum, item) => sum + getSalePrice(item.product) * item.quantity, 0)
);

/** What the basket would have cost at list price, for showing savings. */
export const selectCartSavings = createSelector([selectCartItems], (items) =>
  items.reduce(
    (sum, item) => sum + (item.product.price - getSalePrice(item.product)) * item.quantity,
    0
  )
);

export { selectCartItems };
