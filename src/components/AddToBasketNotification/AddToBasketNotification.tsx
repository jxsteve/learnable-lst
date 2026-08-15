import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { dismissAddedNotification } from '../../features/cart/cartSlice';
import { formatPrice } from '../../utils/format';
import closeIcon from '../../assets/icons/pc-close.svg';
import './AddToBasketNotification.css';

/** How long the notification stays up before dismissing itself. */
const AUTO_DISMISS_MS = 4000;

/**
 * "Successfully added to basket" toast — Figma node 35:2723.
 * Driven by cart.lastAdded so any add-to-basket action surfaces it.
 */
export default function AddToBasketNotification() {
  const product = useAppSelector((state) => state.cart.lastAdded);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!product) return;
    const timer = setTimeout(() => dispatch(dismissAddedNotification()), AUTO_DISMISS_MS);
    return () => clearTimeout(timer);
    // re-arm whenever a different product (or the same one again) is added
  }, [product, dispatch]);

  useEffect(() => {
    if (!product) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') dispatch(dismissAddedNotification());
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [product, dispatch]);

  if (!product) return null;

  const salePrice = product.price * (1 - product.discountPercentage / 100);

  return (
    <div className="basket-toast" role="status" aria-live="polite">
      <div className="basket-toast__header">
        <p className="basket-toast__heading">Successfully added to basket</p>
        <button
          className="basket-toast__close"
          aria-label="Dismiss notification"
          onClick={() => dispatch(dismissAddedNotification())}
        >
          <img src={closeIcon} alt="" />
        </button>
      </div>

      <div className="basket-toast__body">
        <img src={product.thumbnail} alt="" className="basket-toast__thumb" />
        <div className="basket-toast__details">
          <p className="basket-toast__title">{product.title}</p>
          <p className="basket-toast__price">{formatPrice(salePrice)}</p>
        </div>
      </div>
    </div>
  );
}
