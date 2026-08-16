import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { productsApi } from '../features/products/productsApi';
import cartReducer from '../features/cart/cartSlice';
import wishlistReducer from '../features/wishlist/wishlistSlice';
import { loadState, saveState } from './storage';

// Combined up front so RootState can be derived before the store exists, which
// is what lets preloadedState type-check against the real shape.
const rootReducer = combineReducers({
  [productsApi.reducerPath]: productsApi.reducer,
  cart: cartReducer,
  wishlist: wishlistReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer,
  // Only the cart and wishlist are restored; cached API data is left to RTK
  // Query, which should refetch rather than serve a stale catalogue.
  preloadedState: loadState(),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productsApi.middleware),
});

// Enables refetchOnReconnect/refetchOnFocus behaviour; without this the flags
// on the API definition are inert.
setupListeners(store.dispatch);

// Persist the shopper's basket, but only when it actually changes.
let lastCart = store.getState().cart.items;
let lastWishlist = store.getState().wishlist.ids;

store.subscribe(() => {
  const { cart, wishlist } = store.getState();
  if (cart.items === lastCart && wishlist.ids === lastWishlist) return;
  lastCart = cart.items;
  lastWishlist = wishlist.ids;
  saveState({ cart, wishlist });
});

export type AppDispatch = typeof store.dispatch;
