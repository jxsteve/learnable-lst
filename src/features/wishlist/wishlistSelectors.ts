import type { RootState } from '../../app/store';

export const selectWishlistCount = (state: RootState) => state.wishlist.ids.length;

/** Whether a given product is liked. */
export const selectIsWishlisted = (state: RootState, productId: number) =>
  state.wishlist.ids.includes(productId);
