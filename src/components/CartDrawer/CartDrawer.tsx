import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  closeCart,
  clearCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} from '../../features/cart/cartSlice';
import {
  selectCartItems,
  selectCartIsOpen,
  selectCartCount,
  selectCartSubtotal,
  selectCartSavings,
} from '../../features/cart/cartSelectors';
import { formatPrice, getSalePrice } from '../../utils/format';
import closeIcon from '../../assets/icons/pc-close.svg';
import './CartDrawer.css';

export default function CartDrawer() {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectCartIsOpen);
  const items = useAppSelector(selectCartItems);
  const count = useAppSelector(selectCartCount);
  const subtotal = useAppSelector(selectCartSubtotal);
  const savings = useAppSelector(selectCartSavings);
  const panelRef = useRef<HTMLDivElement>(null);

  // Close on Escape, and stop the page scrolling behind the drawer.
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') dispatch(closeCart());
    };
    window.addEventListener('keydown', onKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    panelRef.current?.focus();

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, dispatch]);

  if (!isOpen) return null;

  return (
    <div className="cart-drawer">
      <div
        className="cart-drawer__backdrop"
        onClick={() => dispatch(closeCart())}
        aria-hidden
      />

      <aside
        className="cart-drawer__panel"
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        tabIndex={-1}
        ref={panelRef}
      >
        <header className="cart-drawer__header">
          <h2 className="cart-drawer__title">
            Your Cart{count > 0 && <span className="cart-drawer__count">({count})</span>}
          </h2>
          <button
            className="cart-drawer__close"
            aria-label="Close cart"
            onClick={() => dispatch(closeCart())}
          >
            <img src={closeIcon} alt="" />
          </button>
        </header>

        {items.length === 0 ? (
          <div className="cart-drawer__empty">
            <p className="cart-drawer__empty-title">Your cart is empty</p>
            <p className="cart-drawer__empty-text">Looks like you haven't added anything yet.</p>
            <button className="cart-drawer__continue" onClick={() => dispatch(closeCart())}>
              CONTINUE SHOPPING
            </button>
          </div>
        ) : (
          <>
            <ul className="cart-drawer__items">
              {items.map(({ product, quantity }) => {
                const unitPrice = getSalePrice(product);
                return (
                  <li key={product.id} className="cart-item">
                    <img src={product.thumbnail} alt="" className="cart-item__thumb" />

                    <div className="cart-item__details">
                      <p className="cart-item__title" title={product.title}>{product.title}</p>
                      <p className="cart-item__unit">{formatPrice(unitPrice)} each</p>

                      <div className="cart-item__stepper">
                        <button
                          aria-label={`Decrease quantity of ${product.title}`}
                          onClick={() => dispatch(decrementQuantity(product.id))}
                        >
                          −
                        </button>
                        <span aria-live="polite">{quantity}</span>
                        <button
                          aria-label={`Increase quantity of ${product.title}`}
                          onClick={() => dispatch(incrementQuantity(product.id))}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="cart-item__right">
                      <p className="cart-item__total">{formatPrice(unitPrice * quantity)}</p>
                      <button
                        className="cart-item__remove"
                        aria-label={`Remove ${product.title} from cart`}
                        onClick={() => dispatch(removeFromCart(product.id))}
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>

            <footer className="cart-drawer__summary">
              {savings > 0 && (
                <p className="cart-drawer__savings">
                  You save <strong>{formatPrice(savings)}</strong>
                </p>
              )}
              <div className="cart-drawer__subtotal">
                <span>Subtotal</span>
                <strong>{formatPrice(subtotal)}</strong>
              </div>
              <p className="cart-drawer__note">Shipping and taxes calculated at checkout.</p>
              <button className="cart-drawer__checkout">CHECKOUT</button>
              <button className="cart-drawer__clear" onClick={() => dispatch(clearCart())}>
                Clear cart
              </button>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
