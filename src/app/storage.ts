import type { CartState } from '../types';
import type { WishlistState } from '../features/wishlist/wishlistSlice';

const STORAGE_KEY = 'bandage.state.v1';

interface PersistedState {
  cart: CartState;
  wishlist: WishlistState;
}

/**
 * The cart and wishlist are read back on start-up so a refresh does not empty
 * the basket. localStorage throws in some private-browsing modes, so every
 * access is guarded and simply falls back to a fresh store.
 */
export function loadState(): Partial<PersistedState> | undefined {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return undefined;

    const parsed = JSON.parse(raw) as Partial<PersistedState>;
    // Reject anything that is not the shape we wrote, rather than letting a
    // stale or hand-edited value crash the reducers.
    if (!Array.isArray(parsed.cart?.items) || !Array.isArray(parsed.wishlist?.ids)) {
      return undefined;
    }

    return {
      // lastAdded drives a transient toast; it should not survive a reload.
      cart: { items: parsed.cart.items, lastAdded: null },
      wishlist: { ids: parsed.wishlist.ids },
    };
  } catch {
    return undefined;
  }
}

export function saveState(state: PersistedState): void {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        cart: { items: state.cart.items, lastAdded: null },
        wishlist: { ids: state.wishlist.ids },
      })
    );
  } catch {
    // Storage full or unavailable — the app still works, just without recall.
  }
}
